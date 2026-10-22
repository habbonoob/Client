import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AchievementResolutionProgressMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.lobby::AchievementResolutionProgressMessageParser'); }

    constructor() {
    }

    declare private _achievementId: number;
    static { (this.prototype as any)._achievementId = 0; }

    declare private _requiredLevelBadgeCode: string;

    declare private _userProgress: number;
    static { (this.prototype as any)._userProgress = 0; }

    declare private _totalProgress: number;
    static { (this.prototype as any)._totalProgress = 0; }

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    public get stuffId(): number {
        return this._stuffId;
    }

    declare private _endTime: number;
    static { (this.prototype as any)._endTime = 0; }

    public get endTime(): number {
        return this._endTime;
    }

    public get achievementId(): number {
        return this._achievementId;
    }

    public get requiredLevelBadgeCode(): string {
        return this._requiredLevelBadgeCode;
    }

    public get userProgress(): number {
        return this._userProgress;
    }

    public get totalProgress(): number {
        return this._totalProgress;
    }

    public flush(): boolean {
        this._stuffId = -1;
        this._achievementId = 0;
        this._requiredLevelBadgeCode = "";
        this._userProgress = 0;
        this._totalProgress = 0;
        this._endTime = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._stuffId = param1.readInteger();
        this._achievementId = param1.readInteger();
        this._requiredLevelBadgeCode = param1.readString();
        this._userProgress = param1.readInteger();
        this._totalProgress = param1.readInteger();
        this._endTime = param1.readInteger();
        return true;
    }
}
