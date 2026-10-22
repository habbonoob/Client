import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useAccount } from '@/session';
import { Pixel } from '@/ui';

/** A link to nowhere. */
export function NotFound() {
    const account = useAccount();

    return (
        <Stopped art={<Pixel name="puzzled" width={180} height={256} />} label="Error 404" title="There's no room 404">
            <p className="m-0 max-w-[460px] text-[18px] text-ink-2">
                This hallway doesn't lead anywhere. The page may have moved, or the link has a typo in it.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link className="btn btn-primary" to={account ? '/me' : '/'}>Back to the lobby</Link>
                <Link className="btn btn-secondary" to="/news">Read the news</Link>
            </div>
        </Stopped>
    );
}

/** The website can't reach the hotel: closed for maintenance, or down. */
export function Maintenance({ onRetry, retrying }: { onRetry: () => void; retrying: boolean }) {
    return (
        <Stopped art={<Pixel name="frank-plaster" width={171} height={177} />} label="Maintenance" title="Closed for a quick tidy-up">
            <p className="m-0 max-w-[460px] text-[18px] text-ink-2">
                We're fixing a few things behind the front desk. Your room, your things and your credits are safe. Pop back in a little while.
            </p>
            <button type="button" className="btn btn-primary" onClick={onRetry} aria-busy={retrying || undefined}>
                {retrying ? 'Checking…' : 'Try again'}
            </button>
            <p className="m-0 text-[14px] text-ink-3">Still closed? Ask in your group chat; someone probably knows why.</p>
        </Stopped>
    );
}

function Stopped({ art, label, title, children }: { art: ReactNode; label: string; title: string; children: ReactNode }) {
    return (
        <main className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-6 pb-24 pt-16 text-center">
            {art}
            <span className="lab">{label}</span>
            <h1 className="m-0 font-display text-[40px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[48px]">{title}</h1>
            {children}
        </main>
    );
}
