import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFlatUser } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/IFlatUser';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AssignRightsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/AssignRightsMessageComposer';
import { RemoveRightsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/action/RemoveRightsMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { ExtendedProfileIcon } from '@/com/sulake/habbo/utils/ExtendedProfileIcon';

export class UserListCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::UserListCtrl'); }

    private static readonly DISPLAY_LIMIT: number = 200;

    declare protected _navigator: IHabboTransitionalNavigator;

    declare private _SafeStr_5645: boolean;
    static { (this.prototype as any)._SafeStr_5645 = false; }

    declare protected _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    constructor(param1: IHabboTransitionalNavigator, param2: boolean) {
        this.onBgMouseClick = this.onBgMouseClick.bind(this);
        this._navigator = param1;
        this._SafeStr_5645 = param2;
    }

    public dispose(): void {
        this._navigator = null;
    }

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public refresh(param1: IItemListWindow, param2: any[], param3: string, param4: number): void {
        let _loc6_: number = 0;
        let _loc5_: boolean = false;
        let _loc8_: any[] = [];
        for (const _loc7_ of param2 ?? []) {
            if (param3 == "" || _loc7_.userName.toLowerCase().indexOf(param3) > -1) {
                _loc8_.push(_loc7_);
            }
            if (_loc8_.length >= 200) {
                break;
            }
        }
        param1.autoArrangeItems = false;
        _loc6_ = 0;
        while (true) {
            _loc5_ = this.refreshEntry(param1, _loc6_, _loc8_[_loc6_], param4);
            if (_loc5_) {
                break;
            }
            _loc6_++;
        }
        param1.autoArrangeItems = true;
        param1.invalidate();
        this._userCount = _loc8_.length | 0;
    }

    private getListEntry(param1: number): IWindowContainer {
        let _loc2_: IWindowContainer = this.getRowView();
        let _loc3_: IRegionWindow = castGuarded(_loc2_.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.addEventListener("WME_CLICK", this.onBgMouseClick);
        _loc3_.addEventListener("WME_OVER", this.onBgMouseOver);
        _loc3_.addEventListener("WME_OUT", this.onBgMouseOut);
        ExtendedProfileIcon.setup(_loc2_, this.onUserInfoMouseClick);
        _loc2_.id = param1;
        return _loc2_;
    }

    protected getRowView(): IWindowContainer {
        return castGuarded(this._navigator.getXmlWindow(this._SafeStr_5645 ? "ros_friend" : "ros_flat_controller"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    protected getBgColor(param1: number, param2: boolean): number {
        return param2 ? 4290173439 : (param1 % 2 != 0 ? 4294967295 : 4293519841);
    }

    private refreshEntry(param1: IItemListWindow, param2: number, param3: IFlatUser, param4: number): boolean {
        let _loc5_: IWindowContainer = castGuarded(param1.getListItemAt(param2 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc5_ == null) {
            if (param3 == null) {
                return true;
            }
            _loc5_ = this.getListEntry(param2);
            param1.addListItem(_loc5_);
        }
        if (param3 != null) {
            _loc5_.color = this.getBgColor(param2, param3.userId == param4);
            this.refreshEntryDetails(_loc5_, param3);
            _loc5_.visible = true;
            _loc5_.height = 20;
        } else {
            _loc5_.height = 0;
            _loc5_.visible = false;
        }
        return false;
    }

    private refreshEntryDetails(param1: IWindowContainer, param2: IFlatUser): void {
        param1.findChildByName("user_name_txt").caption = param2.userName;
        let _loc3_: IRegionWindow = castGuarded(param1.findChildByName("bg_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc3_.id = param2.userId;
        param1.findChildByName("user_info_region").id = param2.userId;
        ExtendedProfileIcon.setUserInfoState(false, param1);
    }

    protected onBgMouseClick(param1: WindowEvent): void {
        let _loc2_: any[] = null;
        let _loc3_: IWindowContainer = castGuarded(param1.target, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (this._SafeStr_5645) {
            this._navigator.send(new AssignRightsMessageComposer(_loc3_.id));
        } else {
            _loc2_ = [];
            _loc2_.push(_loc3_.id);
            this._navigator.send(new RemoveRightsMessageComposer(_loc2_));
        }
    }

    private onBgMouseOver = (param1: WindowEvent): void => {
        let _loc3_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.color = this.getBgColor(-1, true);
        let _loc2_: IWindow = _loc3_.findChildByName("arrow_icon");
        if (_loc2_ != null) {
            _loc2_.visible = true;
        }
    };

    private onBgMouseOut = (param1: WindowEvent): void => {
        let _loc3_: IWindowContainer = castGuarded(param1.target.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.color = this.getBgColor(_loc3_.id, false);
        let _loc2_: IWindow = _loc3_.findChildByName("arrow_icon");
        if (_loc2_ != null) {
            _loc2_.visible = false;
        }
    };

    public get userCount(): number {
        return this._userCount;
    }

    private onUserInfoMouseClick = (param1: WindowEvent): void => {
        this._navigator.trackGoogle("extendedProfile", "navigator_roomSettingsUsersList");
        this._navigator.send(new GetExtendedProfileMessageComposer(param1.target.id));
    };

    get [IDisposable](): true {
        return true;
    }
}
