import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Header from '@/components/header';
import Footer from '@/components/footer';

import {getArticlesByLang} from '@/Model/articles-model';
import {getProperDate} from '@/lib/date';

export default function Articles({articles}) {
    const router = useRouter();
    const {locale} = router;

    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <div className="container max-w-screen-xl mx-auto bg-pwhite">
                    <Header currentLanguage={locale} currentPage={'eglise'} />

                    <div className="container mx-auto sm:flex">
                        <main className="mx-2 mt-4 sm:mx-20">
                            <div className="flex flex-wrap">
                                {articles?.map(article => (
                                    <div className="w-1/3 px-2" key={article.id}>
                                        <Link href={`/articles/${article.article_id}`}>
                                            <a>
                                                {article.image ? (
                                                    article.image.startsWith('http') ? (
                                                        <img className="mx-auto" src={`${article.image}`} />
                                                    ) : (
                                                        <img
                                                            className="mx-auto"
                                                            src={`${imgBaseUrl}/${article.image}`}
                                                        />
                                                    )
                                                ) : null}
                                                <h3 className="inline-block">{article.title}</h3>
                                                <div className="inline-block mx-2 text-sm">
                                                    {getProperDate(article.date)}
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const {locale} = context;
    const articles = await getArticlesByLang(locale);
    if (!articles) {
        return {
            notFound: true,
        };
    }
    return {
        props: {articles}, // will be passed to the page component as props
        revalidate: 10,
    };
}
