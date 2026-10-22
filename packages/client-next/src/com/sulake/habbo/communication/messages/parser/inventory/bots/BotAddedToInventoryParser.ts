import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';

export class BotAddedToInventoryParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.bots::BotAddedToInventoryParser'); }

    declare private _item: BotData;

    declare private _SafeStr_6175: boolean;
    static { (this.prototype as any)._SafeStr_6175 = false; }

    constructor() {
    }

    public flush(): boolean {
        this._item = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._item = new BotData(param1);
        this._SafeStr_6175 = param1.readBoolean();
        return true;
    }

    public get item(): BotData {
        return this._item;
    }

    public openInventory(): boolean {
        return this._SafeStr_6175;
    }
}
