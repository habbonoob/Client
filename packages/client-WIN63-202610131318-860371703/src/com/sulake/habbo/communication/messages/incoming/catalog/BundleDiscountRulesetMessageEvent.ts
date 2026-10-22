import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BundleDiscountRulesetMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BundleDiscountRulesetMessageParser';

export class BundleDiscountRulesetMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::BundleDiscountRulesetMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BundleDiscountRulesetMessageParser);
    }

    public getParser(): BundleDiscountRulesetMessageParser {
        return this._parser instanceof BundleDiscountRulesetMessageParser ? this._parser : null;
    }
}
