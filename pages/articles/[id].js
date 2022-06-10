import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import Header from '@/components/header';
import Footer from '@/components/footer';

import {getArticles, getArticleByArticleIdByLang} from '@/Model/articles-model';

export default function Article({article}) {
    const router = useRouter();
    const {locale} = router;

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-white">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <Header currentLanguage={locale} currentPage={`eglise`} />

                <h1 className="text-center">{article.title}</h1>
                <div className="mx-2 sm:mx-20">
                    {article.content ? <div dangerouslySetInnerHTML={{__html: article.content}}></div> : null}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export async function getStaticPaths({locales}) {
    // Call an external API endpoint to get posts
    const articles = await getArticles(100);

    // Get the paths we want to pre-render based on posts
    const paths = articles.map(article => ({
        params: {id: article.article_id.toString()},
        locale: article.lang,
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: 'blocking'};
}

export async function getStaticProps(context) {
    const {id} = context.params;
    const {locale} = context;
    const article = await getArticleByArticleIdByLang(id, locale);
    if (!article) {
        return {
            notFound: true,
        };
    }
    return {
        props: {article}, // will be passed to the page component as props
        revalidate: 10,
    };
}
