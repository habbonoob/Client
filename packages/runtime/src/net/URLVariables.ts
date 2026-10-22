/**
 * Name/value pairs for a query string or form body. Variables are plain properties of the object;
 * an array value becomes repeated `name=value` pairs.
 */
export class URLVariables {
    [name: string]: any;

    constructor(source: string = null) {
        if (source != null) this.decode(source);
    }

    /** Add the variables of an `a=1&b=2` string (a repeated name collects its values in an array). */
    decode(source: string): void {
        for (const part of source.split('&')) {
            if (!part) continue;
            const eq = part.indexOf('=');
            if (eq < 0) throw new Error('The String passed to URLVariables.decode() must be a URL-encoded query string containing name/value pairs.');
            const name = decodeURIComponent(part.slice(0, eq).replace(/\+/g, ' '));
            const value = decodeURIComponent(part.slice(eq + 1).replace(/\+/g, ' '));
            const prev = this[name];
            this[name] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [prev, value];
        }
    }

    toString(): string {
        const parts: string[] = [];
        for (const name of Object.keys(this)) {
            const value = this[name];
            for (const v of Array.isArray(value) ? value : [value]) parts.push(`${encodeURIComponent(name)}=${encodeURIComponent(String(v))}`);
        }
        return parts.join('&');
    }
}
