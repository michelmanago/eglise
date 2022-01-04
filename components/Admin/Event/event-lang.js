import React, {useEffect, useState} from 'react';
import {getProperDate} from '@/lib/date';
import CustomEditor from '@/components/Slate/customEditor';

export default function EventLang({event, setEvent}) {
    const [title, setTitle] = useState(event.title);
    const [content, setContent] = useState(event.content);

    useEffect(() => {
        let newEvent = {...event};
        let change = false;
        if (event.title != title) {
            newEvent.title = title;
            change = true;
        }
        if (event.content != content) {
            newEvent.content = content;
            change = true;
        }

        if (change) setEvent(newEvent);
    }, [title, content]);

    return (
        <div className="mx-2">
            <div className="text-sm">{getProperDate(event.date)}</div>
            <div className="flex flex-row my-2">
                <label htmlFor="title" className="mx-2">
                    Titre:
                </label>
                <input
                    className="w-full sm:w-3/4"
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <CustomEditor block={content} setContent={setContent} />
        </div>
    );
    
}