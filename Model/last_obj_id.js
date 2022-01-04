import {query} from '@/lib/db';

export async function getNextArticleId() {
    const nextArtcileId = await query(`
        SELECT article_id FROM last_id_for
    `);
    if (nextArtcileId.length === 1) return JSON.parse(JSON.stringify(nextArtcileId[0])).article_id + 1;

    return 0;
}

export async function updateLastArticleId(lastId) {
    const update = await query(`
        UPDATE last_id_for
        SET article_id = ?
        WHERE id = 1;
    `, [lastId]);

    return update;
}

export async function getNextEventId() {
    const nextEventId = await query(`
        SELECT event_id FROM last_id_for
    `);
    if (nextEventId.length === 1) return JSON.parse(JSON.stringify(nextEventId[0])).event_id + 1;

    return 0;
}

export async function updateLastEventId(lastId) {
    const update = await query(`
        UPDATE last_id_for
        SET event_id = ?
        WHERE id = 1;
    `, [lastId]);

    return update;
}
