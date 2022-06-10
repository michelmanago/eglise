import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRef, useState} from 'react';
import Link from 'next/link';

import Layout from '../../components/layout';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Page to set the new password for user
export default function Resetpassword({hash}) {
    const router = useRouter();
    const [status, setStatus] = useState('main');
    const {locale, locales, defaultLocale, RDF} = router;
    const passRef = useRef(null);
    const passCheckRef = useRef(null);
    let title;
    switch (locale) {
        case 'fr':
            title = 'Réinisialisation du mot de passe';
            break;
        case 'en':
            title = 'Reset Password';
            break;
        case 'ru':
            title = '';
            break;
        default:
            throw 'Erreur. langue inconnue dans maps.js : ' + locale;
    }

    const handleReset = async e => {
        e.preventDefault();
        //console.log(emailRef.current.value);
        //const res = await fetch(`/api/users/resetpassword/${emailRef.current.value}`);

        const newPassword = passRef.current.value;
        const confirmePassword = passCheckRef.current.value;
        if (newPassword === confirmePassword) {
            console.log(`/api/users/password/${hash}`, newPassword);
            const res = await fetch(`/api/users/password/${hash}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            });
            if (res.ok) {
                setStatus('ok');
            }
        }
    };

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="bg-white">
                <Header currentLanguage={locale} currentPage={''} />
                <div className="flex flex-col bg-white">
                    <div className="grid mx-2 my-5 place-items-center">
                        <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                            <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">{title}</h1>
                            {!hash && <p>Ce lien n'est pas valide</p>}
                            {hash && status === 'main' && (
                                <form className="mt-10">
                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                        Password
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            ref={passRef}
                                            autoComplete="new-password"
                                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                            required
                                        />
                                    </label>

                                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                        Confirm password
                                        <input
                                            id="password-confirm"
                                            type="password"
                                            name="password-confirm"
                                            placeholder="********"
                                            autoComplete="new-password"
                                            ref={passCheckRef}
                                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                            required
                                        />
                                    </label>
                                    <button
                                        className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                        type="submit"
                                        onClick={handleReset}
                                    >
                                        Envoyer
                                    </button>
                                </form>
                            )}
                            {hash && status === 'ok' && (
                                <div>
                                    <div>Le mot de passe a été changé</div>
                                    <Link href="/login">
                                        <a className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                                            login
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const {req, query, asPath, pathname} = context;
    const {hash} = context.query;

    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let protocol = 'https://';
        if (host.startsWith('localhost')) {
            protocol = 'http://';
        }

        const res = await fetch(`${protocol}${host}/api/users/hash/${hash}`);
        const user = await res.json();

        console.log(user, hash);

        if (!user || user.length === 0) {
            return {
                props: {},
            };
        }
        if (hash) {
            return {
                props: {hash}, // will be passed to the page component as props
            };
        }
    }
    return {props: {}};
}
