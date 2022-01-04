//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';
//import {getDefunts} from '../defunts';

export default async function handler(req, res) {
    const {type} = req.query;

    try {
        if (!type) {
            return res.status(400).json({message: '`type` required'});
        }

        if (req.method === 'GET') {
            const piecejointe = await getPieceJointeByType(type);

            return res.json(piecejointe);
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

async function getPieceJointeByType(type) {
    const results = await query(
        `
            SELECT * FROM pieceJointeDefunts
            WHERE categorie = ?;
        `,
        type,
    );

    return JSON.parse(JSON.stringify(results));
}
