//import { NextApiHandler } from 'next'
import {hash, hashSync} from 'bcryptjs';
import {query} from '../../lib/db';
import {v4 as uuidv4} from 'uuid';

import {sendConfirmationEmail} from '@/lib/emailSender';

export default async function handler(req, res) {
    const {name, email, password, role} = req.body;
    try {
        if (req.method === 'POST') {
            hash(password, 10, async function (err, hash) {
                const idHash = uuidv4(); //hashSync(name, 5);
                const results = await query(
                    `
                    INSERT INTO user (name, email, password, role, hash)
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [name, email, hash, role, idHash],
                );
                const users = await query(
                    `
                    SELECT id, name, email, role, tombe, hash FROM user where id like ?
                `,
                    results.insertId,
                );
                await sendConfirmationEmail({toUser: users[0], hash: idHash});
                return res.json(users[0]);
            });
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
