// getQualifiedClassName, and the name registry it reads. Every converted class registers itself
// from a static block as its module loads, and every runtime-tested interface registers its brand.

/** Class (or interface brand) → 'package::Name', the form getQualifiedClassName returns. */
const names = new Map<unknown, string>();
/** 'package.Name' → class (or interface brand), the form component manifests name them by. */
const definitions = new Map<string, unknown>();

/** Register a class (or interface brand) under its 'package::Name'. */
export function registerClassName(value: unknown, name: string): void {
    names.set(value, name);
    definitions.set(name.replace('::', '.'), value);
}

/** Lookup for getDefinitionByName: accepts 'a.b::C' and 'a.b.C'. */
export function definitionForName(name: string): unknown {
    return definitions.get(name.replace('::', '.'));
}

/**
 * The fully qualified class name of a value, or of a class passed directly: 'package::Name', or
 * just 'Name' at the top level. Integral numbers in the 32-bit range give 'int'.
 */
export function getQualifiedClassName(value: any): string {
    switch (typeof value) {
        case 'number': return (value | 0) === value ? 'int' : 'Number';
        case 'string': return 'String';
        case 'boolean': return 'Boolean';
        case 'undefined': return 'void';
        case 'symbol': return names.get(value) ?? value.description ?? 'Object';
        case 'function': return names.get(value) ?? (value.prototype && value.name || 'Function');
        default: return value === null ? 'null' : names.get(value.constructor) ?? value.constructor?.name ?? 'Object';
    }
}
