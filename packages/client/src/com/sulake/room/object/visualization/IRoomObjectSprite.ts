import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IRoomObjectSprite {
    get asset(): BitmapData;
    set asset(param1: BitmapData);
    get assetName(): string;
    set assetName(param1: string);
    get libraryAssetName(): string;
    set libraryAssetName(param1: string);
    get assetPosture(): string;
    set assetPosture(param1: string);
    get visible(): boolean;
    set visible(param1: boolean);
    get tag(): string;
    set tag(param1: string);
    get alpha(): number;
    set alpha(param1: number);
    get color(): number;
    set color(param1: number);
    get blendMode(): string;
    set blendMode(param1: string);
    get filters(): any[];
    set filters(param1: any[]);
    get flipH(): boolean;
    set flipH(param1: boolean);
    get flipV(): boolean;
    set flipV(param1: boolean);
    get direction(): number;
    set direction(param1: number);
    get offsetX(): number;
    set offsetX(param1: number);
    get offsetY(): number;
    set offsetY(param1: number);
    get width(): number;
    get height(): number;
    get relativeDepth(): number;
    set relativeDepth(param1: number);
    get varyingDepth(): boolean;
    set varyingDepth(param1: boolean);
    get clickHandling(): boolean;
    set clickHandling(param1: boolean);
    get skipMouseHandling(): boolean;
    set skipMouseHandling(param1: boolean);
    get instanceId(): number;
    get updateId(): number;
    get spriteType(): number;
    set spriteType(param1: number);
    get objectType(): string;
    set objectType(param1: string);
    get alphaTolerance(): number;
    set alphaTolerance(param1: number);
    get planeId(): number;
    set planeId(param1: number);
}

export const IRoomObjectSprite = Symbol('com.sulake.room.object.visualization::IRoomObjectSprite');
registerClassName(IRoomObjectSprite, 'com.sulake.room.object.visualization::IRoomObjectSprite');

export function isIRoomObjectSprite(value: unknown): value is IRoomObjectSprite {
    return (value as { [IRoomObjectSprite]?: true } | null | undefined)?.[IRoomObjectSprite] === true;
}
