import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TryVerificationCodeResultParser } from '@/com/sulake/habbo/communication/messages/parser/gifts/TryVerificationCodeResultParser';

export class TryVerificationCodeResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.gifts::TryVerificationCodeResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TryVerificationCodeResultParser);
    }

    public getParser(): TryVerificationCodeResultParser {
        return this._parser instanceof TryVerificationCodeResultParser ? this._parser : null;
    }
}
