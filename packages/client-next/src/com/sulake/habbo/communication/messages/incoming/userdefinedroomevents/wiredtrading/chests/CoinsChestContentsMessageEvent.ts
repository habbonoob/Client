import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CoinsChestContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/CoinsChestContentsMessageParser';

export class CoinsChestContentsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.chests::CoinsChestContentsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CoinsChestContentsMessageParser);
    }

    public getParser(): CoinsChestContentsMessageParser {
        return this._parser instanceof CoinsChestContentsMessageParser ? this._parser : null;
    }
}
