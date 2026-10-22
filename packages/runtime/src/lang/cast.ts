// Checked casts. `x as T` is written inline (`x instanceof T ? x : null`) when x is side-effect
// free, and through asInstanceOf/asGuarded when it is not (a call, a getter, `new`). Explicit
// conversions `T(x)` go through castTo/castGuarded, which throw as AS3 does.

import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

/** `value` when it is an instance of `type`, otherwise null. */
export function asInstanceOf<T>(value: unknown, type: abstract new (...args: any[]) => T): T | null {
    return value instanceof type ? value : null;
}

/** `value` when `guard` accepts it, otherwise null. */
export function asGuarded<T>(value: unknown, guard: (value: unknown) => value is T): T | null {
    return guard(value) ? value : null;
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === 'function';
}

export function isClass(value: unknown): value is new (...args: any[]) => any {
    return typeof value === 'function';
}

/** A number with an integral value in the signed 32-bit range. */
export function isInt(value: unknown): value is number {
    return typeof value === 'number' && (value | 0) === value;
}

/** A number with an integral value in the unsigned 32-bit range. */
export function isUint(value: unknown): value is number {
    return typeof value === 'number' && value >>> 0 === value;
}

/**
 * An explicit conversion `T(value)` to a class: value itself when it is null or a T, otherwise
 * a TypeError. undefined converts to null.
 */
export function castTo<T>(value: unknown, type: abstract new (...args: any[]) => T): T | null {
    if (value == null) return null;
    if (value instanceof type) return value;
    throw coercionFailed(value, getQualifiedClassName(type).replace('::', '.'));
}

/** An explicit conversion `IFoo(value)` to an interface, as castTo. */
export function castGuarded<T>(value: unknown, guard: (value: unknown) => value is T, typeName: string): T | null {
    if (value == null) return null;
    if (guard(value)) return value;
    throw coercionFailed(value, typeName);
}

function coercionFailed(value: unknown, typeName: string): TypeError {
    return new TypeError(`Cannot convert ${getQualifiedClassName(value)} to ${typeName}`);
}

/** A value stored where a String is declared: its string form, with null and undefined as null. */
export function stringOrNull(value: unknown): string | null {
    return value == null ? null : String(value);
}
