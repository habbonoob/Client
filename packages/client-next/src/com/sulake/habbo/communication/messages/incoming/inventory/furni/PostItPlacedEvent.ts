import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PostItPlacedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/furni/PostItPlacedParser';

export class PostItPlacedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.furni::PostItPlacedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PostItPlacedParser);
    }

    public getParser(): PostItPlacedParser {
        return this._parser instanceof PostItPlacedParser ? this._parser : null;
    }
}
