import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredValidationErrorParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredValidationErrorParser';

export class WiredValidationErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredValidationErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredValidationErrorParser);
    }

    public getParser(): WiredValidationErrorParser {
        return this._parser instanceof WiredValidationErrorParser ? this._parser : null;
    }
}
