import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendFurniStartConfirmationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendfurni/FriendFurniStartConfirmationMessageParser';

export class FriendFurniStartConfirmationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendfurni::FriendFurniStartConfirmationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendFurniStartConfirmationMessageParser);
    }

    public getParser(): FriendFurniStartConfirmationMessageParser {
        return this._parser instanceof FriendFurniStartConfirmationMessageParser ? this._parser : null;
    }
}
