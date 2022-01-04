import {useCallback, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

// Components
import Header from '../components/header/header';
//import Header from '@/components/header';
import Footer from '@/components/footer';
import Search from '@/components/search';

import styles from '@/styles/defunts.module.css';

// Models
import {getDefunts} from '@/Model/defunts';
import { getMenu } from '@/Model/menu';

export default function Defunts({defunts, menu}) {
    const router = useRouter();
    const {locale} = router;
    const [defuntsList, setDefuntsList] = useState(defunts);

    const dataEndpoint = (offset, limit) => `/api/defunts?offset=${offset}&limit=${limit}`;

    const onClickNext = useCallback(
        event => {
            let count = defuntsList.metadata.count;
            let limit = defuntsList.metadata.limit;
            let offset = defuntsList.metadata.offset;
            if (count === limit) {
                fetch(dataEndpoint(offset + limit, limit))
                    .then(res => res.json())
                    .then(res => {
                        setDefuntsList(res);
                    });
            }
        },
        [defuntsList],
    );
    const onClickPrev = useCallback(
        event => {
            let limit = defuntsList.metadata.limit;
            let offset = defuntsList.metadata.offset;
            if (offset != 0) {
                fetch(dataEndpoint(offset - limit, limit))
                    .then(res => res.json())
                    .then(res => {
                        setDefuntsList(res);
                    });
            }
        },
        [defuntsList],
    );

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <div className="container max-w-screen-xl mx-auto bg-pwhite">
                    <Header currentPage={''} currentLanguage={locale} menu={menu.data} />

                    <div className="container mx-auto sm:flex">
                        <main className="mx-2 mt-4">
                            <h1>Eglise russe de Sainte Genevieve des bois</h1>
                            <div className="px-2">Liste des défunts du cimetière</div>

                            <div className="my-2">
                                <Search url="/defunts/" />
                            </div>

                            <div className="flex justify-center">
                                {defuntsList.metadata.offset !== 0 ? (
                                    <div
                                        className={styles.btn_nav}
                                        data-offset={defuntsList.metadata.offset}
                                        data-limit={defuntsList.metadata.limit}
                                        onClick={onClickPrev}
                                    >
                                        {'<'}
                                    </div>
                                ) : (
                                    <div
                                        className={`${styles.btn_nav} ${styles.btn_nav_desabled}`}
                                        data-offset={defuntsList.metadata.offset}
                                        data-limit={defuntsList.metadata.limit}
                                        onClick={onClickPrev}
                                    >
                                        {'<'}
                                    </div>
                                )}
                                <div className={`${styles.btn_nav} ${styles.btn_nav_desabled}`}>
                                    {Math.ceil(defuntsList.metadata.offset / defuntsList.metadata.limit) + 1}
                                </div>
                                {defuntsList.metadata.count === defuntsList.metadata.limit ? (
                                    <div
                                        className={styles.btn_nav}
                                        data-count={defuntsList.metadata.count}
                                        data-offset={defuntsList.metadata.offset}
                                        data-limit={defuntsList.metadata.limit}
                                        onClick={onClickNext}
                                    >
                                        {'>'}
                                    </div>
                                ) : (
                                    <div
                                        className={`${styles.btn_nav} ${styles.btn_nav_desabled}`}
                                        data-count={defuntsList.metadata.count}
                                        data-offset={defuntsList.metadata.offset}
                                        data-limit={defuntsList.metadata.limit}
                                        onClick={onClickNext}
                                    >
                                        {'>'}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap mx-2 mt-2">
                                {defuntsList.data.map((defunt, i) => (
                                    <div className="flex w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5" key={defunt.id}>
                                        <div className="flex-1 p-2 mb-2 ml-2 border border-black rounded" key={i}>
                                            <Link href={`/defunts/${defunt.id}`}>
                                                <a>
                                                    {defunt.prenom} {defunt.nom}
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
}

/*export async function getServerSideProps(context) {
    const { req, query, asPath, pathname } = context;
    if (req) {
        let host = req.headers.host // will give you localhost:3000
        let protocol = "https://"
        if (host === "localhost:3000") {
            protocol = "http://"
        }
        //const res = await fetch(`http://localhost:3000/api/defunts`)
        const res = await fetch(`${protocol}${host}/api/defunts`)
        const defunts = await res.json()
    
        if (!defunts) {
            return {
                notFound: true,
            }
        }
        return {
            props: { defunts }, // will be passed to the page component as props
        }
    }
    return {props: {  },}
}*/

export async function getStaticProps(context) {
    const defunts = await getDefunts(100, 0);
    const menu = await getMenu(context.locale);
    //const defunts = await res.json();
    if (!defunts) {
        return {
            notFound: true,
        };
    }
    return {
        props: {defunts, menu}, // will be passed to the page component as props
        revalidate: 10,
    };
}
