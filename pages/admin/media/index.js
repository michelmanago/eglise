// libs
import Head from 'next/head';
//import {getSession} from 'next-auth/client';
import Cookie from 'cookie';

// model
import {getMenu} from '../../../Model/menu';

// components
import Header from '../../../components/header/header';
import ListMedia from '../../../components/list-media/list-media';
import {getMedia} from '../../../Model/media';
import {MEDIA_TYPES} from '../../../utils/utils-media';
import {getMediaLink} from '../../../utils/utils-serveur-image';
import authorize from '@/lib/authorize';

const defaultAccepts = Object.values(MEDIA_TYPES);

export default function PageMedia({menu, media}) {
    return (
        <>
            <Head>
                <title>Admin - Liste des media</title>
            </Head>

            {menu && <Header menu={menu.data} />}

            <ListMedia media={media} />
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

    // query
    let pageOffset = context.query.offset;
    pageOffset = pageOffset ? parseInt(pageOffset) : 0;

    let associatedTo = context.query.page;
    associatedTo = associatedTo ? parseInt(associatedTo) : null;

    let mediaType = context.query.accepts;

    const isFilteringNonAssociated = !(typeof query.with_no_page === 'undefined');

    const menu = await getMenu(context.locale);
    const media = await getMedia(
        associatedTo,
        pageOffset,
        mediaType ? [mediaType] : defaultAccepts,
        isFilteringNonAssociated,
    );

    return {
        props: {
            menu: menu,
            media,
        },
    };
}
