import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';

export interface IStackedAddition {
    get id(): number;
    get disposed(): boolean;
    get isPartOfStack(): boolean;
    set isPartOfStack(param1: boolean);
    get contributesToStackLayout(): boolean;
    get invisible(): boolean;
    get isFinished(): boolean;
    get requiresAnimationTick(): boolean;
    update(param1: IRoomObjectSprite, param2: number): void;
    animate(param1: IRoomObjectSprite): boolean;
    dispose(): void;
}
