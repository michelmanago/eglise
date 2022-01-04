import {query} from '@/lib/db';

var ArticleModel;

export const getArticles = async (limit = 0) => {
    const results = await query(
        `
        SELECT * FROM articles
        ORDER BY date DESC
        ${limit === 0 ? '' : 'LIMIT 0, ?'};
    `,
        [limit],
    );
    return JSON.parse(JSON.stringify(results));
};

export const getArticleById = async id => {
    const results = await query(
        `
        SELECT * FROM articles
        WHERE id = ?;
    `,
        [id],
    );
    return JSON.parse(JSON.stringify(results[0]));
};

export const getArticleByArticleId = async article_id => {
    const results = await query(
        `
        SELECT * FROM articles
        WHERE article_id = ?;
    `,
        [article_id],
    );
    return JSON.parse(JSON.stringify(results));
};

export const getArticleByArticleIdByLang = async (article_id, locale) => {
    const results = await query(
        `
        SELECT * FROM articles
        WHERE article_id = ? and lang = ?;
    `,
        [article_id, locale],
    );
    return JSON.parse(JSON.stringify(results[0]));
};

export const getArticlesByLang = async (lang, limit = 0) => {
    const results = await query(
        `
            SELECT * FROM articles
            WHERE lang = ?
            ORDER BY date DESC
            ${limit === 0 ? '' : 'LIMIT 0, ?'};
        `,
        [lang, limit],
    );

    return JSON.parse(JSON.stringify(results));
};

export const createArticle = async article => {
    const {article_id, title, content, lang, date, image} = article;
    const results = await query(
        `
        INSERT INTO articles (article_id, title, content, lang, date, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
        [article_id, title, content, lang, date, image],
    );

    return results;
};

export const updateArticle = async article => {
    const {article_id, title, content, lang, date, image, id} = article;
    const results = await query(
        `
        UPDATE articles
        SET article_id = ?, title = ?, content = ?, lang = ?, date = ?, image = ?
        WHERE id = ?;
    `,
        [article_id, title, content, lang, date, image, id],
    );

    return results;
};

export const deleteArticle = async article => {
    const {id} = article;
    const results = await query(
        `
        DELETE FROM articles
        WHERE id = ?;
        `,
        [id],
    );

    return results;
};
export default ArticleModel = {
    getArticles: getArticles,
    getArticleById: getArticleById,
    getArticlesByLang: getArticlesByLang,
    createArticle: createArticle,
    deleteArticle: deleteArticle,
};
