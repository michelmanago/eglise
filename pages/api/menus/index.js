//import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req, res) {
    const { name, language, string, page } = req.body
    try {
        if (req.method === 'POST') {
            // Process a POST request
            if (!name || !language || !string || !page) {
                return res
                    .status(400)
                    .json({ message: '`name`, `language`, `string` and `page` are both required' })
            }

            const results = await query(
                `
                INSERT INTO menus (name, language, string, page)
                VALUES (?, ?, ?, ?)
                `,
                [name, language, string, page]
            )

            return res.json(results)
        } else {
            const results = await query(`
                SELECT * FROM menus
                ORDER BY id DESC
            `)

            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}