import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class VariableLeaderboardRow {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardRow'); }

    declare private _rank: number;
    static { (this.prototype as any)._rank = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _username: string;

    declare private _figure: string;

    declare private _SafeStr_14051: string;

    declare private _creationTime: number;
    static { (this.prototype as any)._creationTime = NaN; }

    declare private _lastUpdateTime: number;
    static { (this.prototype as any)._lastUpdateTime = NaN; }

    declare private _SafeStr_14052: boolean;
    static { (this.prototype as any)._SafeStr_14052 = false; }

    declare private _level: string;

    declare private _SafeStr_14053: boolean;
    static { (this.prototype as any)._SafeStr_14053 = false; }

    declare private _SafeStr_14054: string;

    constructor(param1: number, param2: number, param3: string, param4: string, param5: string, param6: number, param7: number, param8: boolean, param9: string, param10: boolean, param11: string) {
        this._rank = param1;
        this._userId = param2;
        this._username = param3;
        this._figure = param4;
        this._SafeStr_14051 = param5;
        this._creationTime = param6;
        this._lastUpdateTime = param7;
        this._SafeStr_14052 = param8;
        this._level = param9;
        this._SafeStr_14053 = param10;
        this._SafeStr_14054 = param11;
    }

    public static fromMessage(param1: IMessageDataWrapper): VariableLeaderboardRow {
        let _loc7_: number = param1.readInteger();
        let _loc10_: number = param1.readInteger();
        let _loc11_: string = param1.readString();
        let _loc2_: string = param1.readString();
        let _loc4_: string = param1.readString();
        let _loc3_: number = param1.readLong();
        let _loc12_: number = param1.readLong();
        let _loc8_: boolean = param1.readBoolean();
        let _loc5_: string = _loc8_ ? param1.readString() : null;
        let _loc9_: boolean = param1.readBoolean();
        let _loc6_: string = _loc9_ ? param1.readString() : null;
        return new VariableLeaderboardRow(_loc7_, _loc10_, _loc11_, _loc2_, _loc4_, _loc3_, _loc12_, _loc8_, _loc5_, _loc9_, _loc6_);
    }

    public get rank(): number {
        return this._rank;
    }

    public get userId(): number {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get figure(): string {
        return this._figure;
    }

    public get rawValue(): string {
        return this._SafeStr_14051;
    }

    public get creationTime(): number {
        return this._creationTime;
    }

    public get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    public get levelAvailable(): boolean {
        return this._SafeStr_14052;
    }

    public get level(): string {
        return this._level;
    }

    public get textConnectionAvailable(): boolean {
        return this._SafeStr_14053;
    }

    public get textConnection(): string {
        return this._SafeStr_14054;
    }
}
