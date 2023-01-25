const groupedByMedia = results => {
    // group by media

    const groupedResults = {};

    results.forEach(media => {
        const key = media.id;
        const page = media.page_id && {
            id: media.page_id,
            pageSlug: media.pageSlug,
            pageName: media.pageName,
        };

        if (!groupedResults[key]) {
            groupedResults[key] = {
                id: media.id,
                upload_path: media.upload_path,
                type: media.type,
                credit: media.credit,
                legende: media.legende,
                public_path: media.public_path,
                pages: [],
            };
        }

        if (page) {
            groupedResults[key].pages.push(page);
        }
    });

    return Object.values(groupedResults);
};

// SELECT ALL

export async function selectNonAssociatedMedia(limit = 15, pageOffset = 0, accepts = []) {
    let queryParam = {
        where: {
            type: {
                in: accepts,
            },
            pages: {
                none: {},
            },
        },
    };
    let item_count = (await prisma.medias.findMany(queryParam)).length;
    console.log({pageOffset});
    queryParam.skip = parseInt(pageOffset);
    queryParam.take = limit;
    let res = await prisma.medias.findMany(queryParam);

    return {
        array: res,
        pagination: {
            item_per_page: limit,
            item_count_current_page: res.length,
            item_count: item_count,
            page: Number(pageOffset),
            page_count: Math.ceil(item_count / limit),
        },
    };
}

export async function selectMediaPaginated(limit = 15, pageOffset = 0, page_id, accepts = [], order = 'desc') {
    let item_count = 0;

    let queryParam = {
        where: {},
        orderBy: {
            id: order,
        },
        include: {pages: true},
    };

    if (page_id)
        queryParam.where.pages = {
            some: {page: {id: page_id}},
        };
    if (accepts.length > 0) queryParam.where.type = {in: accepts};

    item_count = (await prisma.medias.findMany(queryParam)).length;
    queryParam.take = limit;
    queryParam.skip = parseInt(pageOffset);

    let res = await prisma.medias.findMany(queryParam);

    return {
        array: res,
        pagination: {
            item_per_page: limit,
            item_count_current_page: res.length,
            item_count: item_count,
            page: Number(pageOffset),
            page_count: Math.ceil(item_count / limit),
        },
    };
}

export async function selectMedia(page_id) {
    const res = await prisma.media_page.findMany({
        where: {
            page_id,
        },
        include: {
            media: true,
        },
    });

    return res.map(item => {
        return {...item.media};
    });
}

// SELECT SINGLE

export async function selectSingleMedia(media_id) {
    const rows = await prisma.medias.findUnique({
        where: {
            id: parseInt(media_id),
        },
    });
    return rows;
}

// PUT MEDIA

export async function putSingleMedia(media_id, {credit, legende} = {}) {
    const res = await prisma.medias.update({
        where: {id: parseInt(media_id)},
        data: {credit, legende},
    });

    return true;
}
