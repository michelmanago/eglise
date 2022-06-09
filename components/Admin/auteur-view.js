import Link from 'next/link';

export default function AuteurView({}) {
    return (
        <>
            <Link href="/admin/articles">
                <a className="h-6 px-4 py-1 mb-20 mr-6 -mt-24 text-xs text-center text-white transition duration-300 ease-in-out rounded-lg sm:text-sm bg-pgold sm:-mt-20 sm:h-7 hover:bg-pblue">
                    Editer un article
                </a>
            </Link>
        </>
    );
}
