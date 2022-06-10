import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRef} from 'react';
import Link from 'next/link';

// Components
import Header from '../components/header/header';
import Layout from '../components/layout';
//import Header from '@/components/header';
import Footer from '@/components/footer';
import {getMenu} from '@/Model/menu';

// Page to send email to reset Password
export default function Resetpassword({menu}) {
    const router = useRouter();
    const {locale, locales, defaultLocale, RDF} = router;
    const emailRef = useRef(null);
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
        console.log(emailRef.current.value);
        const res = await fetch(`/api/users/resetpassword/${emailRef.current.value}`);
    };

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="bg-white">
                <Header currentPage={''} currentLanguage={locale} menu={menu.data} />
                <div className="flex flex-col bg-white">
                    <div className="grid mx-2 my-5 place-items-center">
                        <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
                            <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">{title}</h1>
                            <form className="mt-10">
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
                                <button
                                    className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                    type="submit"
                                    onClick={handleReset}
                                >
                                    Réinisialiser
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Layout>
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
