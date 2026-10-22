import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomPropertyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomPropertyMessageParser';

export class RoomPropertyMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::RoomPropertyMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomPropertyMessageParser);
    }

    public getParser(): RoomPropertyMessageParser {
        return this._parser instanceof RoomPropertyMessageParser ? this._parser : null;
    }
}
