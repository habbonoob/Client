import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BadgePointLimitsParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgePointLimitsParser';

export class BadgePointLimitsEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::BadgePointLimitsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BadgePointLimitsParser);
    }

    public getParser(): BadgePointLimitsParser {
        return this._parser instanceof BadgePointLimitsParser ? this._parser : null;
    }
}
