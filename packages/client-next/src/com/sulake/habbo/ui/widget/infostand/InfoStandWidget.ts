import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { _SafeCls_6045 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6045';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetFurniInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurniInfoUpdateEvent';
import type { RoomWidgetPetCommandsUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetCommandsUpdateEvent';
import type { RoomWidgetPetFigureUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetFigureUpdateEvent';
import type { RoomWidgetPetInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetInfoUpdateEvent';
import type { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';
import type { RoomWidgetRoomObjectPlaceEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectPlaceEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { RoomWidgetSongUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSongUpdateEvent';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BuildersClubPlaceRoomItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceRoomItemMessageComposer';
import { BuildersClubPlaceWallItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/BuildersClubPlaceWallItemMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { InfoStandWidgetHandler } from '@/com/sulake/habbo/ui/handler/InfoStandWidgetHandler';
import { CommandConfiguration } from '@/com/sulake/habbo/ui/widget/infostand/CommandConfiguration';
import { InfoStandBotView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandBotView';
import { InfoStandCrackableFurniView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandCrackableFurniView';
import { InfoStandFurniData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniData';
import { InfoStandFurniView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandFurniView';
import { InfoStandJukeboxView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandJukeboxView';
import { InfoStandPetData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandPetData';
import { InfoStandPetView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandPetView';
import { InfoStandRentableBotData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandRentableBotData';
import { InfoStandRentableBotView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandRentableBotView';
import { InfoStandSongDiskView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandSongDiskView';
import { InfoStandUserData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandUserData';
import { InfoStandUserView } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandUserView';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class InfoStandWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandWidget'); }

    private static readonly PLACEMENT_PAGE_ID: number = -1;
    private readonly USER_VIEW: string = "infostand_user_view";
    private readonly _SafeStr_7893: string = "infostand_furni_view";
    private readonly PET_VIEW: string = "infostand_pet_view";
    private readonly BOT_VIEW: string = "infostand_bot_view";
    private readonly RENTABLE_BOT_VIEW: string = "infostand_rentable_bot_view";
    private readonly _SafeStr_7943: string = "infostand_jukebox_view";
    private readonly CRACKABLE_FURNI_VIEW: string = "infostand_crackable_furni_view";
    private readonly SONGDISK_VIEW: string = "infostand_songdisk_view";

    declare private _furniView: InfoStandFurniView;

    declare private _SafeStr_2378: InfoStandUserView;

    declare private _SafeStr_2529: InfoStandPetView;

    declare private _SafeStr_2797: InfoStandBotView;

    declare private _SafeStr_3178: InfoStandRentableBotView;

    declare private _SafeStr_3734: InfoStandJukeboxView;

    declare private _SafeStr_4076: InfoStandCrackableFurniView;

    declare private _SafeStr_3742: InfoStandSongDiskView;

    declare private _SafeStr_7709: any[];

    declare private _userData: InfoStandUserData;

    declare private _furniData: InfoStandFurniData;

    declare private _SafeStr_2395: InfoStandPetData;

    declare private _rentableBotData: InfoStandRentableBotData;

    declare private _mainContainer: IWindowContainer;

    declare private _SafeStr_2342: Timer;

    declare private _config: ICoreConfiguration;

    private readonly UPDATE_INTERVAL_MS: number = 3000;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration, param6: IHabboCatalog) {
        super(param1, param2, param3, param4);
        this._config = param5;
        this._furniView = new InfoStandFurniView(this, "infostand_furni_view", param6);
        this._SafeStr_2378 = new InfoStandUserView(this, "infostand_user_view");
        this._SafeStr_2529 = new InfoStandPetView(this, "infostand_pet_view", param6);
        this._SafeStr_2797 = new InfoStandBotView(this, "infostand_bot_view");
        this._SafeStr_3178 = new InfoStandRentableBotView(this, "infostand_rentable_bot_view", param6);
        this._SafeStr_3734 = new InfoStandJukeboxView(this, "infostand_jukebox_view", param6);
        this._SafeStr_4076 = new InfoStandCrackableFurniView(this, "infostand_crackable_furni_view", param6);
        this._SafeStr_3742 = new InfoStandSongDiskView(this, "infostand_songdisk_view", param6);
        this._userData = new InfoStandUserData();
        this._furniData = new InfoStandFurniData();
        this._SafeStr_2395 = new InfoStandPetData();
        this._rentableBotData = new InfoStandRentableBotData();
        this._SafeStr_2342 = new Timer(3000);
        this._SafeStr_2342.addEventListener("timer", this.onUpdateTimer);
        this.mainContainer.visible = false;
        this.handler.widget = this;
    }

    public get handler(): InfoStandWidgetHandler {
        return this._SafeStr_2143 instanceof InfoStandWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get furniView(): InfoStandFurniView {
        return this._furniView;
    }

    public override get mainWindow(): IWindow {
        return this.mainContainer;
    }

    public get config(): ICoreConfiguration {
        return this._config;
    }

    public get mainContainer(): IWindowContainer {
        if (this._mainContainer == null) {
            this._mainContainer = asGuarded(this.windowManager.createWindow("infostand_main_container", "", 4, 0, 0, new Rectangle(0, 0, 50, 100)), isIWindowContainer);
            this._mainContainer.tags.push("room_widget_infostand");
            this._mainContainer.background = true;
            this._mainContainer.color = 0;
        }
        return this._mainContainer;
    }

    public favouriteGroupUpdated(param1: number, param2: number, param3: number, param4: string): void {
        let _loc6_: string = null;
        if (!this.userData || this.userData.userRoomId != param1) {
            return;
        }
        if (!this.mainContainer) {
            return;
        }
        let _loc5_: IWindow = this.mainContainer.findChildByName("infostand_user_view");
        if (!_loc5_ || !_loc5_.visible) {
            return;
        }
        this._SafeStr_2378.clearGroupBadge();
        if (param2 != -1) {
            _loc6_ = this.handler.container.sessionDataManager.getGroupBadgeId(param2);
            this.userData.groupId = param2;
            this.userData.groupBadgeId = _loc6_;
            this.userData.groupName = param4;
            this._SafeStr_2378.setGroupBadge(_loc6_);
        }
    }

    public getXmlWindow(param1: string): IWindow {
        let _loc4_: IAsset = null;
        let _loc2_: XmlAsset = null;
        let _loc3_: IWindow = null;
        try {
            _loc4_ = this.assets.getAssetByName(param1);
            _loc2_ = castTo(_loc4_, XmlAsset);
            _loc3_ = this.windowManager.buildFromXML(XML.from(_loc2_.content));
        } catch (e) {
            Logger.log("[InfoStandWidget] Missing window XML: " + param1);
        }
        return _loc3_;
    }

    public setRelationshipStatus(param1: number, param2: UtilsMap): void {
        if (this._userData.userId == param1) {
            this._SafeStr_2378.setRelationshipStatuses(param2);
        }
    }

    public override dispose(): void {
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
        this._SafeStr_2342 = null;
        if (this._SafeStr_2378) {
            this._SafeStr_2378.dispose();
        }
        this._SafeStr_2378 = null;
        if (this._furniView) {
            this._furniView.dispose();
        }
        this._furniView = null;
        if (this._SafeStr_2797) {
            this._SafeStr_2797.dispose();
        }
        this._SafeStr_2797 = null;
        if (this._SafeStr_3178) {
            this._SafeStr_3178.dispose();
        }
        this._SafeStr_3178 = null;
        if (this._SafeStr_2529) {
            this._SafeStr_2529.dispose();
        }
        this._SafeStr_2529 = null;
        if (this._SafeStr_3734) {
            this._SafeStr_3734.dispose();
        }
        this._SafeStr_3734 = null;
        if (this._SafeStr_4076) {
            this._SafeStr_4076.dispose();
        }
        this._SafeStr_4076 = null;
        if (this._SafeStr_3742) {
            this._SafeStr_3742.dispose();
        }
        this._SafeStr_3742 = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWROUE_OBJECT_SELECTED", this.onRoomObjectSelected);
        param1.addEventListener("RWROUE_OBJECT_DESELECTED", this.onClose);
        param1.addEventListener("RWROUE_USER_REMOVED", this.onRoomObjectRemoved);
        param1.addEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
        param1.addEventListener("RWROUE_OBJECT_PLACED", this.onRoomObjectPlaced);
        param1.addEventListener("RWUIUE_OWN_USER", this.onUserInfo);
        param1.addEventListener("RWUIUE_PEER", this.onUserInfo);
        param1.addEventListener("RWUIUE_BOT", this.onBotInfo);
        param1.addEventListener("RWFIUE_FURNI", this.onFurniInfo);
        param1.addEventListener("RWRBIUE_RENTABLE_BOT", this.onRentableBotInfo);
        param1.addEventListener("RWPIUE_PET_INFO", this.onPetInfo);
        param1.addEventListener("RWPCUE_PET_COMMANDS", this.onPetCommands);
        param1.addEventListener("RWPCUE_OPEN_PET_TRAINING", this.onOpenPetTraining);
        param1.addEventListener("RWPCUE_CLOSE_PET_TRAINING", this.onClosePetTraining);
        param1.addEventListener("RWSUE_PLAYING_CHANGED", this.onSongUpdate);
        param1.addEventListener("RWSUE_DATA_RECEIVED", this.onSongUpdate);
        param1.addEventListener("RWPIUE_PET_FIGURE_UPDATE", this.onPetFigureUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWROUE_OBJECT_SELECTED", this.onRoomObjectSelected);
        param1.removeEventListener("RWROUE_OBJECT_DESELECTED", this.onClose);
        param1.removeEventListener("RWROUE_USER_REMOVED", this.onRoomObjectRemoved);
        param1.removeEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
        param1.removeEventListener("RWROUE_OBJECT_PLACED", this.onRoomObjectPlaced);
        param1.removeEventListener("RWUIUE_OWN_USER", this.onUserInfo);
        param1.removeEventListener("RWUIUE_PEER", this.onUserInfo);
        param1.removeEventListener("RWUIUE_BOT", this.onBotInfo);
        param1.removeEventListener("RWFIUE_FURNI", this.onFurniInfo);
        param1.removeEventListener("RWPIUE_PET_INFO", this.onPetInfo);
        param1.removeEventListener("RWPCUE_PET_COMMANDS", this.onPetCommands);
        param1.removeEventListener("RWPCUE_OPEN_PET_TRAINING", this.onOpenPetTraining);
        param1.removeEventListener("RWPCUE_CLOSE_PET_TRAINING", this.onClosePetTraining);
        param1.removeEventListener("RWSUE_PLAYING_CHANGED", this.onSongUpdate);
        param1.removeEventListener("RWSUE_DATA_RECEIVED", this.onSongUpdate);
        param1.removeEventListener("RWPIUE_PET_FIGURE_UPDATE", this.onPetFigureUpdate);
    }

    public get rentableBotData(): InfoStandRentableBotData {
        return this._rentableBotData;
    }

    public get userData(): InfoStandUserData {
        return this._userData;
    }

    public get furniData(): InfoStandFurniData {
        return this._furniData;
    }

    public get petData(): InfoStandPetData {
        return this._SafeStr_2395;
    }

    private onUpdateTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_2529 == null) {
            return;
        }
        this.messageListener.processWidgetMessage(new RoomWidgetUserActionMessage("RWUAM_REQUEST_PET_UPDATE", this._SafeStr_2529.getCurrentPetId()));
    };

    private onUserInfo = (param1: RoomWidgetUserInfoUpdateEvent): void => {
        let _loc2_: boolean = this._SafeStr_2378 != null && this._SafeStr_2378.window != null && Boolean(this._SafeStr_2378.window.visible) && this._userData.userId == param1.webID;
        let _loc4_: any[] = this.userData.badges;
        let _loc5_: any[] = this.userData.selectedBadges;
        let _loc6_: boolean = this.shouldPreserveDisplayedBadges(_loc2_, _loc4_, _loc5_, param1.badges, param1.selectedBadges);
        let _loc3_: boolean = this.shouldPlayGlowForUserInfo(_loc2_, _loc4_, _loc5_, param1.badges, param1.selectedBadges);
        this.userData.setData(param1);
        if (_loc6_) {
            this.userData.badges = _loc4_;
            this.userData.selectedBadges = _loc5_;
        }
        if (this.handler.container.sessionDataManager.isBlocked(param1.webID)) {
            return;
        }
        this._SafeStr_2378.update(param1, _loc3_, _loc6_);
        this.selectView("infostand_user_view");
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    };

    private onBotInfo = (param1: RoomWidgetUserInfoUpdateEvent): void => {
        this.userData.setData(param1);
        this._SafeStr_2797.update(param1);
        this.selectView("infostand_bot_view");
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    };

    private onRentableBotInfo = (param1: RoomWidgetRentableBotInfoUpdateEvent): void => {
        this.rentableBotData.setData(param1);
        this._SafeStr_3178.update(param1);
        this.selectView("infostand_rentable_bot_view");
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    };

    private onFurniInfo = (param1: RoomWidgetFurniInfoUpdateEvent): void => {
        this.furniData.setData(param1);
        if (param1.extraParam == "RWEIEP_JUKEBOX") {
            this._SafeStr_3734.update(param1);
            this.selectView("infostand_jukebox_view");
        } else if (param1.extraParam.indexOf("RWEIEP_SONGDISK") != -1) {
            this._SafeStr_3742.update(param1);
            this.selectView("infostand_songdisk_view");
        } else if (param1.extraParam.indexOf("RWEIEP_CRACKABLE_FURNI") != -1) {
            this._SafeStr_4076.update(param1);
            this.selectView("infostand_crackable_furni_view");
        } else {
            this._furniView.update(param1);
            this.selectView("infostand_furni_view");
        }
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    };

    private onPetInfo = (param1: RoomWidgetPetInfoUpdateEvent): void => {
        this.petData.setData(param1);
        this.userData.petRespectLeft = param1.petRespectLeft;
        this._SafeStr_2529.update(this.petData);
        this.selectView("infostand_pet_view");
        if (this._SafeStr_2342) {
            this._SafeStr_2342.start();
        }
    };

    private onPetFigureUpdate = (param1: RoomWidgetPetFigureUpdateEvent): void => {
        this._SafeStr_2529.updateImage(param1.petId, param1.image);
    };

    private onPetCommands = (param1: RoomWidgetPetCommandsUpdateEvent): void => {
        let _loc2_: any[] = param1.allCommands;
        let _loc3_: any[] = param1.enabledCommands;
        if (this.petData.type == 0 && !this._config.getBoolean("nest.breeding.dog.enabled") || this.petData.type == 1 && !this._config.getBoolean("nest.breeding.cat.enabled") || this.petData.type == 5 && !this._config.getBoolean("nest.breeding.pig.enabled")) {
            if (_loc2_.indexOf(46) != -1) {
                _loc2_.splice(_loc2_.indexOf(46), 1);
            }
            if (_loc3_.indexOf(46) != -1) {
                _loc3_.splice(_loc3_.indexOf(46), 1);
            }
        }
        this._SafeStr_2529.updateEnabledTrainingCommands(param1.id, new CommandConfiguration(param1.allCommands, param1.enabledCommands));
    };

    private onOpenPetTraining = (param1: RoomWidgetUpdateEvent): void => {
        this._SafeStr_2529.openTrainView();
    };

    private onClosePetTraining = (param1: RoomWidgetUpdateEvent): void => {
        this._SafeStr_2529.closeTrainView();
    };

    public updateUserData(param1: number, param2: string, param3: number, param4: string, param5: boolean, param6: number = -1): void {
        if (param1 != this.userData.userId) {
            return;
        }
        this.userData.badgesRank = param6;
        if (this.userData.isBot()) {
            this._SafeStr_2797.setFigure(param2);
        } else {
            this._SafeStr_2378.setFigure(param2);
            this._SafeStr_2378.setMotto(param4, param5);
            if (this.handler.isActivityDisplayEnabled) {
                this._SafeStr_2378.achievementScore = param3;
            }
            this._SafeStr_2378.badgesRank = param6;
        }
    }

    public refreshBadges(param1: number, param2: any[] = null): void {
        if (param1 != this.userData.userId) {
            return;
        }
        param2 = param2 == null ? [] : param2;
        if (this.areSelectedBadgesEqual(this.userData.selectedBadges, param2)) {
            return;
        }
        let _loc3_: any[] = this.getBadgeCodesFromSelectedBadges(param2);
        this.userData.badges = _loc3_ == null ? [] : _loc3_;
        this.userData.selectedBadges = param2;
        if (this.userData.isBot()) {
            this._SafeStr_2797.updateBadges(this.userData.badges);
        } else {
            this._SafeStr_2378.updateBadges(this.userData.badges, this.userData.selectedBadges, true);
        }
    }

    public refreshBadge(param1: string): void {
        let _loc2_: _SafeCls_6045 = null;
        let _loc3_: number = this.userData.getBadgeSlot(param1);
        if (_loc3_ >= 0) {
            _loc2_ = this.userData.getSelectedBadge(_loc3_);
            if (this.userData.isBot()) {
                this._SafeStr_2797.setBadge(_loc3_, param1);
            } else {
                this._SafeStr_2378.setBadge(_loc3_, param1, _loc2_);
            }
            return;
        }
        if (param1 == this.userData.groupBadgeId) {
            this._SafeStr_2378.setGroupBadge(param1);
        }
    }

    private onRoomObjectPlaced = (param1: RoomWidgetRoomObjectPlaceEvent): void => {
        if (param1.placementSource == "info_stand") {
            if (!param1.placedInRoom) {
                return;
            }
            switch (param1.category - 10) {
                case 0:
                    if (!param1.placedOnFloor) {
                        return;
                    }
                    this.handler.container.connection.send(new BuildersClubPlaceRoomItemMessageComposer(-1, this.furniData.bcOfferId, this.furniData.extraParam, param1.x | 0, param1.y | 0, param1.direction));
                    break;
                case 10:
                    if (!param1.placedOnWall) {
                        return;
                    }
                    this.handler.container.connection.send(new BuildersClubPlaceWallItemMessageComposer(-1, this.furniData.bcOfferId, this.furniData.extraParam, param1.wallLocation));
            }
            this.requestItemToMover();
        }
    };

    public requestItemToMover(): void {
        let _loc1_: IRoomEngine = this.handler.container.roomEngine;
        _loc1_.initializeRoomObjectInsert("info_stand", -this.furniData.bcOfferId, this.furniData.category, this.furniData.classId, this.furniData.extraParam, null, -1, -1, null, true);
    }

    private onRoomObjectSelected = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        let _loc2_: RoomWidgetRoomObjectMessage = new RoomWidgetRoomObjectMessage("RWROM_GET_OBJECT_INFO", param1.id, param1.category);
        this.messageListener.processWidgetMessage(_loc2_);
    };

    private onRoomObjectRemoved = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        let _loc2_: boolean = false;
        switch (param1.type) {
            case "RWROUE_FURNI_REMOVED":
                _loc2_ = param1.id == this._furniData.id;
                break;
            case "RWROUE_USER_REMOVED":
                if (this._SafeStr_2378 != null && this._SafeStr_2378.window != null && Boolean(this._SafeStr_2378.window.visible)) {
                    _loc2_ = param1.id == this._userData.userRoomId;
                    break;
                }
                if (this._SafeStr_2529 != null && this._SafeStr_2529.window != null && Boolean(this._SafeStr_2529.window.visible)) {
                    _loc2_ = param1.id == this._SafeStr_2395.roomIndex;
                    break;
                }
                if (this._SafeStr_2797 != null && this._SafeStr_2797.window != null && Boolean(this._SafeStr_2797.window.visible)) {
                    _loc2_ = param1.id == this._userData.userRoomId;
                    break;
                }
                if (this._SafeStr_3178 != null && this._SafeStr_3178.window != null && Boolean(this._SafeStr_3178.window.visible)) {
                    _loc2_ = param1.id == this._rentableBotData.userRoomId;
                }
        }
        if (_loc2_) {
            this.close();
        }
    };

    private onSongUpdate = (param1: RoomWidgetSongUpdateEvent): void => {
        this._SafeStr_3734.updateSongInfo(param1);
        this._SafeStr_3742.updateSongInfo(param1);
    };

    public close(): void {
        this.hideChildren();
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    }

    private onClose = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        this.close();
        if (this._SafeStr_2342) {
            this._SafeStr_2342.stop();
        }
    };

    private hideChildren(): void {
        let _loc1_: number = 0;
        if (this._mainContainer != null) {
            _loc1_ = 0;
            while (_loc1_ < this._mainContainer.numChildren) {
                this._mainContainer.getChildAt(_loc1_).visible = false;
                _loc1_++;
            }
        }
    }

    public isFurniViewVisible(): boolean {
        let _loc1_: IWindow = null;
        if (this._mainContainer != null) {
            _loc1_ = asGuarded(this._mainContainer.getChildByName("infostand_furni_view"), isIWindow);
            if (_loc1_ != null) {
                return _loc1_.visible;
            }
        }
        return false;
    }

    private selectView(param1: string): void {
        this.hideChildren();
        let _loc2_: IWindow = asGuarded(this.mainContainer.getChildByName(param1), isIWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.visible = true;
        this.mainContainer.visible = true;
        this.mainContainer.width = _loc2_.width;
        this.mainContainer.height = _loc2_.height;
    }

    public refreshContainer(): void {
        let _loc2_: IWindow = null;
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this.mainContainer.numChildren) {
            _loc2_ = this.mainContainer.getChildAt(_loc1_);
            if (_loc2_.visible) {
                this.mainContainer.width = _loc2_.width;
                this.mainContainer.height = _loc2_.height;
            }
            _loc1_++;
        }
    }

    public override release(): void {
        this.close();
        super.release();
    }

    private getBadgeCodesFromSelectedBadges(param1: any[]): any[] {
        param1 = param1 == null ? [] : param1;
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            if (!(_loc3_ == null || _loc3_.slotIndex < 0)) {
                _loc2_[_loc3_.slotIndex] = _loc3_.badgeCode;
            }
        }
        return _loc2_;
    }

    private shouldPreserveDisplayedBadges(param1: boolean, param2: any[], param3: any[], param4: any[], param5: any[]): boolean {
        if (!param1) {
            return false;
        }
        if (this.hasSelectedBadges(param3) && !this.hasSelectedBadges(param5)) {
            return true;
        }
        return this.areDisplayedBadgesEqual(param2, param3, param4, param5);
    }

    private shouldPlayGlowForUserInfo(param1: boolean, param2: any[], param3: any[], param4: any[], param5: any[]): boolean {
        if (!param1) {
            return true;
        }
        if (this.hasSelectedBadges(param3) && !this.hasSelectedBadges(param5)) {
            return false;
        }
        return !this.areDisplayedBadgesEqual(param2, param3, param4, param5);
    }

    private areDisplayedBadgesEqual(param1: any[], param2: any[], param3: any[], param4: any[]): boolean {
        let _loc6_: boolean = this.hasSelectedBadges(param2);
        let _loc5_: boolean = this.hasSelectedBadges(param4);
        if (_loc6_ || _loc5_) {
            return _loc6_ && _loc5_ && this.areSelectedBadgesEqual(param2, param4);
        }
        return this.areBadgeCodesEqual(param1, param3);
    }

    private hasSelectedBadges(param1: any[]): boolean {
        return param1 != null && param1.length > 0;
    }

    private areBadgeCodesEqual(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        param1 = param1 == null ? [] : param1;
        param2 = param2 == null ? [] : param2;
        if (param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            if (param1[_loc3_] !== param2[_loc3_]) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private areSelectedBadgesEqual(param1: any[], param2: any[]): boolean {
        let _loc3_: number = 0;
        param1 = param1 == null ? [] : param1;
        param2 = param2 == null ? [] : param2;
        if (param1.length != param2.length) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < 5) {
            if (!this.areSelectedBadgeEntriesEqual(this.getSelectedBadgeBySlot(param1, _loc3_), this.getSelectedBadgeBySlot(param2, _loc3_))) {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private areSelectedBadgeEntriesEqual(param1: _SafeCls_6045, param2: _SafeCls_6045): boolean {
        if (param1 == param2) {
            return true;
        }
        if (param1 == null || param2 == null) {
            return false;
        }
        return param1.slotIndex == param2.slotIndex && param1.badgeCode == param2.badgeCode && param1.ownerCount == param2.ownerCount && param1.badgeRarityId == param2.badgeRarityId;
    }

    private getSelectedBadgeBySlot(param1: any[], param2: number): _SafeCls_6045 {
        param1 = param1 == null ? [] : param1;
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_ != null && _loc3_.slotIndex == param2) {
                return _loc3_;
            }
        }
        return null;
    }
}
