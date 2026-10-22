import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';

export class BotReceivedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.bots::BotReceivedMessageParser'); }

    constructor() {
    }

    declare private _boughtAsGift: boolean;
    static { (this.prototype as any)._boughtAsGift = false; }

    declare private _item: BotData;

    public get boughtAsGift(): boolean {
        return this._boughtAsGift;
    }

    public get item(): BotData {
        return this._item;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._boughtAsGift = param1.readBoolean();
        this._item = new BotData(param1);
        return true;
    }
}
