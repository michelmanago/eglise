import authorize from '@/lib/authorize';
import {getMenu} from '@/Model/menu';
import {getAdherent} from 'dao/adherent';
import {useState} from 'react';
import Cookie from 'cookie';
import Header from '@/components/header/header';
import {useRouter} from 'next/router';
import {fetchWrapper} from 'utils/utils';
import AdherentCreate from '@/components/adherent/adherentCreate';
// import Link from 'next/link';

export default function Adherent({Adherent, menu}) {
    const router = useRouter();
    const {locale} = router;
    const [adherent, setAdherent] = useState(Adherent);

    const saveHandler = async () => {
        const res = await fetchWrapper('/api/adherent', adherent, 'PUT');
        console.log({res});
        if (res.status === 200) {
            router.push('/admin/adherent');
        }
    };
    console.log({adherent});
    return (
        <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
            <AdherentCreate adherent={adherent} setAdherent={setAdherent} saveHandler={saveHandler} />
            {/* <div className="flex flex-col items-center justify-center gap-2 py-10">
                <div className="flex flex-row gap-1">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        className="px-2 border rounded"
                        value={adherent.nom}
                        onChange={e => setAdherent({...adherent, nom: e.target.value})}
                    />
                </div>
                <div className="flex flex-row gap-1">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        className="px-2 border rounded"
                        value={adherent.prenom}
                        onChange={e => setAdherent({...adherent, prenom: e.target.value})}
                    />
                </div>
                <div className="flex flex-row w-full gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="w-full px-2 border rounded"
                        value={adherent.email}
                        onChange={e => setAdherent({...adherent, email: e.target.value})}
                    />
                </div>
                <div className="flex flex-row gap-1">
                    <label htmlFor="postal">Adresse</label>
                    <input
                        type="text"
                        id="postal"
                        className="px-2 border rounded"
                        value={adherent.postale ? adherent.postale : ''}
                        onChange={e => setAdherent({...adherent, postale: e.target.value})}
                    />
                </div>
                <div className="flex flex-row gap-1">
                    <label htmlFor="news">Abonné</label>
                    <input
                        type="checkbox"
                        id="news"
                        checked={adherent.news}
                        onChange={e => setAdherent({...adherent, news: e.target.checked})}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Link href={'/admin/adherent'}>
                        <a className="px-2 py-1 text-white bg-red-500 border rounded">Annuler</a>
                    </Link>
                    <div className="px-2 py-1 text-white bg-blue-500 border rounded" onClick={saveHandler}>
                        Sauvegarder
                    </div>
                </div>
            </div> */}
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

    const {id} = context.query;

    const menu = await getMenu(context.locale);
    const Adherent = await getAdherent(parseInt(id));

    return {
        props: {Adherent, menu},
    };
}
