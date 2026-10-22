import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class AchievementLevelUpData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::AchievementLevelUpData'); }

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._level = param1.readInteger();
        this._badgeId = param1.readInteger();
        this._badgeCode = param1.readString();
        this._SafeStr_5536 = param1.readInteger();
        this._levelRewardPoints = param1.readInteger();
        this._levelRewardPointType = param1.readInteger();
        this._bonusPoints = param1.readInteger();
        this._achievementID = param1.readInteger();
        this._removedBadgeCode = param1.readString();
        this._category = param1.readString();
        this._showDialogToUser = param1.readBoolean();
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _SafeStr_5536: number;
    static { (this.prototype as any)._SafeStr_5536 = 0; }

    declare private _levelRewardPoints: number;
    static { (this.prototype as any)._levelRewardPoints = 0; }

    declare private _levelRewardPointType: number;
    static { (this.prototype as any)._levelRewardPointType = 0; }

    declare private _bonusPoints: number;
    static { (this.prototype as any)._bonusPoints = 0; }

    declare private _badgeId: number;
    static { (this.prototype as any)._badgeId = 0; }

    private _removedBadgeCode: string = "";

    declare private _achievementID: number;
    static { (this.prototype as any)._achievementID = 0; }

    declare private _category: string;

    declare private _showDialogToUser: boolean;
    static { (this.prototype as any)._showDialogToUser = false; }

    private _badgeCode: string = "";

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get type(): number {
        return this._type;
    }

    public get level(): number {
        return this._level;
    }

    public get points(): number {
        return this._SafeStr_5536;
    }

    public get levelRewardPoints(): number {
        return this._levelRewardPoints;
    }

    public get levelRewardPointType(): number {
        return this._levelRewardPointType;
    }

    public get bonusPoints(): number {
        return this._bonusPoints;
    }

    public get badgeId(): number {
        return this._badgeId;
    }

    public get removedBadgeCode(): string {
        return this._removedBadgeCode;
    }

    public get achievementID(): number {
        return this._achievementID;
    }

    public get category(): string {
        return this._category;
    }

    public get showDialogToUser(): boolean {
        return this._showDialogToUser;
    }
}
