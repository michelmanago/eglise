import {query} from '@/lib/db';
import {searchDefunts} from '@/Model/defunts';

export default async function handler(req, res) {
    //const { search } = req.body
    const {q, searchProp} = req.query;
    try {
        if (req.method === 'GET') {
            if (!q) {
                return res.status(400).json({message: '`query` are required'});
            }

            const searchQuery = `${q}%`;
            if (searchProp) {
                const resultsNom = await query(
                    `
                    SELECT DISTINCT ${searchProp} FROM defunts
                    WHERE ${searchProp} LIKE ?
                    LIMIT 10
                    `,
                    searchQuery,
                );
                return res.json(resultsNom);          
            }

            const resultsNom = await query(
                `
                SELECT id, prenom, nom, nomJFille, patronyme FROM defunts
                WHERE nom LIKE ?
                LIMIT 10
                `,
                searchQuery,
            );
            const resultsNomJFille = await query(
                `
                SELECT id, prenom, nom, nomJFille, patronyme FROM defunts
                WHERE nomJFille LIKE ?
                LIMIT 10
                `,
                searchQuery,
            );

            const results = resultsNom.concat(resultsNomJFille);

            return res.json(results);
        } else if (req.method === 'POST') {

            const results = await searchDefunts(req.body);

            return res.json(results);
        } else {
            return res.status(400).json({message: 'wrong http method'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
