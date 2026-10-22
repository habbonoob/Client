import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuideSessionRequesterRoomMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/GuideSessionRequesterRoomMessageParser';

export class GuideSessionRequesterRoomMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::GuideSessionRequesterRoomMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuideSessionRequesterRoomMessageParser);
    }

    public getParser(): GuideSessionRequesterRoomMessageParser {
        return this._parser instanceof GuideSessionRequesterRoomMessageParser ? this._parser : null;
    }
}
