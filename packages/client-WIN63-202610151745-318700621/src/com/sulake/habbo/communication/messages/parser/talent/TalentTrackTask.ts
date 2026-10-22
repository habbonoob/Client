import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class TalentTrackTask {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackTask'); }

    public static readonly _SafeStr_8047: string = "ACH_HabboWayGraduate1";
    public static readonly _SafeStr_8052: string = "ACH_GuideGroupMember1";
    public static readonly _SafeStr_8091: string = "ACH_SafetyQuizGraduate1";
    public static readonly _SafeStr_7735: string = "ACH_EmailVerification1";
    public static readonly ROOM_ENTRY_1: string = "ACH_RoomEntry1";
    public static readonly ROOM_ENTRY_2: string = "ACH_RoomEntry2";
    public static readonly _SafeStr_7584: string = "ACH_AvatarLooks1";
    public static readonly _SafeStr_7911: string = "ACH_GuideAdvertisementReader1";

    declare private _achievementId: number;
    static { (this.prototype as any)._achievementId = 0; }

    declare private _requiredLevel: number;
    static { (this.prototype as any)._requiredLevel = 0; }

    declare private _badgeCode: string;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _currentScore: number;
    static { (this.prototype as any)._currentScore = 0; }

    declare private _totalScore: number;
    static { (this.prototype as any)._totalScore = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._achievementId = param1.readInteger();
        this._requiredLevel = param1.readInteger();
        this._badgeCode = param1.readString();
        this._state = param1.readInteger();
        this._currentScore = param1.readInteger();
        this._totalScore = param1.readInteger();
    }

    public get state(): number {
        return this._state;
    }

    public get achievementId(): number {
        return this._achievementId;
    }

    public get requiredLevel(): number {
        return this._requiredLevel;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get currentScore(): number {
        return this._currentScore;
    }

    public get totalScore(): number {
        return this._totalScore;
    }

    public hasProgressDisplay(): boolean {
        switch (this.badgeCode) {
            case "ACH_HabboWayGraduate1":
            case "ACH_SafetyQuizGraduate1":
            case "ACH_EmailVerification1":
            case "ACH_AvatarLooks1":
                break;
            default:
                return true;
        }
        return false;
    }
}
