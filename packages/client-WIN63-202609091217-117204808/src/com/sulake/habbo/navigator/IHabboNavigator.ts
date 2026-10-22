import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface IHabboNavigator extends IUnknown {
    get events(): IEventDispatcher;
    goToHomeRoom(): boolean;
    performTagSearch(param1: string): void;
    performTextSearch(param1: string): void;
    performGuildBaseSearch(): void;
    performCompetitionRoomsSearch(param1: number, param2: number): void;
    showOwnRooms(): void;
    goToPrivateRoom(param1: number): void;
    hasRoomRightsButIsNotOwner(param1: number): boolean;
    removeRoomRights(param1: number): void;
    goToRoomNetwork(param1: number, param2: boolean): void;
    startRoomCreation(): void;
    openNavigator(param1?: Point): void;
    closeNavigator(): void;
    get homeRoomId(): number;
    get enteredGuestRoomData(): GuestRoomData;
    showToolbarHover(param1: Point): void;
    hideToolbarHover(param1: boolean): void;
    toggleRoomInfoVisibility(): void;
    canRateRoom(): boolean;
    isRoomFavorite(param1: number): boolean;
    isRoomHome(param1: number): boolean;
    get visibleEventCategories(): any[];
}

export const IHabboNavigator = Symbol('com.sulake.habbo.navigator::IHabboNavigator');
registerClassName(IHabboNavigator, 'com.sulake.habbo.navigator::IHabboNavigator');

export function isIHabboNavigator(value: unknown): value is IHabboNavigator {
    return (value as { [IHabboNavigator]?: true } | null | undefined)?.[IHabboNavigator] === true;
}
