import {query} from '@/lib/db';

//CREATE TABLE `tombes` (
//    `id` int(11) NOT NULL,
//    `carre` varchar(45) DEFAULT NULL,
//    `x` float DEFAULT NULL,
//    `y` float DEFAULT NULL,
//    `vertical` tinyint(1) DEFAULT '0',
//    `photo` varchar(255) DEFAULT NULL,
//    PRIMARY KEY (`id`)
//);

export async function getDefuntsFromTombe(nTombe) {
    const results = await query(
        `
        SELECT * FROM defunts
        WHERE tombe = ?
        ORDER BY id ASC;
    `,
        nTombe,
    );

    return JSON.parse(JSON.stringify(results));
}

export async function getTombe(nTombe) {
    const results = await query(
        `
        SELECT * FROM tombes
        WHERE id = ?;
    `,
        nTombe,
    );
    return JSON.parse(JSON.stringify(results));
}

export async function getTombes() {
    const results = await query(
        `
        SELECT * FROM tombes;
    `,
        nTombe,
    );
    return JSON.parse(JSON.stringify(results));
}

export async function searchTombes(queryTombe) {
    const results = await query(
        `
        SELECT * from tombes
        WHERE nom like ?
        LIMIT 10;
    `,
        [`${queryTombe}%`],
    );
    return JSON.parse(JSON.stringify(results));
}
