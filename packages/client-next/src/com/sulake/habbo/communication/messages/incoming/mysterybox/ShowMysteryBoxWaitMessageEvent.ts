import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ShowMysteryBoxWaitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/ShowMysteryBoxWaitMessageParser';

export class ShowMysteryBoxWaitMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.mysterybox::ShowMysteryBoxWaitMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ShowMysteryBoxWaitMessageParser);
    }

    public getParser(): ShowMysteryBoxWaitMessageParser {
        return this._parser instanceof ShowMysteryBoxWaitMessageParser ? this._parser : null;
    }
}
