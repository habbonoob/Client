import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboGameManager extends IUnknown {
    get events(): IEventDispatcher;
    get gameCenterEnabled(): boolean;
    get isHotelClosed(): boolean;
    initGameDirectoryConnection(): void;
    startSnowWarGame(param1: string): void;
    startQuickSnowWarGame(): void;
    onSnowWarArenaSessionEnded(): void;
    handleClickOnHuman(param1: number, param2: boolean, param3: boolean): void;
    generateChecksumMismatch(): void;
    handleMouseOverOnHuman(param1: number, param2: boolean, param3: boolean): void;
    handleClickOnTile(param1: RoomObjectTileMouseEvent): void;
}
