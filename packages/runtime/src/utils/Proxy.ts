import { QName } from '@habbo-pixi/runtime/xml/QName';

/**
 * A class whose instances intercept access to names they don't declare (AS3's flash.utils.Proxy).
 * Subclasses override the handler methods below. A JS Proxy sits in the prototype chain, above every class's own
 * prototype: a name the instance or its classes declare (a field, a method, an accessor) is found before it and
 * read at a plain property's cost, and only a name none of them has falls through to it, which routes
 *  - reads to getProperty (undefined when it doesn't know the name, as in AS3); the Object methods (toString,
 *    valueOf, …) getProperty doesn't supply are functions that invoke callProperty, since those are called rather
 *    than read,
 *  - writes to setProperty.
 * for each / for in go through nextNameIndex / nextName / nextValue (lang/iterate.ts).
 *
 * The proxy used to wrap each instance, so every member read (and, inside the methods, every read of a field
 * through `this`) went through a trap: a room's maps made a million trap calls a second. In the prototype chain
 * the proxy is not asked about the instance itself, so `in` and `delete` act on the instance's own properties and
 * do not reach hasProperty / deleteProperty; the client does neither to its proxies.
 */
export class Proxy {
    callProperty(name: any, ...rest: any[]): any {
        void rest;
        throw new TypeError(`${String(name)} is not a function.`);
    }

    getProperty(name: any): any {
        void name;
        return undefined;
    }

    setProperty(name: any, value: any): void {
        void name;
        void value;
        throw new ReferenceError(`Cannot create property ${String(name)} on ${this.constructor.name}.`);
    }

    hasProperty(name: any): boolean {
        void name;
        return false;
    }

    deleteProperty(name: any): boolean {
        void name;
        return false;
    }

    getDescendants(name: any): any {
        void name;
        return undefined;
    }

    isAttribute(name: any): boolean {
        void name;
        return false;
    }

    /** Index of the next enumerable name after `index` (0 starts; 0 returned ends). */
    nextNameIndex(index: number): number {
        void index;
        return 0;
    }

    nextName(index: number): string {
        void index;
        return undefined;
    }

    nextValue(index: number): any {
        void index;
        return undefined;
    }
}

/**
 * The name a trap hands on: JS turns `proxy[6]` into "6", so an integer name goes back to the
 * number. (AS3's Dictionary, which proxies like the client's Map keep their entries in, treats 6
 * and "6" as one key; the JS Map they become does not.)
 */
function nameOf(prop: string): string | number {
    // what /^(0|-?[1-9]\d{0,15})$/ accepts, read by character: a regular expression here made garbage on every
    // access, and a room's maps are read thousands of times a frame
    const length = prop.length;
    if (length === 0 || length > 17) return prop;
    let at = prop.charCodeAt(0) === 45 ? 1 : 0;   // '-'
    const first = prop.charCodeAt(at);
    if (first === 48) return length === 1 ? 0 : prop;   // "0" alone; no leading zeros, no "-0"
    if (first < 49 || first > 57 || length - at > 16) return prop;
    for (at++; at < length; at++) {
        const c = prop.charCodeAt(at);
        if (c < 48 || c > 57) return prop;
    }
    const n = Number(prop);
    return Number.isSafeInteger(n) ? n : prop;
}

/** Reached only for names the instance and its classes do not have; `receiver` is the instance. */
const handler: ProxyHandler<object> = {
    get(target, prop, receiver) {
        if (typeof prop === 'symbol') return Reflect.get(target, prop, receiver);
        const value = (receiver as Proxy).getProperty(nameOf(prop));
        if (value !== undefined || !(prop in Object.prototype)) return value;
        return (...args: any[]) => (receiver as Proxy).callProperty(new QName('', prop), ...args);
    },
    set(target, prop, value, receiver) {
        // a symbol (a runtime mark, say) is the instance's own, as on any object
        if (typeof prop === 'symbol') return Reflect.defineProperty(receiver, prop, { value, writable: true, configurable: true });
        (receiver as Proxy).setProperty(nameOf(prop), value);
        return true;
    },
};

// the class's own members are found first; what none of its subclasses declares reaches the handler
Object.setPrototypeOf(Proxy.prototype, new globalThis.Proxy(Object.create(Object.prototype), handler));
