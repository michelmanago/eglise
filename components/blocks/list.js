import {formatDateToDisplayByLocale, getProperDate} from '@/lib/date';
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
                    .slice(0, 6)
                    .map(article => (
                        <div className="w-full px-2 mt-2 sm:w-1/2 md:w-1/3" key={article.id}>
                            <Link href={`/${article.pageSlug}`}>
                                <a className="flex flex-col gap-1">
                                    {article.bandeau ? (
                                        <img
                                            className="object-cover mx-auto"
                                            style={{aspectRatio: '4 / 3'}}
                                            src={`${apiMediaUrl}${article.bandeau.public_path}`}
                                        />
                                    ) : (
                                        <img
                                            className="object-cover mx-auto"
                                            style={{aspectRatio: '4 / 3'}}
                                            src="/static/img/default-article-img.jpg"
                                        />
                                    )}
                                    <h3 className="inline-block">{article.pageName}</h3>
                                    <div className="inline-block text-sm">
                                        {t('common:article_date')}{' '}
                                        {formatDateToDisplayByLocale(article.created_at, locale)}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>
            {category === 'article' && (
                <div className="flex flex-row justify-center mt-2">
                    <Link href={`/articles`} locale={locale}>
                        <a className="p-2 text-white rounded bg-pgold">{t('common:article_list')}</a>
                    </Link>
                </div>
            )}
        </div>
    );
}
