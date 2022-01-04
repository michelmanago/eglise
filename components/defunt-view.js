import styles from '@/styles/defunt.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import {getProperDate} from '../lib/date';
import InputImage from './input-image';

import {isTombContributor} from '@/lib/authorize';
import CarouselParam from './carouselParam';
import {FileText} from './icon';

export default function DefuntView({defunt, language}) {
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

    const [user, setUser] = useState();

    if (typeof window !== 'undefined') {
        // Access localStorage
        if (!user && localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

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

    const modeCreation = false;

    const patronyme = defunt?.patronyme || '';
    var prenom = defunt?.prenom || '';
    var nom = defunt?.nom || '';
    var nomJFille = defunt?.nomJFille || '';
    var bio = defunt?.bio;
    const dateNaissance = getProperDate(defunt?.dateNaissance);
    const dateDeces = getProperDate(defunt?.dateDeces);
    var villeNaissance = defunt?.villeNaissance || '';
    var paysNaissance = defunt?.paysNaissance || '';
    var lieuNaissance = (defunt?.villeNaissance || '') + ' ' + (defunt?.paysNaissance || '');
    var lieuDeces = defunt?.lieuDeces || '';

    const profession = defunt?.profession || '';
    const tombe = defunt?.tombe || '';

    var name = prenom + ' ' + nom;
    var fullName = prenom + ' ' + patronyme + ' ' + nom + (nomJFille ? ' (née ' + nomJFille + ')' : '');
    const annexes = defunt?.piecesJointes.filter(f => f.categorie !== 'photo_defunt');

    const carouselImgs = defunt?.piecesJointes.filter(pj => pj.categorie === 'image' && pj.carousel === 1);

    var infoLangs = {ru: {}, en: {}};
    if (language === 'ru' || language === 'en') {
        defunt?.infoLangs.map(info => {
            if (info.lang === language) infoLangs[language] = info;
        });
        const defuntInfo = infoLangs[language];
        prenom = defuntInfo.prenom || prenom;
        nom = defuntInfo.nom || nom;
        nomJFille = defuntInfo.nomJFille || nomJFille;
        bio = defuntInfo.bio || bio;
        villeNaissance = defuntInfo.villeNaissance || defunt?.villeNaissance;
        paysNaissance = defuntInfo.paysNaissance || defunt?.paysNaissance;
        lieuNaissance =
            (defuntInfo.villeNaissance || defunt?.villeNaissance) +
            ' ' +
            (defuntInfo.paysNaissance || defunt?.paysNaissance);
        lieuDeces = defuntInfo.lieuDeces || lieuDeces;
        name = prenom + ' ' + nom;
        if (language === 'en')
            fullName = prenom + ' ' + patronyme + ' ' + nom + (nomJFille ? ' (born ' + nomJFille + ')' : '');
        else
            fullName = prenom + ' ' + patronyme + ' ' + nom + (nomJFille ? ' (родившийся ' + nomJFille + ')' : '');
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row">
                <aside className={'bg-pgold py-4 md:w-1/4 ' + styles.biographyAside}>
                    {user && isTombContributor(tombe, user.tombe) ? (
                        <Link href={`/defuntsedit/${defunt.id}`}>
                            <a className="block text-center cursor-pointer">Editer</a>
                        </Link>
                    ) : null}
                    <h3 className="pt-0 pb-4 font-semibold text-center capitalize">{fullName}</h3>
                    <div className={'pb-4 relative ' + styles.bioImage}>
                        {!modeCreation ? (
                            pieceJointePhoto && (
                                <>
                                    <Image
                                        src={
                                            process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST +
                                            '/uploads/' +
                                            pieceJointePhoto.url
                                        }
                                        width="300"
                                        height="400"
                                        alt={'Photo de ' + fullName}
                                        layout="responsive"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <div className="overflow-hidden text-white overflow-ellipsis">{pieceJointePhoto.legende}</div>
                                    </div>
                                </>
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
                                <div className="flex justify-center text-white">{pieceJointePhoto.legende}</div>
                            </>
                        )}
                    </div>
                    <div className="pl-5">
                        {tombe && (
                            <div className={'flex ' + styles.bioInfoItem}>
                                <p className="text-pwhite">
                                    {language === 'ru' ? 'Могила' : language === 'en' ? 'Tomb' : 'Tombe'}
                                </p>
                                <p className="font-normal underline">
                                    <Link href={`/tombe/${tombe}`}>
                                        <a className="text-pwhite">n°{tombe}</a>
                                    </Link>
                                </p>
                            </div>
                        )}
                        {dateNaissance && (
                            <div className={'flex flex-wrap ' + styles.bioInfoItem}>
                                <p className="text-pwhite">
                                    {language === 'ru' ? 'Рождение' : language === 'en' ? 'Birth' : 'Naissance'}
                                </p>
                                <p className="font-normal">
                                    <div>{`${dateNaissance}`}</div>
                                    <div>{villeNaissance}</div>
                                    <div>{paysNaissance}</div>
                                </p>
                            </div>
                        )}
                        {dateDeces && (
                            <div className={'flex ' + styles.bioInfoItem}>
                                <p className="text-pwhite">
                                    {language === 'ru' ? 'Смерть' : language === 'en' ? 'Death' : 'Décès'}
                                </p>
                                <p className="font-normal">
                                    <div>{`${dateDeces}`}</div>
                                    <div>{`${lieuDeces}`}</div>
                                </p>
                            </div>
                        )}
                        {profession && (
                            <div className={'flex ' + styles.bioInfoItem}>
                                <p className="text-pwhite">Profession</p>
                                <p className="font-normal">{profession}</p>
                            </div>
                        )}
                    </div>
                </aside>
                <article className="w-full pt-5 px-7 md:w-3/4">
                    <h1 className="text-3xl capitalize text-pblue">{name}</h1>
                    {bio ? <div dangerouslySetInnerHTML={{__html: bio}}></div> : <p>pas de bio</p>}

                    {/* Carousel of Pj Image define */}
                    {defunt && defunt.carousel ? (
                        <div>
                            <CarouselParam
                                imgList={carouselImgs}
                                apiUrl={`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/`}
                            />
                        </div>
                    ) : null}

                    {/* Piece jointes */}
                    {annexes && annexes.filter((pj) => pj.categorie === 'son' || pj.categorie === 'pdf').length ? (
                        <div className="p-5 border-2 rounded">

                            <div className="flex flex-wrap">
                                {annexes.map(pj => {
                                    if (pj.categorie === 'son') {
                                        return (
                                            <div key={pj.id + 'pj'} className="w-1/3 px-1 pb-1">
                                                <audio
                                                    className="w-full border-2"
                                                    src={`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${pj.url}`}
                                                    controls
                                                ></audio>
                                            </div>
                                        );
                                    } else if (pj.categorie === 'pdf') {
                                        return (
                                            <div key={pj.id + 'pj'} className="w-1/3 px-1 pb-1">
                                                <a
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    className="inline-block border"
                                                    href={`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${pj.url}`}
                                                >
                                                    <FileText className={'inline-block'} /> PDF : {pj.legende}
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
