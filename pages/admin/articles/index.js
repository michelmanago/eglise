import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Cookie from 'cookie';
import authorize from '@/lib/authorize';
import {getProperDate} from '@/lib/date';

import Footer from '@/components/footer';
import {getAllPageByType} from '@/Model/page';
import {getSingleMedia} from '@/Model/media';
import Header from '@/components/header/header';
import {getMenu} from '@/Model/menu';
import useTranslation from 'next-translate/useTranslation';

export default function Articles({articles, menu}) {
    const router = useRouter();
    const {locale} = router;
    const [articleList, setArticleList] = useState(articles);
    const apiMediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;
    const {t} = useTranslation();
    return (
        <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
            <div className="flex mt-1 place-content-center">
                <Link href="/admin/page/create?type=article">
                    <a>
                        <button className="w-48 py-3 bg-pgold">Créer</button>
                    </a>
                </Link>
            </div>
            <div className="flex flex-wrap my-2">
                {articleList
                    ?.sort((a, b) => (a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0))
                    .map(article => (
                        <div className="w-1/3 px-2 mt-2" key={article.id}>
                            <Link href={`/admin/page/${article.id}`}>
                                <a className="flex flex-col gap-1">
                                    {article.bandeau ? (
                                        <img
                                            className="object-cover mx-auto"
                                            style={{aspectRatio: '4 / 3'}}
                                            src={`${apiMediaUrl}${article.bandeau.public_path}`}
                                        />
                                    ) : (
                                        <img
                                            className="object-cover mx-auto border border-black"
                                            style={{aspectRatio: '4 / 3'}}
                                            src="/static/img/default-article-img.jpg"
                                        />
                                    )}
                                    <h3 className="inline-block">{article.pageName}</h3>
                                    <div className="inline-block text-sm">
                                        {t('common:article_date')} {getProperDate(article.created_at)}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, res, locale} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    const menu = await getMenu(context.locale);

    const articles = await getAllPageByType('article');
    for (var article of articles) {
        if (article.bandeau_id) {
            article.bandeau = await getSingleMedia(article.bandeau_id);
        }
    }
    return {
        props: {
            articles: articles.filter(page => page.language === 'fr'),
            menu,
        },
    };
}
