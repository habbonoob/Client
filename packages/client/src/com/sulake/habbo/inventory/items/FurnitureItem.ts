import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFurnitureItemData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/IFurnitureItemData';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class FurnitureItem implements IFurnitureItem {
    static { registerClassName(this, 'com.sulake.habbo.inventory.items::FurnitureItem'); }

    constructor(param1: IFurnitureItemData) {
        this._id = param1.itemId;
        this._type = param1.itemTypeId;
        this._ref = param1.roomItemId;
        this._category = param1.category;
        this._groupable = param1.isGroupable && !param1.isRented;
        this._tradeable = param1.isTradeable;
        this._recyclable = param1.isRecyclable;
        this._sellable = param1.isSellable;
        this._stuffData = param1.stuffData;
        this._extra = param1.extra;
        this._secondsToExpiration = param1.secondsToExpiration;
        this._expirationTimeStamp = param1.expirationTimeStamp;
        this._hasRentPeriodStarted = param1.hasRentPeriodStarted;
        this._creationDay = param1.creationDay;
        this._creationMonth = param1.creationMonth;
        this._creationYear = param1.creationYear;
        this._SafeStr_5501 = param1.slotId;
        this._SafeStr_4873 = param1.songId;
        this._flatId = param1.flatId;
        this._isRented = param1.isRented;
        this._isWallItem = param1.isWallItem;
    }

    declare private _expirationTimeStamp: number;
    static { (this.prototype as any)._expirationTimeStamp = 0; }

    declare private _isWallItem: boolean;
    static { (this.prototype as any)._isWallItem = false; }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare private _SafeStr_3562: boolean;
    static { (this.prototype as any)._SafeStr_3562 = false; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _ref: number;
    static { (this.prototype as any)._ref = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _stuffData: IStuffData;

    declare private _extra: number;
    static { (this.prototype as any)._extra = NaN; }

    declare private _recyclable: boolean;
    static { (this.prototype as any)._recyclable = false; }

    declare private _tradeable: boolean;
    static { (this.prototype as any)._tradeable = false; }

    declare private _groupable: boolean;
    static { (this.prototype as any)._groupable = false; }

    declare private _sellable: boolean;
    static { (this.prototype as any)._sellable = false; }

    declare private _secondsToExpiration: number;
    static { (this.prototype as any)._secondsToExpiration = 0; }

    declare private _hasRentPeriodStarted: boolean;
    static { (this.prototype as any)._hasRentPeriodStarted = false; }

    declare private _creationDay: number;
    static { (this.prototype as any)._creationDay = 0; }

    declare private _creationYear: number;
    static { (this.prototype as any)._creationYear = 0; }

    declare private _SafeStr_5501: string;

    declare private _isRented: boolean;
    static { (this.prototype as any)._isRented = false; }

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

    public get isRented(): boolean {
        return this._isRented;
    }

    public get id(): number {
        return this._id;
    }

    public get ref(): number {
        return this._ref;
    }

    public get category(): number {
        return this._category;
    }

    public get type(): number {
        return this._type;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public set stuffData(param1: IStuffData) {
        this._stuffData = param1;
    }

    public get extra(): number {
        return this._extra;
    }

    public get recyclable(): boolean {
        return this._recyclable;
    }

    public get tradeable(): boolean {
        return this._tradeable;
    }

    public get groupable(): boolean {
        return this._groupable;
    }

    public get sellable(): boolean {
        return this._sellable;
    }

    public get secondsToExpiration(): number {
        if (this._secondsToExpiration == -1) {
            return -1;
        }
        let _loc1_: number = -1;
        if (this._hasRentPeriodStarted) {
            _loc1_ = this._secondsToExpiration - (getTimer() - this._expirationTimeStamp) / 1000 | 0;
            if (_loc1_ < 0) {
                _loc1_ = 0;
            }
        } else {
            _loc1_ = this._secondsToExpiration;
        }
        return _loc1_;
    }

    public get creationDay(): number {
        return this._creationDay;
    }

    public get creationYear(): number {
        return this._creationYear;
    }

    public get slotId(): string {
        return this._SafeStr_5501;
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get locked(): boolean {
        return this._SafeStr_3562;
    }

    public set locked(param1: boolean) {
        this._SafeStr_3562 = param1;
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

    public update(param1: IFurnitureItemData): void {
        this._type = param1.itemTypeId;
        this._ref = param1.roomItemId;
        this._category = param1.category;
        this._groupable = param1.isGroupable && !param1.isRented;
        this._tradeable = param1.isTradeable;
        this._recyclable = param1.isRecyclable;
        this._sellable = param1.isSellable;
        this._stuffData = param1.stuffData;
        this._extra = param1.extra;
        this._secondsToExpiration = param1.secondsToExpiration;
        this._expirationTimeStamp = param1.expirationTimeStamp;
        this._hasRentPeriodStarted = param1.hasRentPeriodStarted;
        this._creationDay = param1.creationDay;
        this._creationMonth = param1.creationMonth;
        this._creationYear = param1.creationYear;
        this._SafeStr_5501 = param1.slotId;
        this._SafeStr_4873 = param1.songId;
        this._flatId = param1.flatId;
        this._isRented = param1.isRented;
        this._isWallItem = param1.isWallItem;
    }
}
