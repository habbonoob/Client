import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class AchievementResolutionData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.achievements::AchievementResolutionData'); }

    public static readonly _SafeStr_8624: number = 0;

    constructor(param1: IMessageDataWrapper) {
        this._achievementId = param1.readInteger();
        this._level = param1.readInteger();
        this._badgeId = param1.readString();
        this._requiredLevel = param1.readInteger();
        this._state = param1.readInteger();
    }

    declare private _achievementId: number;
    static { (this.prototype as any)._achievementId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _badgeId: string;

    declare private _requiredLevel: number;
    static { (this.prototype as any)._requiredLevel = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    public get achievementId(): number {
        return this._achievementId;
    }

    public get level(): number {
        return this._level;
    }

    public get badgeId(): string {
        return this._badgeId;
    }

    public get requiredLevel(): number {
        return this._requiredLevel;
    }

    public get enabled(): boolean {
        return this._state == 0;
    }

    public get state(): number {
        return this._state;
    }

    public dispose(): void {
        this._achievementId = 0;
        this._level = 0;
        this._badgeId = "";
        this._requiredLevel = 0;
    }
}
