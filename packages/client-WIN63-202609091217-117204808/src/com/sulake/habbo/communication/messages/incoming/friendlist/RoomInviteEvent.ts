import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomInviteMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteMessageParser';

export class RoomInviteEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::RoomInviteEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomInviteMessageParser);
    }

    public getParser(): RoomInviteMessageParser {
        return this._parser instanceof RoomInviteMessageParser ? this._parser : null;
    }
}
