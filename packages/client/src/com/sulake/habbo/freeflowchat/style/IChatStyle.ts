import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';

export interface IChatStyle {
    get selectorPreview(): BitmapData;
    get isSystemStyle(): boolean;
    get purchasable(): boolean;
    get isHcOnly(): boolean;
    get isAmbassadorOnly(): boolean;
    get isStaffOverrideable(): boolean;
    get overlap(): Rectangle;
    get textFormat(): TextFormat;
    getNewBackgroundSprite(param1?: number): Sprite;
}
