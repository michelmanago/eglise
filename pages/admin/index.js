import Router from 'next/router';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {verify} from 'jsonwebtoken';
import Cookie from 'cookie';

import Header from '../../components/header/header';
//import Header from '@/components/header';
import Footer from '@/components/footer';

import authorize from '@/lib/authorize';

import {useState} from 'react';
import AdminView from '@/components/Admin/admin-view';
import AuteurView from '@/components/Admin/auteur-view';
import {getMenu} from '@/Model/menu';

const linkStyles = {
    width: 300,
};

export default function Admin({menu}) {
    const router = useRouter();
    const {locale} = router;
    const [user, setUser] = useState();

    if (typeof window !== 'undefined') {
        // Access localStorage
        if (!user && localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />

            <h1>Admin Page</h1>

            {user && user.role === 'admin' ? (
                <>
                    <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                        <h1 className="mb-5 text-4xl font-semibold">Administrer le site</h1>
                        <div className="flex flex-col">
                            <BlockLink label="Pages" href="/admin/page" />
                            <BlockLink label="Catégories" href="/admin/category" />
                            <BlockLink label="Menus de navigation" href="/admin/editor-menu" />
                            <BlockLink label="Utilisateurs" href="/admin/users/create" />
                            <BlockLink label="Media" href="/admin/media" />
                        </div>
                    </main>
                </>
            ) : user && user.role === 'auteur' ? (
                <>
                    <div>Auteur View</div>
                    <AuteurView />
                </>
            ) : user && user.role === 'contributeur' ? (
                <div>Admin contributeur tombe: {user.tombe}</div>
            ) : null}

            <Footer />
        </div>
    );
}

const BlockLink = ({label, href}) => (
    <div>
        <Link href={href}>
            <a
                style={linkStyles}
                className="inline-block px-3 py-1 mb-3 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
            >
                {label}
            </a>
        </Link>
    </div>
);

export async function getServerSideProps(context) {
    const {req, res} = context;
    const cookie = req?.headers.cookie;
    //console.log(cookie);
    const secret = process.env.LOGIN_SECRET;
    /*if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }*/

    //authorize(res, parsedCookies, secret);

    const menu = await getMenu(context.locale);

    return {props: {menu}};
}
