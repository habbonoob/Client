import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TargetedOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/TargetedOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { RemainingTimeFormatter } from '@/com/sulake/habbo/catalog/targetedoffers/util/RemainingTimeFormatter';

export class OfferView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::OfferView'); }

    declare protected _window: IWindowContainer;

    declare protected _controller: OfferController;

    declare protected _offer: TargetedOffer;

    declare protected _SafeStr_2342: Timer;

    declare protected _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare protected _SafeStr_3113: string;

    constructor(param1: OfferController, param2: TargetedOffer) {
        this._controller = param1;
        this._offer = param2;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_2342 != null) {
            this._SafeStr_2342.stop();
            this._SafeStr_2342 = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    protected startUpdateTimer(): void {
        this._SafeStr_2342 = new Timer(1000);
        this._SafeStr_2342.addEventListener("timer", this.onUpdateTimer);
        this._SafeStr_2342.start();
        this.updateRemainingTime();
    }

    protected onUpdateTimer = (param1: TimerEvent): void => {
        this.updateRemainingTime();
    };

    protected updateRemainingTime(): void {
        this.setTimeLeft(RemainingTimeFormatter.getStringFromSeconds(this._controller.catalog.localization, this._offer.getSecondsRemaining() >>> 0));
        if (this._offer.getSecondsRemaining() == 0) {
            this._controller.destroyView();
        }
    }

    protected setTimeLeft(param1: string): void {
        let _loc2_: ITextWindow = castGuarded(this._window.findChildByName("txt_time_left"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (!_loc2_) {
            return;
        }
        _loc2_.text = this._SafeStr_3113 != "" ? this._SafeStr_3113.replace("%timeleft%", param1) : param1;
    }

    protected getLocalization(param1: string, param2: string = null): string {
        let _loc3_: string = this._controller.catalog.localization.getLocalization(param1, param2 || param1);
        if (!_loc3_) {
            return null;
        }
        if (this._offer) {
            _loc3_ = _loc3_.replace("%itemsleft%", String(this._offer.purchaseLimit));
        }
        return _loc3_;
    }

    get [IDisposable](): true {
        return true;
    }
}
