import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BundleDiscountRuleset } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BundleDiscountRuleset';

export class BundleDiscountRulesetMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::BundleDiscountRulesetMessageParser'); }

    constructor() {
    }

    declare private _bundleDiscountRuleset: BundleDiscountRuleset;

    public get bundleDiscountRuleset(): BundleDiscountRuleset {
        return this._bundleDiscountRuleset;
    }

    public flush(): boolean {
        this._bundleDiscountRuleset = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._bundleDiscountRuleset = new BundleDiscountRuleset(param1);
        return true;
    }
}
