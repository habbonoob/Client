import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingAcceptParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingAcceptParser';

export class TradingAcceptEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingAcceptEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public get userID(): number {
        return this.getParser().userID;
    }

    public get userAccepts(): boolean {
        return this.getParser().userAccepts;
    }

    public getParser(): TradingAcceptParser {
        return this._parser instanceof TradingAcceptParser ? this._parser : null;
    }
}
