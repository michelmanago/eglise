//import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

export default async function handler(req, res) {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (req.method === 'PUT') {
            // Process a POST request
            const { name, language, string, page } = req.body
            const results = await query(
                `UPDATE menus
                SET name = ?, 
                    language = ?,
                    string = ?,
                    page = ?
                WHERE id = ?`,
                [name, language, string, page, id]
            )

            return res.json(results)
        } else if (req.method === 'DELETE') {
            const results = await query(
                `
                DELETE FROM menus
                WHERE id = ?
            `,
                id
            )
            res.json(results)
        } else {
            const results = await query(`
                SELECT * FROM menus
                WHERE id = ?
                ORDER BY id DESC
            `, id)

            return res.json(results[0])
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}