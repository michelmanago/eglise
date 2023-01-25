import {activateUser, getUserByHash, updateUserHash} from '@/Model/users';

export default async function handler(req, res) {
    const {hash} = req.query;

    try {
        if (req.method === 'GET') {
            const user = await getUserByHash(hash);
            if (user) {
                const results = await activateUser(user.id);
            }

            return res.redirect('/activate');
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
