import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ShapeController } from '@/com/sulake/core/window/Classes.group';
import { RewardTrackProgressBarViewBase } from '@/com/sulake/habbo/quest/rewardtrack/view/progress/RewardTrackProgressBarViewBase';

export class RewardTrackMainProgressBarView extends RewardTrackProgressBarViewBase {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.progress::RewardTrackMainProgressBarView'); }

    declare private _SafeStr_14964: ShapeController;

    constructor(param1: IWindowContainer) {
        super(param1);
        this._SafeStr_14964 = asInstanceOf(param1.findChildByName("shape"), ShapeController);
    }

    public refreshByX(param1: number, param2: boolean): void {
        this.setRatio(param1 / this._container.width, param2);
    }

    protected override render(): void {
        super.render();
        if (this._SafeStr_4425.width >= this._container.width - 4) {
            this._SafeStr_14964.width = this._container.width;
        } else if (this._SafeStr_14964.width != this._SafeStr_4425.width + 4) {
            this._SafeStr_14964.width = this._SafeStr_4425.width + 4;
        }
    }
}
