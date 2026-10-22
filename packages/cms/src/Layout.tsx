import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import type { Account } from '@/api';
import { AvatarThumb } from '@/avatar';
import { HotelProvider, useHotel } from '@/hotel';
import { Maintenance } from '@/pages/NotFound';
import { hotelName, useAccount, useAccountQuery, useLogout } from '@/session';
import { Pixel, ToastProvider } from '@/ui';

export function Layout() {
    return (
        <ToastProvider>
            <HotelProvider>
                <Site />
            </HotelProvider>
        </ToastProvider>
    );
}

function Site() {
    const me = useAccountQuery();
    // the server answered with an error or not at all: the hotel is down, and every page would fail with it
    const down = me.isError && me.data === undefined;

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
                {down ? <Maintenance onRetry={() => void me.refetch()} retrying={me.isFetching} /> : <Outlet />}
            </div>
            <Footer />
        </div>
    );
}

/** The hotel's name with its room key. */
export function Wordmark({ to, small }: { to: string; small?: boolean }) {
    return (
        <Link to={to} className="flex items-center gap-2.5 text-ink no-underline hover:text-ink">
            <Pixel name="key" size={small ? 23 : 23} />
            <span className={`font-pixel font-bold ${small ? 'text-[19px]' : 'text-[22px]'}`}>{hotelName}</span>
        </Link>
    );
}

/** Sticky at the top. Logged out: news, logging in and the way to register; logged in: the player's pages, the way
 * into the hotel and out of the website. On a phone the links fold into a sheet. */
function Header() {
    const account = useAccount();
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    useEffect(() => setMenu(false), [location.pathname]);

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-surface">
            <div className="mx-auto flex min-h-16 max-w-[1200px] items-center gap-x-5 gap-y-2 px-4 sm:px-6">
                <Wordmark to={account ? '/me' : '/'} />
                <div className="hidden flex-1 items-center gap-5 md:flex">
                    {account ? <MemberLinks account={account} /> : <GuestLinks />}
                </div>
                <button type="button" className="btn btn-ghost btn-sm ml-auto w-11 p-0 md:hidden" aria-expanded={menu}
                    aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>
                    <MenuMark open={menu} />
                </button>
            </div>
            {menu && (
                <nav aria-label="Main" className="flex flex-col gap-0.5 border-t border-line px-3 pb-4 pt-1 md:hidden">
                    {account ? <MemberLinks account={account} stacked /> : <GuestLinks stacked />}
                </nav>
            )}
        </header>
    );
}

function GuestLinks({ stacked }: { stacked?: boolean }) {
    return (
        <nav aria-label="Main" className={stacked ? 'contents' : 'ml-auto flex items-center gap-1'}>
            <NavLink className="navlink" to="/news">News</NavLink>
            <NavLink className="navlink" to="/" end>Log in</NavLink>
            <Link className={`btn btn-primary ${stacked ? 'mt-2' : 'btn-sm'}`} to="/register">I have an invite</Link>
        </nav>
    );
}

function MemberLinks({ account, stacked }: { account: Account; stacked?: boolean }) {
    const hotel = useHotel();
    const logout = useLogout();
    const navigate = useNavigate();
    const logOut = () => logout.mutate(undefined, {
        onSuccess: () => {
            hotel.close();
            navigate('/');
        },
    });

    const links = (
        <>
            <NavLink className="navlink" to="/me">Me</NavLink>
            <NavLink className="navlink" to="/news">News</NavLink>
            {account.canManageInvites && <NavLink className="navlink" to="/staff/invites">Invites</NavLink>}
            {account.canImportRooms && <NavLink className="navlink" to="/staff/rooms/import">Import room</NavLink>}
        </>
    );
    const enter = hotel.open
        ? <button type="button" className={`btn btn-secondary ${stacked ? '' : 'btn-sm'}`} onClick={hotel.enter}>
            <span className="live" aria-hidden="true" />Back to the hotel
        </button>
        : <button type="button" className={`btn btn-primary ${stacked ? '' : 'btn-sm'}`} onClick={hotel.enter} aria-busy={hotel.entering || undefined}>
            <Pixel name="enter" width={16} height={15} />Enter hotel
        </button>;

    if (stacked) {
        return (
            <>
                {links}
                <div className="my-2 h-px bg-line" />
                {enter}
                <button type="button" className="btn btn-ghost" onClick={logOut}>Log out</button>
            </>
        );
    }
    return (
        <>
            <nav aria-label="Main" className="flex items-center gap-1">{links}</nav>
            <div className="ml-auto flex items-center gap-3">
                {enter}
                <span className="flex items-center gap-2 font-bold">
                    <AvatarThumb username={account.username} />{account.username}
                </span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={logOut}>Log out</button>
            </div>
        </>
    );
}

/** Three pixel bars, or a pixel cross when the menu is open. */
function MenuMark({ open }: { open: boolean }) {
    return (
        <svg width="20" height="20" viewBox="0 0 10 10" aria-hidden="true" shapeRendering="crispEdges" fill="currentColor">
            {open
                ? [1, 2, 3, 4, 5, 6, 7, 8].map(i => <g key={i}><rect x={i} y={i} width="1" height="1" /><rect x={9 - i} y={i} width="1" height="1" /></g>)
                : [2, 5, 8].map(y => <rect key={y} x="1" y={y - 1} width="8" height="1" />)}
        </svg>
    );
}

function Footer() {
    return (
        <footer className="bg-plum text-on-plum">
            <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8">
                <span className="flex items-center gap-2.5">
                    <Pixel name="key" size={23} />
                    <span className="font-pixel text-[18px] font-bold">{hotelName}</span>
                </span>
                <p className="m-0 text-[14px] text-on-plum-2">
                    A small, private, fan-made hotel for friends and family. Not affiliated with Habbo or Sulake.
                </p>
            </div>
        </footer>
    );
}
