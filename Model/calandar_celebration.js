import {query} from '@/lib/db';

var Calendar_event;

export async function getCalendarEvents() {
    const results = await query(`
        SELECT * FROM calendar_celebration;
    `);
    //console.log(results);
    return JSON.parse(JSON.stringify(results));
}

export async function getCalendarEventById(id) {
    const results = await query(
        `
        SELECT * FROM calendar_celebration
        WHERE id = ?;
    `,
        [id],
    );
    return results;
}

export async function getCalendarEventByEventId(eventId) {
    const results = await query(
        `
        SELECT * FROM calendar_celebration
        WHERE event_id = ?;
    `,
        [eventId],
    );
    return JSON.parse(JSON.stringify(results));
}

export async function getCalendarEventsByLang(lang = 'fr') {
    const results = await query(
        `
        SELECT * FROM calendar_celebration
        WHERE lang = ?
        ORDER BY date DESC;
    `,
        [lang],
    );
    return JSON.parse(JSON.stringify(results));
}

export const createEvent = async event => {
    const {event_id, title, content, date, lang} = event;
    const results = await query(
        `
        INSERT INTO calendar_celebration (event_id, title, date, content, lang)
        VALUES (?, ?, ?, ?, ?)
    `,
        [event_id, title, date, content, lang],
    );

    return results;
};

export const updateEvent = async event => {
    const {event_id, title, content, date, lang, id} = event;
    console.log(event);
    const results = await query(
        `
        UPDATE calendar_celebration
        SET event_id = ?, title = ?, date = ?, content = ?, lang = ?
        WHERE id = ?;
    `,
        [event_id, title, date, content, lang, id],
    );

    return results;
};

export default Calendar_event = {
    getCalendarEvents: getCalendarEvents,
    getCalendarEventById: getCalendarEventById,
    getCalendarEventsByLang: getCalendarEventsByLang,
};
