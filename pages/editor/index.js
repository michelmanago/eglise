import React, { useRef, useEffect, useState } from "react";

import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from '@/components/header';
import Footer from '@/components/footer';
import SlateEditor from "@/components/Slate/slateEditor";
import SlateHtmlEditor from '@/components/Slate/slateHtmlEditor'
import CustomEditor from '@/components/Slate/customEditor'
import { serializer, deserialize } from '@/lib/Slate/serialize'

export default function Editor(props) {
    const router = useRouter()
    const { locale, locales, defaultLocale } = router
    let title
    const [isSlateView, setIsSlateView] = useState(true);
    const [content, setContent] = useState("");
    const [message, setMessage] = useState();

    const editorRef = useRef();

    const handleClick = async (event) => {
        console.log(content); //Get the click event
        const resp = await fetch('/api/blocks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blockcontent: content,
                page: 'test',
                blockid: 1,
                language: 'fr'
            })
        });
        const json = await resp.json();
        if (resp.status === 200) {
            //router.push('/');
            setMessage({ message: 'content save' })
        } else {
            setMessage(json);
        }
    }

    const changeView = (event) => {
        //const html = localStorage.getItem('contentSerialize')
        //const document = new DOMParser().parseFromString(html, 'text/html')
        //const fragment = deserialize(document.body)
        //console.log(fragment);
        /*if (isSlateView) {
            const slateStruct = localStorage.getItem('content')
            setContent(slateStruct)
        } else {
            const html = localStorage.getItem('contentSerialize')
            setContent({ text: html });
        }*/
        setIsSlateView(!isSlateView)
    }

    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <title>{title}</title>
            </Head>
            <div className="container max-w-screen-xl mx-auto bg-pwhite">
                <Header currentLanguage={locale} currentPage={""} />
                <div>{JSON.stringify(message)}</div>
                <main className="mx-4 my-2">
                    <h1 className="m-4">Editor</h1>
                    <CustomEditor block={null} setContent={setContent} />
                    {/*<button className="text-pdarkblue" onClick={changeView}>HTML View</button>
                    {isSlateView ?
                        <SlateEditor />
                        :
                        <SlateHtmlEditor />
                    */}

                </main>
                <Footer />
            </div>


        </div>
    )
}