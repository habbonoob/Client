import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FriendFurniCancelLockMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendfurni/FriendFurniCancelLockMessageParser';

export class FriendFurniCancelLockMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendfurni::FriendFurniCancelLockMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FriendFurniCancelLockMessageParser);
    }

    public getParser(): FriendFurniCancelLockMessageParser {
        return this._parser instanceof FriendFurniCancelLockMessageParser ? this._parser : null;
    }
}
