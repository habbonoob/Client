import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AchievementLevelUpData } from '@/com/sulake/habbo/communication/messages/incoming/notifications/AchievementLevelUpData';

export class HabboAchievementNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::HabboAchievementNotificationMessageParser'); }

    constructor() {
    }

    declare private _data: AchievementLevelUpData;

    public get data(): AchievementLevelUpData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._data = new AchievementLevelUpData(param1);
        return true;
    }
}
