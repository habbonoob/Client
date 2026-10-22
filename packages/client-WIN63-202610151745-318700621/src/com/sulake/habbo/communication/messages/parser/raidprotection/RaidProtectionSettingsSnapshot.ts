import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RaidProtectionSettingsSnapshot {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.raidprotection::RaidProtectionSettingsSnapshot'); }

    public static readonly _SafeStr_14144: number = 0;
    public static readonly _SafeStr_14145: number = 1;
    public static readonly SENSITIVITY_HIGH: number = 2;
    public static readonly ACTION_KICK: number = 0;
    public static readonly ACTION_TEMPORARY_BAN: number = 1;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    declare private _SafeStr_14146: number;
    static { (this.prototype as any)._SafeStr_14146 = 0; }

    declare private _actionType: number;
    static { (this.prototype as any)._actionType = 0; }

    declare private _SafeStr_14147: number;
    static { (this.prototype as any)._SafeStr_14147 = 0; }

    declare private _SafeStr_14148: boolean;
    static { (this.prototype as any)._SafeStr_14148 = false; }

    declare private _SafeStr_14149: number;
    static { (this.prototype as any)._SafeStr_14149 = 0; }

    declare private _SafeStr_14150: number;
    static { (this.prototype as any)._SafeStr_14150 = 0; }

    declare private _SafeStr_14151: boolean;
    static { (this.prototype as any)._SafeStr_14151 = false; }

    declare private _SafeStr_14152: number;
    static { (this.prototype as any)._SafeStr_14152 = 0; }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: number, param9: boolean, param10: number) {
        this._roomId = param1;
        this._enabled = param2;
        this._SafeStr_14146 = param3;
        this._actionType = param4;
        this._SafeStr_14147 = param5;
        this._SafeStr_14148 = param6;
        this._SafeStr_14149 = param7;
        this._SafeStr_14150 = param8;
        this._SafeStr_14151 = param9;
        this._SafeStr_14152 = param10;
    }

    public static readFromMessage(param1: IMessageDataWrapper): RaidProtectionSettingsSnapshot {
        return RaidProtectionSettingsSnapshot.readAfterRoomId(param1.readInteger(), param1);
    }

    public static readAfterRoomId(param1: number, param2: IMessageDataWrapper): RaidProtectionSettingsSnapshot {
        return new RaidProtectionSettingsSnapshot(param1, param2.readBoolean(), param2.readInteger(), param2.readInteger(), param2.readInteger(), param2.readBoolean(), param2.readInteger(), param2.readInteger(), param2.readBoolean(), param2.readInteger());
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public get detectionSensitivity(): number {
        return this._SafeStr_14146;
    }

    public get actionType(): number {
        return this._actionType;
    }

    public get banDurationSeconds(): number {
        return this._SafeStr_14147;
    }

    public get guardEnabled(): boolean {
        return this._SafeStr_14148;
    }

    public get guardDurationSeconds(): number {
        return this._SafeStr_14149;
    }

    public get guardSensitivity(): number {
        return this._SafeStr_14150;
    }

    public get incidentActive(): boolean {
        return this._SafeStr_14151;
    }

    public get lastRaidAtEpochSeconds(): number {
        return this._SafeStr_14152;
    }
}
