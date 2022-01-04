import { query } from '@/lib/db'

export default async function handler(req, res) {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (req.method === 'GET') {
            return res.json(await getPjByDefunt(id));
        } else {
            return res.status(400).json({ message: 'Method not allow' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
export async function getPjByDefunt(id) {
    const defuntPieceJointes = await query(`
        SELECT * FROM pieceJointeDefunts
        WHERE id_defunts = ?
    `, id)

    return JSON.parse(JSON.stringify(defuntPieceJointes));
}