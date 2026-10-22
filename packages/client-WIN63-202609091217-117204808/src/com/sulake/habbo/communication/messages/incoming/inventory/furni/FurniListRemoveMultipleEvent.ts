import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniListRemoveMultipleParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListRemoveMultipleParser';

export class FurniListRemoveMultipleEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniListRemoveMultipleEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniListRemoveMultipleParser);
    }

    public getParser(): FurniListRemoveMultipleParser {
        return this._parser instanceof FurniListRemoveMultipleParser ? this._parser : null;
    }
}
