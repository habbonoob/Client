import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CancelMysteryBoxWaitMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/CancelMysteryBoxWaitMessageParser';

export class CancelMysteryBoxWaitMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.mysterybox::CancelMysteryBoxWaitMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CancelMysteryBoxWaitMessageParser);
    }

    public getParser(): CancelMysteryBoxWaitMessageParser {
        return this._parser instanceof CancelMysteryBoxWaitMessageParser ? this._parser : null;
    }
}
