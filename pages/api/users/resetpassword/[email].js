//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';
import {sendResetPasswordEmail} from '@/lib/emailSender';
import e from 'express';
import {v4 as uuidv4} from 'uuid'

export default async function handler(req, res) {
    //const { name, language, string, page } = req.body
    const {email} = req.query;

    try {
        if (!email) {
            return res.status(400).json({message: '`id` required'});
        }
        if (req.method === 'GET') {
            const users = await query(
                `
                    SELECT id, name, email, role, tombe FROM user where email like ?
                `,
                email,
            );

            const newHash = uuidv4();

            const results = await query(
                `
                UPDATE user
                SET hash = ?
                WHERE id = ?
                `,
                [newHash, users[0].id],
            );

            await sendResetPasswordEmail({toUser: users[0], hash: newHash});

            return res.json(users[0]);
        } else {
            console.log('error http method');
            res.status(405).json({message: 'Wrong HTTP method'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
