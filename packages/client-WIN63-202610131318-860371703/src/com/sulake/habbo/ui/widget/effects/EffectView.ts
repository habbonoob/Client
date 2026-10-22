import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { EffectsWidget } from '@/com/sulake/habbo/ui/widget/effects/EffectsWidget';
import type { IWidgetAvatarEffect } from '@/com/sulake/habbo/ui/widget/memenu/IWidgetAvatarEffect';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class EffectView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.effects::EffectView'); }

    private readonly UPDATE_TIMER_MS: number = 1000;

    declare private _widget: EffectsWidget;

    declare private _window: IWindowContainer;

    declare private _effect: IWidgetAvatarEffect;

    declare private _bar: IWindow;

    declare private _maxWidth: number;
    static { (this.prototype as any)._maxWidth = NaN; }

    declare private _SafeStr_2665: ITextWindow;

    declare private _SafeStr_2458: Timer;

    declare private _hilite: IWindow;

    constructor(param1: EffectsWidget, param2: IWidgetAvatarEffect) {
        this._effect = param2;
        this._widget = param1;
        this._SafeStr_2458 = new Timer(1000);
        this._SafeStr_2458.addEventListener("timer", this.onUpdate);
        this.update();
    }

    public get effect(): IWidgetAvatarEffect {
        return this._effect;
    }

    public dispose(): void {
        if (this._SafeStr_2458 != null) {
            this._SafeStr_2458.stop();
            this._SafeStr_2458.removeEventListener("timer", this.onUpdate);
            this._SafeStr_2458 = null;
        }
        this._widget = null;
        this._effect = null;
        this._bar = null;
        this._SafeStr_2665 = null;
        this._hilite = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private onUpdate = (param1: Event = null): void => {
        let _loc2_: number = NaN;
        if (this._bar == null) {
            this._SafeStr_2458.stop();
            return;
        }
        if (this._effect.isActive) {
            _loc2_ = this._effect.secondsLeft / this._effect.duration;
            this._bar.width = _loc2_ * this._maxWidth | 0;
        } else {
            this._bar.width = 0;
            this._SafeStr_2458.stop();
        }
        this.setTimeLeft();
    };

    private setTimeLeft(): void {
        let _loc8_: string = null;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc1_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: string = null;
        let _loc6_: string = null;
        if (this._SafeStr_2665 == null) {
            this._SafeStr_2665 = asGuarded(this._window.findChildByName("time_left"), isITextWindow);
            if (this._SafeStr_2665 == null) {
                return;
            }
        }
        if (!this._effect.isActive) {
            this._SafeStr_2665.caption = "${widgets.memenu.effects.activate}";
            return;
        }
        if (this._effect.secondsLeft > 86400) {
            this._SafeStr_2665.caption = "${widgets.memenu.effects.active.daysleft}";
            _loc8_ = this._SafeStr_2665.text;
            _loc7_ = Math.floor(this._effect.secondsLeft / 86400) | 0;
            _loc8_ = _loc8_.replace("%days_left%", String(_loc7_));
        } else {
            this._SafeStr_2665.caption = "${widgets.memenu.effects.active.timeleft}";
            _loc8_ = this._SafeStr_2665.text;
            _loc9_ = this._effect.secondsLeft;
            _loc1_ = Math.floor(_loc9_ / 3600) | 0;
            _loc3_ = Math.floor(_loc9_ / 60) % 60 | 0;
            _loc2_ = _loc9_ % 60;
            _loc5_ = _loc1_ < 10 ? "0" : "";
            _loc4_ = _loc3_ < 10 ? "0" : "";
            _loc6_ = _loc2_ < 10 ? "0" : "";
            if (_loc1_ > 0) {
                _loc8_ = _loc8_.replace("%time_left%", _loc5_ + _loc1_ + ":" + _loc4_ + _loc3_ + ":" + _loc6_ + _loc2_);
            } else {
                _loc8_ = _loc8_.replace("%time_left%", _loc4_ + _loc3_ + ":" + _loc6_ + _loc2_);
            }
        }
        this._SafeStr_2665.text = _loc8_;
    }

    public update(): void {
        let _loc7_: IWindow = null;
        let _loc5_: XmlAsset = null;
        let _loc4_: IButtonWindow = null;
        if (!this._window) {
            this._window = asGuarded(this._widget.windowManager.createWindow("", "", 4, 0, 16), isIWindowContainer);
        }
        while (this._window.numChildren > 0) {
            _loc7_ = this._window.removeChildAt(0);
            _loc7_.dispose();
        }
        this._bar = null;
        this._hilite = null;
        this._SafeStr_2665 = null;
        let _loc2_: string = "";
        if (this._effect.isInUse) {
            _loc2_ = "memenu_effect_selected";
        } else if (this._effect.isActive) {
            _loc2_ = "memenu_effect_unselected";
        } else {
            _loc2_ = "memenu_effect_inactive";
        }
        _loc5_ = asInstanceOf(this._widget.assets.getAssetByName(_loc2_), XmlAsset);
        let _loc6_: IWindowContainer = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc5_.content, XML)), isIWindowContainer);
        this._window.addChild(_loc6_);
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("effect_name"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.caption = "${fx_" + this._effect.type + "}";
        }
        let _loc8_: ITextWindow = asGuarded(this._window.findChildByName("effect_amount"), isITextWindow);
        if (_loc8_ != null) {
            _loc8_.caption = this._effect.amountInInventory + "";
        }
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("effect_amount_bg1"), isIWindowContainer);
        if (this._effect.amountInInventory < 2) {
            if (_loc1_ != null) {
                _loc1_.visible = false;
            }
        }
        if (_loc2_ == "memenu_effect_inactive") {
            _loc4_ = asGuarded(this._window.findChildByName("activate_effect"), isIButtonWindow);
            if (_loc4_ != null) {
                _loc4_.addEventListener("WME_CLICK", this.onMouseEvent);
            }
        } else {
            _loc6_.addEventListener("WME_CLICK", this.onMouseEvent);
            if (this._effect.isActive) {
                _loc6_.addEventListener("WME_OVER", this.onMouseEvent);
                _loc6_.addEventListener("WME_OUT", this.onMouseEvent);
            }
            if (this._effect.isInUse) {
                this.setElementImage("effect_hilite", "memenu_fx_pause");
            } else {
                this.setElementImage("effect_hilite", "memenu_fx_play");
            }
            this._hilite = this._window.findChildByName("effect_hilite");
            this._hilite.visible = false;
        }
        this.setTimeLeft();
        this._bar = this._window.findChildByName("loader_bar");
        if (this._bar != null) {
            this._maxWidth = this._bar.width;
            this._SafeStr_2458.start();
            this.onUpdate();
        }
        if (this._effect.icon) {
            this.setElementBitmap("effect_icon", this._effect.icon);
        }
        this._window.rectangle = _loc6_.rectangle;
    }

    private setElementBitmap(param1: string, param2: BitmapData): void {
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow);
        if (_loc3_ != null) {
            if (_loc3_.bitmap) {
                _loc3_.bitmap.dispose();
            }
            _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
            _loc3_.bitmap.copyPixels(param2, param2.rect, new Point(0, 0));
        }
    }

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        switch (param1.type) {
            case "WME_OVER":
                if (this._hilite != null) {
                    this._hilite.visible = true;
                }
                break;
            case "WME_OUT":
                if (this._hilite != null) {
                    this._hilite.visible = false;
                }
                break;
            case "WME_CLICK":
                this._widget.selectEffect(this._effect.type, this._effect.isInUse);
        }
    };

    private setElementImage(param1: string, param2: string): void {
        let _loc4_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param2), BitmapDataAsset);
        let _loc3_: BitmapData = asInstanceOf(_loc4_.content, BitmapData);
        this.setElementBitmap(param1, _loc3_);
    }
}
