import {query} from '@/lib/db';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const {carre, limit, offset, fileData} = req.query;

    const tmpOffset = offset != undefined ? parseInt(offset) : 0;
    const tmpLimit = limit != undefined ? parseInt(limit) : 100;

    try {
        if (!carre) {
            return res.status(400).json({message: '`id` required'});
        }

        if (req.method === 'GET' && fileData) {
            const pathFile = path.join(`./public/static/carre/${carre}.json`);
            console.log('cwd: ', process.cwd());
            console.log('current directory: ', __dirname);

            const func = () => {
                return new Promise((resolve, reject) => {
                    fs.readFile(`./public/static/carre/${carre}.json`, 'utf8', function (err, data) {
                        if (err) reject({message: err.message});
                        resolve(JSON.parse(data));
                    });
                });
            };
            let results = await func();
            return res.status(200).json(results);
        } else if (req.method === 'GET') {
            var tombes = await getTombesInCarre(carre, tmpLimit, tmpOffset);

            let results = {
                hasMore: tombes.length == tmpLimit,
                total: await getNbTombesInCarre(carre),
                data: tombes,
            };

            return res.json(results);
        } else if (req.method === 'POST') {
            const tombes = await getAllTombesInCarre(carre);
            let contentFile = {
                carre: carre,
                hasMore: false,
                data: tombes,
            };
            fs.writeFile(`public/static/carre/${carre}.json`, JSON.stringify(contentFile), function (err) {
                if (err) throw err;
                console.log('Fichier créé !');
            });
            return res.status(200).json({message: `File for carre ${carre} create/update.`});
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

export async function getTombesInCarre(carre, limit = 100, offset = 0) {
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
}

async function getNbTombesInCarre(carre) {
    const results = await query(
        `
        SELECT * FROM tombes
        WHERE carre = ?;
        `,
        [carre],
    );

    return results.length;
}

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
