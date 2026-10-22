import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export interface IFurnitureItemData {
    get itemId(): number;
    get itemType(): string;
    get roomItemId(): number;
    get itemTypeId(): number;
    get category(): number;
    get stuffData(): IStuffData;
    get isGroupable(): boolean;
    get isRecyclable(): boolean;
    get isTradeable(): boolean;
    get isSellable(): boolean;
    get secondsToExpiration(): number;
    get flatId(): number;
    get slotId(): string;
    get songId(): number;
    get extra(): number;
    get isRented(): boolean;
    get isWallItem(): boolean;
    get hasRentPeriodStarted(): boolean;
    get expirationTimeStamp(): number;
    get creationDay(): number;
    get creationMonth(): number;
    get creationYear(): number;
    get isExternalImageFurni(): boolean;
}
