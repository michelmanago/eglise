import Link from 'next/link';
import Header from '@/components/header/header';
import authorize from '@/lib/authorize';
import {getMenu} from '@/Model/menu';
import Cookie from 'cookie';
import {searchPaging} from 'dao/adherent';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Paging from '@/components/paging';
import ButtonSearch from '@/components/button/buttonSearch';
import {fetchWrapper} from 'utils/utils';

export default function AdherentIndex({adherents, /* paging, */ menu, params}) {
    // console.log({paging});
    const {locale} = useRouter();
    const [adherentList, setAdherentList] = useState(adherents);
    // const [pagingObj, setPagingObj] = useState(paging);
    const [paramsSearch, setParamsSearch] = useState(() => params);

    const submitSearch = async e => {
        e.preventDefault();
        let {nom, prenom, email} = e.target;
        let params = {};
        // let paramsStringArray = [];

        if (nom && nom.value != '') {
            params.nom = nom.value;
            // paramsStringArray.push(`nom=${nom.value}`);
        }
        if (prenom && prenom.value != '') {
            params.prenom = prenom.value;
            // paramsStringArray.push(`prenom=${prenom.value}`);
        }
        if (email && email.value != '') {
            params.email = email.value;
            // paramsStringArray.push(`email=${email.value}`);
        }

        const res = await fetchWrapper(`/api/adherent/search`, params, 'POST');
        if (res.status === 200) {
            const adherantSearch = await res.json();
            setAdherentList(adherantSearch.adherents);
            // setPagingObj(adherantSearch.paging);
            setParamsSearch(params);
            // router.replace(`/adherent?${paramsStringArray.join('&')}`, undefined, {shallow: true});
        }
    };
    return (
        <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <Header currentLanguage={locale} currentPage={''} menu={menu.data} />
            <div className="px-4">
                <div className="px-2 mb-4">
                    <h1>Fidèles</h1>
                </div>
                <div className="flex flex-row justify-center mb-2">
                    <Link href={'/admin/adherent/create'}>
                        <a className="px-2 py-1 text-white bg-blue-500 border rounded">Ajouter</a>
                    </Link>
                </div>
                <div className="flex flex-col card">
                    <div className="flex flex-col items-center">
                        <div>Recherche</div>
                        <form id="search-adherent-form" onSubmit={submitSearch} className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                {/* <div className="flex flex-col gap-1">
                                        <label htmlFor="id">N°</label>
                                        <input
                                            type={'text'}
                                            id="id"
                                            className="input-generic"
                                            defaultValue={paramsSearch?.id}
                                        />
                                    </div> */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="nom">Nom</label>
                                    <input id="nom" className="input-generic" defaultValue={paramsSearch?.nom} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="prenom">Prénom</label>
                                    <input id="prenom" className="input-generic" defaultValue={paramsSearch?.prenom} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" className="input-generic" defaultValue={paramsSearch?.email} />
                                </div>
                                {/* <div className="flex flex-col gap-1">
                                        <label htmlFor="notes">Notes</label>
                                        <input
                                            id="notes"
                                            className="input-generic"
                                            defaultValue={paramsSearch?.notes}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <label htmlFor="sommeil">Sommeil</label>
                                        <select
                                            id="sommeil"
                                            className="input-generic"
                                            defaultValue={paramsSearch?.sommeil}
                                        >
                                            <option value={''}>Tout</option>
                                            <option value={false}>non</option>
                                            <option value={true}>oui</option>
                                        </select>
                                    </div> */}
                            </div>
                            <div className="flex flex-row gap-2 place-self-center">
                                <ButtonSearch className={'order-last'} />
                                <button
                                    className="button-generic"
                                    onClick={e => {
                                        e.preventDefault();
                                        //document.getElementById('search-adherent-form').reset();
                                        document.getElementById('nom').value = '';
                                        document.getElementById('prenom').value = '';
                                        document.getElementById('email').value = '';

                                        submitSearch(e);
                                    }}
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* <div>Résultat: {pagingObj && pagingObj.count} fidèle(s)</div> */}
                    {/* <div className="flex flex-col w-1/3 gap-1">
                            <ButtonPrintLink
                                url={`/adherent/print${paramsSearch ? `?${paramsToString(paramsSearch)}` : ''}`}
                            />
                            <ButtonPrintLink
                                url={`/adherent/stickerPrint${paramsSearch ? `?${paramsToString(paramsSearch)}` : ''}`}
                                name={'Etiquettes'}
                            />
                            <ExportExcel excelData={adherentList} fileName="adherentList" />
                        </div> */}
                </div>

                {/* <div className="flex flex-col items-center">
                    <Paging
                        page={Math.ceil(pagingObj.skip / pagingObj.take) + 1}
                        totalPage={pagingObj.totalPage}
                        baseUrl={'/admin/adherent'}
                        params={paramsSearch}
                    />
                </div> */}

                <div className="border rounded">
                    <div className="grid grid-cols-12 gap-2 px-2 py-3 font-bold capitalize border-b">
                        <div className="col-span-2">nom</div>
                        <div className="col-span-2">prenom</div>
                        <div className="col-span-6">email</div>
                        <div>abonné</div>
                    </div>
                    {adherentList.map(adh => (
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
    // const adherents = await getAdherents();

    let {page} = context.query;
    const params = {};

    // const pagingAdherents = await searchPaging(params, (page != null ? page - 1 : 0) * 100, 100);
    const pagingAdherents = await searchPaging(params);

    //console.log({menu, adherents});

    return {
        props: {
            adherents: pagingAdherents.adherents,
            // paging: pagingAdherents.paging,
            menu,
            params,
        },
    };
}
