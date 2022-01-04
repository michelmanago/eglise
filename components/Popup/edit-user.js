import {useRef, useState} from 'react';
import Popup from 'reactjs-popup';

export default function EditUser({user, addUser}) {
    const [editUser, setEditUser] = useState(user);
    const [open, setOpen] = useState(false);

    console.log(editUser);

    async function handleSignup(e) {
        e.preventDefault();
        setOpen(false);
        const resp = await fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editUser.name,
                email: editUser.email,
                role: editUser.role,
                tombe: editUser.tombe,
            }),
        });
        if (!resp.ok) return null
        const json = await resp.json();

        addUser(editUser);
    }
    const openModal = e => {
        setOpen(true);
    };
    const closeModal = e => {
        setOpen(false);
    };

    const changeName = e => {
        var newUser = {...editUser};
        newUser.name = e.target.value;
        setEditUser(newUser);
    };

    const changeEmail = e => {
        var newUser = {...editUser};
        newUser.email = e.target.value;
        setEditUser(newUser);
    };

    const changeTombe = e => {
        var newUser = {...editUser};
        newUser.tombe = e.target.value;
        setEditUser(newUser);
    };

    return (
        <>
            <div className="w-1/2 px-1 text-center text-white bg-green-300 cursor-pointer" onClick={openModal}>
                Editer
            </div>
            <Popup open={open} position="top center" modal="true" closeOnDocumentClick onClose={closeModal}>
                <form className="mt-6">
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        Name
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            placeholder="John"
                            value={editUser.name}
                            onChange={changeName}
                            autoComplete="given-name"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        E-mail
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="john.doe@company.com"
                            value={editUser.email}
                            onChange={changeEmail}
                            autoComplete="email"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>
                    {editUser.role === 'contributeur' ? (
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                            Tombe
                            <input
                                id="tombe"
                                type="text"
                                name="tombe"
                                placeholder="417, 11300 ..."
                                value={editUser.tombe}
                                onChange={changeTombe}
                                autoComplete="tombe"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                required
                            />
                        </label>
                    ) : null}

                    <button
                        type="submit"
                        onClick={handleSignup}
                        className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    >
                        Ajouter
                    </button>
                </form>
            </Popup>
        </>
    );
}
