//import { NextApiHandler } from 'next'
import { query } from '@/lib/db'
import {getDefuntInfoLangByDefuntId} from '@/Model/defunts_info_lang'

export default async function handler(req, res) {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (req.method === 'GET') {
            return res.json(await getDefunt(id));
        } else {
            return res.status(400).json({ message: 'Method not allow' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export async function getDefunt(id) {
    const defunt = await query(`
        SELECT * FROM defunts
        WHERE id = ?
        ORDER BY id DESC
    `, id)

    const defuntPieceJointes = await query(`
        SELECT * FROM pieceJointeDefunts
        WHERE id_defunts = ?
    `, id)

    const defuntInfoLangs = await getDefuntInfoLangByDefuntId(id);

    return JSON.parse(JSON.stringify({
        ...defunt[0],
        infoLangs: defuntInfoLangs,
        piecesJointes: defuntPieceJointes
    }));
}