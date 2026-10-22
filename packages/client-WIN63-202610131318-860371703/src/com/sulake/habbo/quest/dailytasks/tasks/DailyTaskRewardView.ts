import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { DailyTaskReward } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskReward';
import type { DailyTasksController } from '@/com/sulake/habbo/quest/dailytasks/DailyTasksController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardDisplayWrapper } from '@/com/sulake/habbo/quest/dailytasks/tasks/RewardDisplayWrapper';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class DailyTaskRewardView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.dailytasks.tasks::DailyTaskRewardView'); }

    declare private _reward: DailyTaskReward;

    declare private _controller: DailyTasksController;

    declare private _window: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: DailyTaskReward, param2: DailyTasksController) {
        this._reward = param1;
        this._controller = param2;
        this._window = asGuarded(param2.view.rewardTemplate.clone(), isIWindowContainer);
        this.initializeUI();
    }

    private initializeUI(): void {
        this.rewardAmountBorder.visible = this._reward.amount > 1;
        this.rewardAmountText.caption = "x" + String(this.reward.amount);
        (asGuarded(this.rewardDisplayWidget.widget, isIProductIconWidget)).productInfo = new RewardDisplayWrapper(this._reward);
        if (!this.rewardAmountBorder.visible) {
            this.rewardDisplayWidget.y = this.rewardDisplayWidget.parent.height / 2 - this.rewardDisplayWidget.height / 2 | 0;
        }
    }

    public get reward(): DailyTaskReward {
        return this._reward;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._reward = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get rewardDisplayWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("reward_display_widget"), isIWidgetWindow);
    }

    public get rewardAmountBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("reward_amount_border"), isIBorderWindow);
    }

    public get rewardAmountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("reward_amount_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
