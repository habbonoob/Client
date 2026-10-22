import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';

export interface IRoomInstanceContainer {
    createRoomObject(param1: string, param2: number, param3: string, param4: number): IRoomObject;
    createRoomObjectManager(): IRoomObjectManager;
}
