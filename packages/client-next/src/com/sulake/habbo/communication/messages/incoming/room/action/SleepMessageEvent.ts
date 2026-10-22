import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SleepMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/SleepMessageParser';

export class SleepMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::SleepMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SleepMessageParser);
    }

    public getParser(): SleepMessageParser {
        return this._parser instanceof SleepMessageParser ? this._parser : null;
    }
}
