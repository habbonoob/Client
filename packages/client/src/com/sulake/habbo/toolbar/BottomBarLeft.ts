import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import type { CatalogEvent } from '@/com/sulake/habbo/catalog/event/CatalogEvent';
import type { WiredMenuEvent } from '@/com/sulake/habbo/roomevents/events/WiredMenuEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
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
import { isIBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';
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
import { HabboToolbarIconEnum } from '@/com/sulake/habbo/toolbar/HabboToolbarIconEnum';
import { MeMenuNewController } from '@/com/sulake/habbo/toolbar/memenu/MeMenuNewController';
import { ProgMenuController } from '@/com/sulake/habbo/toolbar/progmenu/ProgMenuController';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class BottomBarLeft implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::BottomBarLeft'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        BottomBarLeft.#initStatics();
        return BottomBarLeft._log;
    }

    private static readonly ICON_BG_COLOR_OVER: number = 7433577;
    private static readonly ICON_BG_COLOR_OUT: number = 5723213;
    private static readonly ICON_MOUSE_OVER: string = "_hover";
    private static readonly ICON_MOUSE_OUT: string = "_normal";
    private static readonly COUNTER_MARGIN: number = 0;
    private static readonly ME_MENU_ICON_NAME: string = "icon_me_menu";
    private static readonly ICON_REGION_WIDTH: number = 45;
    private static readonly ICON_LABEL_HEIGHT: number = 20;
    private static readonly WINDOW_RIGHT_PADDING: number = 10;
    private static readonly COLLAPSED_MARGIN: number = 185;
    private static readonly DEFAULT_LOCATION: Point = new Point(0, 500);
    private static readonly LANDING_VIEW_LOCATION: Point = new Point(0, 500);

    constructor(param1: HabboToolbar, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IEventDispatcher) {
        let _loc5_: IWindowContainer = null;
        this._toolbar = param1;
        this._windowManager = param2;
        this._assets = param3;
        this._events = param4;
        this._memenu = new MeMenuNewController(this._toolbar, this);
        this._progmenu = new ProgMenuController(this._toolbar, this);
        this._unseenItemCounters = new UtilsMap();
        let _loc13_: XmlAsset = asInstanceOf(param3.getAssetByName("bottom_bar_left_xml"), XmlAsset);
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(_loc13_.content, XML)), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._window.addEventListener("WE_PARENT_RESIZED", this.onParentResized);
        this._buttonContainer = asGuarded(this._window.getChildByName("toolbar_items"), isIBoxSizerWindow);
        let _loc14_: IWindowContainer = asGuarded(this._window.getChildByName("arrow_container_left"), isIWindowContainer);
        let _loc10_: IWindowContainer = asGuarded(this._window.getChildByName("arrow_container_right"), isIWindowContainer);
        this._left_arrow = asGuarded(_loc14_.getChildByName("collapse_left"), isIRegionWindow);
        this._right_arrow = asGuarded(_loc10_.getChildByName("collapse_right"), isIRegionWindow);
        if (this._left_arrow) {
            this._left_arrow.addEventListener("WME_CLICK", this.onCollapseToolsBar);
        }
        if (this._right_arrow) {
            this._right_arrow.addEventListener("WME_CLICK", this.onCollapseToolsBar);
        }
        this._SafeStr_4660 = asGuarded(this._buttonContainer.getChildByName("line"), isIStaticBitmapWrapperWindow);
        let _loc9_: any[] = [];
        this._window.groupChildrenWithTag("TOGGLE", _loc9_, -1);
        for (const _loc7_ of _loc9_ ?? []) {
            if (_loc7_ && isIRegionWindow(_loc7_)) {
                _loc7_.addEventListener("WME_CLICK", this.onIconClick);
            }
        }
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU"), false);
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_INVENTORY"), false);
        this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_WIRED_MENU"), false);
        let _loc12_: boolean = param1.getBoolean("games_icon_enabled");
        if (_loc12_) {
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_GAMES"), true);
        } else {
            this.iconVisibility(HabboToolbarIconEnum.getIconName("HTIE_ICON_GAMES"), false);
        }
        let _loc11_: XmlAsset = asInstanceOf(param3.getAssetByName("new_items_label_xml"), XmlAsset);
        this._SafeStr_2469 = asGuarded(param2.buildFromXML(asInstanceOf(_loc11_.content, XML), 2), isIWindowContainer);
        if (this._SafeStr_2469 == null) {
            throw new Error("Failed to construct toolbar label from XML!");
        }
        _loc5_ = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_NAVIGATOR")), isIWindowContainer);
        if (_loc5_) {
            this._windowManager.registerHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_NAVIGATOR"), _loc5_);
        }
        _loc5_ = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU")), isIWindowContainer);
        if (_loc5_) {
            this._windowManager.registerHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU"), _loc5_);
        }
        _loc5_ = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_INVENTORY")), isIWindowContainer);
        if (_loc5_) {
            this._windowManager.registerHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_INVENTORY"), _loc5_);
        }
        let _loc8_: IWindowContainer = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE")), isIWindowContainer);
        _loc8_.addChild(this._SafeStr_2469);
        this._windowManager.registerHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE"), _loc8_);
        let _loc15_: ITextWindow = asGuarded(this._SafeStr_2469.findChildByName("new_textfield"), isITextWindow);
        let _loc6_: ILocalization = param1.localization.getLocalizationRaw("toolbar.new_additions.notification");
        if (_loc6_ != null) {
            _loc15_.text = _loc6_.value;
        }
        this._SafeStr_2469.visible = false;
        this._SafeStr_2469.x = _loc8_.width - this._SafeStr_2469.width - 0;
        this._SafeStr_2469.y = 0;
        this._SafeStr_6416 = this.isNewItemsNotificationEnabled();
        this.checkSize();
        (param1 instanceof Component ? param1 : null).context.addLinkEventTracker(this);
    }

    declare private _events: IEventDispatcher;

    declare private _toolbar: HabboToolbar;

    declare private _assets: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _unseenItemCounters: UtilsMap;

    declare private _SafeStr_2469: IWindowContainer;

    declare private _SafeStr_6416: boolean;
    static { (this.prototype as any)._SafeStr_6416 = false; }

    declare private _SafeStr_3408: BitmapData;

    declare private _left_arrow: IRegionWindow;

    declare private _right_arrow: IRegionWindow;

    declare private _buttonContainer: IBoxSizerWindow;

    declare private _SafeStr_4660: IStaticBitmapWrapperWindow;

    declare private _SafeStr_4107: string;

    declare private _unseenMiniMailMessageCount: number;
    static { (this.prototype as any)._unseenMiniMailMessageCount = 0; }

    declare private _unseenAchievementCount: number;
    static { (this.prototype as any)._unseenAchievementCount = 0; }

    declare private _unseenDailyTasksCount: number;
    static { (this.prototype as any)._unseenDailyTasksCount = 0; }

    declare private _unseenForumsCount: number;
    static { (this.prototype as any)._unseenForumsCount = 0; }

    private _SafeStr_3038: boolean = false;

    declare private _memenu: MeMenuNewController;

    declare private _progmenu: ProgMenuController;

    declare private _window: IWindowContainer;

    public get window(): IWindow {
        return this._window;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set onDuty(param1: boolean) {
        let _loc2_: IWindow = this._window.findChildByName("guide_icon");
        if (_loc2_ != null) {
            _loc2_.visible = param1;
        }
    }

    public set unseenAchievementCount(param1: number) {
        this._unseenAchievementCount = param1;
    }

    public set unseenDailyTasksCount(param1: number) {
        this._unseenDailyTasksCount = param1;
    }

    public set unseenMiniMailMessageCount(param1: number) {
        this._unseenMiniMailMessageCount = param1;
    }

    public set unseenForumsCount(param1: number) {
        this._unseenForumsCount = param1;
    }

    public get unseenMeMenuCount(): number {
        return this._unseenMiniMailMessageCount + this._unseenForumsCount;
    }

    public get unseenProgMenuCount(): number {
        return this._unseenAchievementCount + this._unseenDailyTasksCount;
    }

    public get memenu(): MeMenuNewController {
        return this._memenu;
    }

    public get progmenu(): ProgMenuController {
        return this._progmenu;
    }

    public get linkPattern(): string {
        return "toolbar/";
    }

    public dispose(): void {
        if (this._memenu != null) {
            this._memenu.dispose();
            this._memenu = null;
        }
        if (this._progmenu != null) {
            this._progmenu.dispose();
            this._progmenu = null;
        }
        if (this._SafeStr_3408 != null) {
            this._SafeStr_3408.dispose();
            this._SafeStr_3408 = null;
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
        if (this._windowManager) {
            this._windowManager.unregisterHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_NAVIGATOR"));
            this._windowManager.unregisterHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU"));
            this._windowManager.unregisterHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_INVENTORY"));
            this._windowManager.unregisterHintWindow(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE"));
        }
        if (this._toolbar) {
            (this._toolbar instanceof Component ? this._toolbar : null).context.removeLinkEventTracker(this);
            this._toolbar = null;
        }
        this._windowManager = null;
        this._assets = null;
        this._disposed = true;
        if (this._events) {
            this._events = null;
        }
    }

    public getToolbarState(): string {
        return this._SafeStr_4107;
    }

    public setToolbarState(param1: string): void {
        let _loc3_: string = null;
        let _loc5_: string = null;
        let _loc6_: boolean = false;
        if (param1 == "HTE_STATE_HIDDEN") {
            this._window.visible = false;
            return;
        }
        this._window.visible = true;
        if (param1 != "HTE_STATE_COLLAPSED") {
            this._SafeStr_4107 = param1;
        }
        let _loc7_: any[] = [];
        this._window.groupChildrenWithTag("TOGGLE", _loc7_, -1);
        switch (param1) {
            case "HTE_STATE_GAME_CENTER_VIEW":
                _loc3_ = "VISIBLE_GAME_CENTER";
                this._window.position = BottomBarLeft.DEFAULT_LOCATION;
                break;
            case "HTE_STATE_HOTEL_VIEW":
                _loc3_ = "VISIBLE_HOTEL";
                this._window.position = BottomBarLeft.LANDING_VIEW_LOCATION;
                break;
            case "HTE_STATE_NOOB_NOT_HOME":
                _loc3_ = "VISIBLE_NOOB";
                this._window.position = BottomBarLeft.DEFAULT_LOCATION;
                break;
            case "HETE_STATE_NOOB_HOME":
                _loc3_ = "VISIBLE_ROOM";
                this._window.position = BottomBarLeft.DEFAULT_LOCATION;
                break;
            case "HTE_STATE_ROOM_VIEW":
                _loc3_ = "VISIBLE_ROOM";
                this._window.position = BottomBarLeft.DEFAULT_LOCATION;
                break;
            case "HTE_STATE_COLLAPSED":
                _loc3_ = "VISIBLE_COLLAPSED";
                this._window.position = BottomBarLeft.DEFAULT_LOCATION;
        }
        let _loc4_: boolean = param1 == "HTE_STATE_ROOM_VIEW" || param1 == "HETE_STATE_NOOB_HOME" || param1 == "HTE_STATE_NOOB_NOT_HOME" || this._SafeStr_3038 && (this._SafeStr_4107 == "HTE_STATE_ROOM_VIEW" || this._SafeStr_4107 == "HETE_STATE_NOOB_HOME" || this._SafeStr_4107 == "HTE_STATE_NOOB_NOT_HOME");
        for (const _loc2_ of _loc7_ ?? []) {
            if (_loc2_) {
                _loc2_.visible = _loc2_.tags.indexOf(_loc3_) >= 0;
                if (_loc2_.name == "STORIES" && !this._SafeStr_3038) {
                    _loc2_.visible &&= this._toolbar.getBoolean("toolbar.stories.enabled");
                } else if (_loc2_.name == "BUILDER" && !this._SafeStr_3038) {
                    _loc2_.visible &&= this._toolbar.getBoolean("builders.club.enabled");
                } else if (_loc2_.name == "GAMES") {
                    _loc2_.visible &&= this._toolbar.getBoolean("games_icon_enabled");
                } else if (_loc2_.name == "CAMERA") {
                    _loc5_ = this._toolbar.getProperty("camera.launch.ui.position");
                    _loc6_ = this._toolbar.sessionDataManager.isPerkAllowed("CAMERA");
                    _loc2_.visible = _loc4_ && _loc5_ == "bottom-icons" && _loc6_;
                } else if (_loc2_.name == "WIRED_MENU") {
                    _loc2_.visible = _loc4_ && this._toolbar.roomEvents != null && this._toolbar.roomEvents.showToolbarMenuButton();
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

    public calculateNewWidth(): number {
        let _loc3_: any[] = [];
        let _loc2_: number = 1;
        this._window.groupChildrenWithTag("TOGGLE", _loc3_, -1);
        for (const _loc1_ of _loc3_ ?? []) {
            if (_loc1_ && _loc1_.visible) {
                _loc2_++;
            }
        }
        return _loc2_;
    }

    public setIconBitmap(param1: string, param2: BitmapData): void {
        let _loc3_: string = null;
        if (!param2) {
            return;
        }
        let _loc5_: any = param1;
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
        let _loc4_: IWindow = null;
        let _loc2_: Rectangle = new Rectangle();
        let _loc5_: string = null;
        _loc5_ = this.getIconName(param1);
        if (_loc5_ != null) {
            _loc4_ = this._window.findChildByName(_loc5_);
        }
        if (_loc4_ != null && _loc4_.visible) {
            _loc4_.getGlobalRectangle(_loc2_);
            return _loc2_;
        }
        let _loc3_: Rectangle = this._memenu.getIconPosition(param1);
        if (_loc3_ != null) {
            return _loc3_;
        }
        _loc3_ = this._progmenu.getIconPosition(param1);
        if (_loc3_ != null) {
            return _loc3_;
        }
        return null;
    }

    public geIcon(param1: string): IWindow {
        let _loc3_: IWindow = null;
        let _loc2_: string = this.getIconName(param1);
        _loc3_ = this._window.findChildByName(_loc2_);
        if (!_loc3_) {
            _loc3_ = this._memenu.getIcon(param1);
        }
        if (!_loc3_) {
            _loc3_ = this._progmenu.getIcon(param1);
        }
        return _loc3_;
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
            BottomBarLeft._log.warn("[Toolbar] Unknown icon type for unseen item counter for iconId: " + param1);
        }
        let _loc3_: IWindowContainer = asGuarded(this._unseenItemCounters.getValue(param1), isIWindowContainer);
        if (!_loc3_) {
            _loc3_ = this._windowManager.createUnseenItemCounter();
            _loc2_ = asGuarded(this._window.findChildByName(_loc4_), isIWindowContainer);
            if (_loc2_) {
                if (param1 == "HTIE_ICON_MEMENU") {
                    _loc3_.setParamFlag(16, false);
                }
                _loc2_.addChild(_loc3_);
                _loc3_.x = _loc2_.width - _loc3_.width - 0;
                _loc3_.y = 0;
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
        _loc7_ = this.getIconName(param1);
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

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        switch (_loc2_[1]) {
            case "memenu":
                this.memenu.toggleVisibility();
                break;
            case "highlight":
                if (_loc2_.length <= 2) {
                    return;
                }
                switch (_loc2_[2]) {
                    case "catalog":
                        this._windowManager.showHint(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE"));
                        break;
                    case "navigator":
                        this._windowManager.showHint(HabboToolbarIconEnum.getIconName("HTIE_ICON_NAVIGATOR"));
                        break;
                    case "memenu":
                        this._windowManager.showHint(HabboToolbarIconEnum.getIconName("HTIE_ICON_MEMENU"));
                }
                break;
            default:
                BottomBarLeft._log.warn("Toolbar unknown link-type received: " + _loc2_[1]);
        }
    }

    public getToolbarAreaWidth(): number {
        if (!this._SafeStr_4660 || !this._SafeStr_4660.parent) {
            return 0;
        }
        return this._SafeStr_3038 ? 185 : this._SafeStr_4660.x + this._SafeStr_4660.parent.x;
    }

    private onPanicButton(param1: WindowMouseEvent, param2: any): void {
        this._toolbar.toggleWindowVisibility("PANIC");
    }

    private onParentResized = (param1: WindowEvent): void => {
        this.checkSize();
    };

    private checkSize(): void {
        if (!this._window || !this._windowManager) {
            return;
        }
        this._left_arrow.visible = !this._SafeStr_3038;
        this._right_arrow.visible = this._SafeStr_3038;
        this._window.y = this._window.desktop.height - this._window.height;
        this._window.width = 45 * this.calculateNewWidth() + 10 + 150;
        if (!this._SafeStr_3038) {
            if (this._memenu != null) {
                this._memenu.reposition();
            }
            if (this._progmenu != null) {
                this._progmenu.reposition();
            }
        }
        this._window.invalidate();
    }

    private disableCatalogIcon(): void {
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_CATALOGUE")), isIWindowContainer);
        _loc1_.blend = 0.5;
        _loc1_.disable();
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

    private onIconHoverMouseEvent(param1: WindowMouseEvent): void {
        let _loc2_: IWindowContainer = asGuarded(param1.target, isIWindowContainer);
        if (!_loc2_) {
            return;
        }
        let _loc3_: IBorderWindow = asGuarded(_loc2_.findChildByTag("ICON_BORDER"), isIBorderWindow);
        let _loc4_: IBitmapDataContainer = asGuarded(_loc2_.findChildByTag("ICON_BMP"), isIBitmapDataContainer);
        BottomBarLeft._log.info(String(param1));
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
    }

    private setIconHoverState(param1: IBitmapDataContainer, param2: string): void {
        let _loc3_: IStaticBitmapWrapperWindow = null;
        let _loc4_: IBitmapWrapperWindow = null;
        if (isIStaticBitmapWrapperWindow(param1)) {
            _loc3_ = isIStaticBitmapWrapperWindow(param1) ? param1 : null;
            _loc3_.assetUri = _loc3_.name + param2;
        } else if (isIBitmapWrapperWindow(param1)) {
            _loc4_ = isIBitmapWrapperWindow(param1) ? param1 : null;
            if (_loc4_.name == "icon_me_menu") {
                _loc4_.bitmap = this._SafeStr_3408;
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
        this._windowManager.hideMatchingHint(_loc2_);
    };

    private getIconName(param1: string): string {
        let _loc2_: string = null;
        switch (param1) {
            case "HTIE_ICON_CATALOGUE":
                _loc2_ = "icons_toolbar_catalogue";
                break;
            case "HTIE_ICON_INVENTORY":
                _loc2_ = "icons_toolbar_inventory";
                break;
            case "HTIE_ICON_MEMENU":
                _loc2_ = "MEMENU";
                break;
            case "HTIE_ICON_NAVIGATOR":
                _loc2_ = "icons_toolbar_navigator";
                break;
            case "HTIE_ICON_PROGRESSION":
                _loc2_ = "icons_toolbar_progression";
                break;
            case "HTIE_ICON_GAMES":
                _loc2_ = "icons_toolbar_games";
                break;
            case "HTIE_ICON_STORIES":
                _loc2_ = "icons_toolbar_stories";
                break;
            case "HTIE_ICON_RECEPTION":
                _loc2_ = "icons_toolbar_reception";
                break;
            case "HTIE_ICON_BUILDER":
                _loc2_ = "icons_toolbar_builder";
                break;
            case "HTIE_ICON_CAMERA":
                _loc2_ = "icons_toolbar_camera";
                break;
            case "HTIE_ICON_WIRED_MENU":
                _loc2_ = "icons_toolbar_wired_menu";
        }
        return _loc2_;
    }

    private setMeMenuIconBitmaps(param1: BitmapData): void {
        if (this._SafeStr_3408 != null) {
            this._SafeStr_3408.dispose();
        }
        if (param1 != null) {
            this._SafeStr_3408 = param1.clone();
        }
        param1.dispose();
    }

    private onCollapseToolsBar = (param1: WindowMouseEvent): void => {
        this._SafeStr_3038 = !this._SafeStr_3038;
        if (this._SafeStr_3038) {
            this.setToolbarState("HTE_STATE_COLLAPSED");
        } else {
            this.setToolbarState(this._SafeStr_4107);
        }
        this.checkSize();
        this._toolbar.roomUI.triggerbottomBarResize();
    };

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

    public onWiredMenuEvent(param1: WiredMenuEvent): void {
        let _loc2_: IWindowContainer = null;
        let _loc3_: any = param1.type;
        if ("WIRED_MENU_BUTTON_PREFERENCE_CHANGED" === _loc3_) {
            _loc2_ = asGuarded(this._window.findChildByName(HabboToolbarIconEnum.getIconName("HTIE_ICON_WIRED_MENU")), isIWindowContainer);
            _loc2_.visible = this._toolbar.roomEvents != null && this._toolbar.roomEvents.showToolbarMenuButton();
        }
        this.checkSize();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BottomBarLeft.#staticsReady) return;
        BottomBarLeft.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BottomBarLeft, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.toolbar.BottomBarLeft"));
    }
}
