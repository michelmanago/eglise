import {getMediaLib} from '@/Model/media_lib';

export default async function handler(req, res) {
    //const {id} = req.query;
    try {
        const results = await getMediaLib();
        return res.json(results);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
