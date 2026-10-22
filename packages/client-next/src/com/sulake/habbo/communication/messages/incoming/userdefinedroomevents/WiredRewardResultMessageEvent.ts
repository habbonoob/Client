import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredRewardResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredRewardResultMessageParser';

export class WiredRewardResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredRewardResultMessageEvent'); }

    public static readonly _SafeStr_8775: number = 6;
    public static readonly _SafeStr_7930: number = 7;

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredRewardResultMessageParser);
    }

    public getParser(): WiredRewardResultMessageParser {
        return this._parser instanceof WiredRewardResultMessageParser ? this._parser : null;
    }
}
