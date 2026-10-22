import { useMutation } from '@tanstack/react-query';
import { type FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { api, ApiError } from '@/api';
import { NewsCard, useNews } from '@/News';
import { HotelScene } from '@/scene';
import { hotelName, useAccount, useSetAccount } from '@/session';
import { Button, Field, Notice, PasswordField, Pixel, SectionHeading } from '@/ui';

/** The front door: the hotel, logging in, the way to register, and the news. Someone logged in goes to their page. */
export function Home() {
    const account = useAccount();
    if (account) return <Navigate to="/me" replace />;

    return (
        <main>
            <section aria-labelledby="hello" className="bg-plum text-on-plum">
                <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-12 gap-y-8 px-6 pt-14">
                    <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
                        <div className="flex flex-col gap-3.5">
                            <span className="inline-flex items-center gap-2 self-start rounded-full bg-sun/14 px-3 py-[5px] font-pixel text-sun">
                                <Pixel name="key" size={23} />
                                <span className="text-[13px] uppercase tracking-[.1em]">Invite only</span>
                            </span>
                            <h1 id="hello" className="m-0 font-pixel text-[52px] leading-none font-bold text-cream sm:text-[76px]">{hotelName}</h1>
                            <p className="m-0 max-w-[520px] text-[20px] leading-normal text-[#E6D6E2]">
                                A small hotel for friends and family. Pull up a chair in the lobby, decorate a room, stay up too late.
                                You need an invite code to join.
                            </p>
                        </div>
                        <HotelScene className="hidden max-w-[680px] rounded-t-[28px] md:block" />
                    </div>
                    <div className="min-w-0 max-w-[440px] flex-[1_1_360px] md:mb-12">
                        <LoginCard />
                    </div>
                    {/* on a phone the hotel comes after the way in */}
                    <HotelScene height={360} className="rounded-t-[28px] md:hidden" />
                </div>
            </section>
            <LatestNews />
        </main>
    );
}

function LoginCard() {
    const setAccount = useSetAccount();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useMutation({
        mutationFn: () => api.login(username, password),
        onSuccess: me => {
            setAccount(me);
            navigate('/me');
        },
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();
        login.mutate();
    };
    const status = login.error instanceof ApiError ? login.error.status : undefined;
    const wrong = status === 401 || status === 400;
    const tooMany = status === 429;

    return (
        <div className="flex flex-col gap-[22px] rounded-[28px] bg-surface p-8 text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/.6)]">
            <div className="flex flex-col gap-1">
                <h2 className="m-0 font-display text-[30px] leading-9 font-bold tracking-[-0.02em]">Welcome back</h2>
                <p className="m-0 text-ink-2">Log in to see what's happening in the hotel.</p>
            </div>
            {wrong && <Notice title="Wrong username or password.">Check both and try again.</Notice>}
            {tooMany && <Notice tone="info" title="Too many tries.">Take a breather and try again in a moment.</Notice>}
            {login.error && !wrong && !tooMany && <Notice title="Logging in didn't work.">Try again in a moment.</Notice>}
            <form className="flex flex-col gap-[18px]" onSubmit={submit}>
                <Field label="Username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}
                    disabled={login.isPending} required />
                <PasswordField label="Password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}
                    disabled={login.isPending} hint="Forgot it? Ask a staff member to reset it for you." required />
                <Button type="submit" busy={login.isPending} className="min-h-[52px] w-full">
                    {login.isPending ? 'Logging in…' : 'Log in'}
                </Button>
            </form>
            <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-4">
                <Pixel name="invite" width={32} height={30} />
                <div className="text-[15px] leading-[1.4]">
                    New here? <Link to="/register" className="font-bold">Register with your invite code</Link>
                </div>
            </div>
        </div>
    );
}

function LatestNews() {
    const news = useNews();
    if (!news.data?.length) return null;

    return (
        <section id="news" aria-labelledby="news-h" className="mx-auto flex max-w-[1200px] flex-col gap-7 px-6 pb-[88px] pt-[72px]">
            <SectionHeading id="news-h" aside={<Link to="/news" className="font-bold">All news</Link>}>Latest from the front desk</SectionHeading>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
                {news.data.slice(0, 3).map(article => <NewsCard key={article.id} article={article} />)}
            </div>
        </section>
    );
}
