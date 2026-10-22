import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { VariableLeaderboardChoice } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardChoice';

export class VariableLeaderboardContext {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableLeaderboardContext'); }

    declare private _overlayInstanceId: number;
    static { (this.prototype as any)._overlayInstanceId = 0; }

    declare private _SafeStr_14132: number;
    static { (this.prototype as any)._SafeStr_14132 = 0; }

    declare private _SafeStr_14133: number;
    static { (this.prototype as any)._SafeStr_14133 = 0; }

    declare private _SafeStr_14134: number;
    static { (this.prototype as any)._SafeStr_14134 = 0; }

    declare private _SafeStr_14049: VariableLeaderboardChoice[];

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._overlayInstanceId = param1.readInteger();
        this._SafeStr_14132 = param1.readInteger();
        this._SafeStr_14133 = param1.readInteger();
        this._SafeStr_14134 = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        this._SafeStr_14049 = [];
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._SafeStr_14049.push(new VariableLeaderboardChoice(param1));
            _loc2_++;
        }
        // this._SafeStr_14049.fixed = true: an array's length cannot be fixed
    }

    public get published(): boolean {
        return this._overlayInstanceId > 0;
    }

    public get overlayInstanceId(): number {
        return this._overlayInstanceId;
    }

    public get physicalTileX(): number {
        return this._SafeStr_14132;
    }

    public get physicalTileY(): number {
        return this._SafeStr_14133;
    }

    public get totalCandidateCount(): number {
        return this._SafeStr_14134;
    }

    public get choices(): VariableLeaderboardChoice[] {
        return this._SafeStr_14049.slice();
    }
}
