import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TradingNameScamWarningData {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::TradingNameScamWarningData'); }

    declare private _SafeStr_14209: number;
    static { (this.prototype as any)._SafeStr_14209 = 0; }

    declare private _tradedUserName: string;

    declare private _SafeStr_14210: string;

    declare private _similarInRoom: any[];

    declare private _SafeStr_14211: any[];

    constructor(param1: number, param2: string, param3: string, param4: any[], param5: any[]) {
        this._SafeStr_14209 = param1;
        this._tradedUserName = param2 ?? "";
        this._SafeStr_14210 = param3 ?? "";
        this._similarInRoom = param4 != null ? param4.slice() : [];
        this._SafeStr_14211 = param5 != null ? param5.slice() : [];
    }

    public get tradedUserId(): number {
        return this._SafeStr_14209;
    }

    public get tradedUserName(): string {
        return this._tradedUserName;
    }

    public get tradedUserFigure(): string {
        return this._SafeStr_14210;
    }

    public get similarInRoom(): any[] {
        return this._similarInRoom.slice();
    }

    public get similarInFriends(): any[] {
        return this._SafeStr_14211.slice();
    }
}
