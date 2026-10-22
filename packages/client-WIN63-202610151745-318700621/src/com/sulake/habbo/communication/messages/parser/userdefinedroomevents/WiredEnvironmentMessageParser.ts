import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredEnvironmentMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredEnvironmentMessageParser'); }

    declare private _hasClickUserWired: boolean;
    static { (this.prototype as any)._hasClickUserWired = false; }

    declare private _SafeStr_14939: string[];

    constructor() {
    }

    public flush(): boolean {
        this._hasClickUserWired = false;
        this._SafeStr_14939 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        this._hasClickUserWired = param1.readBoolean();
        this._SafeStr_14939 = [];
        if (param1.bytesAvailable > 0) {
            _loc2_ = param1.readInteger();
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                this._SafeStr_14939.push(param1.readString());
                _loc3_ += 1;
            }
        }
        return true;
    }

    public get hasClickUserWired(): boolean {
        return this._hasClickUserWired;
    }

    public get enabledAchievements(): string[] {
        return this._SafeStr_14939;
    }
}
