import {getArticlesByLang} from '@/Model/articles-model';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Cookie from 'cookie';
import authorize from '@/lib/authorize';
import {getProperDate} from '@/lib/date';

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Articles({articles}) {
    const router = useRouter();
    const {locale} = router;
    const [articleList, setArticleList] = useState(articles);
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentLanguage={locale} currentPage={''} />
            <div className="flex mt-1 place-content-center">
                <Link href="/admin/articles/create">
                    <a>
                        <button className="w-48 py-3 bg-pgold">Créer</button>
                    </a>
                </Link>
            </div>
            <div className="flex flex-wrap my-2">
                {articleList?.map(article => (
                    <div className="w-1/3 px-2" key={article.id}>
                        <Link href={`/admin/articles/${article.article_id}`}>
                            <a>
                                {article.image ? (
                                    article.image.startsWith('http') ? (
                                        <img className="mx-auto" src={`${article.image}`} />
                                    ) : (
                                        <img className="mx-auto" src={`${imgBaseUrl}/${article.image}`} />
                                    )
                                ) : null}
                                <h3 className="inline-block">{article.title}</h3>
                                <div className="inline-block mx-2 text-sm">{getProperDate(article.date)}</div>
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
    const {req, res, query, asPath, pathname} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    const articles = await getArticlesByLang('fr');
    return {
        props: {
            articles: articles,
        },
    };
}
