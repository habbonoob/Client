import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IAvatarEffect } from '@/com/sulake/habbo/inventory/IAvatarEffect';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IUnseenItemTracker } from '@/com/sulake/habbo/inventory/IUnseenItemTracker';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboInventory extends IUnknown {
    get events(): IEventDispatcher;
    get clubDays(): number;
    get clubPeriods(): number;
    get clubPastPeriods(): number;
    get clubLevel(): number;
    get clubHasEverBeenMember(): boolean;
    get clubIsExpiring(): boolean;
    get citizenshipVipIsExpiring(): boolean;
    get clubMinutesUntilExpiration(): number;
    get tradingActive(): boolean;
    get hasRoomSession(): boolean;
    get unseenItemTracker(): IUnseenItemTracker;
    getAllMyBadgeIds(param1: any[]): any[];
    getActivatedAvatarEffects(): any[];
    getAvatarEffects(): any[];
    requestSelectedFurniToMover(param1: IFurnitureItem): boolean;
    getFloorItemById(param1: number): IFurnitureItem;
    getWallItemById(param1: number): IFurnitureItem;
    placePetToRoom(param1: number, param2?: boolean): boolean;
    setEffectSelected(param1: number): void;
    getLastActivatedEffect(): number;
    setEffectDeselected(param1: number): void;
    deselectAllEffects(param1?: boolean): void;
    getAvatarEffect(param1: number): IAvatarEffect;
    setupTrading(param1: number, param2: string): void;
    toggleInventoryPage(param1: string, param2?: string, param3?: boolean): void;
    toggleInventorySubPage(param1: string): void;
    setupRecycler(param1: boolean): void;
    requestSelectedFurniToRecycler(): number;
    returnInventoryFurniFromRecycler(param1: number): boolean;
    removeUnseenFurniCounter(param1: number): boolean;
    removeUnseenPetCounter(param1: number): boolean;
    hasFigureSetIdInInventory(param1: number): boolean;
    hasBoundFigureSetFurniture(param1: string): boolean;
    checkCategoryInitilization(param1: string): boolean;
    getNonRentedInventoryIds(param1: string, param2: number, param3: boolean): any[];
}

export const IHabboInventory = Symbol('com.sulake.habbo.inventory::IHabboInventory');
registerClassName(IHabboInventory, 'com.sulake.habbo.inventory::IHabboInventory');

export function isIHabboInventory(value: unknown): value is IHabboInventory {
    return (value as { [IHabboInventory]?: true } | null | undefined)?.[IHabboInventory] === true;
}
