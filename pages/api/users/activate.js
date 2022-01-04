//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    //const { name, language, string, page } = req.body
    const email = 'guillaume.lengrand@gmail.com';
    const name = 'Guillaume';
    const hash = 'qsdqsdjqsdqsjd';
    try {
        if (req.method === 'GET') {
            const users = await query(
                `
                    SELECT id, name, email, role, tombe, hash FROM user where hash like ?
                `,
                results.insertId,
            );

            return res.json(results);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
