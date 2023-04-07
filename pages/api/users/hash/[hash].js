import {getUserByHash} from '@/Model/users';

export default async function handler(req, res) {
    const {hash} = req.query;

    try {
        if (!hash) {
            return res.status(400).json({message: '`hash` required'});
        }
        if (req.method === 'GET') {
            const user = await getUserByHash(hash);
            return res.json(user);
        } else {
            res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
