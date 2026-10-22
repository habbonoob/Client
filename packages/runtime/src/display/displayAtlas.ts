// Small bitmaps on the screen drawn from a few large shared textures (pages) instead of one texture each.
//
// PIXI batches sprites while their textures fit the batch's texture slots (16); a sprite whose texture changes to one
// the batch does not hold makes it rebuild the whole draw list. A room is ~2000 sprites with a texture each, and every
// animated furni or avatar changes texture as it moves on: the list was rebuilt nearly every frame, and drawn in a
// hundred batches. Shown from a page, a bitmap's sprite keeps the page's texture across those changes, and a room is
// drawn in a few batches. The bitmap's own texture stays what everything else reads (copies, filters, read-backs);
// the page holds a copy of it, made again when its pixels change (BitmapData.syncTexture, before the frame renders).

import { Rectangle, Texture } from 'pixi.js';
import { GpuSurface } from './gpuSurface';

/** A page's side, in pixels. */
const PAGE_SIDE = 2048;
/** Pages kept, at most (16 MB each on the GPU). */
const MAX_PAGES = 6;
/** The largest bitmap a page takes (larger ones, room planes and backgrounds, keep their own texture). */
export const ATLAS_MAX_SIDE = 256;
/** Space between slots, so a slot drawn scaled never samples its neighbour. */
const GAP = 1;
/** Pages emptied (when full) at most this often; until then a bitmap that does not fit keeps its own texture. */
const RESET_INTERVAL_MS = 5000;

/** A rectangle of a page holding a copy of one bitmap. */
export interface AtlasSlot {
    readonly texture: Texture;
    readonly page: Page;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    /** The pages' generation it was made in: a slot of an earlier one is gone (see resetAtlas). */
    readonly generation: number;
}

interface Shelf { y: number; height: number; x: number }

class Page {
    readonly surface = new GpuSurface(PAGE_SIDE, PAGE_SIDE);
    readonly #shelves: Shelf[] = [];
    #top = 0;

    constructor() {
        this.surface.clear(0, false);
    }

    /** Room for a w x h slot (its top left), packed on shelves of rows; null when the page is full. */
    place(w: number, h: number): [number, number] | null {
        const pw = w + GAP, ph = h + GAP;
        // the lowest shelf it fits that wastes least height
        let best: Shelf | null = null;
        for (const s of this.#shelves) {
            if (s.height >= ph && s.x + pw <= PAGE_SIDE && (!best || s.height < best.height)) best = s;
        }
        if (!best || best.height > ph * 2) {
            if (this.#top + ph > PAGE_SIDE) {
                if (!best) return null;
            } else {
                best = { y: this.#top, height: ph, x: 0 };
                this.#shelves.push(best);
                this.#top += ph;
            }
        }
        const at: [number, number] = [best.x, best.y];
        best.x += pw;
        return at;
    }

    destroy(): void {
        this.surface.destroy();
    }
}

let pages: Page[] = [];
let generation = 0;
let lastReset = -Infinity;
/** Slots let go, by size, for the next bitmap that size (avatar frames are new bitmaps of the same few sizes). */
const free = new Map<string, AtlasSlot[]>();
/** What to do when the pages are emptied: the bitmaps shown from them take new slots. */
let onReset: () => void = () => {};

export function setAtlasResetHandler(handler: () => void): void {
    onReset = handler;
}

/** Whether `slot` is still a slot of the current pages. */
export function slotLive(slot: AtlasSlot): boolean {
    return slot.generation === generation;
}

/** A slot for a w x h bitmap; null when there is no room (the bitmap keeps showing its own texture). */
export function allocateSlot(w: number, h: number): AtlasSlot | null {
    if (w > ATLAS_MAX_SIDE || h > ATLAS_MAX_SIDE) return null;
    const reused = free.get(`${w}x${h}`)?.pop();
    if (reused) return reused;
    for (const page of pages) {
        const at = page.place(w, h);
        if (at) return makeSlot(page, at[0], at[1], w, h);
    }
    if (pages.length < MAX_PAGES) {
        const page = new Page();
        pages.push(page);
        const at = page.place(w, h)!;
        return makeSlot(page, at[0], at[1], w, h);
    }
    // full: emptied, rarely (their bitmaps copied again), and this one placed in the new pages
    const now = performance.now();
    if (now - lastReset < RESET_INTERVAL_MS) return null;
    lastReset = now;
    resetAtlas();
    return allocateSlot(w, h);
}

/** A slot no bitmap shows any more, kept for the next of its size. */
export function releaseSlot(slot: AtlasSlot): void {
    if (!slotLive(slot)) return;
    const key = `${slot.width}x${slot.height}`;
    const list = free.get(key);
    if (list) list.push(slot);
    else free.set(key, [slot]);
}

/** Copy `source` (a whole texture, `slot`'s size) into the slot, replacing what was there: rendered by flushAtlas. */
export function copyToSlot(slot: AtlasSlot, source: Texture): void {
    slot.page.surface.enqueue({ texture: source, matrix: [1, 0, 0, 1, slot.x, slot.y], blend: 'none', tint: 0xffffff, alpha: 1 });
}

/** Before the frame: the copies queued into the pages rendered. */
export function flushAtlas(): void {
    for (const page of pages) page.surface.flush();
}

/** Every page emptied and its slots gone; the bitmaps shown from them are told (onReset) to take new ones. */
export function resetAtlas(): void {
    for (const list of free.values()) for (const slot of list) slot.texture.destroy(false);
    free.clear();
    for (const page of pages) page.destroy();
    pages = [];
    generation++;
    onReset();
}

function makeSlot(page: Page, x: number, y: number, width: number, height: number): AtlasSlot {
    const texture = new Texture({ source: page.surface.texture.source, frame: new Rectangle(x, y, width, height) });
    return { texture, page, x, y, width, height, generation };
}
