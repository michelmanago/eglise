//import Calendar_event from '@/Model/calandar_celebration';

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {getProperDate, formatDate} from '@/lib/date';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';
import Header from '@/components/header';
import Footer from '@/components/footer';

import {getNextEventId} from '@/Model/last_obj_id';
import EventLang from '@/components/Admin/Event/event-lang';

export default function Event({nextEventId}) {
    const router = useRouter();
    const {locale} = router;
    const [langState, setLangState] = useState('FR');
    const [events, setEvents] = useState(() => [
        {title: '', date: formatDate(new Date()), content: '', lang: 'fr', event_id: nextEventId, tmpId: 0},
        {title: '', date: formatDate(new Date()), content: '', lang: 'en', event_id: nextEventId, tmpId: 1},
        {title: '', date: formatDate(new Date()), content: '', lang: 'ru', event_id: nextEventId, tmpId: 2},
    ]);

    const setEvent = event => {
        let newEventList = [...events];
        newEventList.forEach((elt, index, array) => {
            if (event.tmpId === elt.tmpId) array[index] = event;
        });
        setEvents(newEventList);
    };
    const changeDate = event => {
        console.log(event.target.value);
        let newEventList = [...events];
        newEventList.forEach((elt, index, array) => {
            array[index].date = event.target.value;
        });
        setEvents(newEventList);
    };

    const saveEvent = async () => {
        const res = await fetch(`/api/calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(events),
        });
        //if (res.ok) router.push('/admin/events');
        console.log(res.ok);
    }
    return (
        <div className="max-w-screen-xl sm:mx-auto bg-pwhite">
            <Header currentLanguage={locale} currentPage={''} />
            <main className='mx-2'>
                <h1>Créer un event</h1>
                <div className="flex mt-1 place-content-center">
                    <button type="submit" onClick={saveEvent} className="w-48 py-3 bg-pgold">
                        Enregistrement
                    </button>
                </div>
                <input type='date' value={events[0].date} onChange={changeDate} />
                <div className="flex flex-row my-1">
                    <div
                        className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                            langState === 'FR' ? 'bg-gray-400' : ''
                        }`}
                        onClick={e => setLangState('FR')}
                    >
                        FR
                    </div>
                    <div
                        className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                            langState === 'EN' ? 'bg-gray-400' : ''
                        }`}
                        onClick={e => setLangState('EN')}
                    >
                        EN
                    </div>
                    <div
                        className={`px-2 py-1 mx-1 border border-black cursor-pointer ${
                            langState === 'RU' ? 'bg-gray-400' : ''
                        }`}
                        onClick={e => setLangState('RU')}
                    >
                        RU
                    </div>
                </div>
                {langState === 'FR' && <EventLang event={events[0]} setEvent={setEvent} />}
                {langState === 'EN' && <EventLang event={events[1]} setEvent={setEvent} />}
                {langState === 'RU' && <EventLang event={events[2]} setEvent={setEvent} />}
            </main>

            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req, res, query, asPath, pathname} = context;
    const cookie = req?.headers.cookie;

    const secret = process.env.LOGIN_SECRET;
    if (cookie) {
        const parsedCookies = Cookie.parse(cookie);
        authorize(res, parsedCookies, secret);
    } else {
        authorize(res, '', secret);
    }

    const nextEventId = await getNextEventId();
    return {props: {
        nextEventId: nextEventId
    }};
}
