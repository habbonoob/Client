/**
 * Formats dates with a locale and a pattern (LDML symbols: yyyy yy MMMM MMM MM M dd d EEEE EEE
 * HH H hh h mm m ss s a, 'quoted text'), using the browser's locale data for month and day names.
 */
export class DateTimeFormatter {
    readonly requestedLocaleIDName: string;
    #pattern: string;

    constructor(requestedLocaleIDName: string, dateStyle: string = 'long', timeStyle: string = 'long') {
        this.requestedLocaleIDName = requestedLocaleIDName;
        this.#pattern = stylePattern(dateStyle, timeStyle);
    }

    get actualLocaleIDName(): string {
        return this.#locale();
    }

    setDateTimePattern(pattern: string): void {
        this.#pattern = pattern;
    }

    getDateTimePattern(): string {
        return this.#pattern;
    }

    format(dateTime: Date): string {
        return formatPattern(this.#pattern, dateTime, this.#locale(), false);
    }

    formatUTC(dateTime: Date): string {
        return formatPattern(this.#pattern, dateTime, this.#locale(), true);
    }

    #locale(): string {
        const id = this.requestedLocaleIDName === 'i-default' ? navigator.language : this.requestedLocaleIDName.replace(/_/g, '-');
        try { return Intl.getCanonicalLocales(id)[0] ?? 'en-US'; } catch { return 'en-US'; }
    }
}

function stylePattern(dateStyle: string, timeStyle: string): string {
    const d: Record<string, string> = { long: 'MMMM d, yyyy', medium: 'MMM d, yyyy', short: 'M/d/yy', none: '' };
    const t: Record<string, string> = { long: 'h:mm:ss a', medium: 'h:mm:ss a', short: 'h:mm a', none: '' };
    return [d[dateStyle] ?? d.long, t[timeStyle] ?? t.long].filter(Boolean).join(' ');
}

function formatPattern(pattern: string, date: Date, locale: string, utc: boolean): string {
    const get = {
        y: utc ? date.getUTCFullYear() : date.getFullYear(),
        M: (utc ? date.getUTCMonth() : date.getMonth()) + 1,
        d: utc ? date.getUTCDate() : date.getDate(),
        H: utc ? date.getUTCHours() : date.getHours(),
        m: utc ? date.getUTCMinutes() : date.getMinutes(),
        s: utc ? date.getUTCSeconds() : date.getSeconds(),
    };
    const tz = utc ? 'UTC' : undefined;
    const name = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { ...opts, timeZone: tz }).format(date);
    const pad = (n: number, w: number) => String(n).padStart(w, '0');
    return pattern.replace(/'([^']*)'|y{1,4}|M{1,4}|d{1,2}|E{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|a/g, (tok, quoted: string | undefined) => {
        if (quoted !== undefined) return quoted === '' ? "'" : quoted;
        switch (tok[0]) {
            case 'y': return tok.length === 2 ? pad(get.y % 100, 2) : String(get.y);
            case 'M': return tok.length === 4 ? name({ month: 'long' }) : tok.length === 3 ? name({ month: 'short' }) : pad(get.M, tok.length);
            case 'd': return pad(get.d, tok.length);
            case 'E': return tok.length === 4 ? name({ weekday: 'long' }) : name({ weekday: 'short' });
            case 'H': return pad(get.H, tok.length);
            case 'h': return pad(get.H % 12 || 12, tok.length);
            case 'm': return pad(get.m, tok.length);
            case 's': return pad(get.s, tok.length);
            case 'a': return get.H < 12 ? 'AM' : 'PM';
        }
        return tok;
    });
}
