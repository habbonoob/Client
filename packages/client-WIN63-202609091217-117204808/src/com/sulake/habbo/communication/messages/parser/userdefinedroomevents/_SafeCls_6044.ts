import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6044 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6044'); }

    declare private _SafeStr_14189: number;
    static { (this.prototype as any)._SafeStr_14189 = 0; }

    declare private _SafeStr_14190: boolean;
    static { (this.prototype as any)._SafeStr_14190 = false; }

    declare private _key: string;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14189 = -1;
        this._SafeStr_14190 = false;
        this._key = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14189 = param1.readInteger();
        this._SafeStr_14190 = param1.readBoolean();
        this._key = param1.readString();
        return true;
    }

    public get wiredId(): number {
        return this._SafeStr_14189;
    }

    public get isReadKey(): boolean {
        return this._SafeStr_14190;
    }

    public get key(): string {
        return this._key;
    }
}
