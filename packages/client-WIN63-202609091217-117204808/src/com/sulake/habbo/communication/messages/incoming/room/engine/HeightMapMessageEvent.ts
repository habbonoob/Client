import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HeightMapMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/HeightMapMessageParser';

export class HeightMapMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::HeightMapMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HeightMapMessageParser);
    }

    public getParser(): HeightMapMessageParser {
        return this._parser instanceof HeightMapMessageParser ? this._parser : null;
    }
}
