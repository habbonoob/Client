import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class TradeNftItem extends CollectibleBaseItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles.trading::TradeNftItem'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
        this._assetId = param1.readLong();
    }

    declare private _assetId: number;
    static { (this.prototype as any)._assetId = NaN; }

    public get assetId(): number {
        return this._assetId;
    }
}
