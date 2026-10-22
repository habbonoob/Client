import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ActivityPointsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/ActivityPointsMessageParser';

export class ActivityPointsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::ActivityPointsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ActivityPointsMessageParser);
    }

    public get points(): Map<any, any> {
        return (this._parser instanceof ActivityPointsMessageParser ? this._parser : null).points;
    }
}
