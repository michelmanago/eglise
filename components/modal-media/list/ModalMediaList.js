// libs
import {useEffect, useState} from 'react';
import {getMediaLink} from '../../../utils/utils-serveur-image';
import Link from 'next/link';

// components
import ModalMediaListEdit from './ModalMediaListEdit';
import SelectSearch from '../../select-search/select-search';

// icons
import IconVideo from '../../icons/IconVideo';
import IconHeadphone from '../../icons/IconHeadphone';
import IconDocument from '../../icons/IconDocument';
import IconUnknown from '../../icons/IconUnknown';
import IconLinked from '../../icons/IconLinked';

// utils
import {getFilenameFromPath} from '../../../utils/utils-media';
import ModalMediaListPagination from './ModalMediaListPagination';
import fetchMediaPaginated from '../../../utils/fetch/fetchMediaPaginated';
import fetchPagesByName from '../../../utils/fetch/fetchPagesByName';

// styles
const imageItemContainerStyles = {
    paddingTop: '100%',
};

export default function ModalMediaList({
    pageIndexes,
    setPageIndexes,
    preSelectedMedia,
    opened,
    active,
    edited,
    setEdited,
    originalPageId,
    accepts,
    hasModified,
    setHasModified,
}) {
    if (!active) return '';

    // states
    const [didMount, setDidMount] = useState(false);
    const [filterByPage, setFilterByPage] = useState(!originalPageId);
    const [fetching, setFetching] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [hasDoneFirstFetch, setHasDoneFirstFetch] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState(null);

    // utils
    const getCurrentPageIndexKey = (offset = pagination.page, isFiltered = filterByPage) => {
        return `page-${offset}${isFiltered ? '-filtered' : ''}`;
    };
    const currentList = (pagination ? pageIndexes[getCurrentPageIndexKey()] : []) || [];
    // methods

    const searchPages = async name => {
        const res = await fetchPagesByName(name);
        setResults(res);
    };

    const onSearchByName = value => {
        // update state
        setSearch(value);

        // call api
        if (value) {
            searchPages(value);
        }

        // reset page filter
        else {
            setResults([]);
        }
    };

    const onValidFilterBySpecificPage = () => {
        fetchMediaForList(0, false);
    };

    const onRemoveFilterBySpecificPage = () => {
        setSelectedSearch(null);
        setSearch('');
    };

    const onSelectPage = page => {
        setSelectedSearch(page);
        setSearch(page.pageName);
    };

    const onChangeFilter = event => {
        // change filter
        setFilterByPage(event.target.checked);

        // reset

        // re-fetch list (async)
        fetchMediaForList(0, event.target.checked, true);
    };

    const onSelectMedia = media => e => {
        if (
            !hasModified ||
            (hasModified &&
                confirm("Êtes vous sûr de vouloir quitter l'édition du média sans sauvegarder vos modifications ?"))
        ) {
            // close current
            if (edited && edited.id === media.id) {
                setEdited(null);
            }

            // switch
            else {
                setEdited(media);
            }

            // reset after switched
            setHasModified(false);
        }
    };

    const fetchMediaForList = async (pageOffset, filtered = filterByPage) => {
        const nextPageIndexKey = getCurrentPageIndexKey(pageOffset, filtered);

        // prevent from fetching an already fetched page
        // if(typeof pageIndexes[nextPageIndexKey] !== "undefined"){

        //     // change page
        //     setPagination({
        //         ...pagination,
        //         page: pageOffset
        //     })

        //     return false
        // }

        try {
            // is loading
            setFetching(true);

            // media associated to this page
            const page_id = selectedSearch ? selectedSearch.id : filtered ? originalPageId : undefined;

            // fetch list
            const media = await fetchMediaPaginated(pageOffset, page_id, accepts);

            // list of media
            setPageIndexes({
                ...pageIndexes,
                [nextPageIndexKey]: media.array,
            });

            // set pagination
            setPagination(media.pagination);

            // has loaded
            setFetching(false);

            return media;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    };

    const changePaginationPage = async newPage => {
        if (pagination && newPage !== pagination.page) {
            // Fetch new list
            await fetchMediaForList(newPage);
        }
    };

    const updateMediaFromList = newMedia => {
        // update this media

        const currentIndex = getCurrentPageIndexKey();
        const currentPage = pageIndexes[currentIndex];

        // replace one item of {currentPage}
        setPageIndexes({
            ...pageIndexes,
            [currentIndex]: currentPage.map(page => (page.id === newMedia.id ? newMedia : page)),
        });

        setEdited(newMedia);
    };

    const deleteMediaFromList = mediaId => {
        // remove this media from list
        const currentIndex = getCurrentPageIndexKey();
        const currentPage = pageIndexes[currentIndex];

        setPageIndexes({
            ...pageIndexes,
            [currentIndex]: currentPage.filter(l => l.id !== mediaId),
        });

        // if this media was selected -> unselected it
        if (edited && edited.id === mediaId) {
            setEdited(null);
        }
    };

    // lifecycle

    useEffect(() => {
        if (!selectedSearch) {
            fetchMediaForList(0, false);
        }
    }, [selectedSearch]);

    useEffect(async () => {
        if (didMount) {
            return;
        } else {
            setDidMount(true);
        }

        if (opened && !hasDoneFirstFetch) {
            // has first fetched
            setHasDoneFirstFetch(true);

            try {
                const media = await fetchMediaForList(0);

                // pre select a media
                if (preSelectedMedia) {
                    setEdited(media.array.find(m => m.id === preSelectedMedia));
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [opened, hasDoneFirstFetch, preSelectedMedia, didMount]);

    // renderers

    const renderMediaPreview = media => {
        const media_src = getMediaLink(media.public_path);

        switch (media.type) {
            case 'video':
                return (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300 border rounded">
                        <IconVideo className={'relative z-10 w-24 text-gray-100'} />
                        <video muted src={media_src} className="absolute object-cover w-full h-full"></video>
                    </div>
                );
                break;
            case 'image':
                return <img className="absolute top-0 left-0 block object-cover w-full h-full" src={media_src} />;
                break;
            case 'document':
                return (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300 border rounded">
                        <IconDocument className={'w-24 text-gray-100'} />
                    </div>
                );
                break;
            case 'audio':
                return (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300 border rounded">
                        <IconHeadphone className={'w-24 text-gray-100'} />
                    </div>
                );
                break;
            default:
                return (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300 border rounded">
                        <IconUnknown className={'w-24 text-gray-100'} />
                    </div>
                );
        }
    };

    const renderList = list => {
        // LIST READY
        if (list.length) {
            return list.map(image => {
                const isSelected = edited && edited.id === image.id;
                const filename = getFilenameFromPath(image);
                const linkedToThisPage = image.pages && image.pages.some(page => page.id === originalPageId);

                return (
                    <button
                        type="button"
                        key={image.id}
                        onClick={onSelectMedia(image)}
                        className={`w-1/2 md:w-1/3 lg:w-1/4 p-2 rounded`}
                    >
                        <div
                            style={imageItemContainerStyles}
                            className={`relative rounded border-4 border-transparent ${
                                isSelected ? 'border-green-400' : ''
                            }`}
                        >
                            {linkedToThisPage && (
                                <div className="absolute top-0 left-0 z-10 px-1 text-gray-100 bg-yellow-600 border-gray-900 opacity-50">
                                    <IconLinked />
                                </div>
                            )}

                            {/* Image preview */}
                            {renderMediaPreview(image)}

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 z-10 w-full px-3 py-1 text-sm text-white truncate bg-gray-500 opacity-70">
                                {filename}
                            </div>
                        </div>
                    </button>
                );
            });
        }

        // LIST LOADING
        else if (!list.length && fetching) {
            return (
                <div className="flex flex-col items-center justify-center mt-6">
                    <p className="mb-4 text-center">Chargement des images</p>
                    <div className="">
                        <svg
                            className="w-10 h-10 mr-3 -ml-1 text-gray-600 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                </div>
            );
        }

        // LIST EMPTY
        else {
            return <div className="py-5 font-medium text-center bg-gray-100">Il n'y a aucun media ici.</div>;
        }
    };

    // others

    return (
        <div className="flex h-full">
            {/* List */}
            <div className="flex flex-col w-2/3 pr-2 overflow-auto">
                {/* Page association */}
                <div className="flex items-center mt-4">
                    <p className="pl-3 mr-5 font-medium">Restreindre par page</p>
                    <div className="w-1/3 border">
                        <SelectSearch
                            value={search}
                            setValue={onSearchByName}
                            results={results}
                            getKey={({id}) => id}
                            onSelect={onSelectPage}
                            renderResult={item => <p className="text-md">{item.pageName}</p>}
                            inputPlaceholder="Rechercher le nom d'une page"
                        />
                    </div>
                    {selectedSearch && [
                        <button
                            onClick={onValidFilterBySpecificPage}
                            className="inline-block max-w-xs px-2 py-1 ml-3 text-sm text-blue-400 truncate border border-blue-400 rounded-sm hover:bg-blue-400 hover:text-white"
                        >
                            Appliquer le filtre
                        </button>,
                        <button
                            onClick={onRemoveFilterBySpecificPage}
                            className="inline-block max-w-xs px-2 py-1 ml-3 text-sm text-red-400 truncate border border-red-400 rounded-sm hover:bg-red-400 hover:text-white"
                        >
                            Effacer le filtre
                        </button>,
                    ]}
                </div>

                {/* Filters */}
                {/* Not allowed to filter when creating the page because there is no media attributed to this page currently */}
                {/* {
                    originalPageId && (
                        <div className="px-2 py-2 border-b">
                            <label className="select-none" htmlFor="filterByPage">Uniquement les fichiers de cette page : </label>
                            <input type="checkbox" checked={filterByPage} onChange={onChangeFilter} id="filterByPage" />
                        </div>
                    )
                } */}

                {/* List */}
                <div className="h-full overflow-auto">{renderList(currentList)}</div>

                {pagination && pagination.page_count > 1 && (
                    <ModalMediaListPagination changePaginationPage={changePaginationPage} pagination={pagination} />
                )}
            </div>

            {/* Sidebar */}
            <div className="w-1/3 overflow-auto bg-gray-100">
                {edited && (
                    <ModalMediaListEdit
                        key={edited.id}
                        originalPageId={originalPageId}
                        updateMediaFromList={updateMediaFromList}
                        deleteMediaFromList={deleteMediaFromList}
                        media={edited}
                        hasModified={hasModified}
                        setHasModified={setHasModified}
                        setEdited={setEdited}
                    />
                )}
            </div>
        </div>
    );
}
