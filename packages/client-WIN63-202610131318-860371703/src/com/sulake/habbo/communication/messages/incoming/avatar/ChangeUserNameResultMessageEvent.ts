import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChangeUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/ChangeUserNameResultMessageParser';

export class ChangeUserNameResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.avatar::ChangeUserNameResultMessageEvent'); }

    public static _SafeStr_4064: number = 0;
    public static _SafeStr_6549: number = 1;
    public static _SafeStr_5378: number = 2;
    public static _SafeStr_5263: number = 3;
    public static _SafeStr_4985: number = 4;
    public static _SafeStr_5350: number = 5;
    public static _SafeStr_4702: number = 6;
    public static _SafeStr_5642: number = 7;

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChangeUserNameResultMessageParser);
    }

    public getParser(): ChangeUserNameResultMessageParser {
        return this._parser instanceof ChangeUserNameResultMessageParser ? this._parser : null;
    }
}
