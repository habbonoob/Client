import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export interface IAvatarAddition extends IDisposable {
    get id(): number;
    update(param1: IRoomObjectSprite, param2: number): void;
    animate(param1: IRoomObjectSprite): boolean;
}
