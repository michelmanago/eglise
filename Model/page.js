import prisma from '@/lib/prisma';
import {
    deletePages,
    insertPage,
    insertTranslation,
    selectAllPages,
    selectOriginalPageId,
    selectPageBySlug,
    selectPagesByName,
    selectPaginatedPages,
    selectTranslations,
    updatePage,
} from '../dao/page';

import {getServeurImageMedia} from '../utils/utils-serveur-image';
import {getMedia, getSingleMedia} from './media';

// helpers
const getLastPosition = async category => {
    let lastPosition = null;
    // If has category find last position
    if (category) {
        lastPosition = await prisma.pagecontent.findMany({
            where: {
                page: category,
            },
            orderBy: {
                position: 'desc',
            },
        });

        lastPosition = lastPosition && lastPosition.length ? lastPosition[0].position + 1 : null;
    }

    return lastPosition;
};

export async function removePage(pageId) {
    const translations = await getPageTranslations(pageId);

    // delete pages
    const deletesPages = await deletePages(translations.map(translation => translation.id));
    // const deletedTranslations = await deleteTranslations(translations.map(translation => translation.translation_id));

    return [deletesPages];
}

export async function updateTranslations(pages) {
    const page_id = pages[0].id;
    const category_before = (await prisma.pagecontent.findUnique({where: {id: page_id}})).page;
    const category_after = pages[0].page;

    let lastPosition = null;

    // category has been changed
    if (category_before !== category_after && category_after) {
        lastPosition = await getLastPosition(category_after);
    }

    // update pages
    const updatePagePromises = pages.map(page =>
        updatePage({...page, position: lastPosition ? lastPosition : page.position}),
    );
    const updatedIds = await Promise.all(updatePagePromises);

    //return pages.map(page => page.id);
    return pages;
}

export async function getPageTranslations(originalPageId) {
    const pages = (await selectTranslations(originalPageId)).map(page => ({...page, blocks: JSON.parse(page.blocks)}));

    return pages;
}

// create a new page (with 3 translations)
export async function createNewPage(pages) {
    const category = pages[0].page;
    let lastPosition = null;

    // If has category find last position
    if (category) {
        lastPosition = await getLastPosition(category);
    }

    // pages
    const createdPages = pages.map(page =>
        createSinglePage({
            ...page,
            position: lastPosition ? lastPosition : page.position,
        }).then(createdId => ({...page, id: createdId})),
    );
    const createdIds = await Promise.all(createdPages);

    // translations
    // hard-coded :/
    const originalPage = createdIds.find(p => p.language === 'fr');
    await linkTranslations(
        originalPage.id,
        createdIds.map(c => c.id),
    );

    // return create page ids
    return createdIds.map(page => page.id);
}

// create a single page
export async function createSinglePage(page) {
    return insertPage(page).then(id => id);
}

// Translations

export async function linkTranslations(originalPageId, childrenIds = []) {
    const translatedIds = await Promise.all(childrenIds.map(id => insertTranslation(originalPageId, id)));
    return translatedIds;
}

// Get
export async function getPageById(id) {
    console.log({id});
    const res = await prisma.pagecontent.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getPageBySlug(pageSlug, specificContext = '') {
    try {
        let page = await selectPageBySlug(pageSlug);

        if (!page) {
            throw new Error('Page not found');
        }

        // in context of show/displaying a page we need more information
        if (specificContext === 'render') {
            // we must pre-fetch bandeau
            if (page.bandeau_id) {
                try {
                    // const bandeau = await getServeurImageMedia(page.bandeau_id);
                    const bandeau = await getSingleMedia(page.bandeau_id);
                    page.bandeau = bandeau;
                } catch (error) {
                    console.log('Error fetching bandeau', error);
                }
            }

            // fetchOriginalPageId
            const originalPageId = await selectOriginalPageId(page.id);
            page.originalPageId = originalPageId ? originalPageId.original_id : null;

            // fetch nav list if not defunt
            if (page.page != 'defunt') {
                const nav = await getAllPages(page.language, page.page);
                page.nav = nav;
            }

            // fetch translations
            let translations = await getPageTranslations(page.originalPageId);
            page.translations = translations;

            // all associated images
            let associated_media = await getMedia(page.originalPageId);
            page.associated_media = associated_media;
        }

        // so that we can directly manipulate JS object in Components
        if (page && page.blocks) {
            page.blocks = JSON.parse(page.blocks);
        }

        return page;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAllPageByType(pageType) {
    const res = await prisma.pagecontent.findMany({
        where: {
            page: pageType,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getPageByType(pageType) {
    const res = await prisma.pagecontent.findMany({
        where: {
            // draft: 0,
            draft: false,
            page: pageType,
        },
    });

    return JSON.parse(JSON.stringify(res));
}

export async function getAllPages(locale, category) {
    const pages = await selectAllPages(locale, category);

    return pages;
}

export async function getPaginatedPages(offset, locale, category, search) {
    const pages = await selectPaginatedPages(offset, 20, locale, category, search);
    return pages;
}

export async function getLastPages(locale, category, nb_last) {
    const pages = await selectAllPages(locale, category);

    if (!pages) return null;
    return pages
        .reverse()
        .slice(Math.max(pages.length - nb_last, 0))
        .reverse();
}

export async function getPagesByName(name) {
    const pages = await selectPagesByName(name);

    return pages;
}
