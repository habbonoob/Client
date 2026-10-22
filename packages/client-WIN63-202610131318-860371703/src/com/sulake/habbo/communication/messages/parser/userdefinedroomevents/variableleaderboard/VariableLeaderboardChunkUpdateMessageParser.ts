import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';

export class VariableLeaderboardChunkUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.variableleaderboard::VariableLeaderboardChunkUpdateMessageParser'); }

    declare private _overlayInstanceId: number;
    static { (this.prototype as any)._overlayInstanceId = 0; }

    declare private _SafeStr_14030: number;
    static { (this.prototype as any)._SafeStr_14030 = 0; }

    declare private _SafeStr_14031: string;

    declare private _SafeStr_14032: number;
    static { (this.prototype as any)._SafeStr_14032 = 0; }

    declare private _SafeStr_14033: number;
    static { (this.prototype as any)._SafeStr_14033 = 0; }

    declare private _SafeStr_2959: VariableLeaderboardRow[];

    declare private _valid: boolean;
    static { (this.prototype as any)._valid = false; }

    constructor() {
    }

    public flush(): boolean {
        this._overlayInstanceId = 0;
        this._SafeStr_14030 = 0;
        this._SafeStr_14031 = null;
        this._SafeStr_14032 = 0;
        this._SafeStr_14033 = 0;
        this._SafeStr_2959 = [];
        this._valid = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._valid = false;
        this._overlayInstanceId = param1.readInteger();
        this._SafeStr_14030 = param1.readInteger();
        this._SafeStr_14031 = param1.readString();
        this._SafeStr_14032 = param1.readInteger();
        this._SafeStr_14033 = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        if (this._SafeStr_14033 < 0) {
            return false;
        }
        if (_loc3_ < 0 || _loc3_ > 50) {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._SafeStr_2959.push(VariableLeaderboardRow.fromMessage(param1));
            _loc2_++;
        }
        // this._SafeStr_2959.fixed = true: an array's length cannot be fixed
        this._valid = true;
        return true;
    }

    public get valid(): boolean {
        return this._valid;
    }

    public get overlayInstanceId(): number {
        return this._overlayInstanceId;
    }

    public get queryRevision(): number {
        return this._SafeStr_14030;
    }

    public get selectedVariableId(): string {
        return this._SafeStr_14031;
    }

    public get chunkIndex(): number {
        return this._SafeStr_14032;
    }

    public get totalCount(): number {
        return this._SafeStr_14033;
    }

    public get rows(): VariableLeaderboardRow[] {
        return this._SafeStr_2959.slice();
    }
}
