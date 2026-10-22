// HAB asset libraries: the web form of the client's SWF asset libraries, as Sulake's JS client
// (js-client) reads them. A library the client loads as "X.swf" is fetched as "X.hab" from the
// same place. Its content becomes what the SWF provided: a library class named after the file with
// a static `manifest` (manifest XML bytes) and one static class per asset (XML → ByteArray,
// image → Bitmap), which the client's LibraryLoader and AssetLibrary read unchanged.
//
// File layout: "HAB\0", version u16 (1), flags u16 (1), index length u32 (deflated), index length
// u32 (inflated), payload length u32; then the deflated JSON index, then the payload. The index is
// { format: "hab", version: 1, name?, manifest?, aliases?, definitions?, entries: [{ name, mimeType,
// offset, storedLength, originalLength, compression: "none" | "deflate", params? }] }.
//
// Bundles come in two shapes:
//  - a converted SWF library (HabboRoomContent): a manifest and one entry per asset;
//  - a room object (furni, pets, cursors): "<name>.json" (the SWF's index/logic/visualization/assets
//    XML merged into JSON, plus a sprite-sheet description) and "<name>.png" (the sprite sheet).
//    The XML documents are rebuilt from the JSON and the bitmaps cut from the sheet, exactly as
//    js-client does.

import { inflateSync, unzlibSync } from 'fflate';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Bitmap } from './Bitmap';
import { BitmapData } from './BitmapData';

const MAGIC = 'HAB\0';
const VERSION = 1;
const FLAGS = 1;
const HEADER = 20;
const MAX_INDEX = 64 * 1024 * 1024;
const MAX_ENTRIES = 100_000;

export interface HabEntry { name: string; mimeType: string; bytes: Uint8Array; params?: Record<string, string> }
export interface HabBundle {
    name?: string;
    manifest?: string;
    aliases?: { name: string; ref: string; flipH?: boolean; flipV?: boolean }[];
    entries: HabEntry[];
}

/** Whether bytes start with the HAB signature. */
export function isHab(d: Uint8Array): boolean {
    return d.length >= 4 && d[0] === 0x48 && d[1] === 0x41 && d[2] === 0x42 && d[3] === 0;
}

/** The candidate HAB URLs for a library URL, in the order js-client tries them. */
export function habUrls(url: string): string[] {
    const [path, query = ''] = url.split('?');
    const q = query ? `?${query}` : '';
    const out: string[] = [];
    if (/\.hab$/i.test(path)) out.push(url);
    else if (/\.swf$/i.test(path)) out.push(`${path.slice(0, -4)}.hab${q}`);
    // a local library may also have been converted into the generated folder, in kebab case
    const local = /^(.*)\/local_include\/([^/]+)\.swf$/i.exec(path.replace(/\\/g, '/'));
    if (local && local[2]) {
        const kebab = local[2].replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').replace(/_/g, '-').toLowerCase();
        const generated = `${local[1]}/generated/${kebab}.hab${q}`;
        if (!out.includes(generated)) out.push(generated);
    }
    return out;
}

/** Read a HAB file. Throws on anything malformed. */
export function readHab(d: Uint8Array): HabBundle {
    if (d.byteLength < HEADER) throw new Error('HAB asset bundle is shorter than its header.');
    if (!isHab(d)) throw new Error('HAB asset bundle has an invalid magic signature.');
    const view = new DataView(d.buffer, d.byteOffset, d.byteLength);
    const version = view.getUint16(4, true), flags = view.getUint16(6, true);
    const storedIndex = view.getUint32(8, true), indexLength = view.getUint32(12, true), payloadLength = view.getUint32(16, true);
    if (version !== VERSION) throw new Error(`Unsupported HAB asset bundle version ${version}.`);
    if (flags !== FLAGS) throw new Error(`Unsupported HAB asset bundle flags 0x${flags.toString(16)}.`);
    if (indexLength > MAX_INDEX) throw new Error(`HAB asset bundle index exceeds the ${MAX_INDEX}-byte safety limit.`);
    const payloadStart = HEADER + storedIndex;
    if (payloadStart + payloadLength !== d.byteLength) throw new Error(`HAB asset bundle length mismatch: expected ${payloadStart + payloadLength}, received ${d.byteLength}.`);
    const indexBytes = inflate(d.subarray(HEADER, payloadStart));
    if (indexBytes.byteLength !== indexLength) throw new Error(`HAB asset bundle index length mismatch: expected ${indexLength}, decoded ${indexBytes.byteLength}.`);
    let index: any;
    try {
        index = JSON.parse(new TextDecoder().decode(indexBytes));
    } catch (e) {
        throw new Error(`Failed to parse HAB asset bundle index: ${e instanceof Error ? e.message : String(e)}`);
    }
    validateIndex(index, payloadLength);
    const payload = d.subarray(payloadStart);
    const entries: HabEntry[] = [];
    for (const e of index.entries) {
        const stored = payload.subarray(e.offset, e.offset + e.storedLength);
        const bytes = e.compression === 'deflate' ? inflate(stored) : stored;
        if (bytes.byteLength !== e.originalLength) throw new Error(`HAB entry "${e.name}" length mismatch: expected ${e.originalLength}, decoded ${bytes.byteLength}.`);
        entries.push({ name: e.name, mimeType: e.mimeType, bytes, params: e.params });
    }
    return { name: index.name, manifest: index.manifest, aliases: index.aliases, entries };
}

/** deflate data is zlib-wrapped (78 xx); a raw deflate stream is accepted too. */
function inflate(d: Uint8Array): Uint8Array {
    return d.length >= 2 && (d[0] & 0x0f) === 8 && ((d[0] << 8) | d[1]) % 31 === 0 ? unzlibSync(d) : inflateSync(d);
}

function validateIndex(index: any, payloadLength: number): void {
    if (index?.format !== 'hab' || index.version !== VERSION || !Array.isArray(index.entries)) throw new Error('HAB asset bundle index has an invalid format or version.');
    if (index.entries.length > MAX_ENTRIES) throw new Error(`HAB asset bundle exceeds the ${MAX_ENTRIES}-entry safety limit.`);
    const seen = new Set<string>();
    const safe = (n: unknown) => Number.isSafeInteger(n) && (n as number) >= 0;
    for (const e of index.entries) {
        if (e == null || typeof e.name !== 'string' || e.name === '' || typeof e.mimeType !== 'string') throw new Error('HAB asset bundle contains an invalid entry descriptor.');
        if (seen.has(e.name)) throw new Error(`HAB asset bundle contains duplicate entry "${e.name}".`);
        seen.add(e.name);
        if (e.compression !== 'none' && e.compression !== 'deflate') throw new Error(`HAB entry "${e.name}" uses unsupported compression "${String(e.compression)}".`);
        if (!safe(e.offset) || !safe(e.storedLength) || !safe(e.originalLength)) throw new Error(`HAB entry "${e.name}" contains an invalid offset or length.`);
        if (e.offset + e.storedLength > payloadLength) throw new Error(`HAB entry "${e.name}" exceeds the payload boundary.`);
    }
}

// ---------- the library the client sees ----------

/** One asset of the library: XML text, raw bytes, or a bitmap (a whole image, or a region of a sprite sheet). */
export type LibraryAsset =
    | { name: string; mimeType: string; kind: 'text'; text: string }
    | { name: string; mimeType: string; kind: 'bytes'; bytes: Uint8Array }
    | { name: string; mimeType: string; kind: 'image'; image: string; frame?: SheetFrame; params?: Record<string, string> };

export interface SheetFrame {
    frame: { x: number; y: number; w: number; h: number };
    rotated?: boolean;
    spriteSourceSize?: { x: number; y: number; w: number; h: number };
    sourceSize?: { w: number; h: number };
}

export interface HabLibrary {
    manifest: string;
    assets: LibraryAsset[];
    /** Image entries by name (PNG bytes), decoded once when the library is built. */
    images: Map<string, Uint8Array>;
}

/** What the client expects from the library: its manifest and its assets. */
export function habLibrary(bundle: HabBundle, libraryName: string): HabLibrary {
    const images = new Map<string, Uint8Array>();
    const assets: LibraryAsset[] = [];
    const aliases = [...(bundle.aliases ?? [])];
    const taken = new Set<string>();
    const add = (a: LibraryAsset) => { if (!taken.has(a.name)) { taken.add(a.name); assets.push(a); } };
    for (const e of bundle.entries) {
        if (e.mimeType.startsWith('image/')) images.set(e.name, e.bytes);
    }
    for (const e of bundle.entries) {
        if (e.mimeType === 'application/json') {
            const json = JSON.parse(new TextDecoder().decode(e.bytes));
            for (const a of roomObjectAssets(json, e.name)) add(a);
            // the JSON's own aliases ({ name: { link, flipH, flipV } }): an avatar effect's parts are often only
            // aliases of its drawn assets (Freeze's helmet, h_std_ha_fx40_1_*), and drew nothing without them
            for (const [name, a] of Object.entries<any>(json?.aliases ?? {})) {
                if (typeof a?.link === 'string' && a.link !== '') aliases.push({ name, ref: a.link, flipH: a.flipH === true, flipV: a.flipV === true });
            }
            continue;
        }
        if (e.mimeType.startsWith('image/')) add({ name: e.name, mimeType: e.mimeType, kind: 'image', image: e.name });
        else if (e.mimeType.startsWith('text/') || e.mimeType.includes('xml')) add({ name: e.name, mimeType: e.mimeType, kind: 'text', text: new TextDecoder().decode(e.bytes) });
        else add({ name: e.name, mimeType: e.mimeType, kind: 'bytes', bytes: e.bytes });
    }
    const manifest = bundle.manifest || buildManifest(bundle.name || libraryName, assets, aliases);
    return { manifest, assets, images };
}

/**
 * A room object's JSON as the client's XML documents (index, <type>_assets, <type>_logic,
 * <type>_visualization, and animation for avatar effects) plus one bitmap per sprite-sheet frame.
 */
function roomObjectAssets(json: any, entryName: string): LibraryAsset[] {
    const out: LibraryAsset[] = [];
    const xml = (name: string, text: string | null) => { if (text != null) out.push({ name, mimeType: 'text/xml', kind: 'text', text }); };
    if (json != null && typeof json === 'object' && typeof json.animations === 'object' && json.animations != null) xml('animation', animationXml(json));
    if (json == null || typeof json !== 'object' || typeof json.assets !== 'object' || json.assets == null) return out;
    const type = typeof json.name === 'string' && json.name !== '' ? json.name : null;
    if (type != null) {
        xml('index', indexXml(type, json));
        xml(`${type}_assets`, assetsXml(type, json));
        xml(`${type}_logic`, logicXml(json));
        xml(`${type}_visualization`, visualizationXml(type, json));
    }
    // bitmaps, as js-client's asset library makes them: every asset, drawn from the frame of the asset
    // its `source` chain ends at, with its offset (from the far edge when flipped) and its flips
    const sheet = json.spritesheet;
    const image = sheet?.meta?.image ?? '';
    if (image === '' || sheet?.frames == null) return out;
    const sheetBase = image.replace(/\.[^.]*$/, '');
    const prefix = json.name ?? sheetBase;
    for (const [name, a] of Object.entries<any>(json.assets)) {
        const drawn = sourceOf(json.assets, name);
        const frame: SheetFrame | undefined = [prefix !== '' ? `${prefix}_${drawn}` : '', sheetBase !== '' ? `${sheetBase}_${drawn}` : '', drawn]
            .filter(k => k !== '').map(k => sheet.frames[k]).find(f => f != null);
        if (!frame) continue;
        const w = Math.trunc(frame.sourceSize?.w ?? frame.frame.w), h = Math.trunc(frame.sourceSize?.h ?? frame.frame.h);
        const x = Math.trunc(a?.x ?? 0), y = Math.trunc(a?.y ?? 0);
        const params: Record<string, string> = {
            offset: `${a?.flipH === true ? w + x : x},${a?.flipV === true ? h + y : y}`,
            region: `0,0,${w},${h}`,
        };
        if (a?.flipH != null) params.flipH = a.flipH ? '1' : '0';
        if (a?.flipV != null) params.flipV = a.flipV ? '1' : '0';
        out.push({ name, mimeType: 'image/png', kind: 'image', image, frame, params });
    }
    void entryName;
    return out;
}

/** The asset whose pixels an asset shows: its `source`, followed at most 8 steps (as js-client). */
function sourceOf(assets: Record<string, any>, name: string): string {
    let at = name;
    for (let i = 0; i < 8; i++) {
        const source = assets[at]?.source;
        if (typeof source !== 'string' || source === '' || source === at) return at;
        at = source;
    }
    return at;
}

// --- XML reconstruction (js-client's, attribute for attribute) ---

function esc(s: string): string {
    return s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function doc(body: string): string {
    return `<?xml version="1.0" encoding="ISO-8859-1" ?>\n${body}\n`;
}

/** Keys in numeric order when both are integers, otherwise by name. */
function sorted<T>(o: Record<string, T>): [string, T][] {
    const num = (k: string) => { const n = Number(k); return Number.isFinite(n) && `${n}` === k; };
    return Object.entries(o).sort(([a], [b]) => (num(a) && num(b) ? Number(a) - Number(b) : a.localeCompare(b)));
}

function attrs(pairs: [string, unknown][]): string {
    const out: string[] = [];
    for (const [k, v] of pairs) {
        if (v == null) continue;
        if (typeof v === 'string') { if (v !== '') out.push(`${k}="${esc(v)}"`); continue; }
        if (typeof v === 'boolean') { out.push(`${k}="${v ? 1 : 0}"`); continue; }
        out.push(`${k}="${Math.trunc(v as number)}"`);
    }
    return out.join(' ');
}

function num(out: string[], key: string, v: unknown, int = false): void {
    if (typeof v === 'number' && Number.isFinite(v)) out.push(`${key}="${int ? Math.trunc(v) : v}"`);
}

function str(out: string[], key: string, v: unknown): void {
    if (typeof v === 'string' && v !== '') out.push(`${key}="${esc(v)}"`);
}

function indexXml(type: string, j: any): string {
    const a = [`type="${esc(type)}"`];
    if (j.visualizationType) a.push(`visualization="${esc(j.visualizationType)}"`);
    if (j.logicType) a.push(`logic="${esc(j.logicType)}"`);
    return doc(`<object ${a.join(' ')} />`);
}

function assetsXml(type: string, j: any): string {
    const own = (n: string) => n === 'index' || n === `${type}_assets` || n === `${type}_logic` || n === `${type}_visualization` || n === `${type}_index`;
    const assets = Object.entries<any>(j.assets ?? {}).filter(([n]) => !own(n)).map(([n, s]) => {
        const a = [`name="${esc(n)}"`];
        if (s.source) a.push(`source="${esc(s.source)}"`);
        if (s.x != null) a.push(`x="${Math.trunc(s.x)}"`);
        if (s.y != null) a.push(`y="${Math.trunc(s.y)}"`);
        if (s.flipH === true) a.push('flipH="1"');
        if (s.flipV === true) a.push('flipV="1"');
        if (s.usesPalette === true) a.push('usesPalette="1"');
        return `   <asset ${a.join(' ')} />`;
    });
    const palettes = Object.entries<any>(j.palettes ?? {}).map(([id, p]) => {
        const a = [`id="${esc(String(p.id ?? id))}"`];
        if (p.source) a.push(`source="${esc(p.source)}"`);
        if (p.master === true) a.push('master="true"');
        if (p.tags?.length) a.push(`tags="${esc(p.tags.join(','))}"`);
        if (p.breed != null) a.push(`breed="${p.breed}"`);
        if (p.colorTag != null) a.push(`colortag="${p.colorTag}"`);
        if (p.color1) a.push(`color1="${esc(p.color1)}"`);
        if (p.color2) a.push(`color2="${esc(p.color2)}"`);
        return `   <palette ${a.join(' ')} />`;
    });
    return doc(`<assets>\n${[...assets, ...palettes].join('\n')}\n</assets>`);
}

function logicXml(j: any): string | null {
    if (j.logic == null && !j.logicType) return null;
    const lines: string[] = [];
    const l = j.logic;
    if (l?.model != null) lines.push(modelXml(l.model));
    if (l?.maskType) lines.push(`   <mask type="${esc(l.maskType)}" />`);
    if (l?.credits) lines.push(`   <credits value="${esc(l.credits)}" />`);
    if (l?.soundSample != null) {
        const a: string[] = [];
        num(a, 'id', l.soundSample.id, true);
        if (l.soundSample.noPitch === true) a.push('nopitch="true"');
        if (a.length) lines.push(`   <sound>\n      <sample ${a.join(' ')} />\n   </sound>`);
    }
    if (l?.action != null && (l.action.link != null || l.action.startState != null)) {
        const a: string[] = [];
        if (l.action.link) a.push(`link="${esc(l.action.link)}"`);
        if (l.action.startState != null) a.push(`startState="${l.action.startState}"`);
        lines.push(`   <action ${a.join(' ')} />`);
    }
    if (l?.planetSystems?.length) {
        const objs = l.planetSystems.map((p: any) => {
            const a: string[] = [];
            num(a, 'id', p.id, true); str(a, 'name', p.name); str(a, 'parent', p.parent); num(a, 'radius', p.radius);
            num(a, 'arcspeed', p.arcSpeed); num(a, 'arcoffset', p.arcOffset); num(a, 'blend', p.blend); num(a, 'height', p.height);
            return a.length ? `      <object ${a.join(' ')} />` : '';
        }).filter((s: string) => s !== '');
        if (objs.length) lines.push(`   <planetsystem>\n${objs.join('\n')}\n   </planetsystem>`);
    }
    if (l?.particleSystems?.length) {
        const systems = l.particleSystems.map(particleSystemXml).filter((s: string) => s !== '');
        if (systems.length) lines.push(`   <particlesystems>\n${systems.join('\n')}\n   </particlesystems>`);
    }
    const vars = (l?.customVars?.variables ?? []).filter((v: string) => v !== '').map((v: string) => `      <variable name="${esc(v)}" />`);
    if (vars.length) lines.push(`   <customvars>\n${vars.join('\n')}\n   </customvars>`);
    const type = j.logicType ? ` type="${esc(j.logicType)}"` : '';
    return doc(`<objectData${type}>\n${lines.join('\n')}\n</objectData>`);
}

function modelXml(m: any): string {
    const parts: string[] = [];
    if (m.dimensions != null) {
        const a: string[] = [];
        for (const k of ['x', 'y', 'z', 'centerZ']) if (m.dimensions[k] != null) a.push(`${k}="${m.dimensions[k]}"`);
        parts.push(`      <dimensions ${a.join(' ')} />`);
    }
    if (m.directions?.length) {
        parts.push(`      <directions>\n${m.directions.map((d: unknown) => `         <direction id="${d}" />`).join('\n')}\n      </directions>`);
    }
    return `   <model>\n${parts.join('\n')}\n   </model>`;
}

function particleSystemXml(p: any): string {
    const a: string[] = [];
    num(a, 'size', p.size, true); num(a, 'canvas_id', p.canvasId, true); num(a, 'offset_y', p.offsetY); num(a, 'blend', p.blend); str(a, 'bgcolor', p.bgColor);
    const emitters = (p.emitters ?? []).map(emitterXml).filter((s: string) => s !== '');
    const open = `      <particlesystem${a.length ? ` ${a.join(' ')}` : ''}`;
    if (!a.length && !emitters.length) return '';
    return emitters.length ? `${open}>\n${emitters.join('\n')}\n      </particlesystem>` : `${open} />`;
}

function emitterXml(e: any): string {
    const a: string[] = [];
    num(a, 'id', e.id, true); str(a, 'name', e.name); num(a, 'sprite_id', e.spriteId, true); num(a, 'max_num_particles', e.maxNumParticles, true);
    num(a, 'particles_per_frame', e.particlesPerFrame, true); num(a, 'burst_pulse', e.burstPulse, true); num(a, 'fuse_time', e.fuseTime, true);
    const inner: string[] = [];
    if (e.simulation != null) {
        const s: string[] = [];
        num(s, 'force', e.simulation.force); num(s, 'direction', e.simulation.direction); num(s, 'gravity', e.simulation.gravity);
        num(s, 'airfriction', e.simulation.airFriction); str(s, 'shape', e.simulation.shape); num(s, 'energy', e.simulation.energy);
        if (s.length) inner.push(`            <simulation ${s.join(' ')} />`);
    }
    const particles = (e.particles ?? []).map((q: any) => {
        const pa: string[] = [];
        if (q.isEmitter != null) pa.push(`is_emitter="${q.isEmitter ? 'true' : 'false'}"`);
        num(pa, 'lifetime', q.lifeTime, true);
        if (q.fade != null) pa.push(`fade="${q.fade ? 'true' : 'false'}"`);
        const frames = (q.frames ?? []).filter((f: string) => f !== '').map((f: string) => `                  <frame name="${esc(f)}" />`);
        if (!pa.length && !frames.length) return '';
        const open = `               <particle${pa.length ? ` ${pa.join(' ')}` : ''}`;
        return frames.length ? `${open}>\n${frames.join('\n')}\n               </particle>` : `${open} />`;
    }).filter((s: string) => s !== '');
    if (particles.length) inner.push(`            <particles>\n${particles.join('\n')}\n            </particles>`);
    if (!a.length && !inner.length) return '';
    const open = `         <emitter${a.length ? ` ${a.join(' ')}` : ''}`;
    return inner.length ? `${open}>\n${inner.join('\n')}\n         </emitter>` : `${open} />`;
}

function visualizationXml(type: string, j: any): string | null {
    if (!j.visualizations?.length) return placeholderVisualization(type);
    const graphics = j.visualizations.map(visualizationEntry).join('\n');
    return doc(`<visualizationData${type !== '' ? ` type="${esc(type)}"` : ''}>\n   <graphics>\n${graphics}\n   </graphics>\n</visualizationData>`);
}

function layerAttrs(id: string, l: any): string {
    const a = [`id="${esc(id)}"`];
    for (const k of ['alpha', 'x', 'y', 'z']) if (l[k] != null) a.push(`${k}="${Math.trunc(l[k])}"`);
    if (l.ink) a.push(`ink="${esc(l.ink)}"`);
    if (l.tag) a.push(`tag="${esc(l.tag)}"`);
    if (l.ignoreMouse === true) a.push('ignoreMouse="1"');
    return ` ${a.join(' ')}`;
}

function visualizationEntry(v: any): string {
    const head = [`size="${Math.trunc(v.size ?? 1)}"`, `layerCount="${Math.trunc(v.layerCount ?? 0)}"`, `angle="${Math.trunc(v.angle ?? 0)}"`];
    const parts: string[] = [];
    if (v.layers && Object.keys(v.layers).length) {
        parts.push(`      <layers>\n${sorted<any>(v.layers).map(([id, l]) => `         <layer${layerAttrs(id, l)} />`).join('\n')}\n      </layers>`);
    }
    if (v.directions && Object.keys(v.directions).length) {
        const dirs = sorted<any>(v.directions).map(([id, d]) => {
            const layers = sorted<any>(d.layers ?? {}).map(([lid, l]) => `            <layer${layerAttrs(lid, l)} />`).join('\n');
            return layers !== '' ? `         <direction id="${esc(id)}">\n${layers}\n         </direction>` : `         <direction id="${esc(id)}" />`;
        });
        parts.push(`      <directions>\n${dirs.join('\n')}\n      </directions>`);
    }
    if (v.colors && Object.keys(v.colors).length) {
        const colors = sorted<any>(v.colors).map(([id, c]) => {
            const layers = sorted<any>(c.layers ?? {}).map(([lid, l]) => {
                const a = [`id="${esc(lid)}"`];
                if (l.color != null && Number.isFinite(l.color)) a.push(`color="${Math.trunc(l.color).toString(16).toUpperCase()}"`);
                return `            <colorLayer ${a.join(' ')} />`;
            }).join('\n');
            return layers !== '' ? `         <color id="${esc(id)}">\n${layers}\n         </color>` : `         <color id="${esc(id)}" />`;
        });
        parts.push(`      <colors>\n${colors.join('\n')}\n      </colors>`);
    }
    const postures = posturesXml(v);
    if (postures != null) parts.push(postures);
    const gestures = gesturesXml(v);
    if (gestures != null) parts.push(gestures);
    if (v.animations && Object.keys(v.animations).length) {
        parts.push(`      <animations>\n${sorted<any>(v.animations).map(([id, a]) => animationEntry(id, a)).join('\n')}\n      </animations>`);
    }
    return `      <visualization ${head.join(' ')}>\n${parts.join('\n')}\n      </visualization>`;
}

function posturesXml(v: any): string | null {
    const def = v.postures?.defaultPosture ?? v.defaultPosture;
    if (v.postures == null && def == null) return null;
    const list = (v.postures?.postures ?? []).map((p: any) => { const a = attrs([['id', p.id], ['animationId', p.animationId]]); return a !== '' ? `         <posture ${a} />` : ''; }).filter((s: string) => s !== '');
    const d = attrs([['defaultPosture', def]]);
    if (!list.length) return d !== '' ? `      <postures ${d} />` : '      <postures />';
    return d !== '' ? `      <postures ${d}>\n${list.join('\n')}\n      </postures>` : `      <postures>\n${list.join('\n')}\n      </postures>`;
}

function gesturesXml(v: any): string | null {
    if (v.gestures == null) return null;
    const list = v.gestures.map((g: any) => { const a = attrs([['id', g.id], ['animationId', g.animationId]]); return a !== '' ? `         <gesture ${a} />` : ''; }).filter((s: string) => s !== '');
    return list.length ? `      <gestures>\n${list.join('\n')}\n      </gestures>` : '      <gestures />';
}

function animationEntry(id: string, a: any): string {
    const head = [`id="${esc(id)}"`];
    if (a.transitionTo != null) head.push(`transitionTo="${a.transitionTo}"`);
    if (a.transitionFrom != null) head.push(`transitionFrom="${a.transitionFrom}"`);
    if (a.immediateChangeFrom) head.push(`immediateChangeFrom="${esc(a.immediateChangeFrom)}"`);
    if (a.randomStart === true) head.push('randomStart="1"');
    const layers = sorted<any>(a.layers ?? {}).map(([lid, l]) => {
        const la = [`id="${esc(lid)}"`];
        for (const k of ['loopCount', 'frameRepeat', 'random', 'randomStart']) if (l[k] != null) la.push(`${k}="${l[k]}"`);
        const seqs = sorted<any>(l.frameSequences ?? {}).map(([, s]) => frameSequenceXml(s)).join('\n');
        return `            <animationLayer ${la.join(' ')}>\n${seqs}\n            </animationLayer>`;
    }).join('\n');
    return `         <animation ${head.join(' ')}>\n${layers}\n         </animation>`;
}

function frameSequenceXml(s: any): string {
    const a: string[] = [];
    if (s.loopCount != null) a.push(`loopCount="${s.loopCount}"`);
    if (s.random != null) a.push(`random="${s.random}"`);
    const frames = sorted<any>(s.frames ?? {}).map(([, f]) => frameXml(f)).join('\n');
    return a.length ? `               <frameSequence ${a.join(' ')}>\n${frames}\n               </frameSequence>` : `               <frameSequence>\n${frames}\n               </frameSequence>`;
}

function frameXml(f: any): string {
    const a: string[] = [];
    if (f.id != null) a.push(`id="${f.id}"`);
    for (const k of ['x', 'y', 'randomX', 'randomY']) if (f[k] != null) a.push(`${k}="${Math.trunc(f[k])}"`);
    const offsets = sorted<any>(f.offsets ?? {}).map(([, o]) => {
        const oa: string[] = [];
        if (o.direction != null) oa.push(`direction="${o.direction}"`);
        if (o.x != null) oa.push(`x="${Math.trunc(o.x)}"`);
        if (o.y != null) oa.push(`y="${Math.trunc(o.y)}"`);
        return `                     <offset ${oa.join(' ')} />`;
    }).join('\n');
    return offsets === '' ? `                  <frame ${a.join(' ')} />` : `                  <frame ${a.join(' ')}>\n                     <offsets>\n${offsets}\n                     </offsets>\n                  </frame>`;
}

/** Avatar effect animations (Dance1..4): the first animation of the JSON as <animation>. */
function animationXml(j: any): string | null {
    const first = Object.entries<any>(j.animations ?? {})[0];
    if (first == null) return null;
    const [key, t] = first;
    const head: string[] = [];
    const name = t.name ?? key, desc = t.desc ?? key;
    if (name !== '') head.push(`name="${esc(name)}"`);
    if (desc !== '') head.push(`desc="${esc(desc)}"`);
    if (t.resetOnToggle === true) head.push('resetOnToggle="true"');
    const lines: string[] = [];
    for (const d of t.directions ?? []) if (d.offset != null) lines.push(`   <direction offset="${Math.trunc(d.offset)}" />`);
    for (const s of t.shadows ?? []) if (s.id) lines.push(`   <shadow id="${esc(s.id)}" />`);
    for (const x of t.adds ?? []) { const a = attrs([['id', x.id], ['align', x.align], ['blend', x.blend], ['ink', x.ink], ['base', x.base]]); if (a !== '') lines.push(`   <add ${a} />`); }
    for (const x of t.removes ?? []) if (x.id) lines.push(`   <remove id="${esc(x.id)}" />`);
    for (const s of t.sprites ?? []) {
        const a = attrs([['id', s.id], ['member', s.member], ['directions', s.directions], ['staticY', s.staticY], ['ink', s.ink]]);
        const dirs = (s.directionList ?? []).map((d: any) => { const da = attrs([['id', d.id], ['dx', d.dx], ['dy', d.dy], ['dz', d.dz]]); return da !== '' ? `      <direction ${da} />` : ''; }).filter((x: string) => x !== '');
        if (!dirs.length) { if (a !== '') lines.push(`   <sprite ${a} />`); continue; }
        lines.push(`   <sprite ${a}>`, ...dirs, '   </sprite>');
    }
    for (const f of t.frames ?? []) lines.push(effectFrameXml(f, '   '));
    for (const x of t.avatars ?? []) { const a = attrs([['ink', x.ink], ['foreground', x.foreground], ['background', x.background]]); if (a !== '') lines.push(`   <avatar ${a} />`); }
    for (const o of t.overrides ?? []) {
        const a = attrs([['name', o.name], ['override', o.override]]);
        const frames = (o.frames ?? []).map((f: any) => effectFrameXml(f, '      '));
        if (a === '') continue;
        if (!frames.length) { lines.push(`   <override ${a} />`); continue; }
        lines.push(`   <override ${a}>`, ...frames, '   </override>');
    }
    return doc(`<animation ${head.join(' ')}>\n${lines.join('\n')}\n</animation>`);
}

function effectFrameXml(f: any, ind: string): string {
    const a = attrs([['repeats', f.repeats]]);
    const inner: string[] = [];
    for (const x of f.fxs ?? []) inner.push(effectPartXml('fx', x, `${ind}   `));
    for (const x of f.bodyparts ?? []) inner.push(effectPartXml('bodypart', x, `${ind}   `));
    if (!inner.length) return a !== '' ? `${ind}<frame ${a} />` : `${ind}<frame />`;
    return `${ind}<frame${a !== '' ? ` ${a}` : ''}>\n${inner.join('\n')}\n${ind}</frame>`;
}

function effectPartXml(tag: string, x: any, ind: string): string {
    const a = attrs([['id', x.id], ['frame', x.frame], ['base', x.base], ['action', x.action], ['dx', x.dx], ['dy', x.dy], ['dz', x.dz], ['dd', x.dd]]);
    const items = (x.items ?? []).map((i: any) => { const ia = attrs([['id', i.id], ['base', i.base]]); return ia !== '' ? `${ind}   <item ${ia} />` : ''; }).filter((s: string) => s !== '');
    const open = a !== '' ? `${ind}<${tag} ${a}` : `${ind}<${tag}`;
    return items.length ? `${open}>\n${items.join('\n')}\n${ind}</${tag}>` : `${open} />`;
}

/** The fixed visualizations of the placeholder objects, whose JSON has none. */
function placeholderVisualization(type: string): string | null {
    const vis = (size: number, angle: number, inner: string) => `   <visualization size="${size}" layerCount="1" angle="${angle}">\n${inner}\n   </visualization>`;
    const dirs = (ids: number[]) => `      <directions>\n${ids.map(i => `         <direction id="${i}" />`).join('\n')}\n      </directions>`;
    const wallLayers = '      <layers>\n         <layer id="0" z="-1500" />\n      </layers>';
    const petBody = (size: number) => vis(size, 45, [
        '      <layers>\n         <layer id="0" z="100" />\n      </layers>',
        dirs([0, 1, 2, 3, 4, 5, 6, 7]),
        '      <colors />',
        '      <postures defaultPosture="std">\n         <posture id="std" animationId="0" />\n      </postures>',
        '      <animations>\n         <animation id="0">\n            <animationLayer id="0" loopCount="0">\n               <frameSequence>\n                  <frame id="0" />\n               </frameSequence>\n            </animationLayer>\n         </animation>\n      </animations>',
    ].join('\n'));
    let graphics: string;
    switch (type) {
        case 'place_holder':
            graphics = [vis(32, 45, dirs([0])), vis(64, 45, dirs([0])), vis(1, 360, dirs([0]))].join('\n\n');
            break;
        case 'wall_place_holder':
            graphics = [vis(32, 45, `${wallLayers}\n${dirs([2, 4])}`), vis(64, 45, `${wallLayers}\n${dirs([2, 4])}`), vis(1, 360, dirs([0]))].join('\n\n');
            break;
        case 'pet_place_holder':
            graphics = [vis(1, 360, '      <animations>\n         <animation id="1">\n            <animationLayer id="0" />\n         </animation>\n      </animations>'), petBody(32), petBody(64)].join('\n\n');
            break;
        default:
            return null;
    }
    return doc(`<visualizationData type="${type}">\n<graphics>\n${graphics}\n</graphics>\n</visualizationData>`);
}

/** A manifest listing the library's assets (and aliases), for bundles that don't carry one. */
function buildManifest(name: string, assets: LibraryAsset[], aliases: { name: string; ref: string; flipH?: boolean; flipV?: boolean }[]): string {
    const list = assets.map(a => {
        const params = Object.entries((a.kind === 'image' && a.params) || {}).map(([k, v]) => `<param key="${esc(k)}" value="${esc(v)}"/>`).join('');
        return `<asset name="${esc(a.name)}" mimeType="${esc(a.mimeType)}">${params}</asset>`;
    }).join('');
    // each alias twice: as an <asset ref> for the core AssetLibrary (which needs the mimeType of the asset it copies,
    // and skips the alias without one), and as an <alias link> for the avatar renderer's AssetAliasCollection, which
    // reads only those (an effect's parts are aliases of its drawn assets: Freeze's helmet drew nothing without them)
    const mimeTypes = new Map(assets.map(a => [a.name, a.mimeType]));
    const alias = aliases.map(a => {
        const params = [a.flipH ? '<param key="flipH" value="1"/>' : '', a.flipV ? '<param key="flipV" value="1"/>' : ''].join('');
        const mimeType = mimeTypes.get(a.ref);
        return (mimeType ? `<asset name="${esc(a.name)}" mimeType="${esc(mimeType)}" ref="${esc(a.ref)}">${params}</asset>` : `<asset name="${esc(a.name)}" ref="${esc(a.ref)}">${params}</asset>`)
            + `<alias name="${esc(a.name)}" link="${esc(a.ref)}" fliph="${a.flipH ? 1 : 0}" flipv="${a.flipV ? 1 : 0}"/>`;
    }).join('');
    return `<manifest><library name="${esc(name)}"><assets>${list}</assets><aliases>${alias}</aliases></library></manifest>`;
}

// ---------- the library class ----------

/** Classes as a SWF library provided them: `new` gives a ByteArray (data) or a Bitmap (image). */
export function bytesClass(bytes: Uint8Array): new () => ByteArray {
    return class extends ByteArray {
        constructor() {
            super();
            for (const b of bytes) this.writeByte(b);
            this.position = 0;
        }
    };
}

export function bitmapClass(make: () => BitmapData): new () => Bitmap {
    return class extends Bitmap {
        constructor() {
            super(make());
        }
    };
}

/**
 * The library class: named after the library, with the static `manifest` and one static class per
 * asset. `sheets` are the decoded images by entry name.
 */
export function libraryClass(lib: HabLibrary, sheets: Map<string, BitmapData>): new () => object {
    const library = class {};
    // defined, not assigned: a class's own `name` and `length` are read-only
    const put = (key: string, value: unknown) => Object.defineProperty(library, key, { value, writable: true, configurable: true, enumerable: true });
    put('manifest', bytesClass(new TextEncoder().encode(lib.manifest)));
    for (const a of lib.assets) {
        if (a.kind === 'text') put(a.name, bytesClass(new TextEncoder().encode(a.text)));
        else if (a.kind === 'bytes') put(a.name, bytesClass(a.bytes));
        else {
            const sheet = sheets.get(a.image);
            if (!sheet) continue;
            const frame = a.frame;
            put(a.name, bitmapClass(frame ? () => cutFrame(sheet, frame) : () => sheet.clone()));
        }
    }
    return library;
}

/**
 * One sprite from a sheet in its original size: the frame placed at its trim offset in a canvas of
 * the source size. (`rotated` is not applied, as js-client doesn't: the sheets don't use it.)
 */
function cutFrame(sheet: BitmapData, f: SheetFrame): BitmapData {
    const w = Math.max(1, Math.trunc(f.sourceSize?.w ?? f.frame.w));
    const h = Math.max(1, Math.trunc(f.sourceSize?.h ?? f.frame.h));
    const out = new BitmapData(w, h, true, 0);
    const at = new Point(Math.trunc(f.spriteSourceSize?.x ?? 0), Math.trunc(f.spriteSourceSize?.y ?? 0));
    out.copyPixels(sheet, new Rectangle(f.frame.x, f.frame.y, f.frame.w, f.frame.h), at);
    return out;
}
