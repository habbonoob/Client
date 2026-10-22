import { asGuarded, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ItemListController } from '@/com/sulake/core/window/Classes.group';
import { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { ItemGridIterator } from '@/com/sulake/core/window/iterators/ItemGridIterator';
import { isIWindow } from '@/com/sulake/core/window/IWindow';

export class ItemGridController extends ItemListController implements IItemGridWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ItemGridController'); }

    declare private _SafeStr_5865: boolean;

    declare private _SafeStr_5858: boolean;

    declare private _SafeStr_6732: number;

    declare private _shouldRebuildGridOnResize: boolean;

    declare private _isGridRebuilding: boolean;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_2417 = param2 != 54;
        this._scaleToFitItems = true;
        if (!this._SafeStr_2417) {
            throw new Error("Horizontal item grid not yet implemented!");
        }
    }

    public override set spacing(param1: number) {
        let _loc2_: number = this.numListItems >>> 0;
        if (this._SafeStr_5858 == false) {
            while (_loc2_-- > 0) {
                castGuarded(this.getListItemAt(_loc2_), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").spacing = param1;
            }
        }
        super.spacing = param1;
    }

    public override set background(param1: boolean) {
        let _loc2_: any = 0;
        super.background = param1;
        _loc2_ = 0;
        while (_loc2_ < this.numListItems) {
            this.getListItemAt(_loc2_ >>> 0).background = param1;
            _loc2_++;
        }
    }

    public override set color(param1: number) {
        let _loc2_: any = 0;
        super.color = param1;
        _loc2_ = 0;
        while (_loc2_ < this.numListItems) {
            this.getListItemAt(_loc2_ >>> 0).color = param1;
            _loc2_++;
        }
    }

    public override set autoArrangeItems(param1: boolean) {
        let _loc2_: number = 0;
        super.autoArrangeItems = param1;
        _loc2_ = 0;
        while (_loc2_ < this.numColumns) {
            castGuarded(this.getListItemAt(_loc2_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").autoArrangeItems = param1;
            _loc2_++;
        }
    }

    public get shouldRebuildGridOnResize(): boolean {
        return this._shouldRebuildGridOnResize;
    }

    public set shouldRebuildGridOnResize(param1: boolean) {
        this._shouldRebuildGridOnResize = param1;
    }

    public set verticalSpacing(param1: number) {
        this._SafeStr_6732 = param1;
        this._SafeStr_5858 = true;
        let _loc2_: number = this.numListItems >>> 0;
        while (_loc2_-- > 0) {
            castGuarded(this.getListItemAt(_loc2_), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").spacing = param1;
        }
    }

    public override get iterator(): IIterator {
        return new ItemGridIterator(this);
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: WindowMouseEvent = null;
        let _loc4_: boolean = false;
        let _loc5_: boolean = super.update(param1, param2);
        switch (param2.type) {
            case "WE_RESIZED":
                if (this._shouldRebuildGridOnResize) {
                    this.rebuildGridStructure();
                }
                break;
            case "WME_WHEEL":
            case "WME_WHEEL_HORIZONTAL":
                _loc3_ = castTo(param2, WindowMouseEvent);
                _loc4_ = this.getScrollWheelHorizontal(_loc3_);
                if (_loc3_.type != "WME_WHEEL_HORIZONTAL" || _loc4_) {
                    this.scrollWithWheel(this.getScrollWheelDelta(_loc3_) * 0.5, _loc4_);
                    _loc5_ = true;
                }
        }
        return _loc5_;
    }

    protected override get isScrollHorizontal(): boolean {
        return !this._SafeStr_2417;
    }

    public get numGridItems(): number {
        let _loc1_: number = this.numListItems >>> 0;
        let _loc2_: number = 0;
        while (_loc1_-- > 0) {
            _loc2_ += castGuarded(this.getListItemAt(_loc1_), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").numListItems;
        }
        return _loc2_;
    }

    public get numColumns(): number {
        return this.numListItems >>> 0;
    }

    public get numRows(): number {
        let _loc2_: any = 0;
        let _loc3_: number = 0;
        let _loc1_: number = this.numColumns;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            _loc3_ = Math.max(_loc3_, castGuarded(this.getListItemAt(_loc2_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").numListItems) >>> 0;
            _loc2_++;
        }
        return _loc3_;
    }

    public addGridItem(param1: IWindow): IWindow {
        let _loc2_: IItemListWindow = this.resolveColumnForNextItem(param1);
        return param1;
    }

    public addGridItemAt(param1: IWindow, param2: number): IWindow {
        this.offsetGridItemsForwards(param1, Math.min(this.numGridItems, param2) >>> 0);
        return param1;
    }

    public getGridItemAt(param1: number): IWindow {
        let _loc2_: IItemListWindow = this.resolveColumnByIndex(param1);
        if (_loc2_ == null) {
            return null;
        }
        return _loc2_.getListItemAt(param1 / this.numColumns >>> 0);
    }

    public getGridItemByID(param1: number): IWindow {
        let _loc4_: IItemListWindow = null;
        let _loc2_: IWindow = null;
        let _loc5_: any = 0;
        let _loc3_: number = this.numColumns;
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc4_ = asGuarded(this.getListItemAt(_loc5_ >>> 0), isIItemListWindow);
            _loc2_ = _loc4_.getListItemByID(param1);
            if (_loc2_) {
                return _loc2_;
            }
            _loc5_++;
        }
        return null;
    }

    public getGridItemByName(param1: string): IWindow {
        let _loc4_: IItemListWindow = null;
        let _loc2_: IWindow = null;
        let _loc5_: any = 0;
        let _loc3_: number = this.numColumns;
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc4_ = asGuarded(this.getListItemAt(_loc5_ >>> 0), isIItemListWindow);
            _loc2_ = _loc4_.getListItemByName(param1);
            if (_loc2_) {
                return _loc2_;
            }
            _loc5_++;
        }
        return null;
    }

    public getGridItemByTag(param1: string): IWindow {
        let _loc4_: IItemListWindow = null;
        let _loc2_: IWindow = null;
        let _loc5_: any = 0;
        let _loc3_: number = this.numColumns;
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc4_ = asGuarded(this.getChildAt(_loc5_ | 0), isIItemListWindow);
            _loc2_ = _loc4_.getListItemByTag(param1);
            if (_loc2_) {
                return _loc2_;
            }
            _loc5_++;
        }
        return null;
    }

    public getGridItemIndex(param1: IWindow): number {
        let _loc2_: IItemListWindow = this.resolveColumnByItem(param1);
        if (_loc2_ == null) {
            return -1;
        }
        return _loc2_.getListItemIndex(param1) * this.numColumns + this.getColumnIndex(_loc2_);
    }

    public removeGridItem(param1: IWindow): IWindow {
        let _loc3_: number = this.getGridItemIndex(param1);
        if (_loc3_ == -1) {
            return null;
        }
        if (this.offsetGridItemsBackwards(_loc3_ >>> 0) != param1) {
            throw new Error("Item grid is out of order!");
        }
        let _loc2_: IItemListWindow = this.resolveColumnByIndex(_loc3_ >>> 0);
        if (!this._SafeStr_2417) {
            _loc2_.width = _loc2_.scrollableRegion.width | 0;
        } else {
            _loc2_.height = _loc2_.scrollableRegion.height | 0;
        }
        return param1;
    }

    public removeGridItemAt(param1: number): IWindow {
        return this.removeGridItem(this.getGridItemAt(param1 >>> 0));
    }

    public setGridItemIndex(param1: IWindow, param2: number): void {
        if (this.removeGridItem(param1) == null) {
            throw new Error("Item not found in grid!");
        }
        this.addListItemAt(param1, param2 >>> 0);
    }

    public swapGridItems(param1: IWindow, param2: IWindow): void {
        throw new Error("ItemGridWindow / Unimplemented method!");
    }

    public swapGridItemsAt(param1: number, param2: number): void {
        this.swapGridItems(this.getGridItemAt(param1 >>> 0), this.getGridItemAt(param2 >>> 0));
    }

    public removeGridItems(): void {
        let _loc2_: IItemListWindow = null;
        let _loc3_: any = 0;
        let _loc1_: number = this.numColumns;
        _loc3_ = 0;
        while (_loc3_ < _loc1_) {
            _loc2_ = castGuarded(this.getListItemAt(_loc3_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc2_.removeListItems();
            if (!this._SafeStr_2417) {
                _loc2_.width = 0;
            } else {
                _loc2_.height = 0;
            }
            _loc3_++;
        }
    }

    public destroyGridItems(): void {
        let _loc2_: IItemListWindow = null;
        let _loc3_: any = 0;
        let _loc1_: number = this.numColumns;
        _loc3_ = 0;
        while (_loc3_ < _loc1_) {
            _loc2_ = castGuarded(this.getListItemAt(_loc3_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc2_.destroyListItems();
            if (!this._SafeStr_2417) {
                _loc2_.width = 0;
            } else {
                _loc2_.height = 0;
            }
            _loc3_++;
        }
        this.destroyListItems();
    }

    protected listEventProc(param1: WindowEvent, param2: IWindow): void {
    }

    protected listItemEventHandler(param1: WindowEvent): void {
        let _loc2_: IWindow = null;
        if (param1.type == "WE_DESTROYED") {
            _loc2_ = asGuarded(param1.target, isIWindow);
            this.removeGridItem(_loc2_);
        }
    }

    protected getColumnIndex(param1: IItemListWindow): number {
        return this.getListItemIndex(param1);
    }

    protected resolveColumnByIndex(param1: number): IItemListWindow {
        return asGuarded(this.getListItemAt(param1 % this.numColumns >>> 0), isIItemListWindow);
    }

    public getColumnNumberByItemIndex(param1: number): number {
        return param1 % this.numColumns >>> 0;
    }

    public getRowNumberByItemIndex(param1: number): number {
        return param1 / this.numColumns >>> 0;
    }

    public override populate(param1: any[]): void {
        let _loc7_: IItemListWindow = null;
        let _loc9_: IItemListWindow = null;
        let _loc8_: number = 0;
        let _loc5_: boolean = false;
        let _loc2_: boolean = this.autoArrangeItems;
        this.autoArrangeItems = false;
        let _loc10_: number = this.numGridItems | 0;
        let _loc6_: number = this.numColumns | 0;
        let _loc3_: any[] = [];
        for (const _loc4_ of param1 ?? []) {
            if (_loc6_ == 0) {
                this.addColumnForItem(_loc4_);
                _loc6_++;
            } else {
                if (_loc10_ > 0) {
                    _loc9_ = this.resolveColumnByIndex((_loc10_ > 0 ? _loc10_ - 1 : 0) >>> 0);
                    _loc8_ = this.getListItemIndex(_loc9_);
                    _loc5_ = _loc8_ > -1 ? _loc8_ == _loc6_ - 1 : true;
                    if (_loc5_) {
                        if (_loc9_.numListItems == 1) {
                            if (_loc9_.right + _loc4_.width <= this._SafeStr_2132) {
                                this.addColumnForItem(_loc4_);
                                continue;
                            }
                        }
                    }
                    _loc7_ = asGuarded(this.getListItemAt((_loc5_ ? 0 : _loc8_ + 1) >>> 0), isIItemListWindow);
                } else {
                    _loc7_ = asGuarded(this.getListItemAt(0), isIItemListWindow);
                }
                _loc7_.addListItem(_loc4_);
                _loc10_++;
                if (_loc4_.width > _loc7_.width) {
                    _loc7_.width = _loc4_.width | 0;
                }
                if (_loc4_.bottom > _loc7_.height) {
                    _loc7_.height = _loc4_.bottom | 0;
                }
            }
        }
        this.autoArrangeItems = _loc2_;
    }

    protected resolveColumnByItem(param1: IWindow): IItemListWindow {
        let _loc3_: IItemListWindow = null;
        let _loc2_: number = this.numColumns;
        while (_loc2_-- > 0) {
            _loc3_ = castGuarded(this.getListItemAt(_loc2_), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            if (_loc3_.getListItemIndex(param1) > -1) {
                return _loc3_;
            }
        }
        return null;
    }

    protected resolveColumnForNextItem(param1: IWindow): IItemListWindow {
        let _loc3_: IItemListWindow = null;
        let _loc6_: IItemListWindow = null;
        if (this.numColumns == 0) {
            return this.addColumnForItem(param1);
        }
        let _loc5_: number = this.numGridItems;
        if (_loc5_ > 0) {
            _loc6_ = this.resolveColumnByIndex((_loc5_ > 0 ? _loc5_ - 1 : 0) >>> 0);
            let _loc4_: number = this.getListItemIndex(_loc6_);
            let _loc2_: boolean = _loc4_ > -1 ? _loc4_ == this.numColumns - 1 : true;
            if (_loc2_) {
                if (_loc6_.numListItems == 1) {
                    if (_loc6_.right + param1.width <= this._SafeStr_2132) {
                        return this.addColumnForItem(param1);
                    }
                }
            }
            _loc3_ = asGuarded(this.getListItemAt((_loc2_ ? 0 : _loc4_ + 1) >>> 0), isIItemListWindow);
        } else {
            _loc3_ = asGuarded(this.getListItemAt(0), isIItemListWindow);
        }
        _loc3_.addListItem(param1);
        if (param1.width > _loc3_.width) {
            _loc3_.width = param1.width;
        }
        if (param1.bottom > _loc3_.height) {
            _loc3_.height = param1.bottom;
        }
        return _loc3_;
    }

    protected addColumnForItem(param1: IWindow): IItemListWindow {
        let _loc2_: IItemListWindow = asGuarded(this._context.create(this._name + "_COLUMN_" + this.numListItems, null, 50, 0, (0x10 | 0) >>> 0, new Rectangle(0, 0, Math.max(param1.width, 0), Math.max(param1.height, 0)), this.listEventProc, null, this.numListItems >>> 0, null, "", ["_INTERNAL", "_EXCLUDE"]), isIItemListWindow);
        _loc2_.isPartOfGridWindow = true;
        _loc2_.background = this.background;
        _loc2_.color = this.color;
        _loc2_.spacing = this._SafeStr_5858 ? this._SafeStr_6732 : this._spacing;
        this.addListItem(_loc2_);
        _loc2_.addListItem(param1);
        return _loc2_;
    }

    protected removeColumnAt(param1: number): void {
        let _loc2_: IItemListWindow = asGuarded(this.removeChildAt(param1 | 0), isIItemListWindow);
        if (_loc2_) {
            _loc2_.dispose();
        }
    }

    protected offsetGridItemsForwards(param1: IWindow, param2: number): void {
        let _loc6_: IItemListWindow = null;
        let _loc3_: IWindow = null;
        let _loc9_: any = 0;
        let _loc5_: any = 0;
        let _loc8_: number = 0;
        _loc5_ = this.numGridItems;
        let _loc7_: number = _loc5_ - 1 | 0;
        let _loc4_: number = this.numColumns;
        _loc8_ = 0;
        while (_loc8_ < _loc4_) {
            castGuarded(this.getListItemAt(_loc8_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").autoArrangeItems = false;
            _loc8_++;
        }
        if (_loc5_ <= param2) {
            this.resolveColumnForNextItem(param1);
        } else {
            if (this.numRows == 1) {
                _loc3_ = this.getGridItemAt(_loc7_ >>> 0);
                _loc6_ = this.resolveColumnForNextItem(_loc3_);
                _loc7_--;
            }
            while (_loc7_ >= param2) {
                _loc3_ = this.getGridItemAt(_loc7_ >>> 0);
                _loc9_ = this.getRowNumberByItemIndex(_loc7_ + 1 >>> 0);
                _loc6_ = this.resolveColumnByIndex(_loc7_ + 1 >>> 0);
                _loc6_.addListItemAt(_loc3_, _loc9_ >>> 0);
                _loc7_--;
            }
            this.resolveColumnByIndex(param2).addListItemAt(param1, param2 / this.numColumns >>> 0);
        }
        let _loc10_: number = 0;
        _loc4_ = this.numColumns;
        _loc8_ = 0;
        while (_loc8_ < _loc4_) {
            _loc6_ = castGuarded(this.getListItemAt(_loc8_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc6_.autoArrangeItems = true;
            _loc6_.height = _loc6_.scrollableRegion.height | 0;
            _loc10_ = Math.max(_loc10_, _loc6_.height) >>> 0;
            _loc8_++;
        }
        this._container.height = _loc10_ | 0;
    }

    protected offsetGridItemsBackwards(param1: number): IWindow {
        let _loc2_: IWindow = null;
        let _loc8_: any = 0;
        let _loc7_: number = 0;
        _loc8_ = this.getRowNumberByItemIndex(param1);
        let _loc4_: IItemListWindow = this.resolveColumnByIndex(param1);
        let _loc3_: IWindow = _loc4_.removeListItemAt(_loc8_ | 0);
        let _loc5_: number = this.numGridItems;
        let _loc6_: number = param1;
        if (_loc3_ == null) {
            return null;
        }
        _loc7_ = 0;
        while (_loc7_ < this.numColumns) {
            castGuarded(this.getListItemAt(_loc7_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").autoArrangeItems = false;
            _loc7_++;
        }
        while (_loc6_ < _loc5_) {
            _loc8_ = this.getRowNumberByItemIndex(_loc6_);
            _loc2_ = this.getGridItemAt(_loc6_ + 1 >>> 0);
            _loc4_ = this.resolveColumnByIndex(_loc6_);
            _loc4_.addListItemAt(_loc2_, _loc8_ >>> 0);
            _loc6_++;
        }
        let _loc9_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < this.numColumns) {
            _loc4_ = castGuarded(this.getListItemAt(_loc7_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc4_.autoArrangeItems = true;
            _loc4_.height = _loc4_.scrollableRegion.height | 0;
            _loc9_ = Math.max(_loc9_, _loc4_.height) >>> 0;
            _loc7_++;
        }
        this._container.height = _loc9_ | 0;
        return _loc3_;
    }

    public rebuildGridStructure(): void {
        let _loc4_: IItemListWindow = null;
        let _loc1_: IWindow = null;
        let _loc7_: number = 0;
        let _loc8_: any = 0;
        let _loc5_: number = this.numGridItems | 0;
        let _loc2_: any[] = [];
        let _loc3_: number = this.numColumns | 0;
        if (this._isGridRebuilding) {
            return;
        }
        this._isGridRebuilding = true;
        let _loc6_: boolean = this.autoArrangeItems;
        this.autoArrangeItems = false;
        while (_loc5_ > 0) {
            _loc7_ = 0;
            while (_loc7_ < _loc3_) {
                _loc4_ = asGuarded(this.getListItemAt(_loc7_ >>> 0), isIItemListWindow);
                _loc1_ = _loc4_.removeListItemAt(0);
                _loc2_.push(_loc1_);
                if (--_loc5_ < 1) {
                    break;
                }
                _loc7_++;
            }
        }
        this.destroyListItems();
        this.autoArrangeItems = _loc6_;
        for (_loc1_ of _loc2_ ?? []) {
            this.addGridItem(_loc1_);
        }
        if (this._SafeStr_5865) {
            _loc8_ = 0;
            _loc7_ = 0;
            while (_loc7_ < this.numColumns) {
                _loc4_ = castGuarded(this.getListItemAt(_loc7_ >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
                _loc4_.autoArrangeItems = true;
                _loc4_.height = _loc4_.scrollableRegion.height | 0;
                _loc8_ = Math.max(Number(_loc8_), _loc4_.height) >>> 0;
                _loc7_++;
            }
            this._container.height = _loc8_ | 0;
        }
        this._isGridRebuilding = false;
    }

    public set containerResizeToColumns(param1: boolean) {
        this._SafeStr_5865 = param1;
    }

    public get containerResizeToColumns(): boolean {
        return this._SafeStr_5865;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("container_resize_to_columns", this.containerResizeToColumns));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: string = stringOrNull(_loc2_.key);
            if ("container_resize_to_columns" === _loc3_) {
                this.containerResizeToColumns = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this.listEventProc = this.listEventProc.bind(this);
        this._SafeStr_5865 = false;
        this._SafeStr_5858 = false;
        this._SafeStr_6732 = 0;
        this._shouldRebuildGridOnResize = true;
        this._isGridRebuilding = false;
        super.initInstanceFields();
    }

    public override get spacing(): number {
        return super.spacing;
    }

    public override get background(): boolean {
        return super.background;
    }

    public override get color(): number {
        return super.color;
    }

    public override get autoArrangeItems(): boolean {
        return super.autoArrangeItems;
    }

    get [IItemGridWindow](): true {
        return true;
    }
}
