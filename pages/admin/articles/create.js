import Header from '@/components/header';
import Footer from '@/components/footer';
import {useRouter} from 'next/router';
import {useState} from 'react';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';

import {formatDate} from '@/lib/date';
import {getNextArticleId} from '@/Model/last_obj_id';
import ArticleLang from '@/components/Admin/Article/article-lang';
import InputImage from '@/components/input-image';

export default function CreateArticle({nextArticleId}) {
    const router = useRouter();
    const {locale} = router;
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    const [articles, setArticles] = useState(() => [
        {image: '', title: '', date: formatDate(new Date()), content: '', lang: 'fr', article_id: nextArticleId, tmpId: 0},
        {image: '', title: '', date: formatDate(new Date()), content: '', lang: 'en', article_id: nextArticleId, tmpId: 1},
        {image: '', title: '', date: formatDate(new Date()), content: '', lang: 'ru', article_id: nextArticleId, tmpId: 2},
    ]);
    const [langState, setLangState] = useState('FR');

    const setArticle = article => {
        let newArticleList = [...articles];
        newArticleList.forEach((elt, index, array) => {
            if (article.tmpId === elt.tmpId) array[index] = article;
        });
        setArticles(newArticleList);
    };

    const saveArticle = async () => {
        const res = await fetch(`/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articles),
        });
        if (res.ok) router.push('/admin/articles');
    };

    const setImage = urlImg => {
        var newArticles = [...articles];
        newArticles.forEach((elt, index, array) => {
            array[index].image = urlImg;
        });
        setArticles(newArticles);
    };
    const onUploadPhoto = async file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/articles');
        let fetchParams = {};

        // update
        fetchParams = {
            method: 'POST',
            body: formdata,
        };

        const res = await fetch(url.toString(), fetchParams);
        if (res.ok) {
            const data = await res.json();

            if (data) {
                setImage(data.url);
            }
        } else {
            return null;
        }
    };
    const changeDate = event => {
        let newArticleList = [...articles];
        newArticleList.forEach((elt, index, array) => {
            array[index].date = event.target.value;
        });
        setArticles(newArticleList);
    };

    return (
        <div className="max-w-screen-xl bg-pwhite sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} />
            <main>
                <div className="flex mt-1 place-content-center">
                    <button type="submit" onClick={saveArticle} className="w-48 py-3 bg-pgold">
                        Enregistrement
                    </button>
                </div>
                <input type="date" value={articles[0].date ? formatDate(articles[0].date) : ''} onChange={changeDate} />
                <div className="m-1 w-52">
                    <InputImage
                        key={`uploadInput1`}
                        onUpload={onUploadPhoto}
                        image={
                            articles[0].image != ''
                                ? process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + articles[0].image
                                : null
                        }
                    />
                </div>
                <div>
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
                    {langState === 'FR' && <ArticleLang article={articles[0]} setArticle={setArticle} />}
                    {langState === 'EN' && <ArticleLang article={articles[1]} setArticle={setArticle} />}
                    {langState === 'RU' && <ArticleLang article={articles[2]} setArticle={setArticle} />}
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

    const nextArticleId = await getNextArticleId();
    return {props: {nextArticleId: nextArticleId}};
}
