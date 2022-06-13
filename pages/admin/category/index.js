// models
import {getMenu} from '../../../Model/menu';

// libs
import Head from 'next/head';
//import {getSession} from 'next-auth/client';
import Link from 'next/link';
import Cookie from 'cookie';

// components
import Header from '../../../components/header/header';

// parameters
import {capitalize} from '../../../utils/utils';
import {getAllCategories} from '../../../Model/category';
import authorize from '@/lib/authorize';

export default function AdminCategory({menu, categories}) {
    const categoryWithoutDefunts = categories.filter(c => c.title !== 'defunt');

    return (
        <>
            <Head>
                <title>Admin - Catégories</title>
            </Head>

            {menu && <Header menu={menu.data} />}

            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="mb-3 text-4xl font-semibold">Modifier les catégories</h1>
                <ul className="pl-5">
                    {categoryWithoutDefunts.map(cat => (
                        <li key={cat.id}>
                            <Link href={`/admin/category/${cat.title}`}>
                                <a className="text-lg text-blue-500 underline">{capitalize(cat.title)}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
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

    // data
    const menu = await getMenu(context.locale);
    const categories = await getAllCategories();

    return {
        props: {
            menu: menu,
            categories,
        },
    };
}
