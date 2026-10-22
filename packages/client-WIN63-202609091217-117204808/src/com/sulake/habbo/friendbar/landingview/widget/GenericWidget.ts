import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { IDisposable, isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { LandingViewElementType, TitleElementHandler, WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { isIDisableAwareElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IDisableAwareElement';
import { isIElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { isIFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';
import { isILayoutNameProvider } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/ILayoutNameProvider';
import { IConfigurationCodeAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IConfigurationCodeAwareWidget';
import { IDisableAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IDisableAwareWidget';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { ISlotAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISlotAwareWidget';

export class GenericWidget implements ILandingViewWidget, ISlotAwareWidget, ISettingsAwareWidget, IConfigurationCodeAwareWidget, IDisableAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::GenericWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    declare private _slot: number;
    static { (this.prototype as any)._slot = 0; }

    declare private _configurationCode: string;

    declare private _elements: UtilsMap;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
        this._elements = new UtilsMap();
    }

    public static configureLayout(param1: HabboLandingView, param2: number, param3: string, param4: IWindowContainer): void {
        let _loc9_: any[] = null;
        let _loc12_: string = null;
        let _loc11_: string = null;
        let _loc5_: string = GenericWidget.getConf(param1, param2, param3, "layout");
        let _loc10_: any[] = _loc5_.split(";");
        let _loc8_: IStaticBitmapWrapperWindow = castGuarded(param4.findChildByName("bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc6_: IWindow = param4.findChildByName("content_container");
        _loc6_.x = GenericWidget.isWideSlot(param2) ? 230 : 0;
        param4.width = GenericWidget.isWideSlot(param2) ? param1.dynamicLayoutLeftPaneWidth : param1.dynamicLayoutRightPaneWidth;
        for (const _loc7_ of _loc10_ ?? []) {
            _loc9_ = _loc7_.split(",");
            _loc12_ = stringOrNull(_loc9_[0]);
            _loc11_ = stringOrNull(_loc9_[1]);
            switch (_loc12_) {
                case "bitmap.uri":
                    _loc8_.assetUri = _loc11_;
                    break;
                case "bitmap.width":
                    _loc8_.width = parseInt(_loc11_) | 0;
                    break;
                case "bitmap.height":
                    _loc8_.height = parseInt(_loc11_) | 0;
                    break;
                case "bitmap.x":
                    _loc8_.x = parseInt(_loc11_) | 0;
                    break;
                case "bitmap.y":
                    _loc8_.y = parseInt(_loc11_) | 0;
                    break;
                case "content.x":
                    _loc6_.x = parseInt(_loc11_) | 0;
                    break;
                case "content.y":
                    _loc6_.y = parseInt(_loc11_) | 0;
                    break;
                case "content.width":
                    _loc6_.width = parseInt(_loc11_) | 0;
                    break;
                case "container.height":
                    param4.height = Math.max(parseInt(_loc11_), param4.height) | 0;
            }
        }
    }

    private static getConf(param1: HabboLandingView, param2: number, param3: string, param4: string): string {
        let _loc5_: string = param3 != null ? "landing.view." + param3 + "." + param4 : "landing.view.dynamic.slot." + param2 + "." + param4;
        return param1.getProperty(_loc5_);
    }

    private static isWideSlot(param1: number): boolean {
        return param1 != 3 && param1 != 5;
    }

    public set slot(param1: number) {
        this._slot = param1;
    }

    public get configurationCode(): string {
        return this._configurationCode;
    }

    public set configurationCode(param1: string) {
        this._configurationCode = param1;
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
        for (const _loc1_ of valuesOf(this._elements)) {
            if (isIDisposable(_loc1_)) {
                castGuarded(_loc1_, isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
            }
        }
        this._elements = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("generic_widget"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.configureContentColumn();
        GenericWidget.configureLayout(this._landingView, this._slot, this._configurationCode, this._container);
    }

    public getElementByName(param1: string): IElementHandler {
        return asGuarded(this._elements.getValue(param1), isIElementHandler);
    }

    private configureContentColumn(): void {
        let _loc6_: any[] = null;
        let _loc8_: string = null;
        let _loc1_: IElementHandler = null;
        let _loc9_: string = null;
        let _loc5_: IWindow = null;
        let _loc2_: string = GenericWidget.getConf(this._landingView, this._slot, this._configurationCode, "conf");
        let _loc7_: any[] = _loc2_.split(";");
        if (_loc2_ == null || _loc2_ == "") {
            return;
        }
        let _loc4_: IItemListWindow = castGuarded(this._container.findChildByName("content_container"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        for (const _loc3_ of _loc7_ ?? []) {
            _loc6_ = _loc3_.split(",");
            _loc8_ = stringOrNull(_loc6_[0]);
            _loc1_ = LandingViewElementType.createHandler(_loc8_);
            _loc9_ = isILayoutNameProvider(_loc1_) ? castGuarded(_loc1_, isILayoutNameProvider, "com.sulake.habbo.friendbar.landingview.interfaces.elements.ILayoutNameProvider").layoutName : "element_" + _loc8_;
            try {
                _loc5_ = this._landingView.getXmlWindow(_loc9_);
            } catch (e) {
                return;
            }
            if (_loc5_ == null) {
                return;
            }
            if (_loc1_ != null) {
                _loc1_.initialize(this._landingView, _loc5_, _loc6_, this);
                this._elements.add(_loc8_, _loc1_);
            }
            if (isIFloatingElement(_loc1_) && Boolean(castGuarded(_loc1_, isIFloatingElement, "com.sulake.habbo.friendbar.landingview.interfaces.elements.IFloatingElement").isFloating(GenericWidget.isWideSlot(this._slot)))) {
                if (_loc1_ instanceof TitleElementHandler) {
                    _loc5_.width = GenericWidget.isWideSlot(this._slot) ? this._landingView.dynamicLayoutLeftPaneWidth : this._landingView.dynamicLayoutRightPaneWidth;
                }
                this._container.addChild(_loc5_);
            } else {
                _loc4_.addListItem(_loc5_);
            }
        }
    }

    public refresh(): void {
        for (const _loc1_ of valuesOf(this._elements)) {
            _loc1_.refresh();
        }
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    public disable(): void {
        for (const _loc1_ of valuesOf(this._elements)) {
            if (isIDisableAwareElement(_loc1_)) {
                castGuarded(_loc1_, isIDisableAwareElement, "com.sulake.habbo.friendbar.landingview.interfaces.elements.IDisableAwareElement").disable();
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISlotAwareWidget](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }

    get [IConfigurationCodeAwareWidget](): true {
        return true;
    }

    get [IDisableAwareWidget](): true {
        return true;
    }
}
