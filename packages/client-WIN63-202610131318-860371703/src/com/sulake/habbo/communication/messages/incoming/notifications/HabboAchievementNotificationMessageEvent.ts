import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboAchievementNotificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/HabboAchievementNotificationMessageParser';

export class HabboAchievementNotificationMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::HabboAchievementNotificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboAchievementNotificationMessageParser);
    }

    public getParser(): HabboAchievementNotificationMessageParser {
        return this._parser instanceof HabboAchievementNotificationMessageParser ? this._parser : null;
    }
}
