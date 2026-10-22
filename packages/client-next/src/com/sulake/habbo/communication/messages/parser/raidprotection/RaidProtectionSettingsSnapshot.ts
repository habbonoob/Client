import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RaidProtectionSettingsSnapshot {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.raidprotection::RaidProtectionSettingsSnapshot'); }

    public static readonly _SafeStr_14335: number = 0;
    public static readonly _SafeStr_14336: number = 1;
    public static readonly SENSITIVITY_HIGH: number = 2;
    public static readonly ACTION_KICK: number = 0;
    public static readonly ACTION_TEMPORARY_BAN: number = 1;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    declare private _SafeStr_14337: number;
    static { (this.prototype as any)._SafeStr_14337 = 0; }

    declare private _actionType: number;
    static { (this.prototype as any)._actionType = 0; }

    declare private _SafeStr_14338: number;
    static { (this.prototype as any)._SafeStr_14338 = 0; }

    declare private _SafeStr_14339: boolean;
    static { (this.prototype as any)._SafeStr_14339 = false; }

    declare private _SafeStr_14340: number;
    static { (this.prototype as any)._SafeStr_14340 = 0; }

    declare private _SafeStr_14341: number;
    static { (this.prototype as any)._SafeStr_14341 = 0; }

    declare private _SafeStr_14342: boolean;
    static { (this.prototype as any)._SafeStr_14342 = false; }

    declare private _SafeStr_14343: number;
    static { (this.prototype as any)._SafeStr_14343 = 0; }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: number, param9: boolean, param10: number) {
        this._roomId = param1;
        this._enabled = param2;
        this._SafeStr_14337 = param3;
        this._actionType = param4;
        this._SafeStr_14338 = param5;
        this._SafeStr_14339 = param6;
        this._SafeStr_14340 = param7;
        this._SafeStr_14341 = param8;
        this._SafeStr_14342 = param9;
        this._SafeStr_14343 = param10;
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
        return this._SafeStr_14337;
    }

    public get actionType(): number {
        return this._actionType;
    }

    public get banDurationSeconds(): number {
        return this._SafeStr_14338;
    }

    public get guardEnabled(): boolean {
        return this._SafeStr_14339;
    }

    public get guardDurationSeconds(): number {
        return this._SafeStr_14340;
    }

    public get guardSensitivity(): number {
        return this._SafeStr_14341;
    }

    public get incidentActive(): boolean {
        return this._SafeStr_14342;
    }

    public get lastRaidAtEpochSeconds(): number {
        return this._SafeStr_14343;
    }
}
