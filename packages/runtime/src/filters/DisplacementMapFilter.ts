import { DisplacementFilter, Sprite as PixiSprite, type Filter } from 'pixi.js';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapFilter } from './BitmapFilter';

const CHANNEL: Record<number, number> = { 1: 0, 2: 1, 4: 2, 8: 3 };

/**
 * Moves pixels by amounts read from a map image: the destination pixel (x, y) takes the source pixel
 * at (x + (C(x,y) − 128) · scaleX / 256, y + (C'(x,y) − 128) · scaleY / 256), where C and C' are the
 * chosen channels (1 red, 2 green, 4 blue, 8 alpha) of the map placed at mapPoint. Outside the
 * source: 'wrap', 'clamp', 'ignore' (keep the source pixel) or 'color' (color/alpha).
 */
export class DisplacementMapFilter extends BitmapFilter {
    mapBitmap: BitmapData | null;
    mapPoint: Point | null;
    componentX: number;
    componentY: number;
    scaleX: number;
    scaleY: number;
    mode: string;
    color: number;
    alpha: number;

    constructor(mapBitmap: BitmapData = null, mapPoint: Point = null, componentX: number = 0, componentY: number = 0,
        scaleX: number = 0, scaleY: number = 0, mode: string = 'wrap', color: number = 0, alpha: number = 0) {
        super();
        this.mapBitmap = mapBitmap;
        this.mapPoint = mapPoint;
        this.componentX = componentX;
        this.componentY = componentY;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.mode = mode;
        this.color = color >>> 0;
        this.alpha = alpha;
    }

    clone(): DisplacementMapFilter {
        return new DisplacementMapFilter(this.mapBitmap, this.mapPoint, this.componentX, this.componentY, this.scaleX, this.scaleY, this.mode, this.color, this.alpha);
    }

    createRenderFilter(): Filter | null {
        if (!this.mapBitmap) return null;
        const sprite = new PixiSprite(this.mapBitmap.texture());
        if (this.mapPoint) sprite.position.set(this.mapPoint.x, this.mapPoint.y);
        return new DisplacementFilter({ sprite, scale: { x: this.scaleX, y: this.scaleY } });
    }

    protected filterPixels(source: ImageData): ImageData {
        const map = this.mapBitmap;
        const { width: w, height: h, data: s } = source;
        const out = new ImageData(w, h);
        const o = out.data;
        if (!map) { o.set(s); return out; }
        const cx = CHANNEL[this.componentX] ?? -1, cy = CHANNEL[this.componentY] ?? -1;
        const mx = this.mapPoint?.x ?? 0, my = this.mapPoint?.y ?? 0;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const mv = map.getPixel32(x - mx, y - my);
                const channel = (c: number) => (c < 0 ? 128 : c === 3 ? mv >>> 24 : (mv >> (16 - c * 8)) & 255);
                let sx = Math.round(x + (channel(cx) - 128) * this.scaleX / 256);
                let sy = Math.round(y + (channel(cy) - 128) * this.scaleY / 256);
                const di = (y * w + x) * 4;
                if (sx < 0 || sy < 0 || sx >= w || sy >= h) {
                    if (this.mode === 'wrap') { sx = ((sx % w) + w) % w; sy = ((sy % h) + h) % h; }
                    else if (this.mode === 'clamp') { sx = Math.max(0, Math.min(w - 1, sx)); sy = Math.max(0, Math.min(h - 1, sy)); }
                    else if (this.mode === 'ignore') { sx = x; sy = y; }
                    else {
                        o[di] = (this.color >> 16) & 255; o[di + 1] = (this.color >> 8) & 255; o[di + 2] = this.color & 255; o[di + 3] = this.alpha * 255;
                        continue;
                    }
                }
                const si = (sy * w + sx) * 4;
                o[di] = s[si]; o[di + 1] = s[si + 1]; o[di + 2] = s[si + 2]; o[di + 3] = s[si + 3];
            }
        }
        return out;
    }
}
