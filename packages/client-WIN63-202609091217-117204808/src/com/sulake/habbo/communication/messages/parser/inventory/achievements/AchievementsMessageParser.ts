import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AchievementData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementData';

export class AchievementsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.achievements::AchievementsMessageParser'); }

    declare private _achievements: any[];

    declare private _defaultCategory: string;

    constructor() {
    }

    public flush(): boolean {
        this._achievements = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._achievements = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._achievements.push(new AchievementData(param1));
            _loc3_++;
        }
        this._defaultCategory = param1.readString();
        return true;
    }

    public get achievements(): any[] {
        return this._achievements;
    }

    public get defaultCategory(): string {
        return this._defaultCategory;
    }
}
