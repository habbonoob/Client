import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GetForumsListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/GetForumsListMessageParser';

export class ForumsListMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::ForumsListMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GetForumsListMessageParser);
    }

    public getParser(): GetForumsListMessageParser {
        return castTo(this._parser, GetForumsListMessageParser);
    }
}
