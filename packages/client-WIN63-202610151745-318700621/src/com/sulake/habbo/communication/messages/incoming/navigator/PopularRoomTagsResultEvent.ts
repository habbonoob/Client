import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PopularRoomTagsResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/PopularRoomTagsResultMessageParser';

export class PopularRoomTagsResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::PopularRoomTagsResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PopularRoomTagsResultMessageParser);
    }

    public getParser(): PopularRoomTagsResultMessageParser {
        return this._parser instanceof PopularRoomTagsResultMessageParser ? this._parser : null;
    }
}
