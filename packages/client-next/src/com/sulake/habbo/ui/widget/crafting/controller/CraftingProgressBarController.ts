import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class CraftingProgressBarController {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingProgressBarController'); }

    declare private _widget: CraftingWidget;

    declare private _SafeStr_4453: Timer;

    declare private _SafeStr_4425: number;
    static { (this.prototype as any)._SafeStr_4425 = NaN; }

    constructor(param1: CraftingWidget) {
        this._widget = param1;
        this._SafeStr_4453 = new Timer(70);
        this._SafeStr_4453.addEventListener("timer", this.onProgressTimerEvent);
    }

    public dispose(): void {
        this._widget = null;
    }

    private setProgress(param1: number): void {
        let _loc3_: IWindow = null;
        let _loc2_: IWindow = this.container.findChildByName("btn_cancel");
        let _loc4_: IWindow = this.container ? this.container.findChildByName("bar") : null;
        if (_loc4_) {
            _loc3_ = _loc4_.parent;
            _loc4_.width = _loc2_.width * param1 | 0;
        }
    }

    private onProgressTimerEvent = (param1: TimerEvent): void => {
        this.setProgress(this._SafeStr_4425 = this._SafeStr_4425 + 0.02);
        if (this._SafeStr_4425 >= 1) {
            this.hide();
            this._widget.infoCtrl.onProgressBarComplete();
        }
    };

    public hide(): void {
        if (this._SafeStr_4453) {
            this._SafeStr_4453.stop();
        }
        if (this.container) {
            this.container.visible = false;
            this.container.procedure = null;
        }
    }

    public show(): void {
        this._SafeStr_4453.start();
        this._SafeStr_4425 = 0;
        if (this.container) {
            this.container.visible = true;
            this.container.procedure = this.onTriggered;
        }
    }

    private onTriggered = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_DOWN") {
            return;
        }
        this._widget.infoCtrl.cancelCrafting();
    };

    private get container(): IWindowContainer {
        if (!this._widget || !this._widget.window) {
            return null;
        }
        return asGuarded(this._widget.window.findChildByName("progress_bar"), isIWindowContainer);
    }
}
