import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TreasureHuntUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntUpdateMessageParser';

export class TreasureHuntUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.treasurehunt::TreasureHuntUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TreasureHuntUpdateMessageParser);
    }

    public getParser(): TreasureHuntUpdateMessageParser {
        return this._parser instanceof TreasureHuntUpdateMessageParser ? this._parser : null;
    }
}
