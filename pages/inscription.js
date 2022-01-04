import {useRef, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

// Components
import Header from '../components/header/header';
//import Header from '../components/header';
import Footer from '../components/footer';

// Models
import { getMenu } from '@/Model/menu';

export default function Signup({menu}) {
    const router = useRouter();
    const {locale} = router;
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const passConfRef = useRef(null);
    const [message, setMessage] = useState([]);

    const emailFound = async email => {
        console.log('email ', email);
        const res = await fetch(`/api/users/email/${email}`);
        const isFound = await res.json();

        console.log('isFound => ', isFound);
        return isFound.find;
    };
    async function handleSignup(e) {
        e.preventDefault();

        var error = false;
        var message = [];
        if (nameRef.current?.value === '') {
            message.push('Renseignez un nom valide');
            error = true;
        }
        const mailFound =  await emailFound(emailRef.current?.value);
        if (mailFound) {
            message.push('Un compte existe déjà avec cette email');
            error = true;
        }

        if (passRef.current?.value === '') {
            console.log('error password');
            message.push('Renseignez un mot de passe');
            error = true;
        }

        if (passRef.current?.value != passConfRef.current?.value) {
            console.log('error password');
            message.push('Confirmation de mot de passe non valide');
            error = true;
        }

        if (error) {
            setMessage(message);
            return;
        }

        //return;
        const resp = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passRef.current?.value,
                role: 'contributeur',
            }),
        });
        const json = await resp.json();
        if (resp.ok) {
            var query = {new: true};
            if (router.query.redirect) query['redirect'] = router.query.redirect;

            router.push({pathname: '/login', query: query});
        }
    }

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentPage={''} currentLanguage={locale} menu={menu.data} />

            <div className="grid my-5 place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Signup</h1>
                    {/*JSON.stringify(message)*/}
                    {message.length != 0 && (
                        <ul className="px-1 mt-5 text-white bg-red-500">
                            {message.map((m, i) => (
                                <li key={i}>{m}</li>
                            ))}
                        </ul>
                    )}
                    <form className="mt-5">
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                            Name
                            <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="John"
                                ref={nameRef}
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
                                ref={emailRef}
                                autoComplete="email"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                required
                            />
                        </label>

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
                                ref={passConfRef}
                                autoComplete="new-password"
                                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            onClick={handleSignup}
                            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                        >
                            Sign up
                        </button>
                        <Link
                            href={{
                                pathname: '/login',
                                query: router.query.redirect ? {redirect: router.query.redirect} : {},
                            }}
                        >
                            <a className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
                                Already registered?
                            </a>
                        </Link>
                    </form>
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