// as3corelib's JSON decoder (adobe.serialization.json.JSONDecoder), which the client was compiled
// with. Its strict mode is standard JSON plus comments; its lenient mode also takes leading and
// trailing commas, NaN, 0x hex numbers, non-breaking spaces as whitespace, raw control characters
// in strings, and ignores whatever follows the value. Input JSON.parse accepts decodes to the same
// value, so that is tried first; the parser below handles the rest.

/** The decoded value of a JSON text; parse errors throw a SyntaxError. */
export class JSONDecoder {
    readonly #value: any;

    constructor(text: string, strict: boolean) {
        if (text == null) throw new TypeError('Cannot decode null as JSON');
        try {
            this.#value = JSON.parse(text);
        } catch {
            this.#value = new Parser(text, strict).parseText();
        }
    }

    getValue(): any {
        return this.#value;
    }
}

const ESCAPES: Record<string, string> = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };

class Parser {
    readonly #text: string;
    readonly #strict: boolean;
    #pos = 0;

    constructor(text: string, strict: boolean) {
        this.#text = text;
        this.#strict = strict;
    }

    parseText(): any {
        const value = this.#value();
        if (this.#strict && this.#skipIgnored() !== '') this.#fail('Unexpected characters left in input stream');
        return value;
    }

    #fail(message: string): never {
        throw new SyntaxError(`${message} (at position ${this.#pos} of JSON input)`);
    }

    /** Skip whitespace and comments, and return the character then at the position ('' at the end). */
    #skipIgnored(): string {
        const text = this.#text;
        while (this.#pos < text.length) {
            const ch = text[this.#pos];
            if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r' || (!this.#strict && ch === ' ')) {
                this.#pos++;
            } else if (ch === '/') {
                const next = text[this.#pos + 1];
                if (next === '/') {
                    const end = text.indexOf('\n', this.#pos + 2);
                    this.#pos = end < 0 ? text.length : end + 1;
                } else if (next === '*') {
                    const end = text.indexOf('*/', this.#pos + 2);
                    if (end < 0) { this.#pos = text.length; this.#fail('Multi-line comment not closed'); }
                    this.#pos = end + 2;
                } else {
                    this.#pos++;
                    this.#fail(`Unexpected ${next ?? ''} encountered (expecting '/' or '*')`);
                }
            } else {
                return ch;
            }
        }
        return '';
    }

    #value(): any {
        const ch = this.#skipIgnored();
        switch (ch) {
            case '{': this.#pos++; return this.#object();
            case '[': this.#pos++; return this.#array();
            case '"': return this.#string();
            case 't': return this.#literal('true', true);
            case 'f': return this.#literal('false', false);
            case 'n': return this.#literal('null', null);
            case 'N':
                if (this.#strict) this.#fail('Unexpected NaN');
                return this.#literal('NaN', NaN);
            case '': this.#fail('Unexpected end of input');
        }
        if (ch === '-' || (ch >= '0' && ch <= '9')) return this.#number();
        this.#fail(`Unexpected ${ch} encountered`);
    }

    #literal<T>(word: string, value: T): T {
        const found = this.#text.substr(this.#pos, word.length);
        if (found !== word) this.#fail(`Expecting '${word}' but found ${found}`);
        this.#pos += word.length;
        return value;
    }

    /** After a separator's comma: in lenient mode a closing bracket may follow (a trailing comma). */
    #closesAfterComma(close: string): boolean {
        if (this.#strict || this.#skipIgnored() !== close) return false;
        this.#pos++;
        return true;
    }

    /** At the start of a list: in lenient mode a lone comma may stand for the empty list. */
    #emptyWithComma(close: string, kind: string): boolean {
        if (this.#strict || this.#skipIgnored() !== ',') return false;
        this.#pos++;
        if (this.#skipIgnored() !== close) this.#fail(`Leading commas are not supported. Expecting '${close}' in ${kind}`);
        this.#pos++;
        return true;
    }

    #object(): any {
        const object: any = {};
        if (this.#skipIgnored() === '}') { this.#pos++; return object; }
        if (this.#emptyWithComma('}', 'object')) return object;
        for (;;) {
            if (this.#skipIgnored() !== '"') this.#fail('Expecting string');
            const key = this.#string();
            if (this.#skipIgnored() !== ':') this.#fail('Expecting :');
            this.#pos++;
            const value = this.#value();
            // an own property, as JSON.parse makes it, even for '__proto__'
            Object.defineProperty(object, key, { value, writable: true, enumerable: true, configurable: true });
            const next = this.#skipIgnored();
            this.#pos++;
            if (next === '}') return object;
            if (next !== ',') this.#fail('Expecting } or ,');
            if (this.#closesAfterComma('}')) return object;
        }
    }

    #array(): any[] {
        const array: any[] = [];
        if (this.#skipIgnored() === ']') { this.#pos++; return array; }
        if (this.#emptyWithComma(']', 'array')) return array;
        for (;;) {
            array.push(this.#value());
            const next = this.#skipIgnored();
            this.#pos++;
            if (next === ']') return array;
            if (next !== ',') this.#fail('Expecting ] or ,');
            if (this.#closesAfterComma(']')) return array;
        }
    }

    #string(): string {
        const text = this.#text;
        const start = this.#pos + 1;
        let end = start;
        let out = '';
        for (;;) {
            const quote = text.indexOf('"', end);
            const slash = text.indexOf('\\', end);
            if (quote < 0) this.#fail('Unterminated string literal');
            if (slash < 0 || slash > quote) { out += text.slice(end, quote); end = quote; break; }
            out += text.slice(end, slash);
            const escape = text[slash + 1];
            if (escape === 'u') {
                const hex = text.substr(slash + 2, 4);
                if (!/^[0-9a-fA-F]{4}$/.test(hex)) { this.#pos = slash; this.#fail('Expecting 4 hex digits after \\u'); }
                out += String.fromCharCode(parseInt(hex, 16));
                end = slash + 6;
            } else {
                // an unknown escape is kept as written
                out += ESCAPES[escape] ?? '\\' + escape;
                end = slash + 2;
            }
        }
        if (this.#strict && /[\x00-\x1f]/.test(text.slice(start, end))) {
            this.#fail('String contains unescaped control character (0x00-0x1F)');
        }
        this.#pos = end + 1;
        return out;
    }

    #number(): number {
        const text = this.#text;
        const start = this.#pos;
        const digits = () => { const from = this.#pos; while (text[this.#pos] >= '0' && text[this.#pos] <= '9') this.#pos++; return this.#pos > from; };
        const negative = text[this.#pos] === '-';
        if (negative) this.#pos++;
        if (!(text[this.#pos] >= '0' && text[this.#pos] <= '9')) this.#fail('Expecting a digit');
        if (text[this.#pos] === '0') {
            this.#pos++;
            if (text[this.#pos] >= '0' && text[this.#pos] <= '9') this.#fail('A digit cannot immediately follow 0');
            if (!this.#strict && text[this.#pos] === 'x') {
                const hex = /^[0-9a-fA-F]+/.exec(text.slice(++this.#pos))?.[0];
                if (!hex) this.#fail('Number in hex format requires at least one hex digit after "0x"');
                this.#pos += hex.length;
                if (text[this.#pos] === '.') this.#fail(`Number ${text.slice(start, this.#pos + 1)} is not valid`);
                return (negative ? -1 : 1) * parseInt(hex, 16);
            }
        } else {
            digits();
        }
        if (text[this.#pos] === '.') {
            this.#pos++;
            if (!digits()) this.#fail('Expecting a digit');
        }
        if (text[this.#pos] === 'e' || text[this.#pos] === 'E') {
            this.#pos++;
            if (text[this.#pos] === '+' || text[this.#pos] === '-') this.#pos++;
            if (!digits()) this.#fail('Scientific notation number needs exponent value');
        }
        const value = Number(text.slice(start, this.#pos));
        if (!Number.isFinite(value)) this.#fail(`Number ${value} is not valid`);
        return value;
    }
}
