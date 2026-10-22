import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TryPhoneNumberResultParser } from '@/com/sulake/habbo/communication/messages/parser/gifts/TryPhoneNumberResultParser';

export class TryPhoneNumberResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.gifts::TryPhoneNumberResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TryPhoneNumberResultParser);
    }

    public getParser(): TryPhoneNumberResultParser {
        return this._parser instanceof TryPhoneNumberResultParser ? this._parser : null;
    }
}
