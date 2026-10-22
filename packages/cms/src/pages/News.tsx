import { Link } from 'react-router';
import { NewsCard, NewsEmpty, useNews } from '@/News';
import { useAccount } from '@/session';
import { Pixel } from '@/ui';

/** Every piece of news, newest arrangement first, as the hotel view orders them. */
export function News() {
    const news = useNews();
    const account = useAccount();

    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 pb-24 pt-12 sm:px-6">
            <div className="flex flex-wrap items-end gap-5">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-primary-soft">
                    <Pixel name="news" width={32} height={30} />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="lab">From the front desk</span>
                    <h1 className="m-0 font-display text-[44px] leading-[48px] font-bold tracking-[-0.02em]">News</h1>
                </div>
            </div>
            {news.data && news.data.length === 0 && (
                <NewsEmpty action={account && <Link className="btn btn-secondary mt-1.5" to="/me">Go to the lobby</Link>} />
            )}
            {!!news.data?.length && (
                <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
                    {news.data.map(article => <NewsCard key={article.id} article={article} heading="h2" />)}
                </div>
            )}
        </main>
    );
}
