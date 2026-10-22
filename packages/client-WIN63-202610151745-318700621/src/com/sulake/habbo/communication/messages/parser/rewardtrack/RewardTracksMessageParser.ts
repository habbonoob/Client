import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6025 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6025';

export class RewardTracksMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::RewardTracksMessageParser'); }

    declare private _disabled: boolean;
    static { (this.prototype as any)._disabled = false; }

    declare private _SafeStr_14071: _SafeCls_6025[];

    declare private _SafeStr_14072: boolean;
    static { (this.prototype as any)._SafeStr_14072 = false; }

    constructor() {
    }

    public flush(): boolean {
        this._disabled = false;
        this._SafeStr_14071 = null;
        this._SafeStr_14072 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._disabled = param1.readBoolean();
        this._SafeStr_14071 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14071.push(new _SafeCls_6025(param1));
            _loc3_++;
        }
        this._SafeStr_14072 = param1.readBoolean();
        return true;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public get tracks(): _SafeCls_6025[] {
        return this._SafeStr_14071;
    }

    public get reload(): boolean {
        return this._SafeStr_14072;
    }
}
