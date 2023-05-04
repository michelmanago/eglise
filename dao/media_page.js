import prisma from '@/lib/prisma';

export async function insertMediaPage(media_id, page_id) {
    const res = await prisma.media_page.create({
        data: {
            media_id: parseInt(media_id),
            page_id,
        },
    });
    return res;
}

export async function selectMediaPage(media_id, page_id) {
    const res = await prisma.media_page.findMany({
        where: {
            media_id: parseInt(media_id),
            page_id,
        },
    });
    return res.length ? res[0] : null;
}

export async function deleteMediaPage(media_id, page_id) {
    try {
        const mediaPage = await prisma.media_page.findMany({
            where: {
                media_id: parseInt(media_id),
                page_id: parseInt(page_id),
            },
        });
        console.log({mediaPage});
        if (!mediaPage) return null;
        const res = await prisma.media_page.delete({
            where: {
                id: mediaPage[0].id,
            },
        });
        return res;
    } catch (error) {
        console.log({error});
        return null;
    }
}
