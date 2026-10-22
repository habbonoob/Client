import { createContext, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';

/** One of Habbo's own pixel images (public/pixel), drawn at a whole-number scale of its native size. */
export function Pixel({ name, size, width, height, alt = '', className = '' }: {
    name: string; size?: number; width?: number; height?: number; alt?: string; className?: string;
}) {
    return <img className={`pix ${className}`} src={`/pixel/${name}.png`} alt={alt} width={width ?? size} height={height ?? size} />;
}

/** The three blinking squares of something on its way. */
export function Dots() {
    return <span className="dots" aria-hidden="true"><i /><i /><i /></span>;
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'quiet-danger';

export function Button({ variant = 'primary', small, busy, children, className = '', ...rest }:
    ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; small?: boolean; busy?: boolean }) {
    return (
        <button
            type="button"
            {...rest}
            aria-busy={busy || undefined}
            disabled={busy || rest.disabled}
            className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}
        >
            {busy && <Dots />}
            {children}
        </button>
    );
}

/** A labelled input with its hint, its error, or a "looks good". */
export function Field({ label, optional, hint, error, ok, className = '', ...input }: InputHTMLAttributes<HTMLInputElement> & {
    label: string; optional?: boolean; hint?: ReactNode; error?: ReactNode; ok?: ReactNode;
}) {
    const id = useId();
    const describedBy = error || ok || hint ? `${id}-m` : undefined;
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-[14px] font-bold">
                {label}{optional && <span className="font-normal text-ink-3"> (optional)</span>}
            </label>
            <input id={id} {...input} aria-invalid={error ? true : undefined} aria-describedby={describedBy}
                className={`input ${error ? 'err' : ok ? 'ok' : ''} ${className}`} />
            <Message id={describedBy} error={error} ok={ok} hint={hint} />
        </div>
    );
}

/** A password field with a show/hide toggle, and, while choosing one, how strong it is. */
export function PasswordField({ label, hint, error, strength, ...input }: InputHTMLAttributes<HTMLInputElement> & {
    label: string; hint?: ReactNode; error?: ReactNode; strength?: boolean;
}) {
    const id = useId();
    const [shown, setShown] = useState(false);
    const value = String(input.value ?? '');
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-[14px] font-bold">{label}</label>
            <div className="relative">
                <input id={id} {...input} type={shown ? 'text' : 'password'} aria-invalid={error ? true : undefined}
                    aria-describedby={`${id}-m`} className={`input pr-[68px] ${error ? 'err' : ''}`} />
                <button type="button" aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown}
                    onClick={() => setShown(!shown)}
                    className="absolute right-1 top-1 h-10 cursor-pointer rounded-lg border-0 bg-transparent px-3 text-[14px] font-bold text-accent">
                    {shown ? 'Hide' : 'Show'}
                </button>
            </div>
            {strength && value && !error ? <Strength id={`${id}-m`} password={value} />
                : <Message id={`${id}-m`} error={error} hint={hint} />}
        </div>
    );
}

/** How hard a password is to guess, roughly: length first, then a mix of kinds of characters. */
function Strength({ id, password }: { id: string; password: string }) {
    const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d]/].filter(kind => kind.test(password)).length;
    const score = password.length < 8 ? 1 : password.length >= 14 || kinds >= 3 ? 3 : 2;
    const [word, colour] = ([['Too short', 'var(--color-err)'], ['Fair', 'var(--color-primary)'], ['Good', 'var(--color-ok)']] as const)[score - 1];
    return (
        <div id={id} className="flex items-center gap-2.5">
            <div className="meter flex-1" aria-hidden="true">
                {[1, 2, 3].map(step => <i key={step} style={step <= score ? { background: colour } : undefined} />)}
            </div>
            <span className="text-[13px] font-bold" style={{ color: colour }}>{word}</span>
        </div>
    );
}

function Message({ id, error, ok, hint }: { id?: string; error?: ReactNode; ok?: ReactNode; hint?: ReactNode }) {
    if (error) return <span id={id} className="msg-err"><Mark kind="err" />{error}</span>;
    if (ok) return <span id={id} className="msg-ok"><Mark kind="ok" />{ok}</span>;
    if (hint) return <span id={id} className="hint">{hint}</span>;
    return null;
}

/** A small pixel mark beside a message: a cross, a tick or an "i". */
function Mark({ kind }: { kind: 'err' | 'ok' | 'info' }) {
    const cells = {
        err: ['1000001', '0100010', '0010100', '0001000', '0010100', '0100010', '1000001'],
        ok: ['0000001', '0000010', '0000100', '1001000', '0110000', '0010000', '0000000'],
        info: ['0001000', '0000000', '0011000', '0001000', '0001000', '0001000', '0011100'],
    }[kind];
    return (
        <svg width="14" height="14" viewBox="0 0 7 7" aria-hidden="true" className="mt-[3px] shrink-0" shapeRendering="crispEdges">
            {cells.flatMap((row, y) => [...row].map((on, x) => on === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null))}
        </svg>
    );
}

/** A tinted message: what went wrong, a heads-up, or that something worked. */
export function Notice({ tone = 'err', title, children }: { tone?: 'err' | 'info' | 'ok'; title: ReactNode; children?: ReactNode }) {
    const style = { err: 'bg-err-soft text-err', info: 'bg-info-soft text-info', ok: 'bg-ok-soft text-ok' }[tone];
    return (
        <div role={tone === 'err' ? 'alert' : 'status'} className={`flex items-start gap-3 rounded-[12px] px-4 py-3.5 ${style}`}>
            <Mark kind={tone === 'info' ? 'info' : tone} />
            <div><strong>{title}</strong>{children && <> <span className="text-ink">{children}</span></>}</div>
        </div>
    );
}

export function Tag({ tone = 'quiet', children, className = '' }: { tone?: 'quiet' | 'staff' | 'warm'; children: ReactNode; className?: string }) {
    const style = { quiet: 'bg-surface-2 text-ink-3', staff: 'bg-accent-soft text-accent', warm: 'bg-primary-soft text-primary-ink' }[tone];
    return <span className={`tag ${style} ${className}`}>{children}</span>;
}

/** A section heading in the display face, with an optional link on the right. */
export function SectionHeading({ id, children, aside }: { id?: string; children: ReactNode; aside?: ReactNode }) {
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id={id} className="m-0 font-display text-[30px] leading-9 font-bold tracking-[-0.02em]">{children}</h2>
            {aside}
        </div>
    );
}

const ToastContext = createContext<(text: string) => void>(() => undefined);

/** Says a short thing at the bottom of the page for a few seconds (copied a code, and the like). */
export function useToast(): (text: string) => void {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [text, setText] = useState<string | null>(null);
    const hovered = useRef(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const hide = useCallback(() => {
        if (hovered.current) timer.current = setTimeout(hide, 1000);
        else setText(null);
    }, []);
    const show = useCallback((next: string) => {
        clearTimeout(timer.current);
        setText(next);
        timer.current = setTimeout(hide, 4000);
    }, [hide]);
    useEffect(() => () => clearTimeout(timer.current), []);

    return (
        <ToastContext.Provider value={show}>
            {children}
            <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4" aria-live="polite">
                {text && (
                    <div role="status" onMouseEnter={() => (hovered.current = true)} onMouseLeave={() => (hovered.current = false)}
                        className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-plum py-2.5 pl-4 pr-3 text-[15px] font-semibold text-on-plum shadow-lifted">
                        <Mark kind="ok" />{text}
                        <button type="button" aria-label="Dismiss" onClick={() => setText(null)}
                            className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent text-[18px] leading-none text-on-plum-2">×</button>
                    </div>
                )}
            </div>
        </ToastContext.Provider>
    );
}
