import {deleteMediaLib, getMediaById, updateMediaLib} from '@/Model/media_lib';

export default async function handler(req, res) {
    const {id} = req.query;
    try {
        if (!id) {
            return res.status(400).json({message: '`id` required'});
        }
        if (req.method === 'PUT') {
            // Process a POST request
            const {article_id} = req.body;
            const results = await updateMediaLib(id, article_id);

            return res.json(results);
        } else if (req.method === 'DELETE') {
            const results = await deleteMediaLib(id);
            res.json(results);
        } else {
            const results = await getMediaById(id);
            return res.json(results);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
