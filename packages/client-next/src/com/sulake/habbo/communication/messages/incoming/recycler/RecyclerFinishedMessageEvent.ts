import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RecyclerFinishedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerFinishedMessageParser';

export class RecyclerFinishedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::RecyclerFinishedMessageEvent'); }

    public static readonly _SafeStr_8256: number = 1;
    public static readonly _SafeStr_8389: number = 2;

    constructor(param1: (...args: any[]) => any) {
        super(param1, RecyclerFinishedMessageParser);
    }

    public getParser(): RecyclerFinishedMessageParser {
        return this._parser instanceof RecyclerFinishedMessageParser ? this._parser : null;
    }
}
