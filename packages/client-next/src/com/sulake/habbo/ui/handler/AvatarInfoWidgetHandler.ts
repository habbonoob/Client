import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { RoomSessionNestBreedingSuccessEvent } from '@/com/sulake/habbo/session/events/RoomSessionNestBreedingSuccessEvent';
import type { RoomSessionPetLevelUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetLevelUpdateEvent';
import type { RoomSessionPetStatusUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetStatusUpdateEvent';
import type { UserNameUpdateEvent } from '@/com/sulake/habbo/session/events/UserNameUpdateEvent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FurniListAddOrUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListAddOrUpdateEvent';
import { CustomUserNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/CustomUserNotificationMessageEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomEngineUseProductEvent } from '@/com/sulake/habbo/room/events/RoomEngineUseProductEvent';
import { RoomSessionDanceEvent } from '@/com/sulake/habbo/session/events/RoomSessionDanceEvent';
import { RoomSessionUserDataUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserDataUpdateEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetAvatarInfoEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAvatarInfoEvent';
import { RoomWidgetPetLevelUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetLevelUpdateEvent';
import { RoomWidgetPetStatusUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetStatusUpdateEvent';
import { RoomWidgetUserDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserDataUpdateEvent';
import { UseProductItem } from '@/com/sulake/habbo/ui/widget/events/UseProductItem';
import { RoomWidgetInventoryUpdatedMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetInventoryUpdatedMessage';
import { RoomWidgetUseProductMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUseProductMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class AvatarInfoWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::AvatarInfoWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    declare private _widget: AvatarInfoWidget;

    declare private _SafeStr_3423: IMessageEvent;

    declare private _SafeStr_3248: IMessageEvent;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set widget(param1: AvatarInfoWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_3248 && this._container.connection) {
                this._container.connection.removeMessageEvent(this._SafeStr_3248);
            }
            this.container = null;
            this._widget = null;
            if (this._SafeStr_3423 != null) {
                this._SafeStr_3423.dispose();
                this._SafeStr_3423 = null;
            }
            this._SafeStr_3248 = null;
            this._disposed = true;
        }
    }

    public get type(): string {
        return "RWE_AVATAR_INFO";
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public get roomEngine(): IRoomEngine {
        return this._container ? this._container.roomEngine : null;
    }

    public get roomSession(): IRoomSession {
        return this._container ? this._container.roomSession : null;
    }

    public get friendList(): IHabboFriendList {
        return this._container ? this._container.friendList : null;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container && this._container.toolbar && this._container.toolbar.events) {
            this._container.toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClicked);
        }
        if (this._container && this._container.sessionDataManager && this._container.sessionDataManager.events) {
            this._container.sessionDataManager.events.removeEventListener("unue_name_updated", this.onUserNameUpdate);
        }
        if (this._container && this._container.roomSessionManager && this._container.roomSessionManager.events) {
            this._container.roomSessionManager.events.removeEventListener("RSPFUE_PET_STATUS_UPDATE", this.onPetStatusUpdate);
            this._container.roomSessionManager.events.removeEventListener("RSPLUE_PET_LEVEL_UPDATE", this.onPetLevelUpdate);
            this._container.roomSessionManager.events.removeEventListener("RSPFUE_NEST_BREEDING_SUCCESS", this.onNestBreedingSuccessEvent);
        }
        if (this._container && this._container.connection) {
            this._container.connection.removeMessageEvent(this._SafeStr_3423);
        }
        if (this._container && this._container.connection && this._SafeStr_3248) {
            this._container.connection.removeMessageEvent(this._SafeStr_3248);
        }
        this._container = param1;
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_3423 == null) {
            this._SafeStr_3423 = new FurniListAddOrUpdateEvent(this.onFurniListUpdated);
        }
        if (!this._SafeStr_3248 && this._container.connection) {
            this._SafeStr_3248 = new CustomUserNotificationMessageEvent(this.onCustomUserNotificationMessage);
            this._container.connection.addMessageEvent(this._SafeStr_3248);
        }
        if (this._container && this._container.toolbar && this._container.toolbar.events) {
            this._container.toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClicked);
        }
        if (this._container && this._container.sessionDataManager && this._container.sessionDataManager.events) {
            this._container.sessionDataManager.events.addEventListener("unue_name_updated", this.onUserNameUpdate);
        }
        if (this._container && this._container.roomSessionManager && this._container.roomSessionManager.events) {
            this._container.roomSessionManager.events.addEventListener("RSPFUE_PET_STATUS_UPDATE", this.onPetStatusUpdate);
            this._container.roomSessionManager.events.addEventListener("RSPFUE_NEST_BREEDING_SUCCESS", this.onNestBreedingSuccessEvent);
            this._container.roomSessionManager.events.addEventListener("RSPLUE_PET_LEVEL_UPDATE", this.onPetLevelUpdate);
        }
        if (this._container && this._container.connection) {
            this._container.connection.addMessageEvent(this._SafeStr_3423);
        }
    }

    private onFurniListUpdated = (param1: IMessageEvent): void => {
        if (this._container != null) {
            if (this._container.events != null) {
                this._container.events.dispatchEvent(new RoomWidgetInventoryUpdatedMessage("RWIUM_INVENTORY_UPDATED"));
            }
        }
    };

    private onToolbarClicked = (param1: HabboToolbarEvent): void => {
        if (param1.iconId == "HTIE_ICON_MEMENU") {
            if (this.container.config.getBoolean("simple.memenu.enabled")) {
                this._widget.selectOwnAvatar();
            } else {
                this.dispatchOwnAvatarInfo();
            }
        }
    };

    private onUserNameUpdate = (param1: UserNameUpdateEvent): void => {
        this._widget.close();
    };

    private onPetStatusUpdate = (param1: RoomSessionPetStatusUpdateEvent): void => {
        let _loc4_: boolean = false;
        let _loc2_: boolean = false;
        let _loc6_: boolean = false;
        let _loc3_: boolean = false;
        let _loc7_: IUserData = null;
        let _loc5_: RoomWidgetPetStatusUpdateEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc4_ = param1.canBreed;
            _loc2_ = param1.canHarvest;
            _loc6_ = param1.canRevive;
            _loc3_ = param1.hasBreedingPermission;
            _loc7_ = this.findPetWithWebId(param1.petId);
            if (_loc7_ == null) {
                Logger.log("Could not find pet with the id: " + param1.petId + " given by petStatusUpdate");
                return;
            }
            _loc5_ = new RoomWidgetPetStatusUpdateEvent(_loc7_.roomObjectId, _loc4_, _loc2_, _loc6_, _loc3_);
            this._container.events.dispatchEvent(_loc5_);
        }
    };

    private onPetLevelUpdate = (param1: RoomSessionPetLevelUpdateEvent): void => {
        let _loc3_: number = 0;
        let _loc4_: IUserData = null;
        let _loc2_: RoomWidgetPetLevelUpdateEvent = null;
        if (this._container != null && this._container.events != null) {
            _loc3_ = param1.level;
            _loc4_ = this.findPetWithWebId(param1.petId);
            _loc2_ = new RoomWidgetPetLevelUpdateEvent(_loc4_.roomObjectId, _loc3_);
            this._container.events.dispatchEvent(_loc2_);
        }
    };

    private dispatchOwnAvatarInfo(): void {
        let _loc4_: number = this._container.sessionDataManager.userId;
        let _loc3_: string = this._container.sessionDataManager.userName;
        let _loc2_: boolean = this._container.sessionDataManager.nameChangeAllowed;
        let _loc1_: IUserData = this._container.roomSession.userDataManager.getUserData(_loc4_);
        if (_loc1_) {
            this._container.events.dispatchEvent(new RoomWidgetAvatarInfoEvent(_loc4_, _loc3_, _loc1_.type, _loc1_.roomObjectId, _loc2_));
        }
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWROM_GET_OWN_CHARACTER_INFO");
        _loc1_.push("RWUAM_START_NAME_CHANGE");
        _loc1_.push("RWUAM_REQUEST_PET_UPDATE");
        _loc1_.push("RWUPM_PET_PRODUCT");
        _loc1_.push("RWUAM_REQUEST_BREED_PET");
        _loc1_.push("RWUAM_HARVEST_PET");
        _loc1_.push("RWUAM_REVIVE_PET");
        _loc1_.push("RWUAM_COMPOST_PLANT");
        return _loc1_;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("rsudue_user_data_updated");
        _loc1_.push("RSDE_DANCE");
        _loc1_.push("ROSM_USE_PRODUCT_FROM_INVENTORY");
        _loc1_.push("ROSM_USE_PRODUCT_FROM_ROOM");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let userId: number = 0;
        let userData: IUserData;
        let userAction: RoomWidgetUserActionMessage;
        let useProductMessage: RoomWidgetUseProductMessage;
        let localization: IHabboLocalizationManager;
        let message: RoomWidgetMessage = param1;
        if (!message) {
            return null;
        }
        userId = 0;
        userAction = message instanceof RoomWidgetUserActionMessage ? message : null;
        if (userAction != null) {
            userId = userAction.userId;
        }
        switch (message.type) {
            case "RWROM_GET_OWN_CHARACTER_INFO":
                this.dispatchOwnAvatarInfo();
                break;
            case "RWUAM_START_NAME_CHANGE":
                this._container.habboHelp.startNameChange();
                break;
            case "RWUAM_REQUEST_PET_UPDATE":
                this._widget.handlePetInfo = false;
                break;
            case "RWUPM_PET_PRODUCT":
                useProductMessage = message instanceof RoomWidgetUseProductMessage ? message : null;
                if (useProductMessage) {
                    this._container.roomSession.useProductForPet(useProductMessage.roomObjectId, useProductMessage.petId);
                }
                break;
            case "RWUAM_HARVEST_PET":
                this._container.roomSession.harvestPet(userId);
                break;
            case "RWUAM_REVIVE_PET":
                break;
            case "RWUAM_COMPOST_PLANT":
                localization = this._widget.catalog.localization;
                this._widget.windowManager.confirm(localization.getLocalization("monsterplant.confirm.title.compost"), localization.getLocalization("monsterplant.confirm.desc.compost"), 0, ((): any => {
                   let onCompostConfirmed: (...args: any[]) => any;
                   return onCompostConfirmed = (param1: IConfirmDialog, param2: WindowEvent): void => {
                      param1.dispose();
                      if (param2.type == "WE_OK") {
                          this._container.roomSession.compostPlant(userId);
                      }
                  };
               })());
                break;
            case "RWUAM_REQUEST_BREED_PET":
                this.requestBreedMenu(userId);
                break;
            case "RWIUM_INVENTORY_UPDATED":
        }
        return null;
    }

    public processEvent(param1: Event): void {
        let _loc3_: any;
        let _loc2_: RoomSessionDanceEvent = null;
        let _loc4_: IUserData = null;
        switch (param1.type) {
            case "rsudue_user_data_updated":
                for (_loc3_ of castTo(param1, RoomSessionUserDataUpdateEvent).addedUsers ?? []) {
                    if (this._container && this._container.sessionDataManager && this._container.roomSession && this._container.roomSession.userDataManager) {
                        if (this._container.sessionDataManager.isBlocked(_loc3_.webID)) {
                            this._container.roomSession.userDataManager.markAsBlocked(_loc3_.roomObjectId);
                        }
                    }
                }
                this._container.events.dispatchEvent(new RoomWidgetUserDataUpdateEvent());
                for (_loc3_ of castTo(param1, RoomSessionUserDataUpdateEvent).addedUsers ?? []) {
                    if (this.friendList.getFriendNames().indexOf(_loc3_.name) > -1) {
                        this._widget.showUserName(_loc3_, _loc3_.roomObjectId);
                    }
                }
                break;
            case "RSDE_DANCE":
                _loc2_ = param1 instanceof RoomSessionDanceEvent ? param1 : null;
                if (_loc2_ && this._widget && this.container && this.container.roomSession && this.container.roomSession.userDataManager) {
                    _loc4_ = this.container.roomSession.userDataManager.getUserData(this.container.sessionDataManager.userId);
                    if (_loc4_ && _loc2_.userId == _loc4_.roomObjectId) {
                        this._widget.isDancing = _loc2_.danceStyle != 0;
                    }
                }
                break;
            case "ROSM_USE_PRODUCT_FROM_INVENTORY":
                this.handleUseProductMenuRequestInventoryItem((param1 instanceof RoomEngineUseProductEvent ? param1 : null).inventoryStripId, (param1 instanceof RoomEngineUseProductEvent ? param1 : null).furnitureTypeId);
                break;
            case "ROSM_USE_PRODUCT_FROM_ROOM":
                this.handleUseProductMenuRequestRoomObject((param1 instanceof RoomEngineUseProductEvent ? param1 : null).objectId);
        }
    }

    private requestBreedMenu(param1: number): void {
        Logger.log("Show breed menu. finally: " + param1);
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null) {
            return;
        }
        if (this._container.roomSession.userDataManager == null) {
            return;
        }
        let _loc5_: number = this._container.roomSession.roomId;
        let _loc3_: number = this._container.sessionDataManager.userId;
        let _loc6_: IUserData = this._container.roomSession.userDataManager.getUserDataByType(param1, 2);
        if (_loc6_ == null) {
            return;
        }
        let _loc2_: any[] = _loc6_.figure.split(" ");
        let _loc4_: number = Number(_loc2_.length > 0 ? _loc2_[0] : -1) | 0;
        this.activateBreedMenuForPets(_loc5_, param1, _loc4_, _loc6_.roomObjectId, _loc3_);
    }

    public update(): void {
    }

    private onNestBreedingSuccessEvent = (param1: RoomSessionNestBreedingSuccessEvent): void => {
        if (this._container != null && this._container.events != null) {
            this._widget.showNestBreedingSuccess(param1.petId, param1.rarityCategory);
        }
    };

    public getFurniData(param1: IRoomObject): IFurnitureData {
        let _loc2_: IFurnitureData = null;
        let _loc3_: number = 0;
        if (param1) {
            _loc3_ = param1.getModel().getNumber("furniture_type_id") | 0;
            _loc2_ = this._container.sessionDataManager.getFloorItemData(_loc3_);
        }
        return _loc2_;
    }

    private handleUseProductMenuRequestInventoryItem(param1: number, param2: number): void {
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null) {
            return;
        }
        if (this._container.roomSession.userDataManager == null) {
            return;
        }
        let _loc6_: number = this._container.roomSession.roomId;
        let _loc3_: number = this._container.sessionDataManager.userId;
        let _loc5_: IFurnitureData = this._container.sessionDataManager.getFloorItemData(param2);
        if (!_loc5_) {
            return;
        }
        let _loc4_: any[] = _loc5_.customParams.split(" ");
        let _loc7_: number = (_loc4_.length > 0 ? parseInt(stringOrNull(_loc4_[0])) : -1) | 0;
        if (_loc7_ == -1) {
            return;
        }
        this.activateUseProductMenuForPets(_loc6_, param2, _loc7_, _loc5_.category, _loc3_, param1);
    }

    private handleUseProductMenuRequestRoomObject(param1: number): void {
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null) {
            return;
        }
        if (this._container.roomSession.userDataManager == null) {
            return;
        }
        let _loc6_: number = this._container.roomSession.roomId;
        let _loc7_: IRoomObject = this._container.roomEngine.getRoomObject(_loc6_, param1, 10);
        let _loc2_: boolean = this._container.isOwnerOfFurniture(_loc7_);
        if (!_loc2_) {
            return;
        }
        let _loc3_: number = this._container.getFurnitureOwnerId(_loc7_);
        let _loc5_: IFurnitureData = this.getFurniData(_loc7_);
        let _loc4_: any[] = _loc5_.customParams.split(" ");
        let _loc8_: number = (_loc4_.length > 0 ? parseInt(stringOrNull(_loc4_[0])) : -1) | 0;
        if (_loc8_ == -1) {
            return;
        }
        this.activateUseProductMenuForPets(_loc6_, param1, _loc8_, _loc5_.category, _loc3_);
    }

    private activateUseProductMenuForPets(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number = -1): void {
        let _loc12_: IRoomObject = null;
        let _loc10_: number = 0;
        let _loc15_: IUserData = null;
        let _loc9_: boolean = false;
        let _loc11_: any[] = null;
        let _loc7_: number = 0;
        let _loc13_: any[] = [];
        let _loc8_: number = this._container.roomEngine.getRoomObjectCount(param1, 100);
        let _loc14_: number = 7;
        _loc10_ = 0;
        for (; _loc10_ < _loc8_; _loc10_++) {
            _loc12_ = this._container.roomEngine.getRoomObjectWithIndex(param1, _loc10_, 100);
            _loc15_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc12_.getId());
            _loc9_ = false;
            if (!(_loc15_ == null || _loc15_.type != 2)) {
                if (_loc15_.ownerId == param5) {
                    if (_loc15_.hasSaddle && param4 == 16) {
                        _loc9_ = true;
                    }
                    _loc11_ = _loc15_.figure.split(" ");
                    _loc7_ = Number(_loc11_.length > 0 ? _loc11_[0] : -1) | 0;
                    if (_loc7_ == param3) {
                        if (param4 == 20) {
                            if (!_loc15_.canRevive) {
                                continue;
                            }
                        }
                        if (param4 == 21) {
                            if (_loc15_.petLevel < _loc14_ || _loc15_.canRevive || _loc15_.canBreed) {
                                continue;
                            }
                        }
                        if (param4 == 22) {
                            if (_loc15_.petLevel >= _loc14_ || _loc15_.canRevive) {
                                continue;
                            }
                        }
                        _loc13_.push(new UseProductItem(_loc15_.roomObjectId, 100, _loc15_.name, param2, _loc12_.getId(), param6, _loc9_));
                    }
                }
            }
        }
        this._widget.showUseProductMenuForItems(_loc13_);
    }

    private activateBreedMenuForPets(param1: number, param2: number, param3: number, param4: number, param5: number): void {
        let _loc10_: IRoomObject = null;
        let _loc8_: number = 0;
        let _loc13_: IUserData = null;
        let _loc12_: IUserData = null;
        let _loc9_: any[] = null;
        let _loc6_: number = 0;
        let _loc11_: any[] = [];
        let _loc7_: number = this._container.roomEngine.getRoomObjectCount(param1, 100);
        _loc8_ = 0;
        while (_loc8_ < _loc7_) {
            _loc10_ = this._container.roomEngine.getRoomObjectWithIndex(param1, _loc8_, 100);
            _loc13_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc10_.getId());
            if (!(_loc13_ == null || _loc13_.type != 2)) {
                if (_loc13_.canBreed) {
                    if (!(!_loc13_.hasBreedingPermission && _loc13_.ownerId != param5)) {
                        _loc12_ = this._container.roomSession.userDataManager.getUserData(_loc13_.ownerId);
                        if (_loc12_ != null) {
                            _loc9_ = _loc13_.figure.split(" ");
                            _loc6_ = Number(_loc9_.length > 0 ? _loc9_[0] : -1) | 0;
                            if (_loc6_ == param3 && _loc13_.roomObjectId != param4) {
                                _loc11_.push(new UseProductItem(_loc13_.roomObjectId, 100, _loc13_.name, param4, _loc10_.getId()));
                            }
                        }
                    }
                }
            }
            _loc8_++;
        }
        this._widget.showBreedPetMenuForItems(_loc11_);
    }

    private findPetWithWebId(param1: number): IUserData {
        let _loc4_: number = 0;
        let _loc2_: IRoomObject = null;
        let _loc6_: IUserData = null;
        let _loc5_: number = this._container.roomSession.roomId;
        let _loc3_: number = this._container.roomEngine.getRoomObjectCount(_loc5_, 100);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = this._container.roomEngine.getRoomObjectWithIndex(_loc5_, _loc4_, 100);
            _loc6_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc2_.getId());
            if (!(_loc6_ == null || _loc6_.type != 2)) {
                if (_loc6_.webID == param1) {
                    return _loc6_;
                }
            }
            _loc4_++;
        }
        return null;
    }

    public onCustomUserNotificationMessage = (param1: CustomUserNotificationMessageEvent): void => {
        let _loc2_: number = param1.getParser().code;
        switch (_loc2_ - 4) {
            case 0:
            case 1:
                this._container.sessionDataManager.giveRespectFailed();
        }
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
