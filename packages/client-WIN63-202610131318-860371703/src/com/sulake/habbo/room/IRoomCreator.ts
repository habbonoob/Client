import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IAreaHideInfo } from '@/com/sulake/habbo/room/IAreaHideInfo';
import type { IRoomObjectCreator } from '@/com/sulake/habbo/room/IRoomObjectCreator';
import type { FurniStackingHeightMap } from '@/com/sulake/habbo/room/utils/FurniStackingHeightMap';
import type { LegacyWallGeometry } from '@/com/sulake/habbo/room/utils/LegacyWallGeometry';
import type { TileObjectMap } from '@/com/sulake/habbo/room/utils/TileObjectMap';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IRoomCreator extends IRoomObjectCreator {
    initializeRoom(param1: number, param2: XML, param3?: IVector3d, param4?: IAreaHideInfo[]): void;
    getRoom(param1: number): IRoomInstance;
    disposeRoom(param1: number): void;
    setOwnUserId(param1: number, param2: number): void;
    setWorldType(param1: number, param2: string): void;
    getObjectRoom(param1: number): IRoomObjectController;
    setFurniStackingHeightMap(param1: number, param2: FurniStackingHeightMap): void;
    getFurniStackingHeightMap(param1: number): FurniStackingHeightMap;
    getLegacyGeometry(param1: number): LegacyWallGeometry;
    getRoomGeometry(param1: number): RoomGeometry;
    getTileObjectMap(param1: number): TileObjectMap;
    getRoomNumberValue(param1: number, param2: string): number;
    getRoomStringValue(param1: number, param2: string): string;
    setIsPlayingGame(param1: number, param2: boolean): void;
    leaveSpectate(): void;
    refreshTileObjectMap(param1: number, param2: string): void;
    get configuration(): ICoreConfiguration;
    get roomSessionManager(): IRoomSessionManager;
    get sessionDataManager(): ISessionDataManager;
    get windowManager(): IHabboWindowManager;
    setHanditemControlBlocked(param1: number, param2: boolean): void;
    setChooserDisabled(param1: number, param2: boolean): void;
    setFreeFurniMovementsMode(param1: number, param2: boolean): void;
    setInvisibleFurni(param1: number, param2: boolean): void;
}

export const IRoomCreator = Symbol('com.sulake.habbo.room::IRoomCreator');
registerClassName(IRoomCreator, 'com.sulake.habbo.room::IRoomCreator');

export function isIRoomCreator(value: unknown): value is IRoomCreator {
    return (value as { [IRoomCreator]?: true } | null | undefined)?.[IRoomCreator] === true;
}
