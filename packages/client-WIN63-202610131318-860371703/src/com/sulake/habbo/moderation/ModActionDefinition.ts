import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ModActionDefinition {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ModActionDefinition'); }

    public static readonly ALERT: number = 1;
    public static readonly MUTE: number = 2;
    public static readonly BAN: number = 3;
    public static readonly KICK: number = 4;
    public static readonly TRADING_LOCK: number = 5;
    public static readonly MESSAGE: number = 6;

    declare private _SafeStr_6644: number;
    static { (this.prototype as any)._SafeStr_6644 = 0; }

    declare private _name: string;

    declare private _actionType: number;
    static { (this.prototype as any)._actionType = 0; }

    declare private _SafeStr_6233: number;
    static { (this.prototype as any)._SafeStr_6233 = 0; }

    declare private _actionLengthHours: number;
    static { (this.prototype as any)._actionLengthHours = 0; }

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number) {
        this._SafeStr_6644 = param1;
        this._name = param2;
        this._actionType = param3;
        this._SafeStr_6233 = param4;
        this._actionLengthHours = param5;
    }

    public get actionId(): number {
        return this._SafeStr_6644;
    }

    public get name(): string {
        return this._name;
    }

    public get actionType(): number {
        return this._actionType;
    }

    public get sanctionTypeId(): number {
        return this._SafeStr_6233;
    }

    public get actionLengthHours(): number {
        return this._actionLengthHours;
    }
}
