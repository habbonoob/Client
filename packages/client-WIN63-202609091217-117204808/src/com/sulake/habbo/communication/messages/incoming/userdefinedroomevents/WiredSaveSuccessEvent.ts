import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredSaveSuccessParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredSaveSuccessParser';

export class WiredSaveSuccessEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredSaveSuccessEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredSaveSuccessParser);
    }

    public getParser(): WiredSaveSuccessParser {
        return this._parser instanceof WiredSaveSuccessParser ? this._parser : null;
    }
}
