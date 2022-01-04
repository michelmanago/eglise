import {useCallback, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Header from '@/components/header';
import Footer from '@/components/footer';

import {getCalendarEventsByLang} from '@/Model/calandar_celebration';
import {getProperDate} from '@/lib/date';

export default function Calendar({events}) {
    const router = useRouter();
    const {locale} = router;
    //const [eventList, setEventList] = useState(events);

    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Cimetière russe</title>
            </Head>

            <div>
                <div className="">
                    <Header currentLanguage={locale} currentPage={'eglise'} />

                    <div className="">
                        <main className="mx-2 mt-4">
                            <div className="flex flex-wrap">
                                {events?.map(event => (
                                    <div className="flex flex-col w-1/2 px-2 border border-black" key={event.id}>
                                        <h3 className="inline-block">{event.title}</h3>
                                        <div className="mx-2 text-sm">{getProperDate(event.date)}</div>
                                        {event.content ? <div dangerouslySetInnerHTML={{__html: event.content}}></div> : null}
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const {locale} = context;
    const events = await getCalendarEventsByLang(locale);
    if (!events) {
        return {
            notFound: true,
        };
    }
    return {
        props: {events}, // will be passed to the page component as props
        revalidate: 10,
    };
}
