import {query} from '@/lib/db';
import fs from 'fs';
import {searchTombes} from '@/Model/tombes';

export default async function handler(req, res) {
    const {carre, limit, offset, fileData, query} = req.query;

    const tmpOffset = offset != undefined ? parseInt(offset) : 0;
    const tmpLimit = limit != undefined ? parseInt(limit) : 100;

    try {
        if (req.method === 'GET') {
            if (query) {
                const results = await searchTombes(query);
                return res.json(results);
            }
        } else if (req.method === 'POST') {
            const carreList = await getCarres();
            carreList.forEach(async carre => {
                console.log('carre: ', carre.carre);
                const tombes = await getAllTombesInCarre(carre.carre);
                let contentFile = {
                    carre: carre.carre,
                    hasMore: false,
                    data: tombes,
                };
                fs.writeFile(`public/static/carre/${carre.carre}.json`, JSON.stringify(contentFile), function (err) {
                    if (err) throw err;
                    console.log(`File for carre ${carre.carre} create/update.`);
                });
            });
            return res.status(200).json({message: `File for carres create/update.`});
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export async function getDefuntsFromTombe(nTombe) {
    const results = await query(
        `
        SELECT id, nom, prenom, nomJFille FROM defunts
        WHERE tombe = ?
        ORDER BY id ASC;
    `,
        nTombe,
    );

    return JSON.parse(JSON.stringify(results));
}

/*export async function getTombesInCarre(carre, limit = 100, offset = 0) {
    const results = await query(
        `
        SELECT * FROM tombes
        WHERE carre = ?
        LIMIT ?, ?;
    `,
        [carre, offset, limit],
    );
    var tombes = [...results];
    for (let index = 0; index < tombes.length; index++) {
        const tombe = tombes[index];
        tombe.defunts = await getDefuntsFromTombe(tombe.id);
    }

    return JSON.parse(JSON.stringify(tombes));
}*/

/*async function getNbTombesInCarre(carre) {
    const results = await query(
        `
        SELECT * FROM tombes
        WHERE carre = ?;
        `,
        [carre],
    );

    return results.length;
}*/

async function getAllTombesInCarre(carre) {
    const results = await query(
        `
        SELECT * FROM tombes
        WHERE carre = ?;
        `,
        [carre],
    );
    var tombes = [...results];
    for (let index = 0; index < tombes.length; index++) {
        const tombe = tombes[index];
        tombe.defunts = await getDefuntsFromTombe(tombe.id);
    }

    return results;
}

async function getCarres() {
    const results = await query(
        `
        SELECT DISTINCT carre
        FROM tombes;
        `,
    );
    return results;
}
