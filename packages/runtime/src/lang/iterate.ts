// `for each` and `for in` over a value whose type is only known at runtime: what they visit depends
// on what the value turns out to be.

import { Proxy } from '@habbo-pixi/runtime/utils/Proxy';

/** The values `for each` visits: a Map's values, an array's elements, an iterable's items, a Proxy's nextValue()s, or a plain object's property values. */
export function valuesOf(value: any): Iterable<any> {
    if (value == null) return [];
    if (value instanceof Map || Array.isArray(value)) return value.values();
    if (value instanceof Proxy) return proxyEnumeration(value, (p, i) => p.nextValue(i));
    if (typeof value === 'object' && typeof value[Symbol.iterator] === 'function') return value;
    return plainObject(value) ? Object.values(value) : [];
}

/** The names `for in` visits: a Map's keys, an array's indices, a Proxy's nextName()s, or a plain object's property names. */
export function keysOf(value: any): Iterable<any> {
    if (value == null) return [];
    if (value instanceof Map) return value.keys();
    if (value instanceof Proxy) return proxyEnumeration(value, (p, i) => p.nextName(i));
    return plainObject(value) || Array.isArray(value) ? Object.keys(value) : [];
}

/**
 * Whether a value has properties to enumerate: a plain object ({}, new Object(), parsed JSON) does;
 * an instance of a class does not, as in AS3, where only dynamic classes' instances have enumerable
 * properties (the client declares none), and a sealed class's fields are never visited.
 */
function plainObject(value: any): boolean {
    if (typeof value !== 'object') return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/** A Proxy enumerates itself: nextNameIndex(0) starts, 0 ends; names may repeat. */
function* proxyEnumeration(p: Proxy, at: (p: Proxy, index: number) => any): Generator<any> {
    for (let i = p.nextNameIndex(0); i !== 0; i = p.nextNameIndex(i)) yield at(p, i);
}
