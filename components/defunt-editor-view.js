import styles from '@/styles/defunt.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {formatDate} from '@/lib/date';
import InputImage from './input-image';
import CustomEditor from './Slate/customEditor';

export default function DefuntEditorView({defunt}) {
    const router = useRouter();
    // state
    const [pieceJointePhoto, setPieceJointePhoto] = useState(null);

    // effects
    useEffect(() => {
        if (defunt) {
            const pieceJointePhotoDefunt = defunt.piecesJointes.find(pj => pj.categorie === 'photo_defunt');

            if (pieceJointePhotoDefunt) {
                setPieceJointePhoto(pieceJointePhotoDefunt);
            }
        }
    }, [defunt]);

    // methods
    const onUploadPhotoDefunt = file => {
        const formdata = new FormData();
        formdata.append('file', file);

        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/piece-jointes');
        let fetchParams = {};

        // update
        if (pieceJointePhoto) {
            fetchParams = {
                method: 'PATCH',
                body: formdata,
            };

            url.searchParams.append('type', 'photo_defunt');
            url.pathname += '/' + pieceJointePhoto.id;
        }
        // create
        else {
            fetchParams = {
                method: 'POST',
                body: formdata,
            };

            url.searchParams.append('type', 'photo_defunt');
            url.searchParams.append('defunt_id', defunt.id);
        }

        fetch(url.toString(), fetchParams)
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        setPieceJointePhoto(data);
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

    const modeCreation = true;

    const [celebrite, setCelebrite] = useState(defunt.celebrite);
    const [tombe, setTombe] = useState(defunt.tombe);
    const [categorie, setCategorie] = useState(defunt.categorie);
    const [titre, setTitre] = useState(defunt.titre);
    const [nom, setNom] = useState(defunt.nom);
    const [nomJFille, setNomJFille] = useState(defunt.nomJFille);
    const [prenom, setPrenom] = useState(defunt.prenom);
    const [patronyme, setPatronyme] = useState(defunt.patronyme);
    const [profession, setProfession] = useState(defunt.profession);
    const [dateNaissance, setDateNaissance] = useState(formatDate(defunt.dateNaissance));
    const [villeNaissance, setVilleNaissance] = useState(defunt.villeNaissance);
    const [paysNaissance, setPaysNaissance] = useState(defunt.paysNaissance);
    const [dateDeces, setDateDeces] = useState(formatDate(defunt.dateDeces));
    const [lieuDeces, setLieuDeces] = useState(defunt.lieuDeces);
    const [bio, setBio] = useState(defunt.bio);
    const [validated, setValidated] = useState(defunt.validated === 1 ? true : false);

    //const profession = defunt.profession || ""
    //const tombe = defunt.tombe || ""

    //const name = prenom + " " + nom
    const fullName = prenom + ' ' + patronyme + ' ' + nom + (nomJFille ? ' (née ' + nomJFille + ')' : '');
    const annexes = defunt.piecesJointes.filter(f => f.categorie !== 'photo_defunt');

    async function handleEdites(e) {
        e.preventDefault();
        const numberValidated = validated ? 1 : 0;
        const numberCelebrite = celebrite ? 1 : 0;

        //console.log(dateNaissance);
        const resp = await fetch(`/api/defunts/update/${defunt.id} `, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                celebrite: numberCelebrite,
                tombe: tombe,
                categorie: categorie,
                titre: titre,
                nom: nom,
                nomJFille: nomJFille,
                prenom: prenom,
                patronyme: patronyme,
                profession: profession,
                dateNaissance: dateNaissance,
                villeNaissance: villeNaissance,
                paysNaissance: paysNaissance,
                dateDeces: dateDeces,
                lieuDeces: lieuDeces,
                bio: bio,
                validated: numberValidated,
            }),
        }).then(res => {
            if (res.ok) {
                router.push(`/defunts/${defunt.id}`);
            }
        });
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <aside className={'bg-pgold py-4 ' + styles.biographyAside}>
                    <h3 className="pt-0 pb-4 font-semibold text-center capitalize">{fullName}</h3>
                    <div className="pl-5">
                        <label className="block mb-1">
                            Prenom
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setPrenom(e.target.value)}
                                value={prenom}
                            />
                        </label>
                        <label className="block mb-1">
                            Patronym
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setPatronyme(e.target.value)}
                                value={patronyme}
                            />
                        </label>
                        <label className="block mb-1">
                            Nom
                            <input type="text" className="ml-2" onChange={e => setNom(e.target.value)} value={nom} />
                        </label>
                        <label className="block mb-1">
                            Nom de jeune fille
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setNomJFille(e.target.value)}
                                value={nomJFille}
                            />
                        </label>
                    </div>
                    <div className={'pb-4 relative ' + styles.bioImage}>
                        {!modeCreation ? (
                            pieceJointePhoto ? (
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + pieceJointePhoto.url
                                    }
                                    width="300"
                                    height="400"
                                    alt={'Photo de ' + fullName}
                                    layout="responsive"
                                />
                            ) : (
                                ''
                            )
                        ) : (
                            <>
                                <InputImage
                                    onUpload={onUploadPhotoDefunt}
                                    image={
                                        pieceJointePhoto
                                            ? process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST +
                                              '/uploads/' +
                                              pieceJointePhoto.url
                                            : null
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="pl-5">
                        {tombe && (
                            <div className={'flex ' + styles.bioInfoItem}>
                                <p className="text-pwhite">Tombe</p>
                                <p className="font-normal underline">
                                    <Link href={`/tombe/${tombe}`}>
                                        <a className="text-pwhite">n°{tombe}</a>
                                    </Link>
                                </p>
                            </div>
                        )}

                        <label className="block mb-1">
                            Date de Naissance
                            <input
                                className=""
                                type="date"
                                onChange={e => setDateNaissance(e.target.value)}
                                value={dateNaissance}
                            />
                        </label>

                        <label className="block mb-1">
                            Ville de Naissance
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setVilleNaissance(e.target.value)}
                                value={villeNaissance}
                            />
                        </label>
                        <label className="block mb-1">
                            Pays de Naissance
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setPaysNaissance(e.target.value)}
                                value={paysNaissance}
                            />
                        </label>

                        <label className="block mb-1">
                            Date de Décès
                            <input
                                type="date"
                                className="ml-2"
                                onChange={e => setDateDeces(e.target.value)}
                                value={dateDeces}
                            />
                        </label>
                        <label className="block mb-1">
                            Ville de Décès
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setLieuDeces(e.target.value)}
                                value={lieuDeces}
                            />
                        </label>

                        <label className="block mb-1">
                            Profession
                            <input
                                type="text"
                                className="ml-2"
                                onChange={e => setProfession(e.target.value)}
                                value={profession}
                            />
                        </label>
                    </div>
                </aside>
                <article className="w-full pt-5 px-7">
                    <button className="block w-48 py-3 mx-auto bg-pgold" onClick={handleEdites}>
                        Sauvegarder
                    </button>
                    <h1 className="text-3xl capitalize text-pblue">
                        {prenom} {nom}
                    </h1>
                    <h2>Biographie</h2>

                    <CustomEditor block={bio} setContent={setBio} />

                    {/* Piece jointes */}
                    {annexes && annexes.length ? (
                        <div className="p-5 border-2 rounded">
                            <h6 className="block mb-3 text-2xl">Annexes</h6>

                            <div className="flex gap-x-4">
                                {annexes.map(pj => {
                                    if (pj.categorie === 'image') {
                                        return (
                                            <div key={pj.id + 'pj'} className="w-1/3">
                                                <img
                                                    className="w-full h-auto"
                                                    src={
                                                        `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/` +
                                                        pj.url
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    } else if (pj.categorie === 'son') {
                                        return (
                                            <div key={pj.id + 'pj'} className="w-1/3">
                                                <audio
                                                    className="w-full border-2"
                                                    src={`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${pj.url}`}
                                                    controls
                                                ></audio>
                                            </div>
                                        );
                                    } else if (pj.categorie === 'pdf') {
                                        return (
                                            <div key={pj.id + 'pj'} className="w-1/3">
                                                <a
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    className="inline-block border"
                                                    href={`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${pj.url}`}
                                                >
                                                    Fichier PDF : {pj.url}
                                                </a>
                                            </div>
                                        );
                                    }

                                    return '';
                                })}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </article>
            </div>
        </div>
    );
}
