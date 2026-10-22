import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { LatencyPingResponseMessageParser } from '@/com/sulake/habbo/communication/messages/parser/tracking/LatencyPingResponseMessageParser';

export class LatencyPingResponseMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.tracking::LatencyPingResponseMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, LatencyPingResponseMessageParser);
    }

    public getParser(): LatencyPingResponseMessageParser {
        return this._parser instanceof LatencyPingResponseMessageParser ? this._parser : null;
    }
}
