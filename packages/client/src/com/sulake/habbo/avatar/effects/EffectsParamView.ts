import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { EffectsModel } from '@/com/sulake/habbo/avatar/effects/EffectsModel';
import type { IHabboAvatarEditorAvatarEffect } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorAvatarEffect';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class EffectsParamView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.avatar.effects::EffectsParamView'); }

    constructor(param1: EffectsModel, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._SafeStr_2134 = param1;
        this._windowManager = param2;
        this._container = param1.controller.view.effectsParamViewContainer;
        this._catalogPageName = param1.controller.manager.getProperty("avatareditor.effects.buy.button.catalog.page.name");
        this._SafeStr_3158 = new Timer(1000);
        this._SafeStr_3158.addEventListener("timer", this.onSecondsTimer);
        this._container.findChildByName("get_more_button").addEventListener("WME_CLICK", this.onBuyButtonClick);
        this.updateView(null);
    }

    declare private _SafeStr_2134: EffectsModel;

    declare private _container: IWindowContainer;

    declare private _catalogPageName: string;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3158: Timer;

    private _SafeStr_5049: number = 0;
    private _SafeStr_4296: IHabboAvatarEditorAvatarEffect = null;

    public get disposed(): boolean {
        return this._SafeStr_2134 == null;
    }

    public dispose(): void {
        if (this._SafeStr_3158) {
            this._SafeStr_3158.stop();
            this._SafeStr_3158.removeEventListener("timer", this.onSecondsTimer);
            this._SafeStr_3158 = null;
        }
        this._windowManager = null;
        this._SafeStr_2134 = null;
    }

    public updateView(param1: IHabboAvatarEditorAvatarEffect): void {
        this._SafeStr_4296 = param1;
        this._container.visible = true;
        if (param1 == null) {
            this._container.findChildByName("time_left_bg").visible = false;
            this._container.findChildByName("save_to_activate").visible = false;
            this._container.findChildByName("effect_name").visible = false;
        } else {
            this._container.findChildByName("effect_name").visible = true;
            if (!param1.isActive && !param1.isPermanent) {
                this._container.findChildByName("time_left_bg").visible = false;
                this._container.findChildByName("save_to_activate").visible = true;
                this._SafeStr_3158.stop();
            } else {
                this._SafeStr_5049 = param1.secondsLeft;
                this.setSecondsLeft(param1.secondsLeft, param1.duration, param1.isPermanent);
                this._container.findChildByName("time_left_bg").visible = true;
                this._container.findChildByName("save_to_activate").visible = false;
                this._SafeStr_3158.start();
            }
            this._container.findChildByName("effect_name").caption = "${fx_" + param1.type + "}";
        }
    }

    private setSecondsLeft(param1: number, param2: number, param3: boolean): void {
        let _loc17_: string = null;
        let _loc16_: number = 0;
        let _loc18_: any = 0;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc13_: number = 0;
        let _loc10_: string = null;
        let _loc14_: string = null;
        let _loc15_: string = null;
        let _loc5_: IWindowContainer = asGuarded(this._container.findChildByName("time_left_bg"), isIWindowContainer);
        let _loc12_: IBitmapWrapperWindow = castGuarded(_loc5_.findChildByName("progress_bar_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc6_: BitmapData = new BitmapData(_loc12_.width, _loc12_.height, false, 0);
        let _loc4_: number = param3 ? param2 : param1;
        let _loc8_: Rectangle = new Rectangle(0, 0, _loc6_.width * (_loc4_ / param2) | 0, _loc6_.height);
        _loc6_.fillRect(_loc8_, 2146080);
        _loc12_.bitmap = _loc6_;
        let _loc11_: ITextWindow = castGuarded(_loc5_.findChildByName("effect_time_left"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (param3) {
            _loc11_.caption = "${avatareditor.effects.active.permanent}";
            _loc17_ = _loc11_.text;
        } else if (param1 > 86400) {
            _loc11_.caption = "${avatareditor.effects.active.daysleft}";
            _loc17_ = _loc11_.text;
            _loc16_ = Math.floor(param1 / 86400) | 0;
            _loc17_ = _loc17_.replace("%days_left%", String(_loc16_));
        } else {
            _loc11_.caption = "${avatareditor.effects.active.timeleft}";
            _loc17_ = _loc11_.text;
            _loc18_ = param1;
            _loc7_ = Math.floor(_loc18_ / 3600) | 0;
            _loc9_ = Math.floor(_loc18_ / 60) % 60 | 0;
            _loc13_ = _loc18_ % 60 | 0;
            _loc10_ = _loc7_ < 10 ? "0" : "";
            _loc14_ = _loc9_ < 10 ? "0" : "";
            _loc15_ = _loc13_ < 10 ? "0" : "";
            if (_loc7_ > 0) {
                _loc17_ = _loc17_.replace("%time_left%", _loc10_ + _loc7_ + ":" + _loc14_ + _loc9_ + ":" + _loc15_ + _loc13_);
            } else {
                _loc17_ = _loc17_.replace("%time_left%", _loc14_ + _loc9_ + ":" + _loc15_ + _loc13_);
            }
        }
        _loc11_.text = _loc17_;
    }

    private onBuyButtonClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2134.controller.manager.catalog.openCatalogPage(this._catalogPageName);
    };

    private onSecondsTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_4296 != null && this._SafeStr_4296.isActive) {
            this.setSecondsLeft(this._SafeStr_5049--, this._SafeStr_4296.duration, this._SafeStr_4296.isPermanent);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
