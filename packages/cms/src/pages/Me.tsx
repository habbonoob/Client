import type { ReactNode } from 'react';
import { Link, Navigate } from 'react-router';
import type { Account } from '@/api';
import { AvatarStand } from '@/avatar';
import { useHotel } from '@/hotel';
import { NewsEmpty, NewsFeature, NewsRow, useNews } from '@/News';
import { HotelScene } from '@/scene';
import { useAccount } from '@/session';
import { Dots, Notice, Pixel, SectionHeading } from '@/ui';

/** The logged-in player's page: the way into the hotel, their account at a glance, and the news. */
export function Me() {
    const account = useAccount();
    if (account === undefined) return null;
    if (account === null) return <Navigate to="/" replace />;

    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 pb-[88px] pt-8 sm:px-6">
            <Greeting account={account} />
            <div className="flex flex-wrap items-start gap-8">
                <Feed />
                <AccountPanel account={account} />
            </div>
        </main>
    );
}

/** "Good morning" before noon, "afternoon" until six, "evening" after: the hotel's at golden hour more than not. */
function partOfDay(): string {
    const hour = new Date().getHours();
    return hour < 5 ? 'evening' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
}

function Greeting({ account }: { account: Account }) {
    return (
        <section aria-labelledby="greet" className="flex flex-wrap items-stretch overflow-hidden rounded-[28px] bg-plum text-on-plum">
            <div className="flex min-w-0 flex-[999_1_600px] flex-wrap items-center gap-x-9 gap-y-7 p-6 sm:p-9">
                <AvatarStand name={account.username} />
                <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="lab !text-sun">Your room key is ready</span>
                        <h1 id="greet" className="m-0 font-display text-[40px] leading-[1.02] font-bold tracking-[-0.02em] text-cream sm:text-[48px]">
                            Good {partOfDay()}, {account.username}
                        </h1>
                        {account.motto && <p className="m-0 text-[18px] italic text-[#E6D6E2]">“{account.motto}”</p>}
                    </div>
                    <EnterButton />
                </div>
            </div>
            <div className="hidden min-w-0 flex-[1_1_340px] items-end justify-end lg:flex">
                <HotelScene height={300} className="rounded-tl-[28px]" />
            </div>
        </section>
    );
}

/** The way into the hotel, in each of its states: ready, opening, already running, and stuck. */
function EnterButton() {
    const hotel = useHotel();
    const [title, subtitle] = hotel.entering ? ['Opening the hotel…', 'Unpacking the lobby. Hang on a sec.']
        : hotel.open ? ['Back to the hotel', null]
        : hotel.failed ? ['Try again', 'The door got stuck last time.']
        : ['Enter the hotel', 'Opens full-screen. Your friends are inside.'];

    return (
        <div className="flex flex-col items-start gap-3.5">
            <button type="button" className="btn btn-primary btn-enter" onClick={hotel.enter} aria-busy={hotel.entering || undefined}
                aria-live="polite">
                <span className="enter-ic">
                    {hotel.entering ? <Dots /> : <Pixel name="enter" width={32} height={30}/>}
                </span>
                <span className="flex flex-col gap-1">
                    <span className="enter-t">{title}</span>
                    <span className="enter-s flex items-center gap-2">
                        {hotel.open && !hotel.entering ? <><span className="live" aria-hidden="true" />Still running in the background</> : subtitle}
                    </span>
                </span>
            </button>
            {hotel.failed && !hotel.entering && (
                <div className="max-w-[520px] text-[15px]">
                    <Notice title="The hotel didn't open.">
                        Check your connection and try again. If it keeps happening, the hotel might be closed for maintenance.
                    </Notice>
                </div>
            )}
        </div>
    );
}

function Feed() {
    const news = useNews();
    const [first, ...rest] = news.data ?? [];

    return (
        <section aria-labelledby="feed-h" className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
            <SectionHeading id="feed-h" aside={first && <Link to="/news" className="font-bold">All news</Link>}>
                Latest from the front desk
            </SectionHeading>
            {news.data && !first && <NewsEmpty />}
            {first && <NewsFeature article={first} />}
            {rest.slice(0, 2).map(article => <NewsRow key={article.id} article={article} />)}
        </section>
    );
}

function AccountPanel({ account }: { account: Account }) {
    const lastIn = account.lastLoginAt ? new Date(account.lastLoginAt) : null;

    return (
        <aside aria-labelledby="acct-h" className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
            <h2 id="acct-h" className="m-0 font-display text-[30px] leading-9 font-bold tracking-[-0.02em]">Your account</h2>
            <dl className="m-0 rounded-[20px] border border-line bg-surface px-[22px] py-2">
                <Fact icon={<Pixel name="credits" size={30} />} label="Credits">
                    <span className="font-display text-[24px] font-bold">{account.credits.toLocaleString()}</span>
                </Fact>
                <Fact icon={<Pixel name="profile" width={32} height={30} />} label="Member since">
                    {new Date(account.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </Fact>
                <Fact icon={<Pixel name="hourglass" width={28} height={40} />} label="Last in the hotel" last>
                    {lastIn ? <time dateTime={lastIn.toISOString()}>{describeWhen(lastIn)}</time> : 'Not yet'}
                </Fact>
            </dl>
            {account.canManageInvites && (
                <Link to="/staff/invites" className="flex items-center gap-3.5 rounded-[20px] bg-accent-soft px-5 py-[18px] text-ink no-underline hover:text-ink">
                    <Pixel name="invite" width={32} height={30} />
                    <span className="flex flex-1 flex-col">
                        <strong>Invite a friend</strong>
                        <span className="text-[14px] text-ink-2">Create a code from the staff desk</span>
                    </span>
                    <span aria-hidden="true" className="font-bold text-accent">→</span>
                </Link>
            )}
            {account.canImportRooms && (
                <Link to="/staff/rooms/import" className="flex items-center gap-3.5 rounded-[20px] bg-accent-soft px-5 py-[18px] text-ink no-underline hover:text-ink">
                    <Pixel name="rooms" size={32} />
                    <span className="flex flex-1 flex-col">
                        <strong>Import a room</strong>
                        <span className="text-[14px] text-ink-2">Build a room copied on another hotel</span>
                    </span>
                    <span aria-hidden="true" className="font-bold text-accent">→</span>
                </Link>
            )}
        </aside>
    );
}

function Fact({ icon, label, children, last }: { icon: ReactNode; label: string; children: ReactNode; last?: boolean }) {
    return (
        <div className={`flex items-center gap-3.5 py-4 ${last ? '' : 'border-b border-line'}`}>
            <span className="flex w-8 justify-center">{icon}</span>
            <dt className="lab flex-1">{label}</dt>
            <dd className="m-0 text-[17px] font-bold">{children}</dd>
        </div>
    );
}

/** "Today, 21:40", "Yesterday, 21:40", or the date. */
function describeWhen(when: Date): string {
    const time = when.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(when).setHours(0, 0, 0, 0)) / 86400000);
    if (days === 0) return `Today, ${time}`;
    if (days === 1) return `Yesterday, ${time}`;
    return when.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
}
