import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredContractUpdateResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractUpdateResultMessageParser';

export class WiredContractUpdateResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.contracts::WiredContractUpdateResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredContractUpdateResultMessageParser);
    }

    public getParser(): WiredContractUpdateResultMessageParser {
        return this._parser instanceof WiredContractUpdateResultMessageParser ? this._parser : null;
    }
}
