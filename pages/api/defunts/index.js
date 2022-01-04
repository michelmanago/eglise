import {getDefunts} from '@/Model/defunts'

export default async function handler(req, res) {
    const { celebrite, tombe, categorie, titre, nom, nomJFille, prenom, patronyme, profession, dateNaissance, villeNaissance, paysNaissance, dateDeces, lieuDeces, bio, validated } = req.body
    try {
        if (req.method === 'GET') {
            // Process a GET request
            const { limit, offset } = req.query
            const results = await getDefunts(limit, offset);

            return res.json(results);
        } else {
            return res.status(400).json({ message: 'Method not allow' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}