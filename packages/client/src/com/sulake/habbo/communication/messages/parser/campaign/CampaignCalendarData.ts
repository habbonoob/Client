import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CampaignCalendarData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.campaign::CampaignCalendarData'); }

    constructor() {
    }

    declare private _campaignName: string;

    declare private _campaignImage: string;

    declare private _currentDay: number;
    static { (this.prototype as any)._currentDay = 0; }

    declare private _campaignDays: number;
    static { (this.prototype as any)._campaignDays = 0; }

    declare private _openedDays: number[];

    declare private _missedDays: number[];

    public get campaignName(): string {
        return this._campaignName;
    }

    public set campaignName(param1: string) {
        this._campaignName = param1;
    }

    public get campaignImage(): string {
        return this._campaignImage;
    }

    public set campaignImage(param1: string) {
        this._campaignImage = param1;
    }

    public get currentDay(): number {
        return this._currentDay;
    }

    public set currentDay(param1: number) {
        this._currentDay = param1;
    }

    public get campaignDays(): number {
        return this._campaignDays;
    }

    public set campaignDays(param1: number) {
        this._campaignDays = param1;
    }

    public get openedDays(): number[] {
        return this._openedDays;
    }

    public set openedDays(param1: number[]) {
        this._openedDays = param1;
    }

    public get missedDays(): number[] {
        return this._missedDays;
    }

    public set missedDays(param1: number[]) {
        this._missedDays = param1;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        this._campaignName = param1.readString();
        this._campaignImage = param1.readString();
        this._currentDay = param1.readInteger();
        this._campaignDays = param1.readInteger();
        this._openedDays = new Array<number>(0).fill(0);
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._openedDays.push(param1.readInteger());
            _loc3_++;
        }
        this._missedDays = new Array<number>(0).fill(0);
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._missedDays.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public clone(): CampaignCalendarData {
        let _loc1_: CampaignCalendarData = new CampaignCalendarData();
        _loc1_.campaignDays = this._campaignDays;
        _loc1_.campaignImage = this._campaignImage;
        _loc1_.campaignName = this._campaignName;
        _loc1_.currentDay = this._currentDay;
        _loc1_.missedDays = this._missedDays;
        _loc1_.openedDays = this._openedDays;
        return _loc1_;
    }
}
