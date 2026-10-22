import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniListInvalidateParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListInvalidateParser';

export class FurniListInvalidateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniListInvalidateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniListInvalidateParser);
    }

    public getParser(): FurniListInvalidateParser {
        return this._parser instanceof FurniListInvalidateParser ? this._parser : null;
    }
}
