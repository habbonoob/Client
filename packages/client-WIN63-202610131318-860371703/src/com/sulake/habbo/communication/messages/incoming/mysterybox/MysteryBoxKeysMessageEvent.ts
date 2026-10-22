import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MysteryBoxKeysMessageParser } from '@/com/sulake/habbo/communication/messages/parser/mysterybox/MysteryBoxKeysMessageParser';

export class MysteryBoxKeysMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.mysterybox::MysteryBoxKeysMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MysteryBoxKeysMessageParser);
    }

    public getParser(): MysteryBoxKeysMessageParser {
        return this._parser instanceof MysteryBoxKeysMessageParser ? this._parser : null;
    }
}
