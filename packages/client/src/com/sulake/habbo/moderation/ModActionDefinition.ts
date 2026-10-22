import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ModActionDefinition {
    static { registerClassName(this, 'com.sulake.habbo.moderation::ModActionDefinition'); }

    public static readonly ALERT: number = 1;
    public static readonly MUTE: number = 2;
    public static readonly BAN: number = 3;
    public static readonly KICK: number = 4;
    public static readonly TRADING_LOCK: number = 5;
    public static readonly MESSAGE: number = 6;

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number) {
        this._actionId = param1;
        this._name = param2;
        this._actionType = param3;
        this._sanctionTypeId = param4;
        this._actionLengthHours = param5;
    }

    declare private _actionId: number;
    static { (this.prototype as any)._actionId = 0; }

    declare private _actionType: number;
    static { (this.prototype as any)._actionType = 0; }

    declare private _sanctionTypeId: number;
    static { (this.prototype as any)._sanctionTypeId = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _actionLengthHours: number;
    static { (this.prototype as any)._actionLengthHours = 0; }

    public get actionLengthHours(): number {
        return this._actionLengthHours;
    }

    public get actionId(): number {
        return this._actionId;
    }

    public get actionType(): number {
        return this._actionType;
    }

    public get sanctionTypeId(): number {
        return this._sanctionTypeId;
    }
}
