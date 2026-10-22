import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';

export interface IRoomSpriteCanvasContainer {
    get roomObjectVariableAccurateZ(): string;
    getRoomObject(param1: string): IRoomObject;
    getRoomObjectWithIndex(param1: number): IRoomObject;
    getRoomObjectIdWithIndex(param1: number): string;
    getRoomObjectCount(): number;
    getRoomObjectIdentifier(param1: IRoomObject): string;
}
