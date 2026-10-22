import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { api, type NewsArticle } from '@/api';
import { Pixel } from '@/ui';

/** The hotel's news: the promo articles the hotel view shows, in their order. */
export function useNews() {
    return useQuery({ queryKey: ['news'], queryFn: api.news });
}

/** An article's picture, from our own mirror when it is one of Habbo's: the website never loads from Habbo. */
export function newsImage(article: NewsArticle): string | null {
    const url = article.image?.trim();
    if (!url) return null;
    return url.replace(/^https?:\/\/(images\.habbo\.com)\//, '/mirror/$1/');
}

export const articlePath = (article: NewsArticle) => `/news/${article.id}`;

/** The picture, or the bulletin board on a wash when the article has none. */
function Picture({ article, className = '', iconSize = 64 }: { article: NewsArticle; className?: string; iconSize?: number }) {
    const src = newsImage(article);
    if (src) return <img className={`pix block bg-surface-2 object-cover ${className}`} src={src} alt="" />;
    return (
        <div className={`flex items-center justify-center bg-surface-2 ${className}`}>
            <Pixel name="news" width={iconSize} height={Math.round(iconSize * 30 / 32)} />
        </div>
    );
}

/** A news card: the picture on top, the title (the card's link) and the start of the text. */
export function NewsCard({ article, heading: Heading = 'h3', lines = 3 }: { article: NewsArticle; heading?: 'h2' | 'h3'; lines?: number }) {
    return (
        <article className="relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-card">
            <Picture article={article} className="aspect-[2/1] w-full" />
            <div className="flex flex-col gap-2 px-[22px] pb-6 pt-5">
                <Heading className="m-0 font-display text-[21px] leading-[26px] font-bold tracking-[-0.02em]">
                    <Link className="card-link" to={articlePath(article)}>{article.title}</Link>
                </Heading>
                <p className="m-0 text-[15px] text-ink-2" style={{ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.body}
                </p>
            </div>
        </article>
    );
}

/** A news card laid on its side: a small picture beside the title. */
export function NewsRow({ article, compact }: { article: NewsArticle; compact?: boolean }) {
    return (
        <article className="relative flex flex-wrap overflow-hidden rounded-[20px] border border-line bg-surface">
            <Picture article={article} iconSize={48} className={compact ? 'h-[120px] w-[160px] shrink-0' : 'h-[120px] max-w-full flex-[0_0_240px]'} />
            <div className={`flex min-w-0 flex-col justify-center gap-1 ${compact ? 'flex-1 px-[18px] py-3.5' : 'flex-[1_1_260px] px-[22px] py-4'}`}>
                <h3 className={`m-0 font-display font-bold tracking-[-0.02em] ${compact ? 'text-[18px] leading-[23px]' : 'text-[19px] leading-6'}`}>
                    <Link className="card-link" to={articlePath(article)}>{article.title}</Link>
                </h3>
                <p className={`m-0 text-ink-2 ${compact ? 'text-[14px]' : 'text-[15px]'}`}
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.body}
                </p>
            </div>
        </article>
    );
}

/** The big story at the top of the player's page. */
export function NewsFeature({ article }: { article: NewsArticle }) {
    return (
        <article className="relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-card">
            <Picture article={article} iconSize={96} className="aspect-[2/1] w-full" />
            <div className="flex flex-col gap-2 px-[26px] pb-[26px] pt-[22px]">
                <h3 className="m-0 font-display text-[24px] leading-[30px] font-bold tracking-[-0.02em]">
                    <Link className="card-link" to={articlePath(article)}>{article.title}</Link>
                </h3>
                <p className="m-0 whitespace-pre-line text-ink-2">{article.body}</p>
            </div>
        </article>
    );
}

/** When nobody has posted anything yet. */
export function NewsEmpty({ action }: { action?: ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-3.5 rounded-[28px] border-[1.5px] border-dashed border-line bg-surface px-6 py-16 text-center">
            <Pixel name="frank-tour" width={147} height={109} />
            <h2 className="m-0 mt-2 font-display text-[28px] font-bold tracking-[-0.02em]">The front desk is quiet</h2>
            <p className="m-0 max-w-[420px] text-ink-2">
                No news yet. When something happens in the hotel, it'll be posted here. Until then, the lobby's open.
            </p>
            {action}
        </div>
    );
}
