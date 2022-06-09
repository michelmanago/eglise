import {useState} from 'react';
import {useRouter} from 'next/router';

import Footer from '@/components/footer';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';

import {formatDate} from '@/lib/date';

import {Trash} from '@/components/icon';
import {getPageTranslations} from '@/Model/page';
import Header from '@/components/header/header';
import {getMenu} from '@/Model/menu';

export default function Article({pageTranslations, menu}) {
    if (!pageTranslations || (Array.isArray(pageTranslations) && !pageTranslations.length)) {
        return <DefaultErrorPage statusCode={404} />;
    }

    const router = useRouter();
    const {locale} = router;
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    //const [articleList, setArticleList] = useState(articles);
    const [langState, setLangState] = useState('FR');

    return (
        <div className="max-w-screen-xl bg-white sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
            <main className="flex flex-row gap-2 mx-4">
                <div className="w-2/3"></div>
                <div className="flex flex-col items-center w-1/3 gap-2">
                    <div className="flex flex-row my-1">
                        <div
                            className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                                langState === 'FR' ? 'bg-gray-400' : ''
                            }`}
                            onClick={e => setLangState('FR')}
                        >
                            FR
                        </div>
                        <div
                            className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                                langState === 'EN' ? 'bg-gray-400' : ''
                            }`}
                            onClick={e => setLangState('EN')}
                        >
                            EN
                        </div>
                        <div
                            className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                                langState === 'RU' ? 'bg-gray-400' : ''
                            }`}
                            onClick={e => setLangState('RU')}
                        >
                            RU
                        </div>
                    </div>
                    <button type="submit" onClick={() => {}} className="w-48 py-3 bg-pgold">
                        Enregistrement
                    </button>
                    <button className="w-48 px-2 py-3 bg-red-600" onClick={() => {}}>
                        <div className="inline-block px-1">Supprimer</div>
                        <Trash className="inline-block" />
                    </button>
                </div>
            </main>
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

    const menu = await getMenu(context.locale);

    const {id: articleId} = context.query;
    //const articles = await getPageById(articleId);
    const pageTranslations = await getPageTranslations(articleId);
    return {
        props: {
            pageTranslations,
            menu,
        },
    };
}
