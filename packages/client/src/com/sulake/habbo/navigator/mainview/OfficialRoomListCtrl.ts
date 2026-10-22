import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { OfficialRoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomEntryData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IViewCtrl } from '@/com/sulake/habbo/navigator/IViewCtrl';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PromotedRoomsListCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';

export class OfficialRoomListCtrl implements IViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::OfficialRoomListCtrl'); }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._SafeStr_3951 = new PromotedRoomsListCtrl(this._navigator);
    }

    declare private _navigator: HabboNavigator;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_3951: PromotedRoomsListCtrl;

    declare private _content: IWindowContainer;

    public get content(): IWindowContainer {
        return this._content;
    }

    public set content(param1: IWindowContainer) {
        this._content = param1;
        this._SafeStr_2221 = this._content ? castGuarded(this._content.findChildByName("item_list_official"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow") : null;
    }

    public dispose(): void {
        if (this._SafeStr_3951 != null) {
            this._SafeStr_3951.dispose();
            this._SafeStr_3951 = null;
        }
    }

    public refresh(): void {
        let _loc4_: number = 0;
        let _loc5_: any = false;
        let _loc3_: IWindowContainer = null;
        let _loc1_: boolean = false;
        let _loc2_: any[] = this.getVisibleEntries();
        this._SafeStr_2221.autoArrangeItems = false;
        this.refreshPromotedRooms();
        _loc4_ = 0;
        while (true) {
            _loc5_ = _loc4_ % 2 != 0;
            _loc3_ = castGuarded(this._SafeStr_2221.getListItemAt(_loc4_ + 1 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (_loc4_ < _loc2_.length) {
                this.refreshEntry(true, _loc5_, _loc3_, _loc2_[_loc4_]);
            } else {
                _loc1_ = this.refreshEntry(false, _loc5_, _loc3_, null);
                if (_loc1_) {
                    break;
                }
            }
            _loc4_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private getVisibleEntries(): any[] {
        let _loc2_: any[] = this._navigator.data.officialRooms.entries;
        let _loc1_: any[] = [];
        let _loc4_: number = 0;
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_.folderId > 0) {
                if (_loc3_.folderId == _loc4_) {
                    _loc1_.push(_loc3_);
                }
            } else {
                _loc4_ = Number(_loc3_.open ? _loc3_.index : 0) | 0;
                _loc1_.push(_loc3_);
            }
        }
        return _loc1_;
    }

    private refreshEntry(param1: boolean, param2: boolean, param3: IWindowContainer, param4: OfficialRoomEntryData): boolean {
        if (param3 == null) {
            if (!param1) {
                return true;
            }
            param3 = this._navigator.officialRoomEntryManager.createEntry(param2);
            this._SafeStr_2221.addListItem(param3);
        }
        this._navigator.officialRoomEntryManager.refreshEntry(param3, param1, param4);
        return false;
    }

    private refreshPromotedRooms(): void {
        let _loc1_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemAt(0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3951.refresh(_loc1_, this._navigator.data.promotedRooms.entries);
    }
}
