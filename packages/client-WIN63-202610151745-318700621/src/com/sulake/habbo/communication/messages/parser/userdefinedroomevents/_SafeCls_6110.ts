import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6110 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6110'); }

    declare private _SafeStr_14942: number;
    static { (this.prototype as any)._SafeStr_14942 = 0; }

    declare private _SafeStr_14943: boolean;
    static { (this.prototype as any)._SafeStr_14943 = false; }

    declare private _key: string;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14942 = -1;
        this._SafeStr_14943 = false;
        this._key = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14942 = param1.readInteger();
        this._SafeStr_14943 = param1.readBoolean();
        this._key = param1.readString();
        return true;
    }

    public get wiredId(): number {
        return this._SafeStr_14942;
    }

    public get isReadKey(): boolean {
        return this._SafeStr_14943;
    }

    public get key(): string {
        return this._key;
    }
}
