import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class TextPlaceholders {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::TextPlaceholders'); }

    declare private _placeholderNames: string[];

    declare private _SafeStr_14076: string[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._placeholderNames = Array.from([]);
        this._SafeStr_14076 = Array.from([]);
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._placeholderNames.push(param1.readString());
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14076.push(param1.readString());
            _loc3_++;
        }
    }

    public get placeholderNames(): string[] {
        return this._placeholderNames;
    }

    public get capturerNames(): string[] {
        return this._SafeStr_14076;
    }
}
