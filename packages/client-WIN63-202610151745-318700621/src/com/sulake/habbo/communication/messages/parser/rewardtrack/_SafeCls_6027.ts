import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6028 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6028';

export class _SafeCls_6027 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6027'); }

    declare private _id: string;

    declare private _actionType: string;

    declare private _parameter: string;

    declare private _SafeStr_14082: number;
    static { (this.prototype as any)._SafeStr_14082 = 0; }

    declare private _SafeStr_14083: boolean;
    static { (this.prototype as any)._SafeStr_14083 = false; }

    declare private _SafeStr_14084: _SafeCls_6028[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._id = param1.readString();
        this._actionType = param1.readString();
        this._parameter = param1.readString();
        this._SafeStr_14082 = param1.readInteger();
        this._SafeStr_14083 = param1.readBoolean();
        this._SafeStr_14084 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14084.push(new _SafeCls_6028(param1));
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
        return this._SafeStr_14082;
    }

    public get premium(): boolean {
        return this._SafeStr_14083;
    }

    public get taskRewards(): _SafeCls_6028[] {
        return this._SafeStr_14084;
    }
}
