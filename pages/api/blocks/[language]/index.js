import { query } from '@/lib/db'


export default async function handler(req, res) {
    // id of the block
    const id = req.query.language
    try {
        if (req.method === 'PUT') {
            // Process a POST request
            const { language, page, blockid, blockcontent} = req.body
            if (!language) {
                return res
                    .status(400)
                    .json({ message: '`language` are required' })
            }

            const results = await query(`
                UPDATE pagecontent
                SET page = ?, 
                    language = ?,
                    blockid = ?,
                    blockcontent = ?
                WHERE id = ?
                `, [page, language, blockid, blockcontent, id]
            )

            return res.json(results)
        } else if (req.method === 'GET') {
            const results = await query(`
                SELECT * FROM pagecontent
                WHERE id = ?
                ORDER BY blockid
            `, [id])


            return res.json(results[0])
        } else {
            return res.status(400).json({ message: 'Method not allow' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}