import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { api } from '@/api';
import { hotelName, useAccount } from '@/session';

/** The client, opened on the hotel's environment in its configuration (common_configuration's "hotel": this origin,
 * the game at /game). */
const clientPath = import.meta.env.VITE_CLIENT_PATH ?? '/client/';
const clientServer = import.meta.env.VITE_CLIENT_SERVER ?? 'hotel';

/** The route the hotel is shown on. */
export const hotelRoute = '/hotel';

interface Hotel {
    /** Opens the hotel: the first time with a fresh SSO ticket, after that the client already running. */
    enter: () => Promise<void>;
    entering: boolean;
    failed: boolean;
    /** The client is loaded, shown or not. */
    open: boolean;
    /** Closes the client for good (logging out). */
    close: () => void;
}

const HotelContext = createContext<Hotel | null>(null);

export function useHotel(): Hotel {
    const hotel = useContext(HotelContext);
    if (!hotel) throw new Error('useHotel outside HotelProvider');
    return hotel;
}

/** Holds the client's frame for the whole website: once loaded it stays loaded, hidden on the website's pages and
 * shown on /hotel, so going back to the website and in again keeps the player where they were (and connected). */
export function HotelProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [src, setSrc] = useState<string | null>(null);
    const [entering, setEntering] = useState(false);
    const [failed, setFailed] = useState(false);

    const enter = useCallback(async () => {
        if (src) {
            navigate(hotelRoute);
            return;
        }
        setEntering(true);
        setFailed(false);
        try {
            const { ssoTicket } = await api.hotelTicket();
            setSrc(`${clientPath}?server=${encodeURIComponent(clientServer)}&ticket=${encodeURIComponent(ssoTicket)}`);
            navigate(hotelRoute);
        } catch {
            setFailed(true);
        } finally {
            setEntering(false);
        }
    }, [src, navigate]);

    const close = useCallback(() => setSrc(null), []);
    const hotel = useMemo(() => ({ enter, entering, failed, open: src !== null, close }), [enter, entering, failed, src, close]);

    return (
        <HotelContext.Provider value={hotel}>
            {children}
            {src && <HotelFrame src={src} />}
        </HotelContext.Provider>
    );
}

function HotelFrame({ src }: { src: string }) {
    const shown = useLocation().pathname === hotelRoute;

    return (
        // hidden by visibility, not unmounted or display:none: the client keeps its connection and its canvas
        <div className={`fixed inset-0 z-40 bg-black ${shown ? '' : 'invisible pointer-events-none'}`} aria-hidden={!shown}>
            <iframe
                src={src}
                title={hotelName}
                className="h-full w-full border-0"
                allow="fullscreen"
            />
            {shown && <SiteBar />}
        </div>
    );
}

/** The way back to the website, floating over the top of the game; folded away to a small tab so it covers
 * nothing. */
function SiteBar() {
    const [open, setOpen] = useState(true);
    const account = useAccount();

    if (!open) {
        return (
            <button type="button" aria-expanded={false} aria-label="Show site bar" onClick={() => setOpen(true)}
                className="absolute left-1/2 top-0 z-50 flex h-6 w-16 -translate-x-1/2 cursor-pointer items-center justify-center rounded-b-[12px] border-0 bg-[rgb(30_20_48/.86)] text-[#F7EBDF]">
                <Chevron down />
            </button>
        );
    }
    return (
        <nav aria-label="Site"
            className="absolute left-1/2 top-3 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-[rgb(30_20_48/.86)] p-1 shadow-[0_10px_30px_-12px_rgb(0_0_0/.7)] backdrop-blur-md">
            <Link className="pl pl-2" to="/me">
                <img className="pix" src="/pixel/key.png" alt="" width={23} height={23} />
                <span className="font-pixel text-[17px] font-bold">{hotelName}</span>
            </Link>
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-[rgb(255_244_230/.18)]" />
            <Link className="pl" to="/me">Me</Link>
            <Link className="pl" to="/news">News</Link>
            {account?.canManageInvites && <Link className="pl" to="/staff/invites">Invites</Link>}
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-[rgb(255_244_230/.18)]" />
            <button type="button" className="pl w-10 justify-center p-0" aria-expanded={true} aria-label="Hide site bar"
                onClick={() => setOpen(false)}>
                <Chevron />
            </button>
        </nav>
    );
}

function Chevron({ down }: { down?: boolean }) {
    return (
        <svg width="14" height="14" viewBox="0 0 7 7" aria-hidden="true" shapeRendering="crispEdges" fill="currentColor"
            style={down ? { transform: 'rotate(180deg)' } : undefined}>
            <rect x="3" y="2" width="1" height="1" /><rect x="2" y="3" width="3" height="1" /><rect x="1" y="4" width="2" height="1" />
            <rect x="4" y="4" width="2" height="1" />
        </svg>
    );
}
