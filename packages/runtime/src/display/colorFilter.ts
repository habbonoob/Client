import { ColorMatrixFilter } from 'pixi.js';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';

/**
 * A colour transform as a PIXI colour-matrix filter: each channel becomes value * multiplier +
 * offset (offsets are 0-255 units; the filter works in 0-1). Alpha's multiplier is applied through
 * the node's alpha, so only its offset appears here.
 */
export function colorMatrixFilterFor(ct: ColorTransform): ColorMatrixFilter {
    const f = new ColorMatrixFilter();
    f.matrix = [
        ct.redMultiplier, 0, 0, 0, ct.redOffset / 255,
        0, ct.greenMultiplier, 0, 0, ct.greenOffset / 255,
        0, 0, ct.blueMultiplier, 0, ct.blueOffset / 255,
        0, 0, 0, 1, ct.alphaOffset / 255,
    ];
    return f;
}
