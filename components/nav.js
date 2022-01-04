import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useCallback, useState} from 'react';

export default function NavBar({activeMenu, currentLanguage}) {
    const router = useRouter();
    const [user, setUser] = useState();

    const [menuToggleState, setMenuToggleState] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Access localStorage
            if (!user && localStorage.getItem('user')) {
                setUser(JSON.parse(localStorage.getItem('user')));
            }
        }
    });

    let menus;

    let menuConnection = [
        {
            id: 1,
            name: 'Connection',
            page: {
                pathname: `/login`,
                query: router.query.redirect
                    ? {redirect: router.query.redirect}
                    : router.asPath != '/login' && router.asPath != '/inscription'
                    ? {redirect: encodeURI(router.asPath)}
                    : {},
            },
        },
        {
            id: 2,
            name: 'inscription',
            page: {
                pathname: `/inscription`,
                query: router.query.redirect
                    ? {redirect: router.query.redirect}
                    : router.asPath != '/login' && router.asPath != '/inscription'
                    ? {redirect: encodeURI(router.asPath)}
                    : {},
            },
        },
    ];
    switch (currentLanguage) {
        case 'fr':
            menus = [
                {id: 1, name: '', string: 'Accueil', page: '/'},
                {id: 2, name: 'eglise', string: 'Eglise', page: '/eglise'},
                //{id: 3, name: 'histoire', string: 'Histoire', page: '/histoire'},
                //				{id:4,name:"cimetiere", string:"Cimetière", page:"/cimetiere"},
                //{id: 5, name: 'carres', string: 'Carrés', page: '/carres'},
                //{id: 6, name: 'defunts', string: 'Défunts', page: '/defunts/search'},
                {id: 7, name: 'dons', string: 'Dons', page: '/dons'},
                {id: 8, name: 'informations', string: 'Informations', page: '/informations'},
            ];
            /*menuConnection = [
                {id: 1, name: 'Connection', page: `/login?redirect=${encodeURI(router.asPath)}`},
                {id: 2, name: 'inscription', page: `/inscription?redirect=${encodeURI(router.asPath)}`},
            ];*/
            break;
        case 'en':
            menus = [
                {id: 1, name: '', string: 'Home', page: '/'},
                {id: 2, name: 'eglise', string: 'Church', page: '/eglise'},
                //{id: 3, name: 'histoire', string: 'History', page: '/histoire'},
                //				{id:4, name:"cimetiere", string:"Cemetery", page:"/cimetiere"},
                //{id: 5, name: 'carres', string: 'Squares', page: '/carres'},
                //{id: 6, name: 'defunts', string: 'Deceased', page: '/defunts/search'},
                {id: 7, name: 'dons', string: 'Donations', page: '/dons'},
                {id: 8, name: 'informations', string: 'Information', page: '/informations'},
            ];
            menuConnection = [
                {id: 1, name: 'signin', page: `/login?redirect=${encodeURI(router.asPath)}`},
                {id: 2, name: 'signup', page: `/inscription?redirect=${encodeURI(router.asPath)}`},
            ];
            break;
        case 'ru':
            menus = [
                {id: 1, name: '', string: 'Главная', page: '/'},
                {id: 2, name: 'eglise', string: 'Церковь', page: '/eglise'},
                //{id: 3, name: 'histoire', string: 'История', page: '/histoire'},
                //				{id:4, name:"cimetiere", string:"Кладбище", page:"/cimetiere"},
                //{id: 5, name: 'carres', string: 'Площади', page: '/carres'},
                //{id: 6, name: 'defunts', string: 'Умерший', page: '/defunts/saerch'},
                {id: 7, name: 'dons', string: 'Пожертвование', page: '/dons'},
                {id: 8, name: 'informations', string: 'Информация', page: '/informations'},
            ];
            menuConnection = [
                {id: 1, name: 'Connection', page: `/login?redirect=${encodeURI(router.asPath)}`},
                {id: 2, name: 'inscription', page: `/inscription?redirect=${encodeURI(router.asPath)}`},
            ];
            break;
        default:
            throw 'Erreur. Langue inconnue dans NavBar : ' + currentLanguage;
    }
    let staticMenus = menus.map(menu => {
        return (
            <Link href={menu.page} locale={currentLanguage} key={menu.id}>
                <a className={activeMenu == menu.name ? 'text-pwhite pb-3 border-b-2 mr-4' : 'mr-4'}>{menu.string}</a>
            </Link>
        );
    });
    let staticMenuConnection = menuConnection.map(menu => {
        return (
            <Link href={menu.page} locale={currentLanguage} key={menu.id}>
                <a className={activeMenu == menu.name ? 'text-pwhite pb-3 border-b-2 mr-4' : 'mr-4'}>{menu.name}</a>
            </Link>
        );
    });

    let popupMenus = menus.map(menu => {
        return (
            <Link href={menu.page} locale={currentLanguage} key={menu.id}>
                <a className="block px-4 py-2 text-black hover:bg-pgray">{menu.string}</a>
            </Link>
        );
    });

    const handleLogout = async e => {
        if (typeof window !== 'undefined' && localStorage.getItem('user')) {
            localStorage.removeItem('user');
            const msg = await fetch('/api/logout');
            console.log('remove auth cookie ');
            setUser(null);
        }
    };

    return (
        <div className="flex items-center bg-pgold h-45px">
            <div className="relative self-center group">
                <div
                    className={`px-2 ml-2 mr-4 border border-b-0 rounded-t-lg cursor-pointer md:mx-0 md:hidden border-pgold ${
                        menuToggleState ? 'border-pgray' : ''
                    }`}
                    onClick={() => {
                        setMenuToggleState(!menuToggleState);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="-1 -1 22 22">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </div>

                <div
                    className={`absolute z-10 items-center w-auto p-0 ml-2 whitespace-no-wrap bg-white border border-pgray md:hidden ${
                        menuToggleState ? 'block' : 'hidden'
                    }`}
                >
                    {popupMenus}
                </div>
            </div>
            {user ? (
                <div className="flex justify-end w-full pr-8 md:hidden">
                    <div className="pr-4">{`Connecté en tant que ${user.name}`}</div>

                    <div className="cursor-pointer" onClick={handleLogout}>
                        Déconnection
                    </div>
                </div>
            ) : (
                <div className="flex justify-end w-full md:hidden">{staticMenuConnection}</div>
            )}
            <div className="hidden w-full text-sm text-black md:flex">
                <div className="flex justify-start w-1/2 pl-8">{staticMenus}</div>
                {user ? (
                    <>
                        <div className="flex justify-end w-1/2 pr-8">
                            <div className="pr-4">{`${user.name}`}</div>

                            <div className="cursor-pointer" onClick={handleLogout}>
                                Déconnection
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-end w-1/2">{staticMenuConnection}</div>
                )}
            </div>
        </div>
    );
}
