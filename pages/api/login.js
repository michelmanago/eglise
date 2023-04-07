import {getUserByEmail} from '@/Model/users';
import {compare} from 'bcryptjs';
import cookie from 'cookie';
import {sign} from 'jsonwebtoken';

export default async function handler(req, res) {
    const {email, password} = req.body;
    try {
        if (req.method === 'POST') {
            const user = await getUserByEmail(email);
            if (user.validate === 0) {
                return res.status(401).json({message: 'Compte not activate'});
            }
            compare(password, user.password, function (err, result) {
                if (!err && result) {
                    const claims = {sub: user.id, myPersonEmail: user.email};
                    const jwt = sign(claims, process.env.LOGIN_SECRET, {expiresIn: '24h'});

                    res.setHeader(
                        'Set-Cookie',
                        cookie.serialize('auth', jwt, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'strict',
                            maxAge: 3600 * 24,
                            path: '/',
                        }),
                    );

                    const userSend = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        tombe: user.tombe,
                    };

                    return res.json(userSend);
                } else {
                    return res.status(401).json({message: 'Error with credential'});
                }
            });
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
