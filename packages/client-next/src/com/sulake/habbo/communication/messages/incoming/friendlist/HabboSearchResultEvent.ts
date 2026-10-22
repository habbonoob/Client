import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboSearchResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/HabboSearchResultMessageParser';

export class HabboSearchResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::HabboSearchResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboSearchResultMessageParser);
    }

    public getParser(): HabboSearchResultMessageParser {
        return this._parser instanceof HabboSearchResultMessageParser ? this._parser : null;
    }
}
