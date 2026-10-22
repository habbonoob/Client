import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HeightMapUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/HeightMapUpdateMessageParser';

export class HeightMapUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::HeightMapUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HeightMapUpdateMessageParser);
    }

    public getParser(): HeightMapUpdateMessageParser {
        return this._parser instanceof HeightMapUpdateMessageParser ? this._parser : null;
    }
}
