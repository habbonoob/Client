import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboClubOffersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/HabboClubOffersMessageParser';

export class HabboClubOffersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::HabboClubOffersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboClubOffersMessageParser);
    }

    public getParser(): HabboClubOffersMessageParser {
        return this._parser instanceof HabboClubOffersMessageParser ? this._parser : null;
    }
}
