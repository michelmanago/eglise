//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';

export default async function handler(req, res) {
    //const { name, language, string, page } = req.body
    const {hash} = req.query;

    try {
        if (req.method === 'GET') {
            const users = await query(
                `
                    SELECT id, name, email, role, tombe, validate FROM user where hash like ?
                `,
                hash,
            );
            if (users && users[0]) {
                const results = await query(
                    `
                    UPDATE user
                    SET validate = ?,
                    hash = null
                    WHERE id = ?
                    `,
                    [1, users[0].id],
                );
            }

            //return res.json(users[0]);
            return res.redirect('/activate');
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
