import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { FriendRequestData } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/FriendRequestData';
import type { UserMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserMessageData';
import type { NewFriendRequestMessageParser } from '@/com/sulake/habbo/communication/messages/parser/friendlist/NewFriendRequestMessageParser';
import type { PetBreedingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetBreedingMessageParser';
import type { DanceMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/DanceMessageParser';
import type { FavouriteMembershipUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FavouriteMembershipUpdateMessageParser';
import type { UsersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UsersMessageParser';
import type { PetBreedingResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetBreedingResultMessageParser';
import type { PetCommandsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetCommandsMessageParser';
import type { PetFigureUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetFigureUpdateMessageParser';
import type { PetInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetInfoMessageParser';
import type { PetLevelUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetLevelUpdateMessageParser';
import type { PetStatusUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/pets/PetStatusUpdateMessageParser';
import type { UserNameChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/UserNameChangedMessageParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { NewFriendRequestEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendlist/NewFriendRequestEvent';
import { ConfirmBreedingRequestEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/ConfirmBreedingRequestEvent';
import { ConfirmBreedingResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/ConfirmBreedingResultEvent';
import { NestBreedingSuccessEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/NestBreedingSuccessEvent';
import { PetBreedingEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/pets/PetBreedingEvent';
import { DoorbellMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/DoorbellMessageEvent';
import { DanceMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/action/DanceMessageEvent';
import { BotErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/bots/BotErrorEvent';
import { FavoriteMembershipUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FavoriteMembershipUpdateMessageEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';
import { UserRemoveMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserRemoveMessageEvent';
import { UsersMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UsersMessageEvent';
import { PetBreedingResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetBreedingResultEvent';
import { PetCommandsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetCommandsMessageEvent';
import { PetFigureUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetFigureUpdateEvent';
import { PetInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetInfoMessageEvent';
import { PetLevelUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetLevelUpdateEvent';
import { PetPlacingErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetPlacingErrorEvent';
import { PetStatusUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetStatusUpdateEvent';
import { BlockUserUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/BlockUserUpdateMessageEvent';
import { HabboUserBadgesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboUserBadgesMessageEvent';
import { UserNameChangedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/UserNameChangedMessageEvent';
import { ConfirmBreedingRequestParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/ConfirmBreedingRequestParser';
import { ConfirmBreedingResultParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/ConfirmBreedingResultParser';
import { UserRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserRemoveMessageParser';
import { RoomSessionConfirmPetBreedingEvent } from '@/com/sulake/habbo/session/events/RoomSessionConfirmPetBreedingEvent';
import { RoomSessionConfirmPetBreedingResultEvent } from '@/com/sulake/habbo/session/events/RoomSessionConfirmPetBreedingResultEvent';
import { RoomSessionDanceEvent } from '@/com/sulake/habbo/session/events/RoomSessionDanceEvent';
import { RoomSessionDoorbellEvent } from '@/com/sulake/habbo/session/events/RoomSessionDoorbellEvent';
import { RoomSessionErrorMessageEvent } from '@/com/sulake/habbo/session/events/RoomSessionErrorMessageEvent';
import { RoomSessionFavouriteGroupUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionFavouriteGroupUpdateEvent';
import { RoomSessionFriendRequestEvent } from '@/com/sulake/habbo/session/events/RoomSessionFriendRequestEvent';
import { RoomSessionNestBreedingSuccessEvent } from '@/com/sulake/habbo/session/events/RoomSessionNestBreedingSuccessEvent';
import { RoomSessionPetBreedingEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetBreedingEvent';
import { RoomSessionPetBreedingResultEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetBreedingResultEvent';
import { RoomSessionPetCommandsUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetCommandsUpdateEvent';
import { RoomSessionPetFigureUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetFigureUpdateEvent';
import { RoomSessionPetInfoUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetInfoUpdateEvent';
import { RoomSessionPetLevelUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetLevelUpdateEvent';
import { RoomSessionPetStatusUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionPetStatusUpdateEvent';
import { RoomSessionUserBadgesEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserBadgesEvent';
import { RoomSessionUserDataUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserDataUpdateEvent';
import { RoomSessionUserFigureUpdateEvent } from '@/com/sulake/habbo/session/events/RoomSessionUserFigureUpdateEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';
import { PetInfo } from '@/com/sulake/habbo/session/PetInfo';
import { UserData } from '@/com/sulake/habbo/session/UserData';
import { RoomShakingEffect } from '@/com/sulake/room/utils/RoomShakingEffect';

export class RoomUsersHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::RoomUsersHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (param1 == null) {
            return;
        }
        param1.addMessageEvent(new UsersMessageEvent(this.onUsers));
        param1.addMessageEvent(new UserRemoveMessageEvent(this.onUserRemove));
        param1.addMessageEvent(new HabboUserBadgesMessageEvent(this.onUserBadges));
        param1.addMessageEvent(new DoorbellMessageEvent(this.onDoorbell));
        param1.addMessageEvent(new UserChangeMessageEvent(this.onUserChange));
        param1.addMessageEvent(new UserNameChangedMessageEvent(this.onUserNameChange));
        param1.addMessageEvent(new PetInfoMessageEvent(this.onPetInfo));
        param1.addMessageEvent(new PetCommandsMessageEvent(this.onEnabledPetCommands));
        param1.addMessageEvent(new PetPlacingErrorEvent(this.onPetPlacingError));
        param1.addMessageEvent(new PetFigureUpdateEvent(this.onPetFigureUpdate));
        param1.addMessageEvent(new PetBreedingResultEvent(this.onPetBreedingResult));
        param1.addMessageEvent(new PetBreedingEvent(this.onPetBreedingEvent));
        param1.addMessageEvent(new PetStatusUpdateEvent(this.onPetStatusUpdate));
        param1.addMessageEvent(new PetLevelUpdateEvent(this.onPetLevelUpdate));
        param1.addMessageEvent(new ConfirmBreedingRequestEvent(this.onConfirmPetBreeding));
        param1.addMessageEvent(new ConfirmBreedingResultEvent(this.onConfirmPetBreedingResult));
        param1.addMessageEvent(new NestBreedingSuccessEvent(this.onNestBreedingSuccess));
        param1.addMessageEvent(new BotErrorEvent(this.onBotError));
        param1.addMessageEvent(new NewFriendRequestEvent(this.onFriendRequest));
        param1.addMessageEvent(new DanceMessageEvent(this.onDance));
        param1.addMessageEvent(new FavoriteMembershipUpdateMessageEvent(this.onFavoriteMembershipUpdate));
        param1.addMessageEvent(new BlockUserUpdateMessageEvent(this.onBlockUserUpdate));
    }

    private onFavoriteMembershipUpdate = (param1: IMessageEvent): void => {
        let _loc5_: RoomSessionFavouriteGroupUpdateEvent = null;
        let _loc3_: FavouriteMembershipUpdateMessageParser = castTo(param1, FavoriteMembershipUpdateMessageEvent).getParser();
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: IUserData = _loc4_.userDataManager.getUserDataByIndex(_loc3_.roomIndex);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.groupID = "" + _loc3_.habboGroupId;
        _loc2_.groupName = _loc3_.habboGroupName;
        if (this.listener && this.listener.events) {
            _loc5_ = new RoomSessionFavouriteGroupUpdateEvent(_loc4_, _loc3_.roomIndex, _loc3_.habboGroupId, _loc3_.status, _loc3_.habboGroupName);
            this.listener.events.dispatchEvent(_loc5_);
        }
    };

    private onUsers = (param1: IMessageEvent): void => {
        let _loc4_: number = 0;
        let _loc8_: UserMessageData = null;
        let _loc2_: UserData = null;
        let _loc9_: UsersMessageEvent = param1 instanceof UsersMessageEvent ? param1 : null;
        if (_loc9_ == null) {
            return;
        }
        let _loc3_: UsersMessageParser = _loc9_.getParser();
        let _loc5_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc5_ == null) {
            return;
        }
        let _loc6_: boolean = false;
        let _loc7_: IUserData[] = new Array<IUserData>(0).fill(null);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.getUserCount()) {
            _loc8_ = _loc3_.getUser(_loc4_);
            _loc2_ = new UserData(_loc8_.roomIndex);
            _loc2_.name = _loc8_.name;
            _loc2_.custom = _loc8_.custom;
            _loc2_.achievementScore = _loc8_.achievementScore;
            _loc2_.badgesRank = _loc8_.badgesRank;
            _loc2_.figure = _loc8_.figure;
            _loc2_.type = _loc8_.userType;
            _loc2_.webID = _loc8_.webID;
            _loc2_.groupID = _loc8_.groupID;
            _loc2_.groupName = _loc8_.groupName;
            _loc2_.groupStatus = _loc8_.groupStatus;
            _loc2_.sex = _loc8_.sex;
            _loc2_.ownerId = _loc8_.ownerId;
            _loc2_.ownerName = _loc8_.ownerName;
            _loc2_.rarityLevel = _loc8_.rarityLevel;
            _loc2_.hasSaddle = _loc8_.hasSaddle;
            _loc2_.isRiding = _loc8_.isRiding;
            _loc2_.canBreed = _loc8_.canBreed;
            _loc2_.canHarvest = _loc8_.canHarvest;
            _loc2_.canRevive = _loc8_.canRevive;
            _loc2_.hasBreedingPermission = _loc8_.hasBreedingPermission;
            _loc2_.petLevel = _loc8_.petLevel;
            _loc2_.botSkills = _loc8_.botSkills;
            _loc2_.isModerator = _loc8_.isModerator;
            if (_loc8_.userType == 4 && _loc8_.ownerId == -1 && _loc8_.name == "Macklebee") {
                _loc6_ = true;
            }
            if (_loc5_.userDataManager.getUserData(_loc8_.roomIndex) == null) {
                _loc7_.push(_loc2_);
            }
            _loc5_.userDataManager.setUserData(_loc2_);
            _loc4_++;
        }
        if (_loc6_) {
            RoomShakingEffect.init(250, 5000);
            RoomShakingEffect.turnVisualizationOn();
        }
        this.listener.events.dispatchEvent(new RoomSessionUserDataUpdateEvent(_loc5_, _loc7_));
    };

    private onBlockUserUpdate = (param1: BlockUserUpdateMessageEvent): void => {
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IUserData = _loc3_.userDataManager.getUserData(param1.userId);
        if (_loc2_ != null) {
            _loc3_.userDataManager.markAsBlocked(_loc2_.roomObjectId, param1.result == 1);
        }
    };

    private onUserRemove = (param1: IMessageEvent): void => {
        let _loc4_: UserRemoveMessageEvent = param1 instanceof UserRemoveMessageEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: number = (asInstanceOf(_loc4_.getParser(), UserRemoveMessageParser)).id;
        _loc3_.userDataManager.removeUserDataByRoomIndex(_loc2_);
    };

    private onUserBadges = (param1: IMessageEvent): void => {
        let _loc2_: HabboUserBadgesMessageEvent = param1 instanceof HabboUserBadgesMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.userDataManager.setUserSelectedBadges(_loc2_.userId, _loc2_.selectedBadges);
        this.listener.events.dispatchEvent(new RoomSessionUserBadgesEvent(_loc3_, _loc2_.userId, _loc2_.selectedBadges));
    };

    private onDoorbell = (param1: IMessageEvent): void => {
        let _loc2_: DoorbellMessageEvent = param1 instanceof DoorbellMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        if (_loc2_.userName == "") {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent("RSDE_DOORBELL", _loc3_, _loc2_.userName));
    };

    private onUserChange = (param1: IMessageEvent): void => {
        let _loc3_: UserChangeMessageEvent = param1 instanceof UserChangeMessageEvent ? param1 : null;
        if (_loc3_ == null || this.listener == null) {
            return;
        }
        let _loc2_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc2_ == null || _loc2_.userDataManager == null) {
            return;
        }
        if (_loc3_.id >= 0) {
            _loc2_.userDataManager.updateFigure(_loc3_.id, _loc3_.figure, _loc3_.sex, false, false);
            _loc2_.userDataManager.updateCustom(_loc3_.id, _loc3_.customInfo);
            _loc2_.userDataManager.updateAchievementScore(_loc3_.id, _loc3_.achievementScore);
            _loc2_.userDataManager.updateBadgesRank(_loc3_.id, _loc3_.badgesRank);
            this.listener.events.dispatchEvent(new RoomSessionUserFigureUpdateEvent(_loc2_, _loc3_.id, _loc3_.figure, _loc3_.sex, _loc3_.customInfo, _loc3_.achievementScore, _loc3_.badgesRank));
        }
    };

    private onUserNameChange = (param1: IMessageEvent): void => {
        let _loc2_: UserNameChangedMessageEvent = param1 instanceof UserNameChangedMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: UserNameChangedMessageParser = _loc2_.getParser();
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        _loc4_.userDataManager.updateNameByIndex(_loc3_.id, _loc3_.newName);
    };

    private onPetInfo = (param1: IMessageEvent): void => {
        let _loc5_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: PetInfoMessageEvent = param1 instanceof PetInfoMessageEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PetInfoMessageParser = _loc3_.getParser();
        let _loc4_: PetInfo = new PetInfo();
        _loc4_.petId = _loc2_.petId;
        _loc4_.level = _loc2_.level;
        _loc4_.levelMax = _loc2_.maxLevel;
        _loc4_.experience = _loc2_.experience;
        _loc4_.experienceMax = _loc2_.experienceRequiredToLevel;
        _loc4_.energy = _loc2_.energy;
        _loc4_.energyMax = _loc2_.maxEnergy;
        _loc4_.nutrition = _loc2_.nutrition;
        _loc4_.nutritionMax = _loc2_.maxNutrition;
        _loc4_.ownerId = _loc2_.ownerId;
        _loc4_.ownerName = _loc2_.ownerName;
        _loc4_.respect = _loc2_.respect;
        _loc4_.age = _loc2_.age;
        _loc4_.breedId = _loc2_.breedId;
        _loc4_.hasFreeSaddle = _loc2_.hasFreeSaddle;
        _loc4_.isRiding = _loc2_.isRiding;
        _loc4_.canBreed = _loc2_.canBreed;
        _loc4_.canHarvest = _loc2_.canHarvest;
        _loc4_.rarityLevel = _loc2_.rarityLevel;
        _loc4_.canRevive = _loc2_.canRevive;
        _loc4_.skillTresholds = _loc2_.skillTresholds;
        _loc4_.accessRights = _loc2_.accessRights;
        _loc4_.maxWellBeingSeconds = _loc2_.maxWellBeingSeconds;
        _loc4_.remainingWellBeingSeconds = _loc2_.remainingWellBeingSeconds;
        _loc4_.remainingGrowingSeconds = _loc2_.remainingGrowingSeconds;
        _loc4_.hasBreedingPermission = _loc2_.hasBreedingPermission;
        this.listener.events.dispatchEvent(new RoomSessionPetInfoUpdateEvent(_loc5_, _loc4_));
    };

    private onPetFigureUpdate = (param1: IMessageEvent): void => {
        let _loc7_: PetFigureUpdateEvent = param1 instanceof PetFigureUpdateEvent ? param1 : null;
        if (_loc7_ == null) {
            return;
        }
        let _loc5_: PetFigureUpdateMessageParser = _loc7_.getParser();
        let _loc6_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc6_ == null) {
            return;
        }
        let _loc8_: string = _loc5_.figureData.figureString;
        let _loc9_: number = _loc5_.roomIndex;
        let _loc3_: number = _loc5_.petId;
        let _loc2_: boolean = _loc5_.hasSaddle;
        let _loc4_: boolean = _loc5_.isRiding;
        _loc6_.userDataManager.updateFigure(_loc9_, _loc8_, "", _loc2_, _loc4_);
        this.listener.events.dispatchEvent(new RoomSessionPetFigureUpdateEvent(_loc6_, _loc3_, _loc8_));
    };

    private onPetBreedingResult = (param1: IMessageEvent): void => {
        let _loc2_: PetBreedingResultEvent = param1 instanceof PetBreedingResultEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: PetBreedingResultMessageParser = _loc2_.getParser();
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionPetBreedingResultEvent(_loc4_, _loc3_.resultData, _loc3_.otherResultData));
    };

    private onConfirmPetBreeding = (param1: ConfirmBreedingRequestEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: ConfirmBreedingRequestParser = asInstanceOf(param1.parser, ConfirmBreedingRequestParser);
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionConfirmPetBreedingEvent(_loc3_, _loc2_.nestId, _loc2_.pet1, _loc2_.pet2, _loc2_.rarityCategories, _loc2_.resultPetType));
    };

    private onConfirmPetBreedingResult = (param1: ConfirmBreedingResultEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: ConfirmBreedingResultParser = asInstanceOf(param1.parser, ConfirmBreedingResultParser);
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionConfirmPetBreedingResultEvent(_loc3_, _loc2_.breedingNestStuffId, _loc2_.result));
    };

    private onNestBreedingSuccess = (param1: NestBreedingSuccessEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc2_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionNestBreedingSuccessEvent(_loc2_, param1.getParser().petId, param1.getParser().rarityCategory));
    };

    private onPetBreedingEvent = (param1: IMessageEvent): void => {
        let _loc4_: PetBreedingEvent = param1 instanceof PetBreedingEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: PetBreedingMessageParser = _loc4_.getParser();
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionPetBreedingEvent(_loc3_, _loc2_.state, _loc2_.ownPetId, _loc2_.otherPetId));
    };

    private onPetStatusUpdate = (param1: IMessageEvent): void => {
        let _loc8_: PetStatusUpdateEvent = param1 instanceof PetStatusUpdateEvent ? param1 : null;
        if (_loc8_ == null) {
            return;
        }
        let _loc4_: PetStatusUpdateMessageParser = _loc8_.getParser();
        let _loc5_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc5_ == null) {
            return;
        }
        let _loc9_: number = _loc4_.roomIndex;
        let _loc2_: number = _loc4_.petId;
        let _loc3_: boolean = _loc4_.canHarvest;
        let _loc10_: boolean = _loc4_.canRevive;
        let _loc7_: boolean = _loc4_.canBreed;
        let _loc6_: boolean = _loc4_.hasBreedingPermission;
        _loc5_.userDataManager.updatePetBreedingStatus(_loc9_, _loc7_, _loc3_, _loc10_, _loc6_);
        this.listener.events.dispatchEvent(new RoomSessionPetStatusUpdateEvent(_loc5_, _loc2_, _loc7_, _loc3_, _loc10_, _loc6_));
    };

    private onPetLevelUpdate = (param1: IMessageEvent): void => {
        let _loc2_: PetLevelUpdateEvent = param1 instanceof PetLevelUpdateEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: PetLevelUpdateMessageParser = _loc2_.getParser();
        let _loc6_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc6_ == null) {
            return;
        }
        let _loc7_: number = _loc4_.roomIndex;
        let _loc3_: number = _loc4_.petId;
        let _loc5_: number = _loc4_.level;
        _loc6_.userDataManager.updatePetLevel(_loc7_, _loc5_);
        this.listener.events.dispatchEvent(new RoomSessionPetLevelUpdateEvent(_loc6_, _loc3_, _loc5_));
    };

    private onEnabledPetCommands = (param1: IMessageEvent): void => {
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: PetCommandsMessageEvent = param1 instanceof PetCommandsMessageEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: PetCommandsMessageParser = _loc2_.getParser();
        if (_loc3_ != null) {
            this.listener.events.dispatchEvent(new RoomSessionPetCommandsUpdateEvent(_loc4_, _loc3_.petId, _loc3_.allCommands, _loc3_.enabledCommands));
        }
    };

    private onPetPlacingError = (param1: PetPlacingErrorEvent): void => {
        let _loc3_: string = null;
        if (param1 == null || param1.getParser() == null) {
            return;
        }
        let _loc2_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc2_ == null) {
            return;
        }
        switch (param1.getParser().errorCode) {
            case 0:
                _loc3_ = "RSEME_PETS_FORBIDDEN_IN_HOTEL";
                break;
            case 1:
                _loc3_ = "RSEME_PETS_FORBIDDEN_IN_FLAT";
                break;
            case 2:
                _loc3_ = "RSEME_MAX_PETS";
                break;
            case 3:
                _loc3_ = "RSEME_NO_FREE_TILES_FOR_PET";
                break;
            case 4:
                _loc3_ = "RSEME_SELECTED_TILE_NOT_FREE_FOR_PET";
                break;
            case 5:
                _loc3_ = "RSEME_MAX_NUMBER_OF_OWN_PETS";
        }
        if (_loc3_ != null) {
            this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(_loc3_, _loc2_));
        }
    };

    private onBotError = (param1: BotErrorEvent): void => {
        let _loc3_: string = null;
        if (param1 == null || param1.getParser() == null) {
            return;
        }
        let _loc2_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc2_ == null) {
            return;
        }
        switch (param1.getParser().errorCode) {
            case 0:
                _loc3_ = "RSEME_BOTS_FORBIDDEN_IN_HOTEL";
                break;
            case 1:
                _loc3_ = "RSEME_BOTS_FORBIDDEN_IN_FLAT";
                break;
            case 2:
                _loc3_ = "RSEME_BOT_LIMIT_REACHED";
                break;
            case 3:
                _loc3_ = "RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT";
                break;
            case 4:
                _loc3_ = "RSEME_BOT_NAME_NOT_ACCEPTED";
        }
        if (_loc3_ != null) {
            this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(_loc3_, _loc2_));
        }
    };

    private onFriendRequest = (param1: NewFriendRequestEvent): void => {
        if (!param1 || !this.listener || !this.listener.events) {
            return;
        }
        let _loc2_: NewFriendRequestMessageParser = param1.getParser();
        if (!_loc2_) {
            return;
        }
        let _loc4_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (!_loc4_) {
            return;
        }
        let _loc3_: FriendRequestData = _loc2_.req;
        if (!_loc3_) {
            return;
        }
        this.listener.events.dispatchEvent(new RoomSessionFriendRequestEvent(_loc4_, _loc3_.requestId, _loc3_.requestId, _loc3_.requesterName));
    };

    private onDance = (param1: DanceMessageEvent): void => {
        let _loc2_: DanceMessageParser = param1.getParser();
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        this.listener.events.dispatchEvent(new RoomSessionDanceEvent(_loc3_, _loc2_.userId, _loc2_.danceStyle));
    };
}
