import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';

export class AchievementMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.achievements::AchievementMessageParser'); }

    constructor() {
    }

    declare private _achievement: AchievementData;

    public get achievement(): AchievementData {
        return this._achievement;
    }

    public flush(): boolean {
        this._achievement = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._achievement = new AchievementData(param1);
        return true;
    }
}
