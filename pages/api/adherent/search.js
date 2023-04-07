// import {getSession} from 'next-auth/react';
import {searchPaging} from '../../../dao/adherent';

export default async function Handler(req, res) {
    // const session = await getSession({req});
    // if (!session) res.status(401).json({message: 'You need to be authenticate to use this api route'});
    const params = req.body;
    if (req.method === 'POST') {
        let adherentSearch = await searchPaging(params);
        res.status(200).json(adherentSearch);
    } else {
        res.status(405).json({message: 'Method Not Allowed'});
    }
}
