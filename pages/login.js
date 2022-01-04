import {useRef, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

// Components
import Header from '../components/header/header';
//import Header from '@/components/header';
import Footer from '@/components/footer';
import { getMenu } from '@/Model/menu';

export default function Login({menu}) {
    const router = useRouter();
    const {locale} = router;
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const [message, setMessage] = useState([]);

    async function handleLogin(e) {
        e.preventDefault();
        var error = false;
        var message = [];
        const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value,
            }),
        });

        const json = await resp.json();
        if (resp.status === 200) {
            localStorage.setItem('user', JSON.stringify(json));
            if (router.query && router.query.redirect) router.push(router.query.redirect);
            else router.push('/');
        } else if (resp.status === 401) {
            error = true;
            message.push('Login / Mot de passe incorrect');
        }

        if (error) {
            setMessage(message);
        }
    }

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentPage={''} currentLanguage={locale} menu={menu.data} />
            <div className="flex flex-col bg-pwhite">
                <div className="grid mx-2 my-5 place-items-center">
                    <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                        <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Login</h1>
                        {router.query.new && (
                            <div className="mt-5">
                                Merci de votre inscription, vous avez reçu un lien d'acitvation de votre compte par mail
                            </div>
                        )}
                        {message && message.length != 0 && (
                            <ul className="px-1 mt-5 text-white bg-red-500">
                                {message.map((m, i) => (
                                    <li key={i}>{m}</li>
                                ))}
                            </ul>
                        )}
                        <form className="mt-5">
                            <label className="block text-xs font-semibold text-gray-600 uppercase">
                                E-mail
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="e-mail address"
                                    autoComplete="email"
                                    ref={emailRef}
                                    className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    required
                                />
                            </label>
                            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                                Password
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    autoComplete="current-password"
                                    ref={passRef}
                                    className="block w-full px-1 py-3 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                    required
                                />
                            </label>
                            <button
                                className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                type="submit"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            <div className="mt-8 text-sm text-center sm:flex sm:flex-wrap sm:mb-4">
                                <Link href="/resetpassword">
                                    <a href="forgot-password" className="underline flex-2">
                                        Forgot password?
                                    </a>
                                </Link>
                                <p className="flex-1 mx-4 my-1 text-gray-500 text-md sm:my-auto">or</p>
                                <Link
                                    href={{
                                        pathname: '/inscription',
                                        query: router.query.redirect ? {redirect: router.query.redirect} : {},
                                    }}
                                >
                                    <a className="underline flex-2">Create an Account</a>
                                </Link>
                            </div>
                            <Link href={`/admin`}>
                                <a>Admin</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export async function getStaticProps(context) {
    const menu = await getMenu(context.locale);
    return {
        props: {
            menu,
        },
        revalidate: 10,
    };
}