import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface IFurnitureItem {
    get id(): number;
    get ref(): number;
    get type(): number;
    get stuffData(): IStuffData;
    get extra(): number;
    get category(): number;
    get recyclable(): boolean;
    get tradeable(): boolean;
    get groupable(): boolean;
    get sellable(): boolean;
    get locked(): boolean;
    set locked(param1: boolean);
    get isWallItem(): boolean;
}
