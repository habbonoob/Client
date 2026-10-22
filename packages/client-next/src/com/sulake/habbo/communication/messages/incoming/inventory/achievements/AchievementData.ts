import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class AchievementData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.achievements::AchievementData'); }

    public static readonly _SafeStr_8604: number = -1;
    public static readonly _SafeStr_7971: number = 0;
    public static readonly _SafeStr_7993: number = 1;
    public static readonly _SafeStr_7675: number = 2;

    declare private _achievementId: number;
    static { (this.prototype as any)._achievementId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _badgeId: string;

    declare private _scoreAtStartOfLevel: number;
    static { (this.prototype as any)._scoreAtStartOfLevel = 0; }

    declare private _SafeStr_5712: number;
    static { (this.prototype as any)._SafeStr_5712 = 0; }

    declare private _levelRewardPoints: number;
    static { (this.prototype as any)._levelRewardPoints = 0; }

    declare private _levelRewardPointType: number;
    static { (this.prototype as any)._levelRewardPointType = 0; }

    declare private _SafeStr_5034: number;
    static { (this.prototype as any)._SafeStr_5034 = 0; }

    declare private _finalLevel: boolean;
    static { (this.prototype as any)._finalLevel = false; }

    declare private _category: string;

    declare private _subCategory: string;

    declare private _levelCount: number;
    static { (this.prototype as any)._levelCount = 0; }

    declare private _SafeStr_6998: number;
    static { (this.prototype as any)._SafeStr_6998 = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _code: string;

    constructor(param1: IMessageDataWrapper) {
        this._achievementId = param1.readInteger();
        this._level = param1.readInteger();
        this._badgeId = param1.readString();
        this._scoreAtStartOfLevel = param1.readInteger();
        this._SafeStr_5712 = Math.max(1, param1.readInteger()) | 0;
        this._levelRewardPoints = param1.readInteger();
        this._levelRewardPointType = param1.readInteger();
        this._SafeStr_5034 = param1.readInteger();
        this._finalLevel = param1.readBoolean();
        this._category = param1.readString();
        this._subCategory = param1.readString();
        this._levelCount = param1.readInteger();
        this._SafeStr_6998 = param1.readInteger();
        this._state = param1.readShort();
        let _loc2_: string = this._badgeId;
        if (_loc2_.indexOf("ACH_") == 0) {
            _loc2_ = _loc2_.substr(4);
        }
        let _loc3_: string = "0123456789";
        while (_loc2_.length > 0 && _loc3_.indexOf(_loc2_.charAt(_loc2_.length - 1)) != -1) {
            _loc2_ = _loc2_.substr(0, _loc2_.length - 1);
        }
        this._code = _loc2_;
    }

    public get achievementId(): number {
        return this._achievementId;
    }

    public get badgeId(): string {
        return this._badgeId;
    }

    public get level(): number {
        return this._level;
    }

    public get scoreAtStartOfLevel(): number {
        return this._scoreAtStartOfLevel;
    }

    public get scoreLimit(): number {
        return this._SafeStr_5712 - this._scoreAtStartOfLevel;
    }

    public get levelRewardPoints(): number {
        return this._levelRewardPoints;
    }

    public get levelRewardPointType(): number {
        return this._levelRewardPointType;
    }

    public get currentPoints(): number {
        return this._SafeStr_5034 - this._scoreAtStartOfLevel;
    }

    public get finalLevel(): boolean {
        return this._finalLevel;
    }

    public get category(): string {
        return this._category;
    }

    public get subCategory(): string {
        return this._subCategory;
    }

    public get levelCount(): number {
        return this._levelCount;
    }

    public get state(): number {
        return this._state;
    }

    public get code(): string {
        return this._code;
    }

    public set category(param1: string) {
        this._category = param1;
    }

    public get firstLevelAchieved(): boolean {
        return this._level > 1 || this._finalLevel;
    }

    public setMaxProgress(): void {
        this._SafeStr_5034 = this._SafeStr_5712;
    }

    public get displayMethod(): number {
        return this._SafeStr_6998;
    }
}
