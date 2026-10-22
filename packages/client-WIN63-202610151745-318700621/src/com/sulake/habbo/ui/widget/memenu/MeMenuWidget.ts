import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetAvatarEditorUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAvatarEditorUpdateEvent';
import type { RoomWidgetDanceUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetDanceUpdateEvent';
import type { RoomWidgetHabboClubUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetHabboClubUpdateEvent';
import type { RoomWidgetMiniMailUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetMiniMailUpdateEvent';
import type { RoomWidgetPurseUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPurseUpdateEvent';
import type { RoomWidgetRoomEngineUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomEngineUpdateEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { RoomWidgetSettingsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSettingsUpdateEvent';
import type { RoomWidgetToolbarClickedUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetToolbarClickedUpdateEvent';
import type { RoomWidgetTutorialEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetTutorialEvent';
import type { RoomWidgetUpdateEffectsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEffectsUpdateEvent';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import type { RoomWidgetWaveUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetWaveUpdateEvent';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { MeMenuWidgetHandler } from '@/com/sulake/habbo/ui/handler/MeMenuWidgetHandler';
import { MeMenuDanceView } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuDanceView';
import { MeMenuMainView } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuMainView';
import { MeMenuSettingsMenuView } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuSettingsMenuView';
import { MeMenuSoundSettingsView } from '@/com/sulake/habbo/ui/widget/memenu/soundsettings/MeMenuSoundSettingsView';
import { RoomWidgetMeMenuMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMeMenuMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';

export class MeMenuWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu::MeMenuWidget'); }

    public static readonly MAIN_VIEW: string = "me_menu_top_view";
    public static readonly MY_CLOTHES_VIEW: string = "me_menu_my_clothes_view";
    public static readonly _SafeStr_8046: string = "me_menu_dance_moves_view";
    public static readonly _SafeStr_8107: string = "me_menu_settings_view";
    public static readonly SOUND_SETTINGS_VIEW: string = "me_menu_sound_settings";
    private static readonly DEFAULT_VIEW_LOCATION_BOTTOM: Point = new Point(95, 440);

    declare private _SafeStr_2182: IMeMenuView;

    declare private _SafeStr_2133: IWindowContainer;

    private _habboClubDays: number = 0;
    private _habboClubPeriods: number = 0;
    private _SafeStr_7346: number = 0;
    private _allowHabboClubDances: boolean = false;
    private _habboClubLevel: number = 0;
    private _hasEffectOn: boolean = false;
    private _isDancing: boolean = false;
    private _isActive: boolean = false;
    private _isMinimailEnabled: boolean = false;
    private _SafeStr_6662: number = 0;
    private _isGameMode: boolean = false;

    declare private _config: ICoreConfiguration;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration) {
        super(param1, param2, param3, param4);
        this._config = param5;
        if (ExternalInterface.available) {
            this._isMinimailEnabled = param5.getBoolean("client.minimail.embed.enabled");
        }
        (param1 instanceof MeMenuWidgetHandler ? param1 : null).widget = this;
        this.changeView("me_menu_top_view");
        this.hide();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        if (this._SafeStr_2182 != null) {
            this._SafeStr_2182.dispose();
            this._SafeStr_2182 = null;
        }
        this._SafeStr_2133 = null;
        this._config = null;
        super.dispose();
    }

    public get handler(): MeMenuWidgetHandler {
        return this._SafeStr_2143 instanceof MeMenuWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override get mainWindow(): IWindow {
        return this._SafeStr_2133;
    }

    private get mainContainer(): IWindowContainer {
        let _loc1_: IAsset = null;
        if (this._SafeStr_2133 == null) {
            _loc1_ = this._assets.getAssetByName("memenu");
            if (_loc1_) {
                this._SafeStr_2133 = asGuarded(this.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
            }
        }
        if (this._SafeStr_2133) {
            return asGuarded(this._SafeStr_2133.findChildByTag("MAIN_CONTENT"), isIWindowContainer);
        }
        return null;
    }

    public changeView(param1: string): void {
        let _loc2_: IMeMenuView = null;
        switch (param1) {
            case "me_menu_top_view":
                _loc2_ = new MeMenuMainView(this.config);
                break;
            case "me_menu_dance_moves_view":
                _loc2_ = new MeMenuDanceView();
                break;
            case "me_menu_settings_view":
                _loc2_ = new MeMenuSettingsMenuView();
                break;
            case "me_menu_sound_settings":
                _loc2_ = new MeMenuSoundSettingsView();
                break;
            default:
                Logger.log("Me Menu Change view: unknown view: " + param1);
        }
        if (_loc2_ != null) {
            if (this._SafeStr_2182) {
                this._SafeStr_2182.dispose();
                this._SafeStr_2182 = null;
            }
            this._SafeStr_2182 = _loc2_;
            this._SafeStr_2182.init(this, param1);
            this.mainContainer.removeChildAt(0);
            this.mainContainer.addChildAt(this._SafeStr_2182.window, 0);
            this._SafeStr_2133.visible = true;
            this._SafeStr_2133.activate();
        }
        this.updateSize();
    }

    public updateSize(): void {
        let _loc1_: number = 0;
        let _loc2_: Rectangle = null;
        if (this._SafeStr_2182 && this._SafeStr_2182.window && this._SafeStr_2133) {
            _loc1_ = 5;
            this._SafeStr_2182.window.position = new Point(_loc1_, _loc1_);
            this.mainContainer.width = this._SafeStr_2182.window.width + _loc1_ * 2;
            this.mainContainer.height = this._SafeStr_2182.window.height + _loc1_ * 2;
            if (this._config.getBoolean("simple.memenu.enabled") && this.handler && this.handler.container && this.handler.container.toolbar) {
                _loc2_ = this.handler.container.toolbar.getRect();
                this._SafeStr_2133.x = _loc2_.right + _loc1_ | 0;
                this._SafeStr_2133.y = _loc2_.bottom - this._SafeStr_2133.height | 0;
            } else {
                this._SafeStr_2133.x = MeMenuWidget.DEFAULT_VIEW_LOCATION_BOTTOM.x | 0;
                this._SafeStr_2133.y = MeMenuWidget.DEFAULT_VIEW_LOCATION_BOTTOM.y - this.mainContainer.height | 0;
            }
        }
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWMMUE_new_mini_mail", this.onMiniMailUpdate);
        param1.addEventListener("RWMMUE_unread_mini_mail", this.onMiniMailUpdate);
        param1.addEventListener("RWUE_WAVE", this.onWaveEvent);
        param1.addEventListener("RWUE_DANCE", this.onDanceEvent);
        param1.addEventListener("RWUEUE_UPDATE_EFFECTS", this.onUpdateEffects);
        param1.addEventListener("RWUE_REQUEST_ME_MENU_TOOLBAR_CLICKED", this.onToolbarClicked);
        param1.addEventListener("RWUE_AVATAR_EDITOR_CLOSED", this.onAvatarEditorClosed);
        param1.addEventListener("RWUE_HIDE_AVATAR_EDITOR", this.onHideAvatarEditor);
        param1.addEventListener("RWROUE_OBJECT_DESELECTED", this.onAvatarDeselected);
        param1.addEventListener("RWBIUE_HABBO_CLUB", this.onHabboClubEvent);
        param1.addEventListener("RWUIUE_OWN_USER", this.onUserInfo);
        param1.addEventListener("RWSUE_SETTINGS", this.onSettingsUpdate);
        param1.addEventListener("HHTPNUFWE_AE_STARTED", this.onTutorialEvent);
        param1.addEventListener("HHTPNUFWE_AE_HIGHLIGHT", this.onTutorialEvent);
        param1.addEventListener("RWPUE_CREDIT_BALANCE", this.onCreditBalance);
        param1.addEventListener("RWREUE_NORMAL_MODE", this.onNormalMode);
        param1.addEventListener("RWREUE_GAME_MODE", this.onGameMode);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWUE_WAVE", this.onWaveEvent);
        param1.removeEventListener("RWUE_DANCE", this.onDanceEvent);
        param1.removeEventListener("RWUEUE_UPDATE_EFFECTS", this.onUpdateEffects);
        param1.removeEventListener("RWUE_REQUEST_ME_MENU_TOOLBAR_CLICKED", this.onToolbarClicked);
        param1.removeEventListener("RWROUE_OBJECT_DESELECTED", this.onAvatarDeselected);
        param1.removeEventListener("RWBIUE_HABBO_CLUB", this.onHabboClubEvent);
        param1.removeEventListener("RWUE_AVATAR_EDITOR_CLOSED", this.onHideAvatarEditor);
        param1.removeEventListener("RWUE_HIDE_AVATAR_EDITOR", this.onAvatarEditorClosed);
        param1.removeEventListener("RWUIUE_OWN_USER", this.onUserInfo);
        param1.removeEventListener("RWSUE_SETTINGS", this.onSettingsUpdate);
        param1.removeEventListener("HHTPNUFWE_AE_HIGHLIGHT", this.onTutorialEvent);
        param1.removeEventListener("HHTPNUFWE_AE_STARTED", this.onTutorialEvent);
        param1.removeEventListener("RWPUE_CREDIT_BALANCE", this.onCreditBalance);
        param1.removeEventListener("RWREUE_NORMAL_MODE", this.onNormalMode);
        param1.removeEventListener("RWREUE_NORMAL_MODE", this.onGameMode);
    }

    public hide(param1: RoomWidgetRoomObjectUpdateEvent = null): void {
        if (this._SafeStr_2182 != null) {
            this._SafeStr_2133.removeChild(this._SafeStr_2182.window);
            this._SafeStr_2182.dispose();
            this._SafeStr_2182 = null;
        }
        this._SafeStr_2133.visible = false;
        this._isActive = false;
    }

    private onUserInfo = (param1: RoomWidgetUserInfoUpdateEvent): void => {
        this._userId = param1.webID;
    };

    private onSettingsUpdate = (param1: RoomWidgetSettingsUpdateEvent): void => {
        if (!this._isActive) {
            return;
        }
        if (this._SafeStr_2182.window.name == "me_menu_sound_settings") {
            (this._SafeStr_2182 instanceof MeMenuSoundSettingsView ? this._SafeStr_2182 : null).updateSettings(param1);
        }
    };

    private onTutorialEvent = (param1: RoomWidgetTutorialEvent): void => {
        switch (param1.type) {
            case "HHTPNUFWE_AE_HIGHLIGHT":
                Logger.log("* MeMenuWidget: onHighlightClothesIcon " + this._isActive + " view: " + this._SafeStr_2182.window.name);
                if (this._isActive != true || this._SafeStr_2182.window.name != "me_menu_top_view") {
                    return;
                }
                (this._SafeStr_2182 instanceof MeMenuMainView ? this._SafeStr_2182 : null).setIconAssets("clothes_icon", "me_menu_top_view", "clothes_highlighter_blue");
                break;
            case "HHTPNUFWE_AE_STARTED":
                this.hide();
        }
    };

    private onToolbarClicked = (param1: RoomWidgetToolbarClickedUpdateEvent): void => {
        let _loc2_: RoomWidgetMeMenuMessage = null;
        if (this._isActive) {
            if (this._SafeStr_2133 != null && WindowToggle.isHiddenByOtherWindows(this._SafeStr_2133)) {
                this._SafeStr_2133.activate();
                return;
            }
            this._isActive = false;
        } else {
            this._isActive = true;
        }
        if (this._isActive) {
            _loc2_ = new RoomWidgetMeMenuMessage("RWMMM_MESSAGE_ME_MENU_OPENED");
            if (this.messageListener != null) {
                this.messageListener.processWidgetMessage(_loc2_);
            }
            this.changeView("me_menu_top_view");
        } else {
            this.hide();
        }
    };

    private onUpdateEffects = (param1: RoomWidgetUpdateEffectsUpdateEvent): void => {
        this._hasEffectOn = false;
        for (const _loc2_ of param1.effects ?? []) {
            if (_loc2_.isInUse) {
                this._hasEffectOn = true;
            }
        }
    };

    private onAvatarDeselected = (param1: Event): void => {
        if (this._SafeStr_2182 != null && this._SafeStr_2182.window.name != "me_menu_my_clothes_view") {
            this.hide();
        }
    };

    private onAvatarEditorClosed = (param1: RoomWidgetAvatarEditorUpdateEvent): void => {
        if (this._SafeStr_2182 != null && this._SafeStr_2182.window.name == "me_menu_my_clothes_view") {
            this.changeView("me_menu_top_view");
        }
    };

    private onHideAvatarEditor = (param1: RoomWidgetAvatarEditorUpdateEvent): void => {
        if (this._SafeStr_2182 != null && this._SafeStr_2182.window.name == "me_menu_my_clothes_view") {
            this.changeView("me_menu_top_view");
        }
    };

    private onWaveEvent = (param1: RoomWidgetWaveUpdateEvent): void => {
        Logger.log("[MeMenuWidget] Wave Event received");
    };

    private onMiniMailUpdate = (param1: RoomWidgetMiniMailUpdateEvent): void => {
        if (this._SafeStr_2182) {
            this._SafeStr_2182.updateUnseenItemCount("minimail", this.handler.container.messenger.getUnseenMiniMailMessageCount());
        }
    };

    private onDanceEvent = (param1: RoomWidgetDanceUpdateEvent): void => {
        Logger.log("[MeMenuWidget] Dance Event received, style: " + param1.style);
    };

    private onHabboClubEvent = (param1: RoomWidgetHabboClubUpdateEvent): void => {
        let _loc2_: boolean = param1.daysLeft != this._habboClubDays;
        this._habboClubDays = param1.daysLeft;
        this._habboClubPeriods = param1.periodsLeft;
        this._SafeStr_7346 = param1.pastPeriods;
        this._allowHabboClubDances = param1.allowClubDances;
        _loc2_ ||= param1.clubLevel != this._habboClubLevel;
        this._habboClubLevel = param1.clubLevel;
        if (_loc2_) {
            if (this._SafeStr_2182 != null) {
                this.changeView(this._SafeStr_2182.window.name);
            }
        }
    };

    private onCreditBalance = (param1: RoomWidgetPurseUpdateEvent): void => {
        if (param1 == null) {
            return;
        }
        this._SafeStr_6662 = param1.balance;
        this.localizations.registerParameter("widget.memenu.credits", "credits", this._SafeStr_6662.toString());
    };

    private onNormalMode = (param1: RoomWidgetRoomEngineUpdateEvent): void => {
        this._isGameMode = false;
    };

    private onGameMode = (param1: RoomWidgetRoomEngineUpdateEvent): void => {
        this._isGameMode = true;
    };

    public get allowHabboClubDances(): boolean {
        return this._allowHabboClubDances;
    }

    public get isHabboClubActive(): boolean {
        return this._habboClubDays > 0;
    }

    public get habboClubDays(): number {
        return this._habboClubDays;
    }

    public get habboClubPeriods(): number {
        return this._habboClubPeriods;
    }

    public get habboClubLevel(): number {
        return this._habboClubLevel;
    }

    public get isMinimailEnabled(): boolean {
        return this._isMinimailEnabled;
    }

    public get config(): ICoreConfiguration {
        return this._config;
    }

    public get hasEffectOn(): boolean {
        return this._hasEffectOn;
    }

    public get isDancing(): boolean {
        return this._isDancing;
    }

    public set isDancing(param1: boolean) {
        this._isDancing = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public get unreadMiniMailMessageCount(): number {
        return this.handler.container.messenger.getUnseenMiniMailMessageCount();
    }

    public override release(): void {
        this.hide();
        super.release();
    }
}
