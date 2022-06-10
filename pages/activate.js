import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '@/components/layout';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Activate(props) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;
    let title;
    let struct = {
        title: '',
        phrase1: '',
        phrase2: '',
        link: '',
    };

    switch (locale) {
        case 'fr':
            title = 'Activation de compte';
            struct.title = 'Bienvenue';
            struct.phrase1 = 'Votre compte est activé';
            struct.phrase2 = 'Vous pouvez maintenant vous ';
            struct.link = 'Connecter';
            break;
        case 'en':
            title = 'Compte Activation';
            struct.title = 'Welcome';
            struct.phrase1 = 'Your account is now activate';
            struct.phrase2 = 'You can now you ';
            struct.link = 'Connect';
            break;
        case 'ru':
            title = 'Военные площади';
            struct.title = 'Welcome ru';
            struct.phrase1 = 'Your account is now activate';
            struct.phrase2 = 'You can now you ';
            struct.link = 'Connect';
            break;
        default:
            throw 'Erreur. langue inconnue dans eglise.js : ' + locale;
    }

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="bg-white">
                <Header currentLanguage={locale} currentPage={''} />
                <main className="px-2 md:px-24">
                    <h2>{struct.title}</h2>
                    <p>{struct.phrase1}</p>
                    <p>
                        {struct.phrase2}
                        <Link href="/login">
                            <a className="underline">{struct.link}</a>
                        </Link>
                    </p>
                </main>
                <Footer />
            </div>
        </Layout>
    );
}
