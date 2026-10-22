import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IItemListWindow, isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { ItemListIterator } from '@/com/sulake/core/window/iterators/ItemListIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IInputProcessorRoot } from '@/com/sulake/core/window/utils/IInputProcessorRoot';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { SmoothScroller } from '@/com/sulake/core/window/utils/SmoothScroller';

const preSuperItemListController: ((self: ItemListController) => void)[] = [];

export class ItemListController extends WindowController implements IItemListWindow, IInputProcessorRoot {
    static { registerClassName(this, 'com.sulake.core.window.components::ItemListController'); }

    declare private _SafeStr_5823: boolean;

    declare protected _SafeStr_2950: number;

    declare protected _SafeStr_2895: number;

    declare protected _scrollAreaWidth: number;

    declare protected _SafeStr_2247: number;

    declare protected _container: IWindowContainer;

    declare protected _SafeStr_5357: boolean;

    declare protected _SafeStr_2489: boolean;

    declare protected _spacing: number;

    declare protected _SafeStr_2417: boolean;

    declare protected _arrangeListItems: boolean;

    declare protected _scaleToFitItems: boolean;

    declare protected _resizeOnItemUpdate: boolean;

    declare protected _inverseResizeOnItemUpdate: boolean;

    declare protected _SafeStr_15121: boolean;

    declare protected _SafeStr_15122: SmoothScroller;

    declare protected _SafeStr_15123: SmoothScroller;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: IThemeManager;
        preSuperItemListController.push((self: ItemListController) => {
            self._SafeStr_2417 = param2 == 51;
            self._spacing = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("spacing").value | 0;
            self._arrangeListItems = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("auto_arrange_items").value;
            self._scaleToFitItems = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("scale_to_fit_items").value;
            self._resizeOnItemUpdate = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("resize_on_item_update").value;
            self._inverseResizeOnItemUpdate = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("inverse_resize_on_item_update").value;
            self._SafeStr_15121 = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("allow_shift_scroll_horizontal").value;
        });
        _loc12_ = param5.getWindowFactory().getThemeManager();
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_2451 = this._background || !this.testParamFlag(16);
        this._container = asGuarded(this._context.create("_CONTAINER", "", 4, 0, (0x10 | 0 | 0) >>> 0, new Rectangle(0, 0, this.width, this.height), null, this, 0, null, "", ["_INTERNAL", "_EXCLUDE"]), isIWindowContainer);
        this._container.addEventListener("WE_RESIZED", this.containerEventHandler);
        this._container.addEventListener("WE_CHILD_REMOVED", this.containerEventHandler);
        this._container.addEventListener("WE_CHILD_RESIZED", this.containerEventHandler);
        this._container.addEventListener("WE_CHILD_VISIBILITY", this.containerEventHandler);
        this._container.addEventListener("WE_CHILD_RELOCATED", this.containerEventHandler);
        this._container.clipping = this.clipping;
        this.resizeOnItemUpdate = this._resizeOnItemUpdate;
    }

    public get spacing(): number {
        return this._spacing;
    }

    public set spacing(param1: number) {
        if (param1 != this._spacing) {
            this._spacing = param1;
            this.updateScrollAreaRegion();
        }
    }

    public get scrollH(): number {
        return this._SafeStr_2950;
    }

    public get scrollV(): number {
        return this._SafeStr_2895;
    }

    public get maxScrollH(): number {
        return Math.max(0, this._scrollAreaWidth - this.width) | 0;
    }

    public get maxScrollV(): number {
        return Math.max(0, this._SafeStr_2247 - this.height) | 0;
    }

    public get isPartOfGridWindow(): boolean {
        return this._SafeStr_5823;
    }

    public set isPartOfGridWindow(param1: boolean) {
        this._SafeStr_5823 = param1;
    }

    public get allowShiftScrollHorizontal(): boolean {
        return this._SafeStr_15121;
    }

    public set allowShiftScrollHorizontal(param1: boolean) {
        this._SafeStr_15121 = param1;
    }

    public get scrollableWindow(): IWindow {
        return this;
    }

    public get visibleRegion(): Rectangle {
        return new Rectangle(this._SafeStr_2950 * this.maxScrollH, this._SafeStr_2895 * this.maxScrollV, this.width, this.height);
    }

    public get scrollableRegion(): Rectangle {
        return this._container.rectangle;
    }

    public set scrollH(param1: number) {
        this.setScrollH(param1, false);
    }

    private setScrollH(param1: number, param2: boolean): void {
        let _loc5_: WindowEvent = null;
        let _loc4_: number = this.maxScrollH;
        if (!isFinite(_loc4_) || _loc4_ <= 0) {
            param1 = 0;
        }
        if (param1 < 0) {
            param1 = 0;
        }
        if (param1 > 1) {
            param1 = 1;
        }
        let _loc3_: number = param1 - this._SafeStr_2950;
        if (param1 != this._SafeStr_2950) {
            this._SafeStr_2950 = param1;
            this._container.x = -this._SafeStr_2950 * _loc4_ | 0;
            this._context.invalidate(this._container, this.visibleRegion, 1);
            if (this._events) {
                _loc5_ = WindowEvent.allocate("WE_SCROLL", this, null);
                this._events.dispatchEvent(_loc5_);
                _loc5_.recycle();
            }
        }
        if (!param2 && this._SafeStr_15122 != null && this._SafeStr_15122.isScrolling) {
            this._SafeStr_15122.adjustStartPosition(_loc3_);
        }
    }

    public set scrollV(param1: number) {
        this.setScrollV(param1, false);
    }

    private setScrollV(param1: number, param2: boolean): void {
        let _loc4_: WindowEvent = null;
        let _loc5_: number = this.maxScrollV;
        if (!isFinite(_loc5_) || _loc5_ <= 0) {
            param1 = 0;
        }
        if (param1 < 0) {
            param1 = 0;
        }
        if (param1 > 1) {
            param1 = 1;
        }
        let _loc3_: number = param1 - this._SafeStr_2895;
        if (param1 != this._SafeStr_2895) {
            this._SafeStr_2895 = param1;
            this._container.y = -this._SafeStr_2895 * _loc5_ | 0;
            this._context.invalidate(this._container, this.visibleRegion, 1);
            if (this._events) {
                _loc4_ = WindowEvent.allocate("WE_SCROLL", this, null);
                this._events.dispatchEvent(_loc4_);
                _loc4_.recycle();
            }
        }
        if (!param2 && this._SafeStr_15123 != null && this._SafeStr_15123.isScrolling) {
            this._SafeStr_15123.adjustStartPosition(_loc3_);
        }
    }

    public set scaleToFitItems(param1: boolean) {
        if (this._scaleToFitItems != param1) {
            this._scaleToFitItems = param1;
            this.updateScrollAreaRegion();
        }
    }

    public get scaleToFitItems(): boolean {
        return this._scaleToFitItems;
    }

    public set autoArrangeItems(param1: boolean) {
        this._arrangeListItems = param1;
        this.updateScrollAreaRegion();
    }

    public get autoArrangeItems(): boolean {
        return this._arrangeListItems;
    }

    public set resizeOnItemUpdate(param1: boolean) {
        this._resizeOnItemUpdate = param1;
        if (this._container) {
            if (this._SafeStr_2417) {
                this._container.setParamFlag(4194304, param1);
            } else {
                this._container.setParamFlag(8388608, param1);
            }
        }
    }

    public set inverseResizeOnItemUpdate(param1: boolean) {
        if (param1 != this._inverseResizeOnItemUpdate) {
            this._inverseResizeOnItemUpdate = param1;
            if (this._container) {
                if (this._SafeStr_2417) {
                    this._container.setParamFlag(8388608, param1);
                } else {
                    this._container.setParamFlag(4194304, param1);
                }
            }
            this.updateScrollAreaRegion();
        }
    }

    public get resizeOnItemUpdate(): boolean {
        return this._resizeOnItemUpdate;
    }

    public get inverseResizeOnItemUpdate(): boolean {
        return this._inverseResizeOnItemUpdate;
    }

    public get iterator(): IIterator {
        return new ItemListIterator(this);
    }

    public get firstListItem(): IWindow {
        return this.numListItems > 0 ? this.getListItemAt(0) : null;
    }

    public get lastListItem(): IWindow {
        return this.numListItems > 0 ? this.getListItemAt(this.numListItems - 1 >>> 0) : null;
    }

    public override set clipping(param1: boolean) {
        super.clipping = param1;
        if (this._container) {
            this._container.clipping = param1;
        }
    }

    public override dispose(): void {
        if (!this._disposed) {
            this._container.removeEventListener("WE_RESIZED", this.containerEventHandler);
            this._container.removeEventListener("WE_CHILD_REMOVED", this.containerEventHandler);
            this._container.removeEventListener("WE_CHILD_RESIZED", this.containerEventHandler);
            this._container.removeEventListener("WE_CHILD_VISIBILITY", this.containerEventHandler);
            this._container.removeEventListener("WE_CHILD_RELOCATED", this.containerEventHandler);
            if (this._SafeStr_15122 != null) {
                this._SafeStr_15122.dispose();
                this._SafeStr_15122 = null;
            }
            if (this._SafeStr_15123 != null) {
                this._SafeStr_15123.dispose();
                this._SafeStr_15123 = null;
            }
            super.dispose();
        }
    }

    protected override cloneChildWindows(param1: WindowController): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this.numListItems) {
            castGuarded(param1, isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").addListItem(this.getListItemAt(_loc2_ >>> 0).clone());
            _loc2_++;
        }
    }

    public get numListItems(): number {
        return this._container != null ? this._container.numChildren : 0;
    }

    public addListItem(param1: IWindow): IWindow {
        this._SafeStr_2489 = true;
        if (this._SafeStr_2417) {
            param1.x = this._scrollAreaWidth + (this.numListItems > 0 ? this._spacing : 0) | 0;
            this._scrollAreaWidth = param1.right;
            this._container.width = this._scrollAreaWidth | 0;
        } else {
            if (this.autoArrangeItems) {
                param1.y = this._SafeStr_2247 + (this.numListItems > 0 ? this._spacing : 0) | 0;
                this._SafeStr_2247 = param1.bottom;
            } else {
                this._SafeStr_2247 = Math.max(this._SafeStr_2247, param1.bottom);
            }
            this._container.height = this._SafeStr_2247 | 0;
        }
        param1 = this._container.addChild(param1);
        this._SafeStr_2489 = false;
        return param1;
    }

    public addListItemAt(param1: IWindow, param2: number): IWindow {
        param1 = this._container.addChildAt(param1, param2 | 0);
        this.updateScrollAreaRegion();
        return param1;
    }

    public getListItemAt(param1: number): IWindow {
        return this._container.getChildAt(param1 | 0);
    }

    public getListItemByID(param1: number): IWindow {
        return this._container.getChildByID(param1 | 0);
    }

    public getListItemByName(param1: string): IWindow {
        return this._container.getChildByName(param1);
    }

    public getListItemByTag(param1: string): IWindow {
        return this._container.getChildByTag(param1);
    }

    public getListItemIndex(param1: IWindow): number {
        return this._container.getChildIndex(param1);
    }

    public removeListItem(param1: IWindow): IWindow {
        param1 = this._container.removeChild(param1);
        if (param1) {
            this.updateScrollAreaRegion();
        }
        return param1;
    }

    public removeListItemAt(param1: number): IWindow {
        return this._container.removeChildAt(param1);
    }

    public setListItemIndex(param1: IWindow, param2: number): void {
        this._container.setChildIndex(param1, param2);
    }

    public swapListItems(param1: IWindow, param2: IWindow): void {
        this._container.swapChildren(param1, param2);
        this.updateScrollAreaRegion();
    }

    public swapListItemsAt(param1: number, param2: number): void {
        this._container.swapChildrenAt(param1, param2);
        this.updateScrollAreaRegion();
    }

    public groupListItemsWithID(param1: number, param2: any[], param3: number = 0): number {
        return this._container.groupChildrenWithID(param1, param2, param3);
    }

    public groupListItemsWithTag(param1: string, param2: any[], param3: number = 0): number {
        return this._container.groupChildrenWithTag(param1, param2, param3);
    }

    public removeListItems(): void {
        this._SafeStr_2489 = true;
        while (this.numListItems > 0) {
            this._container.removeChildAt(0);
        }
        this._SafeStr_2489 = false;
        this.updateScrollAreaRegion();
    }

    public destroyListItems(): void {
        this._SafeStr_2489 = true;
        while (this.numListItems > 0) {
            this._container.removeChildAt(0).destroy();
        }
        this._SafeStr_2489 = false;
        this.updateScrollAreaRegion();
    }

    public arrangeListItems(): void {
        this.updateScrollAreaRegion();
    }

    public override populate(param1: any[]): void {
        castTo(this._container, WindowController).populate(param1);
        this.updateScrollAreaRegion();
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: boolean = super.update(param1, param2);
        switch (param2.type) {
            case "WE_RESIZE":
                this._SafeStr_5357 = true;
                break;
            case "WE_RESIZED":
                if (!this._scaleToFitItems && !this._inverseResizeOnItemUpdate) {
                    if (this._SafeStr_2417) {
                        this._container.height = this._height;
                    } else {
                        this._container.width = this._SafeStr_2132;
                    }
                }
                this.updateScrollAreaRegion();
                this._SafeStr_5357 = false;
                break;
            default:
                if (param2 instanceof WindowEvent) {
                    _loc3_ = this.process(param2 instanceof WindowEvent ? param2 : null);
                }
        }
        return _loc3_;
    }

    public override validateLocalPointIntersection(param1: Point, param2: BitmapData): boolean {
        return this.isInWindowBounds(param1);
    }

    public process(param1: WindowEvent): boolean {
        if (!(param1 instanceof WindowMouseEvent)) {
            return false;
        }
        switch (param1.type) {
            case "WME_WHEEL":
            case "WME_WHEEL_HORIZONTAL":
                break;
            default:
                return false;
        }
        if (this._SafeStr_5823) {
            return false;
        }
        return this.handleScrollWheelEvent(param1);
    }

    protected get isScrollHorizontal(): boolean {
        return this._SafeStr_2417;
    }

    public scrollWithWheel(param1: number, param2: boolean): boolean {
        return this.getSmoothScroller(param2).scrollWithWheel(param1);
    }

    protected handleScrollWheelEvent(param1: WindowEvent): boolean {
        let _loc2_: WindowMouseEvent = castTo(param1, WindowMouseEvent);
        let _loc3_: boolean = this.getScrollWheelHorizontal(_loc2_);
        if (_loc2_.type == "WME_WHEEL_HORIZONTAL" && !_loc3_) {
            return false;
        }
        return this.scrollWithWheel(this.getScrollWheelDelta(_loc2_), _loc3_);
    }

    protected getScrollWheelHorizontal(param1: WindowMouseEvent): boolean {
        if (param1.type == "WME_WHEEL" && param1.shiftKey && this._SafeStr_15121) {
            return true;
        }
        return this.isScrollHorizontal;
    }

    protected getScrollWheelDelta(param1: WindowMouseEvent): number {
        if (param1 == null) {
            return 0;
        }
        return param1.type == "WME_WHEEL_HORIZONTAL" ? -param1.delta : param1.delta;
    }

    private getSmoothScroller(param1: boolean): SmoothScroller {
        return param1 ? this.horizontalSmoothScroller : this.verticalSmoothScroller;
    }

    private get horizontalSmoothScroller(): SmoothScroller {
        if (this._SafeStr_15122 == null) {
            this._SafeStr_15122 = new SmoothScroller(this.getHorizontalScrollPosition, this.setHorizontalSmoothScrollPosition, this.getHorizontalMaxScroll);
        }
        return this._SafeStr_15122;
    }

    private get verticalSmoothScroller(): SmoothScroller {
        if (this._SafeStr_15123 == null) {
            this._SafeStr_15123 = new SmoothScroller(this.getVerticalScrollPosition, this.setVerticalSmoothScrollPosition, this.getVerticalMaxScroll);
        }
        return this._SafeStr_15123;
    }

    private getHorizontalScrollPosition(): number {
        return this.scrollH;
    }

    private setHorizontalSmoothScrollPosition(param1: number): void {
        this.setScrollH(param1, true);
    }

    private getHorizontalMaxScroll(): number {
        return this.maxScrollH;
    }

    private getVerticalScrollPosition(): number {
        return this.scrollV;
    }

    private setVerticalSmoothScrollPosition(param1: number): void {
        this.setScrollV(param1, true);
    }

    private getVerticalMaxScroll(): number {
        return this.maxScrollV;
    }

    private setAbsoluteScrollH(param1: number): void {
        let _loc2_: number = this.maxScrollH;
        if (!isFinite(_loc2_) || _loc2_ <= 0) {
            this._SafeStr_2950 = 0;
            this._container.x = 0;
            return;
        }
        param1 = Number(Math.max(0, Math.min(param1, _loc2_)));
        this._SafeStr_2950 = param1 / _loc2_;
        this._container.x = -param1 | 0;
    }

    private setAbsoluteScrollV(param1: number): void {
        let _loc2_: number = this.maxScrollV;
        if (!isFinite(_loc2_) || _loc2_ <= 0) {
            this._SafeStr_2895 = 0;
            this._container.y = 0;
            return;
        }
        param1 = Number(Math.max(0, Math.min(param1, _loc2_)));
        this._SafeStr_2895 = param1 / _loc2_;
        this._container.y = -param1 | 0;
    }

    private containerEventHandler(param1: WindowEvent): void {
        let _loc2_: WindowEvent = null;
        switch (param1.type) {
            case "WE_CHILD_REMOVED":
                this.updateScrollAreaRegion();
                break;
            case "WE_CHILD_RESIZED":
                if (!this._SafeStr_5357) {
                    this.updateScrollAreaRegion();
                }
                break;
            case "WE_CHILD_VISIBILITY":
                this.updateScrollAreaRegion();
                break;
            case "WE_CHILD_RELOCATED":
                this.updateScrollAreaRegion();
                break;
            case "WE_RESIZED":
                if (this._events) {
                    _loc2_ = WindowEvent.allocate("WE_RESIZED", this, null);
                    this._events.dispatchEvent(_loc2_);
                    _loc2_.recycle();
                }
        }
    }

    protected updateScrollAreaRegion(): void {
        let _loc6_: number = NaN;
        let _loc5_: number = NaN;
        let _loc7_: IWindow = null;
        let _loc1_: number = 0;
        let _loc3_: any = 0;
        let _loc4_: number = 0;
        let _loc2_: any = 0;
        if (this._arrangeListItems && !this._SafeStr_2489 && this._container) {
            this._SafeStr_2489 = true;
            _loc6_ = Number(Math.max(0, -this._container.x));
            _loc5_ = Number(Math.max(0, -this._container.y));
            _loc2_ = this._container.numChildren >>> 0;
            if (this._SafeStr_2417) {
                this._scrollAreaWidth = 0;
                this._SafeStr_2247 = this._height;
                _loc4_ = 0;
                _loc3_ = 0;
                while (_loc3_ < _loc2_) {
                    _loc7_ = this._container.getChildAt(_loc3_ | 0);
                    if (_loc7_.visible) {
                        _loc7_.x = this._scrollAreaWidth | 0;
                        this._scrollAreaWidth += _loc7_.width + this._spacing;
                        if (this._scaleToFitItems) {
                            _loc1_ = _loc7_.height + _loc7_.y;
                            this._SafeStr_2247 = _loc1_ > this._SafeStr_2247 ? _loc1_ : this._SafeStr_2247;
                        }
                        if (this._inverseResizeOnItemUpdate) {
                            _loc1_ = this.getChildRequiredVerticalSpace(_loc7_);
                            _loc4_ = _loc1_ > _loc4_ ? _loc1_ : _loc4_;
                        }
                    }
                    _loc3_++;
                }
                if (_loc2_ > 0) {
                    this._scrollAreaWidth -= this._spacing;
                }
            } else {
                this._scrollAreaWidth = this._SafeStr_2132;
                this._SafeStr_2247 = 0;
                _loc4_ = 0;
                _loc3_ = 0;
                while (_loc3_ < _loc2_) {
                    _loc7_ = this._container.getChildAt(_loc3_ | 0);
                    if (_loc7_.visible) {
                        _loc7_.y = this._SafeStr_2247 | 0;
                        this._SafeStr_2247 += _loc7_.height + this._spacing;
                        if (this._scaleToFitItems) {
                            _loc1_ = _loc7_.width + _loc7_.x;
                            this._scrollAreaWidth = _loc1_ > this._scrollAreaWidth ? _loc1_ : this._scrollAreaWidth;
                        }
                        if (this._inverseResizeOnItemUpdate) {
                            _loc1_ = this.getChildRequiredHorizontalSpace(_loc7_);
                            _loc4_ = _loc1_ > _loc4_ ? _loc1_ : _loc4_;
                        }
                    }
                    _loc3_++;
                }
                if (_loc2_ > 0) {
                    this._SafeStr_2247 -= this._spacing;
                }
            }
            this.setAbsoluteScrollH(_loc6_);
            this.setAbsoluteScrollV(_loc5_);
            this._container.height = this._SafeStr_2247 | 0;
            this._container.width = this._scrollAreaWidth | 0;
            if (this._inverseResizeOnItemUpdate) {
                if (this._SafeStr_2417) {
                    this.limits.minHeight = _loc4_;
                    this.limits.maxHeight = _loc4_;
                    this._container.height = _loc4_;
                } else {
                    this.limits.minWidth = _loc4_;
                    this.limits.maxWidth = _loc4_;
                    this._container.width = _loc4_;
                }
            }
            this._SafeStr_2489 = false;
        }
    }

    private getChildRequiredHorizontalSpace(param1: IWindow): number {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = (param1.param & 0xC0) >>> 0;
        if (_loc2_ == 128) {
            _loc4_ = Math.max(0, param1.x) | 0;
            _loc3_ = Math.max(0, this._SafeStr_2132 - param1.x - param1.width) | 0;
            return param1.limits.minWidth + _loc4_ + _loc3_;
        }
        if (_loc2_ == 64) {
            return this._SafeStr_2132 - param1.x;
        }
        if (_loc2_ == 192) {
            return param1.width;
        }
        return param1.x + param1.width;
    }

    private getChildRequiredVerticalSpace(param1: IWindow): number {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = (param1.param & 0x0C00) >>> 0;
        if (_loc4_ == 2048) {
            _loc2_ = param1.y;
            _loc3_ = this._height - param1.y - param1.height;
            return param1.limits.minWidth + _loc2_ + _loc3_;
        }
        if (_loc4_ == 1024) {
            return this._height - param1.y;
        }
        if (_loc4_ == 3072) {
            return param1.height;
        }
        return param1.y + param1.height;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("spacing", this._spacing));
        _loc1_.push(this.createProperty("auto_arrange_items", this._arrangeListItems));
        _loc1_.push(this.createProperty("scale_to_fit_items", this._scaleToFitItems));
        _loc1_.push(this.createProperty("resize_on_item_update", this._resizeOnItemUpdate));
        _loc1_.push(this.createProperty("inverse_resize_on_item_update", this._inverseResizeOnItemUpdate));
        _loc1_.push(this.createProperty("allow_shift_scroll_horizontal", this._SafeStr_15121));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "spacing":
                    this.spacing = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
                    break;
                case "scale_to_fit_items":
                    this.scaleToFitItems = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "resize_on_item_update":
                    this.resizeOnItemUpdate = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "inverse_resize_on_item_update":
                    this.inverseResizeOnItemUpdate = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "allow_shift_scroll_horizontal":
                    this.allowShiftScrollHorizontal = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "auto_arrange_items":
                    this._arrangeListItems = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this.getHorizontalScrollPosition = this.getHorizontalScrollPosition.bind(this);
        this.setHorizontalSmoothScrollPosition = this.setHorizontalSmoothScrollPosition.bind(this);
        this.getHorizontalMaxScroll = this.getHorizontalMaxScroll.bind(this);
        this.getVerticalScrollPosition = this.getVerticalScrollPosition.bind(this);
        this.setVerticalSmoothScrollPosition = this.setVerticalSmoothScrollPosition.bind(this);
        this.getVerticalMaxScroll = this.getVerticalMaxScroll.bind(this);
        this.containerEventHandler = this.containerEventHandler.bind(this);
        this._SafeStr_5823 = false;
        this._SafeStr_2950 = 0;
        this._SafeStr_2895 = 0;
        this._scrollAreaWidth = 0;
        this._SafeStr_2247 = 0;
        this._SafeStr_5357 = false;
        this._SafeStr_2489 = false;
        this._spacing = 0;
        this._SafeStr_2417 = false;
        this._arrangeListItems = false;
        this._scaleToFitItems = false;
        this._resizeOnItemUpdate = false;
        this._inverseResizeOnItemUpdate = false;
        this._SafeStr_15121 = false;
        preSuperItemListController.pop()!(this);
        super.initInstanceFields();
    }

    public override get clipping(): boolean {
        return super.clipping;
    }

    get [IItemListWindow](): true {
        return true;
    }

    get [IScrollableWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IInputProcessorRoot](): true {
        return true;
    }
}
