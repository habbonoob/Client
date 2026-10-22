import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserUnbannedFromRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/UserUnbannedFromRoomParser';

export class UserUnbannedFromRoomEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::UserUnbannedFromRoomEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserUnbannedFromRoomParser);
    }

    public getParser(): UserUnbannedFromRoomParser {
        return this._parser instanceof UserUnbannedFromRoomParser ? this._parser : null;
    }
}
