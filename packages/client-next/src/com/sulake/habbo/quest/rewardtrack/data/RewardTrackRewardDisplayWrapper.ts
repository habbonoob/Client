import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class RewardTrackRewardDisplayWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.data::RewardTrackRewardDisplayWrapper'); }

    declare private _SafeStr_14371: RewardTrackPrize;

    constructor(param1: RewardTrackPrize) {
        this._SafeStr_14371 = param1;
    }

    public get productTypeId(): number {
        return this._SafeStr_14371.productItemTypeId;
    }

    public get itemTypeId(): string {
        return this._SafeStr_14371.rewardTypeId;
    }

    public get extraData(): string {
        return "";
    }

    public get petFigureString(): string {
        return this._SafeStr_14371.extraParams;
    }

    public get botFigureString(): string {
        return this._SafeStr_14371.extraParams;
    }

    public get figureSetIds(): number[] {
        return [];
    }
}
