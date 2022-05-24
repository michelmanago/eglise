import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '../components/layout';
import AppHome from '../components/apphome';
import {getLastPages} from '@/Model/page';
import {getMediaLink, getServeurImageMedia} from 'utils/utils-serveur-image';

import {getMenu} from '@/Model/menu';
import Header from '@/components/header/header';
import PageContent from '@/components/page-template/commons/PageContent';
import Footer from '@/components/footer';

// styles
const bannerStyles = {
    height: 360,
};

export default function Index({menu, page}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;
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

            {page ? (
                <div className="container max-w-screen-xl bg-white sm:mx-auto">
                    {/* Header */}
                    {menu && <Header menu={menu.data} currentLanguage={locale} />}
                    {page.bandeau && (
                        <div style={bannerStyles} className="">
                            <img
                                className="block object-cover w-full h-full"
                                src={getMediaLink(page.bandeau.public_path)}
                                alt=""
                            />
                        </div>
                    )}
                    {/* Content */}
                    <main className="h-full max-w-screen-xl px-10 py-10 mx-auto bg-white">
                        <PageContent blocks={page.blocks} pageName={page.pageName} />
                    </main>
                    <Footer />
                </div>
            ) : (
                <AppHome currentLanguage={locale} />
            )}
        </div>
    );
}

export const getServerSideProps = async ctx => {
    const menu = await getMenu(ctx.locale);
    let homePages = await getLastPages(ctx.locale, 'home', 1);
    // so that we can directly manipulate JS object in Components
    if (homePages && homePages[0]) {
        const bandeau = await getServeurImageMedia(homePages[0].bandeau_id);
        homePages[0].bandeau = bandeau;
        homePages[0].blocks = JSON.parse(homePages[0].blocks);
    }
    return {
        props: {
            menu,
            page: homePages ? homePages[0] : null,
        },
    };
};
