import Header from './header.js'
import Footer from './footer.js'
import Image from 'next/image'
import { useState } from 'react'
import CarouselParam from './carouselParam'
import parse from 'html-react-parser'


export default function AppHistoire ({currentLanguage}) {
	const [carre, setCarre]=useState('taxi')	
    let images = [
        {url:"1938_albert_benoit.jpg", legende:"Portrait de Albert Benois, architecte et décorateur"},
        {url:"1939-Jules-Peyroux.jpg", legende:"Portrait de Jules Peyroux, entrepreneur"},
        {url:"1938_benediction_premiere_pierre_eglise_notre_dame_dormition.jpg", legende:"Bénédiction de la première pierre"},
        {url:"1938_benediction_premiere_pierre_eglise_notre_dame_dormition2.jpg", legende:"Bénédiction de la première pierre"},
        {url:"1938_construction_eglise.jpg", legende:"Construction de l'église, 1938"},
        {url:"1938_construction_eglise2.jpg", legende:"Construction de l'église, 1938"}],
	 histoireContentBlock1 =
            parse(`
                <div>
                    <h2 className="">La première émigration russe</h2>		
                    <p>
                    Selon Vassilis Pnevmatikakis, docteur en géopolitique de l’Université Paris VIII,
                        l’émigration russe issue de la révolution bolchevique de 1917 et de la guerre civile qui s’ensuivit 
                        a une spécificité qui la rendit unique dans l’histoire moderne.
                        Elle n’était pas juste une partie de la population russe qui fut forcée à quitter son pays mais elle était la patrie perdue même, 
                        la seule et vraie Russie. Durant les premières années de l’émigration, on ne parlait pas « d’exode des Russes » mais 
                        « d’exode de la Russie ».
                    </p>
                    <div class="sm:flex">
                        <div class="w-full sm:w-2/5 sm:mr-6 mt-4">
                            <Image src="/static/img/histoire/evacuation-de-crimee.jpg" 
                                alt="Evacuation de la crimée par les armées de russes blancs" 
                                width={1400} 
                                height={836}
                                layout="intrinsic"
                            />
                            <p class="text-xs italic text-center">L'évacuation de Crimée. Photo Domaine public.</p>
                        </div>

                        <div class="w-full sm:w-3/5">
                            En avril 1919, suite à la défaite militaire des Blancs au sud de la Russie et face à l’avancée des Rouges, 
                            pas moins de cinquante mille personnes évacuèrent Odessa. En 
                            novembre 1920, la défaite de l’Armée blanche du général Wrangel en Crimée provoqua un flux de 130 000 réfugiés 
                            dont la vaste majorité étaient des hommes jeunes de toute classe sociale.
                            Dès 1919 et les premiers mouvements migratoires vers l’Occident, à Paris ou à Berlin, se retrouvèrent 
                            de nombreux représentants du monde politique, du milieu des affaires, de la banque, de l’industrie, 
                            des professions libérales, de la noblesse et du monde des arts de la Russie prérévolutionnaire : 
                            anciens ministres et collaborateurs des derniers gouvernements, représentants des divers groupements 
                            politiques, journalistes, avocats, financiers, médecins, anciens aristocrates, artistes mais aussi des militaires.
                            Ils avaient conscience d’avoir été l’ossature de l’Etat, 
                            « la fleur du pays », ceux qui avaient pour tâche de diriger sa vie.	
                        </div>
                    </div>
                    <p>
                        Deux ans plus tard, en août 1922, le décret de Lénine expulsant hors de l’Union Soviétique plus de 160 illustres
                        intellectuels et leurs familles remplissait ledit « bateau des philosophes » et conduisait à l’exil à Berlin toute 
                        l’élite intellectuelle et scientifique de la Russie impériale. Le bateau des philosophes fut suivi peu de temps après 
                        par de nombreux artistes : peintres, sculpteurs, réalisateurs de cinéma, acteurs de théâtre, musiciens, danseurs, 
                        chanteurs d’opéra qui vinrent s’ajouter à une pléiade d’artistes qui vivait et travaillait déjà en Occident, 
                        surtout en France.
                    </p>
                    <p>
                        Les raisons pour le choix de la France comme destination finale pour les émigrés Russes
                            furent culturelles mais aussi politiques : de l’introduction des idées des Lumières en Russie par Catherine II (1729-1796) et l’enseignement obligatoire du français dans le système d’éducation secondaire russe jusqu’au choix de la France comme pays de villégiature pour la noblesse russe du XIXe siècle et l’alliance militaire et économique franco-russe de 1893, il y avait entre les deux pays des liens historiques profonds. L’alliance franco-russe de 1893 notamment avait permis la construction de nombreuses églises orthodoxes russes sur le territoire français : à côté des églises de Paris (1861) et de Pau (1867), des églises orthodoxes furent construites à Biarritz en 1892, à Cannes en 1894 et à Nice en 1912
                    </p>
                    <h2>La France terre d'asile</h2>
                    <p>
                        Bien que les premières destinations des émigrés russes aient été la Turquie, l’Allemagne, la Tchécoslovaquie 
                        et la Yougoslavie, à partir de 1923 c’est un autre pays qui s’émergea comme principal pôle d’attraction pour 
                        l’émigration russe : la France. Ce choix fut renforcé par la décision du métropolite Euloge de transférer 
                        son administration diocésaine de Berlin à Paris et de l’installer dans les locaux de l’église Saint 
                        Alexandre Nevski de la rue Daru, dans le 8e arrondissement de la capitale. 
                        A Paris, Mgr Euloge fut dès le début entouré d’anciens aristocrates, hauts dignitaires, dirigeants politiques
                        et illustres chefs militaires blancs qui avaient eux aussi choisi Paris comme lieu d’installation.
                    </p>
                    <h2 >La maison russe</h2>		
                    <p>
                        En 1927, Sainte-Geneviève-des-Bois était une petite commune de neuf cents habitants qui, en raison de sa situation 
                        sur l’axe Paris – Orléans et de sa proximité avec la capitale (24 km), était en train de s’urbaniser rapidement. 
                        La bienfaitrice britannique Dorothy Paget, sensibilisée aux difficultés des émigrés russes de Paris, fit 
                        l’acquisition d’une vieille ferme de Sainte-Geneviève-des-Bois transformée en maison bourgeoise au XIXe siècle 
                        et connue depuis sous le nom de Château de la Cossonnerie. Miss Paget offrit le château à son amie russe, 
                        la princesse Vera Mestchersky19, ancienne administratrice de la Croix Rouge russe, qui envisageait de fonder 
                        une maison de repos et de retraite pour ses compatriotes réfugiés âgés, malades ou mutilés de guerre. 
                        De cette façon, le Château de la Cossonnerie à Sainte-Geneviève-des-Bois devint la « Maison Russe »                        En 1927, la princesse russe Vera Mestchersky fonda à Sainte-Geneviève-des-Bois une maison de retraite 
                        pour les plus âgés des émigrés russes qui avaient fui la Russie révolutionnaire et trouvé refuge en France. 
                        Avec les premiers décès de pensionnaires se posa la question du lieu de leur inhumation. 
                        DÈS 1927, le premier pensionnaire de la Maison Russe décédé fut inhumé au cimetière communal de 
                        Sainte-Geneviève-des-Bois, pas loin de la maison de retraite. Les années suivantes, les inhumations 
                        de pensionnaires russes au cimetière de la ville se poursuivirent.
                    </p>
                    <p>
                        Au fil des années, on enterra non seulement les pensionnaires de la maison de retraite mais tous les émigrés 
                        russes décédés à Paris ou ailleurs en France. Le cimetière de Sainte-Geneviève-des-Bois devint ainsi la plus 
                        grande nécropole russe à l’étranger. En l’espace de dix-sept ans, de 1930 à 1947, il y a eu une augmentation 
                        considérable du nombre des concessions achetées par des Russes dans le cimetière de Sainte-Geneviève-des-Bois : 
                        27 concessions en 1930, 39 en 1931, 53 en 1935, 83 en 1939, 118 en 1941, 151 en 1942, 187 en 1943, 197 en 
                        1945 et 230 en 1947.
                    </p>
                    <h2 >La constuction de l'église de la Dormition</h2>		                                      <p>
                        Le métropolite Euloge, à la tête de l’archevêché des paroisses orthodoxes russes en Europe occidentale, 
                        prit la décision de faire construire un lieu de culte orthodoxe à proximité immédiate du cimetière. 
                        Ainsi, l’administration diocésaine fit l’acquisition d’un terrain jouxtant le cimetière pour y faire bâtir 
                        une église orthodoxe. La construction de l’église fut confiée à l’architecte russe Albert Alexandrovitch Benois
                        qui fit appel à l'entrepreneur Jules Despeyroux.
                    </p>
                </div>
                `
            ),
        histoireContentBlock2 =
           parse(`

                    <p>    
                        Pour la nouvelle église, Bénois adopta le style de Novgorod du XVe siècle simple et élégant : un édifice blanc de 
                        plan carré, découpé de fenêtres étroites, surmonté d’un toit vert symbolisant la terre et coiffé d’une coupole bleue 
                        suggérant le ciel portant une croix orthodoxe dorée à huit branches. La première pierre fut posée en avril 1938 
                        et la consécration de l’église, dédiée à la Dormition de la Mère de Dieu, eut lieu en octobre 1939.
                    </p>


                    <p>
                        C’est dans la crypte de cette église que reposent aujourd’hui les primats de l’archevêché des églises orthodoxes 
                        de tradition russe en Europe occidentale.
                    </p>
                    <h2 >La seconde émigration</h2>		                                      <p>
                    <p>
                        Après la Seconde Guerre mondiale et l’arrivée en France de la deuxième émigration russe, composée de prisonniers 
                        de guerre et de déportés refusant de rentrer en URSS, l’augmentation du nombre des inhumations russes au cimetière 
                        se poursuivit. Cette augmentation constante conduisit les autorités communales de Sainte-Geneviève-des-Bois à cinq 
                        agrandissements successifs du cimetière en 1931, 1945, 1955, 1969 et en 1980. Jusqu’au milieu des années 1970 d’ailleurs, 
                        la mairie de Sainte-Geneviève-des-Bois tolérait l’inhumation au cimetière des Russes extérieurs à la commune mais 
                        en 1976 elle y a mis officiellement fin.
                    </p>
                    <h2 >Le cimetière aujourd'hui</h2>		                                      <p>
                    <p>
                        Dans son état actuel, le cimetière est assez étendu, clôturé par un haut mur blanc et découpé par de larges allées 
                        qui sont bordées d’arbres ; c’est la princesse Vera Mestcherski, en tant que directrice de la Maison russe, qui, 
                        en 1941, demanda l’autorisation du conseil municipal de Sainte-Geneviève-des-Bois pour faire planter des arbres en 
                        bordure des allées longeant les tombes russes.
                    </p>
                    <p>
                        Pour les 30 000 personnes qui visitent le lieu chaque année, des touristes russes pour la plupart, le cimetière
                        de Sainte-Geneviève-des-Bois est un « coin de la Sainte Russie », une partie de la « Russie éternelle ». 
                        Et pourtant, il n’a pas toujours été ainsi : les Russes de Russie ignoraient l’histoire du cimetière pratiquement 
                        jusqu’aux années 1980. Il fallut attendre la dissolution de l’Union soviétique et la levée de la censure pour que 
                        l’histoire du cimetière de Sainte-Geneviève-des-Bois soit connue en Russie. Quant aux autorités du pays, celles-ci 
                        virent dans le cimetière un important enjeu symbolique.
                    </p>
                    <p>
                        Les visites au cimetière du président Poutine en 2000 et du feu patriarche Alexis II en 2007,
                        la remise par l’ambassadeur russe en France de la médaille Pouchkine à Tatiana Chomcheff, présidente du Comité pour 
                        l’entretien des sépultures russes du cimetière, mais aussi la prise en charge par l’Etat russe des frais de 
                        renouvellement des concessions appartenant à des familles russes témoignent de l’importance qu’accordent 
                        les autorités politiques et ecclésiastiques russes à la réconciliation de la mère patrie avec 
                        sa diaspora historique.
                    </p>
                    <p class="text-xs italic">
                        Source: Vassilis Pnevmatikakis, « Le cimetière russe de Sainte-Geneviève-des-Bois : 
                        histoire et enjeux identitaires d’un coin de Russie en France. », Mémoire(s), identité(s), marginalité(s) dans le 
                        monde occidental contemporain.
                    </p>
                </div>
			`)

	return (
		<div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
		    <Header currentLanguage={currentLanguage} currentPage={"histoire"} />
			<main className="px-2 md:px-24  ">  
                {histoireContentBlock1}	
                <div className="flex">
                    <div className="sm:w-1/4">
                    </div>
                    <div className="w-full sm:w-1/2">
                        <CarouselParam
                            imgList={images}
                            apiUrl={`/static/img/histoire/`}
                        />
                    </div>
                </div>
                {histoireContentBlock2}	
			</main>
 			<Footer />
		</div>
	)
}
