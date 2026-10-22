import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniListParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/FurniListParser';

export class FurniListEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::FurniListEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniListParser);
    }

    public getParser(): FurniListParser {
        return this._parser instanceof FurniListParser ? this._parser : null;
    }
}
