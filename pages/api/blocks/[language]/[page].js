import { query } from '../../../../lib/db'


export default async function handler(req, res) {
        const { language, page } = req.query 
	    try {
        if (req.method === 'POST') {
            // Process a POST request
            if (!page || !language) {
                return res
                    .status(400)
                    .json({ message: '`page`, and `language` are required' })
            }

            const results = await query(
                `
                INSERT INTO pagecontent (page, language, blockid, blockcontent)
                VALUES (?, ?, ?, ?)
                `,
                [page, language, blockid, blockcontent]
            )

            return res.json(results)
        } else {
            const results = await query(`
                SELECT * FROM pagecontent
                WHERE page = ? AND language = ?
                ORDER BY blockid
            `,[page, language])


            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}