import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropListItemWindow } from '@/com/sulake/core/window/components/IDropListItemWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITouchAwareWindow } from '@/com/sulake/core/window/utils/tablet/ITouchAwareWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DropListItemController, InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isIDropListItemWindow } from '@/com/sulake/core/window/components/IDropListItemWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class DropBaseController extends InteractiveController implements ITouchAwareWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::DropBaseController'); }

    protected static readonly CAPTION_BLEND_CHANGE: number = 0.5;
    protected static readonly TEXT_FIELD_NAME: string = "_DROPLIST_TITLETEXT";
    protected static readonly ITEM_LIST_NAME: string = "_DROPLIST_ITEMLIST";
    protected static readonly REGION_NAME: string = "_DROPLIST_REGION";
    private static readonly SUB_WINDOW_MAX_DESKTOP_PADDING: number = 30;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this.getRegion().addEventListener("WME_DOWN", this.menuItemEventHandler);
    }

    declare protected _itemArray: IWindow[];

    declare protected _selection: number;

    declare protected _menuIsOpen: boolean;

    declare protected _SafeStr_5046: boolean;

    declare protected _SafeStr_2326: DropBaseController;

    declare private _SafeStr_5691: boolean;

    declare private _SafeStr_5317: boolean;

    public override set caption(param1: string) {
        super.caption = param1;
        let _loc2_: ILabelWindow = this.getTitleLabel();
        if (_loc2_) {
            _loc2_.text = param1;
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("open_upward", this._SafeStr_5691));
        _loc1_.push(this.createProperty("keep_open_on_deactivate", this._SafeStr_5317));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "open_upward":
                    this._SafeStr_5691 = Boolean(_loc2_.value);
                    break;
                case "keep_open_on_deactivate":
                    this._SafeStr_5317 = Boolean(_loc2_.value);
            }
        }
        super.properties = param1;
    }

    public get selection(): number {
        return this._selection;
    }

    public set selection(param1: number) {
        if (param1 > this.numMenuItems - 1) {
            throw new Error("Menu selection index out of range!");
        }
        let _loc2_: WindowEvent = WindowEvent.allocate("WE_SELECT", this, null, true);
        this.update(this, _loc2_);
        if (!_loc2_.isWindowOperationPrevented()) {
            _loc2_.recycle();
            this._selection = param1;
            this.closeExpandedMenuView();
            _loc2_ = WindowEvent.allocate("WE_SELECTED", this, null);
            this.update(this, _loc2_);
        }
        _loc2_.recycle();
    }

    public get numMenuItems(): number {
        return this._itemArray.length | 0;
    }

    public override dispose(): void {
        if (this._disposed) {
            return;
        }
        let _loc2_: IRegionWindow = this.getRegion();
        if (_loc2_ != null) {
            _loc2_.removeEventListener("WME_DOWN", this.menuItemEventHandler);
        }
        if (this._SafeStr_2326 != null && !this._SafeStr_2326.disposed) {
            this._SafeStr_2326.destroy();
            this._SafeStr_2326 = null;
        }
        for (const _loc1_ of this._itemArray ?? []) {
            _loc1_.dispose();
        }
        this._itemArray = null;
        super.dispose();
    }

    public override activate(): boolean {
        if (this._menuIsOpen) {
            return true;
        }
        return super.activate();
    }

    public override populate(param1: any[]): void {
        let _loc2_: IWindow = null;
        this._menuIsOpen = true;
        this.closeExpandedMenuView();
        this._selection = -1;
        while (this._itemArray.length > 0) {
            _loc2_ = this._itemArray.pop();
            if (param1.indexOf(_loc2_) == -1) {
                _loc2_.dispose();
            }
        }
        let _loc3_: number = 0;
        while (_loc3_ < param1.length) {
            this._itemArray.push(param1[_loc3_]);
            _loc3_++;
        }
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        switch (param2.type) {
            case "WTE_BEGIN":
            case "WME_DOWN":
                if (this._menuIsOpen) {
                    if (this._SafeStr_5317) {
                        this.closeExpandedMenuView();
                    }
                    break;
                }
                this.openExpandedMenuView();
                break;
            case "WE_ENABLED":
                try {
                    this.getChildByName("_DROPLIST_REGION").visible = true;
                    this.getChildByName("_DROPLIST_TITLETEXT").blend = this.getChildByName("_DROPLIST_TITLETEXT").blend + 0.5;
                    break;
                } catch (e) {
                    break;
                }
                break;
            case "WE_DISABLED":
                try {
                    this.getChildByName("_DROPLIST_REGION").visible = false;
                    this.getChildByName("_DROPLIST_TITLETEXT").blend = this.getChildByName("_DROPLIST_TITLETEXT").blend - 0.5;
                } catch (e) {
                }
        }
        return super.update(param1, param2);
    }

    public getTitleLabel(): ILabelWindow {
        return asGuarded(this.getChildByName("_DROPLIST_TITLETEXT"), isILabelWindow);
    }

    public getItemList(): IItemListWindow {
        return asGuarded(this.getChildByName("_DROPLIST_ITEMLIST"), isIItemListWindow);
    }

    public getRegion(): IRegionWindow {
        return asGuarded(this.getChildByName("_DROPLIST_REGION"), isIRegionWindow);
    }

    public open(): boolean {
        if (this.getStateFlag(0)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_OPEN", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.visible = true;
        _loc1_ = WindowEvent.allocate("WE_OPENED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public close(): boolean {
        if (!this.getStateFlag(0)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_CLOSE", this, null);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.visible = false;
        _loc1_ = WindowEvent.allocate("WE_CLOSED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    protected openExpandedMenuView(): void {
        let _loc1_: WindowEvent = null;
        if (!this._menuIsOpen) {
            if (this.open()) {
                _loc1_ = WindowEvent.allocate("WE_EXPANDED", this, null);
                this.update(this, _loc1_);
                _loc1_.recycle();
                if (this.numMenuItems > 0) {
                    this._menuIsOpen = true;
                    this._SafeStr_5046 = true;
                    this.populateExpandedMenu(this._itemArray, this.getExpandedMenuView(), this.subMenuEventProc);
                }
            }
        }
    }

    protected closeExpandedMenuView(): void {
        let _loc1_: IDropListItemWindow = null;
        let _loc4_: IWindow = null;
        let _loc2_: IItemListWindow = null;
        let _loc3_: number = 0;
        let _loc6_: WindowEvent = null;
        let _loc5_: ILabelWindow = null;
        if (this.close()) {
            if (this._SafeStr_2326 != null) {
                _loc2_ = this._SafeStr_2326.getItemList();
                _loc2_.autoArrangeItems = false;
                _loc3_ = 0;
                while (_loc3_ < _loc2_.numListItems) {
                    _loc1_ = asGuarded(_loc2_.getListItemAt(_loc3_ >>> 0), isIDropListItemWindow);
                    if (_loc1_) {
                        _loc4_ = _loc1_.value;
                        if (this._itemArray.indexOf(_loc4_) > -1) {
                            _loc1_.value = null;
                            _loc4_.setParamFlag(3, false);
                        }
                    }
                    _loc3_++;
                }
                this._SafeStr_2326.destroy();
                this._SafeStr_2326 = null;
            }
            if (this._menuIsOpen) {
                _loc6_ = WindowEvent.allocate("WE_COLLAPSE", this, null);
                this.update(this, _loc6_);
                _loc6_.recycle();
            }
            this._menuIsOpen = false;
            if (!this.disposed) {
                _loc5_ = this.getTitleLabel();
                _loc2_ = this.getItemList();
                if (_loc2_) {
                    while (_loc2_.numListItems > 0) {
                        _loc2_.removeListItemAt(0);
                    }
                    if (this._selection < this.numMenuItems && this._selection > -1) {
                        _loc4_ = this._itemArray[this._selection];
                        _loc4_.x = 0;
                        _loc4_.y = 0;
                        _loc2_.addListItem(_loc4_);
                        _loc2_.height = _loc4_.height;
                        _loc5_.visible = false;
                    } else {
                        _loc5_.visible = true;
                    }
                }
            }
        }
    }

    protected populateExpandedMenu(param1: IWindow[], param2: DropBaseController, param3: (...args: any[]) => any): void {
        let _loc5_: IDropListItemWindow = null;
        let _loc12_: IWindow = null;
        let _loc7_: IItemListWindow = param2.getItemList();
        _loc7_.autoArrangeItems = false;
        param2.getRegion().visible = false;
        let _loc10_: number = param1.length;
        let _loc9_: number = 0;
        let _loc6_: any = _loc9_ = _loc7_.width;
        let _loc8_: number = 0;
        let _loc11_: number = 0;
        while (_loc11_ < _loc10_) {
            _loc12_ = param1[_loc11_];
            _loc5_ = asInstanceOf(this.context.create(this.name + "::menuItem[" + _loc11_ + "]", _loc12_.caption, 106, this._style, (0 | 0 | 0x10 | 1 | 0) >>> 0, null, param3, null, _loc11_, null, "", ["_EXCLUDE"]), DropListItemController);
            _loc12_.x = 0;
            _loc12_.y = 0;
            _loc12_.setParamFlag(3, true);
            _loc5_.value = _loc12_;
            _loc5_.width = _loc5_.value.width;
            _loc5_.height = _loc5_.value.height;
            _loc5_.limits.minWidth = _loc9_;
            _loc6_ = Math.max(Number(_loc6_), _loc5_.width);
            _loc8_ += _loc5_.height;
            _loc7_.addListItem(_loc5_);
            _loc11_++;
        }
        if (_loc6_ > _loc9_) {
            param2.width += _loc6_ - _loc7_.width;
            _loc11_ = 0;
            while (_loc11_ < _loc10_) {
                _loc7_.getListItemAt(_loc11_).limits.minWidth = _loc6_ | 0;
                _loc11_++;
            }
        }
        let _loc4_: IWindow = this.context.create(this.name + "::padding", "", 4, this._style, (0 | 0 | 0x10 | 0) >>> 0, new Rectangle(0, 0, 1, 3), null, null, 0, null, "", ["_EXCLUDE"]);
        _loc7_.addListItem(_loc4_);
        _loc7_.autoArrangeItems = true;
        _loc8_ += _loc4_.height;
        _loc8_ = _loc8_ + _loc7_.spacing * _loc7_.numListItems;
        param2.height = Math.max(param2.height, _loc8_ + 4) | 0;
        if (this.param & 0x20) {
            this.fitToParent(param2);
        } else {
            this.fitToDesktop(param2);
        }
        param2.activate();
        _loc7_.height = Math.max(_loc7_.height, param2.height - 4) | 0;
        if (this._selection > -1 && _loc10_) {
            _loc7_.getListItemAt(this._selection >>> 0).setStateFlag(8, true);
        }
    }

    protected fitToParent(param1: IWindow): void {
        let _loc2_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc2_);
        let _loc3_: Rectangle = new Rectangle();
        this.parent.getGlobalRectangle(_loc3_);
        if (_loc2_.height > _loc3_.height) {
            param1.offset(0, _loc3_.top - _loc2_.top);
            param1.scale(0, _loc3_.height - _loc2_.height);
            param1.getGlobalRectangle(_loc2_);
        }
        if (_loc2_.bottom > _loc3_.bottom) {
            param1.offset(0, _loc3_.bottom - _loc2_.bottom);
        } else if (_loc2_.top < _loc3_.top) {
            param1.offset(0, _loc2_.top - _loc3_.top);
        }
        if (_loc2_.left < _loc3_.left) {
            param1.offset(_loc2_.left - _loc3_.left, 0);
        } else if (_loc2_.right > _loc3_.right) {
            param1.offset(_loc3_.right - _loc2_.right, 0);
        }
    }

    protected fitToDesktop(param1: IWindow): void {
        let _loc2_: Rectangle = new Rectangle();
        param1.getGlobalRectangle(_loc2_);
        if (_loc2_.bottom > this.desktop.bottom) {
            param1.offset(0, this.desktop.bottom - _loc2_.bottom);
        } else if (_loc2_.top < this.desktop.top) {
            param1.offset(0, _loc2_.top - this.desktop.top);
        }
        if (_loc2_.left < this.desktop.left) {
            param1.offset(_loc2_.left - this.desktop.left, 0);
        } else if (_loc2_.right > this.desktop.right) {
            param1.offset(this.desktop.right - _loc2_.right, 0);
        }
        if (_loc2_.height > this.desktop.height - 30) {
            param1.height = this.desktop.height - 30;
            param1.y = 30;
        }
    }

    protected subMenuEventProc(param1: WindowEvent, param2: IWindow): void {
        switch (param1.type) {
            case "WTE_END":
            case "WME_UP":
                if (isIDropListItemWindow(param2)) {
                    if (!this._SafeStr_5046) {
                        this.selection = this.resolveSelection(param2);
                    }
                    this._SafeStr_5046 = false;
                }
                break;
            case "WTE_BEGIN":
            case "WME_DOWN":
                this.selection = this.resolveSelection(param2);
                break;
            case "WE_DEACTIVATED":
                if (param2 == this._SafeStr_2326) {
                    if (!(this._SafeStr_5317 && this._menuIsOpen)) {
                        this.closeExpandedMenuView();
                    }
                }
        }
    }

    protected resolveSelection(param1: IWindow): number {
        let _loc2_: number = this._itemArray.indexOf(param1);
        if (_loc2_ == -1) {
            if (isIDropListItemWindow(param1)) {
                _loc2_ = this._itemArray.indexOf(castGuarded(param1, isIDropListItemWindow, "com.sulake.core.window.components.IDropListItemWindow").value);
            }
        }
        if (_loc2_ == -1) {
            return this._selection;
        }
        return _loc2_;
    }

    private getExpandedMenuView(): DropBaseController {
        let _loc1_: Rectangle = new Rectangle();
        this.getGlobalRectangle(_loc1_);
        if (this._SafeStr_2326 == null || this._SafeStr_2326.disposed) {
            this._SafeStr_2326 = asInstanceOf(this.context.create(this.name + "::subMenu", "", this.type, this._style, (0x020000 | ((this._SafeStr_5691 ? 1048576 : 0) >>> 0) | 0) >>> 0, _loc1_, this.subMenuEventProc, null, 0, null, "", ["_EXCLUDE"]), DropBaseController);
        } else {
            this._SafeStr_2326.setGlobalRectangle(_loc1_);
        }
        this._SafeStr_2326.activate();
        return this._SafeStr_2326;
    }

    private menuItemEventHandler(param1: WindowEvent): void {
        if (this.getStateFlag(32)) {
            return;
        }
        if (param1.type == "WME_DOWN" || param1.type == "WTE_TAP") {
            if (!this._menuIsOpen) {
                this.openExpandedMenuView();
            }
        }
    }

    protected override initInstanceFields(): void {
        this.subMenuEventProc = this.subMenuEventProc.bind(this);
        this.menuItemEventHandler = this.menuItemEventHandler.bind(this);
        this._itemArray = [];
        this._selection = -1;
        this._menuIsOpen = false;
        this._SafeStr_5046 = false;
        this._SafeStr_5691 = false;
        this._SafeStr_5317 = false;
        super.initInstanceFields();
    }

    public override get caption(): string {
        return super.caption;
    }
}
