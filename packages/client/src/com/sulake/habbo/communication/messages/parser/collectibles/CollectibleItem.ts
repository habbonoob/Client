import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class CollectibleItem extends CollectibleBaseItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleItem'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    declare private _amount: number;

    public get amount(): number {
        return this._amount;
    }

    public override readAdditionalParams(param1: IMessageDataWrapper): void {
        this._amount = param1.readInteger();
    }

    protected override initInstanceFields(): void {
        this._amount = 0;
        super.initInstanceFields();
    }
}
