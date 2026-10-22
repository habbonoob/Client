import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITouchAwareWindow } from '@/com/sulake/core/window/utils/tablet/ITouchAwareWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { InteractiveController, ScrollBarLiftController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { isIDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { isIScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { WindowTouchEvent } from '@/com/sulake/core/window/events/WindowTouchEvent';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { SmoothScroller } from '@/com/sulake/core/window/utils/SmoothScroller';

export class ScrollBarController extends InteractiveController implements IScrollbarWindow, ITouchAwareWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ScrollBarController'); }

    private static readonly SCROLL_STEP_SIZE: number = 15;
    private static readonly SCROLL_BUTTON_INCREMENT: string = "increment";
    private static readonly SCROLL_BUTTON_DECREMENT: string = "decrement";
    private static readonly SCROLL_SLIDER_TRACK: string = "slider_track";
    private static readonly SCROLL_SLIDER_BAR: string = "slider_bar";

    declare protected _offset: number;

    declare protected _SafeStr_3778: number;

    declare protected _scrollable: IScrollableWindow;

    declare private _SafeStr_2417: boolean;

    declare private _targetName: string;

    declare private _SafeStr_3329: boolean;

    declare private _SafeStr_15119: SmoothScroller;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0, param12: IScrollableWindow = null) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_2451 = false;
        this._scrollable = param12;
        this._SafeStr_2417 = param2 == 130;
        this._SafeStr_15119 = new SmoothScroller(this.getScrollOffset, this.setSmoothScrollOffset, this.getSmoothScrollAxisSize, 200, 60, true, null, 15);
        let _loc13_: any[] = [];
        this.groupChildrenWithTag("_INTERNAL", _loc13_, -1);
        for (const _loc14_ of _loc13_ ?? []) {
            _loc14_.procedure = this.scrollButtonEventProc;
        }
        this.updateLiftSizeAndPosition();
    }

    public get scrollH(): number {
        return this._SafeStr_2417 ? this._offset : 0;
    }

    public get scrollV(): number {
        return this._SafeStr_2417 ? 0 : this._offset;
    }

    public get scrollable(): IScrollableWindow {
        return this._scrollable;
    }

    public set scrollH(param1: number) {
        if (this._SafeStr_2417) {
            if (this.setScrollPosition(param1, true)) {
                this.updateLiftSizeAndPosition();
            }
        }
    }

    public set scrollV(param1: number) {
        if (!this._SafeStr_2417) {
            if (this.setScrollPosition(param1, true)) {
                this.updateLiftSizeAndPosition();
            }
        }
    }

    public set scrollable(param1: IScrollableWindow) {
        if (this._scrollable != null && !this._scrollable.disposed) {
            this._scrollable.removeEventListener("WE_RESIZED", this.onScrollableChanged);
            this._scrollable.removeEventListener("WE_CHANGE", this.onScrollableChanged);
            this._scrollable.removeEventListener("WE_SCROLL", this.onScrollableScrolled);
        }
        this._scrollable = param1;
        if (this._scrollable != null && !this._scrollable.disposed) {
            this._scrollable.addEventListener("WE_RESIZED", this.onScrollableChanged);
            this._scrollable.addEventListener("WE_CHANGE", this.onScrollableChanged);
            this._scrollable.addEventListener("WE_SCROLL", this.onScrollableScrolled);
            this.setScrollPosition(this._SafeStr_2417 ? this._scrollable.scrollH : this._scrollable.scrollV, false);
            this.updateLiftSizeAndPosition();
        }
    }

    public get horizontal(): boolean {
        return this._SafeStr_2417;
    }

    public get vertical(): boolean {
        return !this._SafeStr_2417;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        let _loc2_: string = null;
        if (isIWindow(this._scrollable)) {
            _loc2_ = this._scrollable.name;
        } else if (this._targetName != null) {
            _loc2_ = this._targetName;
        }
        if (_loc2_ == null) {
            _loc1_.push(this.getDefaultProperty("scrollable"));
        } else {
            _loc1_.push(this.createProperty("scrollable", _loc2_));
        }
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: string = stringOrNull(_loc2_.key);
            if ("scrollable" === _loc3_) {
                this._targetName = typeof _loc2_.value === "string" ? _loc2_.value : null;
                this._scrollable = null;
            }
        }
        super.properties = param1;
    }

    protected get track(): WindowController {
        return asInstanceOf(this.findChildByName("slider_track"), WindowController);
    }

    protected get lift(): WindowController {
        return asInstanceOf(this.track.findChildByName("slider_bar"), WindowController);
    }

    public override dispose(): void {
        this.scrollable = null;
        if (this._SafeStr_15119 != null) {
            this._SafeStr_15119.dispose();
            this._SafeStr_15119 = null;
        }
        super.dispose();
    }

    public override enable(): boolean {
        let _loc1_: any[] = null;
        let _loc2_: any = 0;
        if (super.enable()) {
            _loc1_ = [];
            this.groupChildrenWithTag("_INTERNAL", _loc1_, -1);
            _loc2_ = 0;
            while (_loc2_ < _loc1_.length) {
                castGuarded(_loc1_[_loc2_], isIWindow, "com.sulake.core.window.IWindow").enable();
                _loc2_++;
            }
            return true;
        }
        return false;
    }

    public override disable(): boolean {
        let _loc1_: any[] = null;
        let _loc2_: any = 0;
        if (super.disable()) {
            _loc1_ = [];
            this.groupChildrenWithTag("_INTERNAL", _loc1_, -1);
            _loc2_ = 0;
            while (_loc2_ < _loc1_.length) {
                castGuarded(_loc1_[_loc2_], isIWindow, "com.sulake.core.window.IWindow").disable();
                _loc2_++;
            }
            return true;
        }
        return false;
    }

    protected setScrollPosition(param1: number, param2: boolean, param3: boolean = false): boolean {
        let _loc4_: boolean = false;
        if (this._scrollable == null || Boolean(this._scrollable.disposed)) {
            if (!this.resolveScrollTarget()) {
                return false;
            }
        }
        if (param1 < 0) {
            param1 = 0;
        }
        if (param1 > 1) {
            param1 = 1;
        }
        let _loc5_: number = param1 - this._offset;
        this._offset = param1;
        if (param2) {
            if (this._SafeStr_2417) {
                _loc4_ = this._scrollable.scrollH != this._offset;
                if (_loc4_) {
                    this._scrollable.scrollH = this._offset;
                }
            } else {
                _loc4_ = this._scrollable.scrollV != this._offset;
                if (_loc4_) {
                    this._scrollable.scrollV = this._offset;
                }
            }
        }
        if (!param3 && this._SafeStr_15119 != null && this._SafeStr_15119.isScrolling) {
            this._SafeStr_15119.adjustStartPosition(_loc5_);
        }
        return _loc4_;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: ScrollBarLiftController = null;
        let _loc5_: string = param1.name;
        if ("slider_bar" === _loc5_) {
            if (param2.type == "WE_CHILD_RELOCATED") {
                if (!this._SafeStr_3329) {
                    _loc3_ = castTo(param1, ScrollBarLiftController);
                    if (this._SafeStr_2417) {
                        this.setScrollPosition(_loc3_.scrollbarOffsetX, true);
                    } else {
                        this.setScrollPosition(_loc3_.scrollbarOffsetY, true);
                    }
                }
            }
        }
        let _loc4_: boolean = super.update(param1, param2);
        if (param2.type == "WE_PARENT_ADDED") {
            if (this._scrollable == null) {
                this.resolveScrollTarget();
            }
        }
        if (param1 == this) {
            if (param2.type == "WE_RESIZED") {
                this.updateLiftSizeAndPosition();
            } else if (param2.type == "WME_WHEEL") {
                this.scrollWithWheel(castTo(param2, WindowMouseEvent).delta);
                _loc4_ = true;
            }
        }
        return _loc4_;
    }

    private updateLiftSizeAndPosition(): void {
        let _loc3_: number = 0;
        let _loc4_: number = NaN;
        if (this._scrollable == null || Boolean(this._scrollable.disposed)) {
            if (this._disposed || !this.resolveScrollTarget()) {
                return;
            }
        }
        let _loc2_: WindowController = this.track;
        let _loc1_: WindowController = this.lift;
        if (_loc1_ != null) {
            if (this._SafeStr_2417) {
                _loc4_ = this._scrollable.visibleRegion.width / this._scrollable.scrollableRegion.width;
                if (_loc4_ > 1) {
                    _loc4_ = 1;
                }
                _loc3_ = _loc4_ * _loc2_.width | 0;
                _loc1_.width = _loc3_;
                _loc1_.x = Math.round(this._scrollable.scrollH * (_loc2_.width - _loc3_)) | 0;
            } else {
                _loc4_ = this._scrollable.visibleRegion.height / this._scrollable.scrollableRegion.height;
                if (_loc4_ > 1) {
                    _loc4_ = 1;
                }
                _loc3_ = _loc4_ * _loc2_.height | 0;
                _loc1_.height = _loc3_;
                _loc1_.y = Math.round(this._scrollable.scrollV * (_loc2_.height - _loc1_.height)) | 0;
            }
        }
        if (_loc4_ == 1) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private nullEventProc_ScrollBarController(param1: WindowEvent, param2: IWindow): void {
    }

    private scrollButtonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: IWindow = null;
        let _loc6_: boolean = false;
        if (param1.type == "WME_DOWN" || param1.type == "WTE_TAP") {
            if (param2.name == "increment") {
                if (this._scrollable) {
                    this._SafeStr_3329 = true;
                    if (this._SafeStr_2417) {
                        this.scrollH += 15 / this._scrollable.maxScrollH;
                    } else {
                        this.scrollV += 15 / this._scrollable.maxScrollV;
                    }
                    this._SafeStr_3329 = false;
                }
            } else if (param2.name == "decrement") {
                if (this._scrollable) {
                    this._SafeStr_3329 = true;
                    if (this._SafeStr_2417) {
                        this.scrollH -= 15 / this._scrollable.maxScrollH;
                    } else {
                        this.scrollV -= 15 / this._scrollable.maxScrollV;
                    }
                    this._SafeStr_3329 = false;
                }
            } else if (param2.name == "slider_track") {
                if (param1 instanceof WindowMouseEvent) {
                    _loc5_ = castTo(param1, WindowMouseEvent).localX | 0;
                    _loc4_ = castTo(param1, WindowMouseEvent).localY | 0;
                } else if (param1 instanceof WindowTouchEvent) {
                    _loc5_ = castTo(param1, WindowTouchEvent).localX | 0;
                    _loc4_ = castTo(param1, WindowTouchEvent).localY | 0;
                }
                _loc3_ = castTo(param2, WindowController).getChildByName("slider_bar");
                if (this._SafeStr_2417) {
                    if (_loc5_ < _loc3_.x) {
                        this.scrollH -= (this._scrollable.visibleRegion.width - 15) / this._scrollable.maxScrollH;
                    } else if (_loc5_ > _loc3_.right) {
                        this.scrollH += (this._scrollable.visibleRegion.width - 15) / this._scrollable.maxScrollH;
                    }
                } else if (_loc4_ < _loc3_.y) {
                    this.scrollV -= (this._scrollable.visibleRegion.height - 15) / this._scrollable.maxScrollV;
                } else if (_loc4_ > _loc3_.bottom) {
                    this.scrollV += (this._scrollable.visibleRegion.height - 15) / this._scrollable.maxScrollV;
                }
                _loc6_ = true;
            }
        }
        if (param1.type == "WME_WHEEL") {
            this.scrollWithWheel(castTo(param1, WindowMouseEvent).delta);
            _loc6_ = true;
        }
        if (_loc6_) {
            this.updateLiftSizeAndPosition();
        }
    }

    private resolveScrollTarget(): boolean {
        let _loc1_: IScrollableWindow = null;
        let _loc4_: IScrollableWindow = null;
        let _loc3_: any = 0;
        let _loc2_: any = 0;
        if (this._scrollable != null) {
            if (!this._scrollable.disposed) {
                return true;
            }
        }
        if (this._targetName != null) {
            _loc1_ = asGuarded(this.findParentByName(this._targetName), isIScrollableWindow);
            if (_loc1_ == null && isIWindowContainer(this._parent) && !(isIDesktopWindow(this._parent))) {
                _loc1_ = asGuarded(castGuarded(this._parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName(this._targetName), isIScrollableWindow);
                if (_loc1_) {
                    this.scrollable = _loc1_;
                    return true;
                }
            }
        }
        if (isIScrollableWindow(this._parent)) {
            this.scrollable = castGuarded(this._parent, isIScrollableWindow, "com.sulake.core.window.components.IScrollableWindow");
            return true;
        }
        if (isIWindowContainer(this._parent) && !(isIDesktopWindow(this._parent))) {
            _loc2_ = castGuarded(this._parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").numChildren >>> 0;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc4_ = asGuarded(castGuarded(this._parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(_loc3_ | 0), isIScrollableWindow);
                if (_loc4_) {
                    this.scrollable = _loc4_;
                    return true;
                }
                _loc3_++;
            }
        }
        return false;
    }

    private onScrollableChanged(param1: WindowEvent): void {
        this.updateLiftSizeAndPosition();
        this.setScrollPosition(this._offset, false);
    }

    private onScrollableScrolled(param1: WindowEvent): void {
        this.setScrollPosition(this._SafeStr_2417 ? this._scrollable.scrollH : this._scrollable.scrollV, false);
        this.updateLiftSizeAndPosition();
    }

    private scrollWithWheel(param1: number): boolean {
        return this._SafeStr_15119 != null && this._SafeStr_15119.scrollWithWheel(param1);
    }

    private getScrollOffset(): number {
        return this._offset;
    }

    private setSmoothScrollOffset(param1: number): void {
        if (this.setScrollPosition(param1, true, true)) {
            this.updateLiftSizeAndPosition();
        }
    }

    private getSmoothScrollAxisSize(): number {
        return 25 / this._SafeStr_3778;
    }

    protected override initInstanceFields(): void {
        this.nullEventProc_ScrollBarController = this.nullEventProc_ScrollBarController.bind(this);
        this.scrollButtonEventProc = this.scrollButtonEventProc.bind(this);
        this.onScrollableChanged = this.onScrollableChanged.bind(this);
        this.onScrollableScrolled = this.onScrollableScrolled.bind(this);
        this.getScrollOffset = this.getScrollOffset.bind(this);
        this.setSmoothScrollOffset = this.setSmoothScrollOffset.bind(this);
        this.getSmoothScrollAxisSize = this.getSmoothScrollAxisSize.bind(this);
        this._offset = 0;
        this._SafeStr_3778 = 0.1;
        this._SafeStr_2417 = false;
        this._SafeStr_3329 = false;
        super.initInstanceFields();
    }

    get [IScrollbarWindow](): true {
        return true;
    }
}
