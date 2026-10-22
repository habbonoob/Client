import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvailabilityTimeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/AvailabilityTimeMessageParser';

export class AvailabilityTimeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::AvailabilityTimeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvailabilityTimeMessageParser);
    }

    public getParser(): AvailabilityTimeMessageParser {
        return this._parser instanceof AvailabilityTimeMessageParser ? this._parser : null;
    }
}
