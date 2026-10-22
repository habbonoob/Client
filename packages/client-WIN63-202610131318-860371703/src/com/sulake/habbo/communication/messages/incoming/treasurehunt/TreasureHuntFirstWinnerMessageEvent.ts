import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TreasureHuntFirstWinnerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntFirstWinnerMessageParser';

export class TreasureHuntFirstWinnerMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.treasurehunt::TreasureHuntFirstWinnerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TreasureHuntFirstWinnerMessageParser);
    }

    public getParser(): TreasureHuntFirstWinnerMessageParser {
        return this._parser instanceof TreasureHuntFirstWinnerMessageParser ? this._parser : null;
    }
}
