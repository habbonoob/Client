import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomDimmerPresetsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RoomDimmerPresetsMessageParser';

export class RoomDimmerPresetsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RoomDimmerPresetsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomDimmerPresetsMessageParser);
    }

    public getParser(): RoomDimmerPresetsMessageParser {
        return this._parser instanceof RoomDimmerPresetsMessageParser ? this._parser : null;
    }
}
