import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TradingItemListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/trading/TradingItemListParser';

export class TradingItemListEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.trading::TradingItemListEvent'); }

    constructor(param1: (...args: any[]) => any, param2: any) {
        super(param1, param2);
    }

    public get firstUserID(): number {
        return this.getParser().firstUserID;
    }

    public get secondUserID(): number {
        return this.getParser().secondUserID;
    }

    public get firstUserNumItems(): number {
        return this.getParser().firstUserNumItems;
    }

    public get secondUserNumItems(): number {
        return this.getParser().secondUserNumItems;
    }

    public get firstUserNumCredits(): number {
        return this.getParser().firstUserNumCredits;
    }

    public get secondUserNumCredits(): number {
        return this.getParser().secondUserNumCredits;
    }

    public get firstUserItemArray(): any[] {
        return this.getParser().firstUserItemArray;
    }

    public get secondUserItemArray(): any[] {
        return this.getParser().secondUserItemArray;
    }

    public getParser(): TradingItemListParser {
        return this._parser instanceof TradingItemListParser ? this._parser : null;
    }
}
