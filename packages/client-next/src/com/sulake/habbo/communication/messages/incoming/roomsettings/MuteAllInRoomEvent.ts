import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MuteAllInRoomParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/MuteAllInRoomParser';

export class MuteAllInRoomEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::MuteAllInRoomEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MuteAllInRoomParser);
    }

    public getParser(): MuteAllInRoomParser {
        return this._parser instanceof MuteAllInRoomParser ? this._parser : null;
    }
}
