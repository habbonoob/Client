// describeType: what a class or instance declares publicly, as the AS3 client reads it (its
// constants, variables, accessors, methods with their parameters and [Metadata], base classes and
// interfaces). The descriptions are generated from the AS3 declarations by the transpiler
// (src/generated/typeDescriptions.ts) and registered once at startup.

import { getQualifiedClassName } from './getQualifiedClassName';

export interface MetadataDescription {
    name: string;
    args: { key: string; value: string }[];
}

export interface MemberDescription {
    name: string;
    type: string;
    declaredBy: string;
    metadata: MetadataDescription[];
}

export interface AccessorDescription extends MemberDescription {
    access: 'readonly' | 'writeonly' | 'readwrite';
}

export interface MethodDescription extends MemberDescription {
    /** The return type. */
    parameters: { type: string; optional: boolean }[];
}

export interface TypeDescription {
    name: string;
    /** Describes a class (its static side, with the instance side in `factory`) rather than an instance. */
    isStatic: boolean;
    isInterface: boolean;
    bases: string[];
    interfaces: string[];
    constants: MemberDescription[];
    variables: MemberDescription[];
    accessors: AccessorDescription[];
    methods: MethodDescription[];
    /** For a class: what its instances declare. */
    factory: TypeDescription | null;
}

// Compact generated form. A member is [kind, name, type, metadata?, parameters?]:
// kind c const, v var, r/w/a read-only/write-only/read-write accessor, m method;
// parameters are [type, optional] pairs.
type Meta = [string, [string, string][]];
type RawMember = [kind: string, name: string, type: string, metadata?: Meta[], params?: [string, boolean][]];
export interface RawType {
    interface?: boolean;
    ext?: string;
    impls?: string[];
    statics?: RawMember[];
    instance?: RawMember[];
}

const types = new Map<string, RawType>();

export function registerTypeDescriptions(entries: Record<string, RawType>): void {
    for (const [name, raw] of Object.entries(entries)) types.set(name, raw);
}

/** A description of `value`: a class or interface (static side plus `factory`), or an instance. */
export function describeType(value: unknown): TypeDescription {
    const name = getQualifiedClassName(value);
    const isClass = typeof value === 'function' || typeof value === 'symbol';
    const instance = describeInstance(name);
    if (!isClass) return instance;
    const raw = types.get(name);
    const statics = members(raw?.statics ?? [], name);
    return {
        name, isStatic: true, isInterface: !!raw?.interface,
        bases: ['Class', 'Object'], interfaces: [],
        ...statics,
        factory: instance,
    };
}

function describeInstance(name: string): TypeDescription {
    const raw = types.get(name);
    const bases: string[] = [];
    const chain: [string, RawType][] = [];
    for (let n: string | undefined = name, r = raw; r; n = r.ext, r = n ? types.get(n) : undefined) {
        if (n !== name) bases.push(n!);
        chain.push([n!, r]);
    }
    if (!raw?.interface && bases[bases.length - 1] !== 'Object') bases.push('Object');
    const interfaces = new Set<string>();
    const addInterfaces = (list: string[] | undefined) => {
        for (const i of list ?? []) {
            if (interfaces.has(i)) continue;
            interfaces.add(i);
            addInterfaces(types.get(i)?.impls);
        }
    };
    // own declarations shadow inherited ones; an interface also lists what it extends
    const seen = new Set<string>();
    const all: [RawMember, string][] = [];
    const take = (list: RawMember[] | undefined, by: string) => {
        for (const m of list ?? []) if (!seen.has(m[1])) { seen.add(m[1]); all.push([m, by]); }
    };
    for (const [n, r] of chain) { take(r.instance, n); addInterfaces(r.impls); }
    if (raw?.interface) for (const i of interfaces) take(types.get(i)?.instance, i);
    const out = { constants: [], variables: [], accessors: [], methods: [] } as Pick<TypeDescription, 'constants' | 'variables' | 'accessors' | 'methods'>;
    for (const [m, by] of all) push(out, m, by);
    return {
        name, isStatic: false, isInterface: !!raw?.interface,
        bases: raw?.interface ? [] : bases, interfaces: raw?.interface ? [] : [...interfaces],
        ...out,
        factory: null,
    };
}

function members(list: RawMember[], by: string): Pick<TypeDescription, 'constants' | 'variables' | 'accessors' | 'methods'> {
    const out = { constants: [], variables: [], accessors: [], methods: [] } as Pick<TypeDescription, 'constants' | 'variables' | 'accessors' | 'methods'>;
    for (const m of list) push(out, m, by);
    return out;
}

function push(out: Pick<TypeDescription, 'constants' | 'variables' | 'accessors' | 'methods'>, m: RawMember, declaredBy: string): void {
    const [kind, name, type, meta, params] = m;
    const metadata = (meta ?? []).map(([n, args]) => ({ name: n, args: args.map(([key, value]) => ({ key, value })) }));
    const base = { name, type, declaredBy, metadata };
    switch (kind) {
        case 'c': out.constants.push(base); break;
        case 'v': out.variables.push(base); break;
        case 'm': out.methods.push({ ...base, parameters: (params ?? []).map(([t, optional]) => ({ type: t, optional })) }); break;
        default: out.accessors.push({ ...base, access: kind === 'r' ? 'readonly' : kind === 'w' ? 'writeonly' : 'readwrite' });
    }
}
