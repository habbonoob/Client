import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6065 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6065';

export class _SafeCls_6064 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6064'); }

    declare private _id: string;

    declare private _actionType: string;

    declare private _parameter: string;

    declare private _SafeStr_14372: number;
    static { (this.prototype as any)._SafeStr_14372 = 0; }

    declare private _SafeStr_14367: boolean;
    static { (this.prototype as any)._SafeStr_14367 = false; }

    declare private _SafeStr_14828: _SafeCls_6065[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._id = param1.readString();
        this._actionType = param1.readString();
        this._parameter = param1.readString();
        this._SafeStr_14372 = param1.readInteger();
        this._SafeStr_14367 = param1.readBoolean();
        this._SafeStr_14828 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14828.push(new _SafeCls_6065(param1));
            _loc3_++;
        }
    }

    public get id(): string {
        return this._id;
    }

    public get actionType(): string {
        return this._actionType;
    }

    public get parameter(): string {
        return this._parameter;
    }

    public get progressCount(): number {
        return this._SafeStr_14372;
    }

    public get premium(): boolean {
        return this._SafeStr_14367;
    }

    public get taskRewards(): _SafeCls_6065[] {
        return this._SafeStr_14828;
    }
}
