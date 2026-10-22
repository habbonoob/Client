import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6109 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6109'); }

    declare private _SafeStr_14923: number;
    static { (this.prototype as any)._SafeStr_14923 = 0; }

    declare private _SafeStr_14924: boolean;
    static { (this.prototype as any)._SafeStr_14924 = false; }

    declare private _key: string;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14923 = -1;
        this._SafeStr_14924 = false;
        this._key = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14923 = param1.readInteger();
        this._SafeStr_14924 = param1.readBoolean();
        this._key = param1.readString();
        return true;
    }

    public get wiredId(): number {
        return this._SafeStr_14923;
    }

    public get isReadKey(): boolean {
        return this._SafeStr_14924;
    }

    public get key(): string {
        return this._key;
    }
}
