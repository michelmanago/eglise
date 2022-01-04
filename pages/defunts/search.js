import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {formatDateToDisplay} from '@/lib/date';

// component
//import Header from '@/components/header';
import Header from '../../components/header/header';
import Footer from '@/components/footer';
import SelectCat from '@/components/select-cat';
import SearchBar from '@/components/defunts/search-bar';

// model
import {getMenu} from '@/Model/menu';

export default function Search({menu}) {
    const router = useRouter();
    const {locale} = router;

    const [name, setName] = useState('');
    const [nameFille, setNameFille] = useState('');
    const [firstName, setFirstName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [categorie, setCategorie] = useState('');
    const [results, setResults] = useState(() => []);
    const [tombeSearch, setTombeSearch] = useState('');
    const [tombeResults, setTombeResults] = useState('');
    const namSearch = () => {
        if (categorie != '') setCategorie('');
        const queryObj = {
            nom: name,
            nomJFille: nameFille,
            prenom: firstName,
            pseudonyme: pseudo,
            categorie: '',
        };
        handleSearch(queryObj);
    };
    const handleSearch = async queryObj => {
        const request = await fetch('/api/defunts/search', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryObj),
        });
        const resultList = await request.json();
        setResults(resultList);
    };
    const redirectToPage = async item => {
        const res = await fetch(`/api/page/${item.dynPageId}`);
        const dynPage = await res.json();

        const pageSlugSplit = dynPage.pageSlug.split('/');

        router.push(`/${pageSlugSplit[pageSlugSplit.length - 1]}`);
    }
    useEffect(() => {
        if (categorie != '') {
            if (name != '') setName('');
            if (firstName != '') setFirstName('');
            if (nameFille != '') setNameFille('');
            if (pseudo != '') setPseudo('');
            const queryObj = {
                nom: '',
                nomJFille: '',
                prenom: '',
                pseudonyme: '',
                categorie: categorie,
            };
            handleSearch(queryObj);
        }
    }, [categorie]);

    useEffect(async () => {
        console.log('check update tombe');
        if (tombeSearch.length > 0) {
            const results = await fetch('/api/tombes?query=' + tombeSearch);
            setTombeResults(await results.json());
        } else if (tombeResults.length != 0) {
            setTombeResults([]);
        }
    }, [tombeSearch]);
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>
            <main>
                {/*<Header currentLanguage={locale} currentPage={`defunts`} />*/}
                <Header currentPage={''} currentLanguage={locale} menu={menu.data} />
                <div className="mt-2">
                    <div className="flex flex-col items-center mb-2 text-center sm:flex-row sm:justify-center">
                        <SearchBar inputLabel={'Nom'} searchProp={'nom'} prop={name} setProp={setName} />
                        <SearchBar
                            inputLabel={'Nom de Jeune Fille'}
                            searchProp={'nomJFille'}
                            prop={nameFille}
                            setProp={setNameFille}
                        />
                        <SearchBar
                            inputLabel={'Prénom'}
                            searchProp={'prenom'}
                            prop={firstName}
                            setProp={setFirstName}
                        />
                        <SearchBar
                            inputLabel={'Pseudonyme'}
                            searchProp={'pseudonyme'}
                            prop={pseudo}
                            setProp={setPseudo}
                        />
                    </div>

                    <div className="flex flex-col items-center mb-2">
                        <button className="p-2 my-1 text-white cursor-pointer bg-pgold" onClick={namSearch}>
                            Rechercher
                        </button>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <div className="w-full ml-10 mr-4 border-b border-black" />
                    <div className="">ou</div>
                    <div className="w-full ml-4 mr-10 border-b border-black" />
                </div>
                <div className="flex flex-col items-center py-1">
                    <div className="py-1">
                        <div className="inline-block mr-2">Personalités:</div>
                        <SelectCat categorie={categorie} setCategorie={setCategorie} />
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <div className="w-full ml-10 mr-4 border-b border-black" />
                    <div className="">ou</div>
                    <div className="w-full ml-4 mr-10 border-b border-black" />
                </div>

                <div className="flex flex-row justify-center mb-2">
                    <div className="flex flex-row items-center justify-center px-1">
                        <div className="mx-1">Numéro de Tombe:</div>
                        <div className="relative">
                            <input
                                type="text"
                                value={tombeSearch}
                                className="px-2 py-1 mx-1 border border-black"
                                onChange={e => {
                                    setTombeSearch(e.target.value);
                                }}
                            />
                            <div className="absolute left-0 z-10 w-full px-1 list-none top-8">
                                {tombeResults.length > 0 &&
                                    tombeResults.map(tombe => (
                                        <div
                                            className={`border-b border-black border-l border-r bg-blue-500 text-white px-2 py-1 cursor-pointer`}
                                            key={tombe.id}
                                        >
                                            <Link href={`/tombe/${tombe.id}`}>
                                                <a>{tombe.nom}</a>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="mx-2 my-1 bg-white border border-black cursor-pointer">
                        <div className="grid grid-cols-4 p-2 border-b border-black sm:grid-cols-6 justify-items-center">
                            <div className="px-2">Tombe</div>
                            <div className="px-2">Nom</div>
                            <div className="px-2">Née</div>
                            <div className="px-2">Prénom</div>
                            <div className="hidden px-2 sm:block">Date de Naissance</div>
                            <div className="hidden px-2 sm:block">Date de Décès</div>
                        </div>
                        {results.map((item, index) => {
                            console.log(item);
                            var pageSlugArray = [];
                            if (item.prenom) pageSlugArray.push(item.prenom);
                            if (item.nomJFille) pageSlugArray.push(item.nomJFille);
                            if (item.patronyme) pageSlugArray.push(item.patronyme);
                            if (item.nom) pageSlugArray.push(item.nom);
                            pageSlugArray.push(item.id);
                            var pageSlug = pageSlugArray.join('-');
                            return (
                                <div href={`/${pageSlug}`} key={item.id} onClick={() => redirectToPage(item)}>
                                    <a>
                                        <div
                                            className={`grid grid-cols-4 sm:grid-cols-6 p-2 ${
                                                index != results.length - 1 ? 'border-b border-black' : ''
                                            } justify-items-center`}
                                            key={item.id}
                                        >
                                            <div className="px-2">{item.tombe}</div>
                                            <div className="px-2">{item.nom}</div>
                                            <div className="px-2">{item.nomJFille}</div>
                                            <div className="px-2">{item.prenom}</div>
                                            <div className="hidden px-2 sm:block">
                                                {item.dateNaissance ? formatDateToDisplay(item.dateNaissance) : '-'}
                                            </div>
                                            <div className="hidden px-2 sm:block">
                                                {item.dateDeces ? formatDateToDisplay(item.dateDeces) : '-'}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}

                <Footer />
            </main>
        </div>
    );
}

export async function getStaticProps(context) {
    const menu = await getMenu(context.locale);
    return {
        props: {
            menu,
        },
        revalidate: 10,
    };
}
