import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Trash} from '@/components/icon';

import {getMediaLib} from '@/Model/media_lib';

export default function MediaLib({media}) {
    const router = useRouter();
    const {locale} = router;
    const [mediaList, setMediaList] = useState(() => media);
    const pjUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/`;
    const apiImgUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/medias`;
    const deleteMedia = async (mediaId, article_id) => {
        console.log(mediaId, article_id);
        if (article_id) return alert('Cette image est liée à un article');
        if (confirm('Etes vous sûr de vouloir supprimer cette article ?')) {
            const res = await fetch(`${apiImgUrl}/${mediaId}`, {method: 'DELETE'});
            updateMediaList();
        }
    };
    const updateMediaList = async () => {
        const res = await fetch(`/api/medias`);
        const updateMedia = await res.json();

        setMediaList(updateMedia);
    };
    return (
        <div className="max-w-screen-xl sm:mx-auto bg-white">
            <Header currentLanguage={locale} currentPage={''} />
            <main className="w-1/2 mx-auto mt-2">
                {mediaList.map((media, index) => (
                    <div className="flex flex-row items-center justify-between mb-1" key={media.id}>
                        <div className="relative mx-2 hover-trigger">
                            <div className="">{media.url}</div>
                            <img
                                className="absolute z-50 w-1/2 top-6 left-4 hover-target"
                                src={`${pjUrl}${media.url}`}
                                alt={media.legende}
                            />
                        </div>
                        <div>{media.article_id}</div>
                        <div
                            className="inline-block p-1 text-white bg-red-600 cursor-pointer"
                            onClick={() => deleteMedia(media.id, media.article_id)}
                        >
                            <Trash className={'block'} />
                        </div>
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const media = await getMediaLib();
    return {
        props: {
            media: media,
        },
    };
}
