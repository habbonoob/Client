import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingCloseParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingCloseParser';

export class TradingCloseEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingCloseEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public get userID(): number {
        return this.getParser().userID;
    }

    public getParser(): TradingCloseParser {
        return this._parser instanceof TradingCloseParser ? this._parser : null;
    }
}
