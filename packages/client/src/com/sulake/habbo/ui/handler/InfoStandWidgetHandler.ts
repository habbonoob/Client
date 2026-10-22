import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { RoomModerationSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomModerationSettings';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomSessionConfirmPetBreedingEvent } from '@/com/sulake/habbo/session/events/RoomSessionConfirmPetBreedingEvent';
import type { RoomSessionConfirmPetBreedingResultEvent } from '@/com/sulake/habbo/session/events/RoomSessionConfirmPetBreedingResultEvent';
import type { RoomSessionFavouriteGroupUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionFavouriteGroupUpdateEvent';
import type { RoomSessionPetBreedingEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetBreedingEvent';
import type { RoomSessionPetBreedingResultEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetBreedingResultEvent';
import type { RoomSessionPetCommandsUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetCommandsUpdateEvent';
import type { RoomSessionPetFigureUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetFigureUpdateEvent';
import type { RoomSessionPetInfoUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetInfoUpdateEvent';
import type { RoomSessionUserFigureUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserFigureUpdateEvent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IPetInfo } from '@/com/sulake/habbo/session/IPetInfo';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { NowPlayingEvent } from '@/com/sulake/habbo/sound/events/NowPlayingEvent';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { InfoStandFurniData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniData';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { HabboGroupDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsMessageEvent';
import { RelationshipStatusInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/RelationshipStatusInfoEvent';
import { DropCarryItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/DropCarryItemMessageComposer';
import { PassCarryItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/PassCarryItemMessageComposer';
import { PassCarryItemToPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/avatar/PassCarryItemToPetMessageComposer';
import { GiveSupplementToPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/GiveSupplementToPetMessageComposer';
import { SetObjectDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/SetObjectDataMessageComposer';
import { PetSelectedMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/PetSelectedMessageComposer';
import { RespectPetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/RespectPetMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { GetRelationshipStatusInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetRelationshipStatusInfoMessageComposer';
import { StuffDataFactory } from '@/com/sulake/habbo/room/object/data/StuffDataFactory';
import { RoomSessionUserBadgesEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserBadgesEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { BreedingRarityCategoryData } from '@/com/sulake/habbo/ui/widget/events/BreedingRarityCategoryData';
import { ConfirmPetBreedingPetData } from '@/com/sulake/habbo/ui/widget/events/ConfirmPetBreedingPetData';
import { PetBreedingResultEventData } from '@/com/sulake/habbo/ui/widget/events/PetBreedingResultEventData';
import { RoomWidgetChatInputContentUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChatInputContentUpdateEvent';
import { RoomWidgetConfirmPetBreedingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetConfirmPetBreedingEvent';
import { RoomWidgetConfirmPetBreedingResultEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetConfirmPetBreedingResultEvent';
import { RoomWidgetFurniInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurniInfoUpdateEvent';
import { RoomWidgetPetBreedingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetBreedingEvent';
import { RoomWidgetPetBreedingResultEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetBreedingResultEvent';
import { RoomWidgetPetCommandsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetCommandsUpdateEvent';
import { RoomWidgetPetFigureUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetFigureUpdateEvent';
import { RoomWidgetPetInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetInfoUpdateEvent';
import { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';
import { RoomWidgetRoomObjectNameEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectNameEvent';
import { RoomWidgetSongUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSongUpdateEvent';
import { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import { RoomWidgetChangeMottoMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChangeMottoMessage';
import { RoomWidgetFurniActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniActionMessage';
import { RoomWidgetGetBadgeDetailsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetBadgeDetailsMessage';
import { RoomWidgetGetBadgeImageMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetBadgeImageMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetPetCommandMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPetCommandMessage';
import { RoomWidgetPresentOpenMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPresentOpenMessage';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { RoomWidgetRoomTagSearchMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomTagSearchMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { FurniId } from '@/com/sulake/habbo/utils/FurniId';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class InfoStandWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::InfoStandWidgetHandler'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        InfoStandWidgetHandler.#initStatics();
        return InfoStandWidgetHandler._log;
    }

    constructor(param1: IHabboMusicController) {
        this._musicController = param1;
        if (this._musicController != null) {
            this._musicController.events.addEventListener("NPE_SONG_CHANGED", this.onNowPlayingChanged);
            this._musicController.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
        }
    }

    private _disposed: boolean = false;
    private _cachedPetImages: UtilsMap = new UtilsMap();

    declare private _musicController: IHabboMusicController;

    declare private _widget: InfoStandWidget;

    declare private _SafeStr_3669: IMessageEvent;

    declare private _SafeStr_3757: IMessageEvent;

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container != null) {
            if (this._container.roomSessionManager != null) {
                this._container.roomSessionManager.events.removeEventListener("RSUBE_FIGURE", this.onFigureUpdate);
                this._container.roomSessionManager.events.removeEventListener("RSPIUE_PET_INFO", this.onPetInfo);
                this._container.roomSessionManager.events.removeEventListener("RSPIUE_ENABLED_PET_COMMANDS", this.onPetCommands);
                this._container.roomSessionManager.events.removeEventListener("rsfgue_favourite_group_update", this.onFavouriteGroupUpdated);
                this._container.roomSessionManager.events.removeEventListener("RSPFUE_PET_FIGURE_UPDATE", this.onPetFigureUpdate);
                this._container.roomSessionManager.events.removeEventListener("RSPFUE_PET_BREEDING_RESULT", this.onPetBreedingResult);
                this._container.roomSessionManager.events.removeEventListener("RSPFUE_PET_BREEDING", this.onPetBreedingEvent);
                this._container.roomSessionManager.events.removeEventListener("RSPFUE_CONFIRM_PET_BREEDING", this.onConfirmPetBreedingEvent);
                this._container.roomSessionManager.events.removeEventListener("RSPFUE_CONFIRM_PET_BREEDING_RESULT", this.onConfirmPetBreedingResultEvent);
            }
            if (this._container.connection != null) {
                if (this._SafeStr_3669 != null) {
                    this._container.connection.removeMessageEvent(this._SafeStr_3669);
                    this._SafeStr_3669.dispose();
                    this._SafeStr_3669 = null;
                }
                if (this._SafeStr_3757 != null) {
                    this._container.connection.removeMessageEvent(this._SafeStr_3757);
                    this._SafeStr_3757.dispose();
                    this._SafeStr_3757 = null;
                }
            }
        }
        this._container = param1;
        if (param1 == null) {
            return;
        }
        if (this._container.roomSessionManager != null) {
            this._container.roomSessionManager.events.addEventListener("RSUBE_FIGURE", this.onFigureUpdate);
            this._container.roomSessionManager.events.addEventListener("RSPIUE_PET_INFO", this.onPetInfo);
            this._container.roomSessionManager.events.addEventListener("RSPIUE_ENABLED_PET_COMMANDS", this.onPetCommands);
            this._container.roomSessionManager.events.addEventListener("rsfgue_favourite_group_update", this.onFavouriteGroupUpdated);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_PET_FIGURE_UPDATE", this.onPetFigureUpdate);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_PET_BREEDING_RESULT", this.onPetBreedingResult);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_PET_BREEDING", this.onPetBreedingEvent);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_CONFIRM_PET_BREEDING", this.onConfirmPetBreedingEvent);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_CONFIRM_PET_BREEDING_RESULT", this.onConfirmPetBreedingResultEvent);
        }
        if (this._container.connection) {
            this._SafeStr_3669 = new HabboGroupDetailsMessageEvent(this.onGroupDetails);
            this._container.connection.addMessageEvent(this._SafeStr_3669);
            this._SafeStr_3757 = new RelationshipStatusInfoEvent(this.onRelationshipStatusEvent);
            this._container.connection.addMessageEvent(this._SafeStr_3757);
        }
    }

    public set widget(param1: InfoStandWidget) {
        this._widget = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_INFOSTAND";
    }

    public get isActivityDisplayEnabled(): boolean {
        return !!(this._container != null && this._container.config && this._container.config.getBoolean("activity.point.display.enabled"));
    }

    public dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: BitmapData = null;
        if (this._cachedPetImages != null) {
            _loc1_ = this._cachedPetImages.length - 1;
            while (_loc1_ >= 0) {
                _loc2_ = this._cachedPetImages.getWithIndex(_loc1_);
                if (_loc2_) {
                    _loc2_.dispose();
                }
                _loc2_ = null;
                _loc1_--;
            }
            this._cachedPetImages.dispose();
            this._cachedPetImages = null;
        }
        if (this._musicController != null) {
            this._musicController.events.removeEventListener("NPE_SONG_CHANGED", this.onNowPlayingChanged);
            this._musicController.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
            this._musicController = null;
        }
        this._disposed = true;
        this.container = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWROM_GET_OBJECT_INFO");
        _loc1_.push("RWROM_GET_OBJECT_NAME");
        _loc1_.push("RWUAM_SEND_FRIEND_REQUEST");
        _loc1_.push("RWUAM_RESPECT_USER");
        _loc1_.push("RWUAM_REPLENISH_RESPECT_USER");
        _loc1_.push("RWUAM_WIRED_INSPECT");
        _loc1_.push("RWUAM_WIRED_INSPECT_PET");
        _loc1_.push("RWUAM_WIRED_INSPECT_BOT");
        _loc1_.push("RWUAM_OPEN_PROFILE");
        _loc1_.push("RWUAM_WHISPER_USER");
        _loc1_.push("RWUAM_IGNORE_USER");
        _loc1_.push("RWUAM_UNIGNORE_USER");
        _loc1_.push("RWUAM_KICK_USER");
        _loc1_.push("RWUAM_BAN_USER_DAY");
        _loc1_.push("RWUAM_BAN_USER_HOUR");
        _loc1_.push("RWUAM_BAN_USER_PERM");
        _loc1_.push("RWUAM_MUTE_USER_2MIN");
        _loc1_.push("RWUAM_MUTE_USER_5MIN");
        _loc1_.push("RWUAM_MUTE_USER_10MIN");
        _loc1_.push("RWUAM_GIVE_RIGHTS");
        _loc1_.push("RWUAM_TAKE_RIGHTS");
        _loc1_.push("RWUAM_START_TRADING");
        _loc1_.push("RWUAM_OPEN_HOME_PAGE");
        _loc1_.push("RWUAM_PASS_CARRY_ITEM");
        _loc1_.push("RWUAM_GIVE_CARRY_ITEM_TO_PET");
        _loc1_.push("RWUAM_DROP_CARRY_ITEM");
        _loc1_.push("RWFAM_MOVE");
        _loc1_.push("RWFUAM_ROTATE");
        _loc1_.push("RWFAM_PICKUP");
        _loc1_.push("RWFAM_EJECT");
        _loc1_.push("RWFAM_USE");
        _loc1_.push("RWFAM_SAVE_STUFF_DATA");
        _loc1_.push("RWFAM_WIRED_INSPECT");
        _loc1_.push("RWRTSM_ROOM_TAG_SEARCH");
        _loc1_.push("RWGOI_MESSAGE_GET_BADGE_DETAILS");
        _loc1_.push("RWGOI_MESSAGE_GET_BADGE_IMAGE");
        _loc1_.push("RWUAM_REPORT");
        _loc1_.push("RWUAM_PICKUP_PET");
        _loc1_.push("RWUAM_MOUNT_PET");
        _loc1_.push("RWUAM_TOGGLE_PET_RIDING_PERMISSION");
        _loc1_.push("RWUAM_TOGGLE_PET_BREEDING_PERMISSION");
        _loc1_.push("RWUAM_DISMOUNT_PET");
        _loc1_.push("RWUAM_SADDLE_OFF");
        _loc1_.push("RWUAM_TRAIN_PET");
        _loc1_.push("RWPCM_PET_COMMAND");
        _loc1_.push("RWPCM_REQUEST_PET_COMMANDS");
        _loc1_.push(" RWUAM_RESPECT_PET");
        _loc1_.push("RWUAM_REQUEST_PET_UPDATE");
        _loc1_.push("RWVM_CHANGE_MOTTO_MESSAGE");
        _loc1_.push("RWOPEM_OPEN_USER_PROFILE");
        _loc1_.push("RWPOM_OPEN_PRESENT");
        _loc1_.push("RWUAM_GIVE_LIGHT_TO_PET");
        _loc1_.push("RWUAM_GIVE_WATER_TO_PET");
        _loc1_.push("RWUAM_TREAT_PET");
        _loc1_.push("RWUAM_REPORT_CFH_OTHER");
        _loc1_.push("RWUAM_AMBASSADOR_ALERT_USER");
        _loc1_.push("RWUAM_AMBASSADOR_KICK_USER");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_2MIN");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_10MIN");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_15MIN");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_60MIN");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_18HOUR");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_36HOUR");
        _loc1_.push("RWUAM_AMBASSADOR_MUTE_72HOUR");
        _loc1_.push("RWUAM_AMBASSADOR_UNMUTE");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: IUserData = null;
        let _loc23_: number = 0;
        let _loc18_: number = 0;
        let _loc8_: string = null;
        let _loc6_: RoomWidgetChatInputContentUpdateEvent = null;
        let _loc3_: IUserData = null;
        _loc8_ = null;
        let _loc7_: string = null;
        let _loc25_: UtilsMap = null;
        let _loc4_: any[] = null;
        let _loc5_: any[] = null;
        let _loc13_: string = null;
        let _loc12_: string = null;
        let _loc28_: RoomWidgetRoomTagSearchMessage = null;
        let _loc21_: RoomWidgetGetBadgeDetailsMessage = null;
        let _loc16_: RoomWidgetGetBadgeImageMessage = null;
        let _loc24_: RoomWidgetPetCommandMessage = null;
        let _loc9_: RoomWidgetPetCommandMessage = null;
        let _loc26_: RoomWidgetChangeMottoMessage = null;
        let _loc17_: RoomWidgetOpenProfileMessage = null;
        let _loc10_: RoomWidgetPresentOpenMessage = null;
        let _loc11_: InfoStandFurniData = null;
        if (param1 == null) {
            return null;
        }
        if (this._container == null) {
            return null;
        }
        let _loc22_: number = 0;
        let _loc15_: RoomWidgetUserActionMessage = param1 instanceof RoomWidgetUserActionMessage ? param1 : null;
        if (_loc15_ != null) {
            _loc22_ = _loc15_.userId;
            if (param1.type == "RWUAM_REQUEST_PET_UPDATE" || param1.type == " RWUAM_RESPECT_PET" || param1.type == "RWUAM_PICKUP_PET" || param1.type == "RWUAM_WIRED_INSPECT_PET" || param1.type == "RWUAM_MOUNT_PET" || param1.type == "RWUAM_TOGGLE_PET_RIDING_PERMISSION" || param1.type == "RWUAM_TOGGLE_PET_BREEDING_PERMISSION" || param1.type == "RWUAM_DISMOUNT_PET" || param1.type == "RWUAM_SADDLE_OFF" || param1.type == "RWUAM_GIVE_CARRY_ITEM_TO_PET" || param1.type == "RWUAM_GIVE_WATER_TO_PET" || param1.type == "RWUAM_GIVE_LIGHT_TO_PET" || param1.type == "RWUAM_TREAT_PET") {
                _loc2_ = this._container.roomSession.userDataManager.getPetUserData(_loc22_);
            } else if (param1.type == "RWUAM_WIRED_INSPECT_BOT") {
                _loc2_ = this._container.roomSession.userDataManager.getRentableBotUserData(_loc22_);
            } else {
                _loc2_ = this._container.roomSession.userDataManager.getUserData(_loc22_);
            }
            if (_loc2_ == null) {
                return null;
            }
        }
        let _loc19_: number = 0;
        let _loc20_: number = 0;
        let _loc27_: RoomWidgetFurniActionMessage = param1 instanceof RoomWidgetFurniActionMessage ? param1 : null;
        if (_loc27_ != null) {
            _loc19_ = _loc27_.furniId;
            _loc20_ = _loc27_.furniCategory;
        }
        switch (param1.type) {
            case "RWROM_GET_OBJECT_INFO":
                return this.handleGetObjectInfoMessage(param1 instanceof RoomWidgetRoomObjectMessage ? param1 : null);
            case "RWROM_GET_OBJECT_NAME":
                return this.handleGetObjectNameMessage(param1 instanceof RoomWidgetRoomObjectMessage ? param1 : null);
            case "RWUAM_SEND_FRIEND_REQUEST":
                this._container.friendList.askForAFriend(_loc22_, _loc2_.name);
                break;
            case "RWUAM_RESPECT_USER":
                this._container.sessionDataManager.giveRespect(_loc22_);
                break;
            case "RWUAM_REPLENISH_RESPECT_USER":
                _loc23_ = this._container.catalog.getPurse().getActivityPointsForType(0);
                _loc18_ = this.container.config.getInteger("respect.replenish_cost_duckets", 50);
                if (_loc23_ < _loc18_) {
                    this.container.windowManager.alert("${respect.replenish.not_enough_duckets.title}", this._container.localization.getLocalizationWithParams("respect.replenish.not_enough_duckets.title", "", "amount", _loc18_), 0, null);
                    break;
                }
                this.container.windowManager.confirm("${respect.replenish.title}", this._container.localization.getLocalizationWithParams("respect.replenish.desc", "", "amount", _loc18_), 0, this.onRespectReplenishClicked);
                break;
            case "RWUAM_WIRED_INSPECT":
            case "RWUAM_WIRED_INSPECT_BOT":
            case "RWUAM_WIRED_INSPECT_PET":
                _loc8_ = "wiredmenu/open/inspection/1/" + _loc2_.roomObjectId;
                (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent(_loc8_);
                break;
            case "RWUAM_OPEN_PROFILE":
                this._container.connection.send(new GetExtendedProfileMessageComposer(_loc2_.webID));
                break;
            case " RWUAM_RESPECT_PET":
                this._container.sessionDataManager.givePetRespect(_loc22_);
                break;
            case "RWUAM_WHISPER_USER":
                _loc6_ = new RoomWidgetChatInputContentUpdateEvent("whisper", _loc2_.name);
                this._container.events.dispatchEvent(_loc6_);
                break;
            case "RWUAM_IGNORE_USER":
                this._container.sessionDataManager.ignoreUser(_loc2_.webID);
                break;
            case "RWUAM_UNIGNORE_USER":
                this._container.sessionDataManager.unignoreUser(_loc2_.webID);
                break;
            case "RWUAM_KICK_USER":
                this._container.roomSession.kickUser(_loc2_.webID);
                break;
            case "RWUAM_BAN_USER_DAY":
            case "RWUAM_BAN_USER_HOUR":
            case "RWUAM_BAN_USER_PERM":
                this._container.roomSession.banUserWithDuration(_loc2_.webID, param1.type);
                break;
            case "RWUAM_MUTE_USER_2MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 2);
                break;
            case "RWUAM_MUTE_USER_5MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 5);
                break;
            case "RWUAM_MUTE_USER_10MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 10);
                break;
            case "RWUAM_GIVE_RIGHTS":
                this._container.roomSession.assignRights(_loc2_.webID);
                break;
            case "RWUAM_TAKE_RIGHTS":
                this._container.roomSession.removeRights(_loc2_.webID);
                break;
            case "RWUAM_START_TRADING":
                _loc3_ = this._container.roomSession.userDataManager.getUserData(_loc15_.userId);
                this._container.inventory.setupTrading(_loc3_.roomObjectId, _loc3_.name);
                break;
            case "RWUAM_OPEN_HOME_PAGE":
                this._container.sessionDataManager.openHabboHomePage(_loc2_.webID, _loc2_.name);
                break;
            case "RWUAM_PICKUP_PET":
                this._container.roomSession.pickUpPet(_loc22_);
                break;
            case "RWUAM_MOUNT_PET":
                this._container.roomSession.mountPet(_loc22_);
                break;
            case "RWUAM_TOGGLE_PET_RIDING_PERMISSION":
                this._container.roomSession.togglePetRidingPermission(_loc22_);
                break;
            case "RWUAM_TOGGLE_PET_BREEDING_PERMISSION":
                this._container.roomSession.togglePetBreedingPermission(_loc22_);
                break;
            case "RWUAM_DISMOUNT_PET":
                this._container.roomSession.dismountPet(_loc22_);
                break;
            case "RWUAM_SADDLE_OFF":
                this._container.roomSession.removeSaddleFromPet(_loc22_);
                break;
            case "RWUAM_PASS_CARRY_ITEM":
                this._container.connection.send(new PassCarryItemMessageComposer(_loc22_));
                break;
            case "RWUAM_GIVE_CARRY_ITEM_TO_PET":
                this._container.connection.send(new PassCarryItemToPetMessageComposer(_loc22_));
                break;
            case "RWUAM_GIVE_WATER_TO_PET":
                this._container.connection.send(new GiveSupplementToPetMessageComposer(_loc22_, 0));
                break;
            case "RWUAM_GIVE_LIGHT_TO_PET":
                this._container.connection.send(new GiveSupplementToPetMessageComposer(_loc22_, 1));
                break;
            case "RWUAM_TREAT_PET":
                this._container.connection.send(new RespectPetMessageComposer(_loc22_));
                break;
            case "RWUAM_DROP_CARRY_ITEM":
                this._container.connection.send(new DropCarryItemMessageComposer());
                break;
            case "RWFUAM_ROTATE":
                this._container.roomEngine.modifyRoomObject(_loc19_, _loc20_, "OBJECT_ROTATE_POSITIVE");
                break;
            case "RWFAM_MOVE":
                this._container.roomEngine.modifyRoomObject(_loc19_, _loc20_, "OBJECT_MOVE");
                break;
            case "RWFAM_PICKUP":
                this.pickupObjectWithConfirmation(_loc19_, _loc20_);
                break;
            case "RWFAM_EJECT":
                this._container.roomEngine.modifyRoomObject(_loc19_, _loc20_, "OBJECT_EJECT");
                break;
            case "RWFAM_USE":
                this._container.roomEngine.useRoomObjectInActiveRoom(_loc19_, _loc20_);
                break;
            case "RWFAM_WIRED_INSPECT":
                _loc8_ = "wiredmenu/open/inspection/0/";
                if (_loc20_ == 10) {
                    _loc8_ += String(_loc19_);
                } else {
                    if (_loc20_ != 20) {
                        break;
                    }
                    _loc8_ += String(-_loc19_);
                }
                (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent(_loc8_);
                break;
            case "RWFAM_SAVE_STUFF_DATA":
                _loc7_ = _loc27_.objectData;
                if (_loc7_ != null) {
                    _loc25_ = new UtilsMap();
                    _loc4_ = _loc7_.split("\t");
                    if (_loc4_ != null) {
                        for (const _loc14_ of _loc4_ ?? []) {
                            _loc5_ = _loc14_.split("=", 2);
                            if (_loc5_ != null && _loc5_.length == 2) {
                                _loc13_ = stringOrNull(_loc5_[0]);
                                _loc12_ = stringOrNull(_loc5_[1]);
                                _loc25_.add(_loc13_, _loc12_);
                            }
                        }
                    }
                    this._container.roomEngine.modifyRoomObjectDataWithMap(_loc19_, _loc20_, "OBJECT_SAVE_STUFF_DATA", _loc25_);
                    if (!_loc25_.disposed) {
                        _loc25_.dispose();
                    }
                }
                break;
            case "RWUAM_REQUEST_PET_UPDATE":
                if (this._container.roomSession != null && this._container.roomSession.userDataManager != null) {
                    this._container.roomSession.userDataManager.requestPetInfo(_loc22_);
                }
                break;
            case "RWRTSM_ROOM_TAG_SEARCH":
                _loc28_ = param1 instanceof RoomWidgetRoomTagSearchMessage ? param1 : null;
                if (_loc28_ == null) {
                    return null;
                }
                this._container.navigator.performTagSearch(_loc28_.tag);
                break;
            case "RWGOI_MESSAGE_GET_BADGE_DETAILS":
                _loc21_ = param1 instanceof RoomWidgetGetBadgeDetailsMessage ? param1 : null;
                if (_loc21_ == null) {
                    return null;
                }
                this._container.habboGroupsManager.showGroupBadgeInfo(_loc21_.own, _loc21_.groupId);
                break;
            case "RWGOI_MESSAGE_GET_BADGE_IMAGE":
                _loc16_ = param1 instanceof RoomWidgetGetBadgeImageMessage ? param1 : null;
                if (_loc16_ == null) {
                    return null;
                }
                if (this._widget != null) {
                    this._widget.refreshBadge(_loc16_.badgeId);
                }
                break;
            case "RWUAM_REPORT":
                if (!(this._container == null || this._container.habboHelp == null)) {
                    if (_loc2_ != null) {
                        this._container.habboHelp.reportUser(_loc22_, -1, null);
                    }
                }
                break;
            case "RWUAM_REPORT_CFH_OTHER":
                this._container.habboHelp.reportUser(_loc22_, 124, null);
                break;
            case "RWPCM_REQUEST_PET_COMMANDS":
                _loc24_ = param1 instanceof RoomWidgetPetCommandMessage ? param1 : null;
                this._container.roomSession.requestPetCommands(_loc24_.petId);
                break;
            case "RWPCM_PET_COMMAND":
                _loc9_ = param1 instanceof RoomWidgetPetCommandMessage ? param1 : null;
                this._container.roomSession.sendChatMessage(_loc9_.value);
                break;
            case "RWVM_CHANGE_MOTTO_MESSAGE":
                _loc26_ = param1 instanceof RoomWidgetChangeMottoMessage ? param1 : null;
                this._container.roomSession.sendChangeMottoMessage(_loc26_.motto);
                break;
            case "RWOPEM_OPEN_USER_PROFILE":
                _loc17_ = param1 instanceof RoomWidgetOpenProfileMessage ? param1 : null;
                if (this._container.habboTracking) {
                    this._container.habboTracking.trackGoogle("extendedProfile", _loc17_.trackingLocation);
                }
                this._container.connection.send(new GetExtendedProfileMessageComposer(_loc17_.userId));
                break;
            case "RWPOM_OPEN_PRESENT":
                _loc10_ = param1 instanceof RoomWidgetPresentOpenMessage ? param1 : null;
                if (_loc10_ != null && this._widget != null) {
                    _loc11_ = this._widget.furniData;
                    if (_loc11_ != null && _loc11_.id == _loc10_.objectId) {
                        if (this._widget.isFurniViewVisible()) {
                            this._widget.close();
                        }
                    }
                }
                break;
            case "RWUAM_AMBASSADOR_ALERT_USER":
                this._container.roomSession.ambassadorAlert(_loc2_.webID);
                break;
            case "RWUAM_AMBASSADOR_KICK_USER":
                this._container.roomSession.kickUser(_loc2_.webID);
                break;
            case "RWUAM_AMBASSADOR_MUTE_2MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 2);
                break;
            case "RWUAM_AMBASSADOR_MUTE_10MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 10);
                break;
            case "RWUAM_AMBASSADOR_MUTE_15MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 15);
                break;
            case "RWUAM_AMBASSADOR_MUTE_60MIN":
                this._container.roomSession.muteUser(_loc2_.webID, 60);
                break;
            case "RWUAM_AMBASSADOR_MUTE_18HOUR":
                this._container.roomSession.muteUser(_loc2_.webID, 1080);
                break;
            case "RWUAM_AMBASSADOR_MUTE_36HOUR":
                this._container.roomSession.muteUser(_loc2_.webID, 2160);
                break;
            case "RWUAM_AMBASSADOR_MUTE_72HOUR":
                this._container.roomSession.muteUser(_loc2_.webID, 4320);
                break;
            case "RWUAM_AMBASSADOR_UNMUTE":
                this._container.roomSession.unmuteUser(_loc2_.webID);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSUBE_BADGES"];
    }

    public update(): void {
    }

    public setObjectData(param1: UtilsMap): void {
        if (this._container.sessionDataManager.hasSecurity(5)) {
            this._container.connection.send(new SetObjectDataMessageComposer(this._widget.furniData.id, param1));
        }
    }

    private onGroupDetails = (param1: HabboGroupDetailsMessageEvent): void => {
        let _loc2_: HabboGroupDetailsData = param1.data;
        if (this._widget.furniData.groupId == _loc2_.groupId) {
            this._widget.furniView.groupBadgeId = _loc2_.badgeCode;
            this._widget.furniView.groupName = _loc2_.groupName;
        }
    };

    private onRespectReplenishClicked = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._container.sessionDataManager.replenishRespect();
        }
    };

    private pickupObjectWithConfirmation(param1: number, param2: number): void {
        let furniId: number = param1;
        let furniCategory: number = param2;
        if (this._container != null) {
            if (FurniId.isBuilderClubId(furniId) && this._container.catalog.buildersClubEnabled) {
                if (this._widget.furniData.availableForBuildersClub) {
                    this._container.roomEngine.modifyRoomObject(furniId, furniCategory, "OBJECT_PICKUP");
                } else {
                    this._container.windowManager.confirm("${generic.alert.title}", "${room.confirm.not_in_warehouse}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                            param1.dispose();
                            if (param2.type == "WE_OK") {
                                this._container.roomEngine.modifyRoomObject(furniId, furniCategory, "OBJECT_PICKUP");
                            }
                        });
                }
            } else {
                this._container.roomEngine.modifyRoomObject(furniId, furniCategory, "OBJECT_PICKUP");
            }
        }
    }

    private handleGetObjectNameMessage(param1: RoomWidgetRoomObjectMessage): RoomWidgetUpdateEvent {
        let _loc8_: number = 0;
        let _loc6_: number = 0;
        let _loc9_: number = 0;
        let _loc3_: IRoomObject = null;
        let _loc4_: string = null;
        let _loc12_: number = 0;
        let _loc10_: number = 0;
        let _loc7_: IFurnitureData = null;
        let _loc2_: IUserData = null;
        let _loc11_: number = this._container.roomSession.roomId;
        let _loc5_: string = null;
        switch (param1.category) {
            case 10:
            case 20:
                if (this._container.events == null || this._container.roomEngine == null) {
                    return null;
                }
                _loc3_ = this._container.roomEngine.getRoomObject(_loc11_, param1.id, param1.category);
                _loc4_ = _loc3_.getType();
                if (_loc4_.indexOf("poster") == 0) {
                    _loc12_ = Number(_loc4_.replace("poster", "")) | 0;
                    _loc5_ = "${poster_" + _loc12_ + "_name}";
                    _loc6_ = _loc3_.getId();
                    _loc9_ = -1;
                    break;
                }
                _loc10_ = _loc3_.getModel().getNumber("furniture_type_id") | 0;
                if (param1.category == 10) {
                    _loc7_ = this._container.sessionDataManager.getFloorItemData(_loc10_);
                } else if (param1.category == 20) {
                    _loc7_ = this._container.sessionDataManager.getWallItemData(_loc10_);
                }
                if (_loc7_ == null) {
                    return null;
                }
                _loc5_ = _loc7_.localizedName;
                _loc6_ = _loc3_.getId();
                _loc9_ = _loc7_.id;
                break;
            case 100:
                if (this._container.roomSession == null || this._container.sessionDataManager == null || this._container.events == null || this._container.roomEngine == null || this._container.friendList == null) {
                    return null;
                }
                _loc2_ = this._container.roomSession.userDataManager.getUserDataByIndex(param1.id);
                if (_loc2_ == null) {
                    return null;
                }
                _loc5_ = _loc2_.name;
                _loc8_ = _loc2_.type;
                _loc6_ = _loc2_.roomObjectId;
                _loc9_ = _loc2_.webID;
        }
        if (_loc5_ != null) {
            this._container.events.dispatchEvent(new RoomWidgetRoomObjectNameEvent(_loc9_, param1.category, _loc5_, _loc8_, _loc6_));
        }
        return null;
    }

    private handleGetObjectInfoMessage(param1: RoomWidgetRoomObjectMessage): RoomWidgetUpdateEvent {
        let _loc2_: IUserData = null;
        let _loc3_: number = this._container.roomSession.roomId;
        switch (param1.category) {
            case 10:
            case 20:
                this.handleGetFurniInfoMessage(param1, _loc3_);
                break;
            case 100:
                if (this._container.roomSession == null || this._container.sessionDataManager == null || this._container.events == null || this._container.roomEngine == null || this._container.friendList == null) {
                    return null;
                }
                _loc2_ = this._container.roomSession.userDataManager.getUserDataByIndex(param1.id);
                if (_loc2_ == null) {
                    return null;
                }
                switch (_loc2_.type - 1) {
                    case 0:
                        this.handleGetUserInfoMessage(_loc3_, param1.id, param1.category, _loc2_);
                        break;
                    case 1:
                        this.handleGetPetInfoMessage(_loc2_.webID);
                        break;
                    case 2:
                        this.handleGetBotInfoMessage(_loc3_, param1.id, param1.category, _loc2_);
                        break;
                    case 3:
                        this.handleGetRentableBotInfoMessage(_loc3_, param1.id, param1.category, _loc2_);
                }
                if (this._container.userDefinedRoomEvents != null) {
                    this._container.userDefinedRoomEvents.userSelected(param1.id);
                }
        }
        return null;
    }

    private handleGetPetInfoMessage(param1: number): void {
        let _loc2_: boolean = this.container.config.getBoolean("petSelect.enabled");
        if (_loc2_) {
            this._container.connection.send(new PetSelectedMessageComposer(param1));
        }
        this._container.roomSession.userDataManager.requestPetInfo(param1);
    }

    private handleGetBotInfoMessage(param1: number, param2: number, param3: number, param4: IUserData): void {
        let _loc7_: string = "RWUIUE_BOT";
        let _loc6_: RoomWidgetUserInfoUpdateEvent = new RoomWidgetUserInfoUpdateEvent(_loc7_);
        _loc6_.name = param4.name;
        _loc6_.motto = param4.custom;
        _loc6_.webID = param4.webID;
        _loc6_.userRoomId = param2;
        _loc6_.userType = param4.type;
        let _loc8_: IRoomObject = this._container.roomEngine.getRoomObject(param1, param2, param3);
        if (_loc8_ != null) {
            _loc6_.carryItem = _loc8_.getModel().getNumber("figure_carry_object") | 0;
        }
        _loc6_.amIOwner = this._container.roomSession.isRoomOwner;
        _loc6_.isGuildRoom = this._container.roomSession.isGuildRoom;
        _loc6_.myRoomControllerLevel = this._container.roomSession.roomControllerLevel;
        _loc6_.amIAnyRoomController = this._container.sessionDataManager.isAnyRoomController;
        _loc6_.canBeKicked = this._container.roomSession.isRoomOwner;
        let _loc5_: any[] = [];
        _loc5_.push("BOT");
        _loc6_.badges = _loc5_;
        _loc6_.figure = param4.figure;
        this._container.events.dispatchEvent(_loc6_);
    }

    private handleGetRentableBotInfoMessage(param1: number, param2: number, param3: number, param4: IUserData): void {
        let _loc6_: RoomWidgetRentableBotInfoUpdateEvent = new RoomWidgetRentableBotInfoUpdateEvent();
        _loc6_.name = param4.name;
        _loc6_.motto = param4.custom;
        _loc6_.webID = param4.webID;
        _loc6_.userRoomId = param2;
        _loc6_.ownerId = param4.ownerId;
        _loc6_.ownerName = param4.ownerName;
        _loc6_.botSkills = param4.botSkills;
        let _loc7_: IRoomObject = this._container.roomEngine.getRoomObject(param1, param2, param3);
        if (_loc7_ != null) {
            _loc6_.carryItem = _loc7_.getModel().getNumber("figure_carry_object") | 0;
        }
        _loc6_.amIOwner = this._container.roomSession.isRoomOwner;
        _loc6_.myRoomControllerLevel = this._container.roomSession.roomControllerLevel;
        _loc6_.amIAnyRoomController = this._container.sessionDataManager.isAnyRoomController;
        let _loc5_: any[] = [];
        _loc5_.push("BOT");
        _loc6_.badges = _loc5_;
        _loc6_.figure = param4.figure;
        this._container.events.dispatchEvent(_loc6_);
    }

    private handleGetUserInfoMessage(param1: number, param2: number, param3: number, param4: IUserData): void {
        let _loc7_: string = null;
        let _loc5_: RoomWidgetUserInfoUpdateEvent = null;
        let _loc6_: IFriend = null;
        let _loc10_: number = NaN;
        let _loc11_: any = false;
        let _loc12_: number = 0;
        let _loc8_: boolean = false;
        let _loc9_: boolean = false;
        _loc7_ = "RWUIUE_OWN_USER";
        if (param4.webID != this._container.sessionDataManager.userId) {
            _loc7_ = "RWUIUE_PEER";
        }
        _loc5_ = new RoomWidgetUserInfoUpdateEvent(_loc7_);
        _loc5_.isSpectatorMode = this._container.roomSession.isSpectatorMode;
        _loc5_.name = param4.name;
        _loc5_.motto = param4.custom;
        if (this.isActivityDisplayEnabled) {
            _loc5_.achievementScore = param4.achievementScore;
        }
        _loc5_.webID = param4.webID;
        _loc5_.userRoomId = param2;
        _loc5_.userType = 1;
        let _loc13_: IRoomObject = this._container.roomEngine.getRoomObject(param1, param2, param3);
        if (_loc13_ != null) {
            _loc5_.carryItem = _loc13_.getModel().getNumber("figure_carry_object") | 0;
        }
        if (_loc7_ == "RWUIUE_OWN_USER") {
            _loc5_.realName = this._container.sessionDataManager.realName;
            _loc5_.allowNameChange = this._container.sessionDataManager.nameChangeAllowed;
        }
        _loc5_.amIOwner = this._container.roomSession.isRoomOwner;
        _loc5_.isGuildRoom = this._container.roomSession.isGuildRoom;
        _loc5_.myRoomControllerLevel = this._container.roomSession.roomControllerLevel;
        _loc5_.amIAnyRoomController = this._container.sessionDataManager.isAnyRoomController;
        _loc5_.amIAnAmbassador = this._container.sessionDataManager.isAmbassador;
        if (_loc7_ == "RWUIUE_PEER") {
            _loc5_.isBlocked = this._container.sessionDataManager.isBlocked(param4.webID);
            _loc5_.canBeAskedAsFriend = this._container.friendList.canBeAskedForAFriend(param4.webID);
            _loc6_ = this._container.friendList.getFriend(param4.webID);
            if (_loc6_ != null) {
                _loc5_.realName = _loc6_.realName;
                _loc5_.isFriend = true;
            }
            if (_loc13_ != null) {
                _loc10_ = _loc13_.getModel().getNumber("figure_flat_control");
                if (!isNaN(_loc10_)) {
                    _loc5_.targetRoomControllerLevel = _loc10_ | 0;
                }
                _loc5_.canBeMuted = this.determineCanBeMuted(_loc5_);
                _loc5_.canBeKicked = this.determineCanBeKicked(_loc5_);
                _loc5_.canBeBanned = this.determineCanBeBanned(_loc5_);
                InfoStandWidgetHandler._log.info("Set moderation levels to " + _loc5_.name + "Muted: " + _loc5_.canBeMuted + ", Kicked: " + _loc5_.canBeKicked + ", Banned: " + _loc5_.canBeBanned);
            }
            _loc5_.isIgnored = this._container.sessionDataManager.isIgnored(param4.webID);
            _loc5_.respectLeft = this._container.sessionDataManager.respectLeft;
            _loc5_.respectReplenishesLeft = this._container.sessionDataManager.respectReplenishesLeft;
            _loc11_ = !this._container.sessionDataManager.systemShutDown;
            _loc12_ = this._container.roomSession.tradeMode;
            if (!_loc11_) {
                _loc5_.canTrade = false;
            } else {
                switch (_loc12_ - 1) {
                    case 0:
                        _loc8_ = _loc5_.myRoomControllerLevel != 0 && _loc5_.myRoomControllerLevel != 2;
                        _loc9_ = _loc5_.targetRoomControllerLevel != 0 && _loc5_.targetRoomControllerLevel != 2;
                        _loc5_.canTrade = _loc8_ || _loc9_;
                        break;
                    case 1:
                        _loc5_.canTrade = true;
                        break;
                    default:
                        _loc5_.canTrade = false;
                }
            }
            _loc5_.canTradeReason = 0;
            if (!_loc11_) {
                _loc5_.canTradeReason = 2;
            }
            if (_loc12_ != 2) {
                _loc5_.canTradeReason = 3;
            }
        }
        _loc5_.groupId = Number(param4.groupID) | 0;
        _loc5_.groupBadgeId = this._container.sessionDataManager.getGroupBadgeId(Number(param4.groupID) | 0);
        _loc5_.groupName = param4.groupName;
        _loc5_.badges = this._container.roomSession.userDataManager.getUserBadges(param4.webID);
        _loc5_.figure = param4.figure;
        this._container.events.dispatchEvent(_loc5_);
        this._container.habboGroupsManager.updateVisibleExtendedProfile(param4.webID);
        this._container.connection.send(new GetRelationshipStatusInfoMessageComposer(param4.webID));
    }

    private checkUserWithRightsModerationLevel(param1: RoomWidgetUserInfoUpdateEvent, param2: number): boolean {
        let _loc3_: boolean = param1.myRoomControllerLevel == 1 || param1.myRoomControllerLevel >= 4;
        let _loc4_: boolean = param1.isGuildRoom && param1.myRoomControllerLevel >= 3;
        switch (param2 - 1) {
            case 0:
                return _loc3_;
            case 3:
                return _loc4_;
            case 4:
                return _loc3_ || _loc4_;
            default:
                return param1.myRoomControllerLevel >= 4;
        }
    }

    private determineModerationLevel(param1: RoomWidgetUserInfoUpdateEvent, param2: (...args: any[]) => any): boolean {
        if (!this._container.roomSession.isPrivateRoom) {
            return false;
        }
        let _loc4_: boolean = false;
        let _loc3_: RoomModerationSettings = this._container.roomSession.roomModerationSettings;
        if (_loc3_ != null) {
            _loc4_ = param2(param1, _loc3_);
        }
        return _loc4_ && param1.targetRoomControllerLevel < 4;
    }

    private handleGetFurniInfoMessage(param1: RoomWidgetRoomObjectMessage, param2: number): void {
        let _loc8_: number = 0;
        let _loc15_: number = 0;
        let _loc12_: IFurnitureData = null;
        let _loc17_: number = 0;
        let _loc4_: string = null;
        let _loc22_: string = null;
        let _loc7_: string = null;
        let _loc5_: IPlayListController = null;
        let _loc19_: string = null;
        let _loc18_: ISongInfo = null;
        if (this._container.events == null || this._container.roomEngine == null) {
            return;
        }
        if (param1.id < 0) {
            return;
        }
        let _loc20_: RoomWidgetFurniInfoUpdateEvent = new RoomWidgetFurniInfoUpdateEvent("RWFIUE_FURNI");
        _loc20_.id = param1.id;
        _loc20_.category = param1.category;
        let _loc9_: IRoomObject = this._container.roomEngine.getRoomObject(param2, param1.id, param1.category);
        if (!_loc9_) {
            return;
        }
        let _loc14_: IRoomObjectModel = _loc9_.getModel();
        if (_loc14_.getString("RWEIEP_INFOSTAND_EXTRA_PARAM") != null) {
            _loc20_.extraParam = _loc14_.getString("RWEIEP_INFOSTAND_EXTRA_PARAM");
        }
        let _loc16_: number = _loc14_.getNumber("furniture_data_format") | 0;
        let _loc10_: IStuffData = StuffDataFactory.getStuffDataWrapperForType(_loc16_);
        _loc10_.initializeFromRoomObjectModel(_loc14_);
        _loc20_.stuffData = _loc10_;
        let _loc11_: string = _loc9_.getType();
        if (_loc11_.indexOf("poster") == 0) {
            _loc8_ = Number(_loc11_.replace("poster", "")) | 0;
            _loc20_.name = "${poster_" + _loc8_ + "_name}";
            _loc20_.description = "${poster_" + _loc8_ + "_desc}";
        } else {
            _loc15_ = _loc14_.getNumber("furniture_type_id") | 0;
            if (param1.category == 10) {
                _loc12_ = this._container.sessionDataManager.getFloorItemData(_loc15_);
            } else if (param1.category == 20) {
                _loc12_ = this._container.sessionDataManager.getWallItemData(_loc15_);
            }
            if (_loc12_ != null) {
                _loc20_.name = _loc12_.localizedName;
                _loc20_.isNft = _loc12_.className.indexOf("nft_") == 0;
                _loc20_.description = _loc12_.description;
                _loc20_.purchaseOfferId = _loc12_.purchaseOfferId;
                _loc20_.bcOfferId = _loc12_.bcOfferId;
                _loc20_.tradeable = _loc12_.tradeable;
                _loc20_.purchaseCouldBeUsedForBuyout = _loc12_.purchaseCouldBeUsedForBuyout;
                _loc20_.rentOfferId = _loc12_.rentOfferId;
                _loc20_.rentCouldBeUsedForBuyout = _loc12_.rentCouldBeUsedForBuyout;
                _loc20_.availableForBuildersClub = _loc12_.availableForBuildersClub;
                _loc20_.classId = _loc15_;
            }
        }
        if (this._container.userDefinedRoomEvents != null) {
            if (param1.category == 10) {
                this._container.userDefinedRoomEvents.stuffSelected(_loc9_.getId());
            } else if (param1.category == 20) {
                this._container.userDefinedRoomEvents.stuffSelected(-_loc9_.getId());
            }
        }
        if (_loc11_.indexOf("post_it") > -1) {
            _loc20_.isStickie = true;
        }
        let _loc3_: number = _loc14_.getNumber("furniture_expiry_time") | 0;
        let _loc21_: number = _loc14_.getNumber("furniture_expirty_timestamp") | 0;
        _loc20_.expiration = (_loc3_ < 0 ? _loc3_ : Math.max(0, _loc3_ - (getTimer() - _loc21_) / 1000)) | 0;
        let _loc13_: ImageResult = this._container.roomEngine.getRoomObjectImage(param2, param1.id, param1.category, new Vector3d(180), 64, null);
        if (_loc13_.data == null || _loc13_.data.width > 140 || _loc13_.data.height > 200) {
            _loc13_ = this._container.roomEngine.getRoomObjectImage(param2, param1.id, param1.category, new Vector3d(180), 1, null);
        }
        _loc20_.image = _loc13_.data;
        _loc20_.isWallItem = param1.category == 20;
        _loc20_.isRoomOwner = this._container.roomSession.isRoomOwner;
        _loc20_.roomControllerLevel = this._container.roomSession.roomControllerLevel;
        _loc20_.isAnyRoomController = this._container.sessionDataManager.isAnyRoomController;
        _loc20_.ownerId = _loc14_.getNumber("furniture_owner_id") | 0;
        _loc20_.ownerName = _loc14_.getString("furniture_owner_name");
        _loc20_.usagePolicy = _loc14_.getNumber("furniture_usage_policy") | 0;
        let _loc6_: number = _loc14_.getNumber("furniture_guild_customized_guild_id") | 0;
        if (_loc6_ != 0) {
            _loc20_.groupId = _loc6_;
            this.container.connection.send(new GetHabboGroupDetailsMessageComposer(_loc6_, false));
        }
        if (this._container.isOwnerOfFurniture(_loc9_)) {
            _loc20_.isOwner = true;
        }
        this._container.events.dispatchEvent(_loc20_);
        if (_loc20_.extraParam != null && _loc20_.extraParam.length > 0) {
            _loc17_ = -1;
            _loc4_ = "";
            _loc22_ = "";
            _loc7_ = "";
            if (_loc20_.extraParam == "RWEIEP_JUKEBOX") {
                _loc5_ = this._musicController.getRoomItemPlaylist();
                if (_loc5_ != null) {
                    _loc17_ = _loc5_.nowPlayingSongId;
                    _loc7_ = "RWSUE_PLAYING_CHANGED";
                }
            } else if (_loc20_.extraParam.indexOf("RWEIEP_SONGDISK") == 0) {
                _loc19_ = _loc20_.extraParam.substr("RWEIEP_SONGDISK".length);
                _loc17_ = parseInt(_loc19_) | 0;
                _loc7_ = "RWSUE_DATA_RECEIVED";
            }
            if (_loc17_ != -1) {
                _loc18_ = this._musicController.getSongInfo(_loc17_);
                if (_loc18_ != null) {
                    _loc4_ = _loc18_.name;
                    _loc22_ = _loc18_.creator;
                }
                this._container.events.dispatchEvent(new RoomWidgetSongUpdateEvent(_loc7_, _loc17_, _loc4_, _loc22_));
            }
        }
    }

    private getPetImage(param1: string, param2: string = null): BitmapData {
        let _loc4_: BitmapData = null;
        let _loc3_: PetFigureData = new PetFigureData(param1);
        let _loc5_: number = 0;
        let _loc6_: ImageResult = this._container.roomEngine.getPetImage(_loc3_.typeId, _loc3_.paletteId, _loc3_.color, new Vector3d(90), 64, null, true, _loc5_, _loc3_.customParts, param2);
        if (_loc6_ != null) {
            _loc4_ = _loc6_.data;
        }
        if (_loc4_ == null) {
            _loc4_ = new BitmapData(30, 30, false, 4289374890);
        }
        return _loc4_;
    }

    private getPetType(param1: string): number {
        return this.getSpaceSeparatedInteger(param1, 0);
    }

    private getPetRace(param1: string): number {
        return this.getSpaceSeparatedInteger(param1, 1);
    }

    private getPetColor(param1: string): number {
        let _loc2_: any[] = param1.split(" ");
        if (_loc2_.length > 2) {
            return parseInt(stringOrNull(_loc2_[2]), 16) | 0;
        }
        return 16777215;
    }

    private getSpaceSeparatedInteger(param1: string, param2: number): number {
        let _loc3_: any[] = null;
        if (param1 != null) {
            _loc3_ = param1.split(" ");
            if (_loc3_.length > param2) {
                return _loc3_[param2] | 0;
            }
        }
        return -1;
    }

    private onRelationshipStatusEvent = (param1: RelationshipStatusInfoEvent): void => {
        if (this._widget && this._widget.mainWindow.visible) {
            this._widget.setRelationshipStatus(param1.userId, param1.relationshipStatusMap);
        }
    };

    public processEvent(param1: Event): void {
        let _loc2_: RoomSessionUserBadgesEvent = null;
        let _loc3_: any = param1.type;
        if ("RSUBE_BADGES" === _loc3_) {
            _loc2_ = param1 instanceof RoomSessionUserBadgesEvent ? param1 : null;
            if (_loc2_ != null && this._widget != null) {
                this._widget.refreshBadges(_loc2_.userId, _loc2_.badges);
            }
        }
    }

    private determineCanBeMuted(param1: RoomWidgetUserInfoUpdateEvent): boolean {
        let userInfo: RoomWidgetUserInfoUpdateEvent = param1;
        let settingsFunction: (...args: any[]) => any = (param1: RoomWidgetUserInfoUpdateEvent, param2: RoomModerationSettings): boolean => {
                return this.checkUserWithRightsModerationLevel(param1, param2.whoCanMute);
            };
        return this.determineModerationLevel(userInfo, settingsFunction);
    }

    private determineCanBeKicked(param1: RoomWidgetUserInfoUpdateEvent): boolean {
        let userInfo: RoomWidgetUserInfoUpdateEvent = param1;
        let settingsFunction: (...args: any[]) => any = (param1: RoomWidgetUserInfoUpdateEvent, param2: RoomModerationSettings): boolean => {
                if (param2.whoCanKick == 2) {
                    return true;
                }
                return this.checkUserWithRightsModerationLevel(param1, param2.whoCanKick);
            };
        return this.determineModerationLevel(userInfo, settingsFunction);
    }

    private determineCanBeBanned(param1: RoomWidgetUserInfoUpdateEvent): boolean {
        let userInfo: RoomWidgetUserInfoUpdateEvent = param1;
        let settingsFunction: (...args: any[]) => any = (param1: RoomWidgetUserInfoUpdateEvent, param2: RoomModerationSettings): boolean => {
                return this.checkUserWithRightsModerationLevel(param1, param2.whoCanBan);
            };
        return this.determineModerationLevel(userInfo, settingsFunction);
    }

    private onFigureUpdate = (param1: RoomSessionUserFigureUpdateEvent): void => {
        if (this._container == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (param1.userId < 0) {
            return;
        }
        let _loc2_: IUserData = this._container.roomSession.userDataManager.getUserDataByIndex(param1.userId);
        if (_loc2_ == null) {
            return;
        }
        let _loc5_: number = _loc2_.webID;
        let _loc3_: BitmapData = null;
        let _loc4_: any = _loc5_ == this._container.sessionDataManager.userId;
        this._widget.updateUserData(_loc5_, param1.figure, param1.achievementScore, param1.customInfo, _loc4_);
    };

    private onPetInfo = (param1: RoomSessionPetInfoUpdateEvent): void => {
        let _loc4_: any = false;
        let _loc6_: RoomWidgetPetInfoUpdateEvent = null;
        let _loc12_: IRoomSession = null;
        let _loc5_: IPetInfo = param1.petInfo;
        if (_loc5_ == null) {
            return;
        }
        let _loc10_: IUserData = this._container.roomSession.userDataManager.getPetUserData(_loc5_.petId);
        if (_loc10_ == null) {
            return;
        }
        let _loc2_: string = _loc10_.figure;
        let _loc8_: number = this.getPetType(_loc2_);
        let _loc9_: number = this.getPetRace(_loc2_);
        let _loc7_: string = null;
        if (_loc8_ == 16) {
            if (_loc5_.level >= _loc5_.adultLevel) {
                _loc7_ = "std";
            } else {
                _loc7_ = "grw" + _loc5_.level;
            }
        }
        let _loc3_: string = _loc2_ + (_loc7_ != null ? "/posture=" + _loc7_ : "");
        let _loc11_: BitmapData = asInstanceOf(this._cachedPetImages.getValue(_loc3_), BitmapData);
        if (_loc11_ == null) {
            _loc11_ = this.getPetImage(_loc2_, _loc7_);
            this._cachedPetImages.add(_loc3_, _loc11_);
        }
        if (this._container != null && this._container.events != null) {
            _loc4_ = _loc5_.ownerId == this._container.sessionDataManager.userId;
            _loc6_ = new RoomWidgetPetInfoUpdateEvent(_loc8_, _loc9_, _loc10_.name, _loc5_.petId, _loc11_, _loc4_, _loc5_.ownerId, _loc5_.ownerName, _loc10_.roomObjectId, _loc5_.breedId);
            _loc6_.level = _loc5_.level;
            _loc6_.levelMax = _loc5_.levelMax;
            _loc6_.experience = _loc5_.experience;
            _loc6_.experienceMax = _loc5_.experienceMax;
            _loc6_.energy = _loc5_.energy;
            _loc6_.energyMax = _loc5_.energyMax;
            _loc6_.nutrition = _loc5_.nutrition;
            _loc6_.nutritionMax = _loc5_.nutritionMax;
            _loc6_.petRespect = _loc5_.respect;
            _loc6_.petRespectLeft = this._container.sessionDataManager.petRespectLeft;
            _loc6_.age = _loc5_.age;
            _loc6_.hasFreeSaddle = _loc5_.hasFreeSaddle;
            _loc6_.isRiding = _loc5_.isRiding;
            _loc6_.canBreed = _loc5_.canBreed;
            _loc6_.canHarvest = _loc5_.canHarvest;
            _loc6_.canRevive = _loc5_.canRevive;
            _loc6_.rarityLevel = _loc5_.rarityLevel;
            _loc6_.skillTresholds = _loc5_.skillTresholds;
            _loc6_.canRemovePet = false;
            _loc6_.accessRights = _loc5_.accessRights;
            _loc6_.maxWellBeingSeconds = _loc5_.maxWellBeingSeconds;
            _loc6_.remainingWellBeingSeconds = _loc5_.remainingWellBeingSeconds;
            _loc6_.remainingGrowingSeconds = _loc5_.remainingGrowingSeconds;
            _loc6_.hasBreedingPermission = _loc5_.hasBreedingPermission;
            _loc12_ = this._container.roomSession;
            if (_loc4_) {
                _loc6_.canRemovePet = true;
            } else if (_loc12_.isRoomOwner || this._container.sessionDataManager.isAnyRoomController || _loc12_.roomControllerLevel >= 1) {
                _loc6_.canRemovePet = true;
            }
            this._container.events.dispatchEvent(_loc6_);
        }
    };

    private onPetFigureUpdate = (param1: RoomSessionPetFigureUpdateEvent): void => {
        let _loc3_: RoomWidgetPetFigureUpdateEvent = null;
        let _loc2_: string = param1.figure;
        let _loc4_: BitmapData = asInstanceOf(this._cachedPetImages.getValue(_loc2_), BitmapData);
        if (_loc4_ == null) {
            _loc4_ = this.getPetImage(_loc2_);
            this._cachedPetImages.add(_loc2_, _loc4_);
        }
        if (this._container != null && this._container.events != null) {
            _loc3_ = new RoomWidgetPetFigureUpdateEvent(param1.petId, _loc4_);
            this._container.events.dispatchEvent(_loc3_);
        }
    };

    private onPetBreedingResult = (param1: RoomSessionPetBreedingResultEvent): void => {
        let _loc3_: PetBreedingResultEventData = null;
        let _loc4_: PetBreedingResultEventData = null;
        let _loc2_: RoomWidgetPetBreedingResultEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc3_ = new PetBreedingResultEventData();
            _loc3_.stuffId = param1.resultData.stuffId;
            _loc3_.classId = param1.resultData.classId;
            _loc3_.productCode = param1.resultData.productCode;
            _loc3_.userId = param1.resultData.userId;
            _loc3_.userName = param1.resultData.userName;
            _loc3_.rarityLevel = param1.resultData.rarityLevel;
            _loc3_.hasMutation = param1.resultData.hasMutation;
            _loc4_ = new PetBreedingResultEventData();
            _loc4_.stuffId = param1.otherResultData.stuffId;
            _loc4_.classId = param1.otherResultData.classId;
            _loc4_.productCode = param1.otherResultData.productCode;
            _loc4_.userId = param1.otherResultData.userId;
            _loc4_.userName = param1.otherResultData.userName;
            _loc4_.rarityLevel = param1.otherResultData.rarityLevel;
            _loc4_.hasMutation = param1.otherResultData.hasMutation;
            _loc2_ = new RoomWidgetPetBreedingResultEvent(_loc3_, _loc4_);
            this._container.events.dispatchEvent(_loc2_);
        }
    };

    private onPetBreedingEvent = (param1: RoomSessionPetBreedingEvent): void => {
        let _loc2_: RoomWidgetPetBreedingEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc2_ = new RoomWidgetPetBreedingEvent();
            _loc2_.state = param1.state;
            _loc2_.ownPetId = param1.ownPetId;
            _loc2_.otherPetId = param1.otherPetId;
            this._container.events.dispatchEvent(_loc2_);
        }
    };

    private onConfirmPetBreedingEvent = (param1: RoomSessionConfirmPetBreedingEvent): void => {
        let _loc4_: ConfirmPetBreedingPetData = null;
        let _loc3_: ConfirmPetBreedingPetData = null;
        let _loc6_: any[] = null;
        let _loc5_: BreedingRarityCategoryData = null;
        let _loc7_: RoomWidgetConfirmPetBreedingEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc4_ = new ConfirmPetBreedingPetData();
            _loc4_.webId = param1.pet1.webId;
            _loc4_.name = param1.pet1.name;
            _loc4_.level = param1.pet1.level;
            _loc4_.figure = param1.pet1.figure;
            _loc4_.owner = param1.pet1.owner;
            _loc3_ = new ConfirmPetBreedingPetData();
            _loc3_.webId = param1.pet2.webId;
            _loc3_.name = param1.pet2.name;
            _loc3_.level = param1.pet2.level;
            _loc3_.figure = param1.pet2.figure;
            _loc3_.owner = param1.pet2.owner;
            _loc6_ = [];
            for (const _loc2_ of param1.rarityCategories ?? []) {
                _loc5_ = new BreedingRarityCategoryData();
                _loc5_.chance = _loc2_.chance | 0;
                _loc5_.breeds = _loc2_.breeds.concat();
                _loc6_.push(_loc5_);
            }
            _loc7_ = new RoomWidgetConfirmPetBreedingEvent(param1.nestId, _loc4_, _loc3_, _loc6_, param1.resultPetTypeId);
            this._container.events.dispatchEvent(_loc7_);
        }
    };

    private onConfirmPetBreedingResultEvent = (param1: RoomSessionConfirmPetBreedingResultEvent): void => {
        let _loc2_: RoomWidgetConfirmPetBreedingResultEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc2_ = new RoomWidgetConfirmPetBreedingResultEvent(param1.breedingNestStuffId, param1.result);
            this._container.events.dispatchEvent(_loc2_);
        }
    };

    private onPetCommands = (param1: RoomSessionPetCommandsUpdateEvent): void => {
        let _loc2_: RoomWidgetPetCommandsUpdateEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc2_ = new RoomWidgetPetCommandsUpdateEvent(param1.petId, param1.allCommands, param1.enabledCommands);
            this._container.events.dispatchEvent(_loc2_);
        }
    };

    private onFavouriteGroupUpdated = (param1: RoomSessionFavouriteGroupUpdateEvent): void => {
        if (this._widget) {
            this._widget.favouriteGroupUpdated(param1.roomIndex, param1.habboGroupId, param1.status, param1.habboGroupName);
        }
    };

    private onNowPlayingChanged = (param1: NowPlayingEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        let _loc5_: string = null;
        let _loc4_: ISongInfo = null;
        if (this._musicController != null) {
            _loc3_ = param1.id;
            _loc2_ = "";
            _loc5_ = "";
            if (_loc3_ != -1) {
                _loc4_ = this._musicController.getSongInfo(_loc3_);
                if (_loc4_ != null) {
                    _loc2_ = _loc4_.name;
                    _loc5_ = _loc4_.creator;
                }
            }
            this._container.events.dispatchEvent(new RoomWidgetSongUpdateEvent("RWSUE_PLAYING_CHANGED", _loc3_, _loc2_, _loc5_));
        }
    };

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        let _loc2_: ISongInfo = null;
        if (this._musicController != null) {
            _loc2_ = this._musicController.getSongInfo(param1.id);
            if (_loc2_ != null && this._container != null && this._container.events != null) {
                this._container.events.dispatchEvent(new RoomWidgetSongUpdateEvent("RWSUE_DATA_RECEIVED", param1.id, _loc2_.name, _loc2_.creator));
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (InfoStandWidgetHandler.#staticsReady) return;
        InfoStandWidgetHandler.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(InfoStandWidgetHandler, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.handler.InfoStandWidgetHandler"));
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
