// libs
import Head from 'next/head';
import Cookie from 'cookie';

// model
import {getMenu} from '../../../Model/menu';
import {getPaginatedPages} from '../../../Model/page';
import {getAllCategories} from '../../../Model/category';

// components
import Header from '../../../components/header/header';
import ListPage from '../../../components/list-page/ListPage';
import authorize from '@/lib/authorize';

export default function Page({menu, pages, categories}) {
    console.log({pages});
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
    const {req, res, query} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

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
