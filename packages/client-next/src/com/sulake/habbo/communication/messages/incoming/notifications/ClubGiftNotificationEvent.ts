import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ClubGiftNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/ClubGiftNotificationParser';

export class ClubGiftNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::ClubGiftNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ClubGiftNotificationParser);
    }

    public getParser(): ClubGiftNotificationParser {
        return this._parser instanceof ClubGiftNotificationParser ? this._parser : null;
    }
}
