import Link from 'next/link';
import Header from '@/components/header/header';
import authorize from '@/lib/authorize';
import {getMenu} from '@/Model/menu';
import Cookie from 'cookie';
import {getAdherents} from 'dao/adherent';
import {useRouter} from 'next/router';

export default function AdherentIndex({adherents, menu}) {
    const {locale} = useRouter();
    return (
        <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
            <div className="px-4">
                <div className="px-2 mb-4">
                    <h1>Adherents</h1>
                </div>
                <div className="flex flex-row justify-center mb-2">
                    <Link href={'/admin/adherent/create'}>
                        <a className="px-2 py-1 text-white bg-blue-500 border rounded">Ajouter</a>
                    </Link>
                </div>
                <div className="border rounded">
                    <div className="grid grid-cols-12 gap-2 px-2 py-3 font-bold capitalize border-b">
                        <div className="col-span-2">nom</div>
                        <div className="col-span-2">prenom</div>
                        <div className="col-span-6">email</div>
                        <div>abonné</div>
                    </div>
                    {adherents.map(adh => (
                        <div className="grid grid-cols-12 gap-2 px-2 py-3 border-b" key={adh.id}>
                            <div className="col-span-2 capitalize">{adh.nom}</div>
                            <div className="col-span-2 capitalize">{adh.prenom}</div>
                            <div className="col-span-6">{adh.email}</div>
                            <div>{adh.news ? 'oui' : 'non'}</div>
                            <div className="col-span-1 underline">
                                <Link href={`/admin/adherent/${adh.id}`}>
                                    <a className="hover:text-gray-500">Editer</a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, res} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }
    const menu = await getMenu(context.locale);
    const adherents = await getAdherents();

    //console.log({menu, adherents});

    return {
        props: {
            adherents,
            menu,
        },
    };
}
