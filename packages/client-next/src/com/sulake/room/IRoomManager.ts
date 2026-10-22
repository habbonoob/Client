import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomContentLoader } from '@/com/sulake/room/IRoomContentLoader';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomManagerListener } from '@/com/sulake/room/IRoomManagerListener';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomManager extends IUnknown {
    initialize(param1: XML, param2: IRoomManagerListener): boolean;
    update(param1: number): void;
    setContentLoader(param1: IRoomContentLoader): void;
    addObjectUpdateCategory(param1: number): void;
    removeObjectUpdateCategory(param1: number): void;
    createRoom(param1: string, param2: XML): IRoomInstance;
    disposeRoom(param1: string): boolean;
    updateVariableFxConfigs(param1: string, param2: any[]): void;
    removeVariableFxConfigs(param1: string, param2: any[]): void;
    getRoom(param1: string): IRoomInstance;
    getRoomWithIndex(param1: number): IRoomInstance;
    getRoomCount(): number;
    isContentAvailable(param1: string): boolean;
}
