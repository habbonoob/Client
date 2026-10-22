import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InClientLinkMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/InClientLinkMessageParser';

export class InClientLinkMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::InClientLinkMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InClientLinkMessageParser);
    }

    public get link(): string {
        return (this._parser instanceof InClientLinkMessageParser ? this._parser : null).link;
    }
}
