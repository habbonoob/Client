import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class PurseEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purse::PurseEvent'); }

    public static readonly CREDIT_BALANCE: string = "catalog_purse_credit_balance";
    public static readonly ACTIVITY_POINT_BALANCE: string = "catalog_purse_activity_point_balance";
    public static readonly _SafeStr_8483: string = "catalog_purse_emerald_balance";
    public static readonly SILVER_BALANCE: string = "catalog_purse_silver_balance";

    declare private _balance: number;
    static { (this.prototype as any)._balance = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    constructor(param1: string, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        super(param1, param4, param5);
        this._balance = param2;
        this._activityPointType = param3;
    }

    public get balance(): number {
        return this._balance;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }
}
