import Link from 'next/link';
import {ChevronLeft, ChevronRight} from '../lib/icon';

export default function Paging({page, totalPage, baseUrl, params}) {
    let paramsString = '';
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const param = params[key];
            paramsString += `${key}=${param}&`;
        }
    }
    let url = `${baseUrl}?${paramsString}`;
    return (
        <div className="flex flex-row gap-1 my-1">
            {page > 1 && (
                <>
                    <Link href={`${url}page=${page - 1}`}>
                        <a className="flex items-center px-1 bg-white border rounded shadow">
                            <ChevronLeft size="20" />
                        </a>
                    </Link>
                    <Link href={`${url}page=1`}>
                        <a className="px-1 bg-white border rounded shadow">1</a>
                    </Link>
                </>
            )}
            {page - 1 > 1 && <div>...</div>}

            <div className="px-1 text-white bg-black border border-black rounded shadow">{page}</div>

            {page + 1 < totalPage && <div>...</div>}
            {page != totalPage && (
                <>
                    <Link href={`${url}page=${totalPage}`}>
                        <a className="px-1 bg-white border rounded shadow">{totalPage}</a>
                    </Link>
                    <Link href={`${url}page=${page + 1}`}>
                        <a className="flex items-center px-1 bg-white border rounded shadow">
                            <ChevronRight size="20" />
                        </a>
                    </Link>
                </>
            )}
        </div>
    );
}
