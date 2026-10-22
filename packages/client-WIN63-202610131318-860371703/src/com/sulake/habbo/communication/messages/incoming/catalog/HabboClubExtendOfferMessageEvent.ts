import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboClubExtendOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/HabboClubExtendOfferMessageParser';

export class HabboClubExtendOfferMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::HabboClubExtendOfferMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboClubExtendOfferMessageParser);
    }

    public getParser(): HabboClubExtendOfferMessageParser {
        return this._parser instanceof HabboClubExtendOfferMessageParser ? this._parser : null;
    }
}
