import {query} from '@/lib/db';

//CREATE TABLE `defunts` (
//    `id` int(11) NOT NULL AUTO_INCREMENT,
//    `celebrite` tinyint(1) DEFAULT '0',
//    `tombe` int(11) NOT NULL,
//    `categorie` varchar(45) DEFAULT NULL,
//    `titre` varchar(45) DEFAULT NULL,
//    `nom` varchar(45) NOT NULL,
//    `nomJFille` varchar(45) DEFAULT NULL,
//    `prenom` varchar(45) DEFAULT NULL,
//    `patronyme` varchar(45) DEFAULT NULL,
//    `pseudonyme` varchar(100) DEFAULT NULL,
//    `profession` varchar(45) DEFAULT NULL,
//    `dateNaissance` date DEFAULT NULL,
//    `villeNaissance` varchar(45) DEFAULT NULL,
//    `paysNaissance` varchar(45) DEFAULT NULL,
//    `dateDeces` date DEFAULT NULL,
//    `lieuDeces` varchar(45) DEFAULT NULL,
//    `bio` longtext,
//    `carousel` tinyint(1) DEFAULT '0',
//    `validated` tinyint(1) DEFAULT '0',
//    PRIMARY KEY (`id`),
//    KEY `Name` (`nom`,`prenom`),
//    KEY `tombe` (`tombe`)
//);

export async function getDefunts(limit, offset) {
    let setLimit = 100;
    let setOffset = 0;
    if (limit) {
        setLimit = parseInt(limit);
    }

    if (offset) {
        setOffset = parseInt(offset);
    }

    const total = await query(`
        SELECT count(*) as total FROM defunts
    `);
    const data = await query(
        `
        SELECT * FROM defunts
        ORDER BY id ASC
        LIMIT ?, ?
    `,
        [setOffset, setLimit],
    );

    const results = {
        metadata: {
            count: data.length,
            offset: setOffset,
            limit: setLimit,
            total: total[0].total,
        },
        data: data,
    };

    return JSON.parse(JSON.stringify(results));
}
export async function getDefuntsFromTombe(nTombe) {
    const results = await query(
        `
        SELECT * FROM defunts
        WHERE tombe = ?
        ORDER BY nom ASC
    `,
        nTombe,
    );

    return JSON.parse(JSON.stringify(results));
}
export async function getDefuntById(defuntId) {
    const defunt = await query(
        `
        SELECT * FROM defunts
        WHERE id = ?
        ORDER BY id DESC
    `,
        defuntId,
    );

    return JSON.parse(JSON.stringify(defunt[0]));
}
export async function createDefunt(defunt) {
    const {
        celebrite,
        tombe,
        categorie,
        titre,
        nom,
        nomJFille,
        prenom,
        patronyme,
        pseudonyme,
        profession,
        dateNaissance,
        villeNaissance,
        paysNaissance,
        dateDeces,
        lieuDeces,
        bio,
        validated,
    } = defunt;
    const results = await query(
        `
        INSERT INTO defunts (celebrite, tombe, categorie, titre, nom, nomJFille, prenom, patronyme, pseudonyme, profession, dateNaissance, villeNaissance, paysNaissance, dateDeces, lieuDeces, bio, validated)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            celebrite,
            tombe,
            categorie,
            titre,
            nom,
            nomJFille,
            prenom,
            patronyme,
            pseudonyme,
            profession,
            dateNaissance,
            villeNaissance,
            paysNaissance,
            dateDeces,
            lieuDeces,
            bio,
            validated,
        ],
    );

    return results;
}
export async function updateDefunt(defunt) {
    const {
        id,
        celebrite,
        tombe,
        categorie,
        titre,
        nom,
        nomJFille,
        prenom,
        patronyme,
        pseudonyme,
        profession,
        dateNaissance,
        villeNaissance,
        paysNaissance,
        dateDeces,
        lieuDeces,
        bio,
        validated,
        carousel,
    } = defunt;
    const results = await query(
        `UPDATE defunts
        SET celebrite = ?, 
            tombe = ?,
            categorie = ?,
            titre = ?,
            nom = ?,
            nomJFille = ?,
            prenom = ?,
            patronyme = ?,
            pseudonyme = ?,
            profession = ?,
            dateNaissance = ?,
            villeNaissance = ?,
            paysNaissance = ?,
            dateDeces = ?,
            lieuDeces = ?,
            bio = ?,
            validated = ?,
            carousel = ?
        WHERE id = ?`,
        [
            celebrite,
            tombe,
            categorie,
            titre,
            nom,
            nomJFille,
            prenom,
            patronyme,
            pseudonyme,
            profession,
            dateNaissance,
            villeNaissance,
            paysNaissance,
            dateDeces,
            lieuDeces,
            bio,
            validated,
            carousel,
            id,
        ],
    );

    return results;
}

export async function searchDefunts(queryObj) {
    var index = -1;
    const entryArray = Object.entries(queryObj).filter(([key, value]) => value != '');
    var queryString = '';
    var queryArray = [];
    for (const [key, value] of entryArray) {
        index++;
        queryString += `${key} = ?`;
        if (index != entryArray.length - 1) queryString += ' and ';
        queryArray.push(value);
    }

    const results = await query(
        `
        SELECT id, nom, nomJFille, prenom, patronyme, categorie, dateNaissance, dateDeces, tombe, dynPageId  FROM defunts
        WHERE ${queryString}
    `,
        queryArray,
    );

    return JSON.parse(JSON.stringify(results));
}
