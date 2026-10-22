import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CollectiblesProductItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectiblesProductItem';

export class CollectableMintableItemTypesMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectableMintableItemTypesMessageEventParser'); }

    constructor() {
    }

    private _collectibleProductItems: CollectiblesProductItem[] = new Array<CollectiblesProductItem>(0).fill(null);

    public get collectibleProductItems(): CollectiblesProductItem[] {
        return this._collectibleProductItems;
    }

    public flush(): boolean {
        this._collectibleProductItems = new Array<CollectiblesProductItem>(0).fill(null);
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._collectibleProductItems.push(new CollectiblesProductItem(param1));
            _loc3_++;
        }
        return true;
    }

    public hasData(): boolean {
        return this._collectibleProductItems.length > 0;
    }
}
