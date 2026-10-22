import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CustomUserNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/CustomUserNotificationMessageParser';

export class CustomUserNotificationMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::CustomUserNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CustomUserNotificationMessageParser);
    }

    public getParser(): CustomUserNotificationMessageParser {
        return asInstanceOf(this.parser, CustomUserNotificationMessageParser);
    }
}
