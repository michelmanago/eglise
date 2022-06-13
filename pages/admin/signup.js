import authorize from '@/lib/authorize';
import React from 'react';
//import {getSession} from 'next-auth/client';
import Header from '../../components/header/header';
import SignupComp from '../../components/signup';
import {getMenu} from '../../Model/menu';
import Cookie from 'cookie';

export default function Login({menu}) {
    return (
        <div>
            {menu && <Header menu={menu.data} />}
            <SignupComp />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }
    const menu = await getMenu(context.locale);

    return {
        props: {menu},
    };
}
