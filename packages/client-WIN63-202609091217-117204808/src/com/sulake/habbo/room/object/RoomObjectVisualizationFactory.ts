import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { _SafeCls_6070 } from '@/com/sulake/habbo/room/object/visualization/_SafeCls_6070';
import type { _SafeCls_6072 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6072';
import type { VariableFxPreviewStyleDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxPreviewStyleDefinition';
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
import { AvatarVisualizationRoomData } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualizationRoomData';
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
import { FurnitureVisualizationRoomData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationRoomData';
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
import { _SafeCls_6071 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6071';
import { _SafeCls_6073 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6073';
import { AssetLibraryVariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/AssetLibraryVariableFxAssetProvider';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { isIRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import { isIRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import { GraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/GraphicAssetCollection';

export class RoomObjectVisualizationFactory extends Component implements IRoomObjectVisualizationFactory {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectVisualizationFactory'); }

    declare private _habboAvatar: IAvatarRenderManager;

    declare private _SafeStr_3283: UtilsMap;

    declare private _SafeStr_14426: UtilsMap;

    declare private _SafeStr_14427: UtilsMap;

    declare private _SafeStr_14428: _SafeCls_6072;

    declare private _variableFxRendererRegistry: VariableFxRendererRegistry;

    declare private _SafeStr_7002: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._SafeStr_7002 = param2 == 0;
        this._SafeStr_3283 = new UtilsMap();
        this._SafeStr_14426 = new UtilsMap();
        this._SafeStr_14427 = new UtilsMap();
        this._SafeStr_14428 = new AssetLibraryVariableFxAssetProvider(this.assets);
        this._variableFxRendererRegistry = VariableFxRendererRegistry.createDefault(this._SafeStr_14428);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._habboAvatar = param1;
         }, false)]);
    }

    public override dispose(): void {
        let _loc1_: IRoomObjectVisualizationData = null;
        let _loc4_: number = 0;
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3283 != null) {
            _loc1_ = null;
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_3283.length) {
                _loc1_ = asGuarded(this._SafeStr_3283.getWithIndex(_loc4_), isIRoomObjectVisualizationData);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc4_++;
            }
            this._SafeStr_3283.dispose();
            this._SafeStr_3283 = null;
        }
        if (this._SafeStr_14426 != null) {
            for (const _loc2_ of this._SafeStr_14426.getValues() ?? []) {
                _loc2_.dispose();
            }
            this._SafeStr_14426.dispose();
            this._SafeStr_14426 = null;
        }
        if (this._SafeStr_14427 != null) {
            for (const _loc3_ of this._SafeStr_14427.getValues() ?? []) {
                _loc3_.dispose();
            }
            this._SafeStr_14427.dispose();
            this._SafeStr_14427 = null;
        }
        this._SafeStr_14428 = null;
        this._variableFxRendererRegistry = null;
        super.dispose();
    }

    public createRoomObjectVisualization(param1: string, param2: string = null): IRoomObjectGraphicVisualization {
        let _loc4_: any = null;
        switch (param1) {
            case "room":
                _loc4_ = RoomVisualization;
                break;
            case "tile_cursor":
                _loc4_ = TileCursorVisualization;
                break;
            case "user":
                _loc4_ = AvatarVisualization;
                break;
            case "bot":
            case "rentable_bot":
                _loc4_ = AvatarVisualization;
                break;
            case "pet_animated":
                _loc4_ = AnimatedPetVisualization;
                break;
            case "furniture_static":
                _loc4_ = FurnitureVisualization;
                break;
            case "furniture_animated":
                _loc4_ = AnimatedFurnitureVisualization;
                break;
            case "furniture_resetting_animated":
                _loc4_ = FurnitureResettingAnimatedVisualization;
                break;
            case "furniture_poster":
                _loc4_ = FurniturePosterVisualization;
                break;
            case "furniture_habbowheel":
                _loc4_ = FurnitureHabboWheelVisualization;
                break;
            case "furniture_val_randomizer":
                _loc4_ = FurnitureValRandomizerVisualization;
                break;
            case "furniture_bottle":
                _loc4_ = FurnitureBottleVisualization;
                break;
            case "furniture_furnichest":
                _loc4_ = FurnitureFurniChestVisualization;
                break;
            case "furniture_coinschest":
                _loc4_ = FurnitureCoinsChestVisualization;
                break;
            case "furniture_planet_system":
                _loc4_ = FurniturePlanetSystemVisualization;
                break;
            case "furniture_queue_tile":
                _loc4_ = FurnitureQueueTileVisualization;
                break;
            case "furniture_party_beamer":
                _loc4_ = FurniturePartyBeamerVisualization;
                break;
            case "furniture_cuboid":
                _loc4_ = FurnitureCuboidVisualization;
                break;
            case "furniture_gift_wrapped":
                _loc4_ = FurnitureGiftWrappedVisualization;
                break;
            case "furniture_counter_clock":
                _loc4_ = FurnitureCounterClockVisualization;
                break;
            case "furniture_water_area":
                _loc4_ = FurnitureWaterAreaVisualization;
                break;
            case "furniture_score_board":
                _loc4_ = FurnitureScoreBoardVisualization;
                break;
            case "furniture_fireworks":
                _loc4_ = FurnitureFireworksVisualization;
                break;
            case "furniture_gift_wrapped_fireworks":
                _loc4_ = FurnitureGiftWrappedFireworksVisualization;
                break;
            case "furniture_bb":
                _loc4_ = FurnitureRoomBillboardVisualization;
                break;
            case "furniture_bg":
                _loc4_ = FurnitureRoomBackgroundVisualization;
                break;
            case "furniture_stickie":
                _loc4_ = FurnitureStickieVisualization;
                break;
            case "furniture_mannequin":
                _loc4_ = FurnitureMannequinVisualization;
                break;
            case "furniture_guild_customized":
                _loc4_ = FurnitureGuildCustomizedVisualization;
                break;
            case "furniture_guild_isometric_badge":
                _loc4_ = FurnitureGuildIsometricBadgeVisualization;
                break;
            case "game_snowball":
                _loc4_ = SnowballVisualization;
                break;
            case "game_snowsplash":
                _loc4_ = SnowSplashVisualization;
                break;
            case "furniture_vote_counter":
                _loc4_ = FurnitureVoteCounterVisualization;
                break;
            case "furniture_vote_majority":
                _loc4_ = FurnitureVoteMajorityVisualization;
                break;
            case "furniture_soundblock":
                _loc4_ = FurnitureSoundBlockVisualization;
                break;
            case "furniture_badge_display":
                _loc4_ = FurnitureBadgeDisplayVisualization;
                break;
            case "furniture_youtube":
                _loc4_ = FurnitureYoutubeVisualization;
                break;
            case "furniture_external_image":
                _loc4_ = FurnitureExternalImageVisualization;
                break;
            case "furniture_builder_placeholder":
                _loc4_ = FurnitureBuilderPlaceholderVisualization;
        }
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: any = new _loc4_();
        if (isIRoomObjectGraphicVisualization(_loc3_)) {
            if (_loc3_ instanceof AvatarVisualization && param2 != null) {
                castTo(_loc3_, AvatarVisualization).roomData = this.getAvatarVisualizationRoomData(param2);
            } else if (_loc3_ instanceof AnimatedPetVisualization && param2 != null) {
                castTo(_loc3_, AnimatedPetVisualization).roomData = this.getAvatarVisualizationRoomData(param2);
            } else if (_loc3_ instanceof FurnitureVisualization && param2 != null) {
                castTo(_loc3_, FurnitureVisualization).roomData = this.getFurnitureVisualizationRoomData(param2);
            }
            return isIRoomObjectGraphicVisualization(_loc3_) ? _loc3_ : null;
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

    private getAvatarVisualizationRoomData(param1: string): AvatarVisualizationRoomData {
        let _loc2_: AvatarVisualizationRoomData = asInstanceOf(this._SafeStr_14426.getValue(param1), AvatarVisualizationRoomData);
        if (_loc2_ == null) {
            _loc2_ = new AvatarVisualizationRoomData(this._SafeStr_14428, this._variableFxRendererRegistry);
            this._SafeStr_14426.add(param1, _loc2_);
        }
        return _loc2_;
    }

    private getFurnitureVisualizationRoomData(param1: string): FurnitureVisualizationRoomData {
        let _loc2_: FurnitureVisualizationRoomData = asInstanceOf(this._SafeStr_14427.getValue(param1), FurnitureVisualizationRoomData);
        if (_loc2_ == null) {
            _loc2_ = new FurnitureVisualizationRoomData(this._SafeStr_14428, this._variableFxRendererRegistry);
            this._SafeStr_14427.add(param1, _loc2_);
        }
        return _loc2_;
    }

    public disposeRoomVisualizationData(param1: string): void {
        let _loc2_: AvatarVisualizationRoomData = asInstanceOf(this._SafeStr_14426.remove(param1), AvatarVisualizationRoomData);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
        let _loc3_: FurnitureVisualizationRoomData = asInstanceOf(this._SafeStr_14427.remove(param1), FurnitureVisualizationRoomData);
        if (_loc3_ != null) {
            _loc3_.dispose();
        }
    }

    public updateVariableFxConfigs(param1: string, param2: any[]): void {
        let _loc4_: any = null;
        let _loc5_: VariableFxPreviewStyleDefinition = null;
        let _loc3_: _SafeCls_6070 = null;
        for (_loc4_ of param2 ?? []) {
            if (_loc4_.isUserFx) {
                _loc3_ = this.getAvatarVisualizationRoomData(param1).variableFxVisualizationManager;
            } else {
                _loc3_ = this.getFurnitureVisualizationRoomData(param1).variableFxVisualizationManager;
            }
            _loc5_ = _SafeCls_6071.getByCategoryAndStyleId(_loc4_.categoryId | 0, _loc4_._SafeStr_14429 | 0);
            _loc3_.upsertConfig(_loc4_.configId | 0, new VariableFxConfigData(_SafeCls_6073.resolveCategoryById(_loc4_.categoryId | 0), _loc5_.serverStyle, _SafeCls_6073.resolveRendererById(_loc4_.rendererId | 0), _SafeCls_6073.resolveWidthById(_loc4_._SafeStr_14430 | 0), _SafeCls_6073.resolveColorById(_loc4_.colorId | 0), Number(_loc4_.defaultMinValue), Number(_loc4_.defaultMaxValue), _loc4_.extra, _loc4_.categoryId | 0, _loc4_._SafeStr_14429 | 0, _loc4_.rendererId | 0));
        }
    }

    public removeVariableFxConfigs(param1: string, param2: any[]): void {
        let _loc4_: number = 0;
        let _loc3_: AvatarVisualizationRoomData = this.getAvatarVisualizationRoomData(param1);
        let _loc5_: FurnitureVisualizationRoomData = this.getFurnitureVisualizationRoomData(param1);
        for (_loc4_ of param2 ?? []) {
            _loc3_.variableFxVisualizationManager.removeConfig(_loc4_);
            _loc5_.variableFxVisualizationManager.removeConfig(_loc4_);
        }
    }

    protected override initInstanceFields(): void {
        this._habboAvatar = null;
        this._SafeStr_7002 = true;
        super.initInstanceFields();
    }
}
