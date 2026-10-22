// AIR 32's glyph rasterisation, as js-client reproduces it: glyph outlines come as IMP1 records captured
// from the runtime (Adobe AIR.dll 51.3), rasterised as ADF distances for ADVANCED anti-aliasing (with
// the runtime's CSM cutoffs, sharpness and thickness) or as 4x4 sample masks for NORMAL. The arithmetic
// is float32 where the runtime's is (Math.fround) and every rounding is the runtime's.

const f32 = Math.fround;

// ---------- rounding and colour ----------

export function roundTiesEven(v: number): number {
    if (!Number.isFinite(v)) throw new TypeError('value must be finite');
    const floor = Math.floor(v), frac = v - floor;
    return frac < 0.5 ? floor : frac > 0.5 ? floor + 1 : floor % 2 === 0 ? floor : floor + 1;
}

/** round(numerator / denominator), ties to even, for safe non-negative integers. */
export function roundRationalTiesEven(numerator: number, denominator: number): number {
    if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator) || numerator < 0 || denominator <= 0) {
        throw new RangeError('roundRationalTiesEven requires safe non-negative integers');
    }
    const q = Math.floor(numerator / denominator), twice = (numerator - q * denominator) * 2 - denominator;
    return twice < 0 ? q : twice > 0 ? q + 1 : q % 2 === 0 ? q : q + 1;
}

/** An alpha multiplier (0..1) as the runtime quantises it (0..255). */
export function quantizeAlphaMultiplier(alpha: number): number {
    if (!Number.isFinite(alpha)) throw new TypeError('alphaMultiplier must be finite');
    const q = Math.max(0, Math.min(256, Math.floor(Math.max(0, Math.min(1, alpha)) * 256)));
    return Math.max(0, q - 1);
}

export type Rgba = [number, number, number, number];

export function premultiply(color: Rgba): Rgba {
    const a = color[3], m = a + 1;
    return [Math.floor((color[0] * m) / 256), Math.floor((color[1] * m) / 256), Math.floor((color[2] * m) / 256), a];
}

/** One premultiplied component composited over `destination` through `mask`, as the runtime blends. */
export function blendComponent(destination: number, foreground: number, globalAlpha: number, mask: number): number {
    const kept = Math.floor((destination * globalAlpha) / 256);
    return clampByte(destination + Math.floor(((foreground - kept) * mask) / 256));
}

function clampByte(v: number): number {
    return Math.max(0, Math.min(255, v));
}

/** Whether text of this colour uses the runtime's dark or light CSM table. */
export function colorType(color: Rgba): 'dark' | 'light' {
    const m = color[3] + 1;
    const r = Math.floor((color[0] * m) / 256), g = Math.floor((color[1] * m) / 256), b = Math.floor((color[2] * m) / 256);
    return 30 * r + 59 * g + 11 * b > 20000 ? 'light' : 'dark';
}

// ---------- CSM (continuous stroke modulation) cutoffs ----------

interface CsmRecord { pixelSize: number; outside: number; inside: number; gamma: number }
export interface Cutoffs { outside: number; inside: number; gamma: number }

const csm = (pixelSize: number, outside: number, inside: number): CsmRecord => ({ pixelSize, outside, inside, gamma: 1 });

/** The runtime's CSM tables, by the font's alignment-zone table hint (0, 1, 2). */
const CSM_TABLES: readonly { dark: readonly CsmRecord[]; light: readonly CsmRecord[] }[] = [
    {
        dark: [csm(8, -0.5299999713897705, 0.25), csm(12, -0.4399999976158142, 0.20000000298023224),
            csm(13.333333969116211, -0.43799999356269836, 0.23800000548362732), csm(26.666667938232422, -0.6000000238418579, 0.4000000059604645)],
        light: [csm(8, -0.824999988079071, 0.07500000298023224), csm(12, -0.824999988079071, 0.02500000037252903),
            csm(16, -0.8199999928474426, 0.11999999731779099), csm(26.666667938232422, -0.8600000143051147, 0.3400000035762787)],
    },
    {
        dark: [csm(8, -0.4399999976158142, 0.4359999895095825), csm(10.666666984558105, -0.4300000071525574, 0.49399998784065247),
            csm(12, -0.41999998688697815, 0.5600000023841858), csm(17.33333396911621, -0.41999998688697815, 0.5600000023841858),
            csm(26.666667938232422, -0.4699999988079071, 0.6100000143051147)],
        light: [csm(8, -0.675000011920929, 0.07500000298023224), csm(12, -0.5450000166893005, 0.3050000071525574),
            csm(16, -0.5, 0.4399999976158142), csm(26.666667938232422, -0.550000011920929, 0.6499999761581421)],
    },
    {
        dark: [csm(8, -0.41999998688697815, 0.5600000023841858), csm(16, -0.41999998688697815, 0.5600000023841858),
            csm(26.666667938232422, -0.4699999988079071, 0.6100000143051147)],
        light: [csm(8, -0.574999988079071, 0.17499999701976776), csm(12, -0.39500001072883606, 0.45500001311302185),
            csm(16, -0.41999998688697815, 0.5199999809265137), csm(26.666667938232422, -0.550000011920929, 0.6499999761581421)],
    },
];

function interpolateCsm(pixelSize: number, table: readonly CsmRecord[]): Cutoffs {
    const size = f32(pixelSize);
    if (size <= table[0].pixelSize) return { ...table[0] };
    const last = table[table.length - 1];
    if (size >= last.pixelSize) return { ...last };
    for (let i = 1; i < table.length; i++) {
        const hi = table[i];
        if (size <= hi.pixelSize) {
            const lo = table[i - 1], t = f32((size - lo.pixelSize) / (hi.pixelSize - lo.pixelSize));
            return { outside: f32(lo.outside + (hi.outside - lo.outside) * t), inside: f32(lo.inside + (hi.inside - lo.inside) * t), gamma: lo.gamma };
        }
    }
    return { ...last };
}

/** A text field's cutoffs: the CSM table at its size, moved by its sharpness and thickness. */
export function textFieldCutoffs(pixelSize: number, thickness: number, sharpness: number, type: 'dark' | 'light', tableHint: number): Cutoffs {
    const table = CSM_TABLES[tableHint]?.[type];
    if (!table) throw new RangeError('csmTableHint must be 0, 1, or 2');
    const base = interpolateCsm(pixelSize, table);
    const s = Math.max(-400, Math.min(400, sharpness)) / 1e4, t = Math.max(-200, Math.min(200, thickness)) / 1e4;
    return { outside: base.outside + pixelSize * (s / 2 - t), inside: base.inside - pixelSize * (s / 2 + t), gamma: base.gamma };
}

// ---------- IMP1 glyph records ----------

export interface Imp1Command { opcode: 0 | 1 | 2; x: number; y: number; controlX: number; controlY: number }

export interface Imp1Glyph {
    userId: number;
    normalizationFactor: number;
    normalizedEm: number;
    pathType: number;
    referenceX: number;
    referenceY: number;
    encodedSaz: number[];
    sazMask: number;
    commands: Imp1Command[];
}

const IMP1_MAGIC = 0x494d5031; // "1PMI" little-endian
const IMP1_HEADER = 80;

export function parseImp1(bytes: Uint8Array): Imp1Glyph {
    if (bytes.byteLength < IMP1_HEADER) throw new RangeError('IMP1 block is shorter than its 0x50-byte header');
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (v.getUint32(0, true) !== IMP1_MAGIC) throw new Error('invalid IMP1 magic');
    const total = v.getUint32(4, true), header = v.getUint32(8, true), count = v.getUint32(12, true);
    if (header !== IMP1_HEADER) throw new Error(`unsupported IMP1 header size ${header}`);
    const needed = header + count * 20;
    if (total !== needed || total > bytes.byteLength) throw new Error(`inconsistent IMP1 size: header declares ${total}, commands require ${needed}`);
    const glyph: Imp1Glyph = {
        userId: v.getUint32(16, true),
        normalizationFactor: v.getFloat32(20, true),
        normalizedEm: v.getFloat32(24, true),
        pathType: v.getUint32(28, true),
        referenceX: v.getFloat32(36, true),
        referenceY: v.getFloat32(40, true),
        encodedSaz: [v.getUint32(60, true), v.getUint32(64, true), v.getUint32(68, true), v.getUint32(72, true)],
        sazMask: v.getUint32(76, true),
        commands: [],
    };
    if (glyph.pathType !== 0 && glyph.pathType !== 1) throw new Error(`unsupported IMP1 path type ${glyph.pathType}`);
    for (let i = 0; i < count; i++) {
        const at = header + i * 20, opcode = v.getUint32(at, true);
        if (opcode > 2) throw new Error(`unsupported IMP1 opcode ${opcode}`);
        glyph.commands.push({
            opcode: opcode as 0 | 1 | 2,
            x: v.getFloat32(at + 4, true), y: v.getFloat32(at + 8, true),
            controlX: v.getFloat32(at + 12, true), controlY: v.getFloat32(at + 16, true),
        });
    }
    return glyph;
}

// ---------- ADVANCED: the glyph's outline in device space, and its ADF distances ----------

interface Point { x: number; y: number }
interface Segment { from: Point; to: Point }
type Matrix = readonly number[];

/** The outline through `matrix` (a, b, tx, c, d, ty), quadratics flattened as the runtime does, as segments. */
function transformAndFlatten(glyph: Imp1Glyph, matrix: Matrix): Segment[] {
    if (glyph.pathType !== 0) throw new RangeError('only filled IMP1 paths are currently supported');
    const [a, b, tx, c, d, ty] = matrix;
    const map = (x: number, y: number): Point => ({ x: f32(x * a + y * b + tx), y: f32(x * c + y * d + ty) });
    const out: Segment[] = [];
    let start: Point | null = null, at: Point = { x: 0, y: 0 };
    const lineTo = (p: Point) => {
        if (start === null) throw new Error('line command precedes a move');
        out.push({ from: start, to: p });
        start = p;
    };
    for (const cmd of glyph.commands) {
        const p = map(cmd.x, cmd.y);
        if (cmd.opcode === 0) { start = p; at = p; continue; }
        if (cmd.opcode === 1) { lineTo(p); at = p; continue; }
        const ctrl = map(cmd.controlX, cmd.controlY);
        const dx = f32(ctrl.x - (p.x + at.x) * 0.5), dy = f32(ctrl.y - (p.y + at.y) * 0.5);
        const steps = Math.trunc(Math.sqrt(f32(Math.sqrt(dx * dx + dy * dy)) * 5)) + 1;
        const step = f32(1 / steps);
        let t = step;
        for (let i = 1; i < steps; ++i) {
            const u = f32(1 - t), uu = f32(u * u), tu2 = f32((t + t) * u), tt = f32(t * t);
            lineTo({ x: f32(at.x * uu + ctrl.x * tu2 + p.x * tt), y: f32(at.y * uu + ctrl.y * tu2 + p.y * tt) });
            t = f32(t + step);
        }
        lineTo(p);
        at = p;
    }
    return out;
}

const FAR = -1000;
const SCAN_BIAS = 0.0010000000474974513;
const SCAN_EPSILON = f32(1e-8);

interface Grid { width: number; height: number; values: Float32Array }

/** Signed distances (inside positive) within the cutoff band of every pixel centre, grayscale. */
function adfDistances(segments: Segment[], width: number, height: number, outside: number, inside: number): Grid {
    const band = f32(Math.max(Math.abs(f32(outside)), Math.abs(f32(inside))));
    const grid: Grid = { width, height, values: new Float32Array(width * height).fill(FAR) };
    if (band !== 0) {
        for (const s of segments) segmentBand(s, band, grid);
        for (const s of segments) endpointBand(s.to, band, grid);
    }
    applyWindingSigns(segments, grid);
    return grid;
}

/** The distances to one segment across the band around it (unsigned, stored negative). */
function segmentBand(s: Segment, band: number, grid: Grid): void {
    const { from, to } = s;
    const dx = f32(to.x - from.x), dy = f32(to.y - from.y), len = f32(Math.sqrt(dx * dx + dy * dy));
    if (!(len > 0)) return;
    const inv = f32(1 / len), nx = f32(dy * inv), ny = f32(-dx * inv);
    if (nx === 0 || ny === 0) { axisBand(s, band, nx, grid); return; }
    const ox = f32(band * nx), oy = f32(band * ny);
    const vertex = (x: number, y: number, distance: number): EdgeVertex => ({ x: f32(x), y: f32(y), distance });
    const p0 = vertex(from.x - ox, from.y - oy, -band), p1 = vertex(from.x + ox, from.y + oy, band);
    const p2 = vertex(to.x - ox, to.y - oy, -band), p3 = vertex(to.x + ox, to.y + oy, band);
    const along = f32((to.x - from.x) / (to.y - from.y));
    const across = f32(nx / ny), dStep = f32(1 / ny);
    const edges = [edge(p0, p2, along, 0), edge(p1, p3, along, 0), edge(p0, p1, across, dStep), edge(p2, p3, across, dStep)];
    fillBandRows(edges, f32(nx), grid);
}

interface EdgeVertex { x: number; y: number; distance: number }
type Edge = Map<number, { x: number; distance: number }>;

function edge(a: EdgeVertex, b: EdgeVertex, dxdy: number, ddistdy: number): Edge {
    const top = a.y <= b.y ? a : b, bottom = top === a ? b : a;
    const first = Math.max(0, Math.ceil(top.y)), last = Math.floor(bottom.y);
    const lead = f32(first - top.y);
    let x = f32(lead * dxdy + top.x), distance = f32(lead * ddistdy + top.distance);
    const rows: Edge = new Map();
    for (let y = first; y <= last; y++) {
        rows.set(y, { x, distance });
        x = f32(x + dxdy);
        distance = f32(distance + ddistdy);
    }
    return rows;
}

function fillBandRows(edges: Edge[], ddistdx: number, grid: Grid): void {
    for (let y = 0; y < grid.height; y++) {
        const hits: { x: number; distance: number }[] = [];
        for (const e of edges) { const h = e.get(y); if (h) hits.push(h); }
        if (hits.length < 2) continue;
        hits.sort((a, b) => a.x - b.x);
        const left = hits[0], right = hits[hits.length - 1];
        const x0 = Math.max(0, Math.ceil(left.x)), x1 = Math.min(grid.width - 1, Math.ceil(right.x) - 1);
        if (x0 > x1) continue;
        let distance = f32((x0 - left.x) * ddistdx + left.distance);
        for (let x = x0, i = y * grid.width + x0; x <= x1; x++, i++) {
            const d = -Math.abs(distance);
            if (Math.abs(d) <= Math.abs(grid.values[i])) grid.values[i] = d;
            distance = f32(distance + ddistdx);
        }
    }
}

/** The distances to a segment's end point across the band (a disc). */
function endpointBand(p: Point, band: number, grid: Grid): void {
    const x0 = Math.max(0, Math.ceil(p.x - band)), x1 = Math.min(grid.width - 1, Math.ceil(p.x + band) - 1);
    const y0 = Math.max(0, Math.ceil(p.y - band)), y1 = Math.min(grid.height - 1, Math.ceil(p.y + band) - 1);
    if (x0 > x1 || y0 > y1) return;
    const dxs = new Float32Array(x1 - x0 + 1);
    let dx = f32(x0 - p.x);
    for (let i = 0; i < dxs.length; i++) { dxs[i] = dx; dx = f32(dx + 1); }
    let dy = f32(y0 - p.y);
    for (let y = y0; y <= y1; y++) {
        for (let x = x0, i = y * grid.width + x0; x <= x1; x++, i++) {
            const h = dxs[x - x0], sq = f32(h * h + dy * dy);
            if (grid.values[i] * grid.values[i] >= sq) grid.values[i] = -f32(Math.sqrt(sq));
        }
        dy = f32(dy + 1);
    }
}

/** The band around a horizontal or vertical segment. */
function axisBand(s: Segment, band: number, nx: number, grid: Grid): void {
    const vertical = nx !== 0;
    const left = f32(vertical ? s.from.x - band : Math.min(s.from.x, s.to.x));
    const right = f32(vertical ? s.from.x + band : Math.max(s.from.x, s.to.x));
    const top = f32(vertical ? Math.min(s.from.y, s.to.y) : s.from.y - band);
    const bottom = f32(vertical ? Math.max(s.from.y, s.to.y) : s.from.y + band);
    const x0 = Math.max(0, Math.ceil(left)), x1 = Math.min(grid.width - 1, Math.ceil(right) - 1);
    const y0 = Math.max(0, Math.ceil(top)), y1 = Math.min(grid.height - 1, Math.ceil(bottom) - 1);
    if (x0 > x1 || y0 > y1) return;
    if (vertical) {
        const startDx = f32(s.from.x - x0);
        for (let y = y0; y <= y1; y++) {
            let dx = startDx;
            for (let x = x0, i = y * grid.width + x0; x <= x1; x++, i++) {
                const d = -Math.abs(dx);
                if (Math.abs(d) <= Math.abs(grid.values[i])) grid.values[i] = d;
                dx = f32(dx - 1);
            }
        }
    } else {
        let dy = f32(s.from.y - y0);
        for (let y = y0; y <= y1; y++) {
            const d = -Math.abs(dy);
            for (let x = x0, i = y * grid.width + x0; x <= x1; x++, i++) if (Math.abs(d) <= Math.abs(grid.values[i])) grid.values[i] = d;
            dy = f32(dy - 1);
        }
    }
}

/** Flip the sign of every distance inside the outline (non-zero winding, scanned per row). */
function applyWindingSigns(segments: Segment[], grid: Grid): void {
    const winding = new Int8Array(grid.width * grid.height);
    for (const s of segments) windingLine(s, winding, grid);
    for (let y = 0; y < grid.height; y++) {
        let w = 0;
        for (let x = 0, i = y * grid.width; x < grid.width; x++, i++) {
            w = (w + winding[i]) & 255;
            if (w !== 0) grid.values[i] = -grid.values[i];
        }
    }
}

function windingLine(s: Segment, winding: Int8Array, grid: Grid): void {
    const fx = f32(s.from.x), tx = f32(s.to.x);
    const fy = biasScanY(f32(s.from.y)), ty = biasScanY(f32(s.to.y));
    const fr = Math.trunc(fy), tr = Math.trunc(ty);
    if (fr === tr || (fy < 0 && ty < 0)) return;
    const down = ty > fy;
    const first = (down ? fy : ty) >= 0 ? (down ? fr : tr) + 1 : 0;
    const last = Math.min(grid.height - 1, down ? tr : fr);
    if (first > last) return;
    const w = f32(tx - fx), invH = f32(1 / (ty - fy)), lead = f32((first - fy) * invH), step = f32(w * invH);
    let x = f32(w * lead + fx + 1);
    const dir = down ? 1 : -1;
    for (let y = first, i = first * grid.width; y <= last; y++, i += grid.width) {
        const col = Math.trunc(x);
        if (col >= 0 && col < grid.width) winding[i + col] += dir;
        x = f32(x + step);
    }
}

/** A scanline y that lands (within float error) on a whole row moves just above it. */
function biasScanY(y: number): number {
    const whole = Math.trunc(y);
    let off = whole - y;
    if (off < 0) off = -whole - y;
    return f32(off) <= SCAN_EPSILON ? f32(y - SCAN_BIAS) : y;
}

// ---------- ADVANCED: where a glyph lands (alignment zones fit its scale and pen to the grid) ----------

const f32View = new DataView(new ArrayBuffer(4));

export function float32Bits(v: number): number {
    if (!Number.isFinite(v)) throw new TypeError('value must be finite');
    f32View.setFloat32(0, v, true);
    return f32View.getUint32(0, true);
}

function float32FromBits(bits: number): number {
    f32View.setUint32(0, bits >>> 0, true);
    return f32View.getFloat32(0, true);
}

interface AlignmentZones { mask: number; xCoordinate: number; yCoordinate: number; xSpan: number; ySpan: number }

function decodeAlignmentZones(glyph: Imp1Glyph): AlignmentZones {
    const words = glyph.encodedSaz.map(float32FromBits), mask = glyph.sazMask;
    return {
        mask,
        xCoordinate: (mask & 1) === 0 ? 0 : words[0],
        yCoordinate: (mask & 2) === 0 ? 0 : words[1],
        xSpan: (mask & 1) === 0 ? 0 : words[2],
        ySpan: (mask & 2) === 0 ? 0 : words[3],
    };
}

function fitZoneScale(scale: number, normalizedEm: number, span: number, bias: number): number {
    if (span === 0) return f32(scale);
    const size = f32(f32(scale) * f32(normalizedEm * span));
    const fitted = bias === 0.5 ? roundTiesEven(size) : Math.trunc(size + bias);
    return fitted <= 0 ? f32(scale) : f32(f32(scale) * (fitted / size));
}

interface AxisSetup { offset: number; translation: number; residual: number }

function zoneAxis(pen: number, scale: number, normalizedEm: number, reference: number, emCoordinate: number, lcd: boolean): AxisSetup {
    const zone = f32(reference + normalizedEm * emCoordinate);
    const centered0 = f32(f32(pen - f32(scale * reference)) - 0.5);
    const anchor = f32(centered0 + scale * zone);
    const residual = f32(Math.floor(anchor) + 0.5 - anchor);
    const centered = f32(centered0 + residual);
    const offset = Math.floor(centered + (lcd ? LCD_BIAS : 0.5));
    return { offset, translation: f32(centered - offset), residual };
}

function plainAxis(pen: number, scale: number, reference: number, lcd: boolean): AxisSetup {
    const biased = f32(pen - f32(scale * reference));
    const offset = Math.floor(biased - (lcd ? 1 / 3 : 0));
    return { offset, translation: f32(f32(biased - 0.5) - offset), residual: 0 };
}

const LCD_BIAS = 0.1666666716337204;
const Y_ZONE_BIAS = 0.800000011920929;

export interface GlyphSetup {
    scaleX: number;
    scaleY: number;
    normalizedScaleX: number;
    residualX: number;
    zones: AlignmentZones;
    matrix: Matrix;
    matrixBits: number[];
    width: number;
    height: number;
    originX: number;
    originY: number;
}

/** Where the runtime puts a glyph at `pointSize` with its pen at (penX, penY) (LCD, as it lays text out). */
export function advancedPixelSetup(glyph: Imp1Glyph, pointSize: number, penX: number, penY: number): GlyphSetup {
    if (glyph.pathType !== 0 || (glyph.sazMask & -4) !== 0) throw new RangeError('the exact setup currently covers filled glyphs');
    if (!Number.isFinite(pointSize) || pointSize <= 0) throw new RangeError('pointSize must be positive and finite');
    const scale = f32(f32(pointSize) / glyph.normalizedEm);
    const zones = decodeAlignmentZones(glyph);
    const scaleX = fitZoneScale(scale, glyph.normalizedEm, zones.xSpan, 0.5);
    const scaleY = fitZoneScale(scale, glyph.normalizedEm, zones.ySpan, Y_ZONE_BIAS);
    const x = (zones.mask & 1) === 0 ? plainAxis(f32(penX), scaleX, glyph.referenceX, true) : zoneAxis(f32(penX), scaleX, glyph.normalizedEm, glyph.referenceX, zones.xCoordinate, true);
    const y = (zones.mask & 2) === 0 ? plainAxis(f32(penY), scaleY, glyph.referenceY, false) : zoneAxis(f32(penY), scaleY, glyph.normalizedEm, glyph.referenceY, zones.yCoordinate, false);
    const width = Math.trunc(scaleX + 5 / 3), height = Math.trunc(scaleY + 1);
    if (width < 1 || height < 1 || width > 65535 || height > 65535) throw new RangeError('derived native glyph image is outside uint16 bounds');
    const matrix = [scaleX, 0, x.translation, 0, scaleY, y.translation, 0, 0, 1];
    return {
        scaleX, scaleY,
        normalizedScaleX: f32(scaleX * glyph.normalizationFactor),
        residualX: x.residual,
        zones, matrix, matrixBits: matrix.map(float32Bits),
        width, height,
        originX: x.offset,
        originY: -(height + y.offset),
    };
}

/** The same glyph as Habbo's retained (grayscale) text draws it. */
export function advancedRetainedSetup(glyph: Imp1Glyph, pointSize: number, penX: number, penY: number): GlyphSetup {
    const s = advancedPixelSetup(glyph, pointSize, penX, penY);
    const x = (s.zones.mask & 1) === 0 ? plainAxis(f32(penX), s.scaleX, glyph.referenceX, false) : zoneAxis(f32(penX), s.scaleX, glyph.normalizedEm, glyph.referenceX, s.zones.xCoordinate, false);
    const width = Math.trunc(s.scaleX + 1);
    if (width < 1 || width > 65535) throw new RangeError('derived retained glyph image is outside uint16 bounds');
    const matrix = [s.scaleX, 0, x.translation, 0, s.scaleY, s.matrix[5], 0, 0, 1];
    return { ...s, matrix, matrixBits: matrix.map(float32Bits), width, originX: x.offset, residualX: x.residual };
}

export interface GlyphCoverage { width: number; height: number; coverage: Uint8Array }

/** A glyph's grayscale coverage at a retained setup (rows bottom-up, as the runtime keeps them). */
export function rasterizeRetained(glyph: Imp1Glyph, setup: GlyphSetup, cutoffs: Cutoffs): GlyphCoverage {
    const outside = f32(cutoffs.outside), inside = f32(cutoffs.inside);
    const grid = adfDistances(transformAndFlatten(glyph, setup.matrix), setup.width, setup.height, outside, inside);
    const coverage = new Uint8Array(grid.values.length);
    for (let i = 0; i < coverage.length; i++) {
        const d = grid.values[i];
        coverage[i] = d < outside ? 0 : d >= inside || outside === inside ? 255 : Math.trunc((255 * (d - outside)) / (inside - outside));
    }
    return { width: setup.width, height: setup.height, coverage };
}

// ---------- NORMAL: 4x4 sample masks (HIGH quality) or one sample (LOW) per pixel ----------

interface Edge2 { fromX: number; fromY: number; toX: number; toY: number }

function placedLines(glyph: Imp1Glyph, originX: number, baselineY: number, scale: number): Edge2[] {
    const out: Edge2[] = [];
    let at: Point | null = null;
    for (const cmd of glyph.commands) {
        const p = { x: originX + (cmd.x - glyph.referenceX) * scale, y: baselineY + (glyph.referenceY - cmd.y) * scale };
        if (cmd.opcode === 0) { at = p; continue; }
        if (cmd.opcode === 2) throw new RangeError('exact AIR32 NORMAL rasterization currently requires line-only IMP1 outlines');
        if (at === null) throw new Error('IMP1 line command precedes its move command');
        out.push({ fromX: at.x, fromY: at.y, toX: p.x, toY: p.y });
        at = p;
    }
    return out;
}

function lineBounds(lines: Edge2[], width: number, height: number) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const l of lines) {
        minX = Math.min(minX, l.fromX, l.toX); maxX = Math.max(maxX, l.fromX, l.toX);
        minY = Math.min(minY, l.fromY, l.toY); maxY = Math.max(maxY, l.fromY, l.toY);
    }
    return {
        x0: Math.max(0, Math.floor(minX) - 1), x1: Math.min(width, Math.ceil(maxX) + 1),
        y0: Math.max(0, Math.floor(minY) - 1), y1: Math.min(height, Math.ceil(maxY) + 1),
    };
}

function nonZeroWinding(lines: Edge2[], x: number, y: number): boolean {
    let w = 0;
    for (const l of lines) {
        const cross = (l.toX - l.fromX) * (y - l.fromY) - (x - l.fromX) * (l.toY - l.fromY);
        if (l.fromY <= y) { if (l.toY > y && cross > 0) w++; } else if (l.toY <= y && cross < 0) w--;
    }
    return w !== 0;
}

const SAMPLE_OFFSETS = [0.125, 0.375, 0.625, 0.875];

/** OR one glyph's 4x4 sample coverage into `masks` (one 16-bit mask per pixel). */
export function rasterizeNormal(glyph: Imp1Glyph, masks: Uint16Array, width: number, height: number, originX: number, baselineY: number, size: number, emSquare: number): void {
    if (glyph.pathType !== 0) throw new RangeError('exact AIR32 NORMAL rasterization currently supports filled IMP1 paths');
    const lines = placedLines(glyph, originX, baselineY, (20 * (size / emSquare)) / glyph.normalizationFactor);
    if (lines.length === 0) return;
    const { x0, x1, y0, y1 } = lineBounds(lines, width, height);
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            let mask = 0, bit = 1;
            for (const sy of SAMPLE_OFFSETS) {
                for (const sx of SAMPLE_OFFSETS) {
                    if (nonZeroWinding(lines, x + sx, y + sy)) mask |= bit;
                    bit <<= 1;
                }
            }
            masks[y * width + x] |= mask;
        }
    }
}

/** Mark the pixels whose centre one glyph covers (LOW quality). */
export function rasterizeLowNormal(glyph: Imp1Glyph, coverage: Uint8Array, width: number, height: number, originX: number, baselineY: number, size: number, emSquare: number): void {
    if (glyph.pathType !== 0) throw new RangeError('exact AIR LOW NORMAL rasterization currently supports filled IMP1 paths');
    const lines = placedLines(glyph, originX, baselineY, (20 * (size / emSquare)) / glyph.normalizationFactor);
    if (lines.length === 0) return;
    const { x0, x1, y0, y1 } = lineBounds(lines, width, height);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (nonZeroWinding(lines, x + 0.5, y + 0.5)) coverage[y * width + x] = 255;
}

/** A 4x4 sample mask's coverage as the runtime's density (0..255). */
export function sampleMaskDensity(mask: number): number {
    let n = mask - ((mask >>> 1) & 0x5555);
    n = (n & 0x3333) + ((n >>> 2) & 0x3333);
    n = (n + (n >>> 4)) & 0x0f0f;
    const count = (n + (n >>> 8)) & 31;
    return count === 0 ? 0 : count * 16 - 1;
}
