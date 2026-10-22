import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CurrentTimingCodeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CurrentTimingCodeMessageEvent';
import { GetCurrentTimingCodeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetCurrentTimingCodeMessageComposer';
import { LandingViewWidgetType } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { isIConfigurationCodeAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IConfigurationCodeAwareWidget';
import { ISlotAwareWidget, isISlotAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISlotAwareWidget';
import { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { WidgetContainer } from '@/com/sulake/habbo/friendbar/landingview/layout/WidgetContainer';

export class WidgetContainerWidget implements ILandingViewWidget, ISlotAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::WidgetContainerWidget'); }

    public static hideChildren(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            param1.getChildAt(_loc2_).visible = false;
            _loc2_++;
        }
    }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    private _SafeStr_2139: Map<any, any> = new Dictionary();

    declare private _SafeStr_3386: CommonWidgetSettings;

    declare private _slot: number;
    static { (this.prototype as any)._slot = 0; }

    declare private _schedulingStr: string;

    declare private _SafeStr_3324: WidgetContainer;

    declare private _container: IWindowContainer;

    public get container(): IWindow {
        return this._container;
    }

    public set slot(param1: number) {
        this._slot = param1;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("widget_container_widget"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3386 = new CommonWidgetSettings(this._landingView);
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CurrentTimingCodeMessageEvent(this.onTimingCode));
        this._schedulingStr = this._landingView.getProperty("landing.view.dynamic.slot." + this._slot + ".conf");
    }

    public refresh(): void {
        this._landingView.send(new GetCurrentTimingCodeMessageComposer(this._schedulingStr));
    }

    private refreshContent(): void {
        WidgetContainerWidget.hideChildren(this._container);
        if (this._SafeStr_3324 != null) {
            this._SafeStr_3324.refresh(this._container);
            this._SafeStr_3324.container.visible = true;
            this._container.height = this._SafeStr_3324.container.height;
            this._container.width = this._SafeStr_3324.container.width;
        }
    }

    private createWidgetContainer(param1: string): WidgetContainer {
        let _loc3_: string = this._landingView.getProperty("landing.view." + param1 + ".widget");
        let _loc2_: ILandingViewWidget = LandingViewWidgetType.getWidgetForType(_loc3_, this._landingView);
        if (_loc2_ == null) {
            return null;
        }
        if (isISlotAwareWidget(_loc2_)) {
            castGuarded(_loc2_, isISlotAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.ISlotAwareWidget").slot = this._slot;
        }
        if (isIConfigurationCodeAwareWidget(_loc2_)) {
            castGuarded(_loc2_, isIConfigurationCodeAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.IConfigurationCodeAwareWidget").configurationCode = param1;
        }
        let _loc4_: WidgetContainer = new WidgetContainer(_loc2_, null, this._SafeStr_3386, this._container);
        this._SafeStr_2139.set(param1, _loc4_);
        return _loc4_;
    }

    private onTimingCode = (param1: CurrentTimingCodeMessageEvent): void => {
        if (param1.getParser().schedulingStr == this._schedulingStr && !this.disposed) {
            this.switchCurrentWidget(param1.getParser().code);
            this.refreshContent();
        }
    };

    private switchCurrentWidget(param1: string): void {
        if (param1 == "") {
            this._SafeStr_3324 = null;
            return;
        }
        let _loc2_: WidgetContainer = this._SafeStr_2139.get(param1);
        if (_loc2_ == null) {
            _loc2_ = this.createWidgetContainer(param1);
        }
        this._SafeStr_3324 = _loc2_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISlotAwareWidget](): true {
        return true;
    }
}
