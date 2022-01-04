import {useRef, useState} from 'react';
import Popup from 'reactjs-popup';
import {Edit} from '@/components/icon'

export default function EditPj({pj, legende, updatePj}) {
    const [legendeEdit, setLegendeEdit] = useState(legende);
    const [open, setOpen] = useState(false);

    async function saveLegend(e) {
        e.preventDefault()
        setOpen(false)
        const url = new URL(process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST + '/piece-jointes');
        url.searchParams.append('type', pj.type);
        url.searchParams.append('legende', legendeEdit);
        url.searchParams.append('carousel', pj.carousel);
        url.pathname += '/' + pj.id;
        const resp = await fetch(url.toString(), {
            method: 'PUT',
        });
        if (!resp.ok) return null
        const json = await resp.json();
        console.log('Legend Save');

        updatePj()
    }

    const openModal = e => {
        setOpen(true);
    };
    const closeModal = e => {
        setOpen(false);
    };

    return (
        <>
            <div className="inline-block w-1/2 h-full px-1 text-center text-white bg-green-300 cursor-pointer" onClick={openModal}>
                <Edit className={'block mx-auto mt-1'} />
            </div>
            <Popup open={open} position="top center" modal="true" closeOnDocumentClick onClose={closeModal}>
                <form className="mt-6">
                    <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                        Legend
                        <input
                            id="legend"
                            type="text"
                            name="legend"
                            placeholder="legend de la piece jointe"
                            value={legendeEdit}
                            onChange={e => {setLegendeEdit(e.target.value)}}
                            autoComplete="given-name"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        onClick={saveLegend}
                        className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                    >
                        Sauvegarder
                    </button>
                </form>
            </Popup>
        </>
    );
}
