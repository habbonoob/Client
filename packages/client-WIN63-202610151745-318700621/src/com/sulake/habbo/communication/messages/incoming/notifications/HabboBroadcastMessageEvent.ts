import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboBroadcastMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboBroadcastMessageParser';

export class HabboBroadcastMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::HabboBroadcastMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboBroadcastMessageParser);
    }

    public get messageText(): string {
        return (this._parser instanceof HabboBroadcastMessageParser ? this._parser : null).messageText;
    }

    public getParser(): HabboBroadcastMessageParser {
        return this._parser instanceof HabboBroadcastMessageParser ? this._parser : null;
    }
}
