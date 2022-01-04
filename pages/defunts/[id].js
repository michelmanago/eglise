import {useCallback, useRef, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

// component
//import Header from '@/components/header';
import Header from '../../components/header/header';
import Footer from '@/components/footer';
import DefuntView from '@/components/defunt-view';

// model
import {getDefunt} from '@/api/defunts/[id]';
import {getDefunts} from '@/Model/defunts';
import { getMenu } from '@/Model/menu';

export default function Defunt({defunt, menu}) {
    const router = useRouter();
    const {locale} = router;

    let defuntDisplay;
    if (defunt) {
        defuntDisplay = <DefuntView defunt={defunt} language={locale} />;
    } else {
        defuntDisplay = <div>Loading...</div>;
    }

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                {/*<Header currentLanguage={locale} currentPage={`defunts/${defunt?.id}`} />*/}
                <Header currentPage={''} currentLanguage={locale} menu={menu.data} />

                {defuntDisplay}

                <Footer />
            </div>
        </div>
    );
}

export async function getStaticPaths({locales}) {
    // Call an external API endpoint to get posts
    const defunts = await getDefunts(100, 0);
    //const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = defunts.data.map(
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
    );

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: 'blocking'};
}

export async function getStaticProps(context) {
    const {id} = context.params;
    const menu = await getMenu(context.locale);
    const defunt = await getDefunt(id);
    //const defunts = await res.json();
    if (!defunt) {
        return {
            notFound: true,
        };
    }
    return {
        props: {defunt, menu}, // will be passed to the page component as props
        revalidate: 10,
    };
}
