import Header from './header.js'
import Footer from './footer.js'
import Image from 'next/image'
import { useState } from 'react'
import parse from 'html-react-parser'


export default function AppCarres ({currentLanguage}) {
	const [carre, setCarre]=useState('taxi')	
	let squareContent
	switch (carre) {
		case 'taxi' :
			squareContent =
				parse(`
						<Image src="/static/img/carres/T-carre-des-taxis.jpg"
							alt="le carré des chauffeurs de taxi au cimetière russe de sainte geneviève des bois"
							layout="intrinsic"
							width="1400"
							height="788" />
						<div class="px-4">
							<h2 class="">Le carré civil des chauffeurs de taxi</h2>			
							<p>
							Dans les années 30, il y avait plus de trois mille chauffeurs de taxi russes sillonnant les rues parisiennes, dit André 
							Korliakov, dans son livre sur l’immigration russe en France. Ils firent longtemps partie du folklore de la capitale.
							Jusqu’en 1938, il n’existe ni conventions, ni numérus clausus dans la profession.
							A condition de savoir conduire, chacun peut donc travailler dans une compagnie de taxis. 
							</p>
							<p>
							Militaires, aristocrates et cosaques obtiennent aisément leur permis. 
							Il y avait de nombreux officiers supérieurs de la garde 
							impériale. Ils avaient une excellente éducation, mais leur seule profession était la guerre. Or, ils savaient conduire, 
							certains même avaient participé à des rallyes. C’est pourquoi ils se firent chauffeurs de taxi. 
							Ils devinrent des professionnels consciencieux. « Pour mieux connaître les rues de Paris, raconte André Korliakov, ils 
							avaient construit la maquette de la capitale en plâtre, sur une terrasse, avec toutes les artères. Ils apprenaient 
							les itinéraires en faisant circuler de petites voitures. » 
							<p>
							</p>
							Le métier offre de sérieux avantages : ce n’est pas un travail de fonctionnaire, des horaires souples permettent
							de mener parallèlement une activité politique et d’assister, à toute heure du jour et de la nuit aux réunions destinées 
							à « sauver la Russie » des bolchéviks… des rencontres extraordinaires donnent parfois à l’émigré le « sentiment 
							tragique de la vie » : anciennes connaissances retrouvées au hasard d’une course, hommes politiques que l’on 
							cherche à influencer, millionnaires dont on attends des miracles pour la bonne cause… 
							<p>
							</p>					
							Dans les années 50, il y avait encore plus de sept cents 
							taxis russes dont la moyenne d’âge frisait les soixante-cinq ans. Le dernier a pris sa retraite dans les années 70. 
							Jusqu’à quatre-vingt-douze ans, il avait satisfait aux exigences de la visite médicale obligatoire !
							</p>

					</div>
				`)
			break
			case 'drozdovky' :
				squareContent =
				parse(`

				<Image src="/static/img/carres/CM1-unite-du-general-drozdovsky.jpg"
				alt="le carré du général drozdovsky au cimetière russe de sainte geneviève des bois"
				layout="intrinsic"
				width="1400"
				height="788" />
				
				<div class="px-4">
					<h2 className="pt-16">Le carré militaire du général Drozdovsky</h2>			
					<p >Ce monument a été élevé en 1952 en souvenir du général Drozdovsky par les soldats qui ont servi sous ses ordres. 
					Le général Drozdovsky est un général de division russe, chevalier des ordres de Saint-Georges, Saint-Vladimir, Sainte-Anne 
					et Saint-Stanislas. 
					</p>
					<p>
						Vétéran de la guerre russo-japonaise et de la Première Guerre mondiale, représentant de la branche monarchiste du mouvement blanc.
						En 1917 il organise à Iași, sur le front roumain, une division de volontaires des armées blanches avec qui il traverse à pieds 
						en 1918 l'Ukraine pour rejoindre l'armée des volontaires sur le Don du général Dénikine. 
						C'est la célèbre marche de Iași au Don d'une distance de 1200 verstes (ancienne mesure utilisée en Russie) c'est à dire 1125 km.
						Blessé au combat non loin de Stavropol en octobre 1918, le général Drozdovski décède des suites de sa blessure en janvier 1919.
					</p>
					<p>
						Le tombeau du général se trouvait initialement dans la crypte de la Cathédrale militaire Saint-Alexandre-Nevski 
						mais en mars 1920 sa dépouille a été transférée en Crimée par ses troupes et enterrée sur la colline de Malakhov 
						à Sébastopol sous un faux nom.  Son tombeau a vraissemblablement été détruit lors du blocus de la ville par les allemands 
						pendant la seconde guerre mondiale. 
					</p>
					<p>
						Il y a 27 tombes dans ce carré numérotées 2979 à 2984, 3013 à 3018, 3047 à 3051 et 3081 à 3092.
					</p>
				`)
			break
			case 'legion' :
				squareContent =
				parse(`
					<Image src="/static/img/carres/CM2-legion-etrangere.jpg"
						alt="le carré de la légion étrangère au cimetière russe de sainte geneviève des bois"
						layout="intrinsic"
						width="1400"
						height="788" />
					<div class="px-4">	
						<h2 className="pt-16">Le carré militaire de la légion étrangère</h2>			
						<p >
							Ce carré comprend un Monument à la mémoire des officiers anciens combattants de l'armée française à titre étranger 
							1914-1918 et 1939-1945. Ce monument comprend une plaque verticale où figure la grenade à sept branches symbole de la légion.
							Il a été inauguré le 29 Mai 1965 par Monsieur Jean Sainteny, ministre des anciens combattants et victimes cviles de guerre. 
						</p>
						<p>
							Dans ce carré git le général dans l'armée française Zinovi Alekseïevitch PECHKOFF, grand croix de la légion d'honneur.
							Il s'agit du fils adoptif de GORKI et frère aîné du révolutionnaire et homme politique russe Iakov SVERDLOV. 
							En 1914, il s'engage au poste de recrutement de Nice de la Légion étrangère comme Engagé Volontaire pour la Durée de la Guerre. 
							Il finira sa brillante carrière militaire en général de corps d'armée et diplomate français, élevé à la dignité de grand croix 
							de la Légion d'honneur, remise par le président Vincent Auriol le 14 octobre 1952, distinction qui touche au plus profond 
							de lui-même le jeune voyou de Nijni Novgorod. 
						</p>
						<p>
							Sentant venir sa dernière heure, il demande que l'on fasse venir le prince Nicolas OBOLENSKI II, membre du clergé orthodoxe 
							de Paris qui recueille ses dernières volontés : « Il me faudra autour de mon cercueil autant de légionnaires que possible. 
							Sur mon cercueil il me faut un képi blanc » et lui ferme les yeux après s'être éteint le lundi 27 novembre 1966 à 14h.
						</p>
						<p>
							Le 30 novembre, jour de l'enterrement, deux membres du gouvernement conduisent le deuil : M. Couve de Murville, 
							ministre des Affaires Etrangères et M. Christian Fouchet, ministre de l'Education Nationale. 
							Après la cérémonie religieuse en la Cathédrale russe de la rue Daru, quatre officiers supérieurs de la Légion Etrangère 
							l'accompagnent jusqu'à sa dernière demeure : le Général Andolenko, le Colonel Vadot, le Colonel Chenel et le Colonel Lenoir, 
							six légionnaires, entourés des drapeaux des sociétés d'anciens de la Légion Etrangère, portent le corps qui est inhumé 
							dans le carré des légionnaires. 
						</p>
						<p>
							Sur la pierre tombale, oubliés les honneurs, son grade de général, la dignité d'ambassadeur de France, seule demeure 
							l'inscription de sa dernière volonté : « Ci-gît, légionnaire Zinovi Pechkoff »
						</p>
						<p>
							Il y a 9 tombes dans ce carré numérotées 5707 à 5709, 5723 à 5725 et 5739 à 5741.
						</p>
					</div>				
				`)
			break
			case 'gallipoli' :
				squareContent =
				parse(`
				<Image src="/static/img/carres/CM3-carre-des-gallipoli.jpg"
					alt="le carré de Gallipoli au cimetière russe de sainte geneviève des bois"
					layout="intrinsic"
					width="1400"
					height="788" />

				<div>
					<h2 className="pt-16">Le carré militaire des Gallipoli</h2>			
					<p >Le monument de Gallipoli a été érigé en mémoire des anciens combattants russes de Galipolli. La péninsule de Gallipoli 
						forme la partie nord du détroit des Dardanelles reliant la mer Égée à la mer de Marmara. 
						En 1920-1921 une partie de l'armée russe du général Wrangel, évacuée de Crimée, s'établit sur la péninsule de Gallipoli. 
						Le camp militaire de Gallipoli devint un des centres militaires de l'émigration blanche. 
						Beaucoup de réfugiés partirent par la suite pour d'autres pays d’accueil, en particulier la Serbie et la France.
						Un monument commémoratif a été érigé en 1921 sur place par les forces russes. Détruit par un tremblement de terre en 
						1949, ce monument a été reconstruit et inauguré en mai 2008. 
						Une copie plus petite de ce monument a été réalisée par l'architecte Alexandre Benoit pour l'installer dans le
						cimetière russe. Des plaques commémoratives à la mémoire des soldats de l'armée blanche sont apposées sur le socle du
						monument. Il s'agit des soldats morts durant la guerre civile contre les bolchéviques ainsi que leurs généraux : Alexeev,
						Kornilov, Markov, Drozdovski, Wrangel, l'amiral Koltchak ainsi que des "glorieux cosques". Sur les pierre figure un
						écusson à tête de mort des Kornilovsky dont la devise était "vaincre ou mourir"
					</p>
					<p>
						On dénombre 36 tombes dans ce carré.
					</p>

				</div>
			`)
			break
			case 'alexeev' :
				squareContent =
				parse(`
					<div class="float-none sm:float-left pt-6 mb-2 pr-4 md:w-1/2">
						<Image src="/static/img/carres/CM4-unite-du-general-alexeev.jpg"
							alt="le carré du général Alexeev au cimetière russe de sainte geneviève des bois"
							layout="intrinsic"
							width="788"
							height="1400" />
					</div>
					<div class="px-4">
						<h2 className="pt-16">Le carré militaire du général Alexeev</h2>			
						<p>
							Ce carré, délimité par des barres bleues, comprend une petite chapelle en mémoire du général Alexeev.
							Ce général, né le 3 novembre 1857 dans le gouvernement de Tver (Russie) et mort le 25 septembre 1918 d'un problème cardiaque 
							à Ekaterinodar (Russie), est un militaire russe. Il fut officier avant et pendant la Première Guerre mondiale 
							et l’un des chefs des armées blanches anti-bolchéviques durant la guerre civile russe de 1917 à 1918.
							Pendant la révolution, Alekseïev use de son influence auprès des autres commandants en chefs pour convaincre 
							le tsar d’abdiquer en mars 1917 et de sauver ainsi la monarchie. Après la révolution d'Octobre, il est l’un des 
							fondateurs des organismes contre-révolutionnaires appelant à combattre les bolchéviks et les Allemands. Il participe
							aux campagnes du Kouban de l'armée des volontaires et en devient le commandant en chef. Le général Alexeev
							est enterré à Belgrade en Serbie où son corps a été transféré pour éviter que sa tomebe soit profanée.
						</p>
						<p>
							Après sa mort, son nom est donné à une unité de volontaires qu’il avait formé en décembre 1917 et qui devint la division du général Alexeev.
						</p>
						<p>
							Il y a 15 tombes dans ce carré numérotées 3394 à 3398, 5346 à 5350 et 5363 à 5367.
						</p>

					</div>
				`)
			break
			case 'cadets' :
				squareContent =
				parse(`
					<Image src="/static/img/carres/CM5-corps-des-cadets.jpg"
						alt="le carré du corps des cadets russes au cimetière russe de sainte geneviève des bois"
						layout="intrinsic"
						width="1400"
						height="788" />
					<div class="px-4">	
						<h2 className="pt-16">Le carré militaire du corps des cadets russes</h2>			
						<p>
							Depuis sa fondation en 1731, le corps des cadets russes a été destiné aux enfants de la noblesse pour qu'ils y recoivent une
							formation d'officier. Après la révolution de 1971, un corps de cadets russes est créé en France, à Versailles, sous la direction
							du lieutenant général Wladimir Rimsky Korsakoff. Un monument sur lequel est gravé l'inscription cadets se trouve au centre.
						</p>
						<p>
							Il y a 50 tombes dans ce carré numérotées de 7170 à 7174, 7186 à 7190, 7202 à 7206, 7218 à 7222, 
							7234 à 7238, 7250 à 7254, 7266 à 7270, 9415 à 9421, 9452 à 9458 et 9459 à 9465.
						</p>
					</div>

				`)
			break
			case 'cosaques' :
				squareContent =
				parse (`
				<div class="float-none sm:float-right pt-6 mb-2 md:w-1/2">
					<Image src="/static/img/carres/CM6-cosaques-du-don-bogaevski.jpg"
						alt="le carré des cosaques du don au cimetière russe de sainte geneviève des bois"
						layout="intrinsic"
						width="788"
						height="1400" />
				</div>	
				<div class="px-4">
				<h2 className="pt-16">Le carré militaire des cosaques du Don</h2>			
				<p>
					Les cosaques constituent des régiments d'élite affectés, entre autre, à la garde des tsars. 
					Les cosaques du Don sont une cosaquerie installée 
					dans la région du fleuve Don dans le sud de la Russie. Le territoire historique des cosaques du Don recoupait 
					les territoires (oblasts) de Donetsk et Louhansk, en Ukraine actuelle.
					À partir d’Ivan le Terrible, les tsars de Russie s’attachent les services des cosaques du Don, notamment en leur envoyant
					fournitures, munitions, vivres, tant pour s’adjoindre les services de cette cavalerie d’élite, que pour les maintenir 
					dans un état de soumission, les empêchant de se retourner contre le pouvoir russe.
				</p>
				<p>
					Les cosaques du Don connaissent leur apogée durant les guerres entre la Russie et Napoléon Ier. Ils sont réputés 
					pour avoir effectué par grand froid une traversée des Alpes réputée infaisable. Pendant la campagne de France de 1814, 
					ils avancent jusqu'à Paris et établissent leur campement sur les Champs-Élysées.
				</p>
				<p>						
					Durant la guerre civile qui a suivi la révolution de 1917, la plupart des régiments cosaques servent dans l'armée blanche.
					Ils se battent jusqu'à la fin avant d'émigrer en Europe et notamment à Paris. Les survivants du régimentn des cosaques de 
					la garde louent
					un pavillon à Courbevoie pour y entreposer leur trésor régimentaire qu'ils ont emporté avec eux. Il s'agit d'uniformes 
					ainsi que de bannières, drapeaux de régiments, armes et de pièces d'orfévrerie offerts
					par les souverains à des officiers au moment de leur mise à la retraite. La montée du front populaire en 1936
					leur faire craindre que ce trésor soit saisi et renvoyé en URSS et transfère celui-ci en Belgique pour être exposé 
					au musée royal de l'armée à Bruxelles. 
				</p>
				<p>
					Le monument central avec la croix a été construit par Mr Jules Peyroux. Il est érigé à la mémoire des consaques.
				</p>
				<p>
					Il y a 47 tombes dans ce carré numérotées 8180 à 8191, 8197 à 8208, 8214 à 8225, et 8231 à 8242.
				</p>
				<div class="text-center">
					<Image src="/static/img/carres/CM6-panihida-cosaques-du-don-bogaevski2.jpg"
						alt="comémoration pour les cosaques au cimetière russe de sainte geneviève des bois"
						layout="intrinsic"
						width="1400"
						height="788" />
						<p class="italic">
							Cérémonie en mémoire des cosaques au cimetière 
						</p>
				</div>
					
			</div>

				`)
			
	}



	return (
		<div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
		    <Header currentLanguage={currentLanguage} currentPage={"carres"} />
			<main className="	">
				<div className="flex flex-wrap">
					<div className="w-full md:w-1/4">
						Carrés :	
						<ul> 
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('taxi')}}>
									{currentLanguage == 'fr' ? "Chauffeurs de taxis" : ""}
									{currentLanguage == 'en' ? "Taxis drivers" : ""}
									{currentLanguage == 'ru' ? "Водители такси" : ""}
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('drozdovky')}}>
									{currentLanguage == 'fr' ? "Général Drozdovsky" : ""}
									{currentLanguage == 'en' ? "General Drozdovky" : ""}
									{currentLanguage == 'ru' ? "Генерал Дроздовский" : ""}
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('legion')}}>
									{currentLanguage == 'fr' ? "Légion étrangère" : ""}
									{currentLanguage == 'en' ? "French Foreign Legion" : ""}
									{currentLanguage == 'ru' ? "Иностранный легион" : ""}
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('gallipoli')}}>
									{currentLanguage == 'fr' ? "Les Gallipoli" : ""}
									{currentLanguage == 'en' ? "Gallipoli" : ""}
									{currentLanguage == 'ru' ? "Галлиполи" : ""}
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('alexeev')}}>
									{currentLanguage == 'fr' ? "Général Alexeev" : ""}
									{currentLanguage == 'en' ? "General Alexeev" : ""}
									{currentLanguage == 'ru' ? "Генерал Алексеев" : ""}
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('cadets')}}>
									{currentLanguage == 'fr' ? "Les cadets russes" : ""}
									{currentLanguage == 'en' ? "Russian cadets" : ""}
									{currentLanguage == 'ru' ? "Русские кадеты" : ""}									
								</button>
							</li>
							<li>
								<button className="text-pblue pb-1" 
									onClick={() => {setCarre('cosaques')}}>
									{currentLanguage == 'fr' ? "Les cosaques du Don" : ""}
									{currentLanguage == 'en' ? "Don Cossacks" : ""}
									{currentLanguage == 'ru' ? "Донские казаки" : ""}
								</button>
							</li>
						</ul>
					</div>

					<div className="w-full md:w-3/4 px-5px">
						<div className="">
							{squareContent}	
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
