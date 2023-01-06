import {query} from '@/lib/db';

export default async function handler(req, res) {
    const {hash} = req.query;

    try {
        if (!hash) {
            return res.status(400).json({message: '`hash` required'});
        }
        if (req.method === 'GET') {
            const users = await query(`SELECT * FROM user WHERE hash LIKE ?`, [hash]);

            console.log(hash, users);
            if (users.length === 0) return res.json([]);
            return res.json(users[0]);
        } else {
            res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
