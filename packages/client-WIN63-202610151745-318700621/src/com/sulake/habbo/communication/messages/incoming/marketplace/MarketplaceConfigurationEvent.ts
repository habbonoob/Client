import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MarketplaceConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/marketplace/MarketplaceConfigurationParser';

export class MarketplaceConfigurationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceConfigurationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MarketplaceConfigurationParser);
    }

    public getParser(): MarketplaceConfigurationParser {
        return this._parser instanceof MarketplaceConfigurationParser ? this._parser : null;
    }
}
