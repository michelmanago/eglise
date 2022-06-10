// libs

// components
import PageInfo from '../page-info/PageInfo';
import PageContent from './commons/PageContent';

export default function PageDefault({page}) {
    return (
        <div className="">
            {/* Information */}
            {!page.page && (
                <PageInfo
                    author={page.author}
                    media={page.associated_media}
                    created_at={page.created_at}
                    last_modified={page.last_modified}
                    source={page.source}
                />
            )}

            {/* Content */}
            <PageContent blocks={page.blocks} pageName={page.pageName} />

            {/* Information on page with cat */}
            {!!page.page && (
                <PageInfo
                    author={page.author}
                    media={page.associated_media}
                    created_at={page.created_at}
                    last_modified={page.last_modified}
                    source={page.source}
                />
            )}
        </div>
    );
}
