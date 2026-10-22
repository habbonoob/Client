import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';

export interface IAvatarDataContainer {
    get ink(): number;
    get colorTransform(): ColorTransform;
    get paletteIsGrayscale(): boolean;
    get reds(): any[];
    get greens(): any[];
    get blues(): any[];
    get alphas(): any[];
}
