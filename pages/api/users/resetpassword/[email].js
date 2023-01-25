import {sendResetPasswordEmail} from '@/lib/emailSender';
import {getUserByEmail, updateUserHash} from '@/Model/users';
import {v4 as uuidv4} from 'uuid';

export default async function handler(req, res) {
    //const { name, language, string, page } = req.body
    const {email} = req.query;

    try {
        if (!email) {
            return res.status(400).json({message: '`id` required'});
        }
        if (req.method === 'GET') {
            const user = await getUserByEmail(email);
            if (!user) return res.status(500).json({message: 'user not found'});

            const newHash = uuidv4();

            const res = await updateUserHash(user.id, newHash);
            await sendResetPasswordEmail({toUser: user, hash: newHash});

            return res.json(user);
        } else {
            console.log('error http method');
            res.status(405).json({message: 'Wrong HTTP method'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
