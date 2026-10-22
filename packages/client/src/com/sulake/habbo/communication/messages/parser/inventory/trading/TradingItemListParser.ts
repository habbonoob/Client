import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ItemDataStructure } from '@/com/sulake/habbo/communication/messages/incoming/inventory/trading/ItemDataStructure';

export class TradingItemListParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradingItemListParser'); }

    constructor() {
    }

    declare private _firstUserID: number;
    static { (this.prototype as any)._firstUserID = 0; }

    declare private _firstUserItemArray: any[];

    declare private _firstUserNumItems: number;
    static { (this.prototype as any)._firstUserNumItems = 0; }

    declare private _firstUserNumCredits: number;
    static { (this.prototype as any)._firstUserNumCredits = 0; }

    declare private _secondUserID: number;
    static { (this.prototype as any)._secondUserID = 0; }

    declare private _secondUserItemArray: any[];

    declare private _secondUserNumItems: number;
    static { (this.prototype as any)._secondUserNumItems = 0; }

    declare private _secondUserNumCredits: number;
    static { (this.prototype as any)._secondUserNumCredits = 0; }

    public get firstUserID(): number {
        return this._firstUserID;
    }

    public get firstUserItemArray(): any[] {
        return this._firstUserItemArray;
    }

    public get firstUserNumItems(): number {
        return this._firstUserNumItems;
    }

    public get firstUserNumCredits(): number {
        return this._firstUserNumCredits;
    }

    public get secondUserID(): number {
        return this._secondUserID;
    }

    public get secondUserItemArray(): any[] {
        return this._secondUserItemArray;
    }

    public get secondUserNumItems(): number {
        return this._secondUserNumItems;
    }

    public get secondUserNumCredits(): number {
        return this._secondUserNumCredits;
    }

    public flush(): boolean {
        this._firstUserID = -1;
        this._firstUserItemArray = null;
        this._firstUserNumItems = 0;
        this._firstUserNumCredits = 0;
        this._secondUserID = -1;
        this._secondUserItemArray = null;
        this._secondUserNumItems = 0;
        this._secondUserNumCredits = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._firstUserID = param1.readInteger();
        this._firstUserItemArray = [];
        if (!this.parseItemData(param1, this._firstUserItemArray)) {
            return false;
        }
        this._firstUserNumItems = param1.readInteger();
        this._firstUserNumCredits = param1.readInteger();
        this._secondUserID = param1.readInteger();
        this._secondUserItemArray = [];
        if (!this.parseItemData(param1, this._secondUserItemArray)) {
            return false;
        }
        this._secondUserNumItems = param1.readInteger();
        this._secondUserNumCredits = param1.readInteger();
        return true;
    }

    private parseItemData(param1: IMessageDataWrapper, param2: any[]): boolean {
        let _loc3_: number = 0;
        _loc3_ = param1.readInteger();
        while (_loc3_ > 0) {
            param2.push(new ItemDataStructure(param1));
            _loc3_--;
        }
        return true;
    }
}
