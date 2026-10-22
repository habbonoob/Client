import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BannedUsersFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/BannedUsersFromRoomParser';

export class BannedUsersFromRoomEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::BannedUsersFromRoomEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BannedUsersFromRoomParser);
    }

    public getParser(): BannedUsersFromRoomParser {
        return this._parser instanceof BannedUsersFromRoomParser ? this._parser : null;
    }
}
