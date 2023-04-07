import {hash, hashSync} from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

import {sendConfirmationEmail} from '@/lib/emailSender';
import {createUser} from '@/Model/users';

export default async function handler(req, res) {
    const {name, email, password, role} = req.body;
    try {
        if (req.method === 'POST') {
            hash(password, 10, async function (err, hash) {
                const idHash = uuidv4(); //hashSync(name, 5);
                const user = await createUser({name, email, hash, role, idHash});
                await sendConfirmationEmail({toUser: user, hash: idHash});
                return res.json(user);
            });
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
