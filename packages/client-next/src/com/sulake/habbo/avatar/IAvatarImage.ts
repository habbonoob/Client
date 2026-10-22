import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import type { ISpriteDataContainer } from '@/com/sulake/habbo/avatar/animation/ISpriteDataContainer';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IAvatarImage extends IDisposable {
    getCroppedImage(param1: string, param2?: number): BitmapData;
    getHeadRegPoints(param1: string): Point;
    getFaceOffset(param1: string): Point;
    getImage(param1: string, param2: boolean, param3?: number): BitmapData;
    getImageWithCroppedTop(param1: string, param2: boolean, param3?: number): BitmapData;
    getServerRenderData(): any[];
    setDirection(param1: string, param2: number): void;
    setDirectionAngle(param1: string, param2: number): void;
    updateAnimationByFrames(param1?: number): void;
    getScale(): string;
    getSprites(): ISpriteDataContainer[];
    getLayerData(param1: ISpriteDataContainer): IAnimationLayerData;
    getAsset(param1: string): BitmapDataAsset;
    getDirection(): number;
    getFigure(): IAvatarFigureContainer;
    getPartColor(param1: string): IPartColor;
    isAnimating(): boolean;
    getCanvasOffsets(): any[];
    initActionAppends(): void;
    endActionAppends(): void;
    appendAction(param1: string, ...rest: any[]): boolean;
    get avatarSpriteData(): IAvatarDataContainer;
    isPlaceholder(): boolean;
    isBlocked(): boolean;
    forceActionUpdate(): void;
    get animationHasResetOnToggle(): boolean;
    resetAnimationFrameCounter(): void;
    get mainAction(): string;
    disposeInactiveActionCache(): void;
}

export const IAvatarImage = Symbol('com.sulake.habbo.avatar::IAvatarImage');
registerClassName(IAvatarImage, 'com.sulake.habbo.avatar::IAvatarImage');

export function isIAvatarImage(value: unknown): value is IAvatarImage {
    return (value as { [IAvatarImage]?: true } | null | undefined)?.[IAvatarImage] === true;
}
