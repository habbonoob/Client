import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BadgesParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgesParser';

export class BadgesEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::BadgesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BadgesParser);
    }

    public getParser(): BadgesParser {
        return this._parser instanceof BadgesParser ? this._parser : null;
    }
}
