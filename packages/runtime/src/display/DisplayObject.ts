import { Container, Graphics, Matrix as PixiMatrix, type Filter } from 'pixi.js';
import 'pixi.js/advanced-blend-modes';
import { EventDispatcher, EVENT_ANCESTORS } from '@habbo-pixi/runtime/events/EventDispatcher';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Transform, type TransformTarget } from '@habbo-pixi/runtime/geom/Transform';
import { frameBroadcast } from './frameLoop';
import { rootHook } from './rootHook';
import { colorMatrixFilterFor } from './colorFilter';
import type { DisplayObjectContainer } from './DisplayObjectContainer';
import type { IBitmapDrawable } from './IBitmapDrawable';
import type { LoaderInfo } from './LoaderInfo';
import type { Stage } from './Stage';
import type { Ctx } from './canvasRender';
import { FILTER_LAYER, isPixelFilter } from './filterHooks';

/** Events every display object receives from the frame loop, whether on the display list or not. */
const BROADCAST = new Set(['enterFrame', 'exitFrame', 'frameConstructed', 'render', 'activate', 'deactivate']);

// blend modes the client uses, mapped onto PIXI's (the advanced ones come from the import above)
const BLEND: Record<string, string> = {
    normal: 'normal', layer: 'normal', add: 'add', subtract: 'subtract', multiply: 'multiply', screen: 'screen',
    darken: 'darken', lighten: 'lighten', difference: 'difference', overlay: 'overlay', hardlight: 'hard-light',
    erase: 'erase', invert: 'difference', alpha: 'normal',
};

let instanceCounter = 0;

/** Something with a PIXI filter to contribute (the client's filter classes). */
export interface RenderFilterSource {
    createRenderFilter(): Filter | null;
}

/** Package-internal access to display object state (the display package's own classes use it). */
export let displayState: {
    setParent(o: DisplayObject, p: DisplayObjectContainer | null): void;
    scale9Grid(o: DisplayObject): Rectangle | null;
    colorTransform(o: DisplayObject): ColorTransform;
    /** The filters as assigned (this object's own copies; replaced, never changed, when filters are set). */
    filterSources(o: DisplayObject): readonly RenderFilterSource[];
    /** Whether its own transform only moves it (no scale, rotation or skew). */
    translatesOnly(o: DisplayObject): boolean;
    loaderInfoOf(o: DisplayObject): LoaderInfo | null;
    renderContent(o: DisplayObject, ctx: Ctx): void;
    isMaskOf(o: DisplayObject): boolean;
    applyFilterToLayer(filter: unknown, layer: Ctx): void;
};

/**
 * Base of everything on the display list. Each display object owns a PIXI node that renders it;
 * position, scale, rotation, alpha, visibility, colour transform, filters, blend mode and mask are
 * kept here and mirrored onto the node.
 */
export class DisplayObject extends EventDispatcher implements IBitmapDrawable, TransformTarget {
    /** The PIXI node this object renders through. */
    readonly node: Container;

    #parent: DisplayObjectContainer | null = null;
    #name: string;
    #x = 0;
    #y = 0;
    #scaleX = 1;
    #scaleY = 1;
    #rotation = 0;
    /** Set when a full matrix (with skew) was assigned through transform.matrix. */
    #matrix: Matrix | null = null;
    #alpha = 1;
    #visible = true;
    #colorTransform = new ColorTransform();
    #filters: RenderFilterSource[] = [];
    #blendMode = 'normal';
    #mask: DisplayObject | null = null;
    /** How many objects use this one as their mask (a mask is not drawn itself). */
    #maskUses = 0;
    #scale9Grid: Rectangle | null = null;
    #cacheAsBitmap = false;
    #scrollRect: Rectangle | null = null;
    /** The scroll rect's clip, a child node drawn in this object's space. */
    #scrollClip: Graphics | null = null;
    #transform: Transform | null = null;

    constructor(node: Container = new Container()) {
        super();
        this.node = node;
        this.#name = `instance${++instanceCounter}`;
        rootHook.claim(this);
    }

    // ---------- hierarchy ----------

    get parent(): DisplayObjectContainer | null {
        return this.#parent;
    }

    /** The stage, when this object is on the display list. */
    get stage(): Stage | null {
        let top: DisplayObject = this;
        while (top.#parent) top = top.#parent;
        return isStage(top) ? (top as Stage) : null;
    }

    /** The top-most object below the stage in this object's branch (the application's main sprite). */
    get root(): DisplayObject | null {
        let o: DisplayObject = this;
        while (o.#parent && !isStage(o.#parent)) o = o.#parent;
        return o.#parent ? o : isStage(o) ? o : null;
    }

    get loaderInfo(): LoaderInfo | null {
        return displayState.loaderInfoOf(this);
    }

    get name(): string {
        return this.#name;
    }

    set name(value: string) {
        this.#name = value;
    }

    // ---------- geometry ----------

    get x(): number {
        return this.#matrix ? this.#matrix.tx : this.#x;
    }

    set x(value: number) {
        if (this.#matrix) this.#matrix.tx = value;
        else this.#x = value;
        this.#syncTransform();
    }

    get y(): number {
        return this.#matrix ? this.#matrix.ty : this.#y;
    }

    set y(value: number) {
        if (this.#matrix) this.#matrix.ty = value;
        else this.#y = value;
        this.#syncTransform();
    }

    get scaleX(): number {
        return this.#matrix ? Math.hypot(this.#matrix.a, this.#matrix.b) : this.#scaleX;
    }

    set scaleX(value: number) {
        this.#decompose();
        this.#scaleX = value;
        this.#syncTransform();
    }

    get scaleY(): number {
        return this.#matrix ? Math.hypot(this.#matrix.c, this.#matrix.d) : this.#scaleY;
    }

    set scaleY(value: number) {
        this.#decompose();
        this.#scaleY = value;
        this.#syncTransform();
    }

    /** Degrees, clockwise, normalised to -180…180. */
    get rotation(): number {
        return this.#matrix ? Math.atan2(this.#matrix.b, this.#matrix.a) * 180 / Math.PI : this.#rotation;
    }

    set rotation(value: number) {
        this.#decompose();
        let r = value % 360;
        if (r > 180) r -= 360;
        else if (r < -180) r += 360;
        this.#rotation = r;
        this.#syncTransform();
    }

    /** Width of the bounds in the parent's coordinate space. */
    get width(): number {
        return this.getBounds(this.#parent).width;
    }

    /** Scales horizontally so the unrotated content is `value` wide; empty content can't be sized. */
    set width(value: number) {
        const w = this.localBounds().width;
        if (w === 0) return;
        this.scaleX = value / w;
    }

    get height(): number {
        return this.getBounds(this.#parent).height;
    }

    set height(value: number) {
        const h = this.localBounds().height;
        if (h === 0) return;
        this.scaleY = value / h;
    }

    // ---------- appearance ----------

    get alpha(): number {
        return this.#alpha;
    }

    set alpha(value: number) {
        this.#alpha = value;
        this.#syncColor();
    }

    get visible(): boolean {
        return this.#visible;
    }

    set visible(value: boolean) {
        this.#visible = value;
        this.#syncVisible();
    }

    /** A mask clips whatever it masks even when it is itself invisible (the window manager hides
     * the shapes it masks with): PIXI draws nothing through a hidden mask, and never draws a mask
     * as itself, so the node of an object in use as a mask stays visible. */
    #syncVisible(): void {
        this.node.visible = this.#visible || this.#maskUses > 0;
    }

    get blendMode(): string {
        return this.#blendMode;
    }

    set blendMode(value: string) {
        this.#blendMode = value;
        this.node.blendMode = (BLEND[value] ?? 'normal') as Container['blendMode'];
    }

    /** Copies: changing the returned array or its filters has no effect until assigned back. */
    get filters(): any[] {
        return this.#filters.map(f => (typeof (f as { clone?: () => unknown }).clone === 'function' ? (f as unknown as { clone(): RenderFilterSource }).clone() : f));
    }

    set filters(value: any[]) {
        const next = value ?? [];
        // the same filters again (the room sets every sprite's filters each time it updates it, every frame while the
        // room is dragged): nothing changes on screen, and the filters made for them (and a Bitmap's filtered image)
        // are kept
        const current = this.#filters;
        if (next.length === current.length && next.every((f, i) => (f as { sameAs?(o: unknown): boolean } | null)?.sameAs?.(current[i]) === true)) return;
        this.#filters = next.map(f => (typeof f?.clone === 'function' ? f.clone() : f));
        this.#syncFilters();
    }

    get mask(): DisplayObject | null {
        return this.#mask;
    }

    set mask(value: DisplayObject | null) {
        if (this.#mask) {
            this.#mask.#maskUses--;
            this.#mask.#syncVisible();
        }
        this.#mask = value;
        if (value) {
            value.#maskUses++;
            value.#syncVisible();
        }
        // PIXI takes one mask: an AS3 mask, else the scroll rect's clip
        this.node.mask = value ? value.node : this.#scrollClip;
    }

    /**
     * The part of this object that shows, in its own coordinates: content is moved by -x, -y, so the rect's
     * top left sits at the object's origin, and cut to its width and height. Bounds, hit tests and
     * coordinates follow it, as in Flash. (The catalog's preview zoom shows its room canvas through one.)
     */
    get scrollRect(): Rectangle | null {
        return this.#scrollRect ? this.#scrollRect.clone() : null;
    }

    set scrollRect(value: Rectangle | null) {
        this.#scrollRect = value ? value.clone() : null;
        this.#syncScrollRect();
    }

    /** Whether the stage point falls outside this object's scroll rect (so nothing of it shows there). */
    clippedAt(stageX: number, stageY: number): boolean {
        if (!this.#scrollRect) return false;
        const p = this.globalToLocal(new Point(stageX, stageY));
        return !this.#scrollRect.contains(p.x, p.y);
    }

    #syncScrollRect(): void {
        const n = this.node, r = this.#scrollRect;
        if (!r) {
            n.pivot.set(0, 0);
            if (this.#scrollClip) {
                if (n.mask === this.#scrollClip) n.mask = null;
                this.#scrollClip.destroy();
                this.#scrollClip = null;
            }
        } else {
            n.pivot.set(r.x, r.y);
            if (!this.#scrollClip) {
                // the clip is drawn in this object's own space, so it moves and scales with it; it goes after
                // every child node, where the containers' own child indexes never reach
                this.#scrollClip = new Graphics();
                n.addChild(this.#scrollClip);
            }
            this.#scrollClip.clear().rect(r.x, r.y, r.width, r.height).fill(0xffffff);
            if (!this.#mask) n.mask = this.#scrollClip;
        }
        this.#syncTransform();
    }

    /** The 9-slice grid (local coordinates): content outside the centre keeps its size when scaled. */
    get scale9Grid(): Rectangle | null {
        return this.#scale9Grid ? this.#scale9Grid.clone() : null;
    }

    set scale9Grid(value: Rectangle | null) {
        this.#scale9Grid = value ? value.clone() : null;
        this.contentChanged();
    }

    /** A caching hint; rendering is the same either way. */
    get cacheAsBitmap(): boolean {
        return this.#cacheAsBitmap;
    }

    set cacheAsBitmap(value: boolean) {
        this.#cacheAsBitmap = value;
    }

    get transform(): Transform {
        return this.#transform ??= new Transform(this);
    }

    set transform(value: Transform) {
        this.setTransformMatrix(value.matrix);
        this.setTransformColor(value.colorTransform);
    }

    // ---------- coordinates ----------

    get mouseX(): number {
        const s = this.stage;
        return s ? this.globalToLocal(s.mousePosition()).x : 0;
    }

    get mouseY(): number {
        const s = this.stage;
        return s ? this.globalToLocal(s.mousePosition()).y : 0;
    }

    /** A point from this object's space to stage space. */
    localToGlobal(point: { x: number; y: number }): Point {
        return this.concatenatedTransformMatrix().transformPoint(new Point(point.x, point.y));
    }

    /** A point from stage space to this object's space. */
    globalToLocal(point: { x: number; y: number }): Point {
        const m = this.concatenatedTransformMatrix();
        m.invert();
        return m.transformPoint(new Point(point.x, point.y));
    }

    /** Bounds (including strokes) in `targetCoordinateSpace`'s coordinates. */
    getBounds(targetCoordinateSpace: DisplayObject | null = null): Rectangle {
        return this.#boundsIn(targetCoordinateSpace, this.#scrollRect ? this.#scrollRect.clone() : this.localBounds());
    }

    /** Bounds excluding strokes, in `targetCoordinateSpace`'s coordinates. */
    getRect(targetCoordinateSpace: DisplayObject | null = null): Rectangle {
        return this.#boundsIn(targetCoordinateSpace, this.#scrollRect ? this.#scrollRect.clone() : this.localRect());
    }

    /** Is the stage point (x, y) over this object: its bounds, or with `shapeFlag` its actual content? */
    hitTestPoint(x: number, y: number, shapeFlag: boolean = false): boolean {
        if (!shapeFlag) return this.getBounds(this.stage).contains(x, y);
        const p = this.globalToLocal(new Point(x, y));
        if (this.#scrollRect && !this.#scrollRect.contains(p.x, p.y)) return false;
        return this.hitTestLocal(p.x, p.y);
    }

    /** Is the stage point over this object's own content (children excluded)? */
    hitTestContent(stageX: number, stageY: number): boolean {
        const p = this.globalToLocal(new Point(stageX, stageY));
        if (this.#scrollRect && !this.#scrollRect.contains(p.x, p.y)) return false;
        return this.hitTestOwnContent(p.x, p.y);
    }

    /** Do the stage-space bounds of this object and `obj` overlap? */
    hitTestObject(obj: DisplayObject): boolean {
        return this.getBounds(this.stage).intersects(obj.getBounds(this.stage));
    }

    // ---------- for subclasses (content) ----------

    /** Content bounds in local space, including strokes. */
    protected localBounds(): Rectangle {
        return new Rectangle();
    }

    /** Content bounds in local space, excluding strokes. */
    protected localRect(): Rectangle {
        return this.localBounds();
    }

    /** Is the local point on this object's content, children included? */
    protected hitTestLocal(x: number, y: number): boolean {
        return this.hitTestOwnContent(x, y);
    }

    /** Is the local point on this object's own content, children excluded? */
    protected hitTestOwnContent(x: number, y: number): boolean {
        return this.localBounds().contains(x, y);
    }

    /** Draw this object's own content (not children) into a 2D canvas, already transformed to local space. */
    protected renderContent(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void {
        void ctx;
    }

    /** Content changed in a way that affects rendering (e.g. geometry for 9-slice scaling). */
    protected contentChanged(): void {}

    // ---------- TransformTarget ----------

    transformMatrix(): Matrix {
        if (this.#matrix) return this.#matrix.clone();
        const r = this.#rotation * Math.PI / 180;
        const cos = Math.cos(r), sin = Math.sin(r);
        return new Matrix(cos * this.#scaleX, sin * this.#scaleX, -sin * this.#scaleY, cos * this.#scaleY, this.#x, this.#y);
    }

    setTransformMatrix(m: Matrix): void {
        this.#matrix = m.clone();
        this.#syncTransform();
    }

    transformColor(): ColorTransform {
        const c = this.#colorTransform;
        return new ColorTransform(c.redMultiplier, c.greenMultiplier, c.blueMultiplier, this.#alpha, c.redOffset, c.greenOffset, c.blueOffset, c.alphaOffset);
    }

    setTransformColor(ct: ColorTransform): void {
        this.#colorTransform = new ColorTransform(ct.redMultiplier, ct.greenMultiplier, ct.blueMultiplier, 1, ct.redOffset, ct.greenOffset, ct.blueOffset, ct.alphaOffset);
        this.#alpha = ct.alphaMultiplier;
        this.#syncColor();
    }

    concatenatedTransformMatrix(): Matrix {
        const m = this.#contentToParent();
        for (let p = this.#parent; p && !isStage(p); p = p.#parent) m.concat(p.#contentToParent());
        return m;
    }

    /** From this object's content space to its parent's: the scroll rect's offset, then its transform. */
    #contentToParent(): Matrix {
        const r = this.#scrollRect;
        if (!r) return this.transformMatrix();
        const m = new Matrix(1, 0, 0, 1, -r.x, -r.y);
        m.concat(this.transformMatrix());
        return m;
    }

    concatenatedTransformColor(): ColorTransform {
        let c = this.transformColor();
        for (let p = this.#parent; p; p = p.#parent) {
            const pc = p.transformColor();
            pc.concat(c);   // this object's colours first, then the ancestor's
            c = pc;
        }
        return c;
    }

    stagePixelBounds(): Rectangle {
        const b = this.getBounds(this.stage);
        const x = Math.floor(b.x), y = Math.floor(b.y);
        return new Rectangle(x, y, Math.ceil(b.right) - x, Math.ceil(b.bottom) - y);
    }

    // ---------- events ----------

    override addEventListener(type: string, listener: (event: any) => void, useCapture: boolean = false, priority: number = 0, useWeakReference: boolean = false): void {
        super.addEventListener(type, listener, useCapture, priority, useWeakReference);
        if (BROADCAST.has(type)) frameBroadcast.add(type, this);
    }

    override removeEventListener(type: string, listener: (event: any) => void, useCapture: boolean = false): void {
        super.removeEventListener(type, listener, useCapture);
        if (BROADCAST.has(type) && !this.hasEventListener(type)) frameBroadcast.remove(type, this);
    }

    override [EVENT_ANCESTORS](): EventDispatcher[] {
        const out: EventDispatcher[] = [];
        for (let p = this.#parent; p; p = p.#parent) out.push(p);
        return out;
    }

    override toString(): string {
        return `[object ${this.constructor.name}]`;
    }

    // ---------- internals ----------

    #boundsIn(target: DisplayObject | null, local: Rectangle): Rectangle {
        const m = this.concatenatedTransformMatrix();
        if (target) {
            const t = target.concatenatedTransformMatrix();
            t.invert();
            m.concat(t);
        }
        if (local.width === 0 && local.height === 0) {
            const p = m.transformPoint(new Point(local.x, local.y));
            return new Rectangle(p.x, p.y, 0, 0);
        }
        const pts = [
            m.transformPoint(new Point(local.left, local.top)), m.transformPoint(new Point(local.right, local.top)),
            m.transformPoint(new Point(local.left, local.bottom)), m.transformPoint(new Point(local.right, local.bottom)),
        ];
        const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
        const x = Math.min(...xs), y = Math.min(...ys);
        return new Rectangle(x, y, Math.max(...xs) - x, Math.max(...ys) - y);
    }

    /** Keep scale/rotation as separate values from here on (a skewed matrix loses its skew). */
    #decompose(): void {
        const m = this.#matrix;
        if (!m) return;
        this.#x = m.tx;
        this.#y = m.ty;
        this.#scaleX = Math.hypot(m.a, m.b);
        this.#scaleY = Math.hypot(m.c, m.d);
        this.#rotation = Math.atan2(m.b, m.a) * 180 / Math.PI;
        this.#matrix = null;
    }

    #syncTransform(): void {
        const n = this.node;
        if (this.#matrix) {
            const m = this.#matrix;
            n.setFromMatrix(new PixiMatrix(m.a, m.b, m.c, m.d, m.tx, m.ty));
        } else {
            n.position.set(this.#x, this.#y);
            n.scale.set(this.#scaleX, this.#scaleY);
            n.rotation = this.#rotation * Math.PI / 180;
            n.skew.set(0, 0);
        }
        this.contentChanged();
    }

    #syncColor(): void {
        const c = this.#colorTransform;
        this.node.alpha = Math.max(0, Math.min(1, this.#alpha));
        const identity = c.redMultiplier === 1 && c.greenMultiplier === 1 && c.blueMultiplier === 1
            && c.redOffset === 0 && c.greenOffset === 0 && c.blueOffset === 0 && c.alphaOffset === 0;
        this.#colorFilter = identity ? null : colorMatrixFilterFor(c);
        this.#applyFilters();
    }

    #colorFilter: Filter | null = null;
    #renderFilters: Filter[] = [];

    #syncFilters(): void {
        this.#renderFilters = this.#filters.map(f => f.createRenderFilter()).filter((f): f is Filter => f != null);
        this.#applyFilters();
    }

    #applyFilters(): void {
        const all = this.#colorFilter ? [this.#colorFilter, ...this.#renderFilters] : this.#renderFilters;
        this.showFilters(all.length ? all : null);
    }

    /** Draw the node through these filters (null: none). A Bitmap keeps its filtered image instead (Bitmap.ts). */
    protected showFilters(filters: Filter[] | null): void {
        this.node.filters = filters;
    }

    static {
        displayState = {
            setParent: (o, p) => { o.#parent = p; },
            scale9Grid: o => o.#scale9Grid,
            colorTransform: o => o.#colorTransform,
            filterSources: o => o.#filters,
            translatesOnly: o => {
                const m = o.#matrix;
                return m ? m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1 : o.#scaleX === 1 && o.#scaleY === 1 && o.#rotation === 0;
            },
            loaderInfoOf: () => null,
            renderContent: (o, ctx) => o.renderContent(ctx),
            isMaskOf: o => o.#maskUses > 0,
            applyFilterToLayer: (f, layer) => { if (isPixelFilter(f)) f[FILTER_LAYER](layer); },
        };
    }
}

/** Plain check, not a type guard: narrowing on it would make the not-a-stage branch `never`. */
function isStage(o: DisplayObject): boolean {
    return (o as { isStage?: boolean }).isStage === true;
}
