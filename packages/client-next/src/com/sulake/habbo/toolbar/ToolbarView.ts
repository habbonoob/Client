import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import type { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Dispose } from '@/com/sulake/core/window/motion/Dispose';
import { DropBounce } from '@/com/sulake/core/window/motion/DropBounce';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { JumpBy } from '@/com/sulake/core/window/motion/JumpBy';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { Queue } from '@/com/sulake/core/window/motion/Queue';
import { Wait } from '@/com/sulake/core/window/motion/Wait';
import { isIBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboToolbarIconEnum } from '@/com/sulake/habbo/toolbar/HabboToolbarIconEnum';
import { MeMenuController } from '@/com/sulake/habbo/toolbar/memenu/MeMenuController';

export class ToolbarView implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::ToolbarView'); }

    private static readonly ICON_BG_COLOR_OVER: number = 7433577;
    private static readonly ICON_BG_COLOR_OUT: number = 5723213;
    private static readonly ICON_MOUSE_OVER: string = "_hover";
    private static readonly ICON_MOUSE_OUT: string = "_normal";
    private static readonly COUNTER_MARGIN: number = 5;
    private static readonly ME_MENU_ICON_NAME: string = "icon_me_menu";
    private static readonly ICON_REGION_HEIGHT: number = 80;
    private static readonly ICON_LABEL_HEIGHT: number = 20;
    private static readonly WINDOW_BOTTOM_PADDING: number = 52;
    private static readonly DEFAULT_LOCATION: Point = new Point(3, 3);
    private static readonly LANDING_VIEW_LOCATION: Point = new Point(3, 3);

    declare private _window: IWindowContainer;

    declare private _events: IEventDispatcher;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _toolbar: HabboToolbar;

    declare private _assets: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _unseenItemCounters: UtilsMap;

    declare private _SafeStr_2469: IWindowContainer;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _SafeStr_6416: boolean;
    static { (this.prototype as any)._SafeStr_6416 = false; }

    declare private _SafeStr_3408: BitmapData;

    declare private _SafeStr_3438: BitmapData;

    declare private _SafeStr_6178: number;
    static { (this.prototype as any)._SafeStr_6178 = 0; }

    declare private _SafeStr_6231: number;
    static { (this.prototype as any)._SafeStr_6231 = 0; }

    declare private _memenu: MeMenuController;

    constructor(param1: HabboToolbar, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IEventDispatcher, param5: ISessionDataManager) {
        this._toolbar = param1;
        this._windowManager = param2;
        this._assets = param3;
        this._events = param4;
        this._sessionDataManager = param5;
        this._memenu = new MeMenuController(this._toolbar, this);
        this._memenu.newUiEnabled = true;
        this._unseenItemCounters = new UtilsMap();
        let _loc13_: XmlAsset = asInstanceOf(param3.getAssetByName("toolbar_view_xml"), XmlAsset);
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(_loc13_.content, XML), 2), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._window.position = ToolbarView.DEFAULT_LOCATION;
        this._window.addEventListener("WE_PARENT_RESIZED", this.onParentResized);
        let _loc9_: any[] = [];
        this._window.groupChildrenWithTag("TOGGLE", _loc9_, -1);
        for (const _loc7_ of _loc9_ ?? []) {
            if (_loc7_ && isIRegionWindow(_loc7_)) {
                _loc7_.addEventListener("WME_CLICK", this.onIconClick);
                _loc7_.addEventListener("WME_OVER", this.onIconHoverMouseEvent);
                _loc7_.addEventListener("WME_OUT", this.onIconHoverMouseEvent);
            }
        }
        _loc9_ = [];
        this._window.groupChildrenWithTag("ICON_BMP", _loc9_, -1);
        for (const _loc11_ of _loc9_ ?? []) {
            this.setIconHoverState(_loc11_, "_normal");
        }
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_PROGRESSION"), false);
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU"), false);
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_INVENTORY"), true);
        let _loc12_: boolean = param1.getBoolean("games_icon_enabled");
        if (_loc12_) {
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_GAMES"), true);
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_ACHIEVEMENTS"), false);
        } else {
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_GAMES"), false);
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_ACHIEVEMENTS"), true);
        }
        let _loc10_: XmlAsset = asInstanceOf(param3.getAssetByName("new_items_label_xml"), XmlAsset);
        this._SafeStr_2469 = asGuarded(param2.buildFromXML(asInstanceOf(_loc10_.content, XML), 2), isIWindowContainer);
        if (this._SafeStr_2469 == null) {
            throw new Error("Failed to construct toolbar label from XML!");
        }
        let _loc8_: IWindowContainer = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE")), isIWindowContainer);
        _loc8_.addChild(this._SafeStr_2469);
        let _loc14_: ITextWindow = asGuarded(this._SafeStr_2469.findChildByName("new_textfield"), isITextWindow);
        let _loc6_: ILocalization = param1.localization.getLocalizationRaw("toolbar.new_additions.notification");
        if (_loc6_ != null) {
            _loc14_.text = _loc6_.value;
        }
        this._SafeStr_2469.visible = false;
        this._SafeStr_2469.x = _loc8_.width - this._SafeStr_2469.width - 5;
        this._SafeStr_2469.y = 5;
        this._SafeStr_6416 = this.isNewItemsNotificationEnabled();
        this.checkSize();
        (this._toolbar instanceof Component ? this._toolbar : null).context.addLinkEventTracker(this);
    }

    private static addShadow(param1: BitmapData, param2: Point, param3: number): BitmapData {
        let _loc4_: BitmapData = new BitmapData(param1.width, param1.height, true, 0);
        _loc4_.fillRect(_loc4_.rect, param3);
        _loc4_.copyChannel(param1, param1.rect, new Point(0, 0), 8, 8);
        let _loc5_: BitmapData = new BitmapData(param1.width + param2.x | 0, param1.height + param2.y | 0, true, 0);
        _loc5_.copyPixels(_loc4_, _loc4_.rect, param2);
        _loc5_.copyPixels(param1, param1.rect, new Point(0, 0), null, null, true);
        _loc4_.dispose();
        return _loc5_;
    }

    private onPanicButton(param1: WindowMouseEvent): void {
        this._toolbar.toggleWindowVisibility("PANIC");
    }

    private onParentResized = (param1: WindowEvent): void => {
        this.checkSize();
    };

    private checkSize(): void {
        if (!this._window || !this._windowManager) {
            return;
        }
        this.setLabelVisibility(true);
        if (this.shrinkListSpacing()) {
            this.setLabelVisibility(false);
            this.shrinkListSpacing();
        }
        this._window.invalidate();
        if (this._memenu != null) {
            this._memenu.reposition();
        }
    }

    private setLabelVisibility(param1: boolean): void {
        let _loc4_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc6_: IWindow = null;
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("toolbar_items"), isIItemListWindow);
        let _loc3_: number = _loc5_.numListItems;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = asGuarded(_loc5_.getListItemAt(_loc4_ >>> 0), isIWindowContainer);
            if (_loc2_ != null) {
                _loc6_ = _loc2_.findChildByName("text");
                if (_loc6_ != null) {
                    _loc6_.visible = param1;
                    _loc2_.height = param1 ? 80 : 80 - 20;
                }
            }
            _loc4_++;
        }
    }

    private shrinkListSpacing(): boolean {
        let _loc1_: IItemListWindow = asGuarded(this._window.findChildByName("toolbar_items"), isIItemListWindow);
        _loc1_.spacing = 2;
        _loc1_.scrollV = 0;
        _loc1_.arrangeListItems();
        while (this._window.bottom > this._windowManager.getDesktop(2).height - 52) {
            if (_loc1_.spacing == -5) {
                return true;
            }
            _loc1_.spacing--;
        }
        return false;
    }

    public dispose(): void {
        if (this._memenu != null) {
            this._memenu.dispose();
            this._memenu = null;
        }
        if (this._SafeStr_3408 != null) {
            this._SafeStr_3408.dispose();
            this._SafeStr_3408 = null;
        }
        if (this._SafeStr_3438 != null) {
            this._SafeStr_3438.dispose();
            this._SafeStr_3438 = null;
        }
        if (this._unseenItemCounters != null) {
            this._unseenItemCounters.dispose();
            this._unseenItemCounters = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2469 != null) {
            this._SafeStr_2469.dispose();
            this._SafeStr_2469 = null;
        }
        if (this._toolbar) {
            (this._toolbar instanceof Component ? this._toolbar : null).context.removeLinkEventTracker(this);
        }
        this._toolbar = null;
        this._windowManager = null;
        this._assets = null;
        this._disposed = true;
        if (this._events) {
            this._events = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindow {
        return this._window;
    }

    private disableCatalogIcon(): void {
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE")), isIWindowContainer);
        _loc1_.blend = 0.5;
        _loc1_.disable();
    }

    public onCatalogEvent(param1: CatalogEvent): void {
        let _loc2_: IWindowContainer = null;
        let _loc3_: string = null;
        switch (param1.type) {
            case "CATALOG_INITIALIZED":
                _loc2_ = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE")), isIWindowContainer);
                _loc2_.blend = 1;
                _loc2_.enable();
                _loc3_ = this._toolbar.getProperty("open.catalog.page");
                if (_loc3_.length > 0 && this._toolbar.catalog) {
                    this._toolbar.catalog.openCatalogPage("hc_membership");
                    this._toolbar.setProperty("open.catalog.page", "");
                }
                break;
            case "CATALOG_NOT_READY":
                this.disableCatalogIcon();
                break;
            case "CATALOG_NEW_ITEMS_SHOW":
                if (this._SafeStr_2469 != null && this._SafeStr_6416) {
                    this._SafeStr_2469.visible = true;
                }
                break;
            case "CATALOG_NEW_ITEMS_HIDE":
                if (this._SafeStr_2469 != null) {
                    this._SafeStr_2469.visible = false;
                }
        }
    }

    public setToolbarState(param1: string): void {
        let _loc3_: string = null;
        if (param1 == "HTE_STATE_HIDDEN") {
            this._window.visible = false;
            return;
        }
        this._window.visible = true;
        let _loc4_: any[] = [];
        this._window.groupChildrenWithTag("TOGGLE", _loc4_, -1);
        switch (param1) {
            case "HTE_STATE_GAME_CENTER_VIEW":
                _loc3_ = "VISIBLE_GAME_CENTER";
                this._window.position = ToolbarView.DEFAULT_LOCATION;
                break;
            case "HTE_STATE_HOTEL_VIEW":
                _loc3_ = "VISIBLE_HOTEL";
                this._window.position = ToolbarView.LANDING_VIEW_LOCATION;
                break;
            case "HTE_STATE_ROOM_VIEW":
                _loc3_ = "VISIBLE_ROOM";
                this._window.position = ToolbarView.DEFAULT_LOCATION;
        }
        for (const _loc2_ of _loc4_ ?? []) {
            if (_loc2_) {
                _loc2_.visible = _loc2_.tags.indexOf(_loc3_) >= 0;
                if (_loc2_.name == "QUESTS") {
                    _loc2_.visible &&= !this._toolbar.isNewIdentity() || !this._toolbar.getBoolean("new.identity.hide.quests");
                    _loc2_.visible &&= !this._toolbar.getBoolean("toolbar.hide.quests");
                }
                if (_loc2_.name == "STORIES") {
                    _loc2_.visible &&= this._toolbar.getBoolean("toolbar.stories.enabled");
                }
                if (_loc2_.name == "BUILDER") {
                    _loc2_.visible &&= this._toolbar.getBoolean("builders.club.enabled");
                }
            }
        }
        this.checkSize();
    }

    public iconVisibility(param1: string, param2: boolean): void {
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName(param1), isIWindowContainer);
        if (_loc3_) {
            _loc3_.visible = param2;
        }
        this.checkSize();
    }

    private onNaviHover(param1: WindowMouseEvent): void {
        let _loc2_: Rectangle = null;
        if (this._toolbar.navigator == null) {
            return;
        }
        switch (param1.type) {
            case "WME_OVER":
                _loc2_ = this.getIconLocation("HTIE_ICON_NAVIGATOR");
                this._toolbar.navigator.showToolbarHover(new Point(_loc2_.right + 15, _loc2_.y));
                break;
            case "WME_OUT":
                this._toolbar.navigator.hideToolbarHover(true);
        }
    }

    private onIconHoverMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindowContainer = asGuarded(param1.target, isIWindowContainer);
        if (!_loc2_) {
            return;
        }
        let _loc3_: IBorderWindow = asGuarded(_loc2_.findChildByTag("ICON_BORDER"), isIBorderWindow);
        let _loc4_: IBitmapDataContainer = asGuarded(_loc2_.findChildByTag("ICON_BMP"), isIBitmapDataContainer);
        Logger.log(param1);
        switch (param1.type) {
            case "WME_OVER":
                this.setIconHoverState(_loc4_, "_hover");
                this.setIconBgHoverState(_loc3_, "_hover");
                if (param1.target.name == "NAVIGATOR") {
                    this.onNaviHover(param1);
                }
                break;
            case "WME_OUT":
                this.setIconHoverState(_loc4_, "_normal");
                this.setIconBgHoverState(_loc3_, "_normal");
                if (param1.target.name == "NAVIGATOR") {
                    this.onNaviHover(param1);
                }
        }
    };

    private setIconHoverState(param1: IBitmapDataContainer, param2: string): void {
        let _loc3_: IStaticBitmapWrapperWindow = null;
        let _loc4_: IBitmapWrapperWindow = null;
        if (isIStaticBitmapWrapperWindow(param1)) {
            _loc3_ = isIStaticBitmapWrapperWindow(param1) ? param1 : null;
            _loc3_.assetUri = _loc3_.name + param2;
        } else if (isIBitmapWrapperWindow(param1)) {
            _loc4_ = isIBitmapWrapperWindow(param1) ? param1 : null;
            if (_loc4_.name == "icon_me_menu") {
                _loc4_.bitmap = param2 == "_normal" ? this._SafeStr_3408 : this._SafeStr_3438;
            }
        }
    }

    private setIconBgHoverState(param1: IWindowContainer, param2: string): void {
        if (!param1) {
            return;
        }
        if (param2 == "_hover") {
            param1.color = 7433577;
        } else {
            param1.color = 5723213;
        }
    }

    private onIconClick = (param1: WindowMouseEvent): void => {
        let _loc2_: string = param1.target.name;
        this._toolbar.toggleWindowVisibility(_loc2_);
    };

    public setIconBitmap(param1: string, param2: BitmapData): void {
        let _loc3_: string = null;
        if (!param2) {
            return;
        }
        let _loc5_: string = param1;
        if ("HTIE_ICON_MEMENU" === _loc5_) {
            _loc3_ = "icon_me_menu";
            this.setMeMenuIconBitmaps(param2);
        }
        let _loc4_: IBitmapDataContainer = asGuarded(this._window.findChildByName(_loc3_), isIBitmapDataContainer);
        if (_loc4_ != null) {
            this.setIconHoverState(_loc4_, "_normal");
        }
    }

    public getIconLocation(param1: string): Rectangle {
        let _loc3_: IWindow = null;
        let _loc2_: Rectangle = null;
        switch (param1) {
            case "HTIE_ICON_NAVIGATOR":
                _loc3_ = this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_NAVIGATOR"));
                break;
            case "HTIE_ICON_PROGRESSION":
                _loc3_ = this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_PROGRESSION"));
                break;
            case "HTIE_ICON_GAMES":
                _loc3_ = this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_GAMES"));
        }
        if (_loc3_ != null && _loc3_.visible) {
            _loc2_ = new Rectangle();
            _loc3_.getGlobalRectangle(_loc2_);
            return _loc2_;
        }
        return null;
    }

    private setMeMenuIconBitmaps(param1: BitmapData): void {
        if (this._SafeStr_3408 != null) {
            this._SafeStr_3408.dispose();
        }
        if (this._SafeStr_3438 != null) {
            this._SafeStr_3438.dispose();
        }
        this._SafeStr_3408 = ToolbarView.addShadow(param1, new Point(2, 3), 4280426782);
        this._SafeStr_3438 = ToolbarView.addShadow(param1, new Point(4, 5), 4281150249);
        param1.dispose();
    }

    public setUnseenItemCount(param1: string, param2: number): void {
        let _loc3_: IWindowContainer = this.getUnseenItemCounter(param1);
        if (!_loc3_) {
            return;
        }
        if (param2 < 0) {
            _loc3_.visible = true;
            _loc3_.findChildByName("count").caption = " ";
        } else if (param2 > 0) {
            _loc3_.visible = true;
            _loc3_.findChildByName("count").caption = param2.toString();
        } else {
            _loc3_.visible = false;
        }
    }

    public getUnseenItemCounter(param1: string): IWindowContainer {
        let _loc2_: IWindowContainer = null;
        let _loc4_: string = HabboToolbarIconEnum.getIconName(param1);
        if (!_loc4_) {
            Logger.log("[Toolbar] Unknown icon type for unseen item counter for iconId: " + param1);
        }
        let _loc3_: IWindowContainer = asGuarded(this._unseenItemCounters.getValue(param1), isIWindowContainer);
        if (!_loc3_) {
            _loc3_ = this._windowManager.createUnseenItemCounter();
            _loc2_ = asGuarded(this._window.findChildByName(_loc4_), isIWindowContainer);
            if (_loc2_) {
                _loc2_.addChild(_loc3_);
                _loc3_.x = _loc2_.width - _loc3_.width - 5;
                _loc3_.y = 5;
                this._unseenItemCounters.add(param1, _loc3_);
            }
        }
        return _loc3_;
    }

    public isNewItemsNotificationEnabled(): boolean {
        return this._toolbar.getBoolean("toolbar.new_additions.notification.enabled");
    }

    public animateToIcon(param1: string, param2: BitmapData, param3: number, param4: number): Motion {
        let _loc14_: IWindow = null;
        let _loc11_: number = 20;
        let _loc16_: number = param2 ? param2.width : _loc11_;
        let _loc19_: number = param2 ? param2.height : _loc11_;
        let _loc18_: IBitmapWrapperWindow = asGuarded(this._windowManager.create("ToolBarTransition", 21, 0, 0, new Rectangle(param3, param4, _loc16_, _loc19_)), isIBitmapWrapperWindow);
        if (param2) {
            _loc18_.bitmap = param2;
            _loc18_.disposesBitmap = true;
            _loc18_.filters = [new GlowFilter(16777215, 1, 2, 2, 255, 1, false, false)];
        }
        this._windowManager.getDesktop(2).addChild(_loc18_);
        let _loc7_: string = null;
        switch (param1) {
            case "HTIE_ICON_CATALOGUE":
                _loc7_ = "icons_toolbar_catalogue";
                break;
            case "HTIE_ICON_INVENTORY":
                _loc7_ = "icons_toolbar_inventory";
                break;
            case "HTIE_ICON_MEMENU":
                _loc7_ = "icons_toolbar_me_menu";
                break;
            case "HTIE_ICON_NAVIGATOR":
                _loc7_ = "icons_toolbar_navigator";
                break;
            case "HTIE_ICON_PROGRESSION":
                _loc7_ = "icons_toolbar_progression";
                break;
            case "HTIE_ICON_GAMES":
                _loc7_ = "icons_toolbar_games";
                break;
            case "HTIE_ICON_STORIES":
                _loc7_ = "icons_toolbar_stories";
                break;
            case "HTIE_ICON_RECEPTION":
                _loc7_ = "icons_toolbar_reception";
        }
        if (_loc7_ != null) {
            _loc14_ = this._window.findChildByName(_loc7_);
        }
        if (!_loc14_) {
            _loc18_.dispose();
            return null;
        }
        let _loc12_: Rectangle = new Rectangle();
        _loc18_.getGlobalRectangle(_loc12_);
        let _loc10_: Rectangle = new Rectangle();
        _loc14_.getGlobalRectangle(_loc10_);
        let _loc13_: number = _loc12_.x - _loc10_.x | 0;
        let _loc15_: number = _loc12_.y - _loc10_.y | 0;
        let _loc5_: number = Math.sqrt(_loc13_ * _loc13_ + _loc15_ * _loc15_);
        let _loc8_: number = 500 - Math.abs(1 / _loc5_ * 100 * 500 * 0.5) | 0;
        let _loc9_: number = 20;
        let _loc17_: string = "ToolBarBouncing[ " + _loc7_ + " ]";
        if (!Motions.getMotionByTag(_loc17_)) {
            Motions.runMotion(new Queue(new Wait(_loc8_ + 8), new DropBounce(_loc14_, 400, 12))).tag = _loc17_;
        }
        let _loc6_: Motion = new Queue(new EaseOut(new JumpBy(_loc18_, _loc8_, _loc10_.x - _loc12_.x + _loc9_ | 0, _loc10_.y - _loc12_.y | 0, 100, 1), 1), new Dispose(_loc18_));
        return Motions.runMotion(_loc6_);
    }

    public set onDuty(param1: boolean) {
        this._window.findChildByName("guide_icon").visible = param1;
    }

    public get unseenAchievementCount(): number {
        return this._SafeStr_6231;
    }

    public set unseenAchievementCount(param1: number) {
        this._SafeStr_6231 = param1;
    }

    public get unseenMiniMailMessageCount(): number {
        return this._SafeStr_6178;
    }

    public set unseenMiniMailMessageCount(param1: number) {
        this._SafeStr_6178 = param1;
    }

    public get memenu(): MeMenuController {
        return this._memenu;
    }

    public get linkPattern(): string {
        return "toolbar/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc3_: any = _loc2_[1];
        if ("memenu" !== _loc3_) {
            Logger.log("Toolbar unknown link-type received: " + _loc2_[1]);
        } else {
            this.memenu.toggleVisibility();
        }
    }
}
