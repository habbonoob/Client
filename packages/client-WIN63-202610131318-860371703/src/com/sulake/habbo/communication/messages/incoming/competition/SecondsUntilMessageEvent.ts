import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SecondsUntilMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/SecondsUntilMessageParser';

export class SecondsUntilMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::SecondsUntilMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SecondsUntilMessageParser);
    }

    public getParser(): SecondsUntilMessageParser {
        return this._parser instanceof SecondsUntilMessageParser ? this._parser : null;
    }
}
