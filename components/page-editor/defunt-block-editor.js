import {formatDate} from '@/lib/date';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import IconOpenNew from '../icons/IconOpenNew';
import InputImage from '../input-image';
import SelectCat from '../select-cat';

export default function DefuntBlockEditor({
    originalPageId,
    content,
    categories,
    setContent,
    addAttributedMedia,
    defuntInfoLang,
    currentPage,
}) {
    //console.log(currentPage);
    const [defuntData, setDefuntData] = useState(null);
    const [tombe, setTombe] = useState(null);
    const [nom, setNom] = useState('');
    const [nomJFille, setNomJFille] = useState('');
    const [prenom, setPrenom] = useState('');
    const [patronyme, setPatronyme] = useState('');
    const [pseudonyme, setPseudonyme] = useState('');
    const [celebrite, setCelebrite] = useState('');
    const [profession, setProfession] = useState('');
    const [categorie, setCategorie] = useState('None');
    const [titre, setTitre] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [villeNaissance, setVilleNaissance] = useState('');
    const [paysNaissance, setPaysNaissance] = useState('');
    const [dateDeces, setDateDeces] = useState('');
    const [lieuDeces, setLieuDeces] = useState('');

    //const pieceJointePhotoDefunt = defunt.piecesJointes?.find(pj => pj.categorie === 'photo_defunt');
    const [photoDefunt, setPhotoDefunt] = useState(null);
    const [photoLegend, setPhotoLegend] = useState('');

    const [tombeImage, setTombeImage] = useState(null);

    const [message, setMessage] = useState('');

    const updateLegend = () => {
        //e.preventDefault();
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
                    /*if (data) {
                        const index = pieceJointeDefunt.findIndex(u => u.id === data.id);
                        let newPieceJointes = [...pieceJointeDefunt];
                        newPieceJointes[index] = data;
                        setPieceJointeDefunt(newPieceJointes);
                        setPhotoDefunt(data);
                    }*/
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Impossible d'upload l'image");
            });
    };

    const handleEdites = async () => {
        var defuntDataTmp = {...defuntData};
        if (currentPage.language != 'fr') {
            var infoLangs = defuntDataTmp.infoLangs;
            var infoLang = infoLangs.find(elt => elt.lang === currentPage.language);
            if (infoLang === undefined) {
                infoLangs.push({lang: currentPage.language, defunt_id: defuntData.id});
                infoLang = infoLangs.find(elt => elt.lang === currentPage.language);
            }
            infoLang.nom = nom;
            infoLang.nomJFille = nomJFille;
            infoLang.prenom = prenom;
            infoLang.patronyme = patronyme;
            infoLang.pseudonyme = pseudonyme;
            infoLang.celebrite = celebrite;
            infoLang.profession = profession;
            infoLang.titre = titre;
            infoLang.villeNaissance = villeNaissance;
            infoLang.paysNaissance = paysNaissance;
            infoLang.lieuDeces = lieuDeces;
            console.log(infoLangs);
            var infoLangsToSend = {};
            //infoLangs[currentPage.language] = infoLang;
            infoLangsToSend['en'] = infoLangs.find(elt => elt.lang === 'en');
            infoLangsToSend['ru'] = infoLangs.find(elt => elt.lang === 'ru');
            const updateInfoLang = await fetch(`/api/defunts/infolang`, {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(infoLangsToSend),
            });
            if (updateInfoLang.ok) {
                var infoLangRes = await updateInfoLang.json();
                console.log('updateInfoLang', infoLangRes);
            }
        } else {
            defuntDataTmp.titre = titre;
            defuntDataTmp.nom = nom;
            defuntDataTmp.nomJFille = nomJFille;
            defuntDataTmp.prenom = prenom;
            defuntDataTmp.patronyme = patronyme;
            defuntDataTmp.pseudonyme = pseudonyme;
            defuntDataTmp.profession = profession;
            defuntDataTmp.villeNaissance = villeNaissance;
            defuntDataTmp.paysNaissance = paysNaissance;
            defuntDataTmp.lieuDeces = lieuDeces;
        }
        defuntDataTmp.celebrite = celebrite ? 1 : 0;
        defuntDataTmp.tombe = tombe;
        defuntDataTmp.categorie = categorie;
        defuntDataTmp.dateNaissance = dateNaissance;
        defuntDataTmp.dateDeces = dateDeces;
        updateLegend();
        const resp = await fetch(`/api/defunts/update/${defuntData.id} `, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defuntDataTmp),
        });
        if (resp.ok) {
            setMessage('Defunt Sauvegarder');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            setDefuntData(defuntDataTmp);
        }
    };

    useEffect(async () => {
        if (content != '') {
            const res = await fetch(`/api/defunts/${content}`);
            const defunt = await res.json();
            console.log(defunt);
            if (defunt.tombe) {
                const res2 = await fetch(`/api/tombe/${defunt.tombe}`);
                var tombeObj = await res2.json();
                if (tombeObj) {
                    //console.log(tombeObj);
                    setTombeImage(`${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/${tombeObj.tombe.photo}`);
                }
            }

            const pieceJointePhotoDefunt = defunt.piecesJointes?.find(pj => pj.categorie === 'photo_defunt');
            setPhotoDefunt(pieceJointePhotoDefunt ? pieceJointePhotoDefunt : null);
            setPhotoLegend(
                pieceJointePhotoDefunt && pieceJointePhotoDefunt.legende ? pieceJointePhotoDefunt.legende : '',
            );

            setDefuntData(defunt);
            setTombe(defunt.tombe);
            setCategorie(defunt.categorie);
            setDateNaissance(formatDate(defunt.dateNaissance));
            setDateDeces(formatDate(defunt.dateDeces));
            if (currentPage.language === 'fr') {
                setNom(defunt.nom);
                setNomJFille(defunt.nomJFille);
                setPrenom(defunt.prenom);
                setPatronyme(defunt.patronyme);
                setPseudonyme(defunt.pseudonyme);
                setCelebrite(defunt.celebrite);
                setProfession(defunt.profession);
                setTitre(defunt.titre);
                setVilleNaissance(defunt.villeNaissance);
                setPaysNaissance(defunt.paysNaissance);
                setLieuDeces(defunt.lieuDeces);
            } else if (currentPage.language != 'fr' && defunt.infoLangs.length > 0) {
                var infoLang = defunt.infoLangs.find(elt => elt.lang === currentPage.language);
                setNom(infoLang?.nom ? infoLang?.nom : '');
                setNomJFille(infoLang?.nomJFille ? infoLang?.nomJFille : '');
                setPrenom(infoLang?.prenom ? infoLang?.prenom : '');
                setPatronyme(infoLang?.patronyme ? infoLang?.patronyme : '');
                setPseudonyme(infoLang?.pseudonyme ? infoLang?.pseudonyme : '');
                setCelebrite(infoLang?.celebrite ? infoLang?.celebrite : '');
                setProfession(infoLang?.profession ? infoLang?.profession : '');
                setTitre(infoLang?.titre ? infoLang?.titre : '');
                setVilleNaissance(infoLang?.villeNaissance ? infoLang?.villeNaissance : '');
                setPaysNaissance(infoLang?.paysNaissance ? infoLang?.paysNaissance : '');
                setLieuDeces(infoLang?.lieuDeces ? infoLang?.lieuDeces : '');
            } else {
                setNom('');
                setNomJFille('');
                setPrenom('');
                setPatronyme('');
                setPseudonyme('');
                setCelebrite('');
                setProfession('');
                setTitre('');
                setVilleNaissance('');
                setPaysNaissance('');
                setLieuDeces('');
            }
        }
    }, [currentPage]);

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
            url.searchParams.append('defunt_id', defuntData.id);
            url.searchParams.append('legende', photoLegend);
        }

        fetch(url.toString(), fetchParams)
            .then(async res => {
                if (res.ok) {
                    const data = await res.json();

                    if (data) {
                        /*if (!photoDefunt) defuntData.piecesJointes.push(data);
                        else {
                            const index = pieceJointeDefunt.findIndex(u => u.id === data.id);
                            let newPieceJointes = [...pieceJointeDefunt];
                            newPieceJointes[index] = data;
                            setPieceJointeDefunt(newPieceJointes);
                        }*/
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

    const loadDefunt = async () => {
        const res = await fetch(`/api/defunts/${content}`);
        const defunt = await res.json();
        console.log(defunt);
    };
    return (
        <div>
            <div className="text-xl">Defunt</div>
            <div className="flex flex-row">
                <label htmlFor="id-defunt">Id Defunt:</label>
                <input
                    id="id-defunt"
                    className="px-2 mx-1 border border-black rounded"
                    type="number"
                    value={content}
                    onChange={e => setContent(e.currentTarget.value)}
                />
                {/*<button
                    className="h-6 px-4 py-1 mx-4 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:h-7 hover:bg-pblue"
                    onClick={e => loadDefunt()}
                >
                    Charger
                </button>*/}
                <a href={`/admin/defunts/${content}`} target="_blank" className="text-gray-900 hover:opacity-50">
                    <IconOpenNew size="16px" />
                </a>
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
                                ? process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/uploads/' + photoDefunt.url
                                : null
                        }
                    />
                </div>
                <div className="lg:w-1/6"></div>
                <div className="self-center w-1/2 px-2 py-1 text-center md:w-1/4 lg:w-1/6">Image Tombe:</div>
                <div className="inline-block w-1/2 px-2 py-1 md:w-1/4 lg:w-1/6">
                    <InputImage
                        key={`uploadInput2`}
                        id="uploadInput2"
                        onUpload={onUploadTombeImage}
                        image={tombeImage ? tombeImage : null}
                    />
                </div>
            </div>
            <div className="flex flex-wrap mt-2">
                <label className="w-full px-3 mb-6 md:w-2/3 ">
                    <a className="pr-2 text-gray-700">Célébrité</a>
                    <input
                        name="celebrite"
                        type="checkbox"
                        className="coding"
                        id="celebrite"
                        onChange={e => setCelebrite(!celebrite)}
                        defaultChecked={celebrite}
                    />
                </label>

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
                <div className="w-1/2">
                    <SelectCat categorie={categorie} setCategorie={setCategorie} />
                </div>
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
                <div className="flex flex-wrap">
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
            </div>

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
    );
}
