import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IItemGridWindow, isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { IScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class ScrollableItemGridWindow extends WindowController implements IScrollableGridWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ScrollableItemGridWindow'); }

    declare private _SafeStr_3930: IItemGridWindow;

    declare private _SafeStr_2863: IScrollbarWindow;

    declare private _autoHideScrollBar: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._scrollBar.scrollable = this._itemGrid;
        if (this._scrollBar.testStateFlag(32)) {
            this.hideScrollBar();
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("spacing", this.spacing));
        _loc1_.push(this.createProperty("auto_arrange_items", this.autoArrangeItems));
        _loc1_.push(this.createProperty("scale_to_fit_items", this.scaleToFitItems));
        _loc1_.push(this.createProperty("resize_on_item_update", this.resizeOnItemUpdate));
        _loc1_.push(this.createProperty("allow_shift_scroll_horizontal", this.allowShiftScrollHorizontal));
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
                case "allow_shift_scroll_horizontal":
                    this.allowShiftScrollHorizontal = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "auto_arrange_items":
                    this.autoArrangeItems = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    public get autoHideScrollBar(): boolean {
        return this._autoHideScrollBar;
    }

    public set autoHideScrollBar(param1: boolean) {
        this._autoHideScrollBar = param1;
        this.updateScrollBarVisibility();
    }

    public get iterator(): IIterator {
        return this.isConstructionReady() ? this._itemGrid.iterator : null;
    }

    public get scrollH(): number {
        return this._itemGrid.scrollH;
    }

    public set scrollH(param1: number) {
        this._itemGrid.scrollH = param1;
    }

    public get scrollV(): number {
        return this._itemGrid.scrollV;
    }

    public set scrollV(param1: number) {
        this._itemGrid.scrollV = param1;
    }

    public get maxScrollH(): number {
        return this._itemGrid.maxScrollH;
    }

    public get maxScrollV(): number {
        return this._itemGrid.maxScrollV;
    }

    public get visibleRegion(): Rectangle {
        return this._itemGrid.visibleRegion;
    }

    public get scrollableRegion(): Rectangle {
        return this._itemGrid.scrollableRegion;
    }

    public get autoArrangeItems(): boolean {
        return this._itemGrid.autoArrangeItems;
    }

    public set autoArrangeItems(param1: boolean) {
        this._itemGrid.autoArrangeItems = param1;
    }

    public get numColumns(): number {
        return this._itemGrid.numColumns;
    }

    public get numRows(): number {
        return this._itemGrid.numRows;
    }

    public get numGridItems(): number {
        return this._itemGrid.numGridItems;
    }

    public get shouldRebuildGridOnResize(): boolean {
        return this._itemGrid.shouldRebuildGridOnResize;
    }

    public set shouldRebuildGridOnResize(param1: boolean) {
        this._itemGrid.shouldRebuildGridOnResize = param1;
    }

    public get spacing(): number {
        return this._itemGrid.spacing;
    }

    public set spacing(param1: number) {
        this._itemGrid.spacing = param1;
    }

    public set verticalSpacing(param1: number) {
        this._itemGrid.verticalSpacing = param1;
    }

    public get scaleToFitItems(): boolean {
        return this._itemGrid.scaleToFitItems;
    }

    public set scaleToFitItems(param1: boolean) {
        this._itemGrid.scaleToFitItems = param1;
    }

    public get resizeOnItemUpdate(): boolean {
        return this._itemGrid.resizeOnItemUpdate;
    }

    public set resizeOnItemUpdate(param1: boolean) {
        this._itemGrid.resizeOnItemUpdate = param1;
    }

    public get allowShiftScrollHorizontal(): boolean {
        return this._itemGrid.allowShiftScrollHorizontal;
    }

    public set allowShiftScrollHorizontal(param1: boolean) {
        this._itemGrid.allowShiftScrollHorizontal = param1;
    }

    public set containerResizeToColumns(param1: boolean) {
    }

    public get containerResizeToColumns(): boolean {
        return false;
    }

    protected get _itemGrid(): IItemGridWindow {
        if (!this._SafeStr_3930) {
            this._SafeStr_3930 = asGuarded(this.findChildByTag("_ITEMGRID"), isIItemGridWindow);
        }
        return this._SafeStr_3930;
    }

    protected get _scrollBar(): IScrollbarWindow {
        if (!this._SafeStr_2863) {
            this._SafeStr_2863 = asGuarded(this.findChildByTag("_SCROLLBAR"), isIScrollbarWindow);
            if (this._SafeStr_2863) {
                this._SafeStr_2863.addEventListener("WE_ENABLED", this.scrollBarEventProc);
                this._SafeStr_2863.addEventListener("WE_DISABLED", this.scrollBarEventProc);
            }
        }
        return this._SafeStr_2863;
    }

    public override dispose(): void {
        if (this._SafeStr_2863) {
            this._SafeStr_2863.removeEventListener("WE_ENABLED", this.scrollBarEventProc);
            this._SafeStr_2863.removeEventListener("WE_DISABLED", this.scrollBarEventProc);
            this._SafeStr_2863 = null;
        }
        if (this._SafeStr_3930) {
            this._SafeStr_3930 = null;
        }
        super.dispose();
    }

    public addGridItem(param1: IWindow): IWindow {
        return this._itemGrid.addGridItem(param1);
    }

    public addGridItemAt(param1: IWindow, param2: number): IWindow {
        return this._itemGrid.addGridItemAt(param1, param2);
    }

    public getGridItemAt(param1: number): IWindow {
        return this._itemGrid.getGridItemAt(param1);
    }

    public getGridItemByID(param1: number): IWindow {
        return this._itemGrid.getGridItemByID(param1);
    }

    public getGridItemByName(param1: string): IWindow {
        return this._itemGrid.getGridItemByName(param1);
    }

    public getGridItemByTag(param1: string): IWindow {
        return this._itemGrid.getGridItemByTag(param1);
    }

    public getGridItemIndex(param1: IWindow): number {
        return this._itemGrid.getGridItemIndex(param1);
    }

    public removeGridItem(param1: IWindow): IWindow {
        return this._itemGrid.removeGridItem(param1);
    }

    public removeGridItemAt(param1: number): IWindow {
        return this._itemGrid.removeGridItemAt(param1);
    }

    public setGridItemIndex(param1: IWindow, param2: number): void {
        this._itemGrid.setGridItemIndex(param1, param2);
    }

    public swapGridItems(param1: IWindow, param2: IWindow): void {
        this._itemGrid.swapGridItems(param1, param2);
    }

    public swapGridItemsAt(param1: number, param2: number): void {
        this._itemGrid.swapGridItemsAt(param1, param2);
    }

    public removeGridItems(): void {
        this._itemGrid.removeGridItems();
    }

    public destroyGridItems(): void {
        this._itemGrid.destroyGridItems();
    }

    public rebuildGridStructure(): void {
        this._itemGrid.rebuildGridStructure();
    }

    protected isConstructionReady(): boolean {
        return !!(this._itemGrid && this._scrollBar);
    }

    private scrollBarEventProc(param1: WindowEvent): void {
        if (param1.type == "WE_ENABLED") {
            this.showScrollBar();
        } else if (param1.type == "WE_DISABLED") {
            this.hideScrollBar();
        }
    }

    private hideScrollBar(): void {
        if (this._scrollBar.visible) {
            this._scrollBar.visible = false;
        }
    }

    private showScrollBar(): void {
        if (!this._scrollBar.visible) {
            this._scrollBar.visible = true;
        }
    }

    private updateScrollBarVisibility(): void {
        if (this._autoHideScrollBar) {
            if (this._scrollBar.testStateFlag(32)) {
                if (this._scrollBar.visible) {
                    this.hideScrollBar();
                }
            }
        } else if (this._scrollBar.visible) {
            this.showScrollBar();
        }
    }

    protected override initInstanceFields(): void {
        this.scrollBarEventProc = this.scrollBarEventProc.bind(this);
        this._autoHideScrollBar = true;
        super.initInstanceFields();
    }

    get [IScrollableGridWindow](): true {
        return true;
    }

    get [IItemGridWindow](): true {
        return true;
    }

    get [IScrollableWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
