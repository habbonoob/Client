import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserPurchasableChatStylesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/chatstyles/UserPurchasableChatStylesMessageParser';

export class UserPurchasableChatStylesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.chatstyles::UserPurchasableChatStylesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserPurchasableChatStylesMessageParser);
    }

    public getParser(): UserPurchasableChatStylesMessageParser {
        return this._parser instanceof UserPurchasableChatStylesMessageParser ? this._parser : null;
    }
}
