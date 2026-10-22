import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniListAddOrUpdateParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListAddOrUpdateParser';

export class FurniListAddOrUpdateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniListAddOrUpdateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniListAddOrUpdateParser);
    }

    public getParser(): FurniListAddOrUpdateParser {
        return this._parser instanceof FurniListAddOrUpdateParser ? this._parser : null;
    }
}
