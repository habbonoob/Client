import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IRoomObjectVisualizationFactory } from '@/com/sulake/room/object/IRoomObjectVisualizationFactory';
import type { IRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import { AvatarVisualizationData } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualizationData';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import { AnimatedFurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualizationData';
import { AvatarFurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/AvatarFurnitureVisualizationData';
import { FurnitureBadgeDisplayVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureBadgeDisplayVisualization';
import { FurnitureBottleVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureBottleVisualization';
import { FurnitureBuilderPlaceholderVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureBuilderPlaceholderVisualization';
import { FurnitureCoinsChestVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureCoinsChestVisualization';
import { FurnitureCounterClockVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureCounterClockVisualization';
import { FurnitureCuboidVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureCuboidVisualization';
import { FurnitureExternalImageVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureExternalImageVisualization';
import { FurnitureFireworksVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureFireworksVisualization';
import { FurnitureFurniChestVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureFurniChestVisualization';
import { FurnitureGiftWrappedFireworksVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureGiftWrappedFireworksVisualization';
import { FurnitureGiftWrappedVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureGiftWrappedVisualization';
import { FurnitureGuildCustomizedVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureGuildCustomizedVisualization';
import { FurnitureGuildIsometricBadgeVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureGuildIsometricBadgeVisualization';
import { FurnitureHabboWheelVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureHabboWheelVisualization';
import { FurnitureMannequinVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureMannequinVisualization';
import { FurniturePartyBeamerVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurniturePartyBeamerVisualization';
import { FurniturePlanetSystemVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurniturePlanetSystemVisualization';
import { FurniturePosterVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurniturePosterVisualization';
import { FurnitureQueueTileVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureQueueTileVisualization';
import { FurnitureResettingAnimatedVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureResettingAnimatedVisualization';
import { FurnitureRoomBackgroundVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureRoomBackgroundVisualization';
import { FurnitureRoomBillboardVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureRoomBillboardVisualization';
import { FurnitureScoreBoardVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureScoreBoardVisualization';
import { FurnitureSoundBlockVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureSoundBlockVisualization';
import { FurnitureStickieVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureStickieVisualization';
import { FurnitureValRandomizerVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureValRandomizerVisualization';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';
import { FurnitureVoteCounterVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVoteCounterVisualization';
import { FurnitureVoteMajorityVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVoteMajorityVisualization';
import { FurnitureWaterAreaVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureWaterAreaVisualization';
import { FurnitureYoutubeVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureYoutubeVisualization';
import { SnowballVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/SnowballVisualizationData';
import { SnowballVisualization } from '@/com/sulake/habbo/room/object/visualization/game/SnowballVisualization';
import { SnowSplashVisualization } from '@/com/sulake/habbo/room/object/visualization/game/SnowSplashVisualization';
import { AnimatedPetVisualization } from '@/com/sulake/habbo/room/object/visualization/pet/AnimatedPetVisualization';
import { AnimatedPetVisualizationData } from '@/com/sulake/habbo/room/object/visualization/pet/AnimatedPetVisualizationData';
import { RoomVisualization } from '@/com/sulake/habbo/room/object/visualization/room/RoomVisualization';
import { RoomVisualizationData } from '@/com/sulake/habbo/room/object/visualization/room/RoomVisualizationData';
import { TileCursorVisualization } from '@/com/sulake/habbo/room/object/visualization/room/TileCursorVisualization';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { isIRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import { isIRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { GraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/GraphicAssetCollection';

export class RoomObjectVisualizationFactory extends Component implements IRoomObjectVisualizationFactory {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectVisualizationFactory'); }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_7002 = param2 == 0;
        this._SafeStr_3283 = new UtilsMap();
    }

    declare private _habboAvatar: IAvatarRenderManager;

    declare private _SafeStr_3283: UtilsMap;

    declare private _SafeStr_7002: boolean;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
                this._habboAvatar = param1;
            }, false)]);
    }

    public override dispose(): void {
        let _loc1_: IRoomObjectVisualizationData = null;
        let _loc2_: number = 0;
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3283 != null) {
            _loc1_ = null;
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_3283.length) {
                _loc1_ = asGuarded(this._SafeStr_3283.getWithIndex(_loc2_), isIRoomObjectVisualizationData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._SafeStr_3283.dispose();
            this._SafeStr_3283 = null;
        }
        super.dispose();
    }

    public createRoomObjectVisualization(param1: string): IRoomObjectGraphicVisualization {
        let _loc3_: any = null;
        switch (param1) {
            case "room":
                _loc3_ = RoomVisualization;
                break;
            case "tile_cursor":
                _loc3_ = TileCursorVisualization;
                break;
            case "user":
                _loc3_ = AvatarVisualization;
                break;
            case "bot":
            case "rentable_bot":
                _loc3_ = AvatarVisualization;
                break;
            case "pet_animated":
                _loc3_ = AnimatedPetVisualization;
                break;
            case "furniture_static":
                _loc3_ = FurnitureVisualization;
                break;
            case "furniture_animated":
                _loc3_ = AnimatedFurnitureVisualization;
                break;
            case "furniture_resetting_animated":
                _loc3_ = FurnitureResettingAnimatedVisualization;
                break;
            case "furniture_poster":
                _loc3_ = FurniturePosterVisualization;
                break;
            case "furniture_habbowheel":
                _loc3_ = FurnitureHabboWheelVisualization;
                break;
            case "furniture_val_randomizer":
                _loc3_ = FurnitureValRandomizerVisualization;
                break;
            case "furniture_bottle":
                _loc3_ = FurnitureBottleVisualization;
                break;
            case "furniture_furnichest":
                _loc3_ = FurnitureFurniChestVisualization;
                break;
            case "furniture_coinschest":
                _loc3_ = FurnitureCoinsChestVisualization;
                break;
            case "furniture_planet_system":
                _loc3_ = FurniturePlanetSystemVisualization;
                break;
            case "furniture_queue_tile":
                _loc3_ = FurnitureQueueTileVisualization;
                break;
            case "furniture_party_beamer":
                _loc3_ = FurniturePartyBeamerVisualization;
                break;
            case "furniture_cuboid":
                _loc3_ = FurnitureCuboidVisualization;
                break;
            case "furniture_gift_wrapped":
                _loc3_ = FurnitureGiftWrappedVisualization;
                break;
            case "furniture_counter_clock":
                _loc3_ = FurnitureCounterClockVisualization;
                break;
            case "furniture_water_area":
                _loc3_ = FurnitureWaterAreaVisualization;
                break;
            case "furniture_score_board":
                _loc3_ = FurnitureScoreBoardVisualization;
                break;
            case "furniture_fireworks":
                _loc3_ = FurnitureFireworksVisualization;
                break;
            case "furniture_gift_wrapped_fireworks":
                _loc3_ = FurnitureGiftWrappedFireworksVisualization;
                break;
            case "furniture_bb":
                _loc3_ = FurnitureRoomBillboardVisualization;
                break;
            case "furniture_bg":
                _loc3_ = FurnitureRoomBackgroundVisualization;
                break;
            case "furniture_stickie":
                _loc3_ = FurnitureStickieVisualization;
                break;
            case "furniture_mannequin":
                _loc3_ = FurnitureMannequinVisualization;
                break;
            case "furniture_guild_customized":
                _loc3_ = FurnitureGuildCustomizedVisualization;
                break;
            case "furniture_guild_isometric_badge":
                _loc3_ = FurnitureGuildIsometricBadgeVisualization;
                break;
            case "game_snowball":
                _loc3_ = SnowballVisualization;
                break;
            case "game_snowsplash":
                _loc3_ = SnowSplashVisualization;
                break;
            case "furniture_vote_counter":
                _loc3_ = FurnitureVoteCounterVisualization;
                break;
            case "furniture_vote_majority":
                _loc3_ = FurnitureVoteMajorityVisualization;
                break;
            case "furniture_soundblock":
                _loc3_ = FurnitureSoundBlockVisualization;
                break;
            case "furniture_badge_display":
                _loc3_ = FurnitureBadgeDisplayVisualization;
                break;
            case "furniture_youtube":
                _loc3_ = FurnitureYoutubeVisualization;
                break;
            case "furniture_external_image":
                _loc3_ = FurnitureExternalImageVisualization;
                break;
            case "furniture_builder_placeholder":
                _loc3_ = FurnitureBuilderPlaceholderVisualization;
        }
        if (_loc3_ == null) {
            return null;
        }
        let _loc2_: any = new _loc3_();
        if (isIRoomObjectGraphicVisualization(_loc2_)) {
            return isIRoomObjectGraphicVisualization(_loc2_) ? _loc2_ : null;
        }
        return null;
    }

    public getRoomObjectVisualizationData(param1: string, param2: string, param3: XML): IRoomObjectVisualizationData {
        let _loc7_: IRoomObjectVisualizationData = null;
        let _loc6_: AvatarVisualizationData = null;
        let _loc5_: AnimatedPetVisualizationData = null;
        let _loc9_: AvatarFurnitureVisualizationData = null;
        let _loc4_: IRoomObjectVisualizationData = null;
        _loc4_ = asGuarded(this._SafeStr_3283.getValue(param1), isIRoomObjectVisualizationData);
        if (_loc4_ != null) {
            return _loc4_;
        }
        let _loc8_: any = null;
        switch (param2) {
            case "furniture_static":
            case "furniture_gift_wrapped":
            case "furniture_bb":
            case "furniture_bg":
            case "furniture_stickie":
            case "furniture_builder_placeholder":
                _loc8_ = FurnitureVisualizationData;
                break;
            case "furniture_animated":
            case "furniture_furnichest":
            case "furniture_coinschest":
            case "furniture_resetting_animated":
            case "furniture_poster":
            case "furniture_habbowheel":
            case "furniture_val_randomizer":
            case "furniture_bottle":
            case "furniture_planet_system":
            case "furniture_queue_tile":
            case "furniture_party_beamer":
            case "furniture_counter_clock":
            case "furniture_water_area":
            case "furniture_score_board":
            case "furniture_fireworks":
            case "furniture_gift_wrapped_fireworks":
            case "furniture_guild_customized":
            case "furniture_guild_isometric_badge":
            case "furniture_vote_counter":
            case "furniture_vote_majority":
            case "furniture_soundblock":
            case "furniture_badge_display":
            case "furniture_external_image":
            case "furniture_youtube":
            case "tile_cursor":
                _loc8_ = AnimatedFurnitureVisualizationData;
                break;
            case "furniture_mannequin":
                _loc8_ = AvatarFurnitureVisualizationData;
                break;
            case "room":
                _loc8_ = RoomVisualizationData;
                break;
            case "user":
            case "bot":
            case "rentable_bot":
                _loc8_ = AvatarVisualizationData;
                break;
            case "pet_animated":
                _loc8_ = AnimatedPetVisualizationData;
                break;
            case "game_snowball":
            case "game_snowsplash":
                _loc8_ = SnowballVisualizationData;
        }
        if (_loc8_ == null) {
            return null;
        }
        _loc4_ = new _loc8_();
        if (_loc4_ != null) {
            _loc7_ = null;
            _loc7_ = isIRoomObjectVisualizationData(_loc4_) ? _loc4_ : null;
            if (!_loc7_.initialize(param3)) {
                _loc7_.dispose();
                return null;
            }
            if (_loc7_ instanceof AvatarVisualizationData) {
                _loc6_ = _loc4_ instanceof AvatarVisualizationData ? _loc4_ : null;
                _loc6_.avatarRenderer = this._habboAvatar;
            } else if (_loc7_ instanceof AnimatedPetVisualizationData) {
                _loc5_ = _loc4_ instanceof AnimatedPetVisualizationData ? _loc4_ : null;
                _loc5_.commonAssets = this.assets;
            } else if (_loc7_ instanceof AvatarFurnitureVisualizationData) {
                _loc9_ = _loc4_ instanceof AvatarFurnitureVisualizationData ? _loc4_ : null;
                _loc9_.avatarRenderer = this._habboAvatar;
            } else if (_loc7_ instanceof SnowballVisualizationData) {
                castTo(_loc7_, SnowballVisualizationData).assets = this.assets;
            }
            if (this._SafeStr_7002) {
                this._SafeStr_3283.add(param1, _loc7_);
            }
            return _loc7_;
        }
        return null;
    }

    public createGraphicAssetCollection(): IGraphicAssetCollection {
        return new GraphicAssetCollection();
    }

    protected override initInstanceFields(): void {
        this._habboAvatar = null;
        this._SafeStr_7002 = true;
        super.initInstanceFields();
    }
}
