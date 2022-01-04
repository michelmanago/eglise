import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

// Components
import Header from '../../components/header/header';
//import Header from '@/components/header';
import Footer from '@/components/footer';
import {getYear} from '@/lib/date';
import InputImage from '@/components/input-image';
import AppMap from '@/components/appmap';
import { getMenu } from '@/Model/menu';

export default function Tombe({nTombe, tombe, defunts, carre, menu}) {
    const router = useRouter();
    const {locale} = router;

    const [tombeImage, setTombeImage] = useState(null);
    const [carreFetch, setCarreFetch] = useState(carre?.data);

    const creationMode = false;

    // effects
    useEffect(async () => {
        if (tombe) {
            setTombeImage(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + tombe.photo);
            /*let tombes = [];
            let i = 0;
            let limit = 25;
            let resCasse = await fetch(`/api/tombes/${tombe.carre}?limit=${limit}&offset=${i * limit}`);
            let carreFetchRes = await resCasse.json();
            tombes = [...carreFetchRes.data];

            while (carreFetchRes.hasMore) {
                i++;
                resCasse = await fetch(`/api/tombes/${tombe.carre}?limit=${limit}&offset=${i * limit}`);
                carreFetchRes = await resCasse.json();
                tombes = [...tombes, ...carreFetchRes.data];
            }
            //console.log('carre: ', carreFetch);
            setCarreFetch(tombes);*/
        }
    }, [tombe]);

    // methods
    const onUploadTombeImage = file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/tombes');
        let fetchParams = {};

        fetchParams = {
            method: 'PATCH',
            body: formdata,
        };

        url.pathname += '/' + nTombe;

        return fetch(url.toString(), fetchParams)
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        setTombeImage(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + data.photo);
                    }
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Impossible d'upload l'image");
            });
    };

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>
            <div>
                <Header currentLanguage={locale} currentPage={``} menu={menu.data} />
                <div className="m-4">
                    <h2 className="text-xxl">Tombe n°{nTombe}</h2>

                    {creationMode ? (
                        <div className="inline-block w-1/3">
                            <InputImage onUpload={onUploadTombeImage} image={tombeImage} />
                        </div>
                    ) : (
                        tombe?.photo && (
                            <img
                                className="inline-block"
                                width="300"
                                src={process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + tombe.photo}
                                alt=""
                            />
                        )
                    )}

                    <ul className="inline-block mt-0 align-top">
                        {defunts?.map(defunt => (
                            <li key={defunt.id}>
                                <Link href={`/defunts/${defunt.id}`}>
                                    <a className="underline">
                                        {defunt.prenom} {defunt.nom}
                                    </a>
                                </Link>
                                {getYear(defunt.dateNaissance) && getYear(defunt.dateDeces) ? (
                                    <span>{` (${getYear(defunt.dateNaissance)} - ${getYear(defunt.dateDeces)})`}</span>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                    {tombe?.x && (
                        <AppMap
                            carre={carreFetch}
                            xTombe={tombe.x}
                            yTombe={tombe.y}
                            nTombe={nTombe}
                            defunts={defunts}
                            wTombe={tombe.vertical == '0' ? '6' : '3.5'}
                            hTombe={tombe.vertical == '0' ? '3.5' : '6'}
                        />
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, query, asPath, pathname} = context;
    const menu = await getMenu(context.locale);
    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let referer = req.headers.referer;
        console.log(req.headers);
        let protocol = 'https://';
        if (referer) {
            if (referer.startsWith('https')) protocol = 'https://';
            else protocol = 'http://';
        } else if (host.startsWith('localhost')) protocol = 'http://';

        const {nTombe} = context.query;
        const res = await fetch(`${protocol}${host}/api/tombe/${nTombe}`);

        let responseData;

        if (res.ok) {
            responseData = await res.json();

            if (!responseData) {
                return {
                    notFound: true,
                };
            }
        } else {
            return {
                notFound: true,
            };
        }

        let carre = null;
        if (responseData.tombe) {
            const resCarre = await fetch(`${protocol}${host}/static/carre/${responseData.tombe.carre}.json`);
            if (resCarre.ok)
                carre = await resCarre.json();
        }

        return {
            props: {nTombe, tombe: responseData.tombe, defunts: responseData.defunts, carre: carre, menu}, // will be passed to the page component as props
        };
    }
    return {
        props: {menu}, // will be passed to the page component as props
    };
}
