import React, {useCallback, useState, useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Cookie from 'cookie';

import Header from '@/components/header';
import Footer from '@/components/footer';

//import { getDefunts } from '@/api/defunts/index'
//import { getDefunt } from '@/api/defunts/[id]'

import authorize from '@/lib/authorize';
import {formatDate} from '@/lib/date';
import CustomEditor from '@/components/Slate/customEditor';
import InputImage from '@/components/input-image';
import PjView from '@/components/Admin/Defunt/pj-view';
import InfoLangView from '@/components/Admin/Defunt/info-lang-view';
import SelectCat from '@/components/select-cat';
import IconOpenNew from '@/components/icons/IconOpenNew';

export default function Defunt({defunt, tombeObj}) {
    const router = useRouter();
    const {locale} = router;
    const [id, setId] = useState(defunt.id);
    const [celebrite, setCelebrite] = useState(defunt.celebrite);
    const [carousel, setCarousel] = useState(defunt.carousel);
    const [tombe, setTombe] = useState(defunt.tombe);
    const [categorie, setCategorie] = useState(defunt.categorie ? defunt.categorie : 'None');
    const [titre, setTitre] = useState(defunt.titre);
    const [nom, setNom] = useState(defunt.nom);
    const [nomJFille, setNomJFille] = useState(defunt.nomJFille ? defunt.nomJFille : '');
    const [prenom, setPrenom] = useState(defunt.prenom);
    const [patronyme, setPatronyme] = useState(defunt.patronyme ? defunt.patronyme : '');
    const [pseudonyme, setPseudonyme] = useState(defunt.pseudonyme ? defunt.pseudonyme : '');
    const [profession, setProfession] = useState(defunt.profession ? defunt.profession : '');
    const [dateNaissance, setDateNaissance] = useState(formatDate(defunt.dateNaissance));
    const [villeNaissance, setVilleNaissance] = useState(defunt.villeNaissance ? defunt.villeNaissance : '');
    const [paysNaissance, setPaysNaissance] = useState(defunt.paysNaissance ? defunt.paysNaissance : '');
    const [dateDeces, setDateDeces] = useState(formatDate(defunt.dateDeces));
    const [lieuDeces, setLieuDeces] = useState(defunt.lieuDeces ? defunt.lieuDeces : '');
    const [bio, setBio] = useState(defunt.bio);
    const [validated, setValidated] = useState(defunt.validated === 1 ? true : false);

    const pieceJointePhotoDefunt = defunt.piecesJointes?.find(pj => pj.categorie === 'photo_defunt');
    const [photoDefunt, setPhotoDefunt] = useState(pieceJointePhotoDefunt ? pieceJointePhotoDefunt : null);
    const [photoLegend, setPhotoLegend] = useState(
        pieceJointePhotoDefunt && pieceJointePhotoDefunt.legende ? pieceJointePhotoDefunt.legende : '',
    );
    const [pieceJointeDefunt, setPieceJointeDefunt] = useState(defunt.piecesJointes ? defunt.piecesJointes : []);

    const [tombeImage, setTombeImage] = useState(
        tombeObj ? `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${tombeObj.photo}` : null,
    );

    var structInfoLang = {en: {}, ru: {}};
    defunt.infoLangs?.map(info => {
        structInfoLang[info.lang] = info;
    });
    const [infoLangs, setInfoLangs] = useState(structInfoLang);

    const [tab, setTab] = useState('defunt');
    const [infoLangTab, setInfoLangTab] = useState('fr');

    const [message, setMessage] = useState('');

    const [dynPageId, setDynPageId] = useState('');

    useEffect(async () => {
        var pageSlugArray = [];
        if (defunt.prenom) pageSlugArray.push(defunt.prenom);
        if (defunt.nomJFille) pageSlugArray.push(defunt.nomJFille);
        if (defunt.patronyme) pageSlugArray.push(defunt.patronyme);
        if (defunt.nom) pageSlugArray.push(defunt.nom);
        pageSlugArray.push(defunt.id);
        var pageSlug = pageSlugArray.join('-');
        const res = await fetch(`/api/page/pageslug/${pageSlug}`);
        const dynPage = await res.json();
        setDynPageId(dynPage.id);
    }, []);

    async function handleEdites(e) {
        e.preventDefault();

        const updateInfoLang = await fetch(`/api/defunts/infolang`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(infoLangs),
        });
        const newInfoLang = await updateInfoLang.json();
        console.log('updateInfo => ', newInfoLang);
        updateLegend(e);

        const numberValidated = validated ? 1 : 0;
        const numberCelebrite = celebrite ? 1 : 0;

        const resp = await fetch(`/api/defunts/update/${defunt.id} `, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: defunt.id,
                celebrite: numberCelebrite,
                tombe: tombe,
                categorie: categorie,
                titre: titre,
                nom: nom,
                nomJFille: nomJFille,
                prenom: prenom,
                patronyme: patronyme,
                pseudonyme: pseudonyme,
                profession: profession,
                dateNaissance: dateNaissance,
                villeNaissance: villeNaissance,
                paysNaissance: paysNaissance,
                dateDeces: dateDeces,
                lieuDeces: lieuDeces,
                bio: bio,
                validated: numberValidated,
                carousel: carousel ? 1 : 0,
            }),
        });

        if (resp.ok) {
            setMessage('Defunt Sauvegarder');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            setInfoLangs(newInfoLang);
        }
    }

    const onUploadPhotoDefunt = file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/piece-jointes');
        let fetchParams = {};

        // update
        if (photoDefunt) {
            fetchParams = {
                method: 'PATCH',
                body: formdata,
            };

            url.searchParams.append('type', 'photo_defunt');
            url.searchParams.append('legende', photoLegend);
            url.pathname += '/' + photoDefunt.id;
        }
        // create
        else {
            fetchParams = {
                method: 'POST',
                body: formdata,
            };

            url.searchParams.append('type', 'photo_defunt');
            url.searchParams.append('defunt_id', defunt.id);
            url.searchParams.append('legende', photoLegend);
        }

        fetch(url.toString(), fetchParams)
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        if (!photoDefunt) defunt.piecesJointes.push(data);
                        else {
                            const index = pieceJointeDefunt.findIndex(u => u.id === data.id);
                            let newPieceJointes = [...pieceJointeDefunt];
                            newPieceJointes[index] = data;
                            setPieceJointeDefunt(newPieceJointes);
                        }
                        setPhotoDefunt(data);
                    }
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Impossible d'upload l'image");
            });
    };

    const updateLegend = e => {
        e.preventDefault();
        if (!photoDefunt) return;

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/piece-jointes');
        let fetchParams = {
            method: 'PUT',
        };

        url.searchParams.append('type', 'photo_defunt');
        url.searchParams.append('legende', photoLegend);
        url.pathname += '/' + photoDefunt.id;

        fetch(url.toString(), fetchParams)
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        const index = pieceJointeDefunt.findIndex(u => u.id === data.id);
                        let newPieceJointes = [...pieceJointeDefunt];
                        newPieceJointes[index] = data;
                        setPieceJointeDefunt(newPieceJointes);
                        setPhotoDefunt(data);
                    }
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Impossible d'upload l'image");
            });
    };

    const updatePjList = pjList => {
        setPieceJointeDefunt(pjList);
    };

    const onUploadTombeImage = async file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/tombes');
        let fetchParams = {};
        url.searchParams.append('type', 'tombe');

        fetchParams = {
            method: 'PATCH',
            body: formdata,
        };

        url.pathname += '/' + tombe;

        try {
            const res = await fetch(url.toString(), fetchParams);
            if (res.ok) {
                const data = await res.json();

                if (data) {
                    setTombeImage(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + data.photo);
                }
            } else {
                return null;
            }
        } catch (err) {
            console.error(err);
            alert("Impossible d'upload l'image");
        }
    };

    const handleCheck = useCallback(
        e => {
            console.log('onchange checkbox ', validated);
            setValidated(!validated);
        },
        [validated],
    );

    const cateSelect = useCallback(
        e => {
            console.log('onchange select ', categorie);
            setCategorie(categorie);
        },
        [categorie],
    );

    const celibleCheck = useCallback(
        e => {
            console.log('onchange checkbox ', celebrite);
            setCelebrite(!celebrite);
        },
        [celebrite],
    );

    const getInfoFromChild = infoLang => {
        var newInfoLangs = {...infoLangs};
        var find = -1;

        newInfoLangs[infoLang.lang] = infoLang;

        setInfoLangs(newInfoLangs);
    };

    let defuntDisplay;
    if (defunt) {
        defuntDisplay = (
            <div className="flex place-content-center mt-18">
                <div className="sm:flex">
                    <form>
                        <div className="mt-4">
                            <div className="flex mt-1 place-content-center">
                                <button type="submit" onClick={handleEdites} className="w-48 py-3 bg-pgold">
                                    Enregistrement
                                </button>
                            </div>
                            {message ? (
                                <div className="flex mt-1 place-content-center">
                                    <div className="w-48 py-3 text-center text-white bg-green-400">{message}</div>
                                </div>
                            ) : null}
                            <div className="w-full mt-6 mr-72 ">
                                <label className="w-full px-3 mb-6 md:w-2/3 ">
                                    <a className="text-gray-700 ">Célébrité </a>
                                    <input
                                        name="celebrite"
                                        type="checkbox"
                                        className="coding"
                                        id="celebrite"
                                        onChange={celibleCheck}
                                        defaultChecked={celebrite}
                                    />
                                </label>

                                <label className="w-full px-3 mb-6 md:w-2/3 ">
                                    <a className="text-gray-700 ">Validé </a>
                                    <input
                                        name="validated"
                                        type="checkbox"
                                        className="coding"
                                        id="validated"
                                        onChange={handleCheck}
                                        defaultChecked={validated}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="self-center w-1/2 px-2 py-1 text-center md:w-1/4 lg:w-1/6">
                                    <div>Image Defunt:</div>
                                    <input
                                        type="text"
                                        value={photoLegend}
                                        className="w-full px-2 border"
                                        placeholder="legend de la photo ..."
                                        onChange={e => {
                                            setPhotoLegend(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="w-1/2 px-2 py-1 md:w-1/4 lg:w-1/6">
                                    <InputImage
                                        key={`uploadInput1`}
                                        onUpload={onUploadPhotoDefunt}
                                        image={
                                            photoDefunt
                                                ? process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST +
                                                  '/uploads/' +
                                                  photoDefunt.url
                                                : null
                                        }
                                    />
                                </div>
                                <div className="lg:w-1/6"></div>
                                <div className="self-center w-1/2 px-2 py-1 text-center md:w-1/4 lg:w-1/6">
                                    Image Tombe:
                                </div>
                                <div className="inline-block w-1/2 px-2 py-1 md:w-1/4 lg:w-1/6">
                                    <InputImage
                                        key={`uploadInput2`}
                                        id="uploadInput2"
                                        onUpload={onUploadTombeImage}
                                        image={tombeImage ? tombeImage : null}
                                    />
                                </div>
                            </div>

                            <div className="mx-3">
                                <label htmlFor="carousel" className="text-gray-700">
                                    Utiliser un carouselle
                                </label>
                                <input
                                    name="carousel"
                                    type="checkbox"
                                    className="px-1"
                                    id="carousel"
                                    onChange={e => {
                                        setCarousel(!carousel);
                                    }}
                                    defaultChecked={carousel}
                                />
                            </div>

                            <div>
                                <div
                                    className={
                                        infoLangTab === 'fr'
                                            ? 'inline-block px-2 mx-1 border border-black cursor-pointer bg-gray-400 text-white'
                                            : 'inline-block px-2 mx-1 border border-black cursor-pointer'
                                    }
                                    onClick={e => {
                                        setInfoLangTab('fr');
                                    }}
                                >
                                    FR
                                </div>
                                <div
                                    className={
                                        infoLangTab === 'en'
                                            ? 'inline-block px-2 mx-1 border border-black cursor-pointer bg-gray-400 text-white'
                                            : 'inline-block px-2 mx-1 border border-black cursor-pointer'
                                    }
                                    onClick={e => {
                                        setInfoLangTab('en');
                                    }}
                                >
                                    EN
                                </div>
                                <div
                                    className={
                                        infoLangTab === 'ru'
                                            ? 'inline-block px-2 mx-1 border border-black cursor-pointer bg-gray-400 text-white'
                                            : 'inline-block px-2 mx-1 border border-black cursor-pointer'
                                    }
                                    onClick={e => {
                                        setInfoLangTab('ru');
                                    }}
                                >
                                    RU
                                </div>
                            </div>
                            {infoLangTab === 'en' && (
                                <InfoLangView
                                    lang={'en'}
                                    defuntId={id}
                                    defuntInfoLang={infoLangs['en']}
                                    sendInfoToParent={getInfoFromChild}
                                />
                            )}
                            {infoLangTab === 'ru' && (
                                <InfoLangView
                                    lang={'ru'}
                                    defuntId={id}
                                    defuntInfoLang={infoLangs['ru']}
                                    sendInfoToParent={getInfoFromChild}
                                />
                            )}
                            {infoLangTab === 'fr' && (
                                <>
                                    <div className="flex flex-wrap mt-2">
                                        <label className="w-full px-3 mb-6 md:w-1/2 ">
                                            <a className="mr-16 text-gray-700 ">Tombe </a>
                                            <input
                                                name="tombe"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={tombe}
                                                onChange={e => setTombe(e.target.value)}
                                                id="tombe"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="text-gray-700 mr-11">Profession </a>
                                            <input
                                                name="profession"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={profession}
                                                onChange={e => setProfession(e.target.value)}
                                                id="profession"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2 ">
                                            <a className="mr-20 text-gray-700 ">Nom </a>
                                            <input
                                                name="nom"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={nom}
                                                onChange={e => setNom(e.target.value)}
                                                id="nom"
                                            />
                                        </label>

                                        <label className="w-full px-3 mb-6 md:w-1/2 ">
                                            <a className="mr-12 text-gray-700 ">NomJFille </a>
                                            <input
                                                name="nomJFille"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={nomJFille}
                                                onChange={e => setNomJFille(e.target.value)}
                                                id="nomJFille"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="text-gray-700 mr-14">Prénom </a>
                                            <input
                                                name="prenom"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={prenom}
                                                onChange={e => setPrenom(e.target.value)}
                                                id="prenom"
                                            />
                                        </label>

                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="mr-12 text-gray-700 ">Patronyme </a>
                                            <input
                                                name="patronyme"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={patronyme}
                                                onChange={e => setPatronyme(e.target.value)}
                                                id="patronyme"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="mr-12 text-gray-700 ">Pseudonyme </a>
                                            <input
                                                name="pseudonyme"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={pseudonyme}
                                                onChange={e => setPseudonyme(e.target.value)}
                                                id="pseudonyme"
                                            />
                                        </label>
                                        <div className="w-1/2">
                                            <SelectCat categorie={categorie} setCategorie={setCategorie} />
                                        </div>
                                        <label className="w-full px-5 mb-6 md:w-1/2">
                                            <a className="mr-24 text-gray-700 ">Titre </a>
                                            <input
                                                name="titre"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={titre}
                                                onChange={e => setTitre(e.target.value)}
                                                id="titre"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="mr-1 text-gray-700 ">DateNaissance </a>
                                            <input
                                                name="dateNaissance"
                                                type="date"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60"
                                                value={dateNaissance}
                                                onChange={e => setDateNaissance(e.target.value)}
                                                id="dateNaissance"
                                            />
                                        </label>

                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="text-gray-700 ">villeNaissance </a>
                                            <input
                                                name="villeNaissance"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={villeNaissance}
                                                onChange={e => setVilleNaissance(e.target.value)}
                                                id="villeNaissance"
                                            />
                                        </label>
                                        <label className="w-full px-3 mb-6 md:w-1/2">
                                            <a className="mr-3 text-gray-700 ">PaysNaissance </a>
                                            <input
                                                name="paysNaissance"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={paysNaissance}
                                                onChange={e => setPaysNaissance(e.target.value)}
                                                id="paysNaissance"
                                            />
                                        </label>
                                        <div className="md:w-1/2"></div>
                                        <label className="w-full px-3 mb-6 md:w-1/2 ">
                                            <a className="mr-8 text-gray-700 ">DateDeces </a>
                                            <input
                                                name="dateDeces"
                                                type="date"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60 "
                                                value={dateDeces}
                                                onChange={e => setDateDeces(e.target.value)}
                                                id="dateDeces"
                                            />
                                        </label>

                                        <label className="w-full px-3 mb-6 md:w-1/2 ">
                                            <a className="mr-12 text-gray-700 ">LieuDeces </a>
                                            <input
                                                name="lieuDeces"
                                                type="text"
                                                className="p-1 border border-gray-500 appearance-none form-input w-60"
                                                value={lieuDeces}
                                                onChange={e => setLieuDeces(e.target.value)}
                                                id="lieuDeces"
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <label className="w-full px-3 mb-6 md:w-4/4 ">
                                            <a className="ml-20 text-gray-700 ">Bio </a>
                                            {/*<textarea name="bio"  rows="8" cols="129" type="text" className="border border-gray-500 appearance-none form-input " value={bio} onChange={e => setBio(e.target.value)} id="bio" />*/}
                                        </label>
                                        <CustomEditor block={bio} setContent={setBio} defuntId={id} />
                                    </div>
                                </>
                            )}

                            <div className="flex mt-1 place-content-center">
                                <button type="submit" onClick={handleEdites} className="w-48 py-3 bg-pgold">
                                    Enregistrement
                                </button>
                            </div>
                            {message ? (
                                <div className="flex mt-1 place-content-center">
                                    <div className="w-48 py-3 text-center text-white bg-green-400">{message}</div>
                                </div>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        defuntDisplay = <div>Loading...</div>;
    }

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <Header currentLanguage={locale} currentPage={`defunts/${defunt?.id}`} />

                <main>
                    {defunt ? (
                        <div className="flex flex-row">
                            <h1>
                                {defunt.prenom} {defunt.nomJFille} {defunt.nom}
                            </h1>
                            <a
                                href={`/admin/page/${dynPageId}`}
                                target="_blank"
                                className="p-1 mx-1 text-gray-900 hover:opacity-50 bg-pgold"
                            >
                                Page Dynamique
                            </a>
                        </div>
                    ) : null}
                    <div className="mx-1">
                        <div
                            className={
                                tab === 'defunt'
                                    ? 'inline-block px-2 mx-1 border border-black cursor-pointer bg-gray-400 text-white'
                                    : 'inline-block px-2 mx-1 border border-black cursor-pointer'
                            }
                            onClick={e => {
                                let pieceJointePhotoDefunt = pieceJointeDefunt.find(
                                    pj => pj.categorie === 'photo_defunt',
                                );
                                if (pieceJointePhotoDefunt) setPhotoLegend(pieceJointePhotoDefunt.legende);
                                setTab('defunt');
                            }}
                        >
                            Defunt
                        </div>
                        <div
                            className={
                                tab === 'pj'
                                    ? 'inline-block px-2 mx-1 border border-black cursor-pointer bg-gray-400 text-white'
                                    : 'inline-block px-2 mx-1 border border-black cursor-pointer'
                            }
                            onClick={e => {
                                setTab('pj');
                            }}
                        >
                            Pièces Jointes
                        </div>
                    </div>

                    {tab === 'defunt' ? (
                        defuntDisplay
                    ) : tab === 'pj' ? (
                        <PjView id={defunt.id} pjList={pieceJointeDefunt} updatePjList={updatePjList} />
                    ) : null}
                </main>

                <Footer />
            </div>
        </div>
    );
}

export function chState(element) {
    if (element.checked) element.value = '1';
    else element.value = '0';
}

export async function getServerSideProps(context) {
    const {req, res, query, asPath, pathname} = context;
    const cookie = req?.headers.cookie;
    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    if (req) {
        let host = req.headers.host; // will give you localhost:3000
        let protocol = 'https://';
        if (host === 'localhost:3000') {
            protocol = 'http://';
        }
        const {id} = context.query;
        const res = await fetch(`${protocol}${host}/api/defunts/${id}`);
        const defunt = await res.json();

        let tombeObj;
        if (defunt && defunt.tombe) {
            const res2 = await fetch(`${protocol}${host}/api/tombe/${defunt.tombe}`);
            tombeObj = await res2.json();
        }

        if (!defunt) {
            return {
                notFound: true,
            };
        }
        return {
            props: {defunt, tombeObj: tombeObj.tombe ? tombeObj.tombe : null}, // will be passed to the page component as props
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}
