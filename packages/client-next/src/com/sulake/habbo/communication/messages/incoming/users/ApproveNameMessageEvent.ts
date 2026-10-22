import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ApproveNameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ApproveNameMessageParser';

export class ApproveNameMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ApproveNameMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ApproveNameMessageParser);
    }

    public getParser(): ApproveNameMessageParser {
        return this._parser instanceof ApproveNameMessageParser ? this._parser : null;
    }
}
