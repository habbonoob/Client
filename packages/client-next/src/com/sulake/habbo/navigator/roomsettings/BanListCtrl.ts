import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UserListCtrl } from '@/com/sulake/habbo/navigator/roomsettings/UserListCtrl';

export class BanListCtrl extends UserListCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::BanListCtrl'); }

    private _selectedRow: number = -1;

    constructor(param1: IHabboTransitionalNavigator) {
        super(param1, false);
    }

    protected override getRowView(): IWindowContainer {
        return castGuarded(this._navigator.getXmlWindow("ros_banned_user"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    protected override onBgMouseClick(param1: WindowEvent): void {
        this._selectedRow = param1.target.parent.id;
        this.refreshColorsAfterClick(asGuarded(param1.target.findParentByName("moderation_banned_users"), isIItemListWindow));
    }

    protected override getBgColor(param1: number, param2: boolean): number {
        if (param1 == this._selectedRow) {
            return 4288329945;
        }
        return super.getBgColor(param1, param2);
    }

    private refreshColorsAfterClick(param1: IItemListWindow): void {
        let _loc3_: number = 0;
        let _loc2_: IWindowContainer = null;
        _loc3_ = 0;
        while (_loc3_ < this._userCount) {
            _loc2_ = castGuarded(param1.getListItemAt(_loc3_ >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc2_.color = this.getBgColor(_loc3_, false);
            _loc3_++;
        }
    }

    public get selectedRow(): number {
        return this._selectedRow;
    }
}
