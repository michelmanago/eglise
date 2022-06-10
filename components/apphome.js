import Carousel from './carousel';
import Footer from './footer';
import Header from './header';

export default function AppHome({currentLanguage}) {
    return (
        <div className="container sm:mx-auto bg-white max-w-screen-xl">
            <Header currentLanguage={currentLanguage} currentPage={''} />
            <main>
                <div className="w-full mt-1 py-6 overflow-hidden md:flex ">
                    <div className="mx-2 sm:mx-20">
                        <img
                            className="md:float-left md:mr-6 md:mb-4 flex md:w-2/5 "
                            src="/static/img/cimetiere-eglise-russe-sainte-geneviève-des-bois1ère-page.jpg"
                            alt="cimetière et église russe de st geneviève des bois"
                        />
                        <h2 className="md:-mt-4">La Nécropole Russe de Sainte Geneviève des Bois</h2>
                        <p className="text-justify">
                            La nécropole russe comprend d'une part l'église orthodoxe de la Dormition de la sainte mère
                            de Dieu et vierge Marie, ses dépendances et son jardin, et d'autre part les tombes russes
                            orthodoxes du cimetière communal de Sainte Geneviève des Bois. Le site du cimetiere russe,
                            anciennement accessible à partir du présent site, a été relocalisé à l'adresse{' '}
                            <a href="https://cimetiere-russe.org">cimetiere-russe.org</a>.
                        </p>
                        <p className="text-justify">
                            L'origine du cimetière provient de l'accueil fait aux émigrés russes âgés à la « Maison
                            Russe » au château de la Cossonerie située à 500 mètres du cimetière, qui furent enterrés là
                            dès 1927, poussant la municipalité de Sainte Geneviève des Bois à créer un « carré russe »
                            au sein du cimetière communal. Ce dernier a été inscrit sur l'inventaire des sites
                            pittoresques du département de l'Essonne en 1979 et à l'inventaire des monuments historiques
                            en 2001. Avec plus de 5200 tombes orthodoxes où sont enterrés 11600 défunts, la nécropole
                            russe de Sainte Geneviève des Bois constitue le plus grand cimetière russe à l’étranger.
                        </p>
                        <p className="text-justify">
                            Une bonne partie de l’élite de la Russie du 20 ème siècle y est enterrée comme par exemple
                            les danseurs et chorégraphes Rudoph Noureev, Serge Lifar, Préobrajenskaya, .., les écrivains
                            et poètes dont le prix Nobel de littérature Ivan Bounine, Merejkovsky, Boris Zaitsev,
                            Zinaida Gyppius, Nadejda Teffi, des peintres et sculpteurs comme Dmitri Stelletsky, Zinaida
                            Serebriakova, …, des philosophes et penseurs religieux comme les RP Serge Boulgakov, Wassili
                            Zenkovsky et Nicolas Afanassieff, Anton Kartachev, Nicolas et Wladimir Lossky, des hommes
                            d’Eglise comme le métropolite Euloge fondateur de l’Archevêché orthodoxe russe en Europe
                            occidentale, des hommes politiques comme le comte Vladimir Kokovstsov (ancien premier
                            ministre de Nicolas II), le Prince Gueorgui Lvoff (président du premier gouvernement
                            provisoire en 1917), des militaires, le cinéaste Andreï Tarkovski, ou encore le prince Felix
                            Youssoupov principal artisan de l’assassinat de Raspoutine.
                        </p>
                        <p className="text-justify">
                            L'église construite en 1939 sous l’impulsion du métropolite Euloge, est de style novgorodien
                            du XVème siècle avec un clocher lui de style pskovien. Elle est l'œuvre de l'architecte et
                            décorateur Albert Alexandrovich Benois et de son épouse Margarita Alexandrovna qui ont
                            également réalisés les fresques murales à l'intérieur de l'église et de la crypte. La
                            nécropole russe constitue un patrimoine mondialement connu.
                        </p>
                    </div>
                </div>
                <div className="-mt-28 -mb-28 sm:-mb-8 sm:-mt-8 w-100  flex content-center justify-center h-full items-center  ">
                    <img className="box-border h-72  w-center" src="/static/img/ornament1.svg" alt="ornament1" />
                </div>
                <Carousel />
            </main>
            <Footer />
        </div>
    );
}
