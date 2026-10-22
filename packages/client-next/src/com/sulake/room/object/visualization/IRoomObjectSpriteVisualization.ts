import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
    get spriteCount(): number;
    getSprite(param1: number): IRoomObjectSprite;
    getSpriteList(): any[];
}

export const IRoomObjectSpriteVisualization = Symbol('com.sulake.room.object.visualization::IRoomObjectSpriteVisualization');
registerClassName(IRoomObjectSpriteVisualization, 'com.sulake.room.object.visualization::IRoomObjectSpriteVisualization');

export function isIRoomObjectSpriteVisualization(value: unknown): value is IRoomObjectSpriteVisualization {
    return (value as { [IRoomObjectSpriteVisualization]?: true } | null | undefined)?.[IRoomObjectSpriteVisualization] === true;
}
