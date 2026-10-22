import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { ITouchAwareWindow } from '@/com/sulake/core/window/utils/tablet/ITouchAwareWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { DropBaseController } from '@/com/sulake/core/window/Classes.group';
import { IDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { DropListIterator } from '@/com/sulake/core/window/iterators/DropListIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class DropListController extends DropBaseController implements IDropListWindow, IIterable, ITouchAwareWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::DropListController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public get iterator(): IIterator {
        return new DropListIterator(this);
    }

    public addMenuItem(param1: IWindow): IWindow {
        return this.addMenuItemAt(param1, this._itemArray.length | 0);
    }

    public addMenuItemAt(param1: IWindow, param2: number): IWindow {
        if (param1 && this._itemArray.indexOf(param1) == -1) {
            if (!this.getTitleLabel()) {
                if (isILabelWindow(param1)) {
                    if (param1.name == "_DROPLIST_TITLETEXT") {
                        return this.addChild(param1);
                    }
                }
            }
            if (!this.getItemList()) {
                if (isIItemListWindow(param1)) {
                    if (param1.name == "_DROPLIST_ITEMLIST") {
                        return this.addChild(param1);
                    }
                }
            }
            if (!this.getRegion()) {
                if (isIRegionWindow(param1)) {
                    if (param1.name == "_DROPLIST_REGION") {
                        return this.addChild(param1);
                    }
                }
            }
            if (this._menuIsOpen) {
                this.closeExpandedMenuView();
                this._itemArray.push(param1);
                this.openExpandedMenuView();
            } else {
                this._itemArray.push(param1);
            }
            return param1;
        }
        return null;
    }

    public getMenuItemAt(param1: number): IWindow {
        return this._itemArray != null && param1 > -1 && param1 < this._itemArray.length ? this._itemArray[param1] : null;
    }

    public removeMenuItem(param1: IWindow): IWindow {
        let _loc2_: number = this._itemArray.indexOf(param1);
        if (_loc2_ > -1) {
            if (_loc2_ == this._selection) {
                this._selection = -1;
            }
            this._itemArray.splice(_loc2_, 1);
            if (this._menuIsOpen) {
                this.closeExpandedMenuView();
                this.openExpandedMenuView();
            }
            return param1;
        }
        return null;
    }

    public removeMenuItemAt(param1: number): IWindow {
        let _loc2_: IWindow = this._itemArray[param1];
        return _loc2_ ? this.removeMenuItem(_loc2_) : null;
    }

    public getMenuItemIndex(param1: IWindow): number {
        return this._itemArray.indexOf(param1);
    }

    get [IDropListWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
