import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IRoomSessionManager extends IUnknown {
    get events(): IEventDispatcher;
    get sessionStarting(): boolean;
    gotoRoom(param1: number, param2?: string, param3?: string, param4?: boolean): boolean;
    gotoRoomNetwork(param1: number, param2: number): boolean;
    startSession(param1: IRoomSession): boolean;
    getSession(param1: number): IRoomSession;
    startGameSession(): void;
    disposeGameSession(): void;
    disposeSession(param1: number, param2?: boolean): void;
}

export const IRoomSessionManager = Symbol('com.sulake.habbo.session::IRoomSessionManager');
registerClassName(IRoomSessionManager, 'com.sulake.habbo.session::IRoomSessionManager');

export function isIRoomSessionManager(value: unknown): value is IRoomSessionManager {
    return (value as { [IRoomSessionManager]?: true } | null | undefined)?.[IRoomSessionManager] === true;
}
