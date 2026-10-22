import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { ToolbarView } from '@/com/sulake/habbo/toolbar/ToolbarView';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { MeMenuIconLoader } from '@/com/sulake/habbo/toolbar/memenu/MeMenuIconLoader';
import { MeMenuSettingsMenuView } from '@/com/sulake/habbo/toolbar/memenu/MeMenuSettingsMenuView';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MeMenuController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu::MeMenuController'); }

    public static readonly USE_GUIDE_TOOL: string = "USE_GUIDE_TOOL";

    declare private _toolbar: HabboToolbar;

    declare private _toolbarView: ToolbarView;

    declare private _window: IWindowContainer;

    declare private _SafeStr_5086: MeMenuIconLoader;

    declare private _SafeStr_6897: boolean;
    static { (this.prototype as any)._SafeStr_6897 = false; }

    declare private _SafeStr_2606: MeMenuSettingsMenuView;

    declare private _unseenItemCounters: UtilsMap;

    constructor(param1: HabboToolbar, param2: ToolbarView) {
        this._unseenItemCounters = new UtilsMap();
        this._toolbar = param1;
        this._toolbarView = param2;
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
        let _loc3_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("me_menu_view_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML), 2), isIWindowContainer);
        this._SafeStr_5086 = new MeMenuIconLoader(this._toolbar);
        this._window.visible = false;
        this._window.procedure = this.windowProcedure;
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: IRegionWindow = null;
        let _loc3_: IStaticBitmapWrapperWindow = null;
        let _loc4_: IHabboNavigator = null;
        let _loc6_: string = null;
        if (isIRegionWindow(param2)) {
            _loc5_ = isIRegionWindow(param2) ? param2 : null;
            switch (param1.type) {
                case "WME_OVER":
                    _loc3_ = asGuarded(_loc5_.findChildByName(param2.name + "_icon"), isIStaticBitmapWrapperWindow);
                    if (_loc3_ != null) {
                        _loc3_.assetUri = "toolbar_memenu_" + param2.name + "_color";
                    }
                    break;
                case "WME_OUT":
                    _loc3_ = asGuarded(_loc5_.findChildByName(param2.name + "_icon"), isIStaticBitmapWrapperWindow);
                    if (_loc3_ != null) {
                        _loc3_.assetUri = "toolbar_memenu_" + param2.name + "_white";
                    }
                    break;
                case "WME_CLICK":
                    this._window.visible = false;
                    switch (param2.name) {
                        case "profile":
                            this._toolbar.connection.send(new GetExtendedProfileMessageComposer(this._toolbar.sessionDataManager.userId));
                            break;
                        case "minimail":
                            HabboWebTools.openMinimail("#mail/inbox/");
                            break;
                        case "rooms":
                            _loc4_ = this._toolbar.navigator;
                            if (_loc4_ != null) {
                                _loc4_.showOwnRooms();
                            }
                            break;
                        case "talents":
                            _loc6_ = this._toolbar.sessionDataManager.currentTalentTrack;
                            this._toolbar.connection.send(new GetTalentTrackMessageComposer(_loc6_));
                            break;
                        case "settings":
                            this._SafeStr_2606 = new MeMenuSettingsMenuView();
                            this._SafeStr_2606.init(this, this._toolbarView);
                            break;
                        case "achievements":
                            this._toolbar.questEngine.showAchievements();
                            break;
                        case "guide":
                            this._toolbar.toggleWindowVisibility("GUIDE");
                            break;
                        case "clothes":
                            this._toolbar.context.createLinkEvent("avatareditor/open");
                    }
            }
        }
    };

    private onToolbarClick = (param1: HabboToolbarEvent): void => {
        if (this._SafeStr_6897) {
            return;
        }
        if (param1.iconId == "HTIE_ICON_MEMENU") {
            this.toggleVisibility();
        } else {
            this._window.visible = false;
            if (this._SafeStr_2606 != null) {
                this._SafeStr_2606.dispose();
                this._SafeStr_2606 = null;
            }
        }
    };

    private setGuideToolVisibility(param1: boolean): void {
        this._window.findChildByName("guide").visible = param1;
        this._window.height = param1 ? this._window.findChildByName("guide").bottom + 5 : this._window.findChildByName("achievements").bottom + 5;
    }

    public toggleVisibility(): void {
        let _loc1_: boolean = false;
        if (this._SafeStr_2606 != null) {
            this._SafeStr_2606.dispose();
            this._SafeStr_2606 = null;
        }
        this._window.visible = !this._window.visible;
        if (this._window.visible) {
            if (!this.toolbar.getBoolean("talent.track.enabled")) {
                this._window.findChildByName("guide").rectangle = this._window.findChildByName("talents").rectangle;
                this._window.findChildByName("talents").visible = false;
            }
            if (this._toolbar.getBoolean("guides.enabled")) {
                _loc1_ = this._toolbar.sessionDataManager.isPerkAllowed("USE_GUIDE_TOOL");
                this.setGuideToolVisibility(_loc1_);
            }
        }
        this.reposition();
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2606 != null) {
            this._SafeStr_2606.dispose();
            this._SafeStr_2606 = null;
        }
        this._SafeStr_5086.dispose();
        this._SafeStr_5086 = null;
        this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
        this._toolbarView = null;
        this._toolbar = null;
    }

    public get disposed(): boolean {
        return this._toolbar == null;
    }

    public get toolbar(): HabboToolbar {
        return this._toolbar;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public reposition(): void {
        this._window.x = this._toolbarView.window.width + 10;
        this._window.y = this._toolbarView.window.bottom - this._window.height;
    }

    public getUnseenItemCounter(param1: string): IWindowContainer {
        let _loc2_: IWindowContainer = null;
        let _loc4_: string = param1;
        if (!_loc4_) {
            Logger.log("[Toolbar] Unknown icon type for unseen item counter for iconId: " + param1);
        }
        let _loc3_: IWindowContainer = asGuarded(this._unseenItemCounters.getValue(param1), isIWindowContainer);
        if (!_loc3_) {
            _loc3_ = this._toolbar.windowManager.createUnseenItemCounter();
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

    public set achievementCount(param1: number) {
        this.setUnseenItemCount("achievements", param1);
    }

    public set minimailCount(param1: number) {
        this.setUnseenItemCount("minimail", param1);
    }

    public set newUiEnabled(param1: boolean) {
        this._SafeStr_6897 = param1;
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

    get [IDisposable](): true {
        return true;
    }
}
