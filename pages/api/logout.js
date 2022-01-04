import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { query } from '../../lib/db'

export default async function handler(req, res) {
    //const { email, password } = req.body
    try {
        if (req.method === 'GET') {
            res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            }))

            res.json({message: 'cookie auth remove'});
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}