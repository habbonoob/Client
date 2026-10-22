import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIDisableAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IDisableAwareWidget';
import { isIResizeAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IResizeAwareWidget';
import { isISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';

export class WidgetContainer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::WidgetContainer'); }

    constructor(param1: ILandingViewWidget, param2: string, param3: CommonWidgetSettings, param4: IWindowContainer = null) {
        this._widget = param1;
        this._placeholderName = param2;
        this._SafeStr_3386 = param3;
        this._SafeStr_5633 = param4;
    }

    declare private _widget: ILandingViewWidget;

    declare private _placeholderName: string;

    declare private _SafeStr_5633: IWindowContainer;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _SafeStr_3386: CommonWidgetSettings;

    public get disposed(): boolean {
        return this._widget == null && this._SafeStr_3386 == null;
    }

    public get container(): IWindow {
        return this._widget.container;
    }

    public dispose(): void {
        if (this._widget) {
            this._widget.dispose();
            this._widget = null;
        }
        if (this._SafeStr_3386) {
            this._SafeStr_3386 = null;
        }
    }

    public refresh(param1: IWindowContainer): void {
        let _loc3_: IWindow = null;
        let _loc2_: IWindowContainer = castGuarded(param1.findChildByName("content_background"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (!this._initialized) {
            this._initialized = true;
            if (this._placeholderName != null) {
                _loc3_ = _loc2_.getChildByName(this._placeholderName);
                if (_loc3_ == null) {
                    return;
                }
                this._widget.initialize();
                _loc2_.addChildAt(this._widget.container, _loc2_.getChildIndex(_loc3_));
                this._widget.container.x = _loc3_.x;
                this._widget.container.y = _loc3_.y;
                _loc2_.removeChild(_loc3_);
                _loc3_.dispose();
            } else {
                if (!(this._SafeStr_5633 != null && this._widget != null)) {
                    return;
                }
                this._widget.initialize();
                this._SafeStr_5633.addChild(this._widget.container);
            }
        }
        if (this._widget.container != null) {
            if (isISettingsAwareWidget(this._widget) && this._SafeStr_3386 != null) {
                castGuarded(this._widget, isISettingsAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.ISettingsAwareWidget").settings = this._SafeStr_3386;
            }
            this._widget.refresh();
        }
    }

    public windowResized(): void {
        if (this._widget != null && this._widget.container != null && isIResizeAwareWidget(this._widget)) {
            castGuarded(this._widget, isIResizeAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.IResizeAwareWidget").windowResized();
        }
    }

    public disable(): void {
        if (this._widget != null && this._widget.container != null && isIDisableAwareWidget(this._widget)) {
            castGuarded(this._widget, isIDisableAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.IDisableAwareWidget").disable();
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
