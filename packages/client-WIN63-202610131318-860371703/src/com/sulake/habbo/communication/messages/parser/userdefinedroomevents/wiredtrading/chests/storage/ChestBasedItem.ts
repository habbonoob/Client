import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface ChestBasedItem {
    get type(): ChestItemType;
    get specialType(): number;
    get stuffData(): IStuffData;
}
