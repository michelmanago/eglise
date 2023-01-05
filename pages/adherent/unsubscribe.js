import Head from 'next/head';
import {useRouter} from 'next/router';

import {getMenu} from '@/Model/menu';
import Header from '@/components/header/header';

import Footer from '@/components/footer';
import {unsubscribeAdherent} from 'dao/adherent';

// styles
const bannerStyles = {
    height: 360,
};

export default function Index({menu}) {
    const router = useRouter();
    const {locale} = router;
    let title;
    switch (locale) {
        case 'fr':
            title = 'La nécropole russe';
            break;
        case 'en':
            title = 'The Russian necropolis';
            break;
        case 'ru':
            title = 'Русский некрополь';
            break;
        default:
            throw 'Erreur. langue inconnue dans index.js : ' + locale;
    }
    return (
        <div className="">
            <Head>
                <title>{title}</title>
            </Head>

            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                {/* Header */}
                {menu && <Header menu={menu.data} currentLanguage={locale} />}

                {/* Content */}
                <main className="h-full max-w-screen-xl px-5 py-10 mx-auto bg-white">
                    <div className="flex flex-col items-center justify-center">
                        <p>Vous êtes maintenant désinscrit de notre newsletter</p>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export const getServerSideProps = async ctx => {
    const menu = await getMenu(ctx.locale);
    const {email} = ctx.query;
    // console.log({params: ctx.query});
    try {
        const res = await unsubscribeAdherent(email);
    } catch (error) {}
    return {
        props: {
            menu,
        },
    };
};
