import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { HabboInventoryEffectsEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryEffectsEvent';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { WiredUserClickHandledEvent } from '@/com/sulake/habbo/roomevents/events/WiredUserClickHandledEvent';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { BotSkillConfigurationView } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotSkillConfigurationView';
import type { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import type { ConfirmPetBreedingPetData } from '@/com/sulake/habbo/ui/widget/events/ConfirmPetBreedingPetData';
import type { UseProductItem } from '@/com/sulake/habbo/ui/widget/events/UseProductItem';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { CancelPetBreedingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/pets/CancelPetBreedingComposer';
import { ConfirmPetBreedingComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/pets/ConfirmPetBreedingComposer';
import { BreedPetsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/BreedPetsMessageComposer';
import { AvatarInfoWidgetHandler } from '@/com/sulake/habbo/ui/handler/AvatarInfoWidgetHandler';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarMenuView, BreedPetView, DecorateModeView, NewUserHelpView, OwnAvatarMenuView, OwnPetMenuView, PetMenuView, RentableBotMenuView, UseProductView, UserNameView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { AvatarInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoData';
import { BotChangeNameConfiguration } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotChangeNameConfiguration';
import { BotChatterMarkovConfiguration } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotChatterMarkovConfiguration';
import { BotSkillConfigurationViewBase } from '@/com/sulake/habbo/ui/widget/avatarinfo/botskills/BotSkillConfigurationViewBase';
import { BreedMonsterPlantsConfirmationView } from '@/com/sulake/habbo/ui/widget/avatarinfo/BreedMonsterPlantsConfirmationView';
import { BreedPetsResultData } from '@/com/sulake/habbo/ui/widget/avatarinfo/BreedPetsResultData';
import { BreedPetsResultView } from '@/com/sulake/habbo/ui/widget/avatarinfo/BreedPetsResultView';
import { ConfirmPetBreedingView } from '@/com/sulake/habbo/ui/widget/avatarinfo/ConfirmPetBreedingView';
import { NestBreedingSuccessView } from '@/com/sulake/habbo/ui/widget/avatarinfo/NestBreedingSuccessView';
import { PetInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/PetInfoData';
import { RentableBotInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/RentableBotInfoData';
import { UseProductConfirmationView } from '@/com/sulake/habbo/ui/widget/avatarinfo/UseProductConfirmationView';
import { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { RoomWidgetAvatarInfoEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAvatarInfoEvent';
import { RoomWidgetConfirmPetBreedingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetConfirmPetBreedingEvent';
import { RoomWidgetConfirmPetBreedingResultEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetConfirmPetBreedingResultEvent';
import { RoomWidgetPetBreedingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetBreedingEvent';
import { RoomWidgetPetBreedingResultEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetBreedingResultEvent';
import { RoomWidgetPetInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetInfoUpdateEvent';
import { RoomWidgetPetLevelUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetLevelUpdateEvent';
import { RoomWidgetPetStatusUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetStatusUpdateEvent';
import { RoomWidgetRentableBotForceOpenContextMenuEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotForceOpenContextMenuEvent';
import { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';
import { RoomWidgetRentableBotSkillListUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotSkillListUpdateEvent';
import { RoomWidgetRoomObjectNameEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectNameEvent';
import { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import { RoomWidgetUserLocationUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserLocationUpdateEvent';
import { RoomWidgetGetObjectLocationMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetObjectLocationMessage';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';

export class AvatarInfoWidget extends RoomWidgetBase implements IUpdateReceiver, IContextMenuParentWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::AvatarInfoWidget'); }

    private static readonly EFFECT_TYPE_RIDE: number = 77;
    private static readonly EFFECT_TYPE_DEEP_WATER: number = 29;
    private static readonly EFFECT_TYPE_SHALLOW_WATER: number = 30;
    private static readonly _SafeStr_8117: number = 185;
    private static readonly AVATAR_HIGHLIGHT_DURATION_MSEC: number = 5000;
    private static readonly _SafeStr_8559: string = "avatar";
    private static readonly _SafeStr_7697: string = "use_minimized_own_avatar_menu";

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: ICoreConfiguration, param5: IHabboLocalizationManager, param6: Component, param7: IHabboCatalog, param8: IHabboUserDefinedRoomEvents) {
        super(param1, param2, param3, param5);
        this._component = param6;
        this._catalog = param7;
        this._roomEvents = param8;
        this._configuration = param4;
        this._SafeStr_5087 = new AvatarInfoData();
        this._SafeStr_2718 = new PetInfoData();
        this._SafeStr_2360 = null;
        this._avatarNameBubbles = new UtilsMap();
        this._useProductBubbles = new UtilsMap();
        this._breedPetBubbles = new UtilsMap();
        this.handler.roomEngine.events.addEventListener("REOE_ADDED", this.onRoomObjectAdded);
        this.handler.roomEngine.events.addEventListener("REOE_REMOVED", this.onRoomObjectRemoved);
        this.handler.container.inventory.events.addEventListener("HIEE_EFFECTS_CHANGED", this.onEffectsChanged);
        this.handler.container.userDefinedRoomEvents.events.addEventListener("WIRED_USER_CLICK_HANDLED", this.onUserClickHandledEvent);
        this.handler.widget = this;
    }

    declare private _component: Component;

    declare private _configuration: ICoreConfiguration;

    declare private _view: AvatarContextInfoButtonView;

    declare private _SafeStr_2438: DecorateModeView;

    private _isInitialized: boolean = false;
    private _isGameMode: boolean = false;
    private _SafeStr_3500: boolean = false;

    declare private _SafeStr_3647: Timer;

    declare private _SafeStr_5087: AvatarInfoData;

    declare private _SafeStr_2360: RentableBotInfoData;

    declare private _SafeStr_2718: PetInfoData;

    private _SafeStr_5043: number = -1;
    private _SafeStr_7560: boolean = true;

    declare private _SafeStr_3175: AvatarContextInfoButtonView;

    declare private _cachedOwnAvatarMenu: OwnAvatarMenuView;

    declare private _SafeStr_3049: AvatarMenuView;

    declare private _SafeStr_2966: RentableBotMenuView;

    declare private _SafeStr_4227: OwnPetMenuView;

    declare private _SafeStr_3064: PetMenuView;

    declare private _SafeStr_3959: NewUserHelpView;

    declare private _avatarNameBubbles: UtilsMap;

    declare private _useProductBubbles: UtilsMap;

    declare private _breedPetBubbles: UtilsMap;

    declare private _SafeStr_2503: UseProductConfirmationView;

    declare private _SafeStr_2473: BreedMonsterPlantsConfirmationView;

    declare private _SafeStr_2787: ConfirmPetBreedingView;

    declare private _SafeStr_2441: BreedPetsResultView;

    declare private _breedingConfirmationAlert: IAlertDialog;

    private _SafeStr_5027: number = -1;
    private _SafeStr_3954: number = -1;
    private _isDancing: boolean = false;

    declare private _roomEvents: IHabboUserDefinedRoomEvents;

    private _SafeStr_2854: UtilsMap = new UtilsMap();
    private _SafeStr_3369: UtilsMap = new UtilsMap();

    declare private _SafeStr_5758: NestBreedingSuccessView;

    declare private _SafeStr_3545: number;
    static { (this.prototype as any)._SafeStr_3545 = 0; }

    declare private _buttonsSetup: (...args: any[]) => any;

    private _handlePetInfo: boolean = true;

    public set handlePetInfo(param1: boolean) {
        this._handlePetInfo = param1;
    }

    declare private _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get component(): Component {
        return this._component;
    }

    public get handler(): AvatarInfoWidgetHandler {
        return this._SafeStr_2143 instanceof AvatarInfoWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get configuration(): ICoreConfiguration {
        return this._configuration;
    }

    public get localization(): IHabboLocalizationManager {
        return this._SafeStr_2259;
    }

    public get ownAvatarPosture(): string {
        let _loc2_: IRoomObjectModel = null;
        let _loc1_: IRoomObject = this.findCurrentUserRoomObject();
        if (_loc1_ != null) {
            _loc2_ = _loc1_.getModel();
            if (_loc2_ != null) {
                return _loc2_.getString("figure_posture");
            }
        }
        return "std";
    }

    public get canStandUp(): boolean {
        let _loc2_: IRoomObjectModel = null;
        let _loc1_: IRoomObject = this.findCurrentUserRoomObject();
        if (_loc1_ != null) {
            _loc2_ = _loc1_.getModel();
            if (_loc2_ != null) {
                return _loc2_.getNumber("figure_can_stand_up") > 0;
            }
        }
        return false;
    }

    public get isSwimming(): boolean {
        let _loc3_: IRoomObjectModel = null;
        let _loc2_: number = NaN;
        let _loc1_: IRoomObject = this.findCurrentUserRoomObject();
        if (_loc1_ != null) {
            _loc3_ = _loc1_.getModel();
            if (_loc3_ != null) {
                _loc2_ = _loc3_.getNumber("figure_effect");
                return _loc2_ == 29 || _loc2_ == 30 || _loc2_ == 185;
            }
        }
        return false;
    }

    public get hasClub(): boolean {
        return this.handler.container.sessionDataManager.hasClub;
    }

    public get hasVip(): boolean {
        return this.handler.container.sessionDataManager.hasVip;
    }

    public get hasEffectOn(): boolean {
        let _loc1_: any[] = this.handler.container.inventory.getActivatedAvatarEffects();
        for (const _loc2_ of _loc1_ ?? []) {
            if (_loc2_.isInUse) {
                return true;
            }
        }
        return false;
    }

    public get isDancing(): boolean {
        return this._isDancing;
    }

    public set isDancing(param1: boolean) {
        this._isDancing = param1;
    }

    public get hasFreeSaddle(): boolean {
        if (this._SafeStr_2718 != null) {
            return this._SafeStr_2718.hasFreeSaddle;
        }
        return false;
    }

    public get isRiding(): boolean {
        if (this._SafeStr_2718 != null) {
            return this._SafeStr_2718.isRiding;
        }
        return false;
    }

    public get isCurrentUserRiding(): boolean {
        let _loc3_: IRoomObjectModel = null;
        let _loc2_: number = NaN;
        let _loc1_: IRoomObject = this.findCurrentUserRoomObject();
        if (_loc1_ != null) {
            _loc3_ = _loc1_.getModel();
            if (_loc3_ != null) {
                _loc2_ = _loc3_.getNumber("figure_effect");
                if (_loc2_ == 77) {
                    return true;
                }
            }
        }
        return false;
    }

    public get useMinimizedOwnAvatarMenu(): boolean {
        return this.handler.container.config.getBoolean("use_minimized_own_avatar_menu");
    }

    public set useMinimizedOwnAvatarMenu(param1: boolean) {
        this.handler.container.config.setProperty("use_minimized_own_avatar_menu", param1 ? "1" : "0");
    }

    public get friendList(): IHabboFriendList {
        return this.handler.friendList;
    }

    public get isUserDecorating(): boolean {
        return this.handler.roomSession.isUserDecorating;
    }

    public set isUserDecorating(param1: boolean) {
        let _loc5_: number = 0;
        let _loc4_: string = null;
        let _loc2_: number = 0;
        let _loc3_: RoomWidgetUserLocationUpdateEvent = null;
        this.handler.roomSession.isUserDecorating = param1;
        if (param1) {
            _loc5_ = this.handler.container.sessionDataManager.userId;
            if (!this._SafeStr_2438) {
                _loc4_ = this.handler.container.sessionDataManager.userName;
                _loc2_ = this.handler.container.roomSession.ownUserRoomId;
                this._SafeStr_2438 = new DecorateModeView(this, _loc5_, _loc4_, _loc2_);
            }
            this._SafeStr_2438.show();
            _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", _loc5_, 1)), RoomWidgetUserLocationUpdateEvent);
            if (_loc3_) {
                this._SafeStr_2438.update(_loc3_.rectangle, _loc3_.screenLocation, 0);
            }
        } else if (this._SafeStr_2438) {
            this._SafeStr_2438.hide(false);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.removeAvatarHighlightTimer();
        for (const _loc1_ of valuesOf(this._avatarNameBubbles)) {
            _loc1_.dispose();
        }
        this._avatarNameBubbles = null;
        for (const _loc2_ of valuesOf(this._useProductBubbles)) {
            _loc2_.dispose();
        }
        this._useProductBubbles = null;
        for (const _loc4_ of valuesOf(this._breedPetBubbles)) {
            _loc4_.dispose();
        }
        this._breedPetBubbles = null;
        if (this._component) {
            this._component.removeUpdateReceiver(this);
            this._component = null;
        }
        if (this._SafeStr_3175) {
            this._SafeStr_3175.dispose();
            this._SafeStr_3175 = null;
        }
        if (this._SafeStr_3049) {
            this._SafeStr_3049.dispose();
            this._SafeStr_3049 = null;
        }
        if (this._cachedOwnAvatarMenu) {
            this._cachedOwnAvatarMenu.dispose();
            this._cachedOwnAvatarMenu = null;
        }
        if (this._SafeStr_2966) {
            this._SafeStr_2966.dispose();
            this._SafeStr_2966 = null;
        }
        if (this._SafeStr_3064) {
            this._SafeStr_3064.dispose();
            this._SafeStr_3064 = null;
        }
        if (this._view) {
            if (!this._view.disposed) {
                this._view.dispose();
                this._view = null;
            }
        }
        if (this._SafeStr_2438) {
            this._SafeStr_2438.dispose();
            this._SafeStr_2438 = null;
        }
        if (this._SafeStr_2503) {
            this._SafeStr_2503.dispose();
            this._SafeStr_2503 = null;
        }
        this.removeBreedMonsterPlantsConfirmationView();
        this.removeConfirmPetBreedingView();
        if (this._SafeStr_2441) {
            this._SafeStr_2441.dispose();
            this._SafeStr_2441 = null;
        }
        if (this._breedingConfirmationAlert) {
            this._breedingConfirmationAlert.dispose();
            this._breedingConfirmationAlert = null;
        }
        if (this._SafeStr_2854) {
            for (const _loc3_ of this._SafeStr_2854.getKeys() ?? []) {
                castTo(this._SafeStr_2854.getValue(_loc3_), BotSkillConfigurationViewBase).dispose();
            }
            this._SafeStr_2854.dispose();
            this._SafeStr_2854 = null;
        }
        if (this._SafeStr_3369 && this._SafeStr_3369.length > 0) {
            this._SafeStr_3369.dispose();
            this._SafeStr_3369 = null;
        }
        this.handler.roomEngine.events.removeEventListener("REOE_ADDED", this.onRoomObjectAdded);
        this.handler.roomEngine.events.removeEventListener("REOE_REMOVED", this.onRoomObjectRemoved);
        this.handler.container.inventory.events.removeEventListener("HIEE_EFFECTS_CHANGED", this.onEffectsChanged);
        this._view = null;
        this._configuration = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (!param1) {
            return;
        }
        param1.addEventListener("RWRBFOCME_OPEN", this.updateEventHandler);
        param1.addEventListener("RWRBSLUE_SKILL_LIST", this.updateEventHandler);
        param1.addEventListener("RWRBIUE_RENTABLE_BOT", this.updateEventHandler);
        param1.addEventListener("RWAIE_AVATAR_INFO", this.updateEventHandler);
        param1.addEventListener("RWUIUE_OWN_USER", this.updateEventHandler);
        param1.addEventListener("RWUIUE_PEER", this.updateEventHandler);
        param1.addEventListener("RWROUE_FURNI_ADDED", this.updateEventHandler);
        param1.addEventListener("RWROUE_OBJECT_SELECTED", this.updateEventHandler);
        param1.addEventListener("RWROUE_OBJECT_DESELECTED", this.updateEventHandler);
        param1.addEventListener("RWFIUE_FURNI", this.updateEventHandler);
        param1.addEventListener("RWUIUE_BOT", this.updateEventHandler);
        param1.addEventListener("RWPIUE_PET_INFO", this.updateEventHandler);
        param1.addEventListener("rwudue_user_data_updated", this.updateEventHandler);
        param1.addEventListener("RWROUE_USER_REMOVED", this.updateEventHandler);
        param1.addEventListener("RWREUE_NORMAL_MODE", this.updateEventHandler);
        param1.addEventListener("RWREUE_GAME_MODE", this.updateEventHandler);
        param1.addEventListener("RWONE_TYPE", this.updateEventHandler);
        param1.addEventListener("RWROUE_OBJECT_ROLL_OVER", this.updateEventHandler);
        param1.addEventListener("RWROUE_OBJECT_ROLL_OUT", this.updateEventHandler);
        param1.addEventListener("RWPIUE_PET_STATUS_UPDATE", this.updateEventHandler);
        param1.addEventListener("RWPLUE_PET_LEVEL_UPDATE", this.updateEventHandler);
        param1.addEventListener("RWPBRE_PET_BREEDING_RESULT", this.updateEventHandler);
        param1.addEventListener("RWPPBE_PET_BREEDING_", this.updateEventHandler);
        param1.addEventListener("RWIUM_INVENTORY_UPDATED", this.updateEventHandler);
        param1.addEventListener("RWPPBE_CONFIRM_PET_BREEDING_", this.updateEventHandler);
        param1.addEventListener("RWPPBE_CONFIRM_PET_BREEDING_RESULT", this.updateEventHandler);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWRBFOCME_OPEN", this.updateEventHandler);
        param1.removeEventListener("RWRBSLUE_SKILL_LIST", this.updateEventHandler);
        param1.removeEventListener("RWRBIUE_RENTABLE_BOT", this.updateEventHandler);
        param1.removeEventListener("RWAIE_AVATAR_INFO", this.updateEventHandler);
        param1.removeEventListener("RWUIUE_OWN_USER", this.updateEventHandler);
        param1.removeEventListener("RWUIUE_PEER", this.updateEventHandler);
        param1.removeEventListener("RWROUE_FURNI_ADDED", this.updateEventHandler);
        param1.removeEventListener("RWROUE_OBJECT_SELECTED", this.updateEventHandler);
        param1.removeEventListener("RWROUE_OBJECT_DESELECTED", this.updateEventHandler);
        param1.removeEventListener("RWFIUE_FURNI", this.updateEventHandler);
        param1.removeEventListener("RWUIUE_BOT", this.updateEventHandler);
        param1.removeEventListener("RWPIUE_PET_INFO", this.updateEventHandler);
        param1.removeEventListener("rwudue_user_data_updated", this.updateEventHandler);
        param1.removeEventListener("RWROUE_USER_REMOVED", this.updateEventHandler);
        param1.removeEventListener("RWREUE_NORMAL_MODE", this.updateEventHandler);
        param1.removeEventListener("RWREUE_GAME_MODE", this.updateEventHandler);
        param1.removeEventListener("RWONE_TYPE", this.updateEventHandler);
        param1.removeEventListener("RWROUE_OBJECT_ROLL_OUT", this.updateEventHandler);
        param1.removeEventListener("RWROUE_OBJECT_ROLL_OUT", this.updateEventHandler);
        param1.removeEventListener("RWPIUE_PET_STATUS_UPDATE", this.updateEventHandler);
        param1.removeEventListener("RWPLUE_PET_LEVEL_UPDATE", this.updateEventHandler);
        param1.removeEventListener("RWPBRE_PET_BREEDING_RESULT", this.updateEventHandler);
        param1.removeEventListener("RWPPBE_PET_BREEDING_", this.updateEventHandler);
        param1.removeEventListener("RWIUM_INVENTORY_UPDATED", this.updateEventHandler);
        param1.removeEventListener("RWPPBE_CONFIRM_PET_BREEDING_", this.updateEventHandler);
        param1.removeEventListener("RWPPBE_CONFIRM_PET_BREEDING_RESULT", this.updateEventHandler);
    }

    public showUseProductMenuForItems(param1: any[]): void {
        let _loc3_: IUserData = null;
        this.removeUseProductViews();
        this.removeUseProductConfirmationView();
        this.removeBreedMonsterPlantsConfirmationView();
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = this.handler.roomSession.userDataManager.getUserDataByIndex(_loc2_.id | 0);
            this.showUseProductMenu(_loc3_, _loc2_);
        }
    }

    public showBreedPetMenuForItems(param1: any[]): void {
        let _loc3_: IUserData = null;
        this.removeBreedPetViews();
        this.removeUseProductConfirmationView();
        this.removeBreedMonsterPlantsConfirmationView();
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = this.handler.roomSession.userDataManager.getUserDataByIndex(_loc2_.id | 0);
            this.showBreedPetMenu(_loc3_, _loc2_);
        }
    }

    public close(): void {
        this.removeView(this._view, false);
    }

    public selectOwnAvatar(): void {
        let _loc2_: RoomWidgetRoomObjectMessage = null;
        if (!this.handler || !this.handler.container || !this.handler.roomSession) {
            return;
        }
        let _loc3_: number = this.handler.container.sessionDataManager.userId;
        let _loc1_: IUserData = this.handler.roomSession.userDataManager.getUserData(_loc3_);
        if (!_loc1_) {
            return;
        }
        _loc2_ = new RoomWidgetRoomObjectMessage("RWROM_SELECT_OBJECT", _loc1_.roomObjectId, 100);
        this.handler.container.processWidgetMessage(_loc2_);
    }

    public removeView(param1: ContextInfoView, param2: boolean): void {
        this._SafeStr_3500 = false;
        this.removeAvatarHighlightTimer();
        if (param1) {
            if (this._SafeStr_7560) {
                param1.hide(param2);
            } else {
                param1.dispose();
                this._SafeStr_3175 = null;
                this._SafeStr_3049 = null;
                this._cachedOwnAvatarMenu = null;
                this._SafeStr_4227 = null;
                this._SafeStr_2966 = null;
                this._SafeStr_3064 = null;
                this._SafeStr_3959 = null;
            }
            if (param1 == this._view) {
                this._view = null;
            }
            if (param1 instanceof UserNameView) {
                this._avatarNameBubbles.remove((param1 instanceof UserNameView ? param1 : null).userName);
                param1.dispose();
                this.checkUpdateNeed();
            }
            if (param1 instanceof UseProductView) {
                this._useProductBubbles.remove((param1 instanceof UseProductView ? param1 : null).userId);
                param1.dispose();
                this.checkUpdateNeed();
            }
            if (param1 instanceof BreedPetView) {
                this._breedPetBubbles.remove((param1 instanceof BreedPetView ? param1 : null).userId);
                param1.dispose();
                this.checkUpdateNeed();
            }
        }
    }

    public removeUseProductViews(): void {
        for (const _loc1_ of valuesOf(this._useProductBubbles)) {
            _loc1_.dispose();
        }
        this._useProductBubbles.reset();
        this.checkUpdateNeed();
    }

    public removeBreedPetViews(): void {
        for (const _loc1_ of valuesOf(this._breedPetBubbles)) {
            _loc1_.dispose();
        }
        this._breedPetBubbles.reset();
        this.checkUpdateNeed();
    }

    public showUserName(param1: IUserData, param2: number): void {
        let _loc3_: UserNameView = null;
        if (this._avatarNameBubbles[param1.name] == null) {
            _loc3_ = new UserNameView(this);
            UserNameView.setup_UserNameView(_loc3_, param1.webID, param1.name, -1, 1, param2, 4288528218, 8000, param1.isBlocked);
            this._avatarNameBubbles[param1.name] = _loc3_;
            this.checkUpdateNeed();
        }
    }

    public showGamePlayerName(param1: number, param2: string, param3: number, param4: number): void {
        let _loc5_: UserNameView = null;
        if (this._avatarNameBubbles[param2] == null) {
            _loc5_ = new UserNameView(this, true);
            UserNameView.setup_UserNameView(_loc5_, param1, param2, param1, 1, param1, param3, param4);
            this._avatarNameBubbles[param2] = _loc5_;
            this.checkUpdateNeed();
        }
    }

    public checkUpdateNeed(): void {
        if (!this._component) {
            return;
        }
        if (this._view || this._avatarNameBubbles.length > 0 || this._useProductBubbles.length > 0 || this._breedPetBubbles.length > 0 || this._SafeStr_2438 && this._SafeStr_2438.isVisible) {
            this._component.registerUpdateReceiver(this, 10);
        } else {
            this._component.removeUpdateReceiver(this);
        }
    }

    public update(param1: number): void {
        let _loc3_: RoomWidgetUserLocationUpdateEvent = null;
        if (this._view) {
            _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", this._view.userId, this._view.userType)), RoomWidgetUserLocationUpdateEvent);
            if (!_loc3_) {
                return;
            }
            this._view.update(_loc3_.rectangle, _loc3_.screenLocation, param1);
        }
        if (this._SafeStr_2438 && this._SafeStr_2438.isVisible()) {
            _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", this._SafeStr_2438.userId, this._SafeStr_2438.userType)), RoomWidgetUserLocationUpdateEvent);
            if (!_loc3_) {
                return;
            }
            this._SafeStr_2438.update(_loc3_.rectangle, _loc3_.screenLocation, param1);
        }
        for (const _loc2_ of valuesOf(this._avatarNameBubbles)) {
            if (_loc2_.isGameRoomMode) {
                _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_GAME_OBJECT_LOCATION", _loc2_.userId | 0, _loc2_.userType | 0)), RoomWidgetUserLocationUpdateEvent);
            } else {
                _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", _loc2_.userId | 0, _loc2_.userType | 0)), RoomWidgetUserLocationUpdateEvent);
            }
            if (_loc3_) {
                _loc2_.update(_loc3_.rectangle, _loc3_.screenLocation, param1);
            }
        }
        for (const _loc4_ of valuesOf(this._useProductBubbles)) {
            _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", _loc4_.userId | 0, _loc4_.userType | 0)), RoomWidgetUserLocationUpdateEvent);
            if (_loc3_) {
                _loc4_.update(_loc3_.rectangle, _loc3_.screenLocation, param1);
            }
        }
        for (const _loc5_ of valuesOf(this._breedPetBubbles)) {
            _loc3_ = asInstanceOf(this.messageListener.processWidgetMessage(new RoomWidgetGetObjectLocationMessage("RWGOI_MESSAGE_GET_OBJECT_LOCATION", _loc5_.userId | 0, _loc5_.userType | 0)), RoomWidgetUserLocationUpdateEvent);
            if (_loc3_) {
                _loc5_.update(_loc3_.rectangle, _loc3_.screenLocation, param1);
            }
        }
    }

    public openAvatarEditor(): void {
        this.handler.container.avatarEditor.openEditor(0, null, null, true);
        this.handler.container.avatarEditor.loadOwnAvatarInEditor(0);
    }

    public openTrainingView(): void {
        this.handler.container.events.dispatchEvent(new RoomWidgetUpdateEvent("RWPCUE_OPEN_PET_TRAINING"));
    }

    public closeTrainingView(): void {
        this.handler.container.events.dispatchEvent(new RoomWidgetUpdateEvent("RWPCUE_CLOSE_PET_TRAINING"));
    }

    public sendSignRequest(param1: number): void {
        this.handler.container.roomSession.sendSignMessage(param1);
    }

    public showUseProductConfirmation(param1: number, param2: number, param3: number): void {
        if (!this._SafeStr_2503) {
            this._SafeStr_2503 = new UseProductConfirmationView(this);
        }
        this._SafeStr_2503.open(param1, param2, param3);
    }

    public showBreedingPetsWaitingConfirmationAlert(param1: number, param2: number): void {
        this.removeBreedingPetsWaitingConfirmationAlert();
        this._breedingConfirmationAlert = this.windowManager.confirm("${breedpets.confirmation.notification.title}", "${breedpets.confirmation.notification.text}", 0, this.onWaitingConfirmationAlert);
        this._SafeStr_5027 = param1;
        this._SafeStr_3954 = param2;
    }

    public onWaitingConfirmationAlert = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
        }
        if (param2.type == "WE_CANCEL") {
            if (this._SafeStr_3954 != -1 && this._SafeStr_3954 != -1) {
                this.cancelBreedPets(this._SafeStr_5027, this._SafeStr_3954);
            }
        }
        this.removeBreedingPetsWaitingConfirmationAlert();
    };

    public acceptBreedingPets(param1: number, param2: number): void {
        if (this._SafeStr_2473 != null) {
            if (this._SafeStr_2473.requestRoomObjectId == param1 && this._SafeStr_2473.targetRoomObjectId == param2) {
                this.removeBreedMonsterPlantsConfirmationView();
            }
        }
        if (this._breedingConfirmationAlert != null) {
            this._breedingConfirmationAlert.dispose();
        }
    }

    public cancelBreedingPets(param1: number, param2: number): void {
        if (this._SafeStr_2473 != null) {
            if (this._SafeStr_2473.requestRoomObjectId == param1 && this._SafeStr_2473.targetRoomObjectId == param2) {
                this.removeBreedMonsterPlantsConfirmationView();
            }
        }
        this.removeBreedingPetsWaitingConfirmationAlert();
        this.windowManager.alert("${breedpets.cancel.notification.title}", "${breedpets.cancel.notification.text}", 0, this.onBreedingAlert);
    }

    public onBreedingAlert = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK" || param2.type == "WE_CANCEL") {
            param1.dispose();
        }
    };

    public showBreedMonsterPlantsConfirmationView(param1: number, param2: number, param3: boolean): void {
        if (!this._SafeStr_2473) {
            this._SafeStr_2473 = new BreedMonsterPlantsConfirmationView(this);
        }
        this._SafeStr_2473.open(param1, param2, param3);
    }

    public showConfirmPetBreedingView(param1: ConfirmPetBreedingPetData, param2: ConfirmPetBreedingPetData, param3: number, param4: any[], param5: number): void {
        if (!this._SafeStr_2787) {
            this._SafeStr_2787 = new ConfirmPetBreedingView(this);
        }
        let _loc6_: number = this.findPetRoomObjectIdByWebId(param1.webId);
        let _loc7_: number = this.findPetRoomObjectIdByWebId(param2.webId);
        this._SafeStr_2787.open(_loc6_, _loc7_, param3, param4, param5, param1.level, param2.level);
    }

    public showBreedPetsResultView(param1: BreedPetsResultData, param2: BreedPetsResultData): void {
        if (!this._SafeStr_2441) {
            this._SafeStr_2441 = new BreedPetsResultView(this);
        }
        this._SafeStr_2441.open(param1, param2);
    }

    public removeBreedPetsResultView(param1: BreedPetsResultView): void {
        if (param1 != null) {
            if (param1 == this._SafeStr_2441) {
                this._SafeStr_2441.dispose();
                this._SafeStr_2441 = null;
            } else {
                param1.dispose();
            }
        }
    }

    public isMonsterPlant(): boolean {
        if (this._SafeStr_2718 != null) {
            return this._SafeStr_2718.petType == 16;
        }
        return false;
    }

    public cancelBreedPets(param1: number, param2: number): void {
        let _loc3_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param1);
        let _loc4_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param2);
        if (_loc3_ && _loc4_) {
            this.handler.container.connection.send(new BreedPetsMessageComposer(1, _loc3_.webID, _loc4_.webID));
        }
    }

    public acceptBreedPets(param1: number, param2: number): void {
        let _loc3_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param1);
        let _loc4_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param2);
        if (_loc3_ && _loc4_) {
            this.handler.container.connection.send(new BreedPetsMessageComposer(2, _loc3_.webID, _loc4_.webID));
        }
    }

    public breedPets(param1: number, param2: number): void {
        let _loc3_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param1);
        let _loc4_: IUserData = this.handler.container.roomSession.userDataManager.getUserDataByIndex(param2);
        if (_loc3_ && _loc4_) {
            this.handler.container.connection.send(new BreedPetsMessageComposer(0, _loc3_.webID, _loc4_.webID));
        }
    }

    public openBotSkillConfigurationView(param1: number, param2: number, param3: Point = null): void {
        if (!this._SafeStr_2854.hasKey(param2)) {
            switch (param2 - 2) {
                case 0:
                    this._SafeStr_2854.add(2, new BotChatterMarkovConfiguration(this));
                    break;
                case 3:
                    this._SafeStr_2854.add(5, new BotChangeNameConfiguration(this));
                    break;
                default:
                    return;
            }
        }
        let _loc4_: BotSkillConfigurationView = this._SafeStr_2854.getValue(param2);
        _loc4_.open(param1, param3);
    }

    public cancelPetBreeding(param1: number): void {
        this.handler.container.connection.send(new CancelPetBreedingComposer(param1));
    }

    public confirmPetBreeding(param1: number, param2: string, param3: number, param4: number): void {
        this.handler.container.connection.send(new ConfirmPetBreedingComposer(param1, param2, param3, param4));
    }

    public showNestBreedingSuccess(param1: number, param2: number): void {
        if (this._SafeStr_5758 == null) {
            this._SafeStr_5758 = new NestBreedingSuccessView(this);
        }
        let _loc3_: number = this.findPetRoomObjectIdByWebId(param1);
        this._SafeStr_5758.open(_loc3_, param2);
    }

    private getOwnCharacterInfo(): void {
        this.messageListener.processWidgetMessage(new RoomWidgetRoomObjectMessage("RWROM_GET_OWN_CHARACTER_INFO", 0, 0));
    }

    private findPetRoomObjectIdByWebId(param1: number): number {
        let _loc4_: number = 0;
        let _loc2_: IRoomObject = null;
        let _loc6_: IUserData = null;
        let _loc5_: number = this.handler.container.roomSession.roomId;
        let _loc3_: number = this.handler.container.roomEngine.getRoomObjectCount(_loc5_, 100);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = this.handler.container.roomEngine.getRoomObjectWithIndex(_loc5_, _loc4_, 100);
            _loc6_ = this.handler.container.roomSession.userDataManager.getUserDataByIndex(_loc2_.getId());
            if (!(_loc6_ == null || _loc6_.type != 2)) {
                if (_loc6_.webID == param1) {
                    return _loc2_.getId();
                }
            }
            _loc4_++;
        }
        return -1;
    }

    private removeBreedPetViewsWithId(param1: number): void {
        let _loc3_: any[] = [];
        for (const _loc2_ of valuesOf(this._breedPetBubbles)) {
            if (_loc2_.objectId == param1 || _loc2_.requestRoomObjectId == param1) {
                if (_loc3_.indexOf(_loc2_) == -1) {
                    _loc3_.push(_loc2_);
                }
            }
        }
        for (const _loc4_ of _loc3_ ?? []) {
            this.removeView(_loc4_, false);
        }
    }

    private updateRentableBotView(param1: number, param2: string, param3: number, param4: RentableBotInfoData, param5: boolean = false, param6: boolean = false): void {
        let showBotContextMenu: boolean = false;
        let doNotOpen: boolean = false;
        let botId: number = param1;
        let name: string = param2;
        let roomIndex: number = param3;
        let data: RentableBotInfoData = param4;
        let keepClosed: boolean = param5;
        let forceOpen: boolean = param6;
        if (!data) {
            return;
        }
        showBotContextMenu = this._configuration.getBoolean("menu.bot.enabled");
        doNotOpen = keepClosed && !this._view;
        if (forceOpen) {
            doNotOpen = false;
        }
        if (showBotContextMenu && this._view && !(this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView || this._view instanceof PetMenuView || this._view instanceof OwnPetMenuView || this._view instanceof RentableBotMenuView)) {
            this.removeView(this._view, false);
        }
        this.removeUseProductViews();
        if (forceOpen || this._view != null && this._view.userId == botId && !keepClosed || this._view == null || this._view.userId != botId || this._view.userName != name || this._view.roomIndex != roomIndex || this._view.userType != 4) {
            if (this._view) {
                this.removeView(this._view, false);
            }
            if (!this._isGameMode) {
                if (!this._SafeStr_2966) {
                    this._SafeStr_2966 = new RentableBotMenuView(this);
                }
                if (!doNotOpen) {
                    this._SafeStr_3545 = roomIndex;
                    this._buttonsSetup = (): void => {
                            this._view = this._SafeStr_2966;
                            RentableBotMenuView.setup_RentableBotMenuView(this._SafeStr_2966 instanceof RentableBotMenuView ? this._SafeStr_2966 : null, botId, name, roomIndex, 4, data);
                        };
                    this.maybeSetupMenuView(roomIndex);
                }
            }
        } else if (this._view instanceof RentableBotMenuView) {
            if (this._view.userName == name) {
                this.removeView(this._view, false);
            }
        }
    }

    private updatePetView(param1: number, param2: string, param3: number, param4: PetInfoData): void {
        let petId: number = param1;
        let userName: string = param2;
        let roomIndex: number = param3;
        let petData: PetInfoData = param4;
        if (!petData) {
            return;
        }
        if (this._view && !(this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView || this._view instanceof PetMenuView || this._view instanceof OwnPetMenuView || this._view instanceof RentableBotMenuView)) {
            this.removeView(this._view, false);
        }
        this.removeUseProductViews();
        if (this._view == null || this._view.userId != petId || this._view.userName != userName || this._view.roomIndex != roomIndex || this._view.userType != 2) {
            if (this._view) {
                this.removeView(this._view, false);
            }
            if (!this._isGameMode) {
                this._SafeStr_3545 = roomIndex;
                if (petData.isOwnPet) {
                    if (!this._SafeStr_4227) {
                        this._SafeStr_4227 = new OwnPetMenuView(this, this._catalog);
                    }
                    this._buttonsSetup = (): void => {
                            this._view = this._SafeStr_4227;
                            OwnPetMenuView.setup_OwnPetMenuView(this._SafeStr_4227 instanceof OwnPetMenuView ? this._SafeStr_4227 : null, petId, userName, roomIndex, 2, petData);
                        };
                } else {
                    if (!this._SafeStr_3064) {
                        this._SafeStr_3064 = new PetMenuView(this);
                    }
                    this._buttonsSetup = (): void => {
                            this._view = this._SafeStr_3064;
                            PetMenuView.setup_PetMenuView(this._SafeStr_3064 instanceof PetMenuView ? this._SafeStr_3064 : null, petId, userName, roomIndex, 2, petData);
                        };
                }
                this.maybeSetupMenuView(roomIndex);
            }
        } else if (this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView) {
            if (this._view.userName == userName) {
                this.removeView(this._view, false);
            }
        }
    }

    private maybeSetupMenuView(param1: number): void {
        if (this._roomEvents.hasClickUserWired()) {
            return;
        }
        this.setupMenuView(param1);
    }

    private setupMenuView(param1: number): void {
        if (this._SafeStr_3545 == param1 && this._buttonsSetup != null) {
            this._buttonsSetup();
            this._SafeStr_3545 = -1;
            this._buttonsSetup = null;
        }
    }

    private updateUserView(param1: number, param2: string, param3: number, param4: number, param5: boolean, param6: AvatarInfoData): void {
        let friendNameView: UserNameView;
        let blocked: boolean = false;
        let userId: number = param1;
        let userName: string = param2;
        let userType: number = param3;
        let roomIndex: number = param4;
        let allowNameChange: boolean = param5;
        let data: AvatarInfoData = param6;
        let showAvatarContextMenu: boolean = data != null;
        if (showAvatarContextMenu && this._view && !(this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView || this._view instanceof PetMenuView || this._view instanceof OwnPetMenuView || this._view instanceof RentableBotMenuView)) {
            this.removeView(this._view, false);
        }
        this.removeUseProductViews();
        if (this._view == null || this._view.userId != userId || this._view.userName != userName || this._view.roomIndex != roomIndex || this._view.userType != 1 || allowNameChange) {
            if (this._view) {
                this.removeView(this._view, false);
            }
            if (!this._isGameMode) {
                if (showAvatarContextMenu) {
                    this._SafeStr_3545 = roomIndex;
                    this._buttonsSetup = null;
                    if (data.isOwnUser) {
                        if (this.isUserDecorating) {
                            return;
                        }
                        if (RoomEnterEffect.isRunning()) {
                            if (!this._SafeStr_3959) {
                                this._SafeStr_3959 = new NewUserHelpView(this);
                            }
                            this._buttonsSetup = (): void => {
                                    this._view = this._SafeStr_3959;
                                    NewUserHelpView.setup_NewUserHelpView(this._SafeStr_3959 instanceof NewUserHelpView ? this._SafeStr_3959 : null, userId, userName, roomIndex, 1);
                                };
                        } else {
                            if (!this._cachedOwnAvatarMenu) {
                                this._cachedOwnAvatarMenu = new OwnAvatarMenuView(this);
                            }
                            this._buttonsSetup = (): void => {
                                    this._view = this._cachedOwnAvatarMenu;
                                    OwnAvatarMenuView.setup_OwnAvatarMenuView(this._cachedOwnAvatarMenu instanceof OwnAvatarMenuView ? this._cachedOwnAvatarMenu : null, userId, userName, roomIndex, 1, data);
                                };
                        }
                    } else {
                        if (!this._SafeStr_3049) {
                            this._SafeStr_3049 = new AvatarMenuView(this);
                        }
                        this._buttonsSetup = (): void => {
                                this._view = this._SafeStr_3049;
                                AvatarMenuView.setup_AvatarMenuView(this._SafeStr_3049 instanceof AvatarMenuView ? this._SafeStr_3049 : null, userId, userName, roomIndex, userType, data);
                            };
                        for (friendNameView of valuesOf(this._avatarNameBubbles)) {
                            if (friendNameView.userId == userId) {
                                this.removeView(friendNameView, false);
                                break;
                            }
                        }
                    }
                    this.maybeSetupMenuView(roomIndex);
                } else if (!this.handler.roomEngine.isDecorateMode) {
                    if (!this._SafeStr_3175) {
                        this._SafeStr_3175 = new AvatarContextInfoButtonView(this);
                    }
                    this._view = this._SafeStr_3175;
                    blocked = this.handler.container.sessionDataManager.isBlocked(userId);
                    if (this.handler.container.sessionDataManager.userId == userId) {
                        AvatarContextInfoButtonView.setup(this._view, userId, userName, roomIndex, userType, allowNameChange, false, blocked);
                        if (this._SafeStr_3500) {
                            this._catalog.windowManager.registerHintWindow("avatar", this._view.window);
                            this._catalog.windowManager.showHint("avatar");
                            if (!this.handler.container.sessionDataManager.isNoob) {
                                this.setAvatarHightlightTimer();
                            }
                        }
                    } else {
                        AvatarContextInfoButtonView.setup(this._view, userId, userName, roomIndex, userType, allowNameChange, true, blocked);
                    }
                }
            }
        } else if (this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView) {
            if (this._view.userName == userName) {
                this.removeView(this._view, false);
            }
        }
    }

    private showUseProductMenu(param1: IUserData, param2: UseProductItem): void {
        let _loc3_: UseProductView = null;
        if (this._useProductBubbles[param1.webID.toString()] == null) {
            _loc3_ = new UseProductView(this);
            UseProductView.setup_UseProductView(_loc3_, param1.webID, param1.name, -1, 2, param2);
            this._useProductBubbles[param1.webID.toString()] = _loc3_;
            this.checkUpdateNeed();
        }
    }

    private showBreedPetMenu(param1: IUserData, param2: UseProductItem): void {
        let _loc3_: BreedPetView = null;
        if (this._breedPetBubbles[param1.webID.toString()] == null) {
            _loc3_ = new BreedPetView(this);
            BreedPetView.setup_BreedPetView(_loc3_, param1.webID, param1.name, -1, 2, param2, param1.canBreed);
            this._breedPetBubbles[param1.webID.toString()] = _loc3_;
            this.checkUpdateNeed();
        }
    }

    private setAvatarHightlightTimer(): void {
        this._SafeStr_3647 = new Timer(5000);
        this._SafeStr_3647.addEventListener("timer", this.onAvatarHighlightTimerEvent);
        this._SafeStr_3647.start();
    }

    private removeAvatarHighlightTimer(): void {
        this._SafeStr_3500 = false;
        this._catalog.windowManager.unregisterHintWindow("avatar");
        if (!this._SafeStr_3647) {
            return;
        }
        this._SafeStr_3647.stop();
        this._SafeStr_3647 = null;
    }

    private removeUseProductConfirmationView(): void {
        if (this._SafeStr_2503) {
            this._SafeStr_2503.dispose();
            this._SafeStr_2503 = null;
        }
    }

    private removeBreedingPetsWaitingConfirmationAlert(): void {
        if (this._breedingConfirmationAlert != null) {
            this._breedingConfirmationAlert.dispose();
            this._breedingConfirmationAlert = null;
            this._SafeStr_5027 = -1;
            this._SafeStr_3954 = -1;
        }
    }

    private removeBreedMonsterPlantsConfirmationView(): void {
        if (this._SafeStr_2473) {
            this._SafeStr_2473.dispose();
            this._SafeStr_2473 = null;
        }
    }

    private removeConfirmPetBreedingView(): void {
        if (this._SafeStr_2787) {
            this._SafeStr_2787.dispose();
            this._SafeStr_2787 = null;
        }
    }

    private findCurrentUserRoomObject(): IRoomObject {
        let _loc4_: number = 0;
        let _loc2_: IRoomObject = null;
        let _loc1_: IUserData = null;
        let _loc5_: number = this.handler.container.sessionDataManager.userId;
        let _loc6_: number = this.handler.roomEngine.activeRoomId;
        let _loc7_: number = 100;
        let _loc3_: number = this.handler.roomEngine.getRoomObjectCount(_loc6_, _loc7_);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = this.handler.roomEngine.getRoomObjectWithIndex(_loc6_, _loc4_, 100);
            if (_loc2_ != null) {
                _loc1_ = this.handler.roomSession.userDataManager.getUserDataByIndex(_loc2_.getId());
                if (_loc1_ != null) {
                    if (_loc1_.webID == _loc5_) {
                        return _loc2_;
                    }
                }
            }
            _loc4_++;
        }
        return null;
    }

    private onRoomObjectAdded = (param1: RoomEngineObjectEvent): void => {
        let _loc2_: IUserData = null;
        let _loc3_: IHabboFriendList = null;
        if (param1.category == 100 && this.handler != null && this.handler.roomSession != null) {
            _loc2_ = this.handler.roomSession.userDataManager.getUserDataByIndex(param1.objectId);
            _loc3_ = this.handler.friendList;
            if (_loc2_ && _loc3_) {
                if (this.handler.friendList.getFriendNames().indexOf(_loc2_.name) > -1) {
                    this.showUserName(_loc2_, param1.objectId);
                }
            }
        }
    };

    private onRoomObjectRemoved = (param1: RoomEngineObjectEvent): void => {
        let _loc8_: any;
        let _loc7_: any;
        let _loc6_: number = 0;
        let _loc4_: any[] = null;
        let _loc5_: number = 0;
        let _loc3_: any[] = null;
        if (param1.category == 100) {
            for (const _loc2_ of valuesOf(this._avatarNameBubbles)) {
                if (_loc2_.objectId == param1.objectId) {
                    this.removeView(_loc2_, false);
                }
            }
            _loc4_ = [];
            for (_loc8_ of valuesOf(this._breedPetBubbles)) {
                _loc6_ = _loc8_.requestRoomObjectId | 0;
                if (_loc6_ == _loc5_) {
                    _loc4_.push(_loc8_);
                }
            }
            for (_loc8_ of _loc4_ ?? []) {
                this.removeView(_loc8_, false);
            }
            if (this._SafeStr_2473 != null) {
                if (param1.objectId == this._SafeStr_2473.requestRoomObjectId || param1.objectId == this._SafeStr_2473.targetRoomObjectId) {
                    this.removeBreedMonsterPlantsConfirmationView();
                }
            }
            if (this._SafeStr_2787 != null) {
                if (param1.objectId == this._SafeStr_2787.requestRoomObjectId || param1.objectId == this._SafeStr_2787.targetRoomObjectId) {
                    this.removeConfirmPetBreedingView();
                }
            }
            if (this._SafeStr_2503 != null) {
                if (param1.objectId == this._SafeStr_2503.requestObjectId || param1.objectId == this._SafeStr_2503.targetRoomObjectId) {
                    this.removeUseProductConfirmationView();
                }
            }
        }
        if (param1.category == 10) {
            _loc5_ = param1.objectId;
            if (this._SafeStr_2503 != null) {
                if (this._SafeStr_2503.requestObjectId == _loc5_) {
                    this.removeUseProductConfirmationView();
                }
            }
            if (this._SafeStr_2441 != null) {
                this._SafeStr_2441.roomObjectRemoved(_loc5_);
            }
            _loc3_ = [];
            for (_loc7_ of valuesOf(this._useProductBubbles)) {
                _loc6_ = _loc7_.requestRoomObjectId | 0;
                if (_loc6_ == _loc5_) {
                    _loc3_.push(_loc7_);
                }
            }
            for (_loc7_ of _loc3_ ?? []) {
                this.removeView(_loc7_, false);
            }
        }
    };

    private onEffectsChanged = (param1: HabboInventoryEffectsEvent): void => {
        if (this._view instanceof OwnAvatarMenuView) {
            (this._view instanceof OwnAvatarMenuView ? this._view : null).updateButtons();
        }
    };

    private updateEventHandler = (param1: RoomWidgetUpdateEvent): void => {
        let _loc12_: RoomWidgetAvatarInfoEvent = null;
        let _loc8_: RoomWidgetPetStatusUpdateEvent = null;
        let _loc3_: IUserData = null;
        let _loc22_: RoomWidgetPetLevelUpdateEvent = null;
        let _loc27_: IUserData = null;
        let _loc2_: RoomWidgetPetBreedingResultEvent = null;
        let _loc4_: BreedPetsResultData = null;
        let _loc14_: BreedPetsResultData = null;
        let _loc20_: RoomWidgetPetBreedingEvent = null;
        let _loc7_: number = 0;
        let _loc25_: number = 0;
        let _loc16_: RoomWidgetConfirmPetBreedingEvent = null;
        let _loc15_: RoomWidgetConfirmPetBreedingResultEvent = null;
        let _loc9_: RoomWidgetUserInfoUpdateEvent = null;
        let _loc11_: AvatarInfoData = null;
        let _loc13_: RoomWidgetRentableBotInfoUpdateEvent = null;
        let _loc5_: IRoomSession = null;
        let _loc26_: IUserData = null;
        let _loc23_: RoomWidgetRentableBotSkillListUpdateEvent = null;
        let _loc18_: RoomWidgetRentableBotForceOpenContextMenuEvent = null;
        let _loc21_: number = 0;
        let _loc17_: IUserData = null;
        let _loc6_: RoomWidgetUserInfoUpdateEvent = null;
        let _loc24_: RoomWidgetPetInfoUpdateEvent = null;
        let _loc19_: RoomWidgetRoomObjectUpdateEvent = null;
        switch (param1.type) {
            case "RWAIE_AVATAR_INFO":
                _loc12_ = param1 instanceof RoomWidgetAvatarInfoEvent ? param1 : null;
                this._SafeStr_3500 = !this._isInitialized && this.handler.container.roomSession != null && _loc12_.roomIndex == this.handler.container.roomSession.ownUserRoomId;
                if (_loc12_.allowNameChange) {
                    this.useMinimizedOwnAvatarMenu = true;
                    this.selectOwnAvatar();
                } else {
                    this.updateUserView(_loc12_.userId, _loc12_.userName, _loc12_.userType, _loc12_.roomIndex, _loc12_.allowNameChange, null);
                }
                this._isInitialized = true;
                break;
            case "RWONE_TYPE":
                if (castTo(param1, RoomWidgetRoomObjectNameEvent).category == 100) {
                    this.updateUserView(castTo(param1, RoomWidgetRoomObjectNameEvent).userId, castTo(param1, RoomWidgetRoomObjectNameEvent).userName, castTo(param1, RoomWidgetRoomObjectNameEvent).userType, castTo(param1, RoomWidgetRoomObjectNameEvent).roomIndex, false, null);
                }
                break;
            case "RWROUE_FURNI_ADDED":
                if (castTo(param1, RoomWidgetRoomObjectUpdateEvent).category == 10) {
                    if (this._SafeStr_2441 != null) {
                        this._SafeStr_2441.roomObjectAdded(castTo(param1, RoomWidgetRoomObjectUpdateEvent).id);
                    }
                }
                break;
            case "RWROUE_OBJECT_SELECTED":
                if (castTo(param1, RoomWidgetRoomObjectUpdateEvent).category == 100) {
                    this._handlePetInfo = true;
                }
                this.removeBreedPetViews();
                break;
            case "RWROUE_OBJECT_DESELECTED":
                if (this._view && !(this._view instanceof NewUserHelpView)) {
                    this.removeView(this._view, false);
                }
                this.removeUseProductViews();
                this.removeBreedPetViews();
                break;
            case "RWFIUE_FURNI":
                if (this._view) {
                    this.removeView(this._view, false);
                }
                this.removeUseProductViews();
                this.removeBreedPetViews();
                break;
            case "RWROUE_OBJECT_ROLL_OVER":
                if (this._SafeStr_3500) {
                    return;
                }
                if (!(this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView || this._view instanceof OwnPetMenuView || this._view instanceof NewUserHelpView || this._view instanceof RentableBotMenuView)) {
                    this._SafeStr_5043 = castTo(param1, RoomWidgetRoomObjectUpdateEvent).id;
                    this.messageListener.processWidgetMessage(new RoomWidgetRoomObjectMessage("RWROM_GET_OBJECT_NAME", castTo(param1, RoomWidgetRoomObjectUpdateEvent).id, castTo(param1, RoomWidgetRoomObjectUpdateEvent).category));
                }
                break;
            case "RWROUE_OBJECT_ROLL_OUT":
                if (this._SafeStr_3500) {
                    return;
                }
                if (!(this._view instanceof AvatarMenuView || this._view instanceof OwnAvatarMenuView || this._view instanceof OwnPetMenuView || this._view instanceof NewUserHelpView || this._view instanceof RentableBotMenuView)) {
                    if (castTo(param1, RoomWidgetRoomObjectUpdateEvent).id == this._SafeStr_5043) {
                        if (this._view && !this._view.allowNameChange) {
                            this.removeView(this._view, false);
                            this._SafeStr_5043 = -1;
                        }
                    }
                }
                break;
            case "RWPIUE_PET_STATUS_UPDATE":
                _loc8_ = param1 instanceof RoomWidgetPetStatusUpdateEvent ? param1 : null;
                if (this._view && this._view instanceof OwnPetMenuView) {
                    if (_loc8_ != null && this._SafeStr_2718 != null) {
                        _loc3_ = this.handler.roomSession.userDataManager.getUserDataByIndex(_loc8_.petId);
                        if (_loc3_ != null && _loc3_.webID == this._SafeStr_2718.id) {
                            this.removeView(this._view, true);
                        }
                    }
                }
                if (_loc8_ != null) {
                    this.removeBreedPetViewsWithId(_loc8_.petId);
                }
                break;
            case "RWPLUE_PET_LEVEL_UPDATE":
                _loc22_ = param1 instanceof RoomWidgetPetLevelUpdateEvent ? param1 : null;
                if (this._view && this._view instanceof OwnPetMenuView) {
                    if (_loc22_ != null && this._SafeStr_2718 != null) {
                        _loc27_ = this.handler.roomSession.userDataManager.getUserDataByIndex(_loc22_.petId);
                        if (_loc27_ != null && _loc27_.webID == this._SafeStr_2718.id) {
                            this.removeView(this._view, true);
                        }
                    }
                }
                if (_loc22_ != null) {
                    this.removeBreedPetViewsWithId(_loc22_.petId);
                }
                break;
            case "RWPBRE_PET_BREEDING_RESULT":
                _loc2_ = param1 instanceof RoomWidgetPetBreedingResultEvent ? param1 : null;
                _loc4_ = new BreedPetsResultData();
                _loc4_.stuffId = _loc2_.resultData.stuffId;
                _loc4_.classId = _loc2_.resultData.classId;
                _loc4_.productCode = _loc2_.resultData.productCode;
                _loc4_.userId = _loc2_.resultData.userId;
                _loc4_.userName = _loc2_.resultData.userName;
                _loc4_.rarityLevel = _loc2_.resultData.rarityLevel;
                _loc4_.hasMutation = _loc2_.resultData.hasMutation;
                _loc14_ = new BreedPetsResultData();
                _loc14_.stuffId = _loc2_.resultData2.stuffId;
                _loc14_.classId = _loc2_.resultData2.classId;
                _loc14_.productCode = _loc2_.resultData2.productCode;
                _loc14_.userId = _loc2_.resultData2.userId;
                _loc14_.userName = _loc2_.resultData2.userName;
                _loc14_.rarityLevel = _loc2_.resultData2.rarityLevel;
                _loc14_.hasMutation = _loc2_.resultData2.hasMutation;
                this.showBreedPetsResultView(_loc4_, _loc14_);
                break;
            case "RWPPBE_PET_BREEDING_":
                _loc20_ = param1 instanceof RoomWidgetPetBreedingEvent ? param1 : null;
                _loc7_ = this.findPetRoomObjectIdByWebId(_loc20_.ownPetId);
                _loc25_ = this.findPetRoomObjectIdByWebId(_loc20_.otherPetId);
                switch (_loc20_.state) {
                    case 0:
                        this.showBreedMonsterPlantsConfirmationView(_loc7_, _loc25_, false);
                        break;
                    case 1:
                        this.cancelBreedingPets(_loc7_, _loc25_);
                        break;
                    case 2:
                        this.acceptBreedingPets(_loc7_, _loc25_);
                        break;
                    case 3:
                        this.showBreedMonsterPlantsConfirmationView(_loc7_, _loc25_, true);
                }
                break;
            case "RWIUM_INVENTORY_UPDATED":
                if (this._SafeStr_2441 != null) {
                    this._SafeStr_2441.updatePlacingButtons();
                }
                break;
            case "RWPPBE_CONFIRM_PET_BREEDING_":
                _loc16_ = param1 instanceof RoomWidgetConfirmPetBreedingEvent ? param1 : null;
                this.showConfirmPetBreedingView(_loc16_.pet1, _loc16_.pet2, _loc16_.nestId, _loc16_.rarityCategories, _loc16_.resultPetTypeId);
                break;
            case "RWPPBE_CONFIRM_PET_BREEDING_RESULT":
                switch ((_loc15_ = param1 instanceof RoomWidgetConfirmPetBreedingResultEvent ? param1 : null).result) {
                    case 0:
                        this.removeConfirmPetBreedingView();
                        break;
                    case 1:
                        this.windowManager.simpleAlert("${breedpets.confirmation.alert.title}", "${breedpets.confirmation.alert.nonest.head}", "${breedpets.confirmation.alert.nonest.desc}");
                        this.removeConfirmPetBreedingView();
                        break;
                    case 2:
                        this.windowManager.simpleAlert("${breedpets.confirmation.alert.title}", "${breedpets.confirmation.alert.petsmissing.head}", "${breedpets.confirmation.alert.petsmissing.desc}");
                        this.removeConfirmPetBreedingView();
                        break;
                    case 3:
                        this.windowManager.simpleAlert("${breedpets.confirmation.alert.title}", "${breedpets.confirmation.alert.name.invalid.head}", "${breedpets.confirmation.alert.name.invalid.desc}");
                        if (this._SafeStr_2787) {
                            this._SafeStr_2787.enable();
                        }
                }
                break;
            case "RWUIUE_OWN_USER":
            case "RWUIUE_PEER":
                _loc9_ = param1 instanceof RoomWidgetUserInfoUpdateEvent ? param1 : null;
                this._SafeStr_5087.populate(_loc9_);
                _loc11_ = _loc9_.isSpectatorMode ? null : this._SafeStr_5087;
                this.updateUserView(_loc9_.webID, _loc9_.name, _loc9_.userType, _loc9_.userRoomId, this._SafeStr_5087.allowNameChange, _loc11_);
                break;
            case "RWRBIUE_RENTABLE_BOT":
                _loc13_ = param1 instanceof RoomWidgetRentableBotInfoUpdateEvent ? param1 : null;
                if (!this._SafeStr_2360) {
                    this._SafeStr_2360 = new RentableBotInfoData();
                }
                this._SafeStr_2360.populate(_loc13_);
                _loc5_ = this.handler.container.roomSessionManager.getSession(_loc21_);
                if (!_loc5_) {
                    return;
                }
                _loc26_ = _loc5_.userDataManager.getRentableBotUserData(_loc13_.webID);
                if (!_loc26_) {
                    return;
                }
                this._SafeStr_3369[_loc13_.webID.toString()] = _loc26_.botSkillData;
                if (this._SafeStr_2360 && _loc26_.botSkillData) {
                    this._SafeStr_2360.cloneAndSetSkillsWithCommands(_loc26_.botSkillData);
                }
                this.updateRentableBotView(_loc13_.webID, _loc13_.name, _loc13_.userRoomId, this._SafeStr_2360);
                break;
            case "RWRBSLUE_SKILL_LIST":
                _loc23_ = param1 instanceof RoomWidgetRentableBotSkillListUpdateEvent ? param1 : null;
                this._SafeStr_3369[_loc23_.botId.toString()] = _loc23_.botSkillsWithCommands;
                if (this._SafeStr_2360) {
                    this._SafeStr_2360.cloneAndSetSkillsWithCommands(_loc23_.botSkillsWithCommands);
                    this.updateRentableBotView(this._SafeStr_2360.id, this._SafeStr_2360.name, this._SafeStr_2360.roomIndex, this._SafeStr_2360, true);
                }
                break;
            case "RWRBFOCME_OPEN":
                _loc18_ = param1 instanceof RoomWidgetRentableBotForceOpenContextMenuEvent ? param1 : null;
                if (this._SafeStr_2360) {
                    this.updateRentableBotView(this._SafeStr_2360.id, this._SafeStr_2360.name, this._SafeStr_2360.roomIndex, this._SafeStr_2360, false, true);
                    break;
                }
                _loc21_ = this.handler.container.roomEngine.activeRoomId;
                _loc17_ = this.handler.container.roomSessionManager.getSession(_loc21_).userDataManager.getUserDataByType(_loc18_.botId, 4);
                this.messageListener.processWidgetMessage(new RoomWidgetRoomObjectMessage("RWROM_GET_OBJECT_INFO", _loc17_.roomObjectId, 100));
                this.handler.container.roomEngine.selectAvatar(_loc21_, _loc17_.roomObjectId);
                break;
            case "RWUIUE_BOT":
                _loc6_ = param1 instanceof RoomWidgetUserInfoUpdateEvent ? param1 : null;
                this.updateUserView(_loc6_.webID, _loc6_.name, _loc6_.userType, _loc6_.userRoomId, false, null);
                break;
            case "RWPIUE_PET_INFO":
                if (this._handlePetInfo) {
                    _loc24_ = param1 instanceof RoomWidgetPetInfoUpdateEvent ? param1 : null;
                    this._SafeStr_2718.populate(_loc24_);
                    this.updatePetView(_loc24_.id, _loc24_.name, _loc24_.roomIndex, this._SafeStr_2718);
                }
                break;
            case "rwudue_user_data_updated":
                if (!this._isInitialized) {
                    this.getOwnCharacterInfo();
                }
                break;
            case "RWROUE_USER_REMOVED":
                _loc19_ = param1 instanceof RoomWidgetRoomObjectUpdateEvent ? param1 : null;
                if (this._view && this._view.roomIndex == _loc19_.id) {
                    this.removeView(this._view, false);
                }
                for (const _loc10_ of valuesOf(this._avatarNameBubbles)) {
                    if (_loc10_.objectId == _loc19_.id) {
                        this.removeView(_loc10_, false);
                        break;
                    }
                }
                this.removeBreedPetViewsWithId(_loc19_.id);
                break;
            case "RWREUE_NORMAL_MODE":
                this._isGameMode = false;
                break;
            case "RWREUE_GAME_MODE":
                this._isGameMode = true;
        }
        this.checkUpdateNeed();
    };

    private onUserClickHandledEvent = (param1: WiredUserClickHandledEvent): void => {
        if (param1.openMenu) {
            this.setupMenuView(param1.index);
            this.checkUpdateNeed();
        }
    };

    private onAvatarHighlightTimerEvent = (param1: TimerEvent): void => {
        this.removeAvatarHighlightTimer();
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IContextMenuParentWidget](): true {
        return true;
    }
}
