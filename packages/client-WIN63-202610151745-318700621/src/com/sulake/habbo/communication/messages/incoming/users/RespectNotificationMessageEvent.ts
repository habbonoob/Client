import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RespectNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/RespectNotificationMessageParser';

export class RespectNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::RespectNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RespectNotificationMessageParser);
    }

    public get userId(): number {
        return (this._parser instanceof RespectNotificationMessageParser ? this._parser : null).userId;
    }

    public get respectTotal(): number {
        return (this._parser instanceof RespectNotificationMessageParser ? this._parser : null).respectTotal;
    }
}
