import { verify } from 'jsonwebtoken';

export default async function authorize(res, cookie, secret) {
    verify(cookie?.auth, secret, async function (err, decoded) {
        if (!err && decoded) {
            return;
        }
        res.statusCode = 302;
        res.setHeader('Location', `/login`);
    });
}

export function authorizeSync(res, cookie, secret) {
    try {
        const payload = verify(cookie?.auth, secret);

        return true;
    } catch(err) {
        return false;
    }
    
}

export function isTombContributor(tombe, tombes) {
    if (!tombes) return false
    var tombeArray = tombes.split(',');

    const isFind = tombeArray.find(t => parseInt(t) === tombe)

    return isFind
}

export const authenticated = (fn) => async (req, res) => {
    const secret = process.env.LOGIN_SECRET;
    verify(req.cookies.auth, secret, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }

        res.status(401).json({ message: 'Sorry you are not authenticated' });
    });
};