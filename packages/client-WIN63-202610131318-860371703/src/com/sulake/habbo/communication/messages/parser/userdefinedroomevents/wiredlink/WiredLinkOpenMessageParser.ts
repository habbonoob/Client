import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredLinkOpenMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredlink::WiredLinkOpenMessageParser'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._furniId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._furniId = param1.readInteger();
        return true;
    }

    public get furniId(): number {
        return this._furniId;
    }
}
