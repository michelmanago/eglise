//import { NextApiHandler } from 'next'
import {query} from '@/lib/db';
import {authenticated} from '@/lib/authorize';
import {updateDefunt} from '@/Model/defunts';

export default authenticated(async function handler(req, res) {
    const {id} = req.query;
    try {
        if (!id) {
            return res.status(400).json({message: '`id` required'});
        }
        if (req.method === 'PUT') {
            // Process a POST request
            const results = await updateDefunt(req.body);

            return res.json(results);
        } else if (req.method === 'DELETE') {
            const results = await query(
                `
                DELETE FROM defunts
                WHERE id = ?
            `,
                id,
            );
            res.json(results);
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});
