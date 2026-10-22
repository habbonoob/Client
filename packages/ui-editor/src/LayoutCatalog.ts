import { embeddedPath } from '@habbo-pixi/runtime/embed/embed';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibrary } from '@/com/sulake/core/assets/AssetLibrary';
import { LayoutDocument } from './LayoutDocument';
import type { LayoutEntry } from './LayoutEntry';

/** A component class ("…Com"): its manifest is an embedded file of component and asset declarations. */
interface ComponentClass {
    readonly name: string;
    readonly manifest: unknown;
}

/** Root elements of a window layout asset (a <layout>, or a bare window tree). */
const LAYOUT_ROOTS = new Set(['layout', 'window']);

/**
 * Every window layout in the client, found as the core finds component assets: each component class's manifest
 * declares its assets, and each component gets an asset library over them (built here without starting the
 * component). A layout is a text/xml asset whose root is a layout.
 */
export class LayoutCatalog {
    readonly entries: LayoutEntry[];

    private constructor(entries: LayoutEntry[]) {
        this.entries = entries;
    }

    /** The layouts of these component classes (the client's modules, as loaded: each one's exports). */
    static fromModules(modules: Record<string, Record<string, unknown>>): LayoutCatalog {
        const entries: Omit<LayoutEntry, 'skinPart' | 'hosted'>[] = [];
        for (const [path, exports] of Object.entries(modules)) {
            if (!/\/\w+Com\.ts$/.test(path)) continue;
            for (const value of Object.values(exports)) {
                if (typeof value === 'function' && 'manifest' in value) entries.push(...LayoutCatalog.#layoutsOf(value as unknown as ComponentClass));
            }
        }
        const skinParts = LayoutCatalog.#skinParts(entries);
        const marked = entries.map(e => ({ ...e, skinPart: skinParts.has(e.name), hosted: isHosted(e.source()) }));
        marked.sort((a, b) => a.owner.localeCompare(b.owner) || Number(a.skinPart) - Number(b.skinPart) || a.name.localeCompare(b.name));
        return new LayoutCatalog(marked);
    }

    /** The layouts the window skins use for their elements: window_layout in the skins' element description. */
    static #skinParts(entries: Omit<LayoutEntry, 'skinPart' | 'hosted'>[]): Set<string> {
        const parts = new Set<string>();
        const owner = entries.find(e => e.library.hasAsset('habbo_element_description_xml'));
        const description = owner?.library.getAssetByName('habbo_element_description_xml');
        const xml = description?.content as XML | null;
        if (!xml) return parts;
        for (const m of xml.toXMLString().matchAll(/window_layout="([^"]+)"/g)) parts.add(m[1]);
        return parts;
    }

    static #layoutsOf(com: ComponentClass): Omit<LayoutEntry, 'skinPart' | 'hosted'>[] {
        const manifest = LayoutCatalog.#manifest(com);
        if (!manifest) return [];
        const found: Omit<LayoutEntry, 'skinPart' | 'hosted'>[] = [];
        const components = manifest.child('component');
        for (let i = 0; i < components.length(); i++) {
            const component = components.getProperty(i);
            const assets = component.child('assets');
            if (assets.length() === 0) continue;
            // the library the core makes for the component (ComponentContext.prepareComponent)
            const declaration = new XML('<manifest><library /></manifest>');
            declaration.child('library').appendChild(assets);
            declaration.child('library').appendChild(component.child('aliases'));
            const library = new AssetLibrary(`_assets@${component.attribute('class').toString()}`, declaration);
            library.loadFromResource(declaration, com);
            for (const asset of assets.child('asset') ?? []) {
                if (asset.attribute('mimeType').toString() !== 'text/xml') continue;
                const name = asset.attribute('name').toString();
                let root: string | null = null;
                try {
                    root = (library.getAssetByName(name)?.content as XML | null)?.localName() ?? null;
                } catch {
                    continue;
                }
                if (!root || !LAYOUT_ROOTS.has(root)) continue;
                // the asset's content comes from the component class's static of the same name (an embedded file)
                const file = (com as unknown as Record<string, unknown>)[name];
                const packPath = embeddedPath(file);
                const source = () => packPath
                    ? textOf(file as new () => ByteArray)
                    : (library.getAssetByName(name)?.content as XML).toXMLString();
                found.push({ name, owner: com.name, library, packPath, source });
            }
        }
        return found;
    }

    /** The class's manifest XML (embedded bytes, or XML already). */
    static #manifest(com: ComponentClass): XML | null {
        const m = com.manifest;
        if (m instanceof XML) return m;
        if (typeof m !== 'function') return null;
        return new XML(textOf(m as new () => ByteArray));
    }
}

/** use_parent_graphic_context, as a params flag. */
const USE_PARENT_GRAPHIC_CONTEXT = 0x10;

/** Whether a layout's root window draws into its parent (params, or a named <param>, say so). */
export function isHosted(source: string): boolean {
    try {
        const root = LayoutDocument.parse(source).topElements()[0];
        if (!root) return false;
        if ((Number(root.getAttribute('params')) & USE_PARENT_GRAPHIC_CONTEXT) !== 0) return true;
        const params = [...root.children].find(c => c.tagName === 'params');
        return !!params && [...params.children].some(p => p.getAttribute('name') === 'use_parent_graphic_context');
    } catch {
        return false;
    }
}

/** An embedded file's text. */
function textOf(file: new () => ByteArray): string {
    const bytes = new file();
    return bytes.readUTFBytes(bytes.length);
}
