import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IItemListWindow, isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { IScrollableWindow } from '@/com/sulake/core/window/components/IScrollableWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class ScrollableItemListWindow extends WindowController implements IScrollableWindow, IScrollableListWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ScrollableItemListWindow'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._scrollBar.scrollable = this._itemList;
        if (this._scrollBar.testStateFlag(32) && this._autoHideScrollBar) {
            this.hideScrollBar();
        }
        this._itemList.enableScrollByDragging = true;
    }

    declare private _SafeStr_4017: IItemListWindow;

    declare private _SafeStr_2863: IScrollbarWindow;

    declare private _autoHideScrollBar: boolean;

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("spacing", this.spacing));
        _loc1_.push(this.createProperty("auto_arrange_items", this.autoArrangeItems));
        _loc1_.push(this.createProperty("scale_to_fit_items", this.scaleToFitItems));
        _loc1_.push(this.createProperty("resize_on_item_update", this.resizeOnItemUpdate));
        _loc1_.push(this.createProperty("inverse_resize_on_item_update", this.inverseResizeOnItemUpdate));
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
                case "auto_arrange_items":
                    this.autoArrangeItems = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    public get scrollableWindow(): IWindow {
        return this._itemList;
    }

    public get isScrollBarVisible(): boolean {
        return this._scrollBar.visible;
    }

    public get autoHideScrollBar(): boolean {
        return this._autoHideScrollBar;
    }

    public set autoHideScrollBar(param1: boolean) {
        this._autoHideScrollBar = param1;
        this.updateScrollBarVisibility(true);
    }

    public get iterator(): IIterator {
        return this.isConstructionReady() ? this._itemList.iterator : null;
    }

    public get scrollH(): number {
        return this._itemList.scrollH;
    }

    public set scrollH(param1: number) {
        this._itemList.scrollH = param1;
    }

    public get scrollV(): number {
        return this._itemList.scrollV;
    }

    public set scrollV(param1: number) {
        this._itemList.scrollV = param1;
    }

    public get maxScrollH(): number {
        return this._itemList.maxScrollH;
    }

    public get maxScrollV(): number {
        return this._itemList.maxScrollV;
    }

    public get visibleRegion(): Rectangle {
        return this._itemList.visibleRegion;
    }

    public get scrollableRegion(): Rectangle {
        return this._itemList.scrollableRegion;
    }

    public get scrollStepH(): number {
        return this._itemList.scrollStepH;
    }

    public set scrollStepH(param1: number) {
        this._itemList.scrollStepH = param1;
    }

    public get scrollStepV(): number {
        return this._itemList.scrollStepV;
    }

    public set scrollStepV(param1: number) {
        this._itemList.scrollStepV = param1;
    }

    public get spacing(): number {
        return this._itemList.spacing;
    }

    public set spacing(param1: number) {
        this._itemList.spacing = param1;
    }

    public get scaleToFitItems(): boolean {
        return this._itemList.scaleToFitItems;
    }

    public set scaleToFitItems(param1: boolean) {
        this._itemList.scaleToFitItems = param1;
    }

    public get autoArrangeItems(): boolean {
        return this._itemList.autoArrangeItems;
    }

    public set autoArrangeItems(param1: boolean) {
        this._itemList.autoArrangeItems = param1;
    }

    public get resizeOnItemUpdate(): boolean {
        return this._itemList.resizeOnItemUpdate;
    }

    public set resizeOnItemUpdate(param1: boolean) {
        this._itemList.resizeOnItemUpdate = param1;
    }

    public get numListItems(): number {
        return this._itemList.numListItems;
    }

    public set disableAutodrag(param1: boolean) {
        this._itemList.disableAutodrag = param1;
    }

    public get isPartOfGridWindow(): boolean {
        return this._itemList.isPartOfGridWindow;
    }

    public set isPartOfGridWindow(param1: boolean) {
        this._itemList.disableAutodrag = param1;
    }

    public get inverseResizeOnItemUpdate(): boolean {
        return this._itemList.inverseResizeOnItemUpdate;
    }

    public set inverseResizeOnItemUpdate(param1: boolean) {
        this._itemList.inverseResizeOnItemUpdate = param1;
    }

    public get enableScrollByDragging(): boolean {
        return true;
    }

    public set enableScrollByDragging(param1: boolean) {
    }

    protected get _itemList(): IItemListWindow {
        if (!this._SafeStr_4017) {
            this._SafeStr_4017 = asGuarded(this.findChildByTag("_ITEMLIST"), isIItemListWindow);
        }
        return this._SafeStr_4017;
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
        if (this._SafeStr_4017) {
            this._SafeStr_4017 = null;
        }
        super.dispose();
    }

    public scrollWithWheel(param1: number): void {
        this._itemList.scrollWithWheel(param1);
    }

    public addListItem(param1: IWindow): IWindow {
        return this._itemList.addListItem(param1);
    }

    public addListItemAt(param1: IWindow, param2: number): IWindow {
        return this._itemList.addListItemAt(param1, param2);
    }

    public getListItemAt(param1: number): IWindow {
        return this._itemList.getListItemAt(param1);
    }

    public getListItemByID(param1: number): IWindow {
        return this._itemList.getListItemByID(param1);
    }

    public getListItemByName(param1: string): IWindow {
        return this._itemList.getListItemByName(param1);
    }

    public getListItemByTag(param1: string): IWindow {
        return this._itemList.getListItemByTag(param1);
    }

    public getListItemIndex(param1: IWindow): number {
        return this._itemList.getListItemIndex(param1);
    }

    public removeListItem(param1: IWindow): IWindow {
        return this._itemList.removeListItem(param1);
    }

    public removeListItemAt(param1: number): IWindow {
        return this._itemList.removeListItemAt(param1);
    }

    public setListItemIndex(param1: IWindow, param2: number): void {
        this._itemList.setListItemIndex(param1, param2);
    }

    public swapListItems(param1: IWindow, param2: IWindow): void {
        this._itemList.swapListItems(param1, param2);
    }

    public swapListItemsAt(param1: number, param2: number): void {
        this._itemList.swapListItemsAt(param1, param2);
    }

    public groupListItemsWithID(param1: number, param2: any[], param3: number = 0): number {
        return this._itemList.groupListItemsWithID(param1, param2, param3);
    }

    public groupListItemsWithTag(param1: string, param2: any[], param3: number = 0): number {
        return this._itemList.groupListItemsWithTag(param1, param2, param3);
    }

    public removeListItems(): void {
        this._itemList.removeListItems();
    }

    public destroyListItems(): void {
        this._itemList.destroyListItems();
    }

    public arrangeListItems(): void {
        this._itemList.arrangeListItems();
    }

    public stopDragging(): void {
        this._itemList.stopDragging();
    }

    protected isConstructionReady(): boolean {
        return !!(this._itemList && this._scrollBar);
    }

    private scrollBarEventProc(param1: WindowEvent): void {
        if (param1.type == "WE_ENABLED") {
            this.showScrollBar();
        } else if (param1.type == "WE_DISABLED" && this._autoHideScrollBar) {
            this.hideScrollBar();
        }
    }

    private hideScrollBar(): void {
        if (this._scrollBar.visible) {
            this._scrollBar.visible = false;
            this._itemList.width = this._SafeStr_2132;
        }
    }

    private showScrollBar(): void {
        if (!this._scrollBar.visible) {
            this._scrollBar.visible = true;
            this._itemList.width = this._SafeStr_2132 - this._scrollBar.width;
        }
    }

    private updateScrollBarVisibility(param1: boolean = false): void {
        if (this._autoHideScrollBar) {
            if (this._scrollBar.testStateFlag(32)) {
                if (this._scrollBar.visible) {
                    this.hideScrollBar();
                }
            }
        } else if (param1 || Boolean(this._scrollBar.visible)) {
            this.showScrollBar();
        }
    }

    protected override initInstanceFields(): void {
        this.scrollBarEventProc = this.scrollBarEventProc.bind(this);
        this._autoHideScrollBar = true;
        super.initInstanceFields();
    }

    get [IScrollableWindow](): true {
        return true;
    }

    get [IScrollableListWindow](): true {
        return true;
    }

    get [IItemListWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
