import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniSelectorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniSelectorMessageParser';

export class WiredFurniSelectorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniSelectorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniSelectorMessageParser);
    }

    public getParser(): WiredFurniSelectorMessageParser {
        return this._parser instanceof WiredFurniSelectorMessageParser ? this._parser : null;
    }
}
