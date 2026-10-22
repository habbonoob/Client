import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InfoFeedEnableMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/InfoFeedEnableMessageParser';

export class InfoFeedEnableMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::InfoFeedEnableMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InfoFeedEnableMessageParser);
    }

    public get enabled(): boolean {
        return (this._parser instanceof InfoFeedEnableMessageParser ? this._parser : null).enabled;
    }
}
