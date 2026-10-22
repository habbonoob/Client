import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboActivityPointNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboActivityPointNotificationMessageParser';

export class HabboActivityPointNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::HabboActivityPointNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboActivityPointNotificationMessageParser);
    }

    public get amount(): number {
        return (this._parser instanceof HabboActivityPointNotificationMessageParser ? this._parser : null).amount;
    }

    public get change(): number {
        return (this._parser instanceof HabboActivityPointNotificationMessageParser ? this._parser : null).change;
    }

    public get type(): number {
        return (this._parser instanceof HabboActivityPointNotificationMessageParser ? this._parser : null).type;
    }
}
