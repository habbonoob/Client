import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';

export interface IPartColor {
    get colorTransform(): ColorTransform;
    get redMultiplier(): number;
    get greenMultiplier(): number;
    get blueMultiplier(): number;
    get rgb(): number;
    get r(): number;
    get g(): number;
    get b(): number;
    get id(): number;
    get index(): number;
    get clubLevel(): number;
    get isSelectable(): boolean;
}
