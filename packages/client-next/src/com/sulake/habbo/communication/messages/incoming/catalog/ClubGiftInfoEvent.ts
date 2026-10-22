import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ClubGiftInfoParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/ClubGiftInfoParser';

export class ClubGiftInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::ClubGiftInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ClubGiftInfoParser);
    }

    public getParser(): ClubGiftInfoParser {
        return this._parser instanceof ClubGiftInfoParser ? this._parser : null;
    }
}
