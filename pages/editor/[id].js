import React, {useRef, useEffect, useState} from 'react';

import Head from 'next/head';
import {useRouter} from 'next/router';

import Header from '@/components/header';
import Footer from '@/components/footer';
import SlateEditor from '@/components/Slate/slateEditor';
import CustomEditor from '@/components/Slate/customEditor';

export default function Editor({block}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;
    let title;
    const [content, setContent] = useState(block.blockcontent);

    const setBlock = block => {
        setContent(block);
    };

    const [message, setMessage] = useState();

    //console.log("block: ", block.blockcontent)

    const handleClick = async event => {
        console.log(content); //Get the click event
        const resp = await fetch(`/api/blocks/${block.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blockcontent: content,
                page: block.page,
                blockid: block.blockid,
                language: block.language,
            }),
        });
        const json = await resp.json();
        if (resp.status === 200) {
            //router.push('/');
            setMessage({message: 'content save'});
        } else {
            setMessage(json);
        }
    };

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="container max-w-screen-xl mx-auto bg-white">
                <Header currentLanguage={locale} currentPage={''} />
                <div>{JSON.stringify(message)}</div>
                <main>
                    <h1>Editor</h1>

                    <CustomEditor block={content} setContent={setBlock} />
                    <button
                        className="px-2 py-1 mt-2 ml-2 text-black border border-black rounded"
                        onClick={handleClick}
                    >
                        Sauvegarder
                    </button>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, query, asPath, pathname} = context;
    const {id} = context.query;
    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let protocol = 'https://';
        if (host.startsWith('localhost')) {
            protocol = 'http://';
        }
        const res = await fetch(`${protocol}${host}/api/blocks/${id}`);
        const block = await res.json();

        if (!block) {
            return {
                notFound: true,
            };
        }
        return {
            props: {block}, // will be passed to the page component as props
        };
    }
    return {props: {}};
}
