import {getCalendarEventByEventId} from '@/Model/calandar_celebration';

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {getProperDate} from '@/lib/date';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';
import Header from '@/components/header';
import Footer from '@/components/footer';
import EventLang from '@/components/Admin/Event/event-lang';

export default function Event({events}) {
    const router = useRouter();
    const {locale} = router;
    const [eventList, setEventList] = useState(events);
    const [langState, setLangState] = useState('FR');

    const saveEvent = async () => {
        const res = await fetch(`/api/calendar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventList),
        });
        if (res.ok) router.push('/admin/events');
    };
    const setEvent = () => {};
    const changeDate = event => {
        console.log(event.target.value);
        let newEventList = [...eventList];
        newEventList.forEach((elt, index, array) => {
            array[index].date = event.target.value;
        });
        setEventList(newEventList);
    };
    return (
        <div className="max-w-screen-xl sm:mx-auto bg-white">
            <Header currentLanguage={locale} currentPage={''} />
            <main className="mx-2">
                <div className="flex mt-1 place-content-center">
                    <button type="submit" onClick={saveEvent} className="w-48 py-3 bg-pgold">
                        Enregistrement
                    </button>
                </div>
                <input type="date" value={events[0].date ? events[0].date : ''} onChange={changeDate} />
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
                {langState === 'FR' && (
                    <EventLang event={eventList.filter(elt => elt.lang === 'fr')[0]} setEvent={setEvent} />
                )}
                {langState === 'EN' && (
                    <EventLang event={eventList.filter(elt => elt.lang === 'en')[0]} setEvent={setEvent} />
                )}
                {langState === 'RU' && (
                    <EventLang event={eventList.filter(elt => elt.lang === 'ru')[0]} setEvent={setEvent} />
                )}
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

    const {id: event_id} = context.query;

    const events = await getCalendarEventByEventId(event_id);

    return {
        props: {
            events: events,
        },
    };
}
