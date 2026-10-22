import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RaidProtectionSettingsSnapshot } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/RaidProtectionSettingsSnapshot';

export class RaidProtectionSettingsData {
    static { registerClassName(this, 'com.sulake.habbo.navigator.raidprotection::RaidProtectionSettingsData'); }

    public static readonly _SafeStr_14248: number = 0;
    public static readonly _SafeStr_14249: number = 1;
    public static readonly SENSITIVITY_HIGH: number = 2;
    public static readonly ACTION_KICK: number = 0;
    public static readonly ACTION_TEMPORARY_BAN: number = 1;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    declare private _SafeStr_14250: number;
    static { (this.prototype as any)._SafeStr_14250 = 0; }

    declare private _actionType: number;
    static { (this.prototype as any)._actionType = 0; }

    declare private _SafeStr_14251: number;
    static { (this.prototype as any)._SafeStr_14251 = 0; }

    declare private _SafeStr_14252: boolean;
    static { (this.prototype as any)._SafeStr_14252 = false; }

    declare private _SafeStr_14253: number;
    static { (this.prototype as any)._SafeStr_14253 = 0; }

    declare private _SafeStr_14254: number;
    static { (this.prototype as any)._SafeStr_14254 = 0; }

    declare private _SafeStr_14255: boolean;
    static { (this.prototype as any)._SafeStr_14255 = false; }

    declare private _SafeStr_14256: number;
    static { (this.prototype as any)._SafeStr_14256 = 0; }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: number, param6: boolean, param7: number, param8: number, param9: boolean, param10: number) {
        this._roomId = param1;
        this._enabled = param2;
        this._SafeStr_14250 = param3;
        this._actionType = param4;
        this._SafeStr_14251 = param5;
        this._SafeStr_14252 = param6;
        this._SafeStr_14253 = param7;
        this._SafeStr_14254 = param8;
        this._SafeStr_14255 = param9;
        this._SafeStr_14256 = param10;
    }

    public static fromSnapshot(param1: RaidProtectionSettingsSnapshot): RaidProtectionSettingsData {
        return new RaidProtectionSettingsData(param1.roomId, param1.enabled, param1.detectionSensitivity, param1.actionType, param1.banDurationSeconds, param1.guardEnabled, param1.guardDurationSeconds, param1.guardSensitivity, param1.incidentActive, param1.lastRaidAtEpochSeconds);
    }

    public matchesEditable(param1: RaidProtectionSettingsData): boolean {
        return param1 != null && this._enabled == param1.enabled && this._SafeStr_14250 == param1.detectionSensitivity && this._actionType == param1.actionType && this._SafeStr_14251 == param1.banDurationSeconds && this._SafeStr_14252 == param1.guardEnabled && this._SafeStr_14253 == param1.guardDurationSeconds && this._SafeStr_14254 == param1.guardSensitivity;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public get detectionSensitivity(): number {
        return this._SafeStr_14250;
    }

    public get actionType(): number {
        return this._actionType;
    }

    public get banDurationSeconds(): number {
        return this._SafeStr_14251;
    }

    public get guardEnabled(): boolean {
        return this._SafeStr_14252;
    }

    public get guardDurationSeconds(): number {
        return this._SafeStr_14253;
    }

    public get guardSensitivity(): number {
        return this._SafeStr_14254;
    }

    public get incidentActive(): boolean {
        return this._SafeStr_14255;
    }

    public get lastRaidAtEpochSeconds(): number {
        return this._SafeStr_14256;
    }
}
