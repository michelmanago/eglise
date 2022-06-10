// libs
import {useState} from 'react';
import {useRouter} from 'next/router';

// components
import Nav from '../nav/nav';
import {fetchWrapper} from 'utils/utils';
import Link from 'next/link';

export default function Header({menu, translations}) {
    //const [session] = useSession();

    /** Hooks */
    const router = useRouter();
    //const {locale, locales, defaultLocale} = router;

    const [user, setUser] = useState();

    if (typeof window !== 'undefined') {
        // Access localStorage
        if (!user && localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false);

    return (
        <header className="bg-pyellow">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                <div className="flex justify-center h-80px sm:h-115px pl-60px">
                    <img src="/static/img/logo-eglise.svg" alt="logo" />
                </div>
                <div className="flex items-center"></div>
            </div>

            {/* Top bar */}
            <Nav menu={menu} translations={translations} />

            {user ? (
                <div className="flex flex-row justify-center">
                    <div className="flex flex-row gap-2 p-2 text-white rounded-b bg-pdarkblue">
                        <div>{user.name}</div>
                        <div
                            className="cursor-pointer"
                            onClick={async e => {
                                const res = await fetchWrapper('/api/logout', null, 'GET');
                                if (res.status === 200) {
                                    localStorage.removeItem('user');
                                    router.reload();
                                }
                            }}
                        >
                            Déconnection
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row justify-center">
                    <div className="flex flex-row gap-2 p-2 text-white rounded-b bg-pdarkblue">
                        <Link href={'/login'}>
                            <a className="text-white">Connection</a>
                        </Link>
                    </div>
                </div>
            )}
            {/*session && (
                <div className='flex flex-row items-center justify-center'>
                    {session.user.image && (
                        <span style={{ backgroundImage: `url(${session.user.image})` }} className={''} />
                    )}
                    <span className={'mr-2'}>
                        <small>Signed in as</small>
                        <br />

                        <strong>{session.userBase ? session.userBase.username : session.user.name}</strong>
                    </span>
                    <Link
                        href={`/api/auth/signout`}
                    >
                        <a
                            className={
                                'mx-1 text-white border border-transparent rounded-md bg-pblue hover:bg-pblue-dark px-2 py-2'
                            }
                            onClick={e => {
                                e.preventDefault();
                                signOut();
                            }}
                        >
                            Sign out
                        </a>
                    </Link>
                </div>
                        )*/}
        </header>
    );
}
