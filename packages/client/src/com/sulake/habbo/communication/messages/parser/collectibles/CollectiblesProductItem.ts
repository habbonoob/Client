import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CollectiblesProductItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectiblesProductItem'); }

    constructor(param1: IMessageDataWrapper) {
        this._itemTypeId = param1.readInteger();
        this._startTime = param1.readInteger();
        this._endTime = param1.readInteger();
        this._regionLocked = param1.readBoolean();
        this._price = param1.readInteger();
        this._limitedEdition = param1.readBoolean();
        let _loc2_: number = param1.readShort();
        switch (_loc2_) {
            case 0:
                this._itemType = "s";
                break;
            case 1:
                this._itemType = "i";
                break;
            case 2:
                this._itemType = "cl";
                break;
            default:
                this._itemType = "s";
        }
    }

    declare private _itemTypeId: number;
    static { (this.prototype as any)._itemTypeId = 0; }

    declare private _regionLocked: boolean;
    static { (this.prototype as any)._regionLocked = false; }

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    declare private _limitedEdition: boolean;
    static { (this.prototype as any)._limitedEdition = false; }

    declare private _itemType: string;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    public get startTime(): number {
        return this._startTime;
    }

    declare private _endTime: number;
    static { (this.prototype as any)._endTime = 0; }

    public get endTime(): number {
        return this._endTime;
    }

    public get itemTypeId(): number {
        return this._itemTypeId;
    }

    public get regionLocked(): boolean {
        return this._regionLocked;
    }

    public get price(): number {
        return this._price;
    }

    public get limitedEdition(): boolean {
        return this._limitedEdition;
    }

    public get itemType(): string {
        return this._itemType;
    }
}
