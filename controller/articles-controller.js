import ArticleModel from '@/Model/articles-model';
import {updateMediaByUrl} from '@/Model/media_lib';

export async function createArticle(article) {
    const resCreate = await ArticleModel.createArticle(article);
    if (article.image) {
        const resUpdate = await updateMediaByUrl(article.image, article.article_id);
    }
    return resCreate;
}

export async function deleteArticle(article) {
    const resDelete = await ArticleModel.deleteArticle(article);
    if (article.image) {
        const resUpdate = await updateMediaByUrl(article.image, null);
    }
    return resDelete;
}