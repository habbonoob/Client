import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TradingItemListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingItemListParser';

export class WiredTradeItemsUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade::WiredTradeItemsUpdateMessageParser'); }

    constructor() {
    }

    private _tradingItems: TradingItemListParser = new TradingItemListParser();

    declare private _extra: number;
    static { (this.prototype as any)._extra = 0; }

    declare private _canAccept: boolean;
    static { (this.prototype as any)._canAccept = false; }

    public get canAccept(): boolean {
        return this._canAccept;
    }

    public get tradingItems(): TradingItemListParser {
        return this._tradingItems;
    }

    public get extra(): number {
        return this._extra;
    }

    public flush(): boolean {
        this._tradingItems.flush();
        this._canAccept = false;
        this._extra = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._tradingItems.parse(param1);
        this._canAccept = param1.readBoolean();
        this._extra = param1.readInteger();
        return true;
    }
}
