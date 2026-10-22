import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FloorHeightMapMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FloorHeightMapMessageParser';

export class FloorHeightMapMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::FloorHeightMapMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FloorHeightMapMessageParser);
    }

    public getParser(): FloorHeightMapMessageParser {
        return this._parser instanceof FloorHeightMapMessageParser ? this._parser : null;
    }
}
