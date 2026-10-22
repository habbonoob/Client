import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SelfDonationResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/misc/SelfDonationResultMessageParser';

export class SelfDonationResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.misc::SelfDonationResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SelfDonationResultMessageParser);
    }

    public getParser(): SelfDonationResultMessageParser {
        return this._parser instanceof SelfDonationResultMessageParser ? this._parser : null;
    }
}
