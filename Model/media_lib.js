import prisma from '@/lib/prisma';

export async function getMediaLib() {
    const res = await prisma.media_lib.findMany();
    return JSON.parse(JSON.stringify(res));
}

export async function getMediaById(mediaId) {
    const res = await prisma.media_lib.findUnique({
        where: {id: mediaId},
    });
    return JSON.parse(JSON.stringify(res));
}

export async function updateMediaByUrl(url, articleId) {
    const res = await prisma.media_lib.update({
        where: {url},
        data: {
            article_id: articleId,
        },
    });
    return JSON.parse(JSON.stringify(res));
}

export async function updateMediaLib(mediaId, articleId) {
    const res = await prisma.media_lib.update({
        where: {id: mediaId},
        data: {
            article_id: articleId,
        },
    });
    return JSON.parse(JSON.stringify(res));
}

export async function deleteMediaLib(mediaId) {
    const res = await prisma.media_lib.delete({
        where: {id: mediaId},
    });
    return JSON.parse(JSON.stringify(res));
}
