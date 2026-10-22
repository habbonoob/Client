import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniListRemoveParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListRemoveParser';

export class FurniListRemoveEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniListRemoveEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniListRemoveParser);
    }

    public getParser(): FurniListRemoveParser {
        return this._parser instanceof FurniListRemoveParser ? this._parser : null;
    }
}
