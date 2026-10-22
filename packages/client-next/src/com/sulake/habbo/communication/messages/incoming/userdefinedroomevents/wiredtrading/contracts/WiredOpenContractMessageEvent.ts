import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredOpenContractMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredOpenContractMessageParser';

export class WiredOpenContractMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.contracts::WiredOpenContractMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredOpenContractMessageParser);
    }

    public getParser(): WiredOpenContractMessageParser {
        return this._parser instanceof WiredOpenContractMessageParser ? this._parser : null;
    }
}
