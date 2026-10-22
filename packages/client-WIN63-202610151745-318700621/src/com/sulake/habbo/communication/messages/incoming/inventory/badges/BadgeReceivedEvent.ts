import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BadgeReceivedParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgeReceivedParser';

export class BadgeReceivedEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::BadgeReceivedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BadgeReceivedParser);
    }

    public getParser(): BadgeReceivedParser {
        return this._parser instanceof BadgeReceivedParser ? this._parser : null;
    }
}
