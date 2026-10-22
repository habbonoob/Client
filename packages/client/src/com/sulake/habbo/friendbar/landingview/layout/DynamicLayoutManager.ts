import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import type { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/layout/WidgetContainerLayout';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class DynamicLayoutManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::DynamicLayoutManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        DynamicLayoutManager.#initStatics();
        return DynamicLayoutManager._log;
    }

    public static readonly PLACEHOLDER_NAME: string = "placeholder_dynamic_widget_slots";
    public static readonly CONTENT_AREA_START_X: number = 230;
    private static readonly NUMBER_OF_SLOTS: number = 5;
    private static readonly RESIZE_TOLERANCE_SCROLLBAR_VISIBILITY: number = 6;
    private static readonly ABSOLUTE_MINIMUM_HEIGHT: number = 360;

    constructor(param1: WidgetContainerLayout, param2: CommonWidgetSettings) {
        let _loc5_: number = 0;
        this._SafeStr_2217 = new Array<IWindowContainer>(5).fill(null);
        this._layout = param1;
        this._SafeStr_3386 = param2;
        this._window = castGuarded(this._layout.landingView.getXmlWindow("dynamic_widget_grid"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc6_: IWindow = this._layout.window.findChildByName("placeholder_dynamic_widget_slots");
        let _loc3_: IWindowContainer = castGuarded(_loc6_.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.addChildAt(this._window, _loc3_.getChildIndex(_loc6_));
        _loc3_.removeChild(_loc6_);
        this._SafeStr_2286 = castGuarded(this._window.findChildByName("widgetlist_fromtop"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4812 = castGuarded(this._window.findChildByName("center_slots_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._center = castGuarded(this._window.findChildByName("widget_slots_center_scrollable"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_2708 = castGuarded(this._window.findChildByName("widget_slots_center_left"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_2822 = castGuarded(this._window.findChildByName("widget_slots_center_right"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4961 = castGuarded(this._window.findChildByName("widget_slots_right"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_5742 = castGuarded(this._window.findChildByName("widget_slot_4_root"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_5754 = castGuarded(this._window.findChildByName("widget_slot_5_root"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_6028 = this._layout.landingView.getXmlWindow("dynamic_widget_grid_separator");
        _loc5_ = 0;
        while (_loc5_ < 6) {
            this._SafeStr_2217[_loc5_] = castGuarded(this._window.findChildByName("widget_slot_" + (_loc5_ + 1)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (this._SafeStr_2217[_loc5_] != null) {
                this._SafeStr_2217[_loc5_].addEventListener("WE_RESIZED", this.contractCenterContainer);
            }
            _loc5_++;
        }
        this._fromTopScrollbar = castGuarded(this._window.findChildByName("center_container_scrollbar"), isIScrollbarWindow, "com.sulake.core.window.components.IScrollbarWindow");
        this._SafeStr_4318 = castGuarded(this._window.findChildByName("scroll_extra_space_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc7_: number = this._layout.landingView.dynamicLayoutLeftPaneWidth;
        let _loc4_: number = this._layout.landingView.dynamicLayoutRightPaneWidth;
        this._SafeStr_2708.width = _loc7_;
        this._SafeStr_2708.limits.maxWidth = _loc7_;
        this._SafeStr_5742.width = _loc7_;
        this._SafeStr_2822.width = _loc4_;
        this._SafeStr_4961.width = _loc4_;
        this._SafeStr_4961.limits.maxWidth = _loc4_;
        this._SafeStr_5754.width = _loc4_;
        this._center.arrangeListItems();
    }

    declare private _layout: WidgetContainerLayout;

    declare private _SafeStr_2286: IItemListWindow;

    declare private _center: IItemListWindow;

    declare private _SafeStr_2708: IItemListWindow;

    declare private _SafeStr_4812: IWindowContainer;

    declare private _SafeStr_2822: IItemListWindow;

    declare private _SafeStr_4961: IWindowContainer;

    declare private _SafeStr_2217: IWindowContainer[];

    declare private _SafeStr_5742: IItemListWindow;

    declare private _SafeStr_5754: IItemListWindow;

    declare private _SafeStr_4318: IWindowContainer;

    declare private _SafeStr_6028: IWindow;

    declare private _fromTopScrollbar: IScrollbarWindow;

    declare private _window: IWindowContainer;

    private _ignoreBottomRightSlot: boolean = false;

    declare private _SafeStr_3386: CommonWidgetSettings;

    private _SafeStr_4750: number = 10;
    private _SafeStr_4080: number = 50;
    private _SafeStr_4537: number = 10;
    private _SafeStr_7366: number = 80;
    private _SafeStr_7379: number = 10;
    private _SafeStr_5710: number = 60;
    private _SafeStr_5612: number = -1;
    private _initialized: boolean = false;
    private _SafeStr_5490: IWindow = null;
    private _topItemListInitialWidth: number = -1;

    public get topItemListInitialWidth(): number {
        if (this._topItemListInitialWidth == -1) {
            this._topItemListInitialWidth = this._SafeStr_2286.width;
        }
        return this._topItemListInitialWidth;
    }

    public get disposed(): boolean {
        return this._layout == null;
    }

    public set scrollbarRightEdgeRelativeToScreen(param1: number) {
        let _loc2_: number = this._layout.window.width;
        param1 = Math.min(param1, _loc2_) - this._window.x | 0;
        this._fromTopScrollbar.x = param1 - this._fromTopScrollbar.width;
    }

    public get topItemListInitialHeight(): number {
        if (this._SafeStr_5612 == -1) {
            this._SafeStr_5612 = this._SafeStr_2286.height;
        }
        return this._SafeStr_5612;
    }

    public set ignoreBottomRightSlot(param1: boolean) {
        this._ignoreBottomRightSlot = param1;
    }

    private get topItemListContentHeight(): number {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2286.numListItems) {
            _loc2_ = this._SafeStr_2286.getListItemAt(_loc3_ >>> 0).height;
            _loc1_ += _loc2_;
            if (_loc3_ > 0) {
                _loc1_ += this._SafeStr_2286.spacing;
            }
            _loc3_++;
        }
        return _loc1_;
    }

    public dispose(): void {
        let _loc1_: number = 0;
        if (!this.disposed) {
            _loc1_ = 0;
            while (_loc1_ < 6) {
                if (this._SafeStr_2217[_loc1_]) {
                    this._SafeStr_2217[_loc1_].dispose();
                }
                this._SafeStr_2217[_loc1_] = null;
                _loc1_++;
            }
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            this._layout = null;
        }
    }

    public getDynamicSlotContainer(param1: number): IWindowContainer {
        return this._SafeStr_2217[param1];
    }

    public enableSeparator(param1: number, param2: string): void {
        let _loc3_: IItemListWindow = null;
        let _loc4_: ITextWindow = null;
        switch (param1 - 4) {
            case 0:
                _loc3_ = this._SafeStr_5742;
                break;
            case 1:
                _loc3_ = this._SafeStr_5754;
                break;
            default:
                _loc3_ = null;
        }
        if (_loc3_) {
            if (_loc3_.numListItems < 2) {
                _loc3_.addListItemAt(this._SafeStr_6028.clone(), 0);
            }
            _loc4_ = castGuarded(castGuarded(_loc3_.getListItemAt(0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").getListItemByName("separator_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc4_.caption = "${" + param2 + "}";
            if (this._SafeStr_3386 != null) {
                if (this._SafeStr_3386.isTextColorSet) {
                    _loc4_.textColor = this._SafeStr_3386.textColor;
                }
                if (this._SafeStr_3386.isEtchingColorSet) {
                    _loc4_.etchingColor = this._SafeStr_3386.etchingColor;
                }
                if (this._SafeStr_3386.isEtchingPositionSet) {
                    _loc4_.etchingPosition = this._SafeStr_3386.etchingPosition;
                }
            }
        }
    }

    public resizeTo(param1: number, param2: number): void {
        this._SafeStr_2286.height = Math.min(param2, this.topItemListInitialHeight) | 0;
        this._SafeStr_2286.height = Math.max(360, this._SafeStr_2286.height) | 0;
        this._SafeStr_2286.width = Math.min(param1, this.topItemListInitialWidth) | 0;
        this.applyVerticalSize();
    }

    private isSlotOccupied(param1: number): boolean {
        return this._SafeStr_2217[param1].numChildren > 0;
    }

    private applyVerticalSize(): void {
        let _loc1_: number = 0;
        this.clearEmptySlotsForSpace();
        this.alignTopWidgetRow();
        this.alignBottomWidgetRow();
        this.resetToMaximumSpacing();
        this.setVerticalSpacing(this.topItemListContentHeight - this._SafeStr_2286.height);
        this.contractCenterContainer();
        this.adjustScrollbarVisibility();
        this.setHorizontalSpacing();
        if (!this._initialized) {
            _loc1_ = 0;
            while (_loc1_ < 6) {
                if (this._SafeStr_2217[_loc1_] != null) {
                    this._SafeStr_2217[_loc1_].addEventListener("WE_RESIZED", this.updateLayout);
                }
                _loc1_++;
            }
        }
        this._initialized = true;
        this._SafeStr_5490 = null;
    }

    private updateLayout = (param1: WindowEvent = null): void => {
        if (this._SafeStr_5490 == null) {
            this._SafeStr_5490 = param1.window;
            this.applyVerticalSize();
        }
    };

    private clearEmptySlotsForSpace(): void {
        let _loc1_: number = 0;
        if (!this.isSlotOccupied(0)) {
            this._SafeStr_2217[0].height = 0;
        }
        _loc1_ = 1;
        while (_loc1_ <= 4) {
            if (!this.isSlotOccupied(_loc1_)) {
                this._SafeStr_2217[_loc1_].height = 1;
            }
            _loc1_++;
        }
    }

    private alignBottomWidgetRow(): void {
        let _loc1_: number = 0;
        if (this.isSlotOccupied(3) || this.isSlotOccupied(4)) {
            _loc1_ = Math.max(this._SafeStr_2217[3].height, this._SafeStr_2217[4].height) | 0;
            this._SafeStr_2217[3].height = _loc1_;
            this._SafeStr_2217[4].height = _loc1_;
            if (this.isSlotOccupied(3)) {
                this._SafeStr_2217[3].getChildAt(0).y = 0;
                this._SafeStr_2217[3].width = this._layout.landingView.dynamicLayoutLeftPaneWidth;
            }
            if (this.isSlotOccupied(4)) {
                this._SafeStr_2217[4].getChildAt(0).y = 0;
                this._SafeStr_2217[4].width = this._layout.landingView.dynamicLayoutRightPaneWidth;
            }
        }
    }

    private alignTopWidgetRow(): number {
        let _loc1_: number = 0;
        if (this.isSlotOccupied(1) || this.isSlotOccupied(2)) {
            if (!this._ignoreBottomRightSlot) {
                _loc1_ = Math.max(this._SafeStr_2217[1].height, this._SafeStr_2217[2].height) | 0;
                this._SafeStr_2217[1].height = _loc1_;
                this._SafeStr_2217[2].height = _loc1_;
            }
            if (this.isSlotOccupied(1)) {
                this._SafeStr_2217[1].getChildAt(0).y = 0;
                this._SafeStr_2217[1].width = this._layout.landingView.dynamicLayoutLeftPaneWidth;
            }
            if (this.isSlotOccupied(2)) {
                this._SafeStr_2217[2].getChildAt(0).y = 0;
                this._SafeStr_2217[2].width = this._layout.landingView.dynamicLayoutRightPaneWidth;
            }
        }
        return _loc1_;
    }

    private setHorizontalSpacing(): void {
        let _loc1_: number = this._topItemListInitialWidth - this._SafeStr_2286.width;
        if (_loc1_ > this._SafeStr_5710 - this._SafeStr_7379) {
            this._center.spacing = this._SafeStr_7379;
        } else {
            this._center.spacing = Math.min(this._SafeStr_5710, this._SafeStr_5710 - _loc1_) | 0;
        }
    }

    private setVerticalSpacing(param1: number): void {
        let _loc2_: number = this._SafeStr_4080 - this._SafeStr_4750;
        let _loc3_: number = this._SafeStr_7366 - this._SafeStr_4537;
        param1 += this._SafeStr_4750 + this._SafeStr_4537;
        if (param1 <= 0) {
            this._SafeStr_2286.spacing = this._SafeStr_4537;
            this._SafeStr_2708.spacing = this._SafeStr_4080;
            this._SafeStr_2822.spacing = this._SafeStr_4080;
        } else if (param1 < _loc2_) {
            this._SafeStr_2286.spacing = this._SafeStr_4537;
            this._SafeStr_2708.spacing = this._SafeStr_4080 - param1;
            this._SafeStr_2822.spacing = this._SafeStr_4080 - param1;
        } else if (param1 < _loc2_ + _loc3_) {
            this._SafeStr_2286.spacing = this._SafeStr_4537;
            this._SafeStr_2708.spacing = this._SafeStr_4750;
            this._SafeStr_2822.spacing = this._SafeStr_4750;
        } else {
            this._SafeStr_2286.spacing = this._SafeStr_4537;
            this._SafeStr_2708.spacing = this._SafeStr_4750;
            this._SafeStr_2822.spacing = this._SafeStr_4750;
        }
    }

    private adjustScrollbarVisibility(): void {
        this._SafeStr_2286.invalidate();
        if (this._SafeStr_2286.height < this.topItemListContentHeight - 6) {
            this._fromTopScrollbar.y = this._SafeStr_2286.y;
            this._fromTopScrollbar.height = this._SafeStr_2286.height;
            this._fromTopScrollbar.visible = true;
            this._fromTopScrollbar.scrollV = 0;
            this._SafeStr_4318.y = this.topItemListContentHeight;
            this._SafeStr_4318.height = 25;
            this._layout.landingView.toolbarExtensionExtraMargin = true;
        } else {
            this._SafeStr_4318.y = 0;
            this._SafeStr_4318.height = 1;
            this._layout.landingView.toolbarExtensionExtraMargin = false;
        }
    }

    private resetToMaximumSpacing(): void {
        this._center.spacing = this._SafeStr_5710;
        this._SafeStr_2708.spacing = this._SafeStr_4080;
        this._SafeStr_2822.spacing = this._SafeStr_4080;
        this._SafeStr_2286.spacing = this._SafeStr_7366;
        this._fromTopScrollbar.visible = false;
        this._SafeStr_2708.invalidate();
        this._SafeStr_2822.invalidate();
        this._center.invalidate();
        this._SafeStr_2286.invalidate();
        this._SafeStr_4812.invalidate();
    }

    private contractCenterContainer = (param1: WindowEvent = null): void => {
        if (param1 != null && !this._initialized) {
            return;
        }
        this._SafeStr_2708.invalidate();
        this._SafeStr_2822.invalidate();
        this._center.height = Math.max(this._SafeStr_2708.height, this._SafeStr_2822.height) | 0;
        this._SafeStr_4812.height = Math.max(this._SafeStr_2708.height, this._SafeStr_2822.height) | 0;
    };

    private logFinalPositions(): void {
        let _loc2_: number = 0;
        DynamicLayoutManager._log.info("***** Final positions *****");
        let _loc1_: Rectangle = new Rectangle();
        this._window.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Window rect\t\t\t\t\t\t: " + _loc1_);
        this._SafeStr_2286.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("All items list rect\t\t\t\t: " + _loc1_);
        this._SafeStr_4812.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Center container itemlist rect\t: " + _loc1_);
        this._center.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Center itemlist rect\t\t\t: " + _loc1_);
        this._SafeStr_2708.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Left pane itemlist rect\t\t\t: " + _loc1_);
        this._SafeStr_2822.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Right pane itemlist rect\t\t: " + _loc1_);
        this._SafeStr_4961.getGlobalRectangle(_loc1_);
        DynamicLayoutManager._log.info("Right pane container rect\t\t: " + _loc1_);
        _loc2_ = 0;
        while (_loc2_ < 5) {
            this._SafeStr_2217[_loc2_].getGlobalRectangle(_loc1_);
            DynamicLayoutManager._log.info("Slot " + _loc2_ + " rect\t\t\t    : " + _loc1_);
            _loc2_++;
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (DynamicLayoutManager.#staticsReady) return;
        DynamicLayoutManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(DynamicLayoutManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendbar.landingview.layout.DynamicLayoutManager"));
    }

    get [IDisposable](): true {
        return true;
    }
}
