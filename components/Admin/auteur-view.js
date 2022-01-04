import Link from 'next/link';

export default function AuteurView({}) {
    return (
        <>
            <Link href="/admin/defunts">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Editer un défunt
                </a>
            </Link>
            <Link href="/admin/pageContent">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Editer PageContent
                </a>
            </Link>
            <Link href="/admin/pieceJointe">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Pieces Jointes
                </a>
            </Link>
        </>
    );
}
