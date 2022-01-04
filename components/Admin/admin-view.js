import Link from 'next/link';

export default function AdminView({}) {
    return (
        <>
            <Link href="/admin/defunts">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Editer un défunt
                </a>
            </Link>
            <Link href="/admin/articles">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Articles
                </a>
            </Link>
            <Link href="/admin/events">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Calendrier
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
            <Link href="/admin/users">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Utilisateurs
                </a>
            </Link>
        </>
    );
}
