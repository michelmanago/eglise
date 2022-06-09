import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import Footer from '@/components/footer';

import {getProperDate} from '@/lib/date';
import {getAllPages} from '@/Model/page';
import {getSingleMedia} from '@/Model/media';
import {getMenu} from '@/Model/menu';
import Header from '@/components/header/header';

export default function Articles({menu, articles}) {
    const router = useRouter();
    const {locale} = router;

    const {t} = useTranslation();

    const apiMediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;

    return (
        <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <Head>
                <title>{t('articles:title')}</title>
            </Head>

            <div>
                <div className="container max-w-screen-xl mx-auto">
                    {menu && <Header menu={menu.data} currentLanguage={locale} />}

                    <div className="flex flex-row justify-center mt-2">
                        <h1>{t('articles:title')}</h1>
                    </div>
                    <div className="container mx-auto sm:flex">
                        <main className="mx-2 mt-4 sm:mx-20">
                            <div className="flex flex-wrap">
                                {articles?.map(article => (
                                    <div className="w-full px-2 sm:w-1/2 md:w-1/3" key={article.id}>
                                        {console.log(article.bandeau)}
                                        <Link href={`/${article.pageSlug}`}>
                                            <a className="flex flex-col gap-1">
                                                {article.bandeau ? (
                                                    <img
                                                        className="mx-auto"
                                                        src={`${apiMediaUrl}${article.bandeau.public_path}`}
                                                    />
                                                ) : null}
                                                <h3 className="inline-block">{article.pageName}</h3>
                                                <div className="inline-block mx-2 text-sm">
                                                    {t('common:article_date')} {getProperDate(article.created_at)}
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
    const menu = await getMenu(context.locale);
    const articles = await getAllPages(locale, 'article');
    for (var article of articles) {
        if (article.bandeau_id) {
            article.bandeau = await getSingleMedia(article.bandeau_id);
        }
    }
    if (!articles) {
        return {
            notFound: true,
        };
    }
    return {
        props: {menu, articles}, // will be passed to the page component as props
        revalidate: 10,
    };
}
