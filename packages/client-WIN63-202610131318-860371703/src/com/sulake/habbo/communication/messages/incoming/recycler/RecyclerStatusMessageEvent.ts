import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RecyclerStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerStatusMessageParser';

export class RecyclerStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::RecyclerStatusMessageEvent'); }

    public static readonly _SafeStr_7684: number = 1;
    public static readonly _SafeStr_8591: number = 2;
    public static readonly _SafeStr_8431: number = 3;

    constructor(param1: (...args: any[]) => any) {
        super(param1, RecyclerStatusMessageParser);
    }

    public getParser(): RecyclerStatusMessageParser {
        return this._parser instanceof RecyclerStatusMessageParser ? this._parser : null;
    }
}
