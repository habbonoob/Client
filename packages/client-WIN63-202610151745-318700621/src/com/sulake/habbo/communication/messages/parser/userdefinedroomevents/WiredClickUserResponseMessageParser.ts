import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredClickUserResponseMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredClickUserResponseMessageParser'); }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _openMenu: boolean;
    static { (this.prototype as any)._openMenu = false; }

    constructor() {
    }

    public flush(): boolean {
        this._index = 0;
        this._openMenu = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._index = param1.readInteger();
        this._openMenu = param1.readBoolean();
        return true;
    }

    public get index(): number {
        return this._index;
    }

    public get openMenu(): boolean {
        return this._openMenu;
    }
}
