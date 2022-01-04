import {getPageBySlug} from '@/Model/page';

export default async function handler(req, res) {
    try {
        //
        if (req.method === 'GET') {
            const pageslug = req.query.pageslug;
            if (!pageslug) {
                return res.status(400).json({
                    message: 'Vous devez specifiez une pageslug.',
                });
            }
            const result = await getPageBySlug(`fr/${pageslug}`);
            return res.json(result);
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        console.log(e);

        if (e.status) {
            res.status(e.status);
        } else {
            res.status(500);
        }

        return res.json({message: e.message});
    }
}
