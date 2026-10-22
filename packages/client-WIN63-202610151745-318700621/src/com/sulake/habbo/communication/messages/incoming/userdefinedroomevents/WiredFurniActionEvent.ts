import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniActionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniActionMessageParser';

export class WiredFurniActionEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniActionEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniActionMessageParser);
    }

    public getParser(): WiredFurniActionMessageParser {
        return this._parser instanceof WiredFurniActionMessageParser ? this._parser : null;
    }
}
