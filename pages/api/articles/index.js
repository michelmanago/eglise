import ArticleModel, {updateArticle} from '@/Model/articles-model';
import {updateLastArticleId} from '@/Model/last_obj_id';
import {createArticle, deleteArticle} from '@/controller/articles-controller';

export default async function handler(req, res) {
    const {language, page, blockid, blockcontent} = req.body;
    try {
        if (req.method === 'GET') {
            const results = await ArticleModel.getArticles();

            return res.json(results);
        } else if (req.method === 'POST') {
            try {
                let lastArticleId;
                for (const article of req.body) {
                    const result = await createArticle(article);
                    lastArticleId = article.article_id;
                }
                if (lastArticleId) await updateLastArticleId(lastArticleId);
                res.status(200).json({message: 'article save'});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        } else if (req.method === 'PUT') {
            try {
                req.body.map(article => {
                    const result = updateArticle(article);
                });
                res.status(200).json({message: 'article update'});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        } else if (req.method === 'DELETE') {
            try {
                for (const article of req.body) {
                    const result = await deleteArticle(article);
                }
                res.status(200).json({message: 'article delete'});
            } catch (error) {
                res.status(500).json({message: error.message});
            }

        } else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
