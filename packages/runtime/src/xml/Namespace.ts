/** Namespace (top-level AS3 class): an XML namespace, a URI with an optional prefix. */
export class Namespace {
    readonly prefix: string | undefined;
    readonly uri: string;

    /** `new Namespace(uri)` or `new Namespace(prefix, uri)`. */
    constructor(a: any = '', b?: any) {
        if (b === undefined) {
            if (a instanceof Namespace) { this.prefix = a.prefix; this.uri = a.uri; return; }
            this.uri = a == null ? '' : String(a);
            this.prefix = this.uri === '' ? '' : undefined;
            return;
        }
        this.prefix = a == null ? undefined : String(a);
        this.uri = b instanceof Namespace ? b.uri : String(b);
    }

    toString(): string {
        return this.uri;
    }

    valueOf(): string {
        return this.uri;
    }
}
