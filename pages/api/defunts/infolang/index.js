import {getDefuntInfoLangByDefuntId, createDefuntInfoLang, updateDefuntInfoLang} from '@/Model/defunts_info_lang';

export default async function handler(req, res) {
    const {id} = req.query;
    const {defuntId, nom, nomJFille, prenom, patronyme, villeNaissance, paysNaissance, lieuDeces, bio, lang} = req.body;
    try {
        if (req.method === 'GET') {
            if (!id) {
                return res.status(400).json({message: '`id` required'});
            }
            return res.json(await getDefuntInfoLangByDefuntId(id));
        }
        if (req.method === 'POST') {
            if (req.body?.length > 0) {
                req.body.map(infoLang => {
                    createDefuntInfoLang(infoLang);
                });
            }
            return res.json({message: 'OK'});
        }
        if (req.method === 'PUT') {
            console.log('update infoLang');
            var resultRu = {};
            var resultEn = {};
            if (req.body['ru']) {
                if (req.body['ru']?.id) {
                    resultRu = await updateDefuntInfoLang(req.body['ru']);
                } else if (req.body['ru']?.defunt_id) {
                    resultRu = await createDefuntInfoLang(req.body['ru']);
                }
            }
            if (req.body['en']) {
                if (req.body['en']?.id) {
                    resultEn = await updateDefuntInfoLang(req.body['en']);
                } else if (req.body['en']?.defunt_id) {
                    resultEn = await createDefuntInfoLang(req.body['en']);
                }
            }
            return res.json({'en': resultEn, 'ru': resultRu});
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
