//libs
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Cookie from 'cookie';
//import {getSession, useSession} from 'next-auth/client';

// models
import {getMenu} from '../../../Model/menu';
import {getPageTranslations} from '../../../Model/page';

// components
import Header from '../../../components/header/header';
import PageEditor from '../../../components/page-editor/page-editor';

// utils
import {fetchWrapper, toMysqlFormat} from '../../../utils/utils';
import {bulkAttributePageToMedia} from '../../../utils/fetch/attributePageToMedia';
import {getAllCategories} from '../../../Model/category';
import authorize from '@/lib/authorize';

// utils

export default function PageEditorUpdate({menu, pageTranslations, categories}) {
    if (!pageTranslations || (Array.isArray(pageTranslations) && !pageTranslations.length)) {
        return <DefaultErrorPage statusCode={404} />;
    }

    // states
    const router = useRouter();

    // router
    const {defaultLocale} = useRouter();

    // methods
    const onSubmit = (formPages, attributedMedia) => {
        // add last_modified

        const originalPage = pageTranslations.find(page => page.language === router.defaultLocale);

        const now = toMysqlFormat(new Date());
        formPages = formPages.map(formPagesItem => ({
            ...formPagesItem,
            created_at: toMysqlFormat(new Date(formPagesItem.created_at)),
            last_modified: now,
        }));

        fetch('/api/page', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formPages),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(async pages => {
                await bulkAttributePageToMedia(originalPage.id, attributedMedia);
                console.log({draftOrigin: originalPage.draft, newDraft: pages[0].draft});

                if (pages[0].page === 'article' && originalPage.draft && !pages[0].draft) {
                    console.log({
                        msg: 'Page is no more in draft mode',
                        ogPagedraft: originalPage.draft,
                        newPagedraft: pages[0].draft,
                    });
                    let resSender = await fetchWrapper('/api/adherent/senderNews', pages[0], 'POST');
                    console.log({resSender});
                }

                return pages;
            })
            .then(body => {
                // do not prevent from leaving page
                window.onbeforeunload = null;

                // force reload
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('NOT OK');
            });
    };

    return (
        <>
            <Head>
                <title>Edition de page - {pageTranslations[0] && pageTranslations[0].pageName}</title>
            </Head>

            {menu && <Header menu={menu.data} />}
            <main className="bg-white">
                {pageTranslations && pageTranslations.length && (
                    <PageEditor editedPages={pageTranslations} onFormSubmitted={onSubmit} categories={categories} />
                )}
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    const {req, res} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    // menu
    const menu = await getMenu(context.locale);

    // current page edited
    const {id} = context.params;
    const pageTranslations = await getPageTranslations(id);
    const categories = await getAllCategories();

    return {
        props: {
            menu: menu,
            pageTranslations,
            categories,
        },
    };
}
