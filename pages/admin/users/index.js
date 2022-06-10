import Router from 'next/router';
import {useRouter} from 'next/router';
import Link from 'next/link';

//import {verify} from 'jsonwebtoken';
import Cookie from 'cookie';

import Header from '@/components/header';
import Footer from '@/components/footer';

import authorize from '@/lib/authorize';
import {useState, useRef} from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddUser from '@/components/Popup/add-user';
import EditUser from '@/components/Popup/edit-user';

export default function Users({usersProp}) {
    const router = useRouter();
    const {locale} = router;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState();
    const [users, setUsers] = useState(usersProp);

    let initOpens = [];
    users.forEach(user => {
        initOpens.push(false);
    });
    const [opens, setOpens] = useState(initOpens);

    const deleteUrl = `/api/users`;

    const deleteUser = event => {
        event.preventDefault();
        const data_id = parseInt(event.target.getAttribute('data-id'));

        fetch(`${deleteUrl}/${data_id}`, {
            method: 'DELETE',
        })
            .then(async res => {
                if (res.ok) {
                    let eltIndex = -1;
                    for (let i = 0; i < users.length; i++) {
                        const elt = users[i];
                        if (elt.id === data_id) {
                            eltIndex = i;
                            break;
                        }
                    }
                    users.splice(eltIndex, 1);
                    setUsers(users);
                    setMessage('Utilisateur supprimer');
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Erreur dans la suppression de l'image");
            });
    };

    const changeRole = event => {
        //event.preventDefault();
        const data_id = parseInt(event.target.getAttribute('data-id'));
        const user = users.find(u => u.id === data_id);
        const newRole = event.target.value;
        fetch(`${deleteUrl}/${data_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                role: newRole,
                tombe: user.tombe,
            }),
        }).then(res => {
            if (res.ok) {
                const index = users.findIndex(u => u.id === data_id);
                let newUsers = [...users];
                newUsers[index].role = newRole;
                setUsers(newUsers);

                setMessage('user update !');
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }
        });
    };

    const openModal = event => {
        setOpen(!open);
    };

    const closeModal = event => {
        setOpen(false);
    };

    const addUser = user => {
        setUsers([...users, user]);
    };

    const updateUser = user => {
        const index = users.findIndex(u => u.id === user.id);
        var newUsers = [...users];
        newUsers[index] = user;

        setUsers(newUsers);
    };

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-white">
            <Header currentLanguage={locale} currentPage={''} />

            <h1 className="m-4">Admin Utilisateurs</h1>
            <button className="px-2 mx-2 mb-2 border border-gray-900 rounded text-pdarkblue" onClick={openModal}>
                Add User
            </button>
            <Popup
                id="user-create"
                open={open}
                position="top center"
                modal="true"
                closeOnDocumentClick
                onClose={closeModal}
            >
                <AddUser setOpen={setOpen} addUser={addUser} />
            </Popup>

            <div className="w-1/4 mx-auto text-center bg-green-300 rounded">{message}</div>

            <div className="mx-4 mt-2 border-t border-l border-r border-black">
                <div className="flex flex-wrap border-b border-black">
                    <div className="w-1/6 text-center border-r border-black">id</div>
                    <div className="w-1/6 px-1 border-r border-black md:w-1/6">Nom</div>
                    <div className="w-2/6 px-1 border-r border-black">Email</div>
                    <div className="w-1/6 px-1 border-r border-black md:w-1/6">Role</div>
                    <div className="w-1/6 px-1">Option</div>
                </div>
                {users.map((user, index) => (
                    <div key={user.id} className="flex flex-wrap border-b border-black">
                        <div className="w-1/6 text-center border-r border-black">{user.id}</div>
                        <div className="w-1/6 px-1 border-r border-black md:w-1/6">{user.name}</div>
                        <div className="w-2/6 px-1 border-r border-black">{user.email}</div>
                        <div className="w-1/6 px-1 border-r border-black md:w-1/6">
                            <select className="w-full" data-id={user.id} value={user.role} onChange={changeRole}>
                                <option value="admin">Admin</option>
                                <option value="auteur">Auteur</option>
                                <option value="contributeur">Contributeur</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap w-1/6">
                            <EditUser user={user} addUser={updateUser} />
                            <div
                                className="w-1/2 px-1 text-center text-white bg-red-600 cursor-pointer"
                                data-id={user.id}
                                onClick={deleteUser}
                            >
                                Supprimer
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, res, query, asPath, pathname} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let protocol = 'https://';
        if (host.startsWith('localhost')) {
            protocol = 'http://';
        }
        const res = await fetch(`${protocol}${host}/api/users`);
        const usersProp = await res.json();

        if (!usersProp) {
            return {
                notFound: true,
            };
        }
        return {
            props: {usersProp}, // will be passed to the page component as props
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}
