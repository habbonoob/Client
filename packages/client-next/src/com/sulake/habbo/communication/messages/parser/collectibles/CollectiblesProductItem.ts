import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CollectiblesProductItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectiblesProductItem'); }

    declare private _SafeStr_6130: number;
    static { (this.prototype as any)._SafeStr_6130 = 0; }

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    declare private _endTime: number;
    static { (this.prototype as any)._endTime = 0; }

    declare private _regionLocked: boolean;
    static { (this.prototype as any)._regionLocked = false; }

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    declare private _limitedEdition: boolean;
    static { (this.prototype as any)._limitedEdition = false; }

    declare private _itemType: string;

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_6130 = param1.readInteger();
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

    public get itemTypeId(): number {
        return this._SafeStr_6130;
    }

    public get startTime(): number {
        return this._startTime;
    }

    public get endTime(): number {
        return this._endTime;
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
