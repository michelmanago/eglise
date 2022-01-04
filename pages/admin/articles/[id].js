import {getArticleByArticleId} from '@/Model/articles-model';
import {useState} from 'react';
import {useRouter} from 'next/router';
import ArticleLang from '@/components/Admin/Article/article-lang';
import Header from '@/components/header';
import Footer from '@/components/footer';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';

import {formatDate} from '@/lib/date';

import InputImage from '@/components/input-image';
import {Trash} from '@/components/icon';

export default function Article({articles}) {
    const router = useRouter();
    const {locale} = router;
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    const [articleList, setArticleList] = useState(articles);
    const [langState, setLangState] = useState('FR');

    const setArticle = article => {
        let newArticleList = [...articleList];

        newArticleList.forEach((elt, index, array) => {
            if (article.id === elt.id) array[index] = article;
        });

        setArticleList(newArticleList);
    };

    const saveArticle = async () => {
        var articleToSave = [...articleList];
        for (const article of articleToSave) {
            article.date = formatDate(article.date);
        }
        const res = await fetch(`/api/articles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleList),
        });
        if (res.ok) router.push('/admin/articles');
    };

    const setImage = urlImg => {
        var newArticles = [...articleList];
        newArticles.forEach((elt, index, array) => {
            array[index].image = urlImg;
        });
        setArticleList(newArticles);
    };

    const onUploadPhoto = async file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/articles');
        let fetchParams = {};

        // update
        fetchParams = {
            method: 'PATCH',
            body: formdata,
        };
        url.pathname += '/' + articleList[0].article_id;

        const res = await fetch(url.toString(), fetchParams);
        if (res.ok) {
            const data = await res.json();

            if (data) {
                console.log(data);
                setImage(data.url);
            }
        } else {
            return null;
        }
    };
    const changeDate = event => {
        console.log(event.target.value);
        let newArticleList = [...articleList];
        newArticleList.forEach((elt, index, array) => {
            array[index].date = event.target.value;
        });
        setArticleList(newArticleList);
    };

    const deleteArticle = async () => {
        if (confirm('Etes vous sûr de vouloir supprimer cette article ?')) {
            console.log('delete Article');
            const res = await fetch(`/api/articles`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleList),
            });
            if (res.ok) {
                router.push('/admin/articles');
            }
        }
    };
    return (
        <div className="max-w-screen-xl bg-pwhite sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} />
            <main className="mx-4">
                <div className="flex mt-1 place-content-center">
                    <button type="submit" onClick={saveArticle} className="w-48 py-3 bg-pgold">
                        Enregistrement
                    </button>
                </div>
                <button className="float-right w-48 px-2 py-3 mr-1 bg-red-600" onClick={() => deleteArticle()}>
                    <div className="inline-block px-1">Supprimer</div>
                    <Trash className="inline-block" />
                </button>
                <div>
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
                    <input
                        type="date"
                        value={articleList[0].date ? formatDate(articleList[0].date) : ''}
                        onChange={changeDate}
                    />
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
                    {langState === 'FR' && (
                        <ArticleLang article={articles.filter(art => art.lang === 'fr')[0]} setArticle={setArticle} />
                    )}
                    {langState === 'EN' && (
                        <ArticleLang article={articles.filter(art => art.lang === 'en')[0]} setArticle={setArticle} />
                    )}
                    {langState === 'RU' && (
                        <ArticleLang article={articles.filter(art => art.lang === 'ru')[0]} setArticle={setArticle} />
                    )}
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

    const {id: articleId} = context.query;
    const articles = await getArticleByArticleId(articleId);
    return {
        props: {
            articles: articles,
        },
    };
}
