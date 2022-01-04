import ArticleModel from '@/Model/articles-model';

export default async function handler(req, res) {
    const {lang} = req.query;
    try {
        if (req.method === 'GET') {
            const results = await ArticleModel.getArticlesByLang(lang);

            return res.json(results);
        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
