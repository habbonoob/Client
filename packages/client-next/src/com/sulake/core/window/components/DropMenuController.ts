import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropListItemWindow } from '@/com/sulake/core/window/components/IDropListItemWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DropBaseController, DropMenuItemController } from '@/com/sulake/core/window/Classes.group';
import { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class DropMenuController extends DropBaseController implements IDropMenuWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::DropMenuController'); }

    private static readonly DROP_MENU_ITEM_MAX_LENGTH: number = 200;

    declare private _stringArray: any[];

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override dispose(): void {
        this._stringArray = null;
        super.dispose();
    }

    public override populate(param1: any[]): void {
        this._selection = -1;
        while (this._stringArray.length > 0) {
            this._stringArray.pop();
        }
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            this._stringArray.push(param1[_loc2_]);
            _loc2_++;
        }
        this._menuIsOpen = true;
        this.closeExpandedMenuView();
    }

    public populateWithVector(param1: string[]): void {
        this._selection = -1;
        while (this._stringArray.length > 0) {
            this._stringArray.pop();
        }
        let _loc2_: number = 0;
        while (_loc2_ < param1.length) {
            this._stringArray.push(param1[_loc2_]);
            _loc2_++;
        }
        this._menuIsOpen = true;
        this.closeExpandedMenuView();
    }

    protected override populateExpandedMenu(param1: IWindow[], param2: DropBaseController, param3: (...args: any[]) => any): void {
        let _loc5_: IDropListItemWindow = null;
        let _loc12_: string = null;
        if (!param2) {
            return;
        }
        let _loc7_: IItemListWindow = param2.getItemList();
        _loc7_.autoArrangeItems = false;
        param2.getRegion().visible = false;
        let _loc10_: number = this._stringArray.length;
        let _loc9_: number = 0;
        let _loc6_: number = _loc9_ = _loc7_.width;
        let _loc8_: number = 0;
        let _loc11_: number = 0;
        while (_loc11_ < _loc10_) {
            _loc12_ = stringOrNull(this._stringArray[_loc11_]);
            if (_loc12_.length > 200) {
                _loc12_ = _loc12_.substring(0, 200) + "...";
            }
            _loc5_ = asInstanceOf(this.context.create(this.name + "::menuItem[" + _loc11_ + "]", _loc12_, 103, this._style, (0 | 0 | 0x10 | 1 | 0) >>> 0, null, param3, null, _loc11_, null, "", ["_EXCLUDE"]), DropMenuItemController);
            this._itemArray.push(_loc5_);
            _loc6_ = Math.max(_loc6_, _loc5_.width) | 0;
            _loc8_ += _loc5_.height;
            _loc5_.width = _loc9_;
            _loc7_.addListItem(_loc5_);
            _loc11_++;
        }
        if (_loc6_ > _loc9_) {
            param2.width += _loc6_ - _loc7_.width;
            _loc11_ = 0;
            while (_loc11_ < _loc10_) {
                _loc7_.getListItemAt(_loc11_).width = _loc6_;
                _loc11_++;
            }
        }
        let _loc4_: IWindow = this.context.create(this.name + "::padding", "", 4, this._style, (0 | 0 | 0x10 | 0) >>> 0, new Rectangle(0, 0, 1, 3), null, null, 0, null, "", ["_EXCLUDE"]);
        _loc7_.addListItem(_loc4_);
        _loc7_.autoArrangeItems = true;
        _loc8_ += _loc4_.height;
        _loc8_ = _loc8_ + _loc7_.spacing * _loc7_.numListItems;
        param2.height = Math.max(param2.height, _loc8_ + 4) | 0;
        this.fitToDesktop(param2);
        param2.activate();
        _loc7_.height = Math.max(_loc7_.height, param2.height - 4) | 0;
        if (this._selection > -1 && _loc10_) {
            _loc7_.getListItemAt(this._selection >>> 0).setStateFlag(8, true);
        }
    }

    protected override closeExpandedMenuView(): void {
        let _loc2_: WindowEvent = null;
        let _loc1_: ILabelWindow = null;
        if (this.close()) {
            if (this._SafeStr_2326 != null) {
                this._SafeStr_2326.destroy();
                this._SafeStr_2326 = null;
            }
            if (this._menuIsOpen) {
                _loc2_ = WindowEvent.allocate("WE_COLLAPSE", this, null);
                this.update(this, _loc2_);
                _loc2_.recycle();
            }
            this._menuIsOpen = false;
            while (this._itemArray.length > 0) {
                this._itemArray.pop().dispose();
            }
            if (!this.disposed) {
                _loc1_ = this.getTitleLabel();
                _loc1_.visible = true;
                if (_loc1_) {
                    _loc1_.text = stringOrNull(this._selection < this._stringArray.length && this._selection > -1 ? this._stringArray[this._selection] : this.caption);
                    _loc1_.width = Math.max(0, this.getRegion().x + this.getRegion().width - _loc1_.x) | 0;
                    this.invalidate();
                }
            }
        }
    }

    public enumerateSelection(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        if (!this._disposed) {
            _loc2_ = 0;
            while (_loc2_ < this._stringArray.length) {
                _loc1_.push(this._stringArray[_loc2_]);
                _loc2_++;
            }
        }
        return _loc1_;
    }

    public override get numMenuItems(): number {
        return this._stringArray.length | 0;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("item_array", this._stringArray));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: string = stringOrNull(_loc2_.key);
            if ("item_array" === _loc3_) {
                this.populate(Array.isArray(_loc2_.value) ? _loc2_.value : null);
            }
        }
        super.properties = param1;
    }

    public openMenu(): void {
        this.openExpandedMenuView();
    }

    protected override initInstanceFields(): void {
        this._stringArray = [];
        super.initInstanceFields();
    }

    get [IDropMenuWindow](): true {
        return true;
    }
}
