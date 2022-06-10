// libs
import {useState} from 'react';
import {useRouter} from 'next/router';

// components
import Nav from '../nav/nav';

export default function Header({menu, translations}) {
    //const [session] = useSession();

    /** Hooks */
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;

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
