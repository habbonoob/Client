import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IFurnitureItemData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/IFurnitureItemData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';

export class ItemDataStructure implements IFurnitureItemData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::ItemDataStructure'); }

    constructor(param1: IMessageDataWrapper) {
        this._itemId = param1.readInteger();
        this._itemType = param1.readString().toUpperCase();
        this._roomItemId = param1.readInteger();
        this._itemTypeId = param1.readInteger();
        this._category = param1.readInteger();
        this._isGroupable = param1.readBoolean();
        this._stuffData = ObjectDataParser.parseStuffData(param1);
        this._secondsToExpiration = -1;
        this._expirationTimeStamp = getTimer();
        this._hasRentPeriodStarted = false;
        this._creationDay = param1.readInteger();
        this._creationMonth = param1.readInteger();
        this._creationYear = param1.readInteger();
        this._extra = this.itemType == "S" ? param1.readInteger() : -1;
        this._flatId = -1;
        this._isRented = false;
        this._isWallItem = this._itemType == "I";
    }

    declare private _expirationTimeStamp: number;
    static { (this.prototype as any)._expirationTimeStamp = 0; }

    declare private _isWallItem: boolean;
    static { (this.prototype as any)._isWallItem = false; }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _itemType: string;

    declare private _roomItemId: number;
    static { (this.prototype as any)._roomItemId = 0; }

    declare private _itemTypeId: number;
    static { (this.prototype as any)._itemTypeId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _stuffData: IStuffData;

    declare private _extra: number;
    static { (this.prototype as any)._extra = 0; }

    declare private _secondsToExpiration: number;
    static { (this.prototype as any)._secondsToExpiration = 0; }

    declare private _creationDay: number;
    static { (this.prototype as any)._creationDay = 0; }

    declare private _creationYear: number;
    static { (this.prototype as any)._creationYear = 0; }

    declare private _isGroupable: boolean;
    static { (this.prototype as any)._isGroupable = false; }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare private _isRented: boolean;
    static { (this.prototype as any)._isRented = false; }

    declare private _hasRentPeriodStarted: boolean;
    static { (this.prototype as any)._hasRentPeriodStarted = false; }

    declare private _creationMonth: number;
    static { (this.prototype as any)._creationMonth = 0; }

    public get creationMonth(): number {
        return this._creationMonth;
    }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    public get flatId(): number {
        return this._flatId;
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get itemType(): string {
        return this._itemType;
    }

    public get roomItemId(): number {
        return this._roomItemId;
    }

    public get itemTypeId(): number {
        return this._itemTypeId;
    }

    public get category(): number {
        return this._category;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get extra(): number {
        return this._extra;
    }

    public get secondsToExpiration(): number {
        return this._secondsToExpiration;
    }

    public get creationDay(): number {
        return this._creationDay;
    }

    public get creationYear(): number {
        return this._creationYear;
    }

    public get isGroupable(): boolean {
        return this._isGroupable;
    }

    public get songId(): number {
        return this._extra;
    }

    public get isRented(): boolean {
        return this._isRented;
    }

    public get isWallItem(): boolean {
        return this._isWallItem;
    }

    public get hasRentPeriodStarted(): boolean {
        return this._hasRentPeriodStarted;
    }

    public get expirationTimeStamp(): number {
        return this._expirationTimeStamp;
    }

    public get isRecyclable(): boolean {
        return true;
    }

    public get isTradeable(): boolean {
        return true;
    }

    public get isSellable(): boolean {
        return true;
    }

    public get slotId(): string {
        return null;
    }

    public get isExternalImageFurni(): boolean {
        return this._itemType.indexOf("external_image") != -1;
    }
}
