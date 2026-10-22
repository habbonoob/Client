import { definitionForName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

/**
 * A set of class definitions looked up by qualified name. The application's own classes form the
 * current domain (registered at startup); asset libraries loaded at runtime get a domain of their
 * own holding the definitions they provide.
 */
export class ApplicationDomain {
    static readonly #current = new ApplicationDomain(null, name => definitionForName(name));

    readonly parentDomain: ApplicationDomain | null;
    readonly #lookup: (name: string) => unknown;
    readonly #defined = new Map<string, unknown>();

    constructor(parentDomain: ApplicationDomain = null, lookup: (name: string) => unknown = () => undefined) {
        this.parentDomain = parentDomain;
        this.#lookup = lookup;
    }

    static get currentDomain(): ApplicationDomain {
        return ApplicationDomain.#current;
    }

    /** The definition registered under `name` ('a.b::C' or 'a.b.C'), here or in a parent domain. */
    getDefinition(name: string): any {
        const def = this.#find(name);
        if (def === undefined) throw new ReferenceError(`Variable ${name} is not defined.`);
        return def;
    }

    hasDefinition(name: string): boolean {
        return this.#find(name) !== undefined;
    }

    /** @internal A definition a loaded library provides in this domain (existing names are kept, as in Flash). */
    define(name: string, definition: unknown): void {
        if (this.#find(name) === undefined) this.#defined.set(name, definition);
    }

    #find(name: string): unknown {
        const inherited = this.parentDomain ? this.parentDomain.#find(name) : undefined;
        return inherited ?? this.#defined.get(name) ?? this.#lookup(name);
    }
}
