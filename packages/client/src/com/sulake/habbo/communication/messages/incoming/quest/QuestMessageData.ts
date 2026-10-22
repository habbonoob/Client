import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class QuestMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::QuestMessageData'); }

    public static getCampaignLocalizationKeyForCode(param1: string): string {
        return "quests." + param1;
    }

    constructor(param1: IMessageDataWrapper) {
        this._campaignCode = param1.readString();
        this._completedQuestsInCampaign = param1.readInteger();
        this._questCountInCampaign = param1.readInteger();
        this._activityPointType = param1.readInteger();
        this._id = param1.readInteger();
        this._accepted = param1.readBoolean();
        this._type = param1.readString();
        this._imageVersion = param1.readString();
        this._rewardCurrencyAmount = param1.readInteger();
        this._localizationCode = param1.readString();
        this._completedSteps = param1.readInteger();
        this._totalSteps = param1.readInteger();
        this._sortOrder = param1.readInteger();
        this._catalogPageName = param1.readString();
        this._chainCode = param1.readString();
        this._easy = param1.readBoolean();
        this._isSeasonal = param1.readBoolean();
        if (this._isSeasonal) {
            this._SafeStr_4808 = param1.readInteger();
        }
    }

    declare private _completedQuestsInCampaign: number;
    static { (this.prototype as any)._completedQuestsInCampaign = 0; }

    declare private _questCountInCampaign: number;
    static { (this.prototype as any)._questCountInCampaign = 0; }

    declare private _activityPointType: number;
    static { (this.prototype as any)._activityPointType = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _accepted: boolean;
    static { (this.prototype as any)._accepted = false; }

    declare private _type: string;

    declare private _imageVersion: string;

    declare private _rewardCurrencyAmount: number;
    static { (this.prototype as any)._rewardCurrencyAmount = 0; }

    declare private _localizationCode: string;

    declare private _completedSteps: number;
    static { (this.prototype as any)._completedSteps = 0; }

    declare private _totalSteps: number;
    static { (this.prototype as any)._totalSteps = 0; }

    declare private _waitPeriodSeconds: number;
    static { (this.prototype as any)._waitPeriodSeconds = 0; }

    declare private _sortOrder: number;
    static { (this.prototype as any)._sortOrder = 0; }

    declare private _easy: boolean;
    static { (this.prototype as any)._easy = false; }

    declare private _isSeasonal: boolean;
    static { (this.prototype as any)._isSeasonal = false; }

    declare private _SafeStr_4808: number;
    static { (this.prototype as any)._SafeStr_4808 = 0; }

    private _receiveTime: Date = new Date();

    declare private _campaignCode: string;

    public get campaignCode(): string {
        return this._campaignCode;
    }

    declare private _catalogPageName: string;

    public get catalogPageName(): string {
        return this._catalogPageName;
    }

    declare private _chainCode: string;

    public get chainCode(): string {
        return this._chainCode;
    }

    public get localizationCode(): string {
        return this._localizationCode;
    }

    public get completedQuestsInCampaign(): number {
        return this._completedQuestsInCampaign;
    }

    public get questCountInCampaign(): number {
        return this._questCountInCampaign;
    }

    public get activityPointType(): number {
        return this._activityPointType;
    }

    public get accepted(): boolean {
        return this._accepted;
    }

    public set accepted(param1: boolean) {
        this._accepted = param1;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get type(): string {
        return this._type;
    }

    public get imageVersion(): string {
        return this._imageVersion;
    }

    public get rewardCurrencyAmount(): number {
        return this._rewardCurrencyAmount;
    }

    public get completedSteps(): number {
        return this._completedSteps;
    }

    public get totalSteps(): number {
        return this._totalSteps;
    }

    public get isCompleted(): boolean {
        return this._completedSteps == this._totalSteps;
    }

    public get waitPeriodSeconds(): number {
        if (this._waitPeriodSeconds < 1) {
            return 0;
        }
        let _loc1_: Date = new Date();
        let _loc2_: number = _loc1_.getTime() - this._receiveTime.getTime() | 0;
        return Math.max(0, this._waitPeriodSeconds - Math.floor(_loc2_ / 1000)) | 0;
    }

    public set waitPeriodSeconds(param1: number) {
        this._waitPeriodSeconds = param1;
    }

    public get isSeasonal(): boolean {
        return this._isSeasonal;
    }

    public get secondsLeft(): number {
        if (this._SafeStr_4808 <= 0) {
            return 0;
        }
        let _loc1_: Date = new Date();
        let _loc2_: number = (_loc1_.getTime() - this._receiveTime.getTime()) / 1000 | 0;
        return this._SafeStr_4808 - _loc2_;
    }

    public get completedCampaign(): boolean {
        return this._id < 1;
    }

    public get lastQuestInCampaign(): boolean {
        return this._completedQuestsInCampaign >= this._questCountInCampaign;
    }

    public get receiveTime(): Date {
        return this._receiveTime;
    }

    public get sortOrder(): number {
        return this._sortOrder;
    }

    public get campaignChainCode(): string {
        if (this._isSeasonal) {
            return this._campaignCode + "." + this._chainCode;
        }
        return this._campaignCode;
    }

    public get easy(): boolean {
        return this._easy;
    }

    public getCampaignLocalizationKey(): string {
        return QuestMessageData.getCampaignLocalizationKeyForCode(this.campaignCode);
    }

    public getQuestLocalizationKey(): string {
        return this.getCampaignLocalizationKey() + "." + this._localizationCode;
    }
}
