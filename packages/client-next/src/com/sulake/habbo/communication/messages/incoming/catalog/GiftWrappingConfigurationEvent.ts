import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GiftWrappingConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/GiftWrappingConfigurationParser';

export class GiftWrappingConfigurationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::GiftWrappingConfigurationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GiftWrappingConfigurationParser);
    }

    public getParser(): GiftWrappingConfigurationParser {
        return this._parser instanceof GiftWrappingConfigurationParser ? this._parser : null;
    }
}
