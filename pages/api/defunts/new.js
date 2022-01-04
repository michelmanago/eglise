import { verify } from 'jsonwebtoken';
import { query } from '@/lib/db'
import { authenticated } from '@/lib/authorize'

import {createDefunt} from '@/Model/defunts'

/*export const authenticated = (fn) => async (req, res) => {
    const secret = process.env.LOGIN_SECRET;
    verify(req.cookies.auth, secret, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }

        res.status(401).json({ message: 'Sorry you are not authenticated' });
    });
};*/

export default authenticated(async function handler(req, res) {
    const { celebrite, tombe, categorie, titre, nom, nomJFille, prenom, patronyme, profession, dateNaissance, villeNaissance, paysNaissance, dateDeces, lieuDeces, bio, validated } = req.body;
    try {
        console.log("req: ", req.method)
        if (req.method === 'POST') {
            // Process a POST request
            if (!prenom || !nom) {
                return res
                    .status(400)
                    .json({ message: '`prenom` and `nom` are both required' });
            }

            const results = await createDefunt(req.body);

            return res.json(results);
        } else {
            return res.status(400).json({ message: 'Method not allow' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});