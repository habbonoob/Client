import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';

export class VariableLeaderboardChunkState {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard::VariableLeaderboardChunkState'); }

    declare private _SafeStr_14305: boolean;
    static { (this.prototype as any)._SafeStr_14305 = false; }

    declare private _SafeStr_2959: VariableLeaderboardRow[];

    constructor() {
        this._SafeStr_2959 = [];
        // this._SafeStr_2959.fixed = true: an array's length cannot be fixed
    }

    public applyRows(param1: VariableLeaderboardRow[]): void {
        this._SafeStr_2959 = param1.slice();
        // this._SafeStr_2959.fixed = true: an array's length cannot be fixed
        this._SafeStr_14305 = true;
    }

    public get hasSuccessfulPayload(): boolean {
        return this._SafeStr_14305;
    }

    public rowAt(param1: number): VariableLeaderboardRow {
        return param1 >= 0 && param1 < this._SafeStr_2959.length ? this._SafeStr_2959[param1] : null;
    }
}
