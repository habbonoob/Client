import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RecyclerPrizesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/recycler/RecyclerPrizesMessageParser';

export class RecyclerPrizesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::RecyclerPrizesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RecyclerPrizesMessageParser);
    }

    public getParser(): RecyclerPrizesMessageParser {
        return this._parser instanceof RecyclerPrizesMessageParser ? this._parser : null;
    }
}
