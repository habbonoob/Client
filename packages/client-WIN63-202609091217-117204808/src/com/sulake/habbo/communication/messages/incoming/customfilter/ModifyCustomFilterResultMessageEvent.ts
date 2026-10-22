import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModifyCustomFilterResultMessageEventParser } from '@/com/sulake/habbo/communication/messages/parser/customfilter/ModifyCustomFilterResultMessageEventParser';

export class ModifyCustomFilterResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.customfilter::ModifyCustomFilterResultMessageEvent'); }

    public static readonly _SafeStr_7998: number = 0;
    public static readonly _SafeStr_7834: number = 1;
    public static readonly _SafeStr_8085: number = 3;

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModifyCustomFilterResultMessageEventParser);
    }

    public getParser(): ModifyCustomFilterResultMessageEventParser {
        return this._parser instanceof ModifyCustomFilterResultMessageEventParser ? this._parser : null;
    }
}
