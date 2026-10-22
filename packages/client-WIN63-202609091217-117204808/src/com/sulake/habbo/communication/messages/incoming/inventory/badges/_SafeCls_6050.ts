import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6050 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::_SafeCls_6050'); }

    declare private _badgeId: number;
    static { (this.prototype as any)._badgeId = 0; }

    declare private _badgeCode: string;

    declare private _SafeStr_2331: number;
    static { (this.prototype as any)._SafeStr_2331 = 0; }

    declare private _SafeStr_14282: number;
    static { (this.prototype as any)._SafeStr_14282 = 0; }

    constructor(param1: number, param2: string, param3: number, param4: number) {
        this._badgeId = param1;
        this._badgeCode = param2;
        this._SafeStr_2331 = param3;
        this._SafeStr_14282 = param4;
    }

    public get badgeId(): number {
        return this._badgeId;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get ownerCount(): number {
        return this._SafeStr_2331;
    }

    public get badgeRarityId(): number {
        return this._SafeStr_14282;
    }
}
