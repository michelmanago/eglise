import {query} from '@/lib/db';

export async function getMediaLib() {
    const results = await query(`
        SELECT * FROM media_lib;
    `);

    return JSON.parse(JSON.stringify(results));
}

export async function getMediaById(mediaId) {
    const results = await query(
        `
        SELECT * FROM media_lib
        WHERE id = ?
        LIMIT 1;
        `,
        [mediaId],
    );
    return JSON.parse(JSON.stringify(results[0]));
}

export async function updateMediaByUrl(url, articleId) {
    const results = await query(
        `
        UPDATE media_lib
        SET article_id = ?
        WHERE url = ?;
        `,
        [articleId, url],
    );
    return JSON.parse(JSON.stringify(results));    
}

export async function updateMediaLib(mediaId, articleId) {
    const results = await query(
        `
        UPDATE media_lib
        SET article_id = ?
        WHERE id = ?;
        `,
        [articleId, mediaId],
    );
    return JSON.parse(JSON.stringify(results));
}

export async function deleteMediaLib(mediaId) {
    const results = await query(
        `
        DELETE FROM media_lib
        WHERE id = ?;
        `,
        [mediaId],
    );

    return JSON.parse(JSON.stringify(results));
}
