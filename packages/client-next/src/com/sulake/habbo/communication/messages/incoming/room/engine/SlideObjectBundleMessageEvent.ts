import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SlideObjectBundleMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/SlideObjectBundleMessageParser';

export class SlideObjectBundleMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::SlideObjectBundleMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SlideObjectBundleMessageParser);
    }

    public getParser(): SlideObjectBundleMessageParser {
        return this._parser instanceof SlideObjectBundleMessageParser ? this._parser : null;
    }
}
