import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomAdPurchaseInfoEventParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/RoomAdPurchaseInfoEventParser';

export class RoomAdPurchaseInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::RoomAdPurchaseInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomAdPurchaseInfoEventParser);
    }

    public getParser(): RoomAdPurchaseInfoEventParser {
        return this._parser instanceof RoomAdPurchaseInfoEventParser ? this._parser : null;
    }
}
