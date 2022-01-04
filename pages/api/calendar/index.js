import Calendar_event, {createEvent, updateEvent} from '@/Model/calandar_celebration';
import {updateLastEventId} from '@/Model/last_obj_id';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const results = await Calendar_event.getCalendarEvents();

            return res.json(results);
        } else if (req.method === 'POST') {
            try {
                let lastEventId;
                req.body.map(async event => {
                    const result = await createEvent(event);
                    lastEventId = event.event_id;
                });
                if (lastEventId) await updateLastEventId(lastEventId);
                res.status(200).json({message: 'article save'});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        } else if (req.method === 'PUT') {
            try {
                req.body.map(event => {
                    const result = updateEvent(event);
                });
                res.status(200).json({message: 'article update'});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }  else {
            return res.status(400).json({message: 'Method not allow'});
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
