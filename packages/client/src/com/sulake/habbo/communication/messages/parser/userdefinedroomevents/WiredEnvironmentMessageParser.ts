import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredEnvironmentMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredEnvironmentMessageParser'); }

    constructor() {
    }

    declare private _hasClickUserWired: boolean;
    static { (this.prototype as any)._hasClickUserWired = false; }

    public get hasClickUserWired(): boolean {
        return this._hasClickUserWired;
    }

    public flush(): boolean {
        this._hasClickUserWired = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._hasClickUserWired = param1.readBoolean();
        return true;
    }
}
