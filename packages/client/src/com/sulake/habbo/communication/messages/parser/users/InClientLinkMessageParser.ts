import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InClientLinkMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::InClientLinkMessageParser'); }

    constructor() {
    }

    declare private _link: string;

    public get link(): string {
        return this._link;
    }

    public flush(): boolean {
        this._link = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._link = param1.readString();
        return true;
    }
}
