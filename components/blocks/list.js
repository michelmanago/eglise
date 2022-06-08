import {getProperDate} from '@/lib/date';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function ListBlock({category, pageList}) {
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;
    const apiMediaUrl = `${process.env.NEXT_PUBLIC_SERVER_IMAGE}`;
    const {t} = useTranslation();
    return (
        <div>
            <div className="flex flex-wrap">
                {pageList
                    ?.filter(page => page.language === locale)
                    .sort((a, b) => (a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0))
                    .slice(0, 3)
                    .map(article => (
                        <div className="w-full px-2 sm:w-1/2 md:w-1/3" key={article.id}>
                            {console.log(article.bandeau)}
                            <Link href={`/${article.pageSlug}`}>
                                <a>
                                    {article.bandeau ? (
                                        <img className="mx-auto" src={`${apiMediaUrl}${article.bandeau.public_path}`} />
                                    ) : null}
                                    <h3 className="inline-block">{article.pageName}</h3>
                                    <div className="inline-block mx-2 text-sm">{getProperDate(article.created_at)}</div>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>
            {category === 'article' && (
                <div className="flex flex-row justify-center">
                    <Link href={`/articles`}>
                        <a className="p-2 text-white rounded bg-pgold">{t('common:article_list')}</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
