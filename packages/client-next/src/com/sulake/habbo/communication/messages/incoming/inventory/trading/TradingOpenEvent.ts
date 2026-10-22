import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingOpenParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingOpenParser';

export class TradingOpenEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingOpenEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public get userID(): number {
        return this.getParser().userID;
    }

    public get userCanTrade(): boolean {
        return this.getParser().userCanTrade;
    }

    public get otherUserID(): number {
        return this.getParser().otherUserID;
    }

    public get otherUserCanTrade(): boolean {
        return this.getParser().otherUserCanTrade;
    }

    public getParser(): TradingOpenParser {
        return this._parser instanceof TradingOpenParser ? this._parser : null;
    }
}
