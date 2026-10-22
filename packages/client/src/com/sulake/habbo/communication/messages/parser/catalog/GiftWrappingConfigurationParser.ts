import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GiftWrappingConfigurationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::GiftWrappingConfigurationParser'); }

    constructor() {
    }

    declare private _isWrappingEnabled: boolean;
    static { (this.prototype as any)._isWrappingEnabled = false; }

    declare private _wrappingPrice: number;
    static { (this.prototype as any)._wrappingPrice = 0; }

    declare private _stuffTypes: any[];

    public get stuffTypes(): any[] {
        return this._stuffTypes;
    }

    declare private _boxTypes: any[];

    public get boxTypes(): any[] {
        return this._boxTypes;
    }

    declare private _ribbonTypes: any[];

    public get ribbonTypes(): any[] {
        return this._ribbonTypes;
    }

    declare private _defaultStuffTypes: any[];

    public get defaultStuffTypes(): any[] {
        return this._defaultStuffTypes;
    }

    public get isWrappingEnabled(): boolean {
        return this._isWrappingEnabled;
    }

    public get wrappingPrice(): number {
        return this._wrappingPrice;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._stuffTypes = [];
        this._boxTypes = [];
        this._ribbonTypes = [];
        this._defaultStuffTypes = [];
        this._isWrappingEnabled = param1.readBoolean();
        this._wrappingPrice = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._stuffTypes.push(param1.readInteger());
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._boxTypes.push(param1.readInteger());
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._ribbonTypes.push(param1.readInteger());
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._defaultStuffTypes.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
