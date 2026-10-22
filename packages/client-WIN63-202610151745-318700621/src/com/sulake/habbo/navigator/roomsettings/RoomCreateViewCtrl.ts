import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CreateFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/CreateFlatMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomLayout } from '@/com/sulake/habbo/navigator/domain/RoomLayout';
import { TextFieldManager } from '@/com/sulake/habbo/navigator/TextFieldManager';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class RoomCreateViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::RoomCreateViewCtrl'); }

    private static readonly ROOM_LIMIT_HC: number = 75;
    private static readonly ROOM_LIMIT_NON_SUBSCRIBER: number = 50;

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _content: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _layouts: RoomLayout[];

    declare private _selectedLayout: RoomLayout;

    declare private _SafeStr_3268: Timer;

    private _SafeStr_5456: boolean = true;

    declare private _SafeStr_4743: TextFieldManager;

    declare private _SafeStr_5421: TextFieldManager;

    declare private _SafeStr_3234: IDropMenuWindow;

    declare private _maxVisitors: IDropMenuWindow;

    declare private _SafeStr_4327: IDropMenuWindow;

    private _selectableAndVisibleCategories: any[] = [];

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
        this._SafeStr_3268 = new Timer(100);
        this._SafeStr_3268.addEventListener("timer", this.updateArrowPos);
        this._layouts = [];
        this._layouts.push(new RoomLayout(0, 104, "a"));
        this._layouts.push(new RoomLayout(0, 94, "b"));
        this._layouts.push(new RoomLayout(0, 36, "c"));
        this._layouts.push(new RoomLayout(0, 84, "d"));
        this._layouts.push(new RoomLayout(0, 80, "e"));
        this._layouts.push(new RoomLayout(0, 80, "f"));
        this._layouts.push(new RoomLayout(0, 416, "i"));
        this._layouts.push(new RoomLayout(0, 320, "j"));
        this._layouts.push(new RoomLayout(0, 448, "k"));
        this._layouts.push(new RoomLayout(0, 352, "l"));
        this._layouts.push(new RoomLayout(0, 384, "m"));
        this._layouts.push(new RoomLayout(0, 372, "n"));
        this._layouts.push(new RoomLayout(1, 80, "g"));
        this._layouts.push(new RoomLayout(1, 74, "h"));
        this._layouts.push(new RoomLayout(1, 416, "o"));
        this._layouts.push(new RoomLayout(1, 352, "p"));
        this._layouts.push(new RoomLayout(1, 304, "q"));
        this._layouts.push(new RoomLayout(1, 336, "r"));
        this._layouts.push(new RoomLayout(1, 748, "u"));
        this._layouts.push(new RoomLayout(1, 438, "v"));
        this._layouts.push(new RoomLayout(2, 540, "t"));
        this._layouts.push(new RoomLayout(2, 512, "w"));
        this._layouts.push(new RoomLayout(2, 396, "x"));
        this._layouts.push(new RoomLayout(2, 440, "y"));
        this._layouts.push(new RoomLayout(2, 456, "z"));
        this._layouts.push(new RoomLayout(2, 208, "0"));
        this._layouts.push(new RoomLayout(2, 1009, "1"));
        this._layouts.push(new RoomLayout(2, 1044, "2"));
        this._layouts.push(new RoomLayout(2, 183, "3"));
        this._layouts.push(new RoomLayout(2, 254, "4"));
        this._layouts.push(new RoomLayout(2, 1024, "5"));
        this._layouts.push(new RoomLayout(2, 801, "6"));
        this._layouts.push(new RoomLayout(2, 354, "7"));
        this._layouts.push(new RoomLayout(2, 888, "8"));
        this._layouts.push(new RoomLayout(2, 926, "9"));
        this._layouts.push(new RoomLayout(-1, 2500, "snowwar1"));
        this._layouts.push(new RoomLayout(-1, 2500, "snowwar2"));
    }

    private static addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.setParamFlag(1, true);
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    public dispose(): void {
        if (this._SafeStr_3268) {
            this._SafeStr_3268.removeEventListener("timer", this.updateArrowPos);
            this._SafeStr_3268.reset();
            this._SafeStr_3268 = null;
        }
    }

    private updateArrowPos = (param1: Event): void => {
        let _loc5_: string = "select_arrow";
        let _loc3_: IBitmapWrapperWindow = castGuarded(this._selectedLayout.view.findChildByName(_loc5_), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc2_: number = 0;
        let _loc6_: number = 15;
        let _loc4_: number = Math.abs(_loc3_.y - _loc2_) < 2 || Math.abs(_loc3_.y - _loc6_) < 2 ? 1 : 2;
        _loc3_.y += this._SafeStr_5456 ? _loc4_ : -_loc4_;
        if (_loc3_.y < _loc2_) {
            this._SafeStr_5456 = true;
            _loc3_.y = _loc2_ + 1;
        } else if (_loc3_.y > _loc6_) {
            this._SafeStr_5456 = false;
            _loc3_.y = _loc6_ - 1;
        }
    };

    public hide(): void {
        if (this._content) {
            this._content.visible = false;
        }
    }

    public show(): void {
        this.prepare();
        this._content.visible = true;
        this.refresh();
        this._content.activate();
        this._SafeStr_3268.start();
    }

    private prepare(): void {
        if (this._content != null) {
            return;
        }
        this._content = castGuarded(this._navigator.getXmlWindow("roc_create_room"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2221 = castGuarded(this._content.findChildByName("layout_item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this.refreshRoomThumbnails();
        let _loc4_: IButtonWindow = this.getCreateButton();
        RoomCreateViewCtrl.addMouseClickListener(_loc4_, this.onCreateButtonClick);
        let _loc1_: IButtonWindow = this.getCancelButton();
        RoomCreateViewCtrl.addMouseClickListener(_loc1_, this.onCancelButtonClick);
        let _loc3_: IWindow = this._content.findChildByTag("close");
        RoomCreateViewCtrl.addMouseClickListener(_loc3_, this.onCancelButtonClick);
        this._SafeStr_4743 = new TextFieldManager(this._navigator, castGuarded(this._content.findChildByName("room_name_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 25, null, this._navigator.getText("navigator.createroom.roomnameinfo"));
        this._SafeStr_5421 = new TextFieldManager(this._navigator, castGuarded(this._content.findChildByName("room_desc_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow"), 128, null, this._navigator.getText("navigator.createroom.roomdescinfo"));
        this.prepareCategorySelection();
        this.prepareTradeModeSelection();
        this.refreshMaxVisitors(50);
        let _loc2_: Rectangle = Util.getLocationRelativeTo(this._content.desktop, this._content.width, this._content.height);
        this._content.x = _loc2_.x | 0;
        this._content.y = _loc2_.y | 0;
    }

    private prepareCategorySelection(): void {
        this._SafeStr_3234 = asGuarded(this._content.findChildByName("categories_list"), isIDropMenuWindow);
        let _loc1_: any[] = [];
        this._selectableAndVisibleCategories = [];
        for (const _loc2_ of this._navigator.data.visibleCategories ?? []) {
            if (!_loc2_.automatic && (!_loc2_.staffOnly || _loc2_.staffOnly && this._navigator.sessionData.hasSecurity(7))) {
                this._selectableAndVisibleCategories.push(_loc2_);
                _loc1_.push(_loc2_.visibleName);
            }
        }
        this._SafeStr_3234.populate(_loc1_);
        this._SafeStr_3234.selection = 0;
    }

    private prepareTradeModeSelection(): void {
        this._SafeStr_4327 = asGuarded(this._content.findChildByName("trade_settings_list"), isIDropMenuWindow);
        let _loc1_: any[] = [];
        _loc1_.push("${navigator.roomsettings.trade_not_allowed}");
        _loc1_.push("${navigator.roomsettings.trade_not_with_Controller}");
        _loc1_.push("${navigator.roomsettings.trade_allowed}");
        this._SafeStr_4327.populate(_loc1_);
        this._SafeStr_4327.selection = 0;
    }

    public refresh(): void {
        this._SafeStr_4743.goBackToInitialState();
        this._SafeStr_4743.input.textBackgroundColor = 4294967295;
        this._SafeStr_5421.goBackToInitialState();
        this._SafeStr_5421.input.textBackgroundColor = 4294967295;
        this._SafeStr_4327.selection = 0;
        this._SafeStr_3234.selection = 0;
        this._selectedLayout = this._layouts[0];
        this.refreshRoomThumbnails();
        if (this._navigator.sessionData.hasVip) {
            this.refreshMaxVisitors(75);
        } else {
            this.refreshMaxVisitors(50);
        }
        this.refreshSelection();
    }

    private refreshMaxVisitors(param1: number): void {
        let _loc2_: number = 0;
        this._maxVisitors = asGuarded(this._content.findChildByName("visitors_list"), isIDropMenuWindow);
        let _loc3_: any[] = [];
        _loc2_ = 10;
        while (_loc2_ <= param1) {
            _loc3_.push("" + _loc2_);
            _loc2_ += 5;
        }
        this._maxVisitors.populate(_loc3_);
        this._maxVisitors.selection = 0;
    }

    private refreshSelection(): void {
        let _loc2_: boolean = false;
        let _loc3_: ITextWindow = null;
        for (const _loc1_ of this._layouts ?? []) {
            if (_loc1_.view != null) {
                _loc2_ = _loc1_ == this._selectedLayout;
                _loc1_.view.findChildByName("bg_sel").visible = _loc2_;
                _loc1_.view.findChildByName("bg_unsel").visible = !_loc2_;
                _loc3_ = castGuarded(_loc1_.view.findChildByName("tile_size_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
                _loc3_.textColor = _loc2_ ? 4294967295 : 4278190080;
                _loc3_.color = _loc2_ ? 4285432196 : 4291546059;
                this._navigator.refreshButton(_loc1_.view, "tile_icon_black", !_loc2_, null, 0);
                this._navigator.refreshButton(_loc1_.view, "tile_icon_white", _loc2_, null, 0);
                this._navigator.refreshButton(_loc1_.view, "select_arrow", _loc2_, null, 0);
            }
        }
    }

    private refreshRoomThumbnails(): void {
        let _loc9_: IWindow = null;
        let _loc6_: IWindowContainer = null;
        let _loc5_: number = 0;
        let _loc1_: RoomLayout = null;
        let _loc2_: IWindowContainer = null;
        let _loc4_: IWindow = null;
        while (this._SafeStr_2221.numListItems > 0) {
            _loc9_ = this._SafeStr_2221.removeListItemAt(0);
            _loc9_.destroy();
        }
        for (const _loc7_ of this._layouts ?? []) {
            if (_loc7_.view != null) {
                _loc7_.view.destroy();
                _loc7_.view = null;
            }
        }
        let _loc3_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._layouts.length) {
            _loc1_ = this._layouts[_loc5_];
            if (this.isAllowed(_loc1_, false)) {
                if (_loc3_ == 0) {
                    _loc6_ = this.getRow();
                    this._SafeStr_2221.addListItem(_loc6_);
                }
                this.addThumbnail(_loc6_, this._layouts[_loc5_], _loc3_ % 2 == 0);
                _loc3_ = _loc3_ == 0 ? 1 : 0;
            }
            _loc5_++;
        }
        this.refreshSelection();
        let _loc8_: string = null;
        if (this._navigator.sessionData.clubLevel < 2 && !this._navigator.getBoolean("habbo_club_buy_disabled")) {
            _loc8_ = "roc_vip_promo";
        }
        if (_loc8_ != null) {
            _loc2_ = castGuarded(this._navigator.getXmlWindow(_loc8_), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            if (_loc2_) {
                _loc4_ = _loc2_.findChildByName("link");
                RoomCreateViewCtrl.addMouseClickListener(_loc4_, this.onHcMoreClick);
                this._SafeStr_2221.addListItem(_loc2_);
            }
        }
    }

    private addThumbnail(param1: IWindowContainer, param2: RoomLayout, param3: boolean): void {
        let _loc5_: IWindowContainer = castGuarded(this._navigator.getXmlWindow("roc_room_thumbnail"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc5_.tags.push(param2.name);
        if (!param3) {
            _loc5_.x = _loc5_.width;
        }
        RoomCreateViewCtrl.addMouseClickListener(_loc5_, this.onContPicClick);
        let _loc4_: IStaticBitmapWrapperWindow = asGuarded(_loc5_.findChildByName("bg_pic"), isIStaticBitmapWrapperWindow);
        _loc4_.assetUri = "${image.library.url}newroom/model_" + param2.name + ".png";
        param1.addChild(_loc5_);
        this._navigator.sessionData.clubLevel >= 2;
        param1.width = 2 * _loc5_.width;
        param1.height = _loc5_.height;
        param2.view = _loc5_;
        castGuarded(param2.view.findChildByName("tile_size_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = param2.tileSize + " " + this._navigator.getText("navigator.createroom.tilesize");
        _loc5_.findChildByName("club_icon").visible = param2.requiredClubLevel == 1 || param2.requiredClubLevel == 2;
    }

    private isAllowed(param1: RoomLayout, param2: boolean = true): boolean {
        switch (param1.requiredClubLevel) {
            case 0:
                return true;
            case 1:
                return !param2 || this._navigator.sessionData.hasClub;
            case 2:
                return !param2 || this._navigator.sessionData.hasVip;
            default:
                return this._navigator.sessionData.hasSecurity(4);
        }
    }

    private getRow(): IWindowContainer {
        return castGuarded(this._navigator.windowManager.createWindow("", "", 4, 0, 16, new Rectangle(0, 0, 100, 300)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private isMandatoryFieldsFilled(): boolean {
        return this._SafeStr_4743.checkMandatory(this._navigator.getText("navigator.createroom.nameerr"));
    }

    private getCreateButton(): IButtonWindow {
        return castGuarded(this._content.findChildByName("create_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    private getCancelButton(): IButtonWindow {
        return castGuarded(this._content.findChildByName("back_button"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
    }

    private onChooseLayout(param1: WindowEvent, param2: IWindow): void {
        let _loc3_: RoomLayout = this.getLayout(param2);
        if (this.isAllowed(_loc3_, true)) {
            this._selectedLayout = _loc3_;
            this.refreshSelection();
        } else {
            this._navigator.openCatalogClubPage("RoomCreateViewCtrl");
        }
    }

    private getLayout(param1: IWindow): RoomLayout {
        return this.findLayout(stringOrNull(param1.tags[0]));
    }

    private findLayout(param1: string): RoomLayout {
        for (const _loc2_ of this._layouts ?? []) {
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return this._layouts[0];
    }

    private onContPicClick = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = asGuarded(param1.target, isIWindowContainer);
        this.onChooseLayout(param1, _loc2_);
    };

    private onCancelButtonClick = (param1: WindowEvent): void => {
        this.close();
    };

    private onHcMoreClick = (param1: WindowEvent): void => {
        Logger.log("HC LINK CLICKED");
        this._navigator.openCatalogClubPage("RoomCreateViewCtrl");
    };

    private onCreateButtonClick = (param1: WindowEvent): void => {
        let _loc8_: string = this._SafeStr_4743.getText();
        let _loc3_: string = this._SafeStr_5421.getText();
        let _loc5_: string = "model_" + this._selectedLayout.name;
        let _loc2_: number = parseInt(stringOrNull(this._maxVisitors.enumerateSelection()[this._maxVisitors.selection])) | 0;
        let _loc9_: number = 0;
        let _loc4_: number = 0;
        for (const _loc7_ of this._selectableAndVisibleCategories ?? []) {
            if (this._SafeStr_3234.selection == _loc4_) {
                _loc9_ = _loc7_.nodeId | 0;
                break;
            }
            _loc4_++;
        }
        let _loc6_: number = this._SafeStr_4327.selection;
        if (!this.isMandatoryFieldsFilled()) {
            return;
        }
        this._navigator.send(new CreateFlatMessageComposer(_loc8_, _loc3_, _loc5_, _loc9_, _loc2_, _loc6_));
    };

    private close(): void {
        this._content.visible = false;
        this._SafeStr_3268.reset();
    }
}
