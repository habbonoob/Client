// A bitmap's pixels on the GPU: a render texture, and the drawing queued for it.
//
// The client builds avatar images (and much else) by copying and drawing bitmaps into new bitmaps, every frame, and
// shows the result. On canvases that is CPU rasterising, then an upload of every result. On the GPU the copies are
// sprites rendered into the bitmap's render texture, and the result is shown from that texture: nothing to upload.
// Drawing is queued per bitmap and rendered in one pass (a render per copyPixels would cost more than it saves) when
// the bitmap is shown, read, used as a source, or about to change while a queued drawing still reads it. A bitmap that
// is only drawing over a transparent clear is not even rendered when copied: the copy takes over its draws.
//
// Reading pixels (getPixel, hit tests, PNG encoding) needs them on the CPU: the texture is read back into the canvas
// then, once, until the next change. A read-back stalls the GPU, so the bitmaps the client reads often stay on the
// CPU (BitmapData decides). ?gpu=0 keeps every bitmap on the CPU.
import { BufferImageSource, Container, Matrix as PixiMatrix, RendererType, RenderTexture, Rectangle, Sprite, Texture, type Filter, type Renderer, type WebGLRenderer, type WebGPURenderer } from 'pixi.js';
import { addBeforeRender } from './renderHooks';

let renderer: Renderer | null = null;
const enabled = typeof location === 'undefined' || new URLSearchParams(location.search).get('gpu') !== '0';

/** The renderer bitmaps render with (the stage's); until there is one, every bitmap stays on the CPU. */
export function setBitmapRenderer(r: Renderer | null): void {
    renderer = r;
}

/** Whether bitmaps may live on the GPU now. */
export function gpuAvailable(): boolean {
    return enabled && renderer != null;
}

/** What the GPU bitmaps have cost so far (renders into surfaces, whole read-backs, read-backs replayed on the canvas instead), for profiling. */
export const gpuBitmapStats = { renders: 0, readBacks: 0, replays: 0 };
(globalThis as { __gpuBitmapStats?: typeof gpuBitmapStats }).__gpuBitmapStats = gpuBitmapStats;

// ---------- render textures, kept for reuse by size ----------

const MAX_PER_SIZE = 48;
const pool = new Map<string, RenderTexture[]>();

export function acquireRenderTexture(w: number, h: number): RenderTexture {
    const reused = pool.get(`${w}x${h}`)?.pop();
    return reused ?? RenderTexture.create({ width: w, height: h, resolution: 1, antialias: false, scaleMode: 'nearest' });
}

export function releaseRenderTexture(rt: RenderTexture): void {
    const key = `${rt.width}x${rt.height}`;
    const kept = pool.get(key) ?? [];
    if (kept.length >= MAX_PER_SIZE) {
        rt.destroy(true);
        return;
    }
    kept.push(rt);
    pool.set(key, kept);
}

// ---------- the queue ----------

const spritePool: Sprite[] = [];
/** The container every surface renders its queue through (one, so PIXI keeps one set of buffers for them all). */
const stage = new Container();

function takeSprite(): Sprite {
    const s = spritePool.pop() ?? new Sprite();
    s.alpha = 1;
    s.tint = 0xffffff;
    s.blendMode = 'normal';
    return s;
}

function returnSprites(): void {
    for (const s of stage.removeChildren() as Sprite[]) {
        s.texture = Texture.EMPTY;
        spritePool.push(s);
    }
}

/** A rectangle of a texture, in its pixels. */
export interface Frame { x: number; y: number; width: number; height: number }

/**
 * One sprite drawing into a surface: a texture (or a rectangle of it), where, how blended, coloured how. The texture
 * for a rectangle is only made while the queue renders: a texture listens to its source until destroyed, and drawing
 * can stay queued a long time (in a cached image never shown), so made up front they piled up on every source.
 */
export interface QueuedDraw {
    texture: Texture;
    /** The rectangle of the texture drawn; all of it when absent. */
    frame?: Frame;
    /** The sprite's transform (a, b, c, d, tx, ty). */
    matrix: [number, number, number, number, number, number];
    /** 'normal' composites over, 'none' replaces, 'add' adds (Flash's ADD: the canvas's 'lighter'). */
    blend: 'normal' | 'none' | 'add';
    /** Multiplied into the colour (0xRRGGBB, each channel at most 1) and the alpha. */
    tint: number;
    alpha: number;
    /** The bitmap the texture shows (whoever queues the draw tracks who reads it; the surface only carries it). */
    source?: object;
}

/** A texture showing a rectangle of another, to destroy once drawn (see QueuedDraw). */
function frameTexture(texture: Texture, f: Frame): Texture {
    const base = texture.frame;
    return new Texture({ source: texture.source, frame: new Rectangle(base.x + f.x, base.y + f.y, f.width, f.height) });
}

/** A bitmap's pixels on the GPU: its render texture and the drawing not yet rendered into it. */
export class GpuSurface {
    readonly texture: RenderTexture;
    readonly width: number;
    readonly height: number;
    readonly #draws: QueuedDraw[] = [];
    /** Copies of this surface's pixels the queue draws from (colorTransform): given back once drawn. */
    readonly #copies: RenderTexture[] = [];
    /** Clear to this premultiplied colour before the queue renders (a new or filled bitmap). */
    #clearTo: [number, number, number, number] | null = null;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.texture = acquireRenderTexture(width, height);
    }

    get pending(): boolean {
        return this.#draws.length > 0 || this.#clearTo != null;
    }

    /** Everything replaced by one colour (0xAARRGGBB, straight), dropping what was queued. */
    clear(argb: number, opaque: boolean): void {
        this.#discardQueue();
        const a = opaque ? 1 : ((argb >>> 24) & 255) / 255;
        this.#clearTo = [((argb >> 16) & 255) / 255 * a, ((argb >> 8) & 255) / 255 * a, (argb & 255) / 255 * a, a];
    }

    enqueue(draw: QueuedDraw): void {
        this.#draws.push(draw);
    }

    /**
     * Whether the pixels are, so far, only a transparent clear and the queued draws composited over it, at whole
     * pixels: copying them can then be done by queueing the same draws in the copy (see cropDraw), and this surface
     * never has to render. Source-over composites associatively, so the draws over the copy's pixels come out as the
     * finished image over them would.
     */
    get inlineable(): boolean {
        const c = this.#clearTo;
        if (!c || c[0] !== 0 || c[1] !== 0 || c[2] !== 0 || c[3] !== 0) return false;
        for (const d of this.#draws) {
            const [a, b, cc, dd] = d.matrix;
            if (d.blend !== 'normal' || b !== 0 || cc !== 0 || Math.abs(a) !== 1 || Math.abs(dd) !== 1) return false;
        }
        return true;
    }

    /**
     * The colour (premultiplied RGBA, 0-1) the pixels start from when nothing has been rendered yet: they are that
     * colour and the queued draws over it. Null once something has been rendered (the texture holds the pixels).
     */
    get clearColor(): readonly [number, number, number, number] | null {
        return this.#clearTo;
    }

    /** The draws queued since the last render (see inlineable). */
    get draws(): readonly QueuedDraw[] {
        return this.#draws;
    }

    /**
     * Multiply the colour (0xRRGGBB) and alpha of all the pixels by tinting what is queued, when that is one untinted
     * draw over a transparent clear (a clone, a piece cut out of a sheet): nothing is rendered, and the draw can still
     * be replayed on a canvas. False, and nothing changed, otherwise.
     */
    tintQueued(tint: number, alpha: number): boolean {
        const c = this.#clearTo, draws = this.#draws;
        if (!c || c[0] !== 0 || c[1] !== 0 || c[2] !== 0 || c[3] !== 0 || draws.length !== 1) return false;
        const d = draws[0];
        if (d.texture === Texture.WHITE || d.tint !== 0xffffff || d.alpha !== 1) return false;
        d.tint = tint;
        d.alpha = alpha;
        return true;
    }

    /**
     * Multiply the colour (0xRRGGBB) and alpha of a rectangle of the pixels: the rectangle is copied out, then drawn
     * back over itself, tinted (a texture cannot be drawn into while it is read).
     */
    multiply(x: number, y: number, w: number, h: number, tint: number, alpha: number): void {
        this.flush();
        const copy = acquireRenderTexture(w, h);
        const s = takeSprite();
        const part = frameTexture(this.texture, { x, y, width: w, height: h });
        s.texture = part;
        s.setFromMatrix(new PixiMatrix());
        s.blendMode = 'none';
        stage.addChild(s);
        gpuBitmapStats.renders++;
        renderer!.render({ container: stage, target: copy, clear: true });
        returnSprites();
        part.destroy(false);
        this.#copies.push(copy);
        this.enqueue({ texture: copy, matrix: [1, 0, 0, 1, x, y], blend: 'none', tint, alpha });
    }

    /**
     * Replaces a rectangle of the pixels with what `pass` makes of them: its input is the rectangle (a copy of it, as
     * a texture cannot be drawn into while it is read), and whatever else it reads it reads at the same positions.
     */
    applyPass(x: number, y: number, w: number, h: number, pass: Filter): void {
        this.flush();
        const input = snapshot(this.texture, x, y, w, h);
        const s = takeSprite();
        s.texture = input;
        s.setFromMatrix(new PixiMatrix(1, 0, 0, 1, x, y));
        s.filters = [pass];
        stage.addChild(s);
        gpuBitmapStats.renders++;
        renderer!.render({ container: stage, target: this.texture, clear: false });
        s.filters = null;
        returnSprites();
        releaseRenderTexture(input);
    }

    /** Renders what is queued into the texture. */
    flush(): void {
        if (!this.pending || !renderer) return;
        const clear = this.#clearTo;
        const made: Texture[] = [];
        for (const d of this.#draws) {
            const s = takeSprite();
            if (d.frame) {
                s.texture = frameTexture(d.texture, d.frame);
                made.push(s.texture);
            } else {
                s.texture = d.texture;
            }
            const [a, b, c, dd, tx, ty] = d.matrix;
            s.setFromMatrix(new PixiMatrix(a, b, c, dd, tx, ty));
            s.blendMode = d.blend;
            s.tint = d.tint;
            s.alpha = d.alpha;
            stage.addChild(s);
        }
        gpuBitmapStats.renders++;
        renderer.render({
            container: stage,
            target: this.texture,
            clear: clear != null,
            clearColor: clear ?? undefined,
        });
        returnSprites();
        for (const t of made) t.destroy(false);
        this.#clearTo = null;
        this.#discardQueue();
    }

    /**
     * Renders a part of the display list into the texture, after what is queued, `transform` taking the place of
     * its own (BitmapData.draw of a display object).
     */
    renderContainer(container: Container, transform: PixiMatrix): void {
        if (!renderer) return;
        this.flush();
        gpuBitmapStats.renders++;
        renderer.render({ container, target: this.texture, clear: false, transform });
    }

    /** The resolution the display list is rasterised at (text, vector drawing). */
    static get resolution(): number {
        return renderer?.resolution ?? 1;
    }

    /**
     * The alpha channel (a byte a pixel, rows from the top), handed to `done` once the GPU has made it, without
     * waiting for the GPU: on a later frame. False when the renderer cannot read without waiting (WebGL 1).
     */
    fetchAlpha(done: (alpha: Uint8Array) => void): boolean {
        this.flush();
        const n = this.width * this.height;
        return readLater(this.texture, this.width, this.height, rgba => {
            const alpha = new Uint8Array(n);
            for (let i = 0; i < n; i++) alpha[i] = rgba[i * 4 + 3];
            done(alpha);
        });
    }

    /** The pixels, straight (unpremultiplied) RGBA, as the canvas takes them. */
    readPixels(): ImageData {
        this.flush();
        gpuBitmapStats.readBacks++;
        const { pixels } = renderer!.extract.pixels({ target: this.texture, frame: new Rectangle(0, 0, this.width, this.height) });
        const out = new ImageData(this.width, this.height);
        const d = out.data;
        // WebGL hands a render texture back premultiplied; WebGPU reads it through a 2D canvas, already straight
        const premultiplied = renderer!.type !== RendererType.WEBGPU;
        for (let i = 0; i < d.length; i += 4) {
            const a = pixels[i + 3];
            d[i + 3] = a;
            if (!premultiplied) {
                d[i] = pixels[i]; d[i + 1] = pixels[i + 1]; d[i + 2] = pixels[i + 2];
            } else if (a > 0) {
                const k = 255 / a;
                d[i] = pixels[i] * k; d[i + 1] = pixels[i + 1] * k; d[i + 2] = pixels[i + 2] * k;
            }
        }
        return out;
    }

    destroy(): void {
        this.#discardQueue();
        releaseRenderTexture(this.texture);
    }

    #discardQueue(): void {
        this.#draws.length = 0;
        for (const c of this.#copies) releaseRenderTexture(c);
        this.#copies.length = 0;
    }
}

// ---------- reading without waiting for the GPU ----------

// WebGPU's flags (GPUBufferUsage.COPY_DST, .MAP_READ, GPUMapMode.READ), whose globals the types here don't declare
const BUFFER_COPY_DST = 0x8, BUFFER_MAP_READ = 0x1, MAP_READ = 0x1;

/** WebGL 2 reads under way: copied into a buffer behind a fence, collected once the GPU has passed it. */
const pendingReads: { sync: WebGLSync; buffer: WebGLBuffer; size: number; done: (rgba: Uint8Array) => void }[] = [];

/**
 * A render texture's w x h RGBA pixels (premultiplied, rows from the top), handed to `done` once the GPU has drawn
 * them: WebGL 2 reads into a buffer and collects it before a later frame; WebGPU copies into a buffer it maps. A
 * read (readPixels, extract) waits until the GPU has done everything asked of it before, a frame's worth or more.
 */
function readLater(texture: RenderTexture, w: number, h: number, done: (rgba: Uint8Array) => void): boolean {
    if (renderer?.type === RendererType.WEBGL) {
        const r = renderer as WebGLRenderer;
        const gl = r.gl;
        if (!(gl instanceof WebGL2RenderingContext)) return false;
        const target = r.renderTarget.getGpuRenderTarget(r.renderTarget.getRenderTarget(texture)) as { resolveTargetFramebuffer: WebGLFramebuffer };
        // bound as PIXI's own read binds it, so it knows what is bound
        (r.renderTarget.adaptor as unknown as { bindFramebuffer(f: WebGLFramebuffer): void }).bindFramebuffer(target.resolveTargetFramebuffer);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buffer);
        gl.bufferData(gl.PIXEL_PACK_BUFFER, w * h * 4, gl.STREAM_READ);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, 0);
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)!;
        gl.flush();
        pendingReads.push({ sync, buffer, size: w * h * 4, done });
        return true;
    }
    if (renderer?.type === RendererType.WEBGPU) {
        const r = renderer as WebGPURenderer;
        const device = r.gpu.device;
        const row = Math.ceil((w * 4) / 256) * 256;   // a buffer row is a multiple of 256 bytes
        const buffer = device.createBuffer({ size: row * h, usage: BUFFER_COPY_DST | BUFFER_MAP_READ });
        const encoder = device.createCommandEncoder();
        encoder.copyTextureToBuffer({ texture: r.texture.getGpuSource(texture.source) }, { buffer, bytesPerRow: row }, { width: w, height: h });
        device.queue.submit([encoder.finish()]);
        buffer.mapAsync(MAP_READ).then(() => {
            const mapped = new Uint8Array(buffer.getMappedRange());
            const out = new Uint8Array(w * h * 4);
            for (let y = 0; y < h; y++) out.set(mapped.subarray(y * row, y * row + w * 4), y * w * 4);
            buffer.destroy();
            done(out);
        }, () => buffer.destroy());
        return true;
    }
    return false;
}

/** Before a frame: the WebGL reads the GPU has got to, handed over. */
function collectReads(): void {
    if (pendingReads.length === 0 || renderer?.type !== RendererType.WEBGL) return;
    const gl = (renderer as WebGLRenderer).gl as WebGL2RenderingContext;
    for (let i = 0; i < pendingReads.length;) {
        const read = pendingReads[i];
        if (gl.getSyncParameter(read.sync, gl.SYNC_STATUS) !== gl.SIGNALED) {
            i++;
            continue;
        }
        pendingReads.splice(i, 1);
        const out = new Uint8Array(read.size);
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, read.buffer);
        gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, out);
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
        gl.deleteBuffer(read.buffer);
        gl.deleteSync(read.sync);
        read.done(out);
    }
}

addBeforeRender(collectReads);

/** The rectangle of its texture a draw draws. */
function frameOfDraw(d: QueuedDraw): Frame {
    return d.frame ?? { x: 0, y: 0, width: d.texture.frame.width, height: d.texture.frame.height };
}

/**
 * A queued draw (whole-pixel, axis-aligned: see GpuSurface.inlineable) limited to a rectangle of the surface it draws
 * into: its texture's rectangle cropped to what lands there. Null when nothing lands there.
 */
export function cropDraw(d: QueuedDraw, cx: number, cy: number, cw: number, ch: number): QueuedDraw | null {
    const [a, , , dd, tx, ty] = d.matrix;
    const f = frameOfDraw(d);
    const left = a > 0 ? tx : tx - f.width, top = dd > 0 ? ty : ty - f.height;
    const l = Math.max(left, cx), t = Math.max(top, cy);
    const r = Math.min(left + f.width, cx + cw), b = Math.min(top + f.height, cy + ch);
    if (r <= l || b <= t) return null;
    const u = a > 0 ? l - tx : tx - r, v = dd > 0 ? t - ty : ty - b;
    return {
        texture: d.texture, frame: { x: f.x + u, y: f.y + v, width: r - l, height: b - t },
        matrix: [a, 0, 0, dd, a > 0 ? l : r, dd > 0 ? t : b],
        blend: d.blend, tint: d.tint, alpha: d.alpha, source: d.source,
    };
}

/**
 * A w x h copy of a texture's pixels from (x, y) on, transparent where that runs past the texture: what a pass reads
 * alongside the rectangle it works on. Given back with releaseRenderTexture.
 */
export function snapshot(texture: Texture, x: number, y: number, w: number, h: number): RenderTexture {
    const copy = acquireRenderTexture(w, h);
    const s = takeSprite();
    s.texture = texture;
    s.setFromMatrix(new PixiMatrix(1, 0, 0, 1, -x, -y));
    s.blendMode = 'none';
    stage.addChild(s);
    gpuBitmapStats.renders++;
    renderer!.render({ container: stage, target: copy, clear: true });
    returnSprites();
    return copy;
}

/**
 * `texture` drawn through `filters`, as a sprite showing it is drawn on the screen, into a render texture `pad`
 * pixels larger on every side (where the filters reach past it). Given back with releaseRenderTexture.
 */
export function renderFiltered(texture: Texture, filters: Filter[], pad: number): RenderTexture {
    const out = acquireRenderTexture(texture.width + 2 * pad, texture.height + 2 * pad);
    const s = takeSprite();
    s.texture = texture;
    s.setFromMatrix(new PixiMatrix(1, 0, 0, 1, pad, pad));
    s.filters = filters;
    stage.addChild(s);
    gpuBitmapStats.renders++;
    renderer!.render({ container: stage, target: out, clear: true });
    s.filters = null;
    returnSprites();
    return out;
}

const paletteBytes = new Uint8Array(256 * 4 * 4);
let palette: BufferImageSource | null = null;

/**
 * paletteMap's tables as a 256 x 4 texture, a row per channel (red, green, blue, alpha), each entry a 0xAARRGGBB
 * word kept as its bytes R, G, B, A. One texture, rewritten for every call.
 */
export function paletteTexture(tables: readonly Uint32Array[]): BufferImageSource {
    for (let row = 0; row < 4; row++) {
        const t = tables[row];
        for (let i = 0; i < 256; i++) {
            const v = t[i], o = (row * 256 + i) * 4;
            paletteBytes[o] = (v >>> 16) & 255;
            paletteBytes[o + 1] = (v >>> 8) & 255;
            paletteBytes[o + 2] = v & 255;
            paletteBytes[o + 3] = v >>> 24;
        }
    }
    if (!palette) {
        palette = new BufferImageSource({
            resource: paletteBytes, width: 256, height: 4, format: 'rgba8unorm', alphaMode: 'no-premultiply-alpha', scaleMode: 'nearest',
        });
    } else {
        palette.update();
    }
    return palette;
}
