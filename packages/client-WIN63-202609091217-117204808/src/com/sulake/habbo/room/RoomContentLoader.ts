import { asGuarded, asInstanceOf, castTo, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IFileProxy } from '@/com/sulake/core/utils/IFileProxy';
import type { IRoomContentListener } from '@/com/sulake/habbo/room/IRoomContentListener';
import type { IFurniDataListener } from '@/com/sulake/habbo/session/furniture/IFurniDataListener';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IRoomContentLoader } from '@/com/sulake/room/IRoomContentLoader';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectVisualizationFactory } from '@/com/sulake/room/object/IRoomObjectVisualizationFactory';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import { AssetLibrary, AssetLibraryCollection, AssetLoaderStruct, Core, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomObjectUserTypes } from '@/com/sulake/habbo/room/object/RoomObjectUserTypes';
import { PetColorResult } from '@/com/sulake/habbo/room/PetColorResult';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { RoomContentLoadedEvent } from '@/com/sulake/room/events/RoomContentLoadedEvent';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';

export class RoomContentLoader implements IRoomContentLoader, IFurniDataListener, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.room::RoomContentLoader'); }

    public static readonly CONTENT_LOADER_READY: string = "RCL_LOADER_READY";
    private static readonly ASSET_LIBRARY_NAME_PREFIX: string = "RoomContentLoader ";
    private static readonly STATE_CREATED: number = 0;
    private static readonly STATE_INITIALIZING: number = 1;
    private static readonly STATE_READY: number = 2;
    private static readonly PLACE_HOLDER_FURNITURE: string = "place_holder";
    private static readonly PLACE_HOLDER_WALL_ITEM: string = "wall_place_holder";
    private static readonly PLACE_HOLDER_PET: string = "pet_place_holder";
    private static readonly PLACE_HOLDER_DEFAULT: string = "place_holder";
    private static readonly ROOM_CONTENT: string = "room";
    private static readonly _SafeStr_8188: string = "tile_cursor";
    private static readonly _SafeStr_8658: string = "selection_arrow";
    private static readonly CONTENT_DROP_DELAY: number = 20000;
    private static readonly COMPRESSION_INTERVAL: number = 30000;
    private static readonly PLACE_HOLDER_TYPES: any[] = ["place_holder", "wall_place_holder", "pet_place_holder", "room", "tile_cursor", "selection_arrow"];
    private static readonly PLACE_HOLDER_TYPES_GPU: any[] = ["place_holder", "wall_place_holder", "pet_place_holder", "room", "selection_arrow"];

    declare private _baseUrl: string;

    private _libraries: UtilsMap = null;
    private _events: UtilsMap = null;
    private _additionalObjectTypeLibraries: UtilsMap = null;
    private _SafeStr_2402: UtilsMap = null;
    private _visualizationFactory: IRoomObjectVisualizationFactory = null;
    private _state: number = 0;
    private _stateEvents: IEventDispatcher = null;
    private _disposed: boolean = false;
    private _SafeStr_7161: boolean = false;
    private _activeObjectTypes: UtilsMap = null;
    private _SafeStr_2753: Map<any, any> = new Dictionary();
    private _SafeStr_3233: UtilsMap = null;
    private _wallItemTypes: UtilsMap = null;
    private _wallItems: Map<any, any> = new Dictionary();
    private _SafeStr_3755: UtilsMap = null;
    private _petTypes: UtilsMap = null;
    private _pets: Map<any, any> = new Dictionary();
    private _petColors: UtilsMap = null;
    private _petLayers: UtilsMap = null;
    private _SafeStr_3250: UtilsMap = null;
    private _objectAliases: UtilsMap = null;
    private _objectOriginalNames: UtilsMap = null;
    private _SafeStr_3392: UtilsMap = null;

    declare private _SafeStr_6733: string;

    declare private _SafeStr_7250: string;

    declare private _SafeStr_6356: string;

    declare private _SafeStr_5863: string;

    declare private _SafeStr_6398: string;

    private _SafeStr_4790: boolean = false;

    declare private _lastAssetCompressionTime: number;
    static { (this.prototype as any)._lastAssetCompressionTime = 0; }

    declare private _sessionDataManager: ISessionDataManager;

    declare private _iconAssets: IAssetLibrary;

    declare private _iconListener: IRoomContentListener;

    declare private _configuration: ICoreConfiguration;

    declare private _ignoredFurniTypes: any[];

    constructor(param1: string) {
        this._baseUrl = param1;
        this._libraries = new UtilsMap();
        this._events = new UtilsMap();
        this._activeObjectTypes = new UtilsMap();
        this._SafeStr_3233 = new UtilsMap();
        this._wallItemTypes = new UtilsMap();
        this._SafeStr_3755 = new UtilsMap();
        this._petTypes = new UtilsMap();
        this._SafeStr_3392 = new UtilsMap();
        this._SafeStr_3250 = new UtilsMap();
        this._objectAliases = new UtilsMap();
        this._objectOriginalNames = new UtilsMap();
        this._SafeStr_2402 = new UtilsMap();
        this._additionalObjectTypeLibraries = new UtilsMap();
    }

    private get fileProxy(): IFileProxy {
        return Core.instance.fileProxy;
    }

    public set sessionDataManager(param1: ISessionDataManager) {
        this._sessionDataManager = param1;
        if (this._SafeStr_4790) {
            this._SafeStr_4790 = false;
            this.initFurnitureData();
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set visualizationFactory(param1: IRoomObjectVisualizationFactory) {
        this._visualizationFactory = param1;
    }

    public initialize(param1: IEventDispatcher, param2: ICoreConfiguration): void {
        this._stateEvents = param1;
        this._SafeStr_6733 = param2.getProperty("flash.dynamic.download.url");
        this._SafeStr_7250 = param2.getProperty("flash.dynamic.download.name.template");
        this._SafeStr_6356 = param2.getProperty("flash.dynamic.icon.download.name.template");
        this._SafeStr_5863 = param2.getProperty("pet.dynamic.download.url");
        this._SafeStr_6398 = param2.getProperty("pet.dynamic.download.name.template");
        this._configuration = param2;
        this._state = 1;
        this.initFurnitureData();
        this.initPetData(param2);
    }

    private initPetData(param1: ICoreConfiguration): void {
        let _loc2_: any[] = param1.getProperty("pet.configuration").split(",");
        let _loc3_: number = 0;
        for (const _loc4_ of _loc2_ ?? []) {
            this._pets.set(_loc4_, _loc3_);
            this._petTypes.add(_loc3_, _loc4_);
            _loc3_++;
        }
        this._petColors = new UtilsMap();
        this._petLayers = new UtilsMap();
    }

    private initFurnitureData(): void {
        if (this._sessionDataManager == null) {
            this._SafeStr_4790 = true;
            return;
        }
        let _loc1_: IFurnitureData[] = this._sessionDataManager.getFurniData(this);
        if (_loc1_ == null) {
            return;
        }
        this._sessionDataManager.removeFurniDataListener(this);
        this.populateFurniData(_loc1_);
        this._SafeStr_7161 = true;
        this.parseIgnoredFurniTypes();
        this.continueInitilization();
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: AssetLibrary = null;
        let _loc4_: IGraphicAssetCollection = null;
        let _loc5_: string = null;
        if (this._libraries != null) {
            _loc2_ = this._libraries.length | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc1_ = asInstanceOf(this._libraries.getWithIndex(_loc3_), AssetLibrary);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._libraries.dispose();
            this._libraries = null;
        }
        if (this._events != null) {
            this._events.dispose();
            this._events = null;
        }
        if (this._activeObjectTypes != null) {
            this._activeObjectTypes.dispose();
            this._activeObjectTypes = null;
        }
        if (this._SafeStr_3233) {
            this._SafeStr_3233.dispose();
            this._SafeStr_3233 = null;
        }
        if (this._wallItemTypes != null) {
            this._wallItemTypes.dispose();
            this._wallItemTypes = null;
        }
        if (this._SafeStr_3755) {
            this._SafeStr_3755.dispose();
            this._SafeStr_3755 = null;
        }
        if (this._petTypes != null) {
            this._petTypes.dispose();
            this._petTypes = null;
        }
        if (this._petColors != null) {
            this._petColors.dispose();
            this._petColors = null;
        }
        if (this._petLayers != null) {
            this._petLayers.dispose();
            this._petLayers = null;
        }
        if (this._SafeStr_3250 != null) {
            this._SafeStr_3250.dispose();
            this._SafeStr_3250 = null;
        }
        if (this._objectAliases != null) {
            this._objectAliases.dispose();
            this._objectAliases = null;
        }
        if (this._objectOriginalNames != null) {
            this._objectOriginalNames.dispose();
            this._objectOriginalNames = null;
        }
        if (this._SafeStr_3392 != null) {
            this._SafeStr_3392.dispose();
            this._SafeStr_3392 = null;
        }
        if (this._SafeStr_2402 != null) {
            _loc2_ = this._SafeStr_2402.length | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc4_ = asGuarded(this._SafeStr_2402.getWithIndex(_loc3_), isIGraphicAssetCollection);
                if (_loc4_ != null) {
                    _loc4_.dispose();
                }
                _loc3_++;
            }
            this._SafeStr_2402.dispose();
            this._SafeStr_2402 = null;
        }
        if (this._additionalObjectTypeLibraries != null) {
            this._additionalObjectTypeLibraries.dispose();
            this._additionalObjectTypeLibraries = null;
        }
        if (this._SafeStr_2753 != null) {
            for (_loc5_ of this._SafeStr_2753?.keys() ?? []) {
                this._SafeStr_2753.delete(_loc5_);
            }
            this._SafeStr_2753 = null;
        }
        if (this._wallItems != null) {
            for (_loc5_ of this._wallItems?.keys() ?? []) {
                this._wallItems.delete(_loc5_);
            }
            this._wallItems = null;
        }
        if (this._pets != null) {
            for (_loc5_ of this._pets?.keys() ?? []) {
                this._pets.delete(_loc5_);
            }
            this._pets = null;
        }
        this._stateEvents = null;
        this._sessionDataManager = null;
        this._configuration = null;
        this._disposed = true;
    }

    private parseIgnoredFurniTypes(): void {
        let _loc3_: number = 0;
        let _loc1_: string = this._configuration.getProperty("gpu.ignored_furni");
        if (!_loc1_) {
            return;
        }
        this._ignoredFurniTypes = _loc1_.split(",");
        let _loc2_: number = this._ignoredFurniTypes.length | 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._ignoredFurniTypes[_loc3_] = StringUtil.trim(stringOrNull(this._ignoredFurniTypes[_loc3_]));
            _loc3_++;
        }
    }

    private isIgnoredFurniType(param1: string): boolean {
        return this._ignoredFurniTypes ? this._ignoredFurniTypes.indexOf(param1) != -1 : false;
    }

    private populateFurniData(param1: IFurnitureData[]): void {
        let _loc3_: any = null;
        let _loc4_: number = 0;
        let _loc6_: string = null;
        let _loc8_: number = 0;
        let _loc2_: string = null;
        let _loc7_: string = null;
        let _loc5_: number = 0;
        for (_loc3_ of param1 ?? []) {
            _loc4_ = _loc3_.id;
            _loc6_ = _loc3_.className;
            if (_loc3_.hasIndexedColor) {
                _loc6_ = _loc6_ + "*" + _loc3_.colourIndex;
            }
            _loc8_ = _loc3_.revision;
            _loc2_ = _loc3_.adUrl;
            if (_loc2_ != null && _loc2_.length > 0) {
                this._SafeStr_3392.add(_loc6_, _loc2_);
            }
            _loc7_ = _loc3_.className;
            if (_loc3_.type == "s") {
                this._activeObjectTypes.add(_loc4_, _loc6_);
                this._SafeStr_3233.add(_loc6_, _loc4_);
                if (this._SafeStr_2753.get(_loc7_) == null) {
                    this._SafeStr_2753.set(_loc7_, 1);
                }
            } else if (_loc3_.type == "i") {
                if (_loc6_ == "post.it") {
                    _loc6_ = "post_it";
                    _loc7_ = "post_it";
                }
                if (_loc6_ == "post.it.vd") {
                    _loc6_ = "post_it_vd";
                    _loc7_ = "post_it_vd";
                }
                this._wallItemTypes.add(_loc4_, _loc6_);
                this._SafeStr_3755.add(_loc6_, _loc4_);
                if (this._wallItems.get(_loc7_) == null) {
                    this._wallItems.set(_loc7_, 1);
                }
            }
            _loc5_ = this._SafeStr_3250.getValue(_loc7_) | 0;
            if (_loc8_ > _loc5_) {
                this._SafeStr_3250.remove(_loc7_);
                this._SafeStr_3250.add(_loc7_, _loc8_);
            }
        }
    }

    private continueInitilization(): void {
        if (this._SafeStr_7161) {
            this._state = 2;
            if (this._stateEvents != null) {
                this._stateEvents.dispatchEvent(new Event("RCL_LOADER_READY"));
            }
        }
    }

    public setRoomObjectAlias(param1: string, param2: string): void {
        if (this._objectAliases != null) {
            this._objectAliases.remove(param1);
            this._objectAliases.add(param1, param2);
        }
        if (this._objectOriginalNames != null) {
            this._objectOriginalNames.remove(param2);
            this._objectOriginalNames.add(param2, param1);
        }
    }

    private getRoomObjectAlias(param1: string): string {
        let _loc2_: string = null;
        if (this._objectAliases != null) {
            _loc2_ = asGuarded(this._objectAliases.getValue(param1), isString);
        }
        if (_loc2_ == null) {
            _loc2_ = param1;
        }
        return _loc2_;
    }

    private getRoomObjectOriginalName(param1: string): string {
        let _loc2_: string = null;
        if (this._objectOriginalNames != null) {
            _loc2_ = asGuarded(this._objectOriginalNames.getValue(param1), isString);
        }
        if (_loc2_ == null) {
            _loc2_ = param1;
        }
        return _loc2_;
    }

    public getObjectCategory(param1: string): number {
        if (param1 == null) {
            return -2;
        }
        if (this._SafeStr_2753.get(param1) != null) {
            return 10;
        }
        if (this._wallItems.get(param1) != null) {
            return 20;
        }
        if (this._pets.get(param1) != null) {
            return 100;
        }
        if (param1.indexOf("poster") == 0) {
            return 20;
        }
        if (param1 == "room") {
            return 0;
        }
        if (param1 == "user") {
            return 100;
        }
        if (param1 == "pet") {
            return 100;
        }
        if (param1 == "bot") {
            return 100;
        }
        if (param1 == "rentable_bot") {
            return 100;
        }
        if (param1 == "tile_cursor" || param1 == "selection_arrow") {
            return 200;
        }
        return -2;
    }

    public getPlaceHolderType(param1: string): string {
        if (this._SafeStr_2753.get(param1) != null) {
            return "place_holder";
        }
        if (this._wallItems.get(param1) != null) {
            return "wall_place_holder";
        }
        if (this._pets.get(param1) != null) {
            return "pet_place_holder";
        }
        return "place_holder";
    }

    public getPlaceHolderTypes(): any[] {
        return RoomContentLoader.PLACE_HOLDER_TYPES;
    }

    public getActiveObjectType(param1: number): string {
        let _loc2_: string = asGuarded(this._activeObjectTypes.getValue(param1), isString);
        if (_loc2_ == null) {
            Logger.log("[RoomContentLoader] Could not find type for id: " + param1);
        }
        return this.getObjectType(_loc2_);
    }

    public getActiveObjectTypeId(param1: string): number {
        return this._SafeStr_3233.getValue(param1) | 0;
    }

    public getWallItemType(param1: number, param2: string = null): string {
        let _loc3_: string = asGuarded(this._wallItemTypes.getValue(param1), isString);
        if (_loc3_ == "poster" && param2 != null) {
            _loc3_ += param2;
        }
        return this.getObjectType(_loc3_);
    }

    public getWallItemTypeId(param1: string): number {
        return this._SafeStr_3755.getValue(param1) | 0;
    }

    public getPetType(param1: number): string {
        return asGuarded(this._petTypes.getValue(param1), isString);
    }

    public getPetTypeId(param1: string): number {
        return this._pets.get(param1) | 0;
    }

    public getPetColor(param1: number, param2: number): PetColorResult {
        let _loc3_: UtilsMap = this._petColors[param1];
        if (_loc3_ != null) {
            return asInstanceOf(_loc3_[param2], PetColorResult);
        }
        return null;
    }

    public getPetColorsByTag(param1: number, param2: string): any[] {
        let _loc5_: UtilsMap = this._petColors[param1];
        let _loc3_: any[] = [];
        if (_loc5_ != null) {
            for (const _loc4_ of _loc5_.getValues() ?? []) {
                if (_loc4_.tag == param2) {
                    _loc3_.push(_loc4_);
                }
            }
        }
        return _loc3_;
    }

    public getPetLayerIdForTag(param1: number, param2: string, param3: number = 64): number {
        let _loc5_: Map<any, any> = null;
        let _loc4_: UtilsMap = this._petLayers[param1];
        if (_loc4_) {
            _loc5_ = _loc4_[param3.toString()];
            if (_loc5_) {
                return Number(_loc5_.get(param2) ?? -1) | 0;
            }
        }
        return -1;
    }

    public getPetDefaultPalette(param1: number, param2: string): PetColorResult {
        let _loc4_: UtilsMap = this._petColors[param1];
        if (_loc4_ != null) {
            for (const _loc3_ of _loc4_.getValues() ?? []) {
                if (_loc3_.layerTags.indexOf(param2) > -1 && _loc3_.isMaster) {
                    return _loc3_;
                }
            }
        }
        return null;
    }

    public getActiveObjectColorIndex(param1: number): number {
        let _loc2_: string = asGuarded(this._activeObjectTypes.getValue(param1), isString);
        return this.getObjectColorIndex(_loc2_);
    }

    public getWallItemColorIndex(param1: number): number {
        let _loc2_: string = asGuarded(this._wallItemTypes.getValue(param1), isString);
        return this.getObjectColorIndex(_loc2_);
    }

    public getRoomObjectAdURL(param1: string): string {
        if (this._SafeStr_3392.getValue(param1) != null) {
            return stringOrNull(this._SafeStr_3392.getValue(param1));
        }
        return "";
    }

    private getObjectType(param1: string): string {
        if (param1 == null) {
            return null;
        }
        let _loc2_: number = param1.indexOf("*");
        if (_loc2_ >= 0) {
            param1 = param1.substr(0, _loc2_);
        }
        return param1;
    }

    private getObjectColorIndex(param1: string): number {
        if (param1 == null) {
            return -1;
        }
        let _loc3_: number = 0;
        let _loc2_: number = param1.indexOf("*");
        if (_loc2_ >= 0) {
            _loc3_ = Number(param1.substr(_loc2_ + 1)) | 0;
        }
        return _loc3_;
    }

    public getContentType(param1: string): string {
        return param1;
    }

    public hasInternalContent(param1: string): boolean {
        param1 = RoomObjectUserTypes.getVisualizationType(param1);
        if (param1 == "user" || param1 == "game_snowball" || param1 == "game_snowsplash") {
            return true;
        }
        return false;
    }

    private getObjectRevision(param1: string): number {
        let _loc3_: number = 0;
        let _loc2_: number = this.getObjectCategory(param1);
        if (_loc2_ == 10 || _loc2_ == 20) {
            if (param1.indexOf("poster") == 0) {
                param1 = "poster";
            }
            return this._SafeStr_3250.getValue(param1) | 0;
        }
        return 0;
    }

    private getObjectContentURLs(param1: string, param2: string = null, param3: boolean = false): any[] {
        let _loc6_: number = 0;
        let _loc4_: string = null;
        let _loc8_: string = null;
        let _loc10_: number = 0;
        let _loc5_: boolean = false;
        let _loc9_: string = null;
        let _loc7_: string;
        switch (_loc7_ = this.getContentType(param1)) {
            case "place_holder":
                return [this.resolveLocalOrAssetBaseUrl("PlaceHolderFurniture.swf")];
            case "wall_place_holder":
                return [this.resolveLocalOrAssetBaseUrl("PlaceHolderWallItem.swf")];
            case "pet_place_holder":
                return [this.resolveLocalOrAssetBaseUrl("PlaceHolderPet.swf")];
            case "room":
                return [this.resolveLocalOrAssetBaseUrl("HabboRoomContent.swf")];
            case "tile_cursor":
                return [this.resolveLocalOrAssetBaseUrl("TileCursor.swf")];
            case "selection_arrow":
                return [this.resolveLocalOrAssetBaseUrl("SelectionArrow.swf")];
            default:
                _loc6_ = this.getObjectCategory(_loc7_);
                if (_loc6_ == 10 || _loc6_ == 20) {
                    _loc4_ = this.getRoomObjectAlias(_loc7_);
                    _loc8_ = param3 ? this._SafeStr_6356 : this._SafeStr_7250;
                    _loc8_ = _loc8_.replace(/%typeid%/, _loc4_);
                    _loc10_ = this.getObjectRevision(_loc7_);
                    _loc8_ = _loc8_.replace(/%revision%/, String(_loc10_));
                    if (param3) {
                        _loc5_ = param2 != null && param2 != "" && this._SafeStr_3233.hasKey(param1 + "*" + param2);
                        _loc8_ = _loc8_.replace(/%param%/, _loc5_ ? "_" + param2 : "");
                    }
                    return [this._SafeStr_6733 + _loc8_];
                }
                if (_loc6_ == 100) {
                    _loc9_ = this._SafeStr_5863 + this._SafeStr_6398;
                    _loc9_ = _loc9_.replace(/%type%/, _loc7_);
                    return [_loc9_];
                }
                return [];
        }
    }

    private resolveLocalOrAssetBaseUrl(param1: string): string {
        let _loc2_: any = null;
        if (this.fileProxy && this.fileProxy.localFileExists(param1)) {
            return this.fileProxy.localFilePath(param1);
        }
        return this._SafeStr_5863 + param1;
    }

    public insertObjectContent(param1: number, param2: number, param3: IAssetLibrary): boolean {
        let _loc6_: Event = null;
        let _loc7_: IEventDispatcher = null;
        let _loc5_: string = this.getAssetLibraryType(param3);
        switch (param2 - 10) {
            case 0:
                this._activeObjectTypes[param1] = _loc5_;
                this._SafeStr_3233.add(_loc5_, param1);
                break;
            case 10:
                this._wallItemTypes[param1] = _loc5_;
                break;
            default:
                throw new Error("Registering content library for unsupported category " + param2 + "!");
        }
        let _loc4_: AssetLibraryCollection = asInstanceOf(this.addAssetLibraryCollection(_loc5_, null), AssetLibraryCollection);
        if (_loc4_) {
            _loc4_.addAssetLibrary(param3);
            if (this.initializeGraphicAssetCollection(_loc5_, param3)) {
                switch (param2 - 10) {
                    case 0:
                        if (this._SafeStr_2753.get(_loc5_) == null) {
                            this._SafeStr_2753.set(_loc5_, 1);
                        }
                        break;
                    case 10:
                        if (this._wallItems.get(_loc5_) == null) {
                            this._wallItems.set(_loc5_, 1);
                        }
                        break;
                    default:
                        throw new Error("Registering content library for unsupported category " + param2 + "!");
                }
                _loc6_ = new RoomContentLoadedEvent("RCLE_SUCCESS", _loc5_);
                _loc7_ = this.getAssetLibraryEventDispatcher(_loc5_, true);
                if (_loc7_) {
                    _loc7_.dispatchEvent(_loc6_);
                }
                return true;
            }
        }
        return false;
    }

    public getObjectUrl(param1: string, param2: string): string {
        let _loc3_: any[] = null;
        let _loc4_: string = null;
        if (param1 && param1.indexOf(",") >= 0) {
            _loc4_ = param1;
            param1 = stringOrNull(_loc4_.split(",")[0]);
        }
        if (_loc4_ != null) {
            _loc3_ = this.getObjectContentURLs(_loc4_, param2, true);
        } else {
            _loc3_ = this.getObjectContentURLs(param1, param2, true);
        }
        if (_loc3_.length > 0) {
            return asGuarded(_loc3_[0], isString);
        }
        return null;
    }

    public loadThumbnailContent(param1: number, param2: string, param3: string, param4: IEventDispatcher): boolean {
        let _loc7_: any[] = null;
        let _loc9_: number = 0;
        let _loc6_: string = null;
        let _loc5_: string = null;
        let _loc8_: AssetLoaderStruct = null;
        let _loc10_: string = null;
        if (param2 && param2.indexOf(",") >= 0) {
            _loc10_ = param2;
            param2 = stringOrNull(_loc10_.split(",")[0]);
        }
        if (_loc10_ != null) {
            _loc7_ = this.getObjectContentURLs(_loc10_, param3, true);
        } else {
            _loc7_ = this.getObjectContentURLs(param2, param3, true);
        }
        if (_loc7_ != null && _loc7_.length > 0) {
            _loc9_ = 0;
            while (_loc9_ < _loc7_.length) {
                _loc5_ = _loc6_ = stringOrNull(_loc7_[_loc9_]);
                _loc8_ = this._iconAssets.loadAssetFromFile([param2, param3].join("_"), new URLRequest(_loc5_), "image/png", param1);
                _loc8_.addEventListener("AssetLoaderEventComplete", this.onContentLoaded);
                _loc9_++;
            }
            return true;
        }
        return false;
    }

    public loadObjectContent(param1: string, param2: IEventDispatcher): boolean {
        let _loc5_: any[] = null;
        let _loc7_: number = 0;
        let _loc6_: LibraryLoader = null;
        let _loc4_: string = null;
        let _loc3_: string = null;
        if (param1 == null || param1 == "") {
            Logger.log("[RoomContentLoader] Can not load content, object type unknown!");
            return false;
        }
        let _loc9_: string = null;
        if (param1 && param1.indexOf(",") >= 0) {
            _loc9_ = param1;
            param1 = stringOrNull(_loc9_.split(",")[0]);
        }
        if (this.getAssetLibrary(param1) != null || this.getAssetLibraryEventDispatcher(param1) != null) {
            return false;
        }
        let _loc8_: AssetLibraryCollection = asInstanceOf(this.addAssetLibraryCollection(param1, param2), AssetLibraryCollection);
        if (_loc8_ == null) {
            return false;
        }
        if (this.isIgnoredFurniType(param1)) {
            Logger.log("Ignored object type found from configuration. Not downloading assets for: " + param1);
            return false;
        }
        if (_loc9_ != null) {
            _loc5_ = this.getObjectContentURLs(_loc9_);
        } else {
            _loc5_ = this.getObjectContentURLs(param1);
        }
        if (_loc5_ != null && _loc5_.length > 0) {
            _loc8_.addEventListener("AssetLibraryLoaded", this.onContentLoaded);
            _loc7_ = 0;
            while (_loc7_ < _loc5_.length) {
                _loc6_ = new LibraryLoader();
                _loc3_ = _loc4_ = stringOrNull(_loc5_[_loc7_]);
                _loc8_.loadFromFile(_loc6_, true);
                _loc6_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onContentLoadError);
                _loc6_.load(new URLRequest(_loc3_));
                _loc7_++;
            }
            return true;
        }
        return false;
    }

    private onContentLoadError = (param1: Event): void => {
        let _loc3_: any[] = null;
        let _loc4_: LibraryLoader = castTo(param1.target, LibraryLoader);
        let _loc5_: any[] = this.getPlaceHolderTypes();
        for (const _loc2_ of _loc5_ ?? []) {
            _loc3_ = this.getObjectContentURLs(stringOrNull(_loc2_));
            if (_loc3_.length > 0 && _loc4_.url != null && _loc4_.url.indexOf(stringOrNull(_loc3_[0])) == 0) {
                Core.crash("Failed to load asset: " + _loc4_.url, 3);
                return;
            }
        }
    };

    private onContentLoaded = (param1: Event): void => {
        let _loc2_: AssetLoaderStruct = null;
        let _loc3_: IAssetLibrary = null;
        if (this.disposed) {
            return;
        }
        if (param1.target instanceof AssetLoaderStruct) {
            _loc2_ = asInstanceOf(param1.target, AssetLoaderStruct);
            this._iconListener.iconLoaded(_loc2_.assetLoader.id, _loc2_.assetName, true);
        } else {
            _loc3_ = asGuarded(param1.target, isIAssetLibrary);
            if (_loc3_ == null) {
                return;
            }
            this.processLoadedLibrary(_loc3_);
        }
    };

    private processLoadedLibrary(param1: IAssetLibrary): void {
        let _loc3_: RoomContentLoadedEvent = null;
        let _loc2_: boolean = false;
        let _loc4_: string = this.getAssetLibraryType(param1);
        _loc4_ = this.getRoomObjectOriginalName(_loc4_);
        if (_loc4_ != null) {
            _loc2_ = this.initializeGraphicAssetCollection(_loc4_, param1);
        }
        if (_loc2_) {
            if (this._pets.get(_loc4_) != null) {
                this.extractPetDataFromLoadedContent(_loc4_);
            }
            _loc3_ = new RoomContentLoadedEvent("RCLE_SUCCESS", _loc4_);
        } else {
            _loc3_ = new RoomContentLoadedEvent("RCLE_FAILURE", _loc4_);
        }
        let _loc5_: IEventDispatcher = this.getAssetLibraryEventDispatcher(_loc4_, true);
        if (_loc5_ != null && _loc3_ != null) {
            _loc5_.dispatchEvent(_loc3_);
        }
    }

    private extractPetDataFromLoadedContent(param1: string): void {
        let _loc18_: any;
        let _loc7_: UtilsMap = null;
        let _loc5_: any[] = null;
        let _loc9_: any[] = null;
        let _loc13_: XML = null;
        let _loc8_: number = 0;
        let _loc16_: number = 0;
        let _loc2_: any[] = null;
        let _loc14_: boolean = false;
        let _loc11_: UtilsMap = null;
        let _loc17_: Map<any, any> = null;
        let _loc10_: string = null;
        let _loc15_: string = null;
        let _loc19_: number = this._pets.get(param1) | 0;
        let _loc6_: IGraphicAssetCollection = this.getGraphicAssetCollection(param1);
        if (_loc6_ != null) {
            _loc7_ = new UtilsMap();
            _loc5_ = _loc6_.getPaletteNames();
            for (const _loc12_ of _loc5_ ?? []) {
                _loc9_ = _loc6_.getPaletteColors(stringOrNull(_loc12_));
                if (_loc9_ != null && _loc9_.length >= 2) {
                    _loc13_ = _loc6_.getPaletteXML(stringOrNull(_loc12_));
                    _loc8_ = Number(_loc13_.attribute("breed")) | 0;
                    _loc16_ = Number(_loc13_.hasOwnProperty("@colortag") ? _loc13_.attribute("colortag") : -1) | 0;
                    _loc2_ = _loc13_.hasOwnProperty("@tags") ? String(_loc13_.attribute("tags")).split(",") : [];
                    _loc14_ = _loc13_.hasOwnProperty("@master") ? String(_loc13_.attribute("master")) == "true" : false;
                    _loc7_.add(_loc12_, new PetColorResult(_loc9_[0] | 0, _loc9_[1] | 0, _loc8_, _loc16_, stringOrNull(_loc12_), _loc14_, _loc2_));
                }
            }
            this._petColors.add(_loc19_, _loc7_);
        }
        let _loc4_: XML = this.getVisualizationXML(param1);
        if (_loc4_ != null) {
            _loc11_ = new UtilsMap();
            for (const _loc3_ of _loc4_.child("visualization") ?? []) {
                _loc17_ = new Dictionary();
                for (_loc18_ of _loc3_.child("layers").child("layer") ?? []) {
                    if (_loc18_.hasOwnProperty("@tag")) {
                        _loc10_ = _loc18_.attribute("tag").toString();
                        _loc17_.set(_loc10_, parseInt(String(_loc18_.attribute("id"))));
                    }
                }
                _loc15_ = _loc3_.attribute("size").toString();
                _loc11_.add(_loc15_, _loc17_);
            }
            this._petLayers.add(_loc19_, _loc11_);
        }
    }

    private initializeGraphicAssetCollection(param1: string, param2: IAssetLibrary): boolean {
        let _loc4_: XML = null;
        if (param1 == null || param2 == null) {
            return false;
        }
        let _loc3_: boolean = false;
        let _loc5_: IGraphicAssetCollection = this.createGraphicAssetCollection(param1, param2);
        if (_loc5_ != null) {
            _loc4_ = this.getAssetXML(param1);
            if (_loc5_.define(_loc4_)) {
                _loc3_ = true;
            } else {
                this.disposeGraphicAssetCollection(param1);
            }
        }
        return _loc3_;
    }

    public extractObjectContent(param1: string, param2: string): boolean {
        let _loc3_: IAssetLibrary = this.getAssetLibrary(param1);
        this._additionalObjectTypeLibraries.add(param2, param1);
        if (this.initializeGraphicAssetCollection(param2, _loc3_)) {
            return true;
        }
        this._additionalObjectTypeLibraries.remove(param2);
        return false;
    }

    private getAssetLibraryName(param1: string): string {
        return "RoomContentLoader " + param1;
    }

    private getAssetLibrary(param1: string): IAssetLibrary {
        let _loc3_: string = null;
        let _loc4_: string = this.getContentType(param1);
        _loc4_ = this.getRoomObjectOriginalName(_loc4_);
        let _loc2_: IAssetLibrary = asGuarded(this._libraries.getValue(this.getAssetLibraryName(_loc4_)), isIAssetLibrary);
        if (_loc2_ == null) {
            _loc3_ = stringOrNull(this._additionalObjectTypeLibraries.getValue(_loc4_));
            if (_loc3_ != null) {
                _loc4_ = this.getContentType(_loc3_);
                _loc2_ = asGuarded(this._libraries.getValue(this.getAssetLibraryName(_loc4_)), isIAssetLibrary);
            }
        }
        return _loc2_;
    }

    private addAssetLibraryCollection(param1: string, param2: IEventDispatcher): IAssetLibrary {
        let _loc5_: string = this.getContentType(param1);
        let _loc3_: IAssetLibrary = this.getAssetLibrary(param1);
        if (_loc3_ != null) {
            return _loc3_;
        }
        let _loc4_: string = this.getAssetLibraryName(_loc5_);
        _loc3_ = new AssetLibraryCollection(_loc4_);
        this._libraries.add(_loc4_, _loc3_);
        if (param2 != null && this.getAssetLibraryEventDispatcher(param1) == null) {
            this._events.add(_loc5_, param2);
        }
        return _loc3_;
    }

    private getAssetLibraryEventDispatcher(param1: string, param2: boolean = false): IEventDispatcher {
        let _loc3_: string = this.getContentType(param1);
        if (!param2) {
            return this._events.getValue(_loc3_);
        }
        return this._events.remove(_loc3_);
    }

    private getIconAssetType(param1: AssetLoaderStruct): string {
        if (param1 == null) {
            return null;
        }
        let _loc4_: string = param1.assetName;
        let _loc2_: any[] = _loc4_.split("_");
        let _loc5_: number = parseInt(stringOrNull(_loc2_.pop())) | 0;
        let _loc3_: string = _loc2_.join("_");
        return _loc5_ > 0 ? _loc3_ + "*" + _loc5_ : _loc3_;
    }

    private getAssetLibraryType(param1: IAssetLibrary): string {
        if (param1 == null) {
            return null;
        }
        let _loc3_: IAsset = param1.getAssetByName("index");
        if (_loc3_ == null) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (_loc2_ == null) {
            return null;
        }
        return _loc2_.attribute("type").toString();
    }

    public getVisualizationType(param1: string): string {
        if (param1 == null) {
            return null;
        }
        let _loc2_: IAssetLibrary = this.getAssetLibrary(param1);
        if (_loc2_ == null) {
            return null;
        }
        let _loc4_: IAsset = _loc2_.getAssetByName(param1 + "_index");
        if (_loc4_ == null) {
            _loc4_ = _loc2_.getAssetByName("index");
        }
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: XML = asInstanceOf(_loc4_.content, XML);
        if (_loc3_ == null) {
            return null;
        }
        return _loc3_.attribute("visualization").toString();
    }

    public getLogicType(param1: string): string {
        if (param1 == null) {
            return null;
        }
        let _loc2_: IAssetLibrary = this.getAssetLibrary(param1);
        if (_loc2_ == null) {
            return null;
        }
        let _loc4_: IAsset = _loc2_.getAssetByName(param1 + "_index");
        if (_loc4_ == null) {
            _loc4_ = _loc2_.getAssetByName("index");
        }
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: XML = asInstanceOf(_loc4_.content, XML);
        if (_loc3_ == null) {
            return null;
        }
        return _loc3_.attribute("logic").toString();
    }

    public hasVisualizationXML(param1: string): boolean {
        return this.hasXML(param1, "_visualization");
    }

    public getVisualizationXML(param1: string): XML {
        return this.getXML(param1, "_visualization");
    }

    public hasAssetXML(param1: string): boolean {
        return this.hasXML(param1, "_assets");
    }

    public getAssetXML(param1: string): XML {
        return this.getXML(param1, "_assets");
    }

    public hasLogicXML(param1: string): boolean {
        return this.hasXML(param1, "_logic");
    }

    public getLogicXML(param1: string): XML {
        return this.getXML(param1, "_logic");
    }

    private getXML(param1: string, param2: string): XML {
        let _loc3_: IAssetLibrary = this.getAssetLibrary(param1);
        if (_loc3_ == null) {
            return null;
        }
        let _loc7_: string = this.getContentType(param1);
        let _loc5_: string = this.getRoomObjectAlias(_loc7_);
        let _loc6_: IAsset = _loc3_.getAssetByName(_loc5_ + param2);
        if (_loc6_ == null) {
            return null;
        }
        let _loc4_: XML = asInstanceOf(_loc6_.content, XML);
        if (_loc4_ == null) {
            return null;
        }
        return _loc4_;
    }

    private hasXML(param1: string, param2: string): boolean {
        let _loc3_: IAssetLibrary = this.getAssetLibrary(param1);
        if (_loc3_ == null) {
            return false;
        }
        let _loc5_: string = this.getContentType(param1);
        let _loc4_: string = this.getRoomObjectAlias(_loc5_);
        return _loc3_.hasAsset(_loc4_ + param2);
    }

    public addGraphicAsset(param1: string, param2: string, param3: BitmapData, param4: boolean, param5: boolean = true): boolean {
        let _loc6_: IGraphicAssetCollection = this.getGraphicAssetCollection(param1);
        if (_loc6_ != null) {
            return _loc6_.addAsset(param2, param3, param4, 0, 0, false, false);
        }
        return false;
    }

    private createGraphicAssetCollection(param1: string, param2: IAssetLibrary): IGraphicAssetCollection {
        let _loc3_: IGraphicAssetCollection = this.getGraphicAssetCollection(param1);
        if (_loc3_ != null) {
            return _loc3_;
        }
        if (param2 == null) {
            return null;
        }
        _loc3_ = this._visualizationFactory.createGraphicAssetCollection();
        if (_loc3_ != null) {
            _loc3_.assetLibrary = param2;
            this._SafeStr_2402.add(param1, _loc3_);
        }
        return _loc3_;
    }

    public getGraphicAssetCollection(param1: string): IGraphicAssetCollection {
        let _loc2_: string = this.getContentType(param1);
        return asGuarded(this._SafeStr_2402.getValue(_loc2_), isIGraphicAssetCollection);
    }

    public roomObjectCreated(param1: IRoomObject, param2: string): void {
        let _loc3_: IRoomObjectController = isIRoomObjectController(param1) ? param1 : null;
        if (_loc3_ && _loc3_.getModelController()) {
            _loc3_.getModelController().setString("object_room_id", param2, true);
        }
    }

    private disposeGraphicAssetCollection(param1: string): boolean {
        let _loc3_: IGraphicAssetCollection = null;
        let _loc2_: string = this.getContentType(param1);
        if (this._SafeStr_2402[_loc2_] != null) {
            _loc3_ = this._SafeStr_2402.remove(_loc2_);
            if (_loc3_ != null) {
                _loc3_.dispose();
            }
            return true;
        }
        return false;
    }

    public furniDataReady(): void {
        this.initFurnitureData();
    }

    public setActiveObjectType(param1: number, param2: string): void {
        this._activeObjectTypes.remove(param1);
        this._activeObjectTypes.add(param1, param2);
    }

    public compressAssets(): void {
        let _loc5_: IGraphicAssetCollection = null;
        let _loc10_: string = null;
        let _loc7_: number = 0;
        let _loc2_: string = null;
        let _loc3_: IAssetLibrary = null;
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: BitmapDataAsset = null;
        let _loc1_: number = this._SafeStr_2402.length | 0;
        let _loc6_: any[] = this.getPlaceHolderTypes();
        _loc7_ = _loc1_ - 1;
        while (_loc7_ > -1) {
            _loc10_ = stringOrNull(this._SafeStr_2402.getKey(_loc7_));
            if (_loc6_.indexOf(_loc10_) == -1) {
                _loc5_ = this._SafeStr_2402.getValue(_loc10_);
                _loc2_ = this.getAssetLibraryName(_loc10_);
                _loc3_ = asGuarded(this._libraries.getValue(_loc2_), isIAssetLibrary);
                if (_loc3_) {
                    _loc4_ = _loc3_.numAssets | 0;
                    _loc8_ = 0;
                    while (_loc8_ < _loc4_) {
                        _loc9_ = asInstanceOf(_loc3_.getAssetByIndex(_loc8_ >>> 0), BitmapDataAsset);
                        if (!_loc9_) {
                        }
                        _loc8_++;
                    }
                }
            }
            _loc7_--;
        }
        this._lastAssetCompressionTime = getTimer() >>> 0;
    }

    public purge(): void {
        let _loc4_: IGraphicAssetCollection = null;
        let _loc7_: string = null;
        let _loc5_: number = 0;
        let _loc2_: string = null;
        let _loc3_: IAssetLibrary = null;
        if (this._disposed) {
            return;
        }
        let _loc1_: number = this._SafeStr_2402.length | 0;
        let _loc6_: number = getTimer();
        _loc5_ = _loc1_ - 1;
        while (_loc5_ > -1) {
            _loc7_ = stringOrNull(this._SafeStr_2402.getKey(_loc5_));
            if (RoomContentLoader.PLACE_HOLDER_TYPES.indexOf(_loc7_) < 0) {
                _loc4_ = this._SafeStr_2402.getValue(_loc7_);
                if (_loc4_ && _loc4_.getReferenceCount() < 1 && _loc6_ - _loc4_.getLastReferenceTimeStamp() >= 20000) {
                    this._SafeStr_2402.remove(_loc7_);
                    _loc4_.dispose();
                    _loc2_ = this.getAssetLibraryName(_loc7_);
                    _loc3_ = asGuarded(this._libraries.getValue(_loc2_), isIAssetLibrary);
                    if (_loc3_) {
                        this._libraries.remove(_loc2_);
                        _loc3_.dispose();
                    }
                }
            }
            _loc5_--;
        }
    }

    public set iconAssets(param1: IAssetLibrary) {
        this._iconAssets = param1;
    }

    public set iconListener(param1: IRoomContentListener) {
        this._iconListener = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
