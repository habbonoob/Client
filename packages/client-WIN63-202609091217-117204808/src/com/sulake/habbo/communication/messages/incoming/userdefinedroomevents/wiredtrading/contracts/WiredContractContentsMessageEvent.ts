import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';

export class WiredContractContentsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.contracts::WiredContractContentsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredContractContentsMessageParser);
    }

    public getParser(): WiredContractContentsMessageParser {
        return this._parser instanceof WiredContractContentsMessageParser ? this._parser : null;
    }
}
