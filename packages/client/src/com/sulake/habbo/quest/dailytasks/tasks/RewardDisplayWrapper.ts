import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DailyTaskReward } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskReward';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class RewardDisplayWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks.tasks::RewardDisplayWrapper'); }

    constructor(param1: DailyTaskReward) {
        this._SafeStr_5316 = param1;
    }

    declare private _SafeStr_5316: DailyTaskReward;

    public get productTypeId(): number {
        return this._SafeStr_5316.productItemTypeId;
    }

    public get itemTypeId(): string {
        return this._SafeStr_5316.rewardTypeId;
    }

    public get extraData(): string {
        return "";
    }

    public get petFigureString(): string {
        return this._SafeStr_5316.extraParams;
    }

    public get figureSetIds(): number[] {
        return [];
    }
}
