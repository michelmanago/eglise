import React from 'react';
import Link from 'next/link';
import Header from './header.js';
import Footer from './footer.js';
import Image from 'next/image';

import {getProperDate} from '@/lib/date';

export default function AppEglise({currentLanguage, articles}) {
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentLanguage={currentLanguage} currentPage={'eglise'} />
            <main className="mx-2 mt-4 sm:mx-20">
                <div className="px-2 sm:flex">
                    <div className="relative sm:w-1/3">
                        <Image
                            src="/static/img/eglise/pere_anatole_negruta_et_pere_marc_andre.jpg"
                            alt="Père Anatole Negruta et Père Marc André, église russe Sainte Geneviève des Bois"
                            layout="intrinsic"
                            width="600"
                            height="800"
                        />
                        <p className="italic text-center">Les pères Anatole Negruta et Marc André</p>
                    </div>
                    <div className="sm:w-2/3 sm:ml-4">
                        <h2>Eglise russe Notre Dame de la Dormition à Sainte Geneviève des Bois</h2>
                        <p className="border-b-2 border-pgray">
                            <span className="font-semibold">Recteur : </span>Son Eminence le métropolite Jean de Doubna,
                            archevêque des églises orthodoxes de tradition russe en Europe occidentale
                            <br />
                            <span className="font-semibold">Recteur adjoint : </span>Père Analtole Negruta
                            <br />
                            <span className="font-semibold">Prêtre desservant : </span>Père Marc André
                            <br />
                            <span className="font-semibold">Responsable Laïc : </span>Tatiana Chomcheff
                            <br />
                            <span className="font-semibold">Chef de chœur et trésorier: </span>Nicolas Lopoukhine
                            <br />
                            <span className="font-semibold">Secrétaire de la paroisse: </span>Michel Manago
                        </p>
                        <p className="border-b-2 border-pgray">
                            <span className="font-semibold">Langues de célébration : </span>slavon et français
                            <br />
                            <span className="font-semibold">Calendrier suivi : </span>Julien
                            <br />
                            <span className="font-semibold">Cathéchèses pour les adultes et les enfants : </span>Une
                            fois par mois. Contacter le père Anatole (rubrique contact). Cathéchèse par Internet avec le
                            logiciel zoom en période de Covid 19
                            <br />
                        </p>
                        <p>
                            <span className="font-semibold">Retransmissions des liturgies : </span>Les liturgies du
                            dimanche et des fêtes sont retransmises en direct sur la chaine youtube de la paroisse à
                            l'adresse &nbsp;
                            <a
                                href="https://www.youtube.com/c/egliserussestegenevievedesbois"
                                target="blank"
                                className="underline text-pblue"
                            >
                                https://www.youtube.com/c/egliserussestegenevievedesbois
                            </a>
                            <br />
                        </p>
                    </div>
                </div>
                <h2>Mesure sanitaires en période de Covid 19</h2>
                <ul className="ml-4 list-disc">
                    <li>
                        Pour entrer dans la propriété, il est nécessaire de disposer d’un masque règlementaire et de
                        s’être lavé les mains. Un distributeur de gel hydro alcoolique est mis à disposition.
                    </li>
                    <li>
                        Le nombre de fidèles admis dans l’église est limité à 20 personnes y compris le choeur. Un
                        cordon est mis en place pour limiter l’accès.
                    </li>
                    <li>
                        Les paroissiens en surnombre sont invités à suivre l’office depuis le jardin. A cet effet, les
                        portes de l’église sont grandes ouvertes et les hautparleurs mis en fonctionnement. Une
                        tonnnelle a été installée devant l'église pour se protéger des intempéries.
                    </li>
                    <li>
                        Dans l’église comme dans le jardin, les distances règlementaires doivent être respectées pendant
                        et après l’office.
                    </li>
                    <li>
                        Le port du masque dans l’église est obligatoire y compris pour la confession (seul les choristes
                        et le clergé sont autorisés à l’enlever quand cela est nécessaire).
                    </li>
                    <li>
                        Il est demander de ne pas embrasser les icônes ni la main du prêtre qui donne sa bénédiction à
                        distance.
                    </li>
                    <li>
                        Au-delà de 20 fidèles à l’intérieur de l’église, une seule personne à la fois sera autorisée à
                        s’introduire dans l’église pour se recueillir devant les icones, poser des cierges et pour se
                        confesser.
                    </li>
                    <li>La Sainte Communion est donnée selon des modalités que le prêtre précise avant celle-ci.</li>
                </ul>
                <h2>Cathéchèse pour adultes</h2>
                <p>
                    Télécharger la&nbsp;
                    <a className="underline text-pblue" href="static/pdf/Les Psaumes cathéchèse 09032021.pdf">
                        cathéchèse du 21 Mars 2021
                    </a>
                </p>
                <h2>Actualités</h2>
                <div className="flex flex-wrap">
                    {articles?.map(article => (
                        <div className="w-1/3 px-2" key={article.id}>
                            <Link href={`/articles/${article.article_id}`}>
                                <a>
                                    {article.image ? (
                                        article.image.startsWith('http') ? (
                                            <img className="mx-auto" src={`${article.image}`} />
                                        ) : (
                                            <img className="mx-auto" src={`${imgBaseUrl}/${article.image}`} />
                                        )
                                    ) : null}
                                    <h3 className="inline-block">{article.title}</h3>
                                    <div className="inline-block mx-2 text-sm">{getProperDate(article.date)}</div>
                                </a>
                            </Link>
                        </div>
                    ))}
                    <div className="w-full mt-3 text-center">
                        <Link href="/articles">
                            <a className='px-2 py-3 text-white cursor-pointer bg-pgold'>Toutes les Actualités</a>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
