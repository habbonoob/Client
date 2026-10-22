import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OpenChestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/OpenChestMessageParser';

export class OpenChestMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.chests::OpenChestMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OpenChestMessageParser);
    }

    public getParser(): OpenChestMessageParser {
        return this._parser instanceof OpenChestMessageParser ? this._parser : null;
    }
}
