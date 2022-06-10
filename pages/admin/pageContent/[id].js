import Router from 'next/router';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {verify} from 'jsonwebtoken';
import Cookie from 'cookie';

import Header from '@/components/header';
import Footer from '@/components/footer';

import authorize from '@/lib/authorize';

export default function PageContent({block}) {
    const router = useRouter();
    const {locale} = router;

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-white">
            <Header currentLanguage={locale} currentPage={''} />

            <h1>Test PageContent Render</h1>

            <div dangerouslySetInnerHTML={{__html: block.blockcontent}} />

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
    return {
        props: {}, // will be passed to the page component as props
    };
}
