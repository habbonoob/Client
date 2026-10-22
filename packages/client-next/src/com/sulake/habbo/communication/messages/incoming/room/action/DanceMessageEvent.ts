import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DanceMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/DanceMessageParser';

export class DanceMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::DanceMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DanceMessageParser);
    }

    public getParser(): DanceMessageParser {
        return this._parser instanceof DanceMessageParser ? this._parser : null;
    }
}
