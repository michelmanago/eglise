import {getDefuntInfoLangByIdByLang} from '@/Model/defunts_info_lang';

export default async function handler(req, res) {
    const {id, lang} = req.query;
    try {
        if (!id || !lang) {
            return res.status(400).json({message: '`id` and `lang` required'});
        }
        if (req.method === 'GET') {
            return res.json(await getDefuntInfoLangByIdByLang(id, lang));
        } else {
            console.log('/api/defunts/infolang/id/lang Not Allow');
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
