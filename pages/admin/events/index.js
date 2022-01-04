import Calendar_event from '@/Model/calandar_celebration';

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {getProperDate} from '@/lib/date';

import Cookie from 'cookie';
import authorize from '@/lib/authorize';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Events({events}) {
    const router = useRouter();
    const {locale} = router;
    const [eventList, setEventList] = useState(events);
    return (
        <div className='max-w-screen-xl bg-pwhite sm:mx-auto'>
            <Header currentLanguage={locale} currentPage={''} />
            <main>
                <div className="flex mt-1 place-content-center">
                    <Link href="/admin/events/create">
                        <a>
                            <button className="w-48 py-3 bg-pgold">Créer</button>
                        </a>
                    </Link>
                </div>
                <div>Events</div>
                <div className="flex flex-wrap my-2">
                    {eventList?.map(eventItem => (
                        <div className="w-1/3 px-2" key={eventItem.id}>
                            <Link href={`/admin/events/${eventItem.event_id}`}>
                                <a>
                                    <h3 className="inline-block">{eventItem.title}</h3>
                                    <div className="inline-block mx-2 text-sm">{getProperDate(eventItem.date)}</div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
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

    //const events = []
    const events = await Calendar_event.getCalendarEventsByLang('fr');
    //console.log(events);
    return {
        props: {events: events},
    };
}
