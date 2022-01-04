import { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../components/layout'
import Header from '../components/header'
import Footer from '../components/footer'


import styles from '../styles/defunts.module.css'
import Link from 'next/link'

export default function defuntsedit({ defuntsedit }) {
    const router = useRouter()
    const { locale } = router
    const [celebrite, setCelebrite] = useState(false);
    const tombeRef = useRef(null);
    const [categorie, setCategorie]     =   useState(null);
    const titreRef = useRef(null);
    const nomRef = useRef(null);
    const nomJFilleRef = useRef(null);
    const prenomRef = useRef(null);
    const patronymeRef = useRef(null);
    const professionRef = useRef(null);
    const dateNaissanceRef = useRef(null);
    const villeNaissanceRef = useRef(null);
    const paysNaissanceRef = useRef(null);
    const dateDecesRef = useRef(null);
    const lieuDecesRef = useRef(null);
    const bioRef = useRef(null);
    const [validated, setValidated]     =   useState(false);
    const [defuntsList, setDefuntsList] = useState(defuntsedit)
    async function handleEdites(e) {
        e.preventDefault();
        const numberValidated = validated ? 1: 0;
        const numberCelebrite = celebrite ? 1: 0;
        
        const resp = await fetch('/api/defunts/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            
            body: JSON.stringify({
                celebrite: numberCelebrite,
                tombe: tombeRef.current?.value,
                categorie: categorie,
                titre: titreRef.current?.value,
                nom: nomRef.current?.value,
                nomJFille: nomJFilleRef.current?.value,
                prenom: prenomRef.current?.value,
                patronyme: patronymeRef.current?.value,
                profession: professionRef.current?.value,
                dateNaissance: dateNaissanceRef.current?.value === "" ? null : dateNaissanceRef.current?.value,
                villeNaissance: villeNaissanceRef.current?.value,
                paysNaissance: paysNaissanceRef.current?.value,
                dateDeces: dateDecesRef.current?.value === "" ? null : dateDecesRef.current?.value,
                lieuDeces: lieuDecesRef.current?.value,
                bio: bioRef.current?.value,
                validated: numberValidated
            })
        });
        
        
    }

    const celibleCheck = useCallback(e => {
        console.log('onchange checkbox ', celebrite);
        setCelebrite(!celebrite)
    }, [celebrite])

    const handleCheck = useCallback(e => {
        console.log('onchange checkbox ', validated);
        setValidated(!validated)
    }, [validated])

    const cateSelect = useCallback(e => {
        console.log('onchange select ', categorie);
        setCategorie(categorie)
    }, [categorie])

  

    return (
        <Layout>
            <Head>
                <title>Cimetière russe</title>
            </Head>


            <div className="container mx-auto bg-pwhite max-w-screen-xl">
                <Header currentLanguage={locale} currentPage={"eglise"} />



                <main className="mt-4 mx-2">
                    <h1>Eglise russe de Sainte Genevieve des bois</h1>
                    <div className="px-2">
                        Liste des défunts du cimetière
						    </div>

                    <div className="my-8">
                    </div>
                    
                    <form >
                        <div className="w-full  mr-72 mt-6 ">
                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                <a className=" text-gray-700">Célébrité </a>
                                <input name="celebrite" type="checkbox" className="coding"   id="celebrite" onChange={celibleCheck} defaultChecked={celebrite}/>
                            </label>

                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                <a className=" text-gray-700">Validated </a>
                                <input name="validated" type="checkbox" className="coding"   id="validated" onChange={handleCheck} defaultChecked={validated}/>
                            </label>          
             
                        </div>

                        <div className="mt-1">
                            <label className="w-full md:w-2/3 px-3 mb-6  ">
                                <a className=" text-gray-700 mr-16 ">Tombe </a>
                                <input name="tombe" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={tombeRef} id="tombe" required/>
                            </label>

                            <label className="w-full md:w-2/3 px-3 mb-6 ml-96 ">
                                <a className=" text-gray-700 mr-11">Profession </a>
                                <input name="profession" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={professionRef} id="profession" required/>
                            </label>
                        </div>

                        <div className="mt-1">   
                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                    <a className=" text-gray-700 mr-20">Nom </a>
                                    <input name="nom" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 "  ref={nomRef} id="nom" required/>
                                </label>

                                <label className="w-full md:w-2/3 px-3 mb-6 ml-96 ">
                                    <a className=" text-gray-700 mr-12 ">NomJFille </a>
                                    <input name="nomJFille" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={nomJFilleRef} id="nomJFille" required/>
                                </label>
                        </div>

                        <div className="mt-1">
                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                <a className=" text-gray-700 mr-14">Prénom </a>
                                <input name="prenom" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={prenomRef} id="prenom" required/>
                            </label>
                        
                            <label className="w-full md:w-2/3 px-3 mb-6 ml-96">
                                <a className=" text-gray-700 mr-12 ">Patronyme </a>
                                <input name="patronyme" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={patronymeRef} id="patronyme" required/>
                            </label>
                        </div>


                        <div className="mt-1">   
                            <select id="categorie" className=" ml-32 px-3 mb-6 w-60 border-gray-500 appearance-none border " onChange={e => setCategorie(e.target.value)}>
                                <option value="None">-- Catégorie --</option>
                                <option value="None">-- Catégorie --</option>
                                <option value="architecture">Architecture</option>
                                <option value="célébrité-diverses">Célébrité diverses</option>
                                <option value="chauffeurs-de-taxi">Chauffeurs de taxi</option>
                                <option value="danse">Danse</option>
                                <option value="diplomatie">Diplomatie</option>
                                <option value="enseignement">Enseignement</option>
                                <option value="littérature">Littérature</option>
                                <option value="militaires">Militaires</option>
                                <option value="musique">Musique</option>
                                <option value="peinture">Peinture</option>
                                <option value="politique">Politique</option>
                                <option value="religion">Religion</option>
                                <option value="resistance">Résistance</option>
                                <option value="romanoff">Les Romanoff</option>
                                <option value="sciences">Sciences</option>
                                <option value="sculpture">Sculpture</option>
                                <option value="spectacle">Spectacle</option>
                            </select>


                            <label className="w-full md:w-2/3 px-5 mb-6 ml-96">
                                <a className=" text-gray-700 mr-24 ">Titre </a>
                                <input name="titre" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={titreRef} id="titre" required/>
                            </label>
                        </div>

                        <div className="-mt-5">
                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                <a className=" text-gray-700 mr-1">DateNaissance </a>
                                <input name="dateNaissance" type="date" className="border-gray-500 appearance-none border p-1 form-input w-60" ref={dateNaissanceRef} id="dateNaissance" required/>
                            </label>


                            <label className="w-full md:w-2/3 px-3 mb-6 ml-1 ">
                                <a className=" text-gray-700">villeNaissance </a>
                                <input name="villeNaissance" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={villeNaissanceRef} id="villeNaissance" required/>
                            </label>
                           
                            <label className="w-full md:w-2/3 px-3 mb-6  ml-2">
                                <a className=" text-gray-700 mr-3">PaysNaissance </a>
                                <input name="paysNaissance" type="text" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={paysNaissanceRef} id="paysNaissance" required/>
                            </label>
                        </div>

                        <div className="mt-1">
                        
                            <label className="w-full md:w-2/3 px-3 mb-6 ">
                                <a className=" text-gray-700 mr-8">DateDeces </a>
                                <input name="dateDeces" type="date" className="border-gray-500 appearance-none border p-1 form-input w-60 " ref={dateDecesRef} id="dateDeces" required/>
                            </label>

                            
                            <label className="w-full md:w-2/3 px-3 mb-6 ml-96 ">
                                <a className=" text-gray-700 mr-12">LieuDeces </a>
                                <input name="lieuDeces" type="text" className="border-gray-500 appearance-none border p-1 form-input  w-60" ref={lieuDecesRef} id="lieuDeces" required/>
                            </label>
                        </div>
                        
                           
                        <div className="mt-1">
                            
                            <label className="w-full md:w-4/4 px-3 mb-6 ">
                                <a className=" text-gray-700 ml-20">Bio </a>
                                <textarea name="bio"  rows="8" cols="129" type="text" className="border-gray-500 appearance-none border  form-input "  ref={bioRef} id="bio" required> </textarea>
                            </label>
                        </div>

                        
                        <div className="mt-1  flex place-content-center">
                        <button type="submit" onClick={handleEdites} className="  w-48 py-3    bg-pgold ">
                            Enregistrement
                        </button>
                        </div>
                    </form>


                </main>


                <Footer />
            </div>

        </Layout>
    )
}




