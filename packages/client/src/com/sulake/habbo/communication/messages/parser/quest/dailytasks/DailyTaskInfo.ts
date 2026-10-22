import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { DailyTaskReward } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskReward';

export class DailyTaskInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest.dailytasks::DailyTaskInfo'); }

    public static _SafeStr_7314: number = 0;
    public static _SafeStr_5610: number = 1;
    public static _SafeStr_7420: number = 2;

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._receiveTime = new Date();
        this._taskId = param1.readLong();
        this._taskCode = param1.readString();
        this._questTypeCode = param1.readString();
        this._isBonus = param1.readBoolean();
        this._imageVersion = param1.readString();
        this._catalogName = param1.readString();
        this._requiredRepeats = param1.readInteger();
        this._repeats = param1.readInteger();
        this._status = param1.readByte();
        this._SafeStr_4808 = param1.readInteger();
        this._rewards = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._rewards.push(new DailyTaskReward(param1));
            _loc2_ += 1;
        }
    }

    declare private _taskId: number;
    static { (this.prototype as any)._taskId = NaN; }

    declare private _taskCode: string;

    declare private _questTypeCode: string;

    declare private _isBonus: boolean;
    static { (this.prototype as any)._isBonus = false; }

    declare private _imageVersion: string;

    declare private _catalogName: string;

    declare private _requiredRepeats: number;
    static { (this.prototype as any)._requiredRepeats = 0; }

    declare private _repeats: number;
    static { (this.prototype as any)._repeats = 0; }

    declare private _SafeStr_4808: number;
    static { (this.prototype as any)._SafeStr_4808 = 0; }

    declare private _receiveTime: Date;

    declare private _rewards: DailyTaskReward[];

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public set status(param1: number) {
        this._status = param1;
    }

    public get taskId(): number {
        return this._taskId;
    }

    public get taskCode(): string {
        return this._taskCode;
    }

    public get questTypeCode(): string {
        return this._questTypeCode;
    }

    public get isBonus(): boolean {
        return this._isBonus;
    }

    public get imageVersion(): string {
        return this._imageVersion;
    }

    public get catalogName(): string {
        return this._catalogName;
    }

    public get requiredRepeats(): number {
        return this._requiredRepeats;
    }

    public get repeats(): number {
        return this._repeats;
    }

    public set repeats(param1: number) {
        this._repeats = param1;
    }

    public get secondsLeft(): number {
        if (this._SafeStr_4808 <= 0) {
            return 0;
        }
        let _loc1_: Date = new Date();
        let _loc2_: number = (_loc1_.getTime() - this._receiveTime.getTime()) / 1000 | 0;
        return this._SafeStr_4808 - _loc2_;
    }

    public get isExpired(): boolean {
        return this._SafeStr_4808 < 0 && this._status != DailyTaskInfo._SafeStr_7314;
    }

    public get rewards(): DailyTaskReward[] {
        return this._rewards;
    }

    public get nameLocalizationKey(): string {
        return "dailytask." + this._taskCode + ".name";
    }

    public get descriptionLocalizationKey(): string {
        return "dailytask." + this._taskCode + ".desc";
    }

    public get hintLocalizationKey(): string {
        return "dailytask." + this._taskCode + ".hint";
    }
}
