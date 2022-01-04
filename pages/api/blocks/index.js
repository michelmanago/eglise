import {query} from '@/lib/db';

export default async function handler(req, res) {
    const {language, page, blockid, blockcontent} = req.body;
    try {
        if (req.method === 'POST') {
            // Process a POST request
            if (!page || !language) {
                return res.status(400).json({message: '`page`, and `language` are required'});
            }

            const results = await query(
                `
                INSERT INTO pagecontent (page, language, blockid, blockcontent)
                VALUES (?, ?, ?, ?)
                `,
                [page, language, blockid, blockcontent],
            );

            return res.json(results);
        } else if (req.method === 'GET') {
            const results = await query(
                `
                    SELECT * FROM pagecontent
                `,
            );

            return res.json(results);
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
