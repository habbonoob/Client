import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ClubGiftSelectedParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ClubGiftSelectedParser';

export class ClubGiftSelectedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubGiftSelectedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ClubGiftSelectedParser);
    }

    public getParser(): ClubGiftSelectedParser {
        return this._parser instanceof ClubGiftSelectedParser ? this._parser : null;
    }
}
