import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TradingNameScamWarningData {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::TradingNameScamWarningData'); }

    declare private _SafeStr_14187: number;
    static { (this.prototype as any)._SafeStr_14187 = 0; }

    declare private _tradedUserName: string;

    declare private _SafeStr_14188: string;

    declare private _similarInRoom: any[];

    declare private _SafeStr_14189: any[];

    constructor(param1: number, param2: string, param3: string, param4: any[], param5: any[]) {
        this._SafeStr_14187 = param1;
        this._tradedUserName = param2 ?? "";
        this._SafeStr_14188 = param3 ?? "";
        this._similarInRoom = param4 != null ? param4.slice() : [];
        this._SafeStr_14189 = param5 != null ? param5.slice() : [];
    }

    public get tradedUserId(): number {
        return this._SafeStr_14187;
    }

    public get tradedUserName(): string {
        return this._tradedUserName;
    }

    public get tradedUserFigure(): string {
        return this._SafeStr_14188;
    }

    public get similarInRoom(): any[] {
        return this._similarInRoom.slice();
    }

    public get similarInFriends(): any[] {
        return this._SafeStr_14189.slice();
    }
}
