import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AchievementResolutionData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/achievements/AchievementResolutionData';

export class AchievementResolutionsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.lobby::AchievementResolutionsMessageParser'); }

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    declare private _achievements: AchievementResolutionData[];

    declare private _endTime: number;
    static { (this.prototype as any)._endTime = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._stuffId = -1;
        for (const _loc1_ of this._achievements ?? []) {
            _loc1_.dispose();
        }
        this._achievements = new Array<AchievementResolutionData>(0).fill(null);
        this._endTime = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._stuffId = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._achievements.push(new AchievementResolutionData(param1));
            _loc2_++;
        }
        this._endTime = param1.readInteger();
        return true;
    }

    public get stuffId(): number {
        return this._stuffId;
    }

    public get achievements(): AchievementResolutionData[] {
        return this._achievements;
    }

    public get endTime(): number {
        return this._endTime;
    }
}
