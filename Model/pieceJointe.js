import {query} from '@/lib/db';

//CREATE TABLE `pieceJointeDefunts` (
//    `id` int(11) NOT NULL AUTO_INCREMENT,
//    `id_defunts` int(11) NOT NULL,
//    `categorie` varchar(45) NOT NULL,
//    `url` varchar(255) NOT NULL,
//    `legende` varchar(45) DEFAULT NULL,
//    `carousel` tinyint(1) DEFAULT '0',
//    PRIMARY KEY (`id`)
//);

export async function getPieceJointeByDefunt(defuntId) {
    const results = await query(
        `
            SELECT * FROM pieceJointeDefunts
            WHERE id_defunts = ?;
        `,
        defuntId,
    );

    return JSON.parse(JSON.stringify(results));
}

export async function updatePieceJointe(pj) {
    const {id, id_defunts, categorie, url, legende, carousel} = pj;
    const results = await query(
        `
            UPDATE pieceJointeDefunts
            SET legende = ?,
            carousel = ?
            WHERE id = ?;
        `, [legende, carousel, id]
    )

    return JSON.parse(JSON.stringify(results));
}