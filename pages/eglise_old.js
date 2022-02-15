import Head from 'next/head';
import {useRouter} from 'next/router';

import Layout from '../components/layout';
import AppEglise from '../components/appeglise';

import {getArticlesByLang} from '@/Model/articles-model';

export default function Eglise({articles}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;
    let title;
    switch (locale) {
        case 'fr':
            title = "L'église";
            break;
        case 'en':
            title = 'The Church';
            break;
        case 'ru':
            title = 'Церковь';
            break;
        default:
            throw 'Erreur. langue inconnue dans eglise.js : ' + locale;
    }

    //console.log('articles: ', articles);

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <AppEglise currentLanguage={locale} articles={articles ? articles : []} />
        </Layout>
    );
}

export async function getStaticProps({locale}) {
    const articles = await getArticlesByLang(locale, 3);
    if (!articles) {
        return {
            notFound: true,
        };
    }
    return {
        props: {articles: articles}, // will be passed to the page component as props
        revalidate: 10,
    };
}
