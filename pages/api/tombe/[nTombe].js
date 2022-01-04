//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';

export default async function handler(req, res) {
    const {nTombe} = req.query;

    try {
        if (!nTombe) {
            return res.status(400).json({message: '`id` required'});
        }

        if (req.method === 'GET') {
            const tombe = await getTombe(nTombe);
            const defunts = await getDefuntsFromTombe(nTombe);

            let tombeExists = tombe && tombe.length && tombe[0] ? true : false;

            return res.json({
                tombe: tombeExists ? tombe[0] : null,
                defunts: defunts
            });
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
