//import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

export default async function handler(req, res) {
    const { email } = req.query
    try {
        if (!email) {
            return res.status(400).json({ message: '`email` required' })
        }
        if (req.method === 'GET') {
            const results = await query(`
                SELECT * FROM user
                WHERE email = ?
            `, email)
            return res.json({'find': (results.length > 0)})
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}