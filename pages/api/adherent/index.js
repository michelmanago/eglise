import {createAdherent, updateAdherent} from 'dao/adherent';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let adherent = req.body;
        try {
            const res = await createAdherent(adherent);
        } catch (error) {
            console.log({error});
        }

        return res.json({message: 'adherent create'});
    } else if (req.method === 'PUT') {
        let adherent = req.body;
        try {
            const res = await updateAdherent(adherent);
        } catch (error) {
            console.log({error});
        }
        return res.json({message: 'adherent update'});
    } else {
        return res.status(400).json({message: 'Method not allow'});
    }
}
