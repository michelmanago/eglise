//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';
import { updatePieceJointe } from '@/Model/pieceJointe';
//import {getDefunts} from '../defunts';

export default async function handler(req, res) {
    const {id} = req.query;

    try {
        if (!id) {
            return res.status(400).json({message: '`id` required'});
        }

        if (req.method === 'GET') {
            const piecejointe = await getPieceJointeByDefunt(id);

            return res.json(piecejointe);
        } else if (req.method === 'POST') {
            const pjStatus = await updatePieceJointe(req.body)
            return res.json(pjStatus);
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

async function getPieceJointeByDefunt(id) {
    const results = await query(
        `
            SELECT * FROM pieceJointeDefunts
            WHERE id_defunts = ?;
        `,
        id,
    );

    return JSON.parse(JSON.stringify(results));
}
