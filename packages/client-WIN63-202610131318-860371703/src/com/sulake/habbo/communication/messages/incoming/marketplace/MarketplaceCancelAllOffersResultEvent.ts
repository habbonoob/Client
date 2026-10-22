import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6045 } from '@/com/sulake/habbo/communication/messages/parser/marketplace/_SafeCls_6045';

export class MarketplaceCancelAllOffersResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceCancelAllOffersResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6045);
    }

    public getParser(): _SafeCls_6045 {
        return this._parser instanceof _SafeCls_6045 ? this._parser : null;
    }
}
