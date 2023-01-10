import Link from 'next/link';
import {useState} from 'react';

export default function AdherentCreate({adherent, setAdherent, saveHandler}) {
    const [error, setError] = useState({isError: false, message: ''});
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-10">
            {error.isError && <div className="font-bold text-red-600">{error.message}</div>}
            <div className="flex flex-row gap-1">
                <label htmlFor="name">Nom</label>
                <input
                    type="text"
                    id="name"
                    className="px-2 border rounded"
                    value={adherent.nom}
                    onChange={e => setAdherent({...adherent, nom: e.target.value})}
                />
            </div>
            <div className="flex flex-row gap-1">
                <label htmlFor="firstname">Prénom</label>
                <input
                    type="text"
                    id="firstname"
                    className="px-2 border rounded"
                    value={adherent.prenom}
                    onChange={e => setAdherent({...adherent, prenom: e.target.value})}
                />
            </div>
            <div className="flex flex-row w-full gap-1">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    className="w-full px-2 border rounded"
                    value={adherent.email}
                    onChange={e => setAdherent({...adherent, email: e.target.value})}
                />
            </div>
            <div className="flex flex-row gap-1">
                <label htmlFor="postal">Adresse</label>
                <input
                    type="text"
                    id="postal"
                    className="px-2 border rounded"
                    value={adherent.postale ? adherent.postale : ''}
                    onChange={e => setAdherent({...adherent, postale: e.target.value})}
                />
            </div>
            <div className="flex flex-row gap-1">
                <label htmlFor="news">Abonné</label>
                <input
                    type="checkbox"
                    id="news"
                    checked={adherent.news}
                    onChange={e => setAdherent({...adherent, news: e.target.checked})}
                />
            </div>
            <div className="flex flex-row gap-2">
                <Link href={'/admin/adherent'}>
                    <a className="px-2 py-1 text-white bg-red-500 border rounded">Annuler</a>
                </Link>
                <button
                    className="px-2 py-1 text-white bg-blue-500 border rounded"
                    onClick={e => {
                        if (adherent.email === '') {
                            setError({isError: true, message: 'Un email est obligatoire pour créer un adhérent'});
                            return;
                        }
                        saveHandler(e);
                    }}
                >
                    Sauvegarder
                </button>
            </div>
        </div>
    );
}
