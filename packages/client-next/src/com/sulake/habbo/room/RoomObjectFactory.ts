import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IRoomObjectFactory } from '@/com/sulake/room/IRoomObjectFactory';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { _SafeCls_6067 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6067';
import { _SafeCls_6068 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6068';
import { AvatarLogic } from '@/com/sulake/habbo/room/object/logic/AvatarLogic';
import { FurnitureAchievementResolutionLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureAchievementResolutionLogic';
import { FurnitureAreaHideLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureAreaHideLogic';
import { FurnitureBadgeDisplayLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureBadgeDisplayLogic';
import { FurnitureChangeStateWhenStepOnLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureChangeStateWhenStepOnLogic';
import { FurnitureClothingChangeLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureClothingChangeLogic';
import { FurnitureCoinsChestLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCoinsChestLogic';
import { FurnitureCounterClockLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCounterClockLogic';
import { FurnitureCrackableLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCrackableLogic';
import { FurnitureCraftingGizmoLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCraftingGizmoLogic';
import { FurnitureCreditLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCreditLogic';
import { FurnitureCuckooClockLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCuckooClockLogic';
import { FurnitureCustomStackHeightLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureCustomStackHeightLogic';
import { FurnitureDiceLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureDiceLogic';
import { FurnitureEcotronBoxLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureEcotronBoxLogic';
import { FurnitureEditableInternalLinkLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureEditableInternalLinkLogic';
import { FurnitureEditableRoomLinkLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureEditableRoomLinkLogic';
import { FurnitureEffectBoxLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureEffectBoxLogic';
import { FurnitureExternalImageLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureExternalImageLogic';
import { FurnitureFireworksLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureFireworksLogic';
import { FurnitureFloorHoleLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureFloorHoleLogic';
import { FurnitureFurniChestLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureFurniChestLogic';
import { FurnitureGuildCustomizedLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureGuildCustomizedLogic';
import { FurnitureGuildForumTerminalLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureGuildForumTerminalLogic';
import { FurnitureHabboWheelLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureHabboWheelLogic';
import { FurnitureHalloweenLovelockLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureHalloweenLovelockLogic';
import { FurnitureHighScoreLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureHighScoreLogic';
import { FurnitureHockeyScoreLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureHockeyScoreLogic';
import { FurnitureIceStormLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureIceStormLogic';
import { FurnitureInternalLinkLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureInternalLinkLogic';
import { FurnitureJukeboxLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureJukeboxLogic';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';
import { FurnitureLovelockLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLovelockLogic';
import { FurnitureMannequinLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMannequinLogic';
import { FurnitureMonsterplantSeedLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMonsterplantSeedLogic';
import { FurnitureMultiHeightLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiHeightLogic';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';
import { FurnitureMysteryBoxLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMysteryBoxLogic';
import { FurnitureMysteryTrophyLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMysteryTrophyLogic';
import { FurnitureNftCreditLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureNftCreditLogic';
import { FurnitureNftRewardBoxLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureNftRewardBoxLogic';
import { FurnitureOneWayDoorLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureOneWayDoorLogic';
import { FurniturePetProductLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePetProductLogic';
import { FurniturePlaceholderLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePlaceholderLogic';
import { FurniturePlanetSystemLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePlanetSystemLogic';
import { FurniturePresentLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePresentLogic';
import { FurniturePurchasableClothingLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePurchasableClothingLogic';
import { FurniturePushableLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurniturePushableLogic';
import { FurnitureRandomStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRandomStateLogic';
import { FurnitureRandomTeleportLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRandomTeleportLogic';
import { FurnitureRentableSpaceLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRentableSpaceLogic';
import { FurnitureRoomBackgroundColorLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomBackgroundColorLogic';
import { FurnitureRoomBackgroundLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomBackgroundLogic';
import { FurnitureRoomBillboardLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomBillboardLogic';
import { FurnitureRoomDimmerLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomDimmerLogic';
import { FurnitureScoreBoardLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureScoreBoardLogic';
import { FurnitureSongDiskLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureSongDiskLogic';
import { FurnitureSoundBlockLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureSoundBlockLogic';
import { FurnitureSoundMachineLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureSoundMachineLogic';
import { FurnitureStickieLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureStickieLogic';
import { FurnitureTrophyLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureTrophyLogic';
import { FurnitureVimeoLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureVimeoLogic';
import { FurnitureVoteCounterLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureVoteCounterLogic';
import { FurnitureVoteMajorityLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureVoteMajorityLogic';
import { FurnitureWelcomeGiftLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureWelcomeGiftLogic';
import { FurnitureWildWestWantedLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureWildWestWantedLogic';
import { FurnitureWindowLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureWindowLogic';
import { FurnitureYoutubeLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureYoutubeLogic';
import { SnowballLogic } from '@/com/sulake/habbo/room/object/logic/game/SnowballLogic';
import { SnowSplashLogic } from '@/com/sulake/habbo/room/object/logic/game/SnowSplashLogic';
import { PetLogic } from '@/com/sulake/habbo/room/object/logic/PetLogic';
import { RoomLogic } from '@/com/sulake/habbo/room/object/logic/room/RoomLogic';
import { RoomTileCursorLogic } from '@/com/sulake/habbo/room/object/logic/room/RoomTileCursorLogic';
import { SelectionArrowLogic } from '@/com/sulake/habbo/room/object/logic/room/SelectionArrowLogic';
import { VariableFxLogicConfig } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicConfig';
import { isIRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import { RoomObjectManager } from '@/com/sulake/room/RoomObjectManager';

export class RoomObjectFactory extends Component implements IRoomObjectFactory {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomObjectFactory'); }

    private _createdLogicTypes: UtilsMap = new UtilsMap();
    private _trackedEventTypes: UtilsMap = new UtilsMap();
    private _SafeStr_14410: UtilsMap = new UtilsMap();
    private _SafeStr_14411: UtilsMap = new UtilsMap();
    private _objectEventListeners: any[] = [];

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }

    public addObjectEventListener(param1: (...args: any[]) => any): void {
        let _loc2_: any = null;
        if (this._objectEventListeners.indexOf(param1) < 0) {
            this._objectEventListeners.push(param1);
            if (param1 != null) {
                for (_loc2_ of this._trackedEventTypes.getKeys() ?? []) {
                    this.events.addEventListener(_loc2_, param1);
                }
            }
        }
    }

    public removeObjectEventListener(param1: (...args: any[]) => any): void {
        let _loc3_: any = null;
        let _loc2_: number = this._objectEventListeners.indexOf(param1);
        if (_loc2_ >= 0) {
            this._objectEventListeners.splice(_loc2_, 1);
            if (param1 != null) {
                for (_loc3_ of this._trackedEventTypes.getKeys() ?? []) {
                    this.events.removeEventListener(_loc3_, param1);
                }
            }
        }
    }

    private addTrackedEventType(param1: string): void {
        if (this._trackedEventTypes.getValue(param1) == null) {
            this._trackedEventTypes.add(param1, true);
            for (const _loc2_ of this._objectEventListeners ?? []) {
                if (_loc2_ != null) {
                    this.events.addEventListener(param1, _loc2_);
                }
            }
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_14410 != null) {
            for (const _loc1_ of this._SafeStr_14410.getValues() ?? []) {
                _loc1_.dispose();
            }
            this._SafeStr_14410.dispose();
            this._SafeStr_14410 = null;
        }
        if (this._SafeStr_14411 != null) {
            for (const _loc2_ of this._SafeStr_14411.getValues() ?? []) {
                _loc2_.dispose();
            }
            this._SafeStr_14411.dispose();
            this._SafeStr_14411 = null;
        }
        super.dispose();
    }

    public createRoomObjectLogic(param1: string, param2: string = null): IRoomObjectEventHandler {
        let _loc7_: IRoomObjectEventHandler = null;
        let _loc3_: any[] = null;
        let _loc4_: any = null;
        switch (param1) {
            case "furniture_basic":
                _loc4_ = FurnitureLogic;
                break;
            case "furniture_multistate":
                _loc4_ = FurnitureMultiStateLogic;
                break;
            case "furniture_multiheight":
                _loc4_ = FurnitureMultiHeightLogic;
                break;
            case "furniture_placeholder":
                _loc4_ = FurniturePlaceholderLogic;
                break;
            case "user":
            case "bot":
            case "rentable_bot":
                _loc4_ = AvatarLogic;
                break;
            case "pet":
                _loc4_ = PetLogic;
                break;
            case "furniture_randomstate":
                _loc4_ = FurnitureRandomStateLogic;
                break;
            case "furniture_credit":
                _loc4_ = FurnitureCreditLogic;
                break;
            case "furniture_stickie":
                _loc4_ = FurnitureStickieLogic;
                break;
            case "furniture_external_image_wallitem":
                _loc4_ = FurnitureExternalImageLogic;
                break;
            case "furniture_present":
                _loc4_ = FurniturePresentLogic;
                break;
            case "furniture_trophy":
                _loc4_ = FurnitureTrophyLogic;
                break;
            case "furniture_furnichest":
                _loc4_ = FurnitureFurniChestLogic;
                break;
            case "furniture_coinschest":
                _loc4_ = FurnitureCoinsChestLogic;
                break;
            case "furniture_ecotron_box":
                _loc4_ = FurnitureEcotronBoxLogic;
                break;
            case "furniture_dice":
                _loc4_ = FurnitureDiceLogic;
                break;
            case "furniture_hockey_score":
                _loc4_ = FurnitureHockeyScoreLogic;
                break;
            case "furniture_habbowheel":
                _loc4_ = FurnitureHabboWheelLogic;
                break;
            case "furniture_one_way_door":
                _loc4_ = FurnitureOneWayDoorLogic;
                break;
            case "furniture_planet_system":
                _loc4_ = FurniturePlanetSystemLogic;
                break;
            case "furniture_window":
                _loc4_ = FurnitureWindowLogic;
                break;
            case "furniture_roomdimmer":
                _loc4_ = FurnitureRoomDimmerLogic;
                break;
            case "tile_cursor":
                _loc4_ = RoomTileCursorLogic;
                break;
            case "selection_arrow":
                _loc4_ = SelectionArrowLogic;
                break;
            case "furniture_sound_machine":
                _loc4_ = FurnitureSoundMachineLogic;
                break;
            case "furniture_jukebox":
                _loc4_ = FurnitureJukeboxLogic;
                break;
            case "furniture_crackable":
                _loc4_ = FurnitureCrackableLogic;
                break;
            case "furniture_song_disk":
                _loc4_ = FurnitureSongDiskLogic;
                break;
            case "furniture_pushable":
                _loc4_ = FurniturePushableLogic;
                break;
            case "furniture_clothing_change":
                _loc4_ = FurnitureClothingChangeLogic;
                break;
            case "furniture_counter_clock":
                _loc4_ = FurnitureCounterClockLogic;
                break;
            case "furniture_score":
                _loc4_ = FurnitureScoreBoardLogic;
                break;
            case "furniture_es":
                _loc4_ = FurnitureIceStormLogic;
                break;
            case "furniture_fireworks":
                _loc4_ = FurnitureFireworksLogic;
                break;
            case "furniture_bb":
                _loc4_ = FurnitureRoomBillboardLogic;
                break;
            case "furniture_bg":
                _loc4_ = FurnitureRoomBackgroundLogic;
                break;
            case "furniture_welcome_gift":
                _loc4_ = FurnitureWelcomeGiftLogic;
                break;
            case "furniture_floor_hole":
                _loc4_ = FurnitureFloorHoleLogic;
                break;
            case "room":
                _loc4_ = RoomLogic;
                break;
            case "furniture_mannequin":
                _loc4_ = FurnitureMannequinLogic;
                break;
            case "furniture_guild_customized":
                _loc4_ = FurnitureGuildCustomizedLogic;
                break;
            case "furniture_group_forum_terminal":
                _loc4_ = FurnitureGuildForumTerminalLogic;
                break;
            case "furniture_pet_customization":
                _loc4_ = FurniturePetProductLogic;
                break;
            case "game_snowball":
                _loc4_ = SnowballLogic;
                break;
            case "game_snowsplash":
                _loc4_ = SnowSplashLogic;
                break;
            case "furniture_cuckoo_clock":
                _loc4_ = FurnitureCuckooClockLogic;
                break;
            case "furniture_vote_counter":
                _loc4_ = FurnitureVoteCounterLogic;
                break;
            case "furniture_vote_majority":
                _loc4_ = FurnitureVoteMajorityLogic;
                break;
            case "furniture_soundblock":
                _loc4_ = FurnitureSoundBlockLogic;
                break;
            case "furniture_random_teleport":
                _loc4_ = FurnitureRandomTeleportLogic;
                break;
            case "furniture_monsterplant_seed":
                _loc4_ = FurnitureMonsterplantSeedLogic;
                break;
            case "furniture_purchasable_clothing":
                _loc4_ = FurniturePurchasableClothingLogic;
                break;
            case "furniture_background_color":
                _loc4_ = FurnitureRoomBackgroundColorLogic;
                break;
            case "furniture_area_hide":
                _loc4_ = FurnitureAreaHideLogic;
                break;
            case "furniture_mysterybox":
                _loc4_ = FurnitureMysteryBoxLogic;
                break;
            case "furniture_effectbox":
                _loc4_ = FurnitureEffectBoxLogic;
                break;
            case "furniture_mysterytrophy":
                _loc4_ = FurnitureMysteryTrophyLogic;
                break;
            case "furniture_achievement_resolution":
                _loc4_ = FurnitureAchievementResolutionLogic;
                break;
            case "furniture_lovelock":
                _loc4_ = FurnitureLovelockLogic;
                break;
            case "furniture_wildwest_wanted":
                _loc4_ = FurnitureWildWestWantedLogic;
                break;
            case "furniture_hween_lovelock":
                _loc4_ = FurnitureHalloweenLovelockLogic;
                break;
            case "furniture_badge_display":
                _loc4_ = FurnitureBadgeDisplayLogic;
                break;
            case "furniture_high_score":
                _loc4_ = FurnitureHighScoreLogic;
                break;
            case "furniture_internal_link":
                _loc4_ = FurnitureInternalLinkLogic;
                break;
            case "furniture_editable_internal_link":
                _loc4_ = FurnitureEditableInternalLinkLogic;
                break;
            case "furniture_editable_room_link":
                _loc4_ = FurnitureEditableRoomLinkLogic;
                break;
            case "furniture_custom_stack_height":
                _loc4_ = FurnitureCustomStackHeightLogic;
                break;
            case "furniture_youtube":
                _loc4_ = FurnitureYoutubeLogic;
                break;
            case "furniture_rentable_space":
                _loc4_ = FurnitureRentableSpaceLogic;
                break;
            case "furniture_change_state_when_step_on":
                _loc4_ = FurnitureChangeStateWhenStepOnLogic;
                break;
            case "furniture_vimeo":
                _loc4_ = FurnitureVimeoLogic;
                break;
            case "furniture_crafting_gizmo":
                _loc4_ = FurnitureCraftingGizmoLogic;
                break;
            case "furniture_nft_credit":
                _loc4_ = FurnitureNftCreditLogic;
                break;
            case "furniture_nft_reward_box":
                _loc4_ = FurnitureNftRewardBoxLogic;
        }
        if (_loc4_ == null) {
            return null;
        }
        let _loc5_: any = new _loc4_();
        if (isIRoomObjectEventHandler(_loc5_)) {
            if (_loc5_ instanceof AvatarLogic && param2 != null) {
                castTo(_loc5_, AvatarLogic).roomData = this.getAvatarLogicRoomData(param2);
            } else if (_loc5_ instanceof PetLogic && param2 != null) {
                castTo(_loc5_, PetLogic).roomData = this.getAvatarLogicRoomData(param2);
            } else if (_loc5_ instanceof FurnitureLogic && param2 != null) {
                castTo(_loc5_, FurnitureLogic).roomData = this.getFurnitureLogicRoomData(param2);
            }
            _loc7_ = isIRoomObjectEventHandler(_loc5_) ? _loc5_ : null;
            _loc7_.eventDispatcher = this.events;
            if (this._createdLogicTypes.getValue(param1) == null) {
                this._createdLogicTypes.add(param1, true);
                _loc3_ = _loc7_.getEventTypes();
                for (const _loc6_ of _loc3_ ?? []) {
                    this.addTrackedEventType(stringOrNull(_loc6_));
                }
            }
            return _loc7_;
        }
        return null;
    }

    private getAvatarLogicRoomData(param1: string): _SafeCls_6068 {
        let _loc2_: _SafeCls_6068 = asInstanceOf(this._SafeStr_14410.getValue(param1), _SafeCls_6068);
        if (_loc2_ == null) {
            _loc2_ = new _SafeCls_6068();
            this._SafeStr_14410.add(param1, _loc2_);
        }
        return _loc2_;
    }

    private getFurnitureLogicRoomData(param1: string): _SafeCls_6067 {
        let _loc2_: _SafeCls_6067 = asInstanceOf(this._SafeStr_14411.getValue(param1), _SafeCls_6067);
        if (_loc2_ == null) {
            _loc2_ = new _SafeCls_6067();
            this._SafeStr_14411.add(param1, _loc2_);
        }
        return _loc2_;
    }

    public disposeRoomLogicData(param1: string): void {
        let _loc2_: _SafeCls_6068 = asInstanceOf(this._SafeStr_14410.remove(param1), _SafeCls_6068);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
        let _loc3_: _SafeCls_6067 = asInstanceOf(this._SafeStr_14411.remove(param1), _SafeCls_6067);
        if (_loc3_ != null) {
            _loc3_.dispose();
        }
    }

    public updateVariableFxConfigs(param1: string, param2: any[]): void {
        let _loc3_: any = null;
        for (_loc3_ of param2 ?? []) {
            if (_loc3_.isUserFx) {
                this.getAvatarLogicRoomData(param1).variableFxLogicManager.upsertConfig(new VariableFxLogicConfig(_loc3_.configId | 0, _loc3_.isUserFx, _loc3_.showMode | 0, _loc3_._SafeStr_14412 | 0, _loc3_.showOnMouseHover, _loc3_.showDuration | 0));
            } else {
                this.getFurnitureLogicRoomData(param1).variableFxLogicManager.upsertConfig(new VariableFxLogicConfig(_loc3_.configId | 0, _loc3_.isUserFx, _loc3_.showMode | 0, _loc3_._SafeStr_14412 | 0, _loc3_.showOnMouseHover, _loc3_.showDuration | 0));
            }
        }
    }

    public removeVariableFxConfigs(param1: string, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc3_: _SafeCls_6068 = this.getAvatarLogicRoomData(param1);
        let _loc5_: _SafeCls_6067 = this.getFurnitureLogicRoomData(param1);
        for (_loc4_ of param2 ?? []) {
            _loc3_.variableFxLogicManager.removeConfig(_loc4_);
            _loc5_.variableFxLogicManager.removeConfig(_loc4_);
        }
    }

    public createRoomObjectManager(): IRoomObjectManager {
        return new RoomObjectManager();
    }
}
