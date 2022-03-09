// libs
import Head from 'next/head';
//import {getSession, useSession} from 'next-auth/client';

// model
import {getMenu} from '../../../Model/menu';
import {getPaginatedPages} from '../../../Model/page';
import {getAllCategories} from '../../../Model/category';

// components
import Header from '../../../components/header/header';
import ListPage from '../../../components/list-page/ListPage';

export default function Page({menu, pages, categories}) {
    return (
        <>
            <Head>
                <title>Administrer le site</title>
            </Head>

            {menu && <Header menu={menu.data} />}

            <ListPage pages={pages.array} pagination={pages.pagination} categories={categories} />
        </>
    );
}

export async function getServerSideProps(context) {
    const {req, query} = context;
    /*const session = await getSession({req});

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/page`,
            },
        };
    }*/

    const category = context.query.cat;
    const offset = query.offset ? Number(query.offset) : 0;
    const search = query.search ? query.search : null;

    const menu = await getMenu(context.locale);
    const pages = await getPaginatedPages(offset, context.defaultLocale, category ? category : null, search);
    const categories = await getAllCategories();

    return {
        props: {
            menu: menu,
            pages: pages,
            categories,
        },
    };
}
