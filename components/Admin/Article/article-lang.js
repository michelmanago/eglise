import React, {useEffect, useState} from 'react';
import {getProperDate} from '@/lib/date';
import CustomEditor from '@/components/Slate/customEditor';

export default function ArticleLang({article, setArticle}) {
    const imgBaseUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads`;
    //const [articleState, setArticleState] = useState(article);
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);

    useEffect(() => {
        let newArticle = {...article};
        let change = false;
        if (article.title != title) {
            newArticle.title = title;
            change = true;
        }
        if (article.content != content) {
            newArticle.content = content;
            change = true;
        }

        if (change) setArticle(newArticle);
    }, [title, content]);

    return (
        <div className="mx-2">
            <div className="text-sm">{getProperDate(article.date)}</div>
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
