/** QName (top-level AS3 class): a name qualified by a namespace URI. */
export class QName {
    readonly uri: string | null;
    readonly localName: string;

    /** `new QName(localName)`, `new QName(uri, localName)`, or `new QName(namespace, localName)`. */
    constructor(a: any = '', b?: any) {
        if (b === undefined) {
            if (a instanceof QName) { this.uri = a.uri; this.localName = a.localName; return; }
            this.uri = '';
            this.localName = a == null ? '' : String(a);
            return;
        }
        this.uri = a == null ? null : typeof a === 'object' && 'uri' in a ? String(a.uri) : String(a);
        this.localName = b instanceof QName ? b.localName : String(b);
    }

    toString(): string {
        return this.uri ? `${this.uri}::${this.localName}` : this.localName;
    }

    valueOf(): QName {
        return this;
    }
}
