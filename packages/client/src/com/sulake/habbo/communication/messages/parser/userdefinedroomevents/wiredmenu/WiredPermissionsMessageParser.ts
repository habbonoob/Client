import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredPermissionsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredPermissionsMessageParser'); }

    constructor() {
    }

    declare private _canModify: boolean;
    static { (this.prototype as any)._canModify = false; }

    declare private _canRead: boolean;
    static { (this.prototype as any)._canRead = false; }

    public get canModify(): boolean {
        return this._canModify;
    }

    public get canRead(): boolean {
        return this._canRead;
    }

    public flush(): boolean {
        this._canModify = false;
        this._canRead = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._canModify = param1.readBoolean();
        this._canRead = param1.readBoolean();
        return true;
    }
}
