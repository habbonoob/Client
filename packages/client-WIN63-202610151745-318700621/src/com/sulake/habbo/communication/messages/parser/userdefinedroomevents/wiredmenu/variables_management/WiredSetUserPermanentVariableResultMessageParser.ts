import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredSetUserPermanentVariableResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredSetUserPermanentVariableResultMessageParser'); }

    declare private _success: boolean;
    static { (this.prototype as any)._success = false; }

    constructor() {
    }

    public flush(): boolean {
        this._success = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._success = param1.readBoolean();
        return true;
    }

    public get success(): boolean {
        return this._success;
    }
}
