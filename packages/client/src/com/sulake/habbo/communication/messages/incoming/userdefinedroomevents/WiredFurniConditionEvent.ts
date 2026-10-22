import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniConditionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniConditionMessageParser';

export class WiredFurniConditionEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniConditionEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniConditionMessageParser);
    }

    public getParser(): WiredFurniConditionMessageParser {
        return this._parser instanceof WiredFurniConditionMessageParser ? this._parser : null;
    }
}
