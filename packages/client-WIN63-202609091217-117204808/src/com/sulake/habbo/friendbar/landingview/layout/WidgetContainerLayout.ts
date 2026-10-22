import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CurrentTimingCodeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/competition/CurrentTimingCodeMessageEvent';
import { GetCurrentTimingCodeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/GetCurrentTimingCodeMessageComposer';
import { LandingViewWidgetType } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { isISlotAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISlotAwareWidget';
import { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { DynamicLayoutManager } from '@/com/sulake/habbo/friendbar/landingview/layout/DynamicLayoutManager';
import { MovingBackgroundObjects } from '@/com/sulake/habbo/friendbar/landingview/layout/MovingBackgroundObjects';
import { WidgetContainer } from '@/com/sulake/habbo/friendbar/landingview/layout/WidgetContainer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class WidgetContainerLayout implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::WidgetContainerLayout'); }

    private static readonly WIDGET_COLORABLE_TEXTELEMENT_TAG: string = "COLORABLE";
    private static readonly _SafeStr_7813: number = 0;
    private static readonly DEFAULT_LAYOUT: string = "landing_view_default_dynamic_layout";
    private static readonly GENERIC_RECEPTION_LAYOUT: string = "landing_view_generic_reception";
    private static readonly WIDGET_PLACEHOLDER_PREFIX: string = "widget_placeholder_";
    private static readonly _SafeStr_6389: any[] = ["background_back", "background_front", "background_gradient_top", "background_hotel_top", "background_gradient", "background_right", "background_horizon", "background_left", "background_left_bottom"];

    declare protected _landingView: HabboLandingView;

    declare protected _window: IWindowContainer;

    declare protected _dynamicWidgetLayout: DynamicLayoutManager;

    declare protected _SafeStr_3554: MovingBackgroundObjects;

    declare protected _orgWindowWidth: number;
    static { (this.prototype as any)._orgWindowWidth = 0; }

    declare protected _SafeStr_7000: number;
    static { (this.prototype as any)._SafeStr_7000 = 0; }

    private _SafeStr_2139: any[] = [];

    declare private _SafeStr_3386: CommonWidgetSettings;

    declare private _schedulingStr: string;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
        this.registerFixedWidgets();
        this._SafeStr_3554 = new MovingBackgroundObjects(this._landingView);
        this._SafeStr_3386 = new CommonWidgetSettings(this._landingView);
        param1.registerUpdateReceiver(this, 1000);
    }

    private static getColorizableElements(param1: IWindowContainer): any[] {
        let _loc2_: any[] = new Array(0);
        param1.groupChildrenWithTag("COLORABLE", _loc2_, -1);
        return _loc2_;
    }

    public static applyColorizableWidgetTextColor(param1: IWindowContainer, param2: number): void {
        if (param1 == null) {
            return;
        }
        for (const _loc3_ of WidgetContainerLayout.getColorizableElements(param1) ?? []) {
            _loc3_.textColor = param2;
        }
    }

    public static applyColorizableWidgetEtchingColor(param1: IWindowContainer, param2: number): void {
        if (param1 == null) {
            return;
        }
        for (const _loc3_ of WidgetContainerLayout.getColorizableElements(param1) ?? []) {
            _loc3_.etchingColor = param2;
        }
    }

    public static applyColorizableWidgetEtchingPosition(param1: IWindowContainer, param2: string): void {
        if (param1 == null) {
            return;
        }
        for (const _loc3_ of WidgetContainerLayout.getColorizableElements(param1) ?? []) {
            _loc3_.etchingPosition = param2;
        }
    }

    public static applyCommonWidgetSettings(param1: IWindowContainer, param2: CommonWidgetSettings): void {
        if (param1 == null) {
            return;
        }
        if (param2.isTextColorSet || param2.isEtchingColorSet || param2.isEtchingPositionSet) {
            for (const _loc3_ of WidgetContainerLayout.getColorizableElements(param1) ?? []) {
                _loc3_.textColor = param2.isTextColorSet ? param2.textColor : _loc3_.textColor;
                _loc3_.etchingColor = param2.isEtchingColorSet ? param2.etchingColor : _loc3_.etchingColor;
                _loc3_.etchingPosition = param2.isEtchingPositionSet ? param2.etchingPosition : _loc3_.etchingPosition;
            }
        }
    }

    public update(param1: number): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._SafeStr_3554.update(param1);
        }
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public dispose(): void {
        if (this._landingView) {
            this._landingView.removeUpdateReceiver(this);
        }
        this._landingView = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2139) {
            for (const _loc1_ of this._SafeStr_2139 ?? []) {
                _loc1_.dispose();
            }
            this._SafeStr_2139 = null;
        }
        if (this._SafeStr_3554) {
            this._SafeStr_3554.dispose();
            this._SafeStr_3554 = null;
        }
        if (this._dynamicWidgetLayout) {
            this._dynamicWidgetLayout.dispose();
            this._dynamicWidgetLayout = null;
        }
        if (this._SafeStr_3386) {
            this._SafeStr_3386 = null;
        }
    }

    public activate(): void {
        if (this._window == null) {
            this.createWindow();
            this.registerDynamicWidgets();
            this._landingView.communicationManager.addHabboConnectionMessageEvent(new CurrentTimingCodeMessageEvent(this.onTimingCode));
            this._schedulingStr = this._landingView.getProperty("landing.view.bgtiming");
        }
        for (const _loc1_ of this._SafeStr_2139 ?? []) {
            _loc1_.refresh(this._window);
        }
        this.resizeWindow();
        this._landingView.windowManager.getWindowContext(0).getDesktopWindow().addEventListener("WE_RESIZED", this.onDesktopResized);
        this._window.invalidate();
        if (this.navigatorPosition != null) {
            this._landingView.navigator.openNavigator(this.navigatorPosition);
        }
        this._landingView.send(new GetCurrentTimingCodeMessageComposer(this._schedulingStr));
        this._window.visible = true;
    }

    private get navigatorPosition(): Point {
        let _loc2_: Point = null;
        let _loc1_: IWindow = this._window.findChildByName("navigator_placer");
        if (_loc1_ == null) {
            return null;
        }
        _loc2_ = new Point();
        _loc1_.getGlobalPosition(_loc2_);
        return _loc2_;
    }

    public disable(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
        for (const _loc1_ of this._SafeStr_2139 ?? []) {
            _loc1_.disable();
        }
    }

    protected createWindow(): void {
        if (this._window != null) {
            return;
        }
        let _loc1_: string = this.getLayout();
        this._window = castGuarded(this._landingView.getXmlWindow(_loc1_, 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.hideWarningIfPresent();
        if (this._landingView.getBoolean("landing.view.right_pane_dimmer.hidden")) {
            if (this._window.findChildByName("right_pane_dimmer") != null) {
                this._window.findChildByName("right_pane_dimmer").visible = false;
            }
        }
        this.setOrgWindowSize();
        this.setupBottomSlotWidgetName();
    }

    private hideWarningIfPresent(): void {
        let _loc1_: IWindow = this._window.findChildByName("warning");
        if (_loc1_ != null) {
            _loc1_.visible = false;
        }
    }

    protected setOrgWindowSize(): void {
        this._orgWindowWidth = this._window.width;
        this._SafeStr_7000 = this._window.height;
    }

    protected setupBottomSlotWidgetName(): void {
        let _loc1_: string = null;
        let _loc2_: IWindow = this._window.findChildByName("widget_placeholder_bottom_slot");
        if (_loc2_ != null) {
            _loc1_ = this._landingView.getProperty("landing.view.dynamic.slot.6.widget");
            if (_loc1_ == "") {
                _loc2_.visible = false;
            } else {
                _loc2_.name = "widget_placeholder_" + _loc1_;
            }
        }
    }

    private getLayout(): string {
        return this._landingView.propertyExists("landing.view.layoutxml") ? this._landingView.getProperty("landing.view.layoutxml") : "landing_view_default_dynamic_layout";
    }

    private isGenericReceptionLayout(): boolean {
        return this.getLayout() == "landing_view_generic_reception";
    }

    protected resizeWindow(): void {
        if (this._window != null) {
            if (this._dynamicWidgetLayout != null) {
                this.resizeDynamicLayout();
            } else {
                this.resizeCustomLayout();
            }
            this._window.invalidate();
        }
        for (const _loc1_ of this._SafeStr_2139 ?? []) {
            _loc1_.windowResized();
        }
    }

    private resizeDynamicLayout(): void {
        let _loc1_: Rectangle = this._window.desktop.rectangle;
        this._window.width = _loc1_.width | 0;
        this._window.height = _loc1_.height | 0;
        let _loc2_: number = this._SafeStr_7000 - _loc1_.height | 0;
        let _loc3_: number = this._orgWindowWidth - _loc1_.width | 0;
        this._dynamicWidgetLayout.resizeTo(this._dynamicWidgetLayout.topItemListInitialWidth - _loc3_, this._dynamicWidgetLayout.topItemListInitialHeight - _loc2_);
    }

    private resizeCustomLayout(): void {
        this._window.x = 0;
        this._window.y = 0;
        let _loc1_: Rectangle = this._window.desktop.rectangle;
        this._window.x = Math.max(0, (_loc1_.width - this._window.width) / 2) | 0;
        if (_loc1_.height > this._window.height || this.isGenericReceptionLayout()) {
            this._window.y = Math.max(0, (_loc1_.height - this._window.height) / 2) | 0;
        } else {
            this._window.y = _loc1_.height - this._window.height | 0;
        }
    }

    protected onDesktopResized = (param1: WindowEvent): void => {
        this.resizeWindow();
    };

    private setBackgroundGraphics(param1: string): void {
        let _loc4_: IStaticBitmapWrapperWindow = null;
        let _loc2_: string = null;
        param1 = param1 == null || param1 == "" ? "" : param1 + ".";
        for (const _loc3_ of WidgetContainerLayout._SafeStr_6389 ?? []) {
            _loc4_ = castGuarded(this._window.findChildByName(stringOrNull(_loc3_)), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            if (_loc4_) {
                if (this._landingView.getProperty("landing.view." + param1 + _loc3_ + ".visible") == "false") {
                    _loc4_.visible = false;
                } else {
                    _loc4_.visible = true;
                    _loc2_ = this._landingView.getProperty("landing.view." + param1 + _loc3_ + ".uri", null);
                    if (_loc4_.assetUri != _loc2_ && _loc2_ != null && _loc2_ != "") {
                        _loc4_.assetUri = _loc2_;
                    }
                }
            }
        }
    }

    private registerFixedWidgets(): void {
        this.registerPlaceholderAnchoredWidget("avatarimage");
        this.registerPlaceholderAnchoredWidget("expiringcatalogpage");
        this.registerPlaceholderAnchoredWidget("expiringcatalogpagesmall");
        this.registerPlaceholderAnchoredWidget("communitygoal");
        this.registerPlaceholderAnchoredWidget("catalogpromo");
        this.registerPlaceholderAnchoredWidget("achievementcompetition_hall_of_fame");
        this.registerPlaceholderAnchoredWidget("achievementcompetition_prizes");
        this.registerPlaceholderAnchoredWidget("dailyquest");
        this.registerPlaceholderAnchoredWidget("nextlimitedrarecountdown");
        this.registerPlaceholderAnchoredWidget("habbomoderationpromo");
        this.registerPlaceholderAnchoredWidget("habbotalentspromo");
        this.registerPlaceholderAnchoredWidget("habbowaypromo");
        this.registerPlaceholderAnchoredWidget("safetyquizpromo");
        this.registerPlaceholderAnchoredWidget("generic");
        this.registerPlaceholderAnchoredWidget("widgetcontainer");
    }

    private registerPlaceholderAnchoredWidget(param1: string): void {
        let _loc2_: ILandingViewWidget = LandingViewWidgetType.getWidgetForType(param1, this._landingView);
        this._SafeStr_2139.push(new WidgetContainer(_loc2_, "widget_placeholder_" + param1, this._SafeStr_3386));
    }

    private registerDynamicWidgets(): void {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        let _loc1_: ILandingViewWidget = null;
        if (this._window.findChildByName("placeholder_dynamic_widget_slots") == null) {
            Logger.log("ERROR! Tried to initialize dynamic widget list for landing view without the dynamic element present");
            return;
        }
        this._dynamicWidgetLayout = new DynamicLayoutManager(this, this._SafeStr_3386);
        _loc3_ = 0;
        while (_loc3_ < 6) {
            _loc2_ = this._landingView.getProperty("landing.view.dynamic.slot." + (_loc3_ + 1) + ".widget", null);
            _loc1_ = LandingViewWidgetType.getWidgetForType(_loc2_, this._landingView);
            if (_loc1_ != null) {
                if (isISlotAwareWidget(_loc1_)) {
                    castGuarded(_loc1_, isISlotAwareWidget, "com.sulake.habbo.friendbar.landingview.interfaces.ISlotAwareWidget").slot = _loc3_ + 1;
                }
                this._SafeStr_2139.push(new WidgetContainer(_loc1_, null, this._SafeStr_3386, this._dynamicWidgetLayout.getDynamicSlotContainer(_loc3_)));
            }
            _loc3_++;
        }
        if (this._landingView.getBoolean("landing.view.dynamic.slot.5.ignore")) {
            this._dynamicWidgetLayout.ignoreBottomRightSlot = true;
        }
        if (this._landingView.getBoolean("landing.view.dynamic.slot.4.separator")) {
            this._dynamicWidgetLayout.enableSeparator(4, this._landingView.getProperty("landing.view.dynamic.slot.4.title"));
        }
        if (this._landingView.getBoolean("landing.view.dynamic.slot.5.separator")) {
            this._dynamicWidgetLayout.enableSeparator(5, this._landingView.getProperty("landing.view.dynamic.slot.5.title"));
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get landingView(): HabboLandingView {
        return this._landingView;
    }

    private onTimingCode = (param1: CurrentTimingCodeMessageEvent): void => {
        if (param1.getParser().schedulingStr == this._schedulingStr && this._landingView) {
            this.setBackgroundGraphics(param1.getParser().code);
            this._SafeStr_3554.timingCode = param1.getParser().code;
            this._SafeStr_3554.initialize(this._window);
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
