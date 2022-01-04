//import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

export default async function handler(req, res) {
    const { name, language, string, page } = req.body
    try {
        if (req.method === 'GET')  {
            const results = await query(`
                SELECT * FROM pieceJointeDefunts;
            `)

            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}