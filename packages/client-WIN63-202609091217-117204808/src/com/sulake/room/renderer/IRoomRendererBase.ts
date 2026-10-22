import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';

export interface IRoomRendererBase {
    dispose(): void;
    reset(): void;
    feedRoomObject(param1: IRoomObject): void;
    removeRoomObject(param1: IRoomObject): void;
    update(param1: number): void;
}
