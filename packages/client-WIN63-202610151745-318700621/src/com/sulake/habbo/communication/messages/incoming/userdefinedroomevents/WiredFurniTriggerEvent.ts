import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniTriggerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniTriggerMessageParser';

export class WiredFurniTriggerEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniTriggerEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniTriggerMessageParser);
    }

    public getParser(): WiredFurniTriggerMessageParser {
        return this._parser instanceof WiredFurniTriggerMessageParser ? this._parser : null;
    }
}
