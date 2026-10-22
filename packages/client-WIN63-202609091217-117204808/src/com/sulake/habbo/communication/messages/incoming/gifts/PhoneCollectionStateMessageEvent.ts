import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PhoneCollectionStateParser } from '@/com/sulake/habbo/communication/messages/parser/gifts/PhoneCollectionStateParser';

export class PhoneCollectionStateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.gifts::PhoneCollectionStateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PhoneCollectionStateParser);
    }

    public getParser(): PhoneCollectionStateParser {
        return this._parser instanceof PhoneCollectionStateParser ? this._parser : null;
    }
}
