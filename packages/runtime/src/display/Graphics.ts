import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { BitmapData } from './BitmapData';

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

type Seg =
    | { k: 'M'; x: number; y: number }
    | { k: 'L'; x: number; y: number }
    | { k: 'Q'; cx: number; cy: number; x: number; y: number }
    | { k: 'rect'; x: number; y: number; w: number; h: number }
    | { k: 'rrect'; x: number; y: number; w: number; h: number; rx: number; ry: number }
    | { k: 'ellipse'; cx: number; cy: number; rx: number; ry: number };

type Fill =
    | { k: 'solid'; color: number; alpha: number }
    | { k: 'gradient'; type: string; colors: number[]; alphas: number[]; ratios: number[]; matrix: Matrix | null; focal: number }
    | { k: 'bitmap'; bitmap: BitmapData; matrix: Matrix | null; repeat: boolean; smooth: boolean };

interface Line { thickness: number; color: number; alpha: number; caps: string; joints: string; miterLimit: number }
interface Stroke { line: Line; segs: Seg[] }
interface Group { fill: Fill | null; segs: Seg[]; strokes: Stroke[] }

/** 9-slice scaling: where a local point is drawn, and the affine map of the region containing it. */
export interface Warp {
    point(x: number, y: number): [number, number];
    affineAt(x: number, y: number): Matrix;
}

/**
 * Vector drawing for a Shape or Sprite. Commands are recorded and rasterised with Canvas2D:
 *  - a fill covers every path drawn from beginFill until endFill (or the next fill), with open
 *    polylines closed, using the even-odd rule (an inner rectangle cuts a hole in an outer one);
 *  - strokes follow the line style current when each segment was drawn, over their fill;
 *  - caps and joints default to round; thickness 0 is a one-pixel hairline at any scale;
 *  - gradients span Flash-style gradient boxes (1638.4 units, placed by the fill matrix).
 */
export class Graphics {
    #groups: Group[] = [];
    #fill: Fill | null = null;
    #line: Line | null = null;
    #penX = 0;
    #penY = 0;
    #onChange: () => void;

    /** @param onChange called whenever the drawing changes (the owner re-rasterises) */
    constructor(onChange: () => void = () => {}) {
        this.#onChange = onChange;
    }

    clear(): void {
        this.#groups = [];
        this.#fill = null;
        this.#line = null;
        this.#penX = this.#penY = 0;
        this.#onChange();
    }

    beginFill(color: number, alpha: number = 1): void {
        this.#startFill({ k: 'solid', color: color >>> 0, alpha });
    }

    beginGradientFill(type: string, colors: any[], alphas: any[], ratios: any[], matrix: Matrix = null,
        spreadMethod: string = 'pad', interpolationMethod: string = 'rgb', focalPointRatio: number = 0): void {
        void spreadMethod;
        void interpolationMethod;
        this.#startFill({
            k: 'gradient', type, colors: colors.map(Number), alphas: alphas.map(Number), ratios: ratios.map(Number),
            matrix: matrix ? matrix.clone() : null, focal: Math.max(-1, Math.min(1, focalPointRatio)),
        });
    }

    beginBitmapFill(bitmap: BitmapData, matrix: Matrix = null, repeat: boolean = true, smooth: boolean = false): void {
        this.#startFill({ k: 'bitmap', bitmap, matrix: matrix ? matrix.clone() : null, repeat, smooth });
    }

    endFill(): void {
        this.#fill = null;
        this.#groups.push({ fill: null, segs: [], strokes: [] });
        this.#onChange();
    }

    /** Line style for following segments; a missing/NaN thickness turns lines off. */
    lineStyle(thickness: number = NaN, color: number = 0, alpha: number = 1, pixelHinting: boolean = false,
        scaleMode: string = 'normal', caps: string = null, joints: string = null, miterLimit: number = 3): void {
        void pixelHinting;
        void scaleMode;
        this.#line = thickness == null || Number.isNaN(thickness) ? null : {
            thickness: Math.max(0, Math.min(255, thickness)), color: color >>> 0, alpha,
            caps: caps === 'none' ? 'butt' : caps === 'square' ? 'square' : 'round',
            joints: joints === 'miter' ? 'miter' : joints === 'bevel' ? 'bevel' : 'round', miterLimit,
        };
    }

    moveTo(x: number, y: number): void {
        this.#penX = x;
        this.#penY = y;
        this.#group().segs.push({ k: 'M', x, y });
        if (this.#line) this.#stroke().segs.push({ k: 'M', x, y });
        this.#onChange();
    }

    lineTo(x: number, y: number): void {
        this.#segment({ k: 'L', x, y });
        this.#penX = x;
        this.#penY = y;
    }

    curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void {
        this.#segment({ k: 'Q', cx: controlX, cy: controlY, x: anchorX, y: anchorY });
        this.#penX = anchorX;
        this.#penY = anchorY;
    }

    drawRect(x: number, y: number, width: number, height: number): void {
        this.#shape({ k: 'rect', x, y, w: width, h: height });
    }

    drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight: number = NaN): void {
        const rx = Math.min(Math.abs(width) / 2, ellipseWidth / 2);
        const ry = Math.min(Math.abs(height) / 2, (Number.isNaN(ellipseHeight) ? ellipseWidth : ellipseHeight) / 2);
        this.#shape({ k: 'rrect', x, y, w: width, h: height, rx, ry });
    }

    drawCircle(x: number, y: number, radius: number): void {
        this.#shape({ k: 'ellipse', cx: x, cy: y, rx: radius, ry: radius });
    }

    drawEllipse(x: number, y: number, width: number, height: number): void {
        this.#shape({ k: 'ellipse', cx: x + width / 2, cy: y + height / 2, rx: width / 2, ry: height / 2 });
    }

    // ---------- used by the display objects that own this drawing ----------

    /** Nothing has been drawn. */
    isEmpty(): boolean {
        return this.#groups.every(g => !g.segs.some(s => s.k !== 'M') && !g.strokes.some(s => s.segs.some(x => x.k !== 'M')));
    }

    /** Bounds of fills and strokes (or fills only, when `strokes` is false), in local space. */
    bounds(strokes: boolean = true, warp: Warp | null = null): Rectangle {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const add = (x: number, y: number, pad: number) => {
            [x, y] = warp ? warp.point(x, y) : [x, y];
            minX = Math.min(minX, x - pad); minY = Math.min(minY, y - pad);
            maxX = Math.max(maxX, x + pad); maxY = Math.max(maxY, y + pad);
        };
        const addSegs = (segs: Seg[], pad: number) => {
            for (const s of segs) {
                switch (s.k) {
                    case 'M': break;
                    case 'L': add(s.x, s.y, pad); break;
                    case 'Q': add(s.cx, s.cy, pad); add(s.x, s.y, pad); break;
                    case 'rect': case 'rrect': add(s.x, s.y, pad); add(s.x + s.w, s.y + s.h, pad); break;
                    case 'ellipse': add(s.cx - s.rx, s.cy - s.ry, pad); add(s.cx + s.rx, s.cy + s.ry, pad); break;
                }
            }
        };
        const withStart = (segs: Seg[], pad: number) => {
            // a polyline's starting point counts once something is drawn from it
            for (let i = 0; i < segs.length - 1; i++) if (segs[i].k === 'M' && (segs[i + 1].k === 'L' || segs[i + 1].k === 'Q')) add((segs[i] as { x: number }).x, (segs[i] as { y: number }).y, pad);
            addSegs(segs, pad);
        };
        for (const g of this.#groups) {
            if (g.fill) withStart(g.segs, 0);
            if (strokes) for (const s of g.strokes) withStart(s.segs, s.line.thickness / 2);
        }
        return minX === Infinity ? new Rectangle() : new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }

    /** Draw into a canvas whose transform already maps local space; `scale` is the device pixels per unit. */
    render(ctx: Ctx, scale: number = 1, warp: Warp | null = null): void {
        for (const g of this.#groups) {
            if (g.fill && g.segs.length) {
                const path = buildPath(g.segs, true, warp);
                ctx.save();
                paintFill(ctx, g.fill, path, warp ? regionAffine(g.segs, warp) : null);
                ctx.restore();
            }
            for (const s of g.strokes) {
                ctx.save();
                ctx.lineWidth = s.line.thickness === 0 ? 1 / scale : s.line.thickness;
                ctx.lineCap = s.line.caps as CanvasLineCap;
                ctx.lineJoin = s.line.joints as CanvasLineJoin;
                ctx.miterLimit = s.line.miterLimit;
                ctx.strokeStyle = rgba(s.line.color, s.line.alpha);
                ctx.stroke(buildPath(s.segs, false, warp));
                ctx.restore();
            }
        }
    }

    /** Is the local point on a fill or a stroke? */
    hitTest(x: number, y: number, ctx: Ctx, warp: Warp | null = null): boolean {
        for (const g of this.#groups) {
            if (g.fill && g.segs.length && ctx.isPointInPath(buildPath(g.segs, true, warp), x, y, 'evenodd')) return true;
            for (const s of g.strokes) {
                ctx.save();
                ctx.lineWidth = Math.max(1, s.line.thickness);
                const hit = ctx.isPointInStroke(buildPath(s.segs, false, warp), x, y);
                ctx.restore();
                if (hit) return true;
            }
        }
        return false;
    }

    // ---------- internals ----------

    #startFill(fill: Fill): void {
        this.#fill = fill;
        this.#groups.push({ fill, segs: [{ k: 'M', x: this.#penX, y: this.#penY }], strokes: [] });
        this.#onChange();
    }

    #group(): Group {
        let g = this.#groups[this.#groups.length - 1];
        if (!g) this.#groups.push(g = { fill: this.#fill, segs: [], strokes: [] });
        return g;
    }

    /** The stroke run for the current line style, starting at the pen when the style changed. */
    #stroke(): Stroke {
        const g = this.#group();
        let s = g.strokes[g.strokes.length - 1];
        if (!s || s.line !== this.#line) {
            s = { line: this.#line!, segs: [{ k: 'M', x: this.#penX, y: this.#penY }] };
            g.strokes.push(s);
        }
        return s;
    }

    #segment(seg: Seg): void {
        this.#group().segs.push(seg);
        if (this.#line) this.#stroke().segs.push(seg);
        this.#onChange();
    }

    #shape(seg: Seg): void {
        const g = this.#group();
        g.segs.push(seg);
        if (this.#line) {
            // a shape's outline is a closed path of its own
            g.strokes.push({ line: this.#line, segs: [seg] });
        }
        this.#onChange();
    }
}

function buildPath(segs: Seg[], closeSubpaths: boolean, warp: Warp | null): Path2D {
    const p = new Path2D();
    const w = (x: number, y: number): [number, number] => (warp ? warp.point(x, y) : [x, y]);
    let open = false;
    for (const s of segs) {
        switch (s.k) {
            case 'M':
                if (open && closeSubpaths) p.closePath();
                p.moveTo(...w(s.x, s.y));
                open = false;
                break;
            case 'L': p.lineTo(...w(s.x, s.y)); open = true; break;
            case 'Q': p.quadraticCurveTo(...w(s.cx, s.cy), ...w(s.x, s.y)); open = true; break;
            case 'rect': {
                if (open && closeSubpaths) p.closePath();
                open = false;
                const [x0, y0] = w(s.x, s.y), [x1, y1] = w(s.x + s.w, s.y + s.h);
                p.rect(x0, y0, x1 - x0, y1 - y0);
                break;
            }
            case 'rrect': {
                if (open && closeSubpaths) p.closePath();
                open = false;
                const [x0, y0] = w(s.x, s.y), [x1, y1] = w(s.x + s.w, s.y + s.h);
                p.roundRect(x0, y0, x1 - x0, y1 - y0, [{ x: s.rx, y: s.ry }]);
                break;
            }
            case 'ellipse': {
                if (open && closeSubpaths) p.closePath();
                open = false;
                const [cx, cy] = w(s.cx, s.cy);
                p.moveTo(cx + s.rx, cy);
                p.ellipse(cx, cy, Math.abs(s.rx), Math.abs(s.ry), 0, 0, Math.PI * 2);
                break;
            }
        }
    }
    if (open && closeSubpaths) p.closePath();
    return p;
}

/** Flash's gradient box: the gradient runs across x from -819.2 to 819.2 before the fill matrix. */
const HALF_BOX = 819.2;

/** The 9-slice region a fill's shapes sit in (taken at their centre), as an affine map. */
function regionAffine(segs: Seg[], warp: Warp): Matrix {
    let x = 0, y = 0, n = 0;
    for (const s of segs) {
        if (s.k === 'rect' || s.k === 'rrect') { x += s.x + s.w / 2; y += s.y + s.h / 2; n++; }
        else if (s.k === 'ellipse') { x += s.cx; y += s.cy; n++; }
        else if (s.k === 'L' || s.k === 'Q') { x += s.x; y += s.y; n++; }
    }
    return warp.affineAt(n ? x / n : 0, n ? y / n : 0);
}

function paintFill(ctx: Ctx, fill: Fill, path: Path2D, region: Matrix | null): void {
    if (fill.k === 'solid') {
        ctx.fillStyle = rgba(fill.color, fill.alpha);
        ctx.fill(path, 'evenodd');
        return;
    }
    const m = fill.matrix ? fill.matrix.clone() : new Matrix();
    if (region) m.concat(region);   // the fill follows its region's 9-slice scaling
    const dm = new DOMMatrix([m.a, m.b, m.c, m.d, m.tx, m.ty]);
    // paint in the fill's own space: the path is mapped there with the inverse fill matrix
    const inGradientSpace = new Path2D();
    inGradientSpace.addPath(path, dm.inverse());
    ctx.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    if (fill.k === 'gradient') {
        const g = fill.type === 'radial'
            ? ctx.createRadialGradient(fill.focal * HALF_BOX, 0, 0, 0, 0, HALF_BOX)
            : ctx.createLinearGradient(-HALF_BOX, 0, HALF_BOX, 0);
        fill.colors.forEach((c, i) => g.addColorStop(Math.max(0, Math.min(1, (fill.ratios[i] ?? 0) / 255)), rgba(c, fill.alphas[i] ?? 1)));
        ctx.fillStyle = g;
    } else {
        const pattern = ctx.createPattern(bitmapCanvas(fill.bitmap), fill.repeat ? 'repeat' : 'no-repeat');
        ctx.imageSmoothingEnabled = fill.smooth;
        if (!pattern) return;
        ctx.fillStyle = pattern;
    }
    ctx.fill(inGradientSpace, 'evenodd');
}

/** A BitmapData's canvas (set by BitmapData, which imports this module). */
export let bitmapCanvas: (b: BitmapData) => CanvasImageSource = () => { throw new Error('BitmapData not loaded'); };

export function setBitmapCanvasAccessor(fn: (b: BitmapData) => CanvasImageSource): void {
    bitmapCanvas = fn;
}

export function rgba(color: number, alpha: number): string {
    return `rgba(${(color >> 16) & 255},${(color >> 8) & 255},${color & 255},${Math.max(0, Math.min(1, alpha))})`;
}
