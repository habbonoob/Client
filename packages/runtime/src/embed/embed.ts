// Assets compiled into the client ([Embed] in the original source). The transpiler turns each one
// into an asset class made here, named by its path in the client's asset pack (src/assets.hpa,
// see assetPack.ts). Constructing an asset class is synchronous — as it was when the assets were
// part of the application binary — so the pack is fetched once and every asset decoded, up front,
// by preloadEmbeds() before the client starts.
//  - bitmaps: each instance is a Bitmap with its own BitmapData copy of the image;
//  - bytes: each instance is a ByteArray holding the file, positioned at 0 (Flex made it a
//    ByteArrayAsset, a ByteArray subclass nothing in the client relies on);
//  - sounds: each instance is a Sound with the decoded audio;
//  - fonts: the font face is registered with the document; instances describe it (Font).

import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sound } from '@habbo-pixi/runtime/media/Sound';
import { Font } from '@habbo-pixi/runtime/text/Font';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import { openAssetPack } from './assetPack';

type Load = () => Promise<void>;
const loads: Load[] = [];

/** Each embedded bytes class's path in the pack (tools that write an asset back need it: see embeddedPath). */
const paths = new WeakMap<object, string>();

/** The pack path an embedBytes class was made for; null for anything else. */
export function embeddedPath(assetClass: unknown): string | null {
    return (typeof assetClass === 'function' && paths.get(assetClass)) || null;
}

/** The pack's files (each inflated when read), once preloadEmbeds() has opened it. */
let files: Map<string, () => Uint8Array<ArrayBuffer>> | null = null;

function notLoaded(path: string): Error {
    return new Error(`Embedded asset ${path} was used before preloadEmbeds() finished.`);
}

async function fetchBytes(path: string): Promise<Uint8Array<ArrayBuffer>> {
    const data = files?.get(path)?.();
    if (!data) throw new Error(`Embedded asset ${path} is missing from the asset pack`);
    return data;
}

export function embedBytes(path: string): typeof ByteArray {
    let data: Uint8Array | null = null;
    loads.push(async () => { data = await fetchBytes(path); });
    const assetClass = class EmbeddedBytes extends ByteArray {
        constructor() {
            super();
            if (!data) throw notLoaded(path);
            this.writeBytes(byteArrayAccess.from(data));
            this.position = 0;
        }
    };
    paths.set(assetClass, path);
    return assetClass;
}

export function embedBitmap(path: string): new (bitmapData?: BitmapData, pixelSnapping?: string, smoothing?: boolean) => Bitmap {
    let image: ImageBitmap | null = null;
    loads.push(async () => { image = await createImageBitmap(new Blob([await fetchBytes(path)])); });
    return class EmbeddedBitmap extends Bitmap {
        constructor(bitmapData: BitmapData = null, pixelSnapping: string = 'auto', smoothing: boolean = false) {
            if (!image) throw notLoaded(path);
            super(bitmapData ?? BitmapData.fromImage(image), pixelSnapping, smoothing);
        }
    };
}

export function embedSound(path: string): typeof Sound {
    let buffer: AudioBuffer | null = null;
    loads.push(async () => { buffer = await Sound.decode(await fetchBytes(path)); });
    return class EmbeddedSound extends Sound {
        constructor() {
            super();
            if (!buffer) throw notLoaded(path);
            this.useDecodedAudio(buffer);
        }
    };
}

export interface FontOptions { fontName?: string; fontFamily?: string; fontWeight?: string; fontStyle?: string; unicodeRange?: string }

export function embedFont(path: string, options: FontOptions): typeof Font {
    const family = options.fontName ?? options.fontFamily ?? 'EmbeddedFont';
    const weight = options.fontWeight === 'bold' ? 'bold' : 'normal';
    const style = options.fontStyle === 'italic' ? 'italic' : 'normal';
    loads.push(async () => {
        const face = new FontFace(family, await fetchBytes(path), { weight, style });
        document.fonts.add(await face.load());
    });
    const EmbeddedFont = class extends Font {
        constructor() {
            super(family, weight === 'bold' ? (style === 'italic' ? 'boldItalic' : 'bold') : style === 'italic' ? 'italic' : 'regular', 'embedded');
        }
    };
    // a font embedded in the application is available to text fields by name, registered or not
    Font.registerFont(EmbeddedFont);
    return EmbeddedFont;
}

/**
 * Fetch the asset pack (its URL) and decode every embedded asset (a few at a time); `onProgress`
 * reports how many are done. Must complete before any client code runs.
 */
/** How long the loads run before the page gets the thread back. */
const SLICE_MS = 8;

/** Resolves in a new task: what is waiting (input, painting) goes first. */
function yieldToBrowser(): Promise<void> {
    return new Promise(resolve => {
        const channel = new MessageChannel();
        channel.port1.onmessage = () => resolve();
        channel.port2.postMessage(null);
    });
}

export async function preloadEmbeds(pack: string, onProgress: (done: number, total: number) => void = () => {}): Promise<void> {
    const res = await fetch(pack);
    if (!res.ok) throw new Error(`Asset pack ${pack}: HTTP ${res.status}`);
    files = openAssetPack(new Uint8Array(await res.arrayBuffer()));
    const total = loads.length;
    let next = 0, done = 0;
    // the loads run in slices: every few milliseconds of inflating and decoding, the page gets the thread back
    // (thousands of loads in one go froze the browser for a good part of a second, longer on a slow machine)
    let sliceStart = performance.now();
    const worker = async () => {
        while (next < loads.length) {
            if (performance.now() - sliceStart > SLICE_MS) {
                await yieldToBrowser();
                sliceStart = performance.now();
                // the other workers went on meanwhile: there may be nothing left
                if (next >= loads.length) break;
            }
            const load = loads[next++];
            await load();
            onProgress(++done, total);
        }
    };
    await Promise.all(Array.from({ length: 12 }, worker));
}
