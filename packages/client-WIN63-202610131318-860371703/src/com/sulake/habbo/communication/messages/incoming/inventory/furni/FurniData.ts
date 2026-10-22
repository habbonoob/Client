import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IFurnitureItemData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/IFurnitureItemData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';

export class FurniData implements IFurnitureItemData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniData'); }

    private static readonly _SafeStr_8444: string = "I";
    private static readonly _SafeStr_8208: string = "S";

    declare private _isRented: boolean;
    static { (this.prototype as any)._isRented = false; }

    declare private _itemId: number;
    static { (this.prototype as any)._itemId = 0; }

    declare private _itemType: string;

    declare private _SafeStr_6559: number;
    static { (this.prototype as any)._SafeStr_6559 = 0; }

    declare private _SafeStr_6130: number;
    static { (this.prototype as any)._SafeStr_6130 = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _stuffData: IStuffData;

    declare private _SafeStr_6318: boolean;
    static { (this.prototype as any)._SafeStr_6318 = false; }

    declare private _SafeStr_6971: boolean;
    static { (this.prototype as any)._SafeStr_6971 = false; }

    declare private _SafeStr_6307: boolean;
    static { (this.prototype as any)._SafeStr_6307 = false; }

    declare private _isSellable: boolean;
    static { (this.prototype as any)._isSellable = false; }

    declare private _secondsToExpiration: number;
    static { (this.prototype as any)._secondsToExpiration = 0; }

    declare private _extra: number;
    static { (this.prototype as any)._extra = 0; }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _isWallItem: boolean;
    static { (this.prototype as any)._isWallItem = false; }

    declare private _hasRentPeriodStarted: boolean;
    static { (this.prototype as any)._hasRentPeriodStarted = false; }

    declare private _expirationTimeStamp: number;
    static { (this.prototype as any)._expirationTimeStamp = 0; }

    private _SafeStr_5501: string = "";
    private _SafeStr_4873: number = -1;

    constructor(param1: IMessageDataWrapper) {
        this._itemId = param1.readInteger();
        this._itemType = param1.readString();
        this._SafeStr_6559 = param1.readInteger();
        this._SafeStr_6130 = param1.readInteger();
        this._category = param1.readInteger();
        this._stuffData = ObjectDataParser.parseStuffData(param1);
        this._SafeStr_6971 = param1.readBoolean();
        this._SafeStr_6307 = param1.readBoolean();
        this._SafeStr_6318 = param1.readBoolean();
        this._isSellable = param1.readBoolean();
        this._secondsToExpiration = param1.readInteger();
        this._expirationTimeStamp = getTimer();
        if (this.secondsToExpiration > -1) {
            this._isRented = true;
        } else {
            this._isRented = false;
            this._secondsToExpiration = -1;
        }
        this._hasRentPeriodStarted = param1.readBoolean();
        this._flatId = param1.readInteger();
        this._isWallItem = this._itemType == "I";
        if (this._itemType == "S") {
            this._SafeStr_5501 = param1.readString();
            this._extra = param1.readInteger();
        }
    }

    public get itemId(): number {
        return this._itemId;
    }

    public get itemType(): string {
        return this._itemType;
    }

    public get roomItemId(): number {
        return this._SafeStr_6559;
    }

    public get itemTypeId(): number {
        return this._SafeStr_6130;
    }

    public get category(): number {
        return this._category;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get isGroupable(): boolean {
        return this._SafeStr_6318;
    }

    public get isRecyclable(): boolean {
        return this._SafeStr_6971;
    }

    public get isTradeable(): boolean {
        return this._SafeStr_6307;
    }

    public get isSellable(): boolean {
        return this._isSellable;
    }

    public get secondsToExpiration(): number {
        return this._secondsToExpiration;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get slotId(): string {
        return this._SafeStr_5501;
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get extra(): number {
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

    public get creationDay(): number {
        return 0;
    }

    public get creationMonth(): number {
        return 0;
    }

    public get creationYear(): number {
        return 0;
    }

    public get isExternalImageFurni(): boolean {
        return this._itemType.indexOf("external_image") != -1;
    }
}
