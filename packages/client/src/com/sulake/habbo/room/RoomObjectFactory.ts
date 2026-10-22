import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IRoomObjectFactory } from '@/com/sulake/room/IRoomObjectFactory';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
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
import { isIRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import { RoomObjectManager } from '@/com/sulake/room/RoomObjectManager';

export class RoomObjectFactory extends Component implements IRoomObjectFactory {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomObjectFactory'); }

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
    }

    private _createdLogicTypes: UtilsMap = new UtilsMap();
    private _trackedEventTypes: UtilsMap = new UtilsMap();
    private _objectEventListeners: any[] = [];

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

    public createRoomObjectLogic(param1: string): IRoomObjectEventHandler {
        let _loc6_: IRoomObjectEventHandler = null;
        let _loc2_: any[] = null;
        let _loc3_: any = null;
        switch (param1) {
            case "furniture_basic":
                _loc3_ = FurnitureLogic;
                break;
            case "furniture_multistate":
                _loc3_ = FurnitureMultiStateLogic;
                break;
            case "furniture_multiheight":
                _loc3_ = FurnitureMultiHeightLogic;
                break;
            case "furniture_placeholder":
                _loc3_ = FurniturePlaceholderLogic;
                break;
            case "user":
            case "bot":
            case "rentable_bot":
                _loc3_ = AvatarLogic;
                break;
            case "pet":
                _loc3_ = PetLogic;
                break;
            case "furniture_randomstate":
                _loc3_ = FurnitureRandomStateLogic;
                break;
            case "furniture_credit":
                _loc3_ = FurnitureCreditLogic;
                break;
            case "furniture_stickie":
                _loc3_ = FurnitureStickieLogic;
                break;
            case "furniture_external_image_wallitem":
                _loc3_ = FurnitureExternalImageLogic;
                break;
            case "furniture_present":
                _loc3_ = FurniturePresentLogic;
                break;
            case "furniture_trophy":
                _loc3_ = FurnitureTrophyLogic;
                break;
            case "furniture_furnichest":
                _loc3_ = FurnitureFurniChestLogic;
                break;
            case "furniture_coinschest":
                _loc3_ = FurnitureCoinsChestLogic;
                break;
            case "furniture_ecotron_box":
                _loc3_ = FurnitureEcotronBoxLogic;
                break;
            case "furniture_dice":
                _loc3_ = FurnitureDiceLogic;
                break;
            case "furniture_hockey_score":
                _loc3_ = FurnitureHockeyScoreLogic;
                break;
            case "furniture_habbowheel":
                _loc3_ = FurnitureHabboWheelLogic;
                break;
            case "furniture_one_way_door":
                _loc3_ = FurnitureOneWayDoorLogic;
                break;
            case "furniture_planet_system":
                _loc3_ = FurniturePlanetSystemLogic;
                break;
            case "furniture_window":
                _loc3_ = FurnitureWindowLogic;
                break;
            case "furniture_roomdimmer":
                _loc3_ = FurnitureRoomDimmerLogic;
                break;
            case "tile_cursor":
                _loc3_ = RoomTileCursorLogic;
                break;
            case "selection_arrow":
                _loc3_ = SelectionArrowLogic;
                break;
            case "furniture_sound_machine":
                _loc3_ = FurnitureSoundMachineLogic;
                break;
            case "furniture_jukebox":
                _loc3_ = FurnitureJukeboxLogic;
                break;
            case "furniture_crackable":
                _loc3_ = FurnitureCrackableLogic;
                break;
            case "furniture_song_disk":
                _loc3_ = FurnitureSongDiskLogic;
                break;
            case "furniture_pushable":
                _loc3_ = FurniturePushableLogic;
                break;
            case "furniture_clothing_change":
                _loc3_ = FurnitureClothingChangeLogic;
                break;
            case "furniture_counter_clock":
                _loc3_ = FurnitureCounterClockLogic;
                break;
            case "furniture_score":
                _loc3_ = FurnitureScoreBoardLogic;
                break;
            case "furniture_es":
                _loc3_ = FurnitureIceStormLogic;
                break;
            case "furniture_fireworks":
                _loc3_ = FurnitureFireworksLogic;
                break;
            case "furniture_bb":
                _loc3_ = FurnitureRoomBillboardLogic;
                break;
            case "furniture_bg":
                _loc3_ = FurnitureRoomBackgroundLogic;
                break;
            case "furniture_welcome_gift":
                _loc3_ = FurnitureWelcomeGiftLogic;
                break;
            case "furniture_floor_hole":
                _loc3_ = FurnitureFloorHoleLogic;
                break;
            case "room":
                _loc3_ = RoomLogic;
                break;
            case "furniture_mannequin":
                _loc3_ = FurnitureMannequinLogic;
                break;
            case "furniture_guild_customized":
                _loc3_ = FurnitureGuildCustomizedLogic;
                break;
            case "furniture_group_forum_terminal":
                _loc3_ = FurnitureGuildForumTerminalLogic;
                break;
            case "furniture_pet_customization":
                _loc3_ = FurniturePetProductLogic;
                break;
            case "game_snowball":
                _loc3_ = SnowballLogic;
                break;
            case "game_snowsplash":
                _loc3_ = SnowSplashLogic;
                break;
            case "furniture_cuckoo_clock":
                _loc3_ = FurnitureCuckooClockLogic;
                break;
            case "furniture_vote_counter":
                _loc3_ = FurnitureVoteCounterLogic;
                break;
            case "furniture_vote_majority":
                _loc3_ = FurnitureVoteMajorityLogic;
                break;
            case "furniture_soundblock":
                _loc3_ = FurnitureSoundBlockLogic;
                break;
            case "furniture_random_teleport":
                _loc3_ = FurnitureRandomTeleportLogic;
                break;
            case "furniture_monsterplant_seed":
                _loc3_ = FurnitureMonsterplantSeedLogic;
                break;
            case "furniture_purchasable_clothing":
                _loc3_ = FurniturePurchasableClothingLogic;
                break;
            case "furniture_background_color":
                _loc3_ = FurnitureRoomBackgroundColorLogic;
                break;
            case "furniture_area_hide":
                _loc3_ = FurnitureAreaHideLogic;
                break;
            case "furniture_mysterybox":
                _loc3_ = FurnitureMysteryBoxLogic;
                break;
            case "furniture_effectbox":
                _loc3_ = FurnitureEffectBoxLogic;
                break;
            case "furniture_mysterytrophy":
                _loc3_ = FurnitureMysteryTrophyLogic;
                break;
            case "furniture_achievement_resolution":
                _loc3_ = FurnitureAchievementResolutionLogic;
                break;
            case "furniture_lovelock":
                _loc3_ = FurnitureLovelockLogic;
                break;
            case "furniture_wildwest_wanted":
                _loc3_ = FurnitureWildWestWantedLogic;
                break;
            case "furniture_hween_lovelock":
                _loc3_ = FurnitureHalloweenLovelockLogic;
                break;
            case "furniture_badge_display":
                _loc3_ = FurnitureBadgeDisplayLogic;
                break;
            case "furniture_high_score":
                _loc3_ = FurnitureHighScoreLogic;
                break;
            case "furniture_internal_link":
                _loc3_ = FurnitureInternalLinkLogic;
                break;
            case "furniture_editable_internal_link":
                _loc3_ = FurnitureEditableInternalLinkLogic;
                break;
            case "furniture_editable_room_link":
                _loc3_ = FurnitureEditableRoomLinkLogic;
                break;
            case "furniture_custom_stack_height":
                _loc3_ = FurnitureCustomStackHeightLogic;
                break;
            case "furniture_youtube":
                _loc3_ = FurnitureYoutubeLogic;
                break;
            case "furniture_rentable_space":
                _loc3_ = FurnitureRentableSpaceLogic;
                break;
            case "furniture_change_state_when_step_on":
                _loc3_ = FurnitureChangeStateWhenStepOnLogic;
                break;
            case "furniture_vimeo":
                _loc3_ = FurnitureVimeoLogic;
                break;
            case "furniture_crafting_gizmo":
                _loc3_ = FurnitureCraftingGizmoLogic;
                break;
            case "furniture_nft_credit":
                _loc3_ = FurnitureNftCreditLogic;
                break;
            case "furniture_nft_reward_box":
                _loc3_ = FurnitureNftRewardBoxLogic;
        }
        if (_loc3_ == null) {
            return null;
        }
        let _loc4_: any = new _loc3_();
        if (isIRoomObjectEventHandler(_loc4_)) {
            _loc6_ = isIRoomObjectEventHandler(_loc4_) ? _loc4_ : null;
            _loc6_.eventDispatcher = this.events;
            if (this._createdLogicTypes.getValue(param1) == null) {
                this._createdLogicTypes.add(param1, true);
                _loc2_ = _loc6_.getEventTypes();
                for (const _loc5_ of _loc2_ ?? []) {
                    this.addTrackedEventType(stringOrNull(_loc5_));
                }
            }
            return _loc6_;
        }
        return null;
    }

    public createRoomObjectManager(): IRoomObjectManager {
        return new RoomObjectManager();
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
}
