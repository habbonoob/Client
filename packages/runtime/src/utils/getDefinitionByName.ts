import { definitionForName } from './getQualifiedClassName';

/** The class registered under a qualified name ('a.b::C' or 'a.b.C'). */
export function getDefinitionByName(name: string): any {
    const def = definitionForName(name);
    if (def === undefined) throw new ReferenceError(`Variable ${name} is not defined.`);
    return def;
}
