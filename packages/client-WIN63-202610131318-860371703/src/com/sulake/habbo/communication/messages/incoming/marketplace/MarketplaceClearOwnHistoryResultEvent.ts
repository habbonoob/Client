import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6044 } from '@/com/sulake/habbo/communication/messages/parser/marketplace/_SafeCls_6044';

export class MarketplaceClearOwnHistoryResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.marketplace::MarketplaceClearOwnHistoryResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6044);
    }

    public getParser(): _SafeCls_6044 {
        return this._parser instanceof _SafeCls_6044 ? this._parser : null;
    }
}
