import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import { RewardTrackProgressBarViewBase } from '@/com/sulake/habbo/quest/rewardtrack/view/progress/RewardTrackProgressBarViewBase';

export class RewardTrackTaskProgressBarView extends RewardTrackProgressBarViewBase {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.progress::RewardTrackTaskProgressBarView'); }

    private _SafeStr_14961: number = -1;

    constructor(param1: IWindowContainer) {
        super(param1, true);
    }

    public refreshRatio(param1: number, param2: boolean, param3: boolean = false): void {
        if (param3 && param2) {
            this._SafeStr_14961 = param1;
            this.setRatio(1, true);
            return;
        }
        this._SafeStr_14961 = -1;
        this.setRatio(param1, param2);
    }

    public refreshTask(param1: RewardTrackTask, param2: boolean, param3: number = -1): void {
        let _loc4_: boolean = param3 != -1 && param3 != param1.activeLevelIndex;
        this.refreshRatio(param1.progressRatioFor(param1.activeLevel), param2, _loc4_);
    }

    public override update(param1: number): void {
        let _loc2_: number = NaN;
        super.update(param1);
        if (this._SafeStr_14961 >= 0 && !this.isUpdating) {
            _loc2_ = this._SafeStr_14961;
            this._SafeStr_14961 = -1;
            this.setRatio(_loc2_, false);
        }
    }
}
