import {useEffect, useState} from 'react';

import CustomEditor from '@/components/Slate/customEditor';

export default function InfoLangView({lang, defuntId, defuntInfoLang, sendInfoToParent}) {
    const [nom, setNom] = useState(defuntInfoLang?.nom ? defuntInfoLang.nom : '');
    const [nomJFille, setNomJFille] = useState(defuntInfoLang?.nomJFille ? defuntInfoLang.nomJFille : '');
    const [prenom, setPrenom] = useState(defuntInfoLang?.prenom ? defuntInfoLang?.prenom : '');
    const [patronyme, setPatronyme] = useState(defuntInfoLang?.patronyme ? defuntInfoLang?.patronyme : '');
    const [pseudonyme, setPseudonyme] = useState(defuntInfoLang?.pseudonyme ? defuntInfoLang?.pseudonyme : '');
    
    const [titre, setTitre] = useState(defuntInfoLang?.titre ? defuntInfoLang?.titre : '');
    const [villeNaissance, setVilleNaissance] = useState(
        defuntInfoLang.villeNaissance ? defuntInfoLang.villeNaissance : '',
    );
    const [paysNaissance, setPaysNaissance] = useState(
        defuntInfoLang.paysNaissance ? defuntInfoLang.paysNaissance : '',
    );
    const [lieuDeces, setLieuDeces] = useState(defuntInfoLang.lieuDeces ? defuntInfoLang.lieuDeces : '');
    const [bio, setBio] = useState(defuntInfoLang?.bio ? defuntInfoLang?.bio : '');

    useEffect(() => {
        defuntInfoLang.nom = nom;
        defuntInfoLang.nomJFille = nomJFille;
        defuntInfoLang.prenom = prenom;
        defuntInfoLang.titre = titre;
        defuntInfoLang.patronyme = patronyme;
        defuntInfoLang.pseudonyme = pseudonyme;
        defuntInfoLang.bio = bio;
        defuntInfoLang.villeNaissance = villeNaissance;
        defuntInfoLang.paysNaissance = paysNaissance;
        defuntInfoLang.lieuDeces = lieuDeces;
        defuntInfoLang.defunt_id = defuntId;
        defuntInfoLang.lang = lang;
        sendInfoToParent(defuntInfoLang);
    }, [nom, prenom, nomJFille, titre, patronyme, pseudonyme, bio, villeNaissance, paysNaissance, lieuDeces]);

    return (
        <div className="border border-black">
            <div className="flex flex-wrap mt-2">
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
                        onChange={e => {
                            setPrenom(e.target.value);
                        }}
                        id="prenom"
                    />
                </label>
                <label className="w-full px-3 mb-6 md:w-1/2">
                    <a className="mr-12 text-gray-700 ">Titre</a>
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

                <div className='flex flex-wrap'>
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
            </div>

            <div className="mt-1">
                <label className="w-full px-3 mb-6 md:w-4/4 ">
                    <a className="ml-20 text-gray-700 ">Bio </a>
                    {/*<textarea name="bio"  rows="8" cols="129" type="text" className="border border-gray-500 appearance-none form-input " value={bio} onChange={e => setBio(e.target.value)} id="bio" />*/}
                </label>
                <CustomEditor block={bio} setContent={setBio} defuntId={defuntId} />
            </div>
        </div>
    );
}
