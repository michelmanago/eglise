import {getUsers} from '@/Model/users'

export default async function handler(req, res) {
    try {
        if (req.method === 'GET')  {
            const users  = await getUsers();
            return res.json(users);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}