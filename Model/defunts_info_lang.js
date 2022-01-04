import {query} from '@/lib/db';

/*
CREATE TABLE `defunts_info_lang` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `defunt_id` int(11) NOT NULL,
    `nom` varchar(100) DEFAULT NULL,
    `nomJFille` varchar(100) DEFAULT NULL,
    `prenom` varchar(45) DEFAULT NULL,
    `patronyme` varchar(45) DEFAULT NULL,
    `pseudonyme` varchar(100) DEFAULT NULL,
    `villeNaissance` varchar(100) DEFAULT NULL,
    `paysNaissance` varchar(45) DEFAULT NULL,
    `lieuDeces` varchar(100) DEFAULT NULL,
    `bio` longtext,
    `lang` varchar(2) NOT NULL,
    PRIMARY KEY (`id`)
  );
*/

export async function getDefuntInfoLangById(id) {
    const defuntInfo = await query(
        `
        SELECT * FROM defunts_info_lang
        WHERE id = ?
        ORDER BY id DESC
    `,
        [id],
    );
    if (defuntInfo.length > 0)
        return defuntInfo[0];
    else return defuntInfo;
}

export async function getDefuntInfoLangByDefuntId(defuntId) {
    const defuntInfo = await query(
        `
        SELECT * FROM defunts_info_lang
        WHERE defunt_id = ?
        ORDER BY id DESC
    `,
        [defuntId],
    );
    return defuntInfo;
}

export async function getDefuntInfoLangByIdByLang(defuntId, lang) {
    const defuntInfo = await query(
        `
        SELECT * FROM defunts_info_lang
        WHERE defunt_id = ? AND lang = ?
        ORDER BY id DESC
    `,
        [defuntId, lang],
    );
    return defuntInfo;
}

export async function createDefuntInfoLang(defuntInfoLang) {
    const {
        defunt_id,
        nom,
        nomJFille,
        prenom,
        titre,
        patronyme,
        pseudonyme,
        villeNaissance,
        paysNaissance,
        lieuDeces,
        bio,
        lang,
    } = defuntInfoLang;
    try {
        const create = await query(
            `
            INSERT INTO defunts_info_lang (defunt_id, nom, nomJFille, prenom, titre, patronyme, pseudonyme, villeNaissance, paysNaissance, lieuDeces, bio, lang)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [defunt_id, nom, nomJFille, prenom, titre, patronyme, pseudonyme, villeNaissance, paysNaissance, lieuDeces, bio, lang],
        );
        console.log('search => ', create.insertId, lang);
        const info = await getDefuntInfoLangById(create.insertId);
        return info;
    } catch (error) {
        return {message: error.message};
    }
}

export async function updateDefuntInfoLang(defuntInfoLang) {
    const {
        id,
        defunt_id,
        nom,
        nomJFille,
        prenom,
        titre,
        patronyme,
        pseudonyme,
        villeNaissance,
        paysNaissance,
        lieuDeces,
        bio,
        lang,
    } = defuntInfoLang;
    const update = await query(
        `
        UPDATE defunts_info_lang
        SET defunt_id = ?,
        nom = ?,
        nomJFille = ?,
        prenom = ?,
        titre = ?,
        patronyme = ?,
        pseudonyme = ?,
        villeNaissance = ?,
        paysNaissance = ?,
        lieuDeces = ?,
        bio = ?,
        lang = ?
        WHERE id = ?
        `,
        [defunt_id, nom, nomJFille, prenom, titre, patronyme, pseudonyme, villeNaissance, paysNaissance, lieuDeces, bio, lang, id],
    );
    const info = await getDefuntInfoLangById(id);
    return info;
}
