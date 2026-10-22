import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6059 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::_SafeCls_6059'); }

    declare private _SafeStr_14121: number;
    static { (this.prototype as any)._SafeStr_14121 = 0; }

    declare private _badgeCode: string;

    declare private _SafeStr_2331: number;
    static { (this.prototype as any)._SafeStr_2331 = 0; }

    declare private _SafeStr_14122: number;
    static { (this.prototype as any)._SafeStr_14122 = 0; }

    constructor(param1: number, param2: string, param3: number, param4: number) {
        this._SafeStr_14121 = param1;
        this._badgeCode = param2;
        this._SafeStr_2331 = param3;
        this._SafeStr_14122 = param4;
    }

    public get badgeIndex(): number {
        return this._SafeStr_14121;
    }

    public get slotIndex(): number {
        return this._SafeStr_14121 - 1;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get ownerCount(): number {
        return this._SafeStr_2331;
    }

    public get badgeRarityId(): number {
        return this._SafeStr_14122;
    }
}
