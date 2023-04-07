import prisma from '@/lib/prisma';
import {filterObj} from '../utils/utils';

export async function selectPagesByName(name) {
    const res = await prisma.pagecontent.findMany({
        where: {
            pageName: {
                contains: name,
            },
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function selectOriginalPageId(childId) {
    const res = await prisma.page_translations.findMany({
        where: {
            child_id: childId,
        },
        select: {
            original_id: true,
        },
    });

    return JSON.parse(JSON.stringify(res[0]));
}

export async function deletePages(pageIds) {
    const res = await Prisma.pagecontent.deleteMany({
        where: {
            id: {
                in: pageIds,
            },
        },
    });
    return res;
}

export async function deleteTranslations(translationsIds) {
    const res = await prisma.page_translations.deleteMany({
        id: {
            in: translationsIds,
        },
    });
    return res;
}

export async function insertPage({
    pageName,
    pageSlug,
    page,
    language,
    author,
    created_at,
    blocks,
    bandeau_id,
    position,
    source,
    draft,
}) {
    const blocksToJson = JSON.stringify(blocks);
    const res = await prisma.pagecontent.create({
        data: {
            language,
            page,
            pageSlug,
            pageName,
            author,
            created_at: new Date(created_at),
            last_modified: new Date(created_at),
            blocks: blocksToJson,
            bandeau_id,
            position,
            source,
            draft,
        },
    });

    return res ? res.id : null;
}

export async function insertTranslation(originalId, childId) {
    const res = await prisma.page_translations.create({
        data: {
            original_id: originalId,
            child_id: childId,
        },
    });
    return res ? res.id : null;
}

export async function selectTranslations(originalPageId) {
    let res = await prisma.page_translations.findMany({
        where: {
            original_id: parseInt(originalPageId),
        },
        include: {
            childPage: true,
        },
    });

    let response = [{}, {}, {}];

    res.forEach(item => {
        if (item.childPage.language === 'fr') response[0] = {...item.childPage};
        if (item.childPage.language === 'en') response[1] = {...item.childPage};
        if (item.childPage.language === 'ru') response[2] = {...item.childPage};
    });

    return JSON.parse(JSON.stringify(response));
}

export async function updatePage({
    id,
    pageName,
    pageSlug,
    content,
    page,
    language,
    author,
    created_at,
    last_modified,
    blocks,
    bandeau_id,
    position,
    source,
    draft,
}) {
    const updatableFields = {
        pageName,
        pageSlug,
        content,
        page,
        language,
        author,
        created_at,
        last_modified,
        blocks,
        bandeau_id,
        position,
        source,
        draft,
    };

    const valid_fields = filterObj(updatableFields, (key, val) => val !== undefined);
    const fields_count = valid_fields.length;

    // there is no fields
    if (fields_count === 0) {
        throw new Error('no fields found');
    } else {
        // SETTERS
        let settersObj = {};

        const fieldsKey = Object.keys(valid_fields);
        fieldsKey.map(key => {
            let val = updatableFields[key];
            if (key === 'created_at') val = new Date(val);
            if (key === 'last_modified') val = new Date(val);
            if (key === 'blocks' && typeof val !== 'string') {
                val = JSON.stringify(val);
            }

            if (key === 'page' && !val) {
                val = null;
            }
            settersObj[key] = val;
        });
        const res = await prisma.pagecontent.update({
            where: {id},
            data: settersObj,
        });

        return res;
    }
}

export async function selectPageBySlug(pageSlug) {
    let param = {
        where: {
            pageSlug: pageSlug,
        },
    };
    const res = await prisma.pagecontent.findUnique(param);

    return JSON.parse(JSON.stringify(res));
}

export async function selectAllPages(locale = null, category = '') {
    let parameters = {};
    if (locale) {
        parameters.language = locale;
    }
    if (category) {
        parameters.page = category;
    }

    parameters.AND = {
        OR: [{page: {not: 'defunt'}}, {page: null}],
    };

    const res = await prisma.pagecontent.findMany({
        where: parameters,
        orderBy: {
            created_at: 'desc',
        },
    });

    if (res.length >= 1) return JSON.parse(JSON.stringify(res));
    else return null;
}

export async function selectPaginatedPages(offset = 0, limit = 15, locale = null, category = '', search) {
    let parameters = {};

    if (locale) {
        parameters.language = locale;
    }
    if (category) {
        parameters.page = category;
    }

    if (search) {
        parameters.pageName = {contains: search};
    }

    parameters.AND = {
        OR: [{page: {not: 'defunt'}}, {page: null}],
    };

    const res = await prisma.pagecontent.findMany({
        where: parameters,
        orderBy: {
            created_at: 'desc',
        },
        skip: offset * limit,
        take: limit,
    });

    let item_count = 0;

    const res2 = await prisma.pagecontent.findMany({
        where: parameters,
        orderBy: {
            created_at: 'desc',
        },
    });
    item_count = res2.length;

    const pages = JSON.parse(JSON.stringify(res));

    return {
        array: pages,
        pagination: {
            item_per_page: limit,
            item_count_current_page: pages.length,
            item_count: item_count,
            page: Number(offset),
            page_count: Math.ceil(item_count / limit),
        },
    };
}
