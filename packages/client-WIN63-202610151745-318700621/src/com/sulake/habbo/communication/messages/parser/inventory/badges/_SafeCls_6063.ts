import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6063 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::_SafeCls_6063'); }

    declare private _badgeId: number;
    static { (this.prototype as any)._badgeId = 0; }

    declare private _badgeCode: string;

    declare private _SafeStr_2331: number;
    static { (this.prototype as any)._SafeStr_2331 = 0; }

    declare private _SafeStr_14122: number;
    static { (this.prototype as any)._SafeStr_14122 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._badgeId = 0;
        this._badgeCode = "";
        this._SafeStr_2331 = 0;
        this._SafeStr_14122 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._badgeId = param1.readInteger();
        this._badgeCode = param1.readString();
        this._SafeStr_2331 = param1.readInteger();
        this._SafeStr_14122 = param1.readInteger();
        return true;
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
        return this._SafeStr_14122;
    }
}
