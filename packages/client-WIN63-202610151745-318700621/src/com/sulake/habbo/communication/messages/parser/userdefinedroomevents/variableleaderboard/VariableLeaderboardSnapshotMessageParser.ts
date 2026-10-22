import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';

export class VariableLeaderboardSnapshotMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.variableleaderboard::VariableLeaderboardSnapshotMessageParser'); }

    declare private _SafeStr_14175: VariableLeaderboardDescriptor[];

    declare private _valid: boolean;
    static { (this.prototype as any)._valid = false; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14175 = [];
        this._valid = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: VariableLeaderboardDescriptor = null;
        this._valid = false;
        let _loc2_: number = param1.readInteger();
        if (_loc2_ < 0 || _loc2_ > 4) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = VariableLeaderboardDescriptor.fromMessage(param1);
            if (_loc4_ == null) {
                return false;
            }
            this._SafeStr_14175.push(_loc4_);
            _loc3_++;
        }
        // this._SafeStr_14175.fixed = true: an array's length cannot be fixed
        this._valid = true;
        return true;
    }

    public get valid(): boolean {
        return this._valid;
    }

    public get descriptors(): VariableLeaderboardDescriptor[] {
        return this._SafeStr_14175.slice();
    }
}
