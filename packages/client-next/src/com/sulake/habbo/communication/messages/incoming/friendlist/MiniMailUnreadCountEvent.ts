import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MiniMailUnreadCountMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/MiniMailUnreadCountMessageParser';

export class MiniMailUnreadCountEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::MiniMailUnreadCountEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MiniMailUnreadCountMessageParser);
    }

    public getParser(): MiniMailUnreadCountMessageParser {
        return this._parser instanceof MiniMailUnreadCountMessageParser ? this._parser : null;
    }
}
