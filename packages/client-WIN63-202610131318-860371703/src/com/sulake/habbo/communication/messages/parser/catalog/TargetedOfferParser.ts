import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TargetedOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/TargetedOfferData';

export class TargetedOfferParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::TargetedOfferParser'); }

    declare private _data: TargetedOfferData;

    constructor() {
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new TargetedOfferData().parse(param1);
        return true;
    }

    public get data(): TargetedOfferData {
        return this._data;
    }
}
