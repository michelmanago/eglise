import Head from 'next/head';
import {useRouter} from 'next/router';

import Cookie from 'cookie';

import authorize from '@/lib/authorize';

import Header from '@/components/header';
import Footer from '@/components/footer';
import DefuntEditorView from '@/components/defunt-editor-view';

export default function Defunt({defunt}) {
    const router = useRouter();
    const {locale} = router;

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <Header currentLanguage={locale} currentPage={`defunts/${defunt?.id}`} />

                {defunt ? <DefuntEditorView defunt={defunt} /> : <div>Loading...</div>}

                <Footer />
            </div>
        </div>
    );
}
export async function getServerSideProps(context) {
    const {req, res} = context;
    const cookie = req?.headers.cookie;
    //console.log(cookie);
    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }
    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let protocol = 'https://';
        if (host === 'localhost:3000') {
            protocol = 'http://';
        }
        const {id} = context.query;
        const res = await fetch(`${protocol}${host}/api/defunts/${id}`);
        const defunt = await res.json();

        //console.log(defunt);

        if (!defunt) {
            return {
                notFound: true,
            };
        }
        return {
            props: {defunt}, // will be passed to the page component as props
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}
