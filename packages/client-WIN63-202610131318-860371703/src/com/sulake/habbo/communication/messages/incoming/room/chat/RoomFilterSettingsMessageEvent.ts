import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomFilterSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/RoomFilterSettingsMessageParser';

export class RoomFilterSettingsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::RoomFilterSettingsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomFilterSettingsMessageParser);
    }

    public getParser(): RoomFilterSettingsMessageParser {
        return this._parser instanceof RoomFilterSettingsMessageParser ? this._parser : null;
    }
}
