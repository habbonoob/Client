import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class Purse {
    static { registerClassName(this, 'com.sulake.habbo.inventory.purse::Purse'); }

    constructor() {
    }

    private _isExpiring: boolean = false;
    private _isCitizenshipVipExpiring: boolean = false;
    private _clubDays: number = 0;
    private _clubPeriods: number = 0;
    private _clubPastPeriods: number = 0;
    private _clubHasEverBeenMember: boolean = false;
    private _isVIP: boolean = false;
    private _minutesUntilExpiration: number = 0;
    private _minutesSinceLastModified: number = -1;

    declare private _lastUpdated: number;
    static { (this.prototype as any)._lastUpdated = 0; }

    public get clubDays(): number {
        return this._clubDays;
    }

    public set clubDays(param1: number) {
        this._lastUpdated = getTimer();
        this._clubDays = Math.max(0, param1) | 0;
    }

    public get clubPeriods(): number {
        return this._clubPeriods;
    }

    public set clubPeriods(param1: number) {
        this._lastUpdated = getTimer();
        this._clubPeriods = Math.max(0, param1) | 0;
    }

    public get clubPastPeriods(): number {
        return this._clubPastPeriods;
    }

    public set clubPastPeriods(param1: number) {
        this._lastUpdated = getTimer();
        this._clubPastPeriods = Math.max(0, param1) | 0;
    }

    public get clubHasEverBeenMember(): boolean {
        return this._clubHasEverBeenMember;
    }

    public set clubHasEverBeenMember(param1: boolean) {
        this._lastUpdated = getTimer();
        this._clubHasEverBeenMember = param1;
    }

    public get isVIP(): boolean {
        return this._isVIP;
    }

    public set isVIP(param1: boolean) {
        this._lastUpdated = getTimer();
        this._isVIP = param1;
    }

    public get minutesUntilExpiration(): number {
        let _loc1_: number = (getTimer() - this._lastUpdated) / 60000 | 0;
        let _loc2_: number = this._minutesUntilExpiration - _loc1_;
        return _loc2_ > 0 ? _loc2_ : 0;
    }

    public set minutesUntilExpiration(param1: number) {
        this._lastUpdated = getTimer();
        this._minutesUntilExpiration = param1;
    }

    public get clubIsExpiring(): boolean {
        return this._isExpiring;
    }

    public set clubIsExpiring(param1: boolean) {
        this._isExpiring = param1;
    }

    public get citizenshipVipIsExpiring(): boolean {
        return this._isCitizenshipVipExpiring;
    }

    public set citizenshipVipIsExpiring(param1: boolean) {
        this._isCitizenshipVipExpiring = param1;
    }

    public get minutesSinceLastModified(): number {
        return this._minutesSinceLastModified;
    }

    public set minutesSinceLastModified(param1: number) {
        this._lastUpdated = getTimer();
        this._minutesSinceLastModified = param1;
    }
}
