import Router from 'next/router';
import {useRouter} from 'next/router';
import Link from 'next/link';

//import {verify} from 'jsonwebtoken';
import Cookie from 'cookie';

import Header from '@/components/header';
import Footer from '@/components/footer';

import authorize from '@/lib/authorize';
import {useState} from 'react';

export default function PageContent({blocks}) {
    const router = useRouter();
    const {locale} = router;
    const [message, setMessage] = useState();
    const [pjState, setPjState] = useState(blocks);

    const apiUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/`;

    const deleteUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/piece-jointes`;

    const deleteFile = event => {
        event.preventDefault();
        const data_id = parseInt(event.target.getAttribute('data-id'));

        fetch(`${deleteUrl}/${data_id}`, {
            method: 'DELETE',
        })
            .then(async res => {
                if (res.ok) {
                    let eltIndex = -1;
                    for (let i = 0; i < blocks.length; i++) {
                        const elt = blocks[i];
                        if (elt.id === data_id) {
                            eltIndex = i;
                            break;
                        }
                    }
                    blocks.splice(eltIndex, 1);
                    setPjState(blocks);
                    setMessage('Document supprimer');
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
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentLanguage={locale} currentPage={''} />

            <h1 className="m-4">PageContent Admin</h1>

            <div className="w-1/4 mx-auto text-center bg-green-300 rounded">{message}</div>

            <div className="mx-4 mt-2 border-t border-l border-r border-black">
                <div className="flex flex-wrap border-b border-black">
                    <div className="w-1/6 text-center border-r border-black">Defunt</div>
                    <div className="w-2/6 px-1 border-r border-black md:w-1/6">Categorie</div>
                    <div className="w-2/6 px-1 border-r border-black md:w-3/6">Url</div>
                    <div className="w-1/6 px-1">Option</div>
                </div>
                {pjState.map(block => (
                    <div key={block.id} className="flex flex-wrap border-b border-black">
                        <div className="w-1/6 text-center border-r border-black">
                            {block.id}/{block.id_defunts}
                        </div>
                        <div className="w-2/6 px-1 border-r border-black md:w-1/6">{block.categorie}</div>
                        <div className="w-2/6 px-1 border-r border-black md:w-3/6">
                            <a target="_blank" href={`${apiUrl}${block.url}`}>
                                {block.url}
                            </a>
                        </div>
                        <div
                            className="w-1/6 px-1 text-center text-white bg-red-600 cursor-pointer"
                            data-id={block.id}
                            onClick={deleteFile}
                        >
                            Supprimer
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
        const res = await fetch(`${protocol}${host}/api/pieceJointe`);
        const blocks = await res.json();

        if (!blocks) {
            return {
                notFound: true,
            };
        }
        return {
            props: {blocks}, // will be passed to the page component as props
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}
