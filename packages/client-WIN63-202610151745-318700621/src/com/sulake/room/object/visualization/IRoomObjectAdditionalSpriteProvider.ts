import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export interface IRoomObjectAdditionalSpriteProvider {
    get additionalSpriteCount(): number;
    getAdditionalSprite(param1: number): IRoomObjectSprite;
}

export const IRoomObjectAdditionalSpriteProvider = Symbol('com.sulake.room.object.visualization::IRoomObjectAdditionalSpriteProvider');
registerClassName(IRoomObjectAdditionalSpriteProvider, 'com.sulake.room.object.visualization::IRoomObjectAdditionalSpriteProvider');

export function isIRoomObjectAdditionalSpriteProvider(value: unknown): value is IRoomObjectAdditionalSpriteProvider {
    return (value as { [IRoomObjectAdditionalSpriteProvider]?: true } | null | undefined)?.[IRoomObjectAdditionalSpriteProvider] === true;
}
