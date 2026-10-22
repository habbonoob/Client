import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvailabilityStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/AvailabilityStatusMessageParser';

export class AvailabilityStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::AvailabilityStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvailabilityStatusMessageParser);
    }

    public getParser(): AvailabilityStatusMessageParser {
        return this._parser instanceof AvailabilityStatusMessageParser ? this._parser : null;
    }
}
