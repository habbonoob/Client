import { Link, useParams } from 'react-router';
import { newsImage, NewsRow, useNews } from '@/News';
import { NotFound } from '@/pages/NotFound';

/** One piece of news, and a couple of others after it. */
export function Article() {
    const { id } = useParams();
    const news = useNews();
    if (!news.data) return null;

    const article = news.data.find(a => String(a.id) === id);
    if (!article) return <NotFound />;
    const image = newsImage(article);
    const more = news.data.filter(a => a.id !== article.id).slice(0, 2);

    return (
        <main className="mx-auto flex max-w-[1008px] flex-col gap-7 px-4 pb-24 pt-8 sm:px-6">
            <Link to="/news" className="inline-flex min-h-11 items-center gap-1.5 self-start font-bold">← All news</Link>
            <article className="flex flex-col gap-7">
                {image && <img className="pix block aspect-[2/1] w-full rounded-[28px] bg-surface-2 object-cover shadow-lifted" src={image} alt="" />}
                <div className="flex max-w-[680px] flex-col gap-5">
                    <span className="lab">From the front desk</span>
                    <h1 className="m-0 font-display text-[36px] leading-[1.05] font-bold tracking-[-0.02em] [text-wrap:balance] sm:text-[48px]">
                        {article.title}
                    </h1>
                    <div className="prose text-[18px] leading-[1.7]">
                        {article.body.split(/\n\s*\n/).map((paragraph, i) => <p key={i} className="whitespace-pre-line">{paragraph}</p>)}
                    </div>
                </div>
            </article>
            {more.length > 0 && (
                <>
                    <div className="my-4 h-px bg-line" />
                    <section aria-labelledby="more-h" className="flex flex-col gap-[18px]">
                        <h2 id="more-h" className="m-0 font-display text-[24px] font-bold tracking-[-0.02em]">More from the front desk</h2>
                        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
                            {more.map(a => <NewsRow key={a.id} article={a} compact />)}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
