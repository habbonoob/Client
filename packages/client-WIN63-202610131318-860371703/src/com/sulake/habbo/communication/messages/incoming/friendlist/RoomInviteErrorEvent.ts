import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomInviteErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/RoomInviteErrorMessageParser';

export class RoomInviteErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::RoomInviteErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomInviteErrorMessageParser);
    }

    public getParser(): RoomInviteErrorMessageParser {
        return this._parser instanceof RoomInviteErrorMessageParser ? this._parser : null;
    }
}
