import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniVariableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniVariableMessageParser';

export class WiredFurniVariableEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniVariableEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniVariableMessageParser);
    }

    public getParser(): WiredFurniVariableMessageParser {
        return this._parser instanceof WiredFurniVariableMessageParser ? this._parser : null;
    }
}
