import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CurrentTimingCodeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/CurrentTimingCodeMessageParser';

export class CurrentTimingCodeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::CurrentTimingCodeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CurrentTimingCodeMessageParser);
    }

    public getParser(): CurrentTimingCodeMessageParser {
        return this._parser instanceof CurrentTimingCodeMessageParser ? this._parser : null;
    }
}
