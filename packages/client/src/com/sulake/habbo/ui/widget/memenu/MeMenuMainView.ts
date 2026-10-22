import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { PerkAllowancesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/perk/PerkAllowancesMessageParser';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { AvatarExpressionEnum } from '@/com/sulake/habbo/ui/widget/enums/AvatarExpressionEnum';
import { RoomWidgetAvatarEditorMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetAvatarEditorMessage';
import { RoomWidgetAvatarExpressionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetAvatarExpressionMessage';
import { RoomWidgetDanceMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDanceMessage';
import { RoomWidgetOpenCatalogMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenCatalogMessage';
import { RoomWidgetOpenInventoryMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenInventoryMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';
import { RoomWidgetShowOwnRoomsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetShowOwnRoomsMessage';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class MeMenuMainView implements IMeMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu::MeMenuMainView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        MeMenuMainView.#initStatics();
        return MeMenuMainView._log;
    }

    public static readonly VIEW_ELEMENT_TYPE_MINI_MAIL: string = "minimail";

    constructor(param1: ICoreConfiguration) {
        this._config = param1;
    }

    declare private _widget: MeMenuWidget;

    declare private _icons: Map<any, any>;

    declare private _perkAllowancesMessageEvent: PerkAllowancesMessageEvent;

    declare private _config: ICoreConfiguration;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public init(param1: MeMenuWidget, param2: string): void {
        this._icons = new Dictionary();
        this._icons.set("rooms_icon", ["gohome_white", "gohome_color"]);
        this._icons.set("dance_icon", ["dance_white", "dance_color"]);
        this._icons.set("clothes_icon", ["clothes_white", "clothes_color"]);
        this._icons.set("effects_icon", ["effects_white", "effects_color"]);
        this._icons.set("badges_icon", ["badges_white", "badges_color"]);
        this._icons.set("wave_icon", ["wave_white", "wave_color"]);
        this._icons.set("hc_icon", ["_white", "_color"]);
        this._icons.set("settings_icon", ["settings_white", "settings_color"]);
        this._icons.set("credits_icon", ["credits_white", "credits_color"]);
        this._icons.set("minimail_icon", ["minimail_white", "minimail_color"]);
        this._icons.set("profile_icon", ["profile_white", "profile_color"]);
        this._icons.set("achievements_icon", ["achievements_white", "achievements_color"]);
        this._icons.set("talents_icon", ["compass_white", "compass_color"]);
        this._icons.set("guide_icon", ["lighthouse_white", "lighthouse_color"]);
        this._widget = param1;
        this._perkAllowancesMessageEvent = new PerkAllowancesMessageEvent(this.onPerkAllowances);
        this._widget.handler.container.connection.addMessageEvent(this._perkAllowancesMessageEvent);
        this.createWindow(param2);
    }

    public dispose(): void {
        if (this._perkAllowancesMessageEvent) {
            this._widget.handler.container.connection.removeMessageEvent(this._perkAllowancesMessageEvent);
            this._perkAllowancesMessageEvent = null;
        }
        this._widget = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public setIconAssets(param1: string, param2: string, param3: string = null, param4: string = null): void {
        if (this._icons.get(param1) == null) {
            return;
        }
        if (param3 != null) {
            this._icons.get(param1)[0] = param3;
        }
        if (param4 != null) {
            this._icons.get(param1)[1] = param4;
        }
        this.setElementImage(param1, param3);
    }

    public updateUnseenItemCount(param1: string, param2: number): void {
        let _loc3_: number = 0;
        let _loc4_: any = param1;
        if ("minimail" === _loc4_) {
            _loc3_ = this._widget.unreadMiniMailMessageCount;
            this.updateUnseenCounter("minimail", _loc3_);
        }
    }

    private createWindow(param1: string): void {
        let _loc12_: any[] = null;
        let _loc7_: string = null;
        let _loc3_: number = NaN;
        let _loc9_: string = null;
        let _loc8_: number = 0;
        let _loc2_: IWindow = null;
        let _loc10_: number = 0;
        if (this._widget == null) {
            return;
        }
        let _loc5_: string = "memenu_main";
        let _loc6_: boolean = false;
        if (this._widget.config.getBoolean("simple.memenu.enabled")) {
            _loc5_ += "_simple";
            _loc6_ = true;
        }
        let _loc4_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName(_loc5_), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML)), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct me menu main window from XML!");
        }
        this._window.name = param1;
        if (!this._widget.config.getBoolean("talent.track.enabled") && _loc6_) {
            this._window.findChildByName("guide").rectangle = this._window.findChildByName("talents").rectangle;
            this._window.findChildByName("talents").visible = false;
        }
        if (this._widget.config.getBoolean("guides.enabled")) {
            this.setGuideToolVisibility(this._widget.handler.container.sessionDataManager.isPerkAllowed("USE_GUIDE_TOOL"));
        }
        for (const _loc11_ of this._icons?.keys() ?? []) {
            _loc12_ = this._icons.get(_loc11_);
            if (!(_loc12_ == null || _loc12_.length == 0)) {
                _loc7_ = stringOrNull(_loc12_[0]);
                _loc3_ = 1;
                switch (_loc11_) {
                    case "dance_icon":
                    case "wave_icon":
                        if (this._widget.hasEffectOn) {
                            _loc3_ = 0.5;
                        }
                        break;
                    case "effects_icon":
                        if (this._widget.isDancing) {
                            _loc3_ = 0.5;
                        }
                        break;
                    case "hc_icon":
                        _loc7_ = this.getClubAssetNameBase() + _loc7_;
                        if (!this._widget.isHabboClubActive) {
                            this.setElementText("hc_text", this._widget.localizations.getLocalization("widget.memenu.hc.join"));
                            break;
                        }
                        if (this._widget.habboClubLevel == 2) {
                            _loc9_ = "widget.memenu.vip";
                        } else {
                            _loc9_ = "widget.memenu.hc";
                        }
                        if (this._widget.habboClubPeriods > 0) {
                            _loc9_ += ".long";
                        }
                        this._widget.localizations.registerParameter(_loc9_, "days", String(this._widget.habboClubDays));
                        this._widget.localizations.registerParameter(_loc9_, "months", String(this._widget.habboClubPeriods));
                        this.setElementText("hc_text", this._widget.localizations.getLocalization(_loc9_));
                        break;
                    case "minimail_icon":
                        if (!this._widget.isMinimailEnabled) {
                            _loc3_ = 0.5;
                            break;
                        }
                        _loc8_ = this._widget.unreadMiniMailMessageCount;
                        if (_loc8_ == -1 || _loc8_ > 0) {
                            this.updateUnseenCounter("minimail", _loc8_);
                        }
                }
                this.setElementImage(stringOrNull(_loc11_), _loc7_, _loc3_);
            }
        }
        _loc10_ = 0;
        while (_loc10_ < this._window.numChildren) {
            _loc2_ = this._window.getChildAt(_loc10_);
            _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
            _loc2_.addEventListener("WME_OVER", this.onMouseOverOrOut);
            _loc2_.addEventListener("WME_OUT", this.onMouseOverOrOut);
            _loc10_++;
        }
    }

    private updateUnseenCounter(param1: string, param2: number): void {
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName(param1), isIWindowContainer);
        let _loc4_: IWindowContainer = asGuarded(_loc3_.findChildByName("unseen_counter"), isIWindowContainer);
        if (param2 == 0) {
            if (_loc4_) {
                _loc3_.removeChild(_loc4_);
                _loc3_.invalidate();
            }
            return;
        }
        if (!_loc4_) {
            _loc4_ = this._widget.windowManager.createUnseenItemCounter();
            _loc4_.name = "unseen_counter";
            _loc3_.addChild(_loc4_);
        }
        (asGuarded(_loc4_.findChildByName("count"), isITextWindow)).text = param2 > 0 ? param2.toString() : " ";
        _loc4_.x = _loc3_.width - _loc4_.width - 5;
        _loc4_.y = 5;
    }

    private getClubAssetNameBase(): string {
        switch (this._widget.habboClubLevel) {
            case 0:
            case 1:
                return "club";
            case 2:
                return "vip";
            default:
                return null;
        }
    }

    private setElementImage(param1: string, param2: string, param3: number = 1): void {
        let _loc8_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName(param1), isIBitmapWrapperWindow);
        let _loc7_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param2), BitmapDataAsset);
        if (_loc8_ == null) {
            MeMenuMainView._log.warn("Could not find element: " + param1);
            return;
        }
        if (_loc7_ == null || _loc7_.content == null) {
            MeMenuMainView._log.warn("Could not find asset: " + param2);
            return;
        }
        let _loc5_: BitmapData = asInstanceOf(_loc7_.content, BitmapData);
        _loc8_.bitmap = new BitmapData(_loc8_.width, _loc8_.height, true, 0);
        let _loc4_: number = (_loc8_.width - _loc5_.width) / 2 | 0;
        let _loc6_: number = (_loc8_.height - _loc5_.height) / 2 | 0;
        _loc8_.bitmap.copyPixels(_loc5_, _loc5_.rect, new Point(_loc4_, _loc6_));
        _loc8_.blend = param3;
    }

    private setElementText(param1: string, param2: string): void {
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName(param1), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.text = param2;
        }
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc4_: AvatarExpressionEnum = null;
        let _loc5_: string = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "dance":
                if (this._widget.hasEffectOn) {
                    return;
                }
                this._widget.changeView("me_menu_dance_moves_view");
                break;
            case "wave":
            case "blow":
                if (this._widget.hasEffectOn) {
                    return;
                }
                if (this._widget.isDancing) {
                    this._widget.messageListener.processWidgetMessage(new RoomWidgetDanceMessage(0));
                    this._widget.isDancing = false;
                }
                _loc4_ = AvatarExpressionEnum.WAVE;
                if (_loc3_ == "blow") {
                    _loc4_ = AvatarExpressionEnum.BLOW;
                }
                this._widget.messageListener.processWidgetMessage(new RoomWidgetAvatarExpressionMessage(_loc4_));
                this._widget.hide();
                break;
            case "effects":
                if (this._widget.isDancing) {
                    return;
                }
                this._widget.messageListener.processWidgetMessage(new RoomWidgetRequestWidgetMessage("RWRWM_EFFECTS"));
                this._widget.hide();
                break;
            case "rooms":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetShowOwnRoomsMessage());
                this._widget.hide();
                break;
            case "badges":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetOpenInventoryMessage("inventory_badges"));
                this._widget.hide();
                break;
            case "clothes":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetAvatarEditorMessage("RWCM_OPEN_AVATAR_EDITOR"));
                this._widget.hide();
                break;
            case "hc":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetOpenCatalogMessage("RWOCM_CLUB_MAIN"));
                this._widget.hide();
                break;
            case "settings":
                this._widget.changeView("me_menu_settings_view");
                break;
            case "minimail":
                if (this._widget.isMinimailEnabled) {
                    HabboWebTools.openMinimail("#mail/inbox/");
                    this._widget.hide();
                }
                break;
            case "credits":
                HabboWebTools.openWebPageAndMinimizeClient(this._config.getProperty("web.shop.relativeUrl"));
                this._widget.hide();
                break;
            case "profile":
                this._widget.messageListener.processWidgetMessage(new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this._widget.userId, "me_menu"));
                this._widget.hide();
                break;
            case "achievements":
                this._widget.handler.container.questEngine.showAchievements();
                this._widget.hide();
                break;
            case "guide":
                this._widget.handler.container.toolbar.toggleWindowVisibility("GUIDE");
                this._widget.hide();
                break;
            case "talents":
                _loc5_ = this._widget.handler.container.sessionDataManager.currentTalentTrack;
                this._widget.handler.container.habboTracking.trackTalentTrackOpen(_loc5_, "memenu");
                this._widget.handler.container.connection.send(new GetTalentTrackMessageComposer(_loc5_));
                break;
            default:
                MeMenuMainView._log.warn("unknown button: " + _loc3_);
        }
        HabboTracking.getInstance().trackEventLog("MeMenu", "click", _loc3_);
    };

    private onAlertClicked(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
    }

    private onMouseOverOrOut = (param1: WindowMouseEvent): void => {
        let _loc8_: any[] = null;
        let _loc5_: string = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc4_: string = _loc2_.name;
        let _loc7_: string = _loc4_ + "_icon";
        let _loc6_: string = "";
        let _loc3_: number = param1.type == "WME_OVER" ? 1 : 0;
        switch (_loc4_) {
            case "dance":
                if (this._widget.hasEffectOn) {
                    return;
                }
                break;
            case "minimail":
                if (!this._widget.isMinimailEnabled) {
                    return;
                }
                break;
            case "wave":
                if (this._widget.hasEffectOn) {
                    return;
                }
                break;
            case "effects":
                if (this._widget.isDancing) {
                    return;
                }
                break;
            case "hc":
                _loc6_ = this.getClubAssetNameBase();
        }
        _loc7_ = _loc4_ + "_icon";
        _loc8_ = this._icons.get(_loc7_);
        if (_loc8_ != null) {
            _loc5_ = _loc6_ + _loc8_[_loc3_];
            this.setElementImage(_loc7_, _loc5_);
        }
    };

    private onPerkAllowances = (param1: PerkAllowancesMessageEvent): void => {
        let _loc2_: PerkAllowancesMessageParser = param1.getParser();
        this.setGuideToolVisibility(_loc2_.isPerkAllowed("USE_GUIDE_TOOL"));
    };

    private setGuideToolVisibility(param1: boolean): void {
        let _loc3_: IWindow = null;
        let _loc2_: IWindow = null;
        if (this._window && this._widget) {
            _loc3_ = this._window.findChildByName("guide");
            _loc2_ = this._window.findChildByName("achievements");
            if (_loc3_) {
                _loc3_.visible = param1;
                this._window.height = param1 ? _loc3_.bottom : _loc2_.bottom;
                this._widget.updateSize();
            }
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MeMenuMainView.#staticsReady) return;
        MeMenuMainView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MeMenuMainView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.memenu.MeMenuMainView"));
    }
}
