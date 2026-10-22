import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TreasureHuntFailMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntFailMessageParser';

export class TreasureHuntFailMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.treasurehunt::TreasureHuntFailMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TreasureHuntFailMessageParser);
    }

    public getParser(): TreasureHuntFailMessageParser {
        return this._parser instanceof TreasureHuntFailMessageParser ? this._parser : null;
    }
}
