// libs
import dynamic from 'next/dynamic';
import {useEffect} from 'react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// component
import Header from '../components/header/header';
//import Header from '@/components/header';
import PageDefault from '../components/page-template/PageDefault';
import PageWithCategory from '../components/page-template/PageWithCategory';

// model
import {getMenu} from '../Model/menu';
import {getPageBySlug, getPageByType} from '../Model/page';

// utils
import {getMediaLink} from '../utils/utils-serveur-image';
import Footer from '@/components/footer';
import {useRouter} from 'next/router';
import {getSingleMedia} from '@/Model/media';
import DefuntView from '@/components/defunt-view';
import {getDefunt} from './api/defunts/[id]';
import DefuntBlock from '@/components/blocks/defunt';
//import { getSingleMedia } from '@/Model/media';

const NavCompositeur = dynamic(() => import('../components/compositeurs/nav'));

// styles
const bannerStyles = {
    height: 360,
};

export default function DynPage({menu, page}) {
    // redirect 404
    if (!page) {
        console.log('page error');
        return <DefaultErrorPage statusCode={404} />;
    }

    const router = useRouter();
    const {locale, locales, defaultLocale} = router;

    // Lifecycle
    useEffect(() => {
        // hack for dev
        window.EDIT_THIS_PAGE = `${window.location.origin}/admin/page/${page.originalPageId}`;
    }, []);

    // utils
    const renderPage = page => {
        const hasCategory = !!page.page;

        if (hasCategory) {
            if (page.page === 'defunt') {
                var blockDefunt = {};
                for (const block of page.blocks) {
                    if (block.type === 'defunt') blockDefunt = block;
                }
                return (
                    <div className="flex flex-col md:flex-row">
                        <DefuntBlock defunt={blockDefunt.defunt} language={locale} />
                        <div className="w-full pt-5 px-7 md:w-3/4">
                            <PageDefault key={page.id} page={page} />
                        </div>
                    </div>
                );
            }
            return (
                <div className="max-w-screen-xl px-10 py-10 mx-auto bg-pwhite">
                    <PageWithCategory key={page.id} page={page} />
                </div>
            );
        } else {
            return (
                <div className="max-w-screen-xl px-10 py-10 mx-auto bg-pwhite">
                    <PageDefault key={page.id} page={page} />
                </div>
            );
        }
    };

    // hooks
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>{page && page.pageName}</title>
            </Head>

            <Header currentPage={''} currentLanguage={locale} menu={menu.data} translations={page.translations} />

            {/* Banner */}
            {page.bandeau && (
                <div style={bannerStyles} className="">
                    <img
                        className="block object-cover w-full h-full"
                        src={getMediaLink(page.bandeau.public_path)}
                        alt=""
                    />
                </div>
            )}

            <main className="">{renderPage(page)}</main>

            <Footer />
        </div>
    );
}

export async function getStaticPaths({locales}) {
    // Call an external API endpoint to get posts
    //const defunts = await getDefunts(100, 0);
    //const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    /*const paths = defunts.data.map(
        defunt => (
            {
                params: {id: defunt.id.toString()},
                locale: 'fr',
            },
            {
                params: {id: defunt.id.toString()},
                locale: 'en',
            },
            {
                params: {id: defunt.id.toString()},
                locale: 'ru',
            }
        ),
    );*/
    const paths = [];

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: 'blocking'};
}

export async function getStaticProps(context) {
    const {pageSlug} = context.params;
    //console.log(context.locale + '/' + pageSlug);
    const menu = await getMenu(context.locale);
    var page = await getPageBySlug(context.locale + '/' + pageSlug, 'render').catch(err => null);

    //console.log(page);
    if (page) {
        for (var block of page?.blocks) {
            //console.log('block type', block.type);
            if (block.type === 'list') {
                const pageList = await getPageByType(block.content);
                //console.log(block.bandeau_id);
                //block.bandeau = await getSingleMedia(block.bandeau_id)
                for (var pageInList of pageList) {
                    if (pageInList.bandeau_id) {
                        pageInList.bandeau = await getSingleMedia(pageInList.bandeau_id);
                    }
                }
                block.pageList = pageList.filter(page => page.language === context.locale);
            } else if (block.type === 'defunt') {
                var defunt = await getDefunt(block.content);
                if (context.locale != 'fr' && defunt.infoLangs[context.locale]) {
                    block.defunt = defunt.infoLangs[context.locale] ? defunt.infoLangs[context.locale] : null;
                } else {
                    block.defunt = defunt;
                }
            }
        }
    }

    return {
        props: {
            page,
            menu,
        },

        revalidate: 10,
    };
}
