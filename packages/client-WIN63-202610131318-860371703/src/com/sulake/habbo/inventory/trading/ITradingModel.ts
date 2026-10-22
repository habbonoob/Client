import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface ITradingModel {
    requestAddItemsToTrading(param1: number[], param2: boolean, param3: number, param4: number, param5: boolean, param6: IStuffData): void;
    requestRemoveItemFromTrading(param1: number): void;
    getOwnItemIdsInTrade(): any[];
    getInventory(): HabboInventory;
}
