import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendFurniOtherLockConfirmedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendfurni/FriendFurniOtherLockConfirmedMessageParser';

export class FriendFurniOtherLockConfirmedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendfurni::FriendFurniOtherLockConfirmedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendFurniOtherLockConfirmedMessageParser);
    }

    public getParser(): FriendFurniOtherLockConfirmedMessageParser {
        return this._parser instanceof FriendFurniOtherLockConfirmedMessageParser ? this._parser : null;
    }
}
