import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IgnoreResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/IgnoreResultMessageParser';

export class IgnoreResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::IgnoreResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IgnoreResultMessageParser);
    }

    public get result(): number {
        return (this._parser instanceof IgnoreResultMessageParser ? this._parser : null).result;
    }

    public get userId(): number {
        return (this._parser instanceof IgnoreResultMessageParser ? this._parser : null).ignoredUserId;
    }
}
