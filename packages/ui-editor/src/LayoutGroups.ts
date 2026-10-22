import type { LayoutEntry } from './LayoutEntry';

/** Where the client's source names things: the layout API's /api/usage answer. */
export interface SourceUsage {
    /** Each string, and the source files it is a literal in. */
    readonly files: Record<string, string[]>;
    /** Each of those files, and the files that import it. */
    readonly importers: Record<string, string[]>;
}

/** An element name in more layouts than this ("header", "close") says nothing about which one is meant. */
const COMMON_NAME = 8;
/** A file naming more layouts than this (a catalog-wide table) says little about any one of them. */
const BROAD_FILE = 12;
/** How much less a file counts when it only imports the file that names the piece (used when those name nothing). */
const IMPORT_HOP = 0.5;

/**
 * Which layouts are pieces of which. A hosted layout (one that draws into its parent, LayoutEntry.hosted) is added
 * into a window by the client's code; the window is found from that code: the source files that name the piece (or
 * import a class that does) name the layout it goes into, or an element of it (the list the items are added to:
 * "item_list_hc" is in layout_club_buy). Each candidate scores by how specific the hint is: a rare element name, a
 * file naming few layouts. A piece's parent may be a piece itself (an item of a widget of a page), so groups nest.
 */
export class LayoutGroups {
    /** A parent's pieces, sorted by name. */
    readonly childrenOf = new Map<LayoutEntry, LayoutEntry[]>();
    /** A piece's parent. */
    readonly parentOf = new Map<LayoutEntry, LayoutEntry>();

    static none(): LayoutGroups {
        return new LayoutGroups();
    }

    /** The strings to ask /api/usage about: layout names (with and without "_xml") and the elements' names. */
    static strings(entries: readonly LayoutEntry[], elementNames: Map<LayoutEntry, Set<string>>): string[] {
        const all = new Set<string>();
        for (const e of entries) {
            all.add(e.name);
            if (e.name.endsWith('_xml')) all.add(e.name.slice(0, -4));
        }
        for (const names of elementNames.values()) for (const n of names) all.add(n);
        return [...all];
    }

    static from(entries: readonly LayoutEntry[], elementNames: Map<LayoutEntry, Set<string>>, usage: SourceUsage): LayoutGroups {
        const groups = new LayoutGroups();
        // which layouts each string names: the layout itself (by either name), or those with an element of that name
        const layoutsNamed = new Map<string, LayoutEntry[]>();
        const elementOwners = new Map<string, LayoutEntry[]>();
        const push = <K, V>(map: Map<K, V[]>, key: K, value: V) => {
            let list = map.get(key);
            if (!list) map.set(key, list = []);
            list.push(value);
        };
        for (const e of entries) {
            push(layoutsNamed, e.name, e);
            if (e.name.endsWith('_xml')) push(layoutsNamed, e.name.slice(0, -4), e);
            for (const n of elementNames.get(e) ?? []) push(elementOwners, n, e);
        }
        // each file's strings
        const fileStrings = new Map<string, string[]>();
        for (const [s, files] of Object.entries(usage.files)) for (const f of files) push(fileStrings, f, s);
        const layoutsIn = (file: string) => new Set((fileStrings.get(file) ?? []).flatMap(s => layoutsNamed.get(s) ?? []));

        for (const child of entries) {
            if (!child.hosted || child.skinPart) continue;
            const names = child.name.endsWith('_xml') ? [child.name, child.name.slice(0, -4)] : [child.name];
            // the code naming the piece's own elements is about the piece, not where it goes
            const own = new Set([...names, ...elementNames.get(child) ?? []]);
            // what the files hint at: layouts they name, and layouts holding elements they name (a rare name more,
            // a file full of names less)
            // a file naming the piece is mostly its own class: its element names are the piece's, the layouts it names
            // its siblings (unless one is an ordinary window, built there with its pieces); the window the piece goes
            // into shows in the files that import that class
            const score = (files: Map<string, number>, among: Set<LayoutEntry> | null, ownClass: boolean): Map<LayoutEntry, number> => {
                const scores = new Map<LayoutEntry, number>();
                const add = (parent: LayoutEntry, value: number) => {
                    if (parent === child || parent.skinPart || (among && !among.has(parent))) return;
                    scores.set(parent, (scores.get(parent) ?? 0) + value);
                };
                for (const [file, weight] of files) {
                    const named = [...layoutsIn(file)].filter(l => l !== child && !(ownClass && l.hosted));
                    if (named.length <= BROAD_FILE) for (const parent of named) add(parent, weight / Math.max(1, named.length));
                    if (ownClass) continue;
                    const hints = (fileStrings.get(file) ?? []).filter(s => !own.has(s))
                        .map(s => (elementOwners.get(s) ?? []).filter(o => o !== child))
                        .filter(owners => owners.length > 0 && owners.length <= COMMON_NAME);
                    for (const owners of hints) for (const parent of owners) add(parent, (2 * weight) / owners.length / hints.length);
                }
                return scores;
            };
            const direct = new Map<string, number>();
            for (const n of names) for (const f of usage.files[n] ?? []) direct.set(f, 1);
            const hop = new Map<string, number>();
            for (const f of direct.keys()) for (const importer of usage.importers[f] ?? []) if (!direct.has(importer)) hop.set(importer, IMPORT_HOP);
            // a layout with an element named after the piece is where it is built into (a catalog page's widget slot)
            const slots = new Set(names.flatMap(n => elementOwners.get(n) ?? []).filter(o => o !== child && !o.skinPart));
            let best: LayoutEntry | null;
            if (slots.size === 1) {
                best = [...slots][0];
            } else if (slots.size > 1) {
                // several pages have the slot: the code's hints choose, else the first by name
                best = pick(score(direct, slots, true)) ?? pick(score(hop, slots, false)) ?? [...slots].sort((a, b) => a.name.localeCompare(b.name))[0];
            } else {
                best = pick(score(direct, null, true)) ?? pick(score(hop, null, false));
            }
            if (best) groups.parentOf.set(child, best);
        }
        // a piece cannot end up inside itself: a parent chain that comes back is cut where it closes
        for (const child of [...groups.parentOf.keys()]) {
            const seen = new Set<LayoutEntry>([child]);
            for (let at = groups.parentOf.get(child); at; at = groups.parentOf.get(at)) {
                if (seen.has(at)) {
                    groups.parentOf.delete(child);
                    break;
                }
                seen.add(at);
            }
        }
        for (const [child, parent] of groups.parentOf) push(groups.childrenOf, parent, child);
        for (const children of groups.childrenOf.values()) children.sort((a, b) => a.name.localeCompare(b.name));
        return groups;
    }
}

/** The highest-scoring layout (the first by name among equals); null when nothing scored. */
function pick(scores: Map<LayoutEntry, number>): LayoutEntry | null {
    let best: LayoutEntry | null = null;
    let bestScore = 0;
    for (const [parent, score] of scores) {
        if (score > bestScore || (score === bestScore && best && parent.name < best.name)) {
            best = parent;
            bestScore = score;
        }
    }
    return best;
}
