import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { OfficialRoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomEntryData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { OfficialRoomImageLoader } from '@/com/sulake/habbo/navigator/mainview/OfficialRoomImageLoader';
import { UserCountRenderer } from '@/com/sulake/habbo/navigator/UserCountRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class OfficialRoomEntryManager implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::OfficialRoomEntryManager'); }

    private static readonly HOTTEST_GROUPS_TAG: string = "hottest_groups";
    private static readonly IMAGE_WIDTH_WIDE: number = 267;
    private static readonly IMAGE_WIDTH_NARROW: number = 65;
    private static readonly NARROW_IMAGE_OFFSET: number = -70;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _SafeStr_3810: UserCountRenderer;

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
        this._SafeStr_3810 = new UserCountRenderer(this._navigator);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._SafeStr_3810) {
            this._SafeStr_3810.dispose();
            this._SafeStr_3810 = null;
        }
        this._disposed = true;
    }

    public refreshAdFooter(param1: IWindowContainer): void {
        if (this._navigator.data.adRoom == null) {
            return;
        }
        let _loc4_: string = "ad_footer";
        let _loc5_: IWindowContainer = castGuarded(param1.getChildByName("ad_footer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: IWindowContainer = castGuarded(_loc5_.getChildByName("ad_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc2_.numChildren < 1) {
            _loc2_.addChild(this.createEntry(true));
        }
        let _loc3_: IWindowContainer = castGuarded(_loc2_.getChildAt(0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this.refreshEntry(_loc3_, true, this._navigator.data.adRoom);
        _loc5_.visible = true;
        this._navigator.data.adIndex++;
    }

    public createEntry(param1: boolean): IWindowContainer {
        let _loc3_: IBitmapWrapperWindow = null;
        let _loc4_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("grs_official_room_row_phase_one"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: IWindowContainer = castGuarded(_loc4_.findChildByName("image_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: string = !param1 ? "_b" : "";
        this._navigator.refreshButton(_loc5_, "rico_rnd_l" + _loc2_, true, null, 0);
        this._navigator.refreshButton(_loc5_, "rico_rnd_r" + _loc2_, true, null, 0);
        _loc3_ = asGuarded(_loc5_.findChildByName("rico_rnd_m"), isIBitmapWrapperWindow);
        _loc3_.bitmap = this._navigator.getButtonImage("rico_rnd_m");
        _loc3_.disposesBitmap = false;
        let _loc6_: IWindowContainer = castGuarded(_loc4_.findChildByName("folder_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._navigator.refreshButton(_loc6_, "rico_rnd_l" + _loc2_, true, null, 0);
        this._navigator.refreshButton(_loc6_, "rico_rnd_r" + _loc2_, true, null, 0);
        _loc3_ = asGuarded(_loc6_.findChildByName("rico_rnd_m"), isIBitmapWrapperWindow);
        _loc3_.bitmap = this._navigator.getButtonImage("rico_rnd_m");
        _loc3_.disposesBitmap = false;
        _loc4_.addEventListener("WME_OVER", this.onCellMouseOver);
        _loc4_.addEventListener("WME_OUT", this.onCellMouseOut);
        _loc4_.addEventListener("WME_CLICK", this.onCellMouseClick);
        _loc4_.color = param1 ? 4294967295 : 4292797682;
        return _loc4_;
    }

    public refreshEntry(param1: IWindowContainer, param2: boolean, param3: OfficialRoomEntryData): void {
        Util.hideChildren(param1);
        if (param2) {
            param1.id = param3.index;
            if (param3.type == 4) {
                this.refreshFolderEntry(param1, param3);
            } else {
                this.refreshNormalEntry(param1, param3);
            }
            param1.visible = true;
        } else {
            param1.height = 0;
            param1.visible = false;
        }
    }

    private refreshNormalEntry(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        this.refreshCell(param1, param2);
        this.refreshDetails(param1, param2);
        this.refreshUserCount(param1, param2);
        param1.height = 68;
    }

    private refreshFolderEntry(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: IWindowContainer = castGuarded(param1.findChildByName("folder_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.visible = true;
        let _loc5_: ITextWindow = castGuarded(_loc3_.findChildByName("folder_name_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.text = param2.popupCaption;
        let _loc6_: ITextWindow = castGuarded(_loc3_.findChildByName("arrow_label"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc6_.text = param2.open ? "${navigator.folder.hide}" : "${navigator.folder.show}";
        this._navigator.refreshButton(_loc3_, "arrow_down_white", param2.open, null, 0);
        this._navigator.refreshButton(_loc3_, "arrow_right_white", !param2.open, null, 0);
        this.refreshFolderImage(_loc3_, param2);
        param1.height = 68;
        let _loc4_: IWindowContainer = castGuarded(param1.findChildByName("folderNameContainer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc5_.text == "") {
            _loc4_.visible = false;
            return;
        }
        _loc4_.visible = true;
        if (!this._navigator.isPerkAllowed("NAVIGATOR_PHASE_ONE_2014")) {
            _loc4_.width = _loc5_.textWidth + 20 | 0;
        }
    }

    private refreshUserCount(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        if (param2.showDetails && param2.type == 2) {
            _loc4_ = 3;
            _loc3_ = 34;
            _loc5_ = 13;
            this._SafeStr_3810.refreshUserCount(param2.maxUsers, param1, param2.userCount, "${navigator.usercounttooltip.users}", param1.width - _loc4_ - _loc3_, param1.height - _loc4_ - _loc5_);
        }
    }

    private refreshCell(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: IWindowContainer = castGuarded(param1.findChildByName("image_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.visible = true;
        _loc3_.width = param2.showDetails ? 65 : 267;
        this.refreshPicText(_loc3_, param2);
        this.refreshRoomImage(_loc3_, param2);
    }

    private refreshPicText(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc6_: IWindowContainer = castGuarded(param1.findChildByName("picTextContainer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (param2.picText == "" || param2.showDetails) {
            _loc6_.visible = false;
            return;
        }
        let _loc3_: number = 5;
        _loc6_.visible = true;
        let _loc4_: ITextWindow = castGuarded(_loc6_.findChildByName("picText"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc4_.text = param2.picText;
        _loc4_.height = _loc4_.textHeight + 10 | 0;
        let _loc5_: boolean = _loc4_.textHeight > 10;
        _loc6_.height = _loc4_.height + 4;
    }

    private refreshFolderImage(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: IBitmapWrapperWindow = castGuarded(param1.findChildByName("folder_image"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc3_.visible = false;
        if (param2.picRef != "") {
            this.refreshCustomImage(param2, _loc3_);
        }
    }

    private refreshRoomImage(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: IBitmapWrapperWindow = castGuarded(param1.findChildByName("room_image"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc3_.visible = false;
        if (param2.picRef != "") {
            this.refreshCustomImage(param2, _loc3_);
        } else if (param2.guestRoomData != null) {
            this.refreshGuestRoomImage(param1, param2, _loc3_);
        } else {
            this.refreshEmptyImage(param1, param2, _loc3_);
        }
    }

    private refreshCustomImage(param1: OfficialRoomEntryData, param2: IBitmapWrapperWindow): void {
        let _loc4_: string = "customImage." + param1.picRef;
        if (param2.tags[0] == _loc4_) {
            param2.visible = true;
            return;
        }
        Logger.log("Loading custom image: " + param1.picRef);
        param2.x = 0;
        param2.visible = false;
        let _loc3_: OfficialRoomImageLoader = new OfficialRoomImageLoader(this._navigator, param1.picRef, param2);
        _loc3_.startLoad();
        param2.tags.splice(0, param2.tags.length);
        param2.tags.push(_loc4_);
    }

    private refreshGuestRoomImage(param1: IWindowContainer, param2: OfficialRoomEntryData, param3: IBitmapWrapperWindow): void {
        let _loc4_: string = "guestRoom." + param2.guestRoomData.thumbnail.getAsString();
        if (param3.tags[0] == _loc4_) {
            param3.visible = true;
            return;
        }
        Logger.log("Redrawing guest room image");
        param3.x = 0;
        param3.width = 64;
        param3.bitmap = new BitmapData(64, 64);
        param3.bitmap.fillRect(param3.bitmap.rect, 4294967295);
        param3.tags.splice(0, param3.tags.length);
        param3.tags.push(_loc4_);
        param3.visible = true;
    }

    private refreshEmptyImage(param1: IWindowContainer, param2: OfficialRoomEntryData, param3: IBitmapWrapperWindow): void {
        let _loc4_: string = "empty";
        if (param3.tags[0] == _loc4_) {
            param3.visible = true;
            return;
        }
        Logger.log("Redrawing empty image");
        param3.x = 0;
        param3.width = 64;
        param3.bitmap = new BitmapData(64, 64, false, 4291611852);
        param3.tags.splice(0, param3.tags.length);
        param3.tags.push(_loc4_);
        param3.visible = true;
    }

    private onCellMouseOver = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        this.setEnterArrowVisibility(_loc2_, true);
    };

    private onCellMouseOut = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        this.setEnterArrowVisibility(_loc2_, false);
    };

    private onCellMouseClick = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        this.handleClick(_loc2_);
    };

    private setEnterArrowVisibility(param1: IWindow, param2: boolean): void {
        let _loc4_: IBitmapWrapperWindow = null;
        let _loc5_: IWindowContainer = castGuarded(param1, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: IWindowContainer = castGuarded(_loc5_.findChildByName("enter_room"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc3_ == null) {
            return;
        }
        if (param2) {
            this._navigator.refreshButton(_loc3_, "enter_room_l", true, null, 0);
            this._navigator.refreshButton(_loc3_, "enter_room_r", true, null, 0);
            _loc4_ = castGuarded(_loc3_.findChildByName("enter_room_m"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc4_.bitmap == null) {
                _loc4_.bitmap = this._navigator.getButtonImage("enter_room_m");
                _loc4_.disposesBitmap = false;
            }
            this._navigator.refreshButton(_loc3_, "enter_room_a", true, null, 0);
        }
        _loc3_.visible = param2;
    }

    private handleClick(param1: IWindow): void {
        let _loc2_: OfficialRoomEntryData = this.getEntry(param1);
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.guestRoomData != null) {
            Logger.log("ENTERING ROOM: " + _loc2_.guestRoomData.flatId);
            if (_loc2_.guestRoomData.doorMode == 2) {
                this._navigator.passwordInput.show(_loc2_.guestRoomData);
            } else {
                this._navigator.goToRoom(_loc2_.guestRoomData.flatId, true);
            }
        } else if (_loc2_.tag != null) {
            Logger.log("MAKING TAG SEARCH: " + _loc2_.tag);
            if (_loc2_.tag == "hottest_groups") {
                this._navigator.performGuildBaseSearch();
            } else {
                this._navigator.mainViewCtrl.startSearch(5, 9, _loc2_.tag);
            }
        } else {
            Logger.log("FOLDER CLICKD: " + _loc2_.index);
            _loc2_.toggleOpen();
            this._navigator.mainViewCtrl.refresh();
        }
    }

    private getEntry(param1: IWindow): OfficialRoomEntryData {
        let _loc2_: IWindowContainer = isIWindowContainer(param1) ? param1 : null;
        if (_loc2_ == null || _loc2_.name != "cont") {
            Logger.log("Target not cont");
            return null;
        }
        Logger.log("PARENT NAME: " + param1.parent.name);
        return _loc2_.parent.name == "ad_cont" ? this.findAdEntry() : this.findEntryInOfficialRoomList(_loc2_);
    }

    private findAdEntry(): OfficialRoomEntryData {
        return this._navigator.data.adRoom;
    }

    private findEntryInOfficialRoomList(param1: IWindowContainer): OfficialRoomEntryData {
        if (this._navigator.data.officialRooms == null) {
            Logger.log("No official rooms data click");
            return null;
        }
        let _loc3_: number = param1.id;
        Logger.log("Got index: " + _loc3_);
        for (const _loc2_ of this._navigator.data.officialRooms.entries ?? []) {
            if (_loc2_.index == _loc3_) {
                return _loc2_;
            }
        }
        Logger.log("No room found " + _loc3_ + ", " + this._navigator.data.officialRooms.entries.length);
        return null;
    }

    private refreshDetails(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: IWindowContainer = castGuarded(param1.findChildByName("details_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.visible = param2.showDetails;
        Logger.log("Refreshing details: " + _loc3_.visible);
        if (!param2.showDetails) {
            return;
        }
        Util.hideChildren(_loc3_);
        this.refreshEntryCaption(_loc3_, param2);
        this.refreshEntryDesc(_loc3_, param2);
    }

    private refreshEntryCaption(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc3_: ITextWindow = castGuarded(param1.getChildByName("entry_caption"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.visible = true;
        _loc3_.text = this.getPopupCaption(param2);
    }

    private refreshEntryDesc(param1: IWindowContainer, param2: OfficialRoomEntryData): void {
        let _loc4_: string = this.getPopupDesc(param2);
        if (_loc4_ == "") {
            return;
        }
        let _loc3_: string = "entry_desc";
        let _loc5_: ITextWindow = castGuarded(param1.getChildByName(_loc3_), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.text = _loc4_;
        _loc5_.visible = true;
    }

    public getPopupCaption(param1: OfficialRoomEntryData): string {
        if (param1.popupCaption != null && param1.popupCaption != "") {
            return param1.popupCaption;
        }
        if (param1.guestRoomData != null) {
            return param1.guestRoomData.roomName;
        }
        if (param1.tag != null && param1.tag != "") {
            return param1.tag;
        }
        return "NA";
    }

    public getPopupDesc(param1: OfficialRoomEntryData): string {
        if (param1.popupCaption != null && param1.popupCaption != "") {
            return param1.popupDesc;
        }
        if (param1.guestRoomData != null) {
            return param1.guestRoomData.description;
        }
        return "";
    }

    get [IDisposable](): true {
        return true;
    }
}
