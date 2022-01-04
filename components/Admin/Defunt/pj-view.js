import {Slash, Trash} from '@/components/icon';
import EditPj from '@/components/Popup/edit-pj';
import {useRef, useState} from 'react';

import Checkbox from '@/components/checkbox';

export default function PjView({id, pjList, updatePjList}) {
    const pjUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/`;
    const apiPjUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/piece-jointes`;
    const deleteUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/piece-jointes`;

    //const [pjStateList, setPjStateList] = useState(pjList)
    const [pjState, setPjState] = useState(pjList);

    const inputFile = useRef();
    const [legende, setLegende] = useState('');

    const updateListPj = () => {
        fetch(`/api/pieceJointe/defunts/${id}`)
            .then(res => {
                if (res.ok) {
                    console.log('file upload', res);
                    res.json().then(pjDefunt => {
                        updatePjList(pjDefunt);
                        setPjState(pjDefunt);
                    });
                }
            })
            .catch(err => {
                console.error(err);
                alert("Erreur dans l'upload de la piece jointe");
            });
    };
    const uploadFile = event => {
        //const input = event.target;
        const input = inputFile.current;
        const url = new URL(apiPjUrl);

        if (input.files && input.files[0]) {
            const file = input.files[0];
            const formdata = new FormData();
            formdata.append('file', file);

            url.searchParams.append('defunt_id', id);

            if (isImage(file.name)) {
                url.searchParams.append('type', 'image');
            } else if (isSon(file.name)) {
                url.searchParams.append('type', 'son');
            } else if (isPDF(file.name)) {
                url.searchParams.append('type', 'pdf');
            }

            //let addLegend = '';
            //if (legende != '') addLegend = `&legende=${legende}`;
            if (legende != '') url.searchParams.append('legende', legende);
            fetch(url.toString(), {
                method: 'POST',
                body: formdata,
            })
                .then(res => {
                    if (res.ok) {
                        console.log('file upload', res);
                        inputFile.current.value = '';
                        setLegende('');
                        updateListPj();
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Erreur dans l'upload de la piece jointe");
                });
        }
    };
    const deleteFile = pjId => {

        fetch(`${deleteUrl}/${pjId}`, {
            method: 'DELETE',
        })
            .then(async res => {
                if (res.ok) {
                    let eltIndex = -1;
                    let tmpPjState = [...pjState];
                    for (let i = 0; i < tmpPjState.length; i++) {
                        const elt = tmpPjState[i];
                        if (elt.id === pjId) {
                            eltIndex = i;
                            break;
                        }
                    }
                    tmpPjState.splice(eltIndex, 1);
                    setPjState(tmpPjState);
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error(err);
                alert("Erreur dans la suppression de l'image");
            });
    };

    const [checkBox, setChecBox] = useState(false);

    const handleCheck = async (value, pjId) => {
        //event.preventDefault();
        console.log('checkbox');
        //const pjId = parseInt(event.target.getAttribute('data-id'));
        let pjEdit = null;
        let pjStateTmp = [...pjState];
        pjStateTmp.forEach(pj => {
            if (pj.id === pjId) {
                //pj.carousel = pj.carousel === 0 ? 1 : 0;
                pjEdit = pj;
            }
        });

        const url = new URL(apiPjUrl);
        url.searchParams.append('type', pjEdit.categorie);
        url.searchParams.append('legende', pjEdit.legende);
        url.searchParams.append('carousel', value ? 1 : 0);
        url.pathname += '/' + pjEdit.id;
        const resp = await fetch(url.toString(), {
            method: 'PUT',
        });
        if (!resp.ok) return null;
        const json = await resp.json();

        updateListPj();
    };

    const DisplayPjByType = pjType => {
        var border = 'border-b border-r';
        return pjState?.map((pj, i) => {
            if (pj.categorie === pjType) {
                let checked = pj.carousel === 1;
                return (
                    <div className="grid grid-cols-8 gap-0" key={pj.id}>
                        <div className={`px-1 ${border} border-black`}>
                            {pj.id}/{pj.id_defunts}
                        </div>
                        <div className={`px-1 ${border} border-black`}>{pj.categorie}</div>
                        <div className={`col-span-4 px-1 ${border} border-black relative hover-trigger`}>
                            <a target="_blank" href={`${pjUrl}${pj.url}`}>
                                {pj.legende != '' ? pj.legende : pj.url}
                            </a>
                            {pj.categorie === 'image' || pj.categorie === 'photo_defunt' ? (
                                <img
                                    className="absolute z-50 w-1/2 top-6 left-4 hover-target"
                                    src={`${pjUrl}${pj.url}`}
                                    alt={pj.url}
                                />
                            ) : null}
                        </div>
                        <div className={`px-1 ${border} border-black`}>
                            {pj.categorie === 'image' ? (
                                <>
                                    <Checkbox
                                        className="block mx-auto mt-2"
                                        value={checked}
                                        pjId={pj.id}
                                        updateParent={handleCheck}
                                    />
                                </>
                            ) : (
                                <Slash className="block mx-auto mt-1" />
                            )}
                        </div>
                        <div className={`${border} border-black`}>
                            <EditPj pj={pj} legende={pj.legende} updatePj={updateListPj} />
                            <div
                                className="inline-block w-1/2 h-full px-1 text-white bg-red-600 cursor-pointer"
                                data-id={pj.id}
                                onClick={() => deleteFile(pj.id)}
                            >
                                <Trash className={'block mx-auto mt-1'} />
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div>
            <div className="mx-2 my-2">
                <div>Ajouter une pièce jointe</div>
                <div>
                    <input
                        ref={inputFile}
                        className={''}
                        type="file"
                        accept="image/*,.pdf,.mp3"
                        id={id ? id : 'pjInput'}
                    />
                    <input
                        className="px-1 border border-black rounded"
                        type="text"
                        value={legende}
                        onChange={e => {
                            setLegende(e.currentTarget.value);
                        }}
                    />

                    <button className="px-1 mx-1 text-black border border-black rounded" onClick={uploadFile}>
                        Ajouter
                    </button>
                </div>
            </div>

            <div className="mx-2 border-t border-l border-black">
                <div className="grid grid-cols-8 gap-0">
                    <div className="px-1 border-b border-r border-black">DefuntId</div>
                    <div className="px-1 border-b border-r border-black">Catégorie</div>
                    <div className="col-span-4 px-1 border-b border-r border-black">Url</div>
                    <div className="px-1 border-b border-r border-black">Carousel</div>
                    <div className="px-1 border-b border-r border-black">Options</div>
                </div>
                {pjState ? (
                    <>
                        {DisplayPjByType('photo_defunt')}
                        {DisplayPjByType('image')}
                        {DisplayPjByType('pdf')}
                        {DisplayPjByType('son')}
                    </>
                ) : null}
            </div>
        </div>
    );
}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'gif':
        case 'bmp':
        case 'png':
            //etc
            return true;
    }
    return false;
}

function isSon(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'mp3':
            return true;
        default:
            return false;
    }
}

function isPDF(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'pdf':
            return true;
        default:
            return false;
    }
}
