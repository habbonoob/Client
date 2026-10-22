import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HotelMergeNameChangeParser } from '@/com/sulake/habbo/communication/messages/parser/help/HotelMergeNameChangeParser';

export class HotelMergeNameChangeEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.help::HotelMergeNameChangeEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HotelMergeNameChangeParser);
    }

    public getParser(): HotelMergeNameChangeParser {
        return this._parser instanceof HotelMergeNameChangeParser ? this._parser : null;
    }
}
