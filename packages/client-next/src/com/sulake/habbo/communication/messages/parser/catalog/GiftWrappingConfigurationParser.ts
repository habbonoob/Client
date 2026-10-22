import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GiftWrappingConfigurationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::GiftWrappingConfigurationParser'); }

    declare private _SafeStr_6976: boolean;
    static { (this.prototype as any)._SafeStr_6976 = false; }

    declare private _SafeStr_7261: number;
    static { (this.prototype as any)._SafeStr_7261 = 0; }

    declare private _stuffTypes: any[];

    declare private _boxTypes: any[];

    declare private _ribbonTypes: any[];

    declare private _defaultStuffTypes: any[];

    constructor() {
    }

    public get isWrappingEnabled(): boolean {
        return this._SafeStr_6976;
    }

    public get wrappingPrice(): number {
        return this._SafeStr_7261;
    }

    public get stuffTypes(): any[] {
        return this._stuffTypes;
    }

    public get boxTypes(): any[] {
        return this._boxTypes;
    }

    public get ribbonTypes(): any[] {
        return this._ribbonTypes;
    }

    public get defaultStuffTypes(): any[] {
        return this._defaultStuffTypes;
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
        this._SafeStr_6976 = param1.readBoolean();
        this._SafeStr_7261 = param1.readInteger();
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
