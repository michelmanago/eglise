export default function SelectCat({categorie, setCategorie}) {
    return (
        <select
            id="categorie"
            className="p-2 m-1 border border-gray-500 w-60"
            value={categorie}
            onChange={e => setCategorie(e.target.value)}
        >
            <option value="">-- Catégorie --</option>
            <option value="architecture">Architecture</option>
            <option value="aristrocratie">Aristocratie</option>
            <option value="célébrité-diverses">Célébrité diverses</option>
            <option value="chauffeurs-de-taxi">Chauffeurs de taxi</option>
            <option value="clergé">Clergé</option>
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
    );
}
