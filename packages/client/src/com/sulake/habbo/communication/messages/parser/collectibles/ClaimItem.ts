import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';

export class ClaimItem extends CollectibleBaseItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::ClaimItem'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
        this._setId = param1.readString();
        this._defaultCollectionName = param1.readString();
    }

    declare private _setId: string;

    declare private _defaultCollectionName: string;

    public get setId(): string {
        return this._setId;
    }

    public get defaultCollectionName(): string {
        return this._defaultCollectionName;
    }
}
