import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';

export class Purse implements IPurse {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purse::Purse'); }

    private _credits: number = 0;
    private _activityPoints: Map<any, any> = new Dictionary();
    private _clubDays: number = 0;
    private _clubPeriods: number = 0;
    private _isVIP: boolean = false;
    private _pastClubDays: number = 0;
    private _pastVipDays: number = 0;
    private _isExpiring: boolean = false;
    private _minutesUntilExpiration: number = 0;

    declare private _minutesSinceLastModified: number;
    static { (this.prototype as any)._minutesSinceLastModified = 0; }

    declare private _lastUpdated: number;
    static { (this.prototype as any)._lastUpdated = 0; }

    private _emeraldBalance: number = 0;
    private _silverBalance: number = 0;

    constructor() {
    }

    public get credits(): number {
        return this._credits;
    }

    public set credits(param1: number) {
        this._lastUpdated = getTimer();
        this._credits = param1;
    }

    public get clubDays(): number {
        return this._clubDays;
    }

    public set clubDays(param1: number) {
        this._lastUpdated = getTimer();
        this._clubDays = param1;
    }

    public get clubPeriods(): number {
        return this._clubPeriods;
    }

    public set clubPeriods(param1: number) {
        this._lastUpdated = getTimer();
        this._clubPeriods = param1;
    }

    public get hasClubLeft(): boolean {
        return this._clubDays > 0 || this._clubPeriods > 0;
    }

    public get isVIP(): boolean {
        return this._isVIP;
    }

    public get isExpiring(): boolean {
        return this._isExpiring;
    }

    public set isExpiring(param1: boolean) {
        this._isExpiring = param1;
    }

    public set isVIP(param1: boolean) {
        this._isVIP = param1;
    }

    public get pastClubDays(): number {
        return this._pastClubDays;
    }

    public set pastClubDays(param1: number) {
        this._lastUpdated = getTimer();
        this._pastClubDays = param1;
    }

    public get pastVipDays(): number {
        return this._pastVipDays;
    }

    public set pastVipDays(param1: number) {
        this._lastUpdated = getTimer();
        this._pastVipDays = param1;
    }

    public get activityPoints(): Map<any, any> {
        return this._activityPoints;
    }

    public set activityPoints(param1: Map<any, any>) {
        this._lastUpdated = getTimer();
        this._activityPoints = param1;
    }

    public getActivityPointsForType(param1: number): number {
        return this._activityPoints.get(param1) | 0;
    }

    public set minutesUntilExpiration(param1: number) {
        this._lastUpdated = getTimer();
        this._minutesUntilExpiration = param1;
    }

    public get minutesUntilExpiration(): number {
        let _loc1_: number = (getTimer() - this._lastUpdated) / 60000 | 0;
        let _loc2_: number = this._minutesUntilExpiration - _loc1_;
        return _loc2_ > 0 ? _loc2_ : 0;
    }

    public set minutesSinceLastModified(param1: number) {
        this._lastUpdated = getTimer();
        this._minutesSinceLastModified = param1;
    }

    public get minutesSinceLastModified(): number {
        return this._minutesSinceLastModified;
    }

    public get lastUpdated(): number {
        return this._lastUpdated;
    }

    public get emeraldBalance(): number {
        return this._emeraldBalance;
    }

    public set emeraldBalance(param1: number) {
        this._emeraldBalance = param1;
    }

    public get silverBalance(): number {
        return this._silverBalance;
    }

    public set silverBalance(param1: number) {
        this._silverBalance = param1;
    }
}
