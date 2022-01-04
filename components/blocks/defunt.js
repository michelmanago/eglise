import {getProperDate} from '@/lib/date';
import styles from '@/styles/defunt.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

export default function DefuntBlock({defunt, language}) {
    const [pieceJointePhoto, setPieceJointePhoto] = useState(null);

    const patronyme = defunt?.patronyme || '';
    var prenom = defunt?.prenom || '';
    var nom = defunt?.nom || '';
    var nomJFille = defunt?.nomJFille || '';
    //var bio = defunt?.bio;
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

    // effects
    useEffect(() => {
        if (defunt) {
            const pieceJointePhotoDefunt = defunt.piecesJointes.find(pj => pj.categorie === 'photo_defunt');

            if (pieceJointePhotoDefunt) {
                setPieceJointePhoto(pieceJointePhotoDefunt);
            }
        }
    }, [defunt]);

    return (
        <aside className={'bg-pgold py-4 md:w-1/4 ' + styles.biographyAside}>
            <h3 className="pt-0 pb-4 font-semibold text-center capitalize">{fullName}</h3>
            <div className={'pb-4 relative ' + styles.bioImage}>
                { pieceJointePhoto &&
                    <>
                        <Image
                            src={process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + pieceJointePhoto.url}
                            width="300"
                            height="400"
                            alt={'Photo de ' + fullName}
                            layout="responsive"
                        />
                        <div className="flex flex-col justify-center">
                            <div className="overflow-hidden text-white overflow-ellipsis">
                                {pieceJointePhoto.legende}
                            </div>
                        </div>
                    </>
                }
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
    );
}
