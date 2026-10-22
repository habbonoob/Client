import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6059 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6059';

export class RewardTracksMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTracksMessageParser'); }

    declare private _disabled: boolean;
    static { (this.prototype as any)._disabled = false; }

    declare private _SafeStr_14359: _SafeCls_6059[];

    declare private _SafeStr_14814: boolean;
    static { (this.prototype as any)._SafeStr_14814 = false; }

    constructor() {
    }

    public flush(): boolean {
        this._disabled = false;
        this._SafeStr_14359 = null;
        this._SafeStr_14814 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._disabled = param1.readBoolean();
        this._SafeStr_14359 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14359.push(new _SafeCls_6059(param1));
            _loc3_++;
        }
        this._SafeStr_14814 = param1.readBoolean();
        return true;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public get tracks(): _SafeCls_6059[] {
        return this._SafeStr_14359;
    }

    public get reload(): boolean {
        return this._SafeStr_14814;
    }
}
