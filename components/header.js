 import NavBar from './nav.js'
import Langue from './langue'


export default function Header ({currentPage, currentLanguage}) {
	let h1Title, alt, logoFile, topImageHook

	switch (currentPage) {
		case '' :                               // page index
			logoFile = "logo-eglise.svg"
			switch (currentLanguage) {
				case 'fr' :
					h1Title = "Bienvenue à la nécropole Russe de Sainte Geneviève des Bois"
					alt = "logo du comité d'entretien des sépultures russes du cimetière de sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "Welcome to the Russian necropolis of Sainte Geneviève des Bois"
					alt = "logo of the maintenance committee of the Russian graves of the cemetery of Saint Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Добро пожаловать в русский некрополь Сент-Женевьев-де-Буа"
					alt = "логотип комитета по содержанию русских могил на кладбище Сен-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header index")
			}
			topImageHook="home-hook"
			break
		case 'eglise' :
			logoFile = "logo-eglise.svg"
			switch (currentLanguage) {
				case 'fr' :
					h1Title = "L'église russe de Sainte Geneviève des Bois"
					alt = "logo de l'église russe à sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "The russian church of Sainte Geneviève des Bois"
					alt = "logo of the russian Church in sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Русская церковь Сент-Женевьев-де-Буа"
					alt = "логотип Русской церкви Сент-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header eglise")
				}
		topImageHook="eglise-hook"
		break
		case 'histoire' :
			logoFile = "logo-cimetiere.svg"
			switch (currentLanguage) {
				case 'fr':
						h1Title = "Histoire de la nécropole russe"
						alt = "logo du comité d'entretien des tombes du cimetière russe de sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "History of the Russian necropolis"
					alt = "logo of the upkeep committee of the graves of the Russian cemetery of Sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "История русского некрополя"
					alt = "логотип комиссии по обслуживанию могил русского кладбища Сен-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header carres")
				}
			topImageHook="histoire-hook"
			break
	
		case 'carres' :
			logoFile = "logo-cimetiere.svg"
			switch (currentLanguage) {
				case 'fr':
						h1Title = "Les carrés civils et militaires"
						alt = "logo du comité d'entretien des tombes du cimetière russe de sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "Civilian and military squares"
					alt = "logo of the upkeep committee of the graves of the Russian cemetery of Sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Гражданские и военные площади"
					alt = "логотип комиссии по обслуживанию могил русского кладбища Сен-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header carres")
				}
			topImageHook="carres-hook"
			break

		case 'defunts' :
			logoFile = "logo-cimetiere.svg"
			switch (currentLanguage) {
				case 'fr' :
					h1Title = "Rechercher un défunt"
					alt = "logo du comité d'entretien des tombes du cimetière russe de sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "Find a deceased"
					alt = "logo of the upkeep committee of the graves of the Russian cemetery of Sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Найдите умершего"
					alt = "логотип комиссии по обслуживанию могил русского кладбища Сен-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header dons")
			}
			topImageHook="defunts-hook"
			break
		case 'dons' :
			logoFile = "logo-eglise.svg"
			switch (currentLanguage) {
				case 'fr' :
					h1Title = "Faire un don ou un legs à l'église"
					alt = "logo de l'église russe à sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "Make a donation for the Chruch"
					alt = "logo of the russian Church in sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Пожертвовать для церкви"
					alt = "логотип Русской церкви Сент-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header dons")
			}
			topImageHook="dons-hook"
			break
		case 'informations' :
			logoFile = "logo-eglise.svg"
			switch (currentLanguage) {
				case 'fr' :
					h1Title = "Informations pratiques"
					alt = "logo de l'église russe à sainte Geneviève des Bois"
					break
				case 'en' :
					h1Title = "Useful Information"
					alt = "logo of the russian Church in sainte Geneviève des Bois"
					break
				case 'ru' :
					h1Title = "Полезная информация"
					alt = "логотип Русской церкви Сент-Женевьев-де-Буа"
					break
				default :
					throw("Erreur. langue inconnue dans Header dons")
			}
			topImageHook="dons-hook"
			break
		default :
			if (currentPage.search("defunts")!=-1) {
					logoFile = "logo-cimetiere.svg"
					topImageHook="defunts-hook"
					switch (currentLanguage) {
						case 'fr' :
							h1Title = "Information sur le défunt"
							alt = "logo de l'église russe à sainte Geneviève des Bois"
							break
						case 'en' :
							h1Title = "Information about a deceased"
							alt = "logo of the russian Church in sainte Geneviève des Bois"
							break
						case 'ru' :
							h1Title = "Информация об умершемо"
							alt = "логотип комитета по содержанию русских могил на кладбище Сен-Женевьев-де-Буа"
							break
					}
				}
			else{throw("Erreur. Page inconnue dans Header"+currentPage)}
		}
	return (
	    <header>	
    		<div className="bg-pwhite h-80px sm:h-115px">
		    	<div className="float-right h-80pxsm:h-115px">
		    		<Langue currentLanguage={currentLanguage} currentPage={currentPage} />
		    	</div>
		    	<div className="flex justify-center">
		    		<img className="h-80px sm:h-115px pl-60px" alt={alt} src={"/static/img/"+logoFile} />
		    	</div>
		    </div>

			<NavBar currentLanguage={currentLanguage} activeMenu={currentPage} />

			<div className={topImageHook+" h-80px sm:h-165px flex items-top pt-2 sm:pt-0 sm:items-center justify-center text-white"}>
				<h1 className="inline-block text-lg align-middle md:text-2xl xl:text-3xl sm:pt-0">{h1Title}</h1>
			</div>

			<div className="pb-8 sm:pb-0">
			</div>

		</header>
	)
}



