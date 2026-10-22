import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { RoomContentLoadedEvent } from '@/com/sulake/room/events/RoomContentLoadedEvent';
import type { IRoomContentLoader } from '@/com/sulake/room/IRoomContentLoader';
import type { IRoomInstance } from '@/com/sulake/room/IRoomInstance';
import type { IRoomInstanceContainer } from '@/com/sulake/room/IRoomInstanceContainer';
import type { IRoomManager } from '@/com/sulake/room/IRoomManager';
import type { IRoomManagerListener } from '@/com/sulake/room/IRoomManagerListener';
import type { IRoomObjectFactory } from '@/com/sulake/room/IRoomObjectFactory';
import type { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectVisualizationFactory } from '@/com/sulake/room/object/IRoomObjectVisualizationFactory';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomObjectGraphicVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectGraphicVisualization';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IIDRoomObjectFactory } from '@/com/sulake/iid/IIDRoomObjectFactory';
import { IIDRoomObjectVisualizationFactory } from '@/com/sulake/iid/IIDRoomObjectVisualizationFactory';
import { RoomManagerException } from '@/com/sulake/room/exceptions/RoomManagerException';
import { isIRoomInstance } from '@/com/sulake/room/IRoomInstance';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { RoomInstance } from '@/com/sulake/room/RoomInstance';

export class RoomManager extends Component implements IRoomManager, IRoomInstanceContainer {
    static { registerClassName(this, 'com.sulake.room::RoomManager'); }

    public static readonly ROOM_MANAGER_ERROR: number = -1;
    public static readonly ROOM_MANAGER_LOADING: number = 0;
    public static readonly ROOM_MANAGER_LOADED: number = 1;
    public static readonly ROOM_MANAGER_INITIALIZING: number = 2;
    public static readonly ROOM_MANAGER_INITIALIZED: number = 3;
    private static readonly CONTENT_PROCESSING_TIME_LIMIT_MILLISECONDS: number = 40;

    declare private _rooms: UtilsMap;

    declare private _SafeStr_2209: IRoomContentLoader;

    declare private _SafeStr_3170: string[];

    declare private _updateCategories: number[];

    declare private _SafeStr_4104: number;

    declare private _SafeStr_2333: IRoomManagerListener;

    declare private _objectFactory: IRoomObjectFactory;

    declare private _visualizationFactory: IRoomObjectVisualizationFactory;

    declare private _state: number;

    declare private _SafeStr_3979: XML;

    declare private _unprocessedLoadedContentTypes: string[];

    declare private _skipContentProcessingForNextFrame: boolean;

    declare private _limitContentProcessing: boolean;

    declare private _disposed_RoomManager: boolean;

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
        this._rooms = new UtilsMap();
        this._SafeStr_3170 = [];
        this._updateCategories = [];
        this.events.addEventListener("RCLE_SUCCESS", this.onContentLoaded);
        this.events.addEventListener("RCLE_FAILURE", this.onContentLoaded);
        this.events.addEventListener("RCLE_CANCEL", this.onContentLoaded);
    }

    public override get disposed(): boolean {
        return this._disposed_RoomManager;
    }

    public set limitContentProcessing(param1: boolean) {
        this._limitContentProcessing = param1;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDRoomObjectFactory(), (param1: IRoomObjectFactory): void => {
             this._objectFactory = param1;
         }), new ComponentDependency(new IIDRoomObjectVisualizationFactory(), (param1: IRoomObjectVisualizationFactory): void => {
             this._visualizationFactory = param1;
         })]);
    }

    protected override initComponent(): void {
        let _loc1_: XML = null;
        this._state = 1;
        if (this._SafeStr_3979 != null) {
            _loc1_ = this._SafeStr_3979;
            this._SafeStr_3979 = null;
            this.initialize(_loc1_, this._SafeStr_2333);
        }
    }

    public override dispose(): void {
        let _loc2_: IRoomInstance = null;
        if (this.disposed) {
            return;
        }
        if (this._rooms != null) {
            for (const _loc1_ of this._rooms.getKeys() ?? []) {
                _loc2_ = asGuarded(this._rooms.getValue(_loc1_), isIRoomInstance);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                this._objectFactory.disposeRoomLogicData(stringOrNull(_loc1_));
                this._visualizationFactory.disposeRoomVisualizationData(stringOrNull(_loc1_));
            }
            this._rooms.dispose();
            this._rooms = null;
        }
        this._SafeStr_2333 = null;
        this._SafeStr_3170 = null;
        this._updateCategories = null;
        this._SafeStr_2209 = null;
        super.dispose();
    }

    public initialize(param1: XML, param2: IRoomManagerListener): boolean {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        if (this._state == 0) {
            if (this._SafeStr_3979 != null) {
                return false;
            }
            this._SafeStr_3979 = param1;
            this._SafeStr_2333 = param2;
            return true;
        }
        if (this._state >= 2) {
            return false;
        }
        if (param1 == null) {
            return false;
        }
        if (this._SafeStr_2209 == null) {
            return false;
        }
        this._SafeStr_4104 = 50;
        this._SafeStr_2333 = param2;
        let _loc3_: any[] = this._SafeStr_2209.getPlaceHolderTypes();
        _loc4_ = 0;
        while (_loc4_ < _loc3_.length) {
            _loc5_ = stringOrNull(_loc3_[_loc4_]);
            if (this._SafeStr_3170.indexOf(_loc5_) < 0) {
                this._SafeStr_2209.loadObjectContent(_loc5_, this.events);
                this._SafeStr_3170.push(_loc5_);
            }
            _loc4_++;
        }
        this._state = 2;
        return true;
    }

    public setContentLoader(param1: IRoomContentLoader): void {
        if (this._SafeStr_2209 != null) {
            this._SafeStr_2209.dispose();
        }
        this._SafeStr_2209 = param1;
    }

    public addObjectUpdateCategory(param1: number): void {
        let _loc3_: number = 0;
        let _loc4_: RoomInstance = null;
        let _loc2_: number = this._updateCategories.indexOf(param1);
        if (_loc2_ >= 0) {
            return;
        }
        this._updateCategories.push(param1);
        _loc3_ = this._rooms.length - 1;
        while (_loc3_ >= 0) {
            _loc4_ = asInstanceOf(this._rooms.getWithIndex(_loc3_), RoomInstance);
            if (_loc4_ != null) {
                _loc4_.addObjectUpdateCategory(param1);
            }
            _loc3_--;
        }
    }

    public removeObjectUpdateCategory(param1: number): void {
        let _loc3_: number = 0;
        let _loc4_: RoomInstance = null;
        let _loc2_: number = this._updateCategories.indexOf(param1);
        if (_loc2_ < 0) {
            return;
        }
        this._updateCategories.splice(_loc2_, 1);
        _loc3_ = this._rooms.length - 1;
        while (_loc3_ >= 0) {
            _loc4_ = asInstanceOf(this._rooms.getWithIndex(_loc3_), RoomInstance);
            if (_loc4_ != null) {
                _loc4_.removeObjectUpdateCategory(param1);
            }
            _loc3_--;
        }
    }

    public createRoom(param1: string, param2: XML): IRoomInstance {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (this._state < 3) {
            throw new RoomManagerException();
        }
        if (this._rooms.getValue(param1) != null) {
            return null;
        }
        let _loc5_: RoomInstance = new RoomInstance(param1, this);
        this._rooms.add(param1, _loc5_);
        _loc3_ = this._updateCategories.length - 1;
        while (_loc3_ >= 0) {
            _loc4_ = this._updateCategories[_loc3_];
            _loc5_.addObjectUpdateCategory(_loc4_);
            _loc3_--;
        }
        return _loc5_;
    }

    public getRoom(param1: string): IRoomInstance {
        return asGuarded(this._rooms.getValue(param1), isIRoomInstance);
    }

    public getRoomWithIndex(param1: number): IRoomInstance {
        return this._rooms.getWithIndex(param1);
    }

    public getRoomCount(): number {
        return this._rooms.length | 0;
    }

    public disposeRoom(param1: string): boolean {
        let _loc2_: IRoomInstance = asGuarded(this._rooms.remove(param1), isIRoomInstance);
        if (_loc2_ != null) {
            _loc2_.dispose();
            this._objectFactory.disposeRoomLogicData(param1);
            this._visualizationFactory.disposeRoomVisualizationData(param1);
            return true;
        }
        this._objectFactory.disposeRoomLogicData(param1);
        this._visualizationFactory.disposeRoomVisualizationData(param1);
        return false;
    }

    public updateVariableFxConfigs(param1: string, param2: any[]): void {
        this._objectFactory.updateVariableFxConfigs(param1, param2);
        this._visualizationFactory.updateVariableFxConfigs(param1, param2);
    }

    public removeVariableFxConfigs(param1: string, param2: any[]): void {
        this._objectFactory.removeVariableFxConfigs(param1, param2);
        this._visualizationFactory.removeVariableFxConfigs(param1, param2);
    }

    public createRoomObject(param1: string, param2: number, param3: string, param4: number): IRoomObject {
        if (this._state < 3) {
            throw new RoomManagerException();
        }
        let _loc11_: IRoomInstance = this.getRoom(param1);
        if (_loc11_ == null) {
            return null;
        }
        if (this._SafeStr_2209 == null) {
            return null;
        }
        let _loc7_: RoomInstance = _loc11_ instanceof RoomInstance ? _loc11_ : null;
        if (_loc7_ == null) {
            return null;
        }
        let _loc10_: IGraphicAssetCollection = null;
        let _loc15_: XML = null;
        let _loc12_: XML = null;
        let _loc9_: string = null;
        let _loc14_: string = null;
        let _loc5_: string = param3;
        let _loc16_: boolean = false;
        if (!this._SafeStr_2209.hasInternalContent(param3)) {
            _loc10_ = this._SafeStr_2209.getGraphicAssetCollection(param3);
            if (_loc10_ == null) {
                _loc16_ = true;
                this._SafeStr_2209.loadObjectContent(param3, this.events);
                _loc5_ = this._SafeStr_2209.getPlaceHolderType(param3);
                _loc10_ = this._SafeStr_2209.getGraphicAssetCollection(_loc5_);
            }
            _loc15_ = this._SafeStr_2209.getVisualizationXML(_loc5_);
            _loc12_ = this._SafeStr_2209.getLogicXML(_loc5_);
            if (_loc15_ == null || _loc10_ == null) {
                return null;
            }
            _loc9_ = this._SafeStr_2209.getVisualizationType(_loc5_);
            _loc14_ = this._SafeStr_2209.getLogicType(_loc5_);
        } else {
            _loc9_ = param3;
            _loc14_ = param3;
        }
        let _loc17_: number = 1;
        let _loc19_: IRoomObject = _loc7_.createObjectInternal(param2, _loc17_, param3, param4);
        let _loc13_: IRoomObjectController = isIRoomObjectController(_loc19_) ? _loc19_ : null;
        if (_loc13_ == null) {
            return null;
        }
        let _loc8_: IRoomObjectGraphicVisualization = this._visualizationFactory.createRoomObjectVisualization(_loc9_, param1);
        if (_loc8_ == null) {
            _loc11_.disposeObject(param2, param4);
            return null;
        }
        _loc8_.assetCollection = _loc10_;
        _loc8_.setExternalBaseUrls(this.context.configuration.getProperty("stories.image_url_base"), this.context.configuration.getProperty("extra_data_service_url"), this.context.configuration.getBoolean("extra_data_batches_enabled"));
        let _loc6_: IRoomObjectVisualizationData = null;
        _loc6_ = this._visualizationFactory.getRoomObjectVisualizationData(_loc5_, _loc9_, _loc15_);
        if (!_loc8_.initialize(_loc6_)) {
            _loc11_.disposeObject(param2, param4);
            return null;
        }
        _loc13_.setVisualization(_loc8_);
        let _loc18_: IRoomObjectEventHandler = this._objectFactory.createRoomObjectLogic(_loc14_, param1);
        _loc13_.setEventHandler(_loc18_);
        if (_loc18_ != null && _loc12_ != null) {
            _loc18_.initialize(_loc12_);
        }
        if (!_loc16_) {
            _loc13_.setInitialized(true);
        }
        this._SafeStr_2209.roomObjectCreated(_loc13_, param1);
        return _loc13_;
    }

    public createRoomObjectManager(): IRoomObjectManager {
        if (this._objectFactory != null) {
            return this._objectFactory.createRoomObjectManager();
        }
        return null;
    }

    public isContentAvailable(param1: string): boolean {
        if (this._SafeStr_2209 != null) {
            if (this._SafeStr_2209.getGraphicAssetCollection(param1) != null) {
                return true;
            }
        }
        return false;
    }

    private processInitialContentLoad(param1: string): void {
        let _loc2_: number = 0;
        if (param1 == null) {
            return;
        }
        if (this._state == -1) {
            return;
        }
        if (this._SafeStr_2209 == null) {
            this._state = -1;
            return;
        }
        if (this._SafeStr_2209.getGraphicAssetCollection(param1) != null) {
            _loc2_ = this._SafeStr_3170.indexOf(param1);
            if (_loc2_ >= 0) {
                this._SafeStr_3170.splice(_loc2_, 1);
            }
            if (this._SafeStr_3170.length == 0) {
                this._state = 3;
                if (this._SafeStr_2333 != null) {
                    this._SafeStr_2333.roomManagerInitialized(true);
                }
            }
        } else {
            this._state = -1;
            this._SafeStr_2333.roomManagerInitialized(false);
        }
    }

    private onContentLoaded(param1: RoomContentLoadedEvent): void {
        if (this._SafeStr_2209 == null) {
            return;
        }
        let _loc2_: string = param1.contentType;
        if (_loc2_ == null) {
            if (this._SafeStr_2333 != null) {
                this._SafeStr_2333.contentLoaded(null, false);
            }
            return;
        }
        if (this._unprocessedLoadedContentTypes.indexOf(_loc2_) < 0) {
            this._unprocessedLoadedContentTypes.push(_loc2_);
        }
    }

    private processLoadedContentTypes(): void {
        let _loc4_: string = null;
        let _loc3_: IGraphicAssetCollection = null;
        let _loc1_: number = 0;
        if (this._skipContentProcessingForNextFrame) {
            this._skipContentProcessingForNextFrame = false;
            return;
        }
        let _loc2_: number = getTimer();
        while (this._unprocessedLoadedContentTypes.length > 0) {
            _loc4_ = this._unprocessedLoadedContentTypes[0];
            this._unprocessedLoadedContentTypes.splice(0, 1);
            if (!this._SafeStr_2209.hasVisualizationXML(_loc4_)) {
                if (this._SafeStr_2333 != null) {
                    this._SafeStr_2333.contentLoaded(_loc4_, false);
                }
                return;
            }
            _loc3_ = this._SafeStr_2209.getGraphicAssetCollection(_loc4_);
            if (_loc3_ == null) {
                if (this._SafeStr_2333 != null) {
                    this._SafeStr_2333.contentLoaded(_loc4_, false);
                }
                return;
            }
            this.updateObjectContents(_loc4_);
            if (this._SafeStr_2333 != null) {
                this._SafeStr_2333.contentLoaded(_loc4_, true);
            }
            if (this._SafeStr_3170.length > 0) {
                this.processInitialContentLoad(_loc4_);
            }
            _loc1_ = getTimer();
            if (_loc1_ - _loc2_ >= 40 && this._limitContentProcessing) {
                this._skipContentProcessingForNextFrame = true;
                break;
            }
        }
    }

    private updateObjectContents(param1: string): void {
        let _loc16_: any;
        let _loc12_: XML = null;
        let _loc8_: IGraphicAssetCollection = null;
        let _loc2_: IRoomObjectVisualizationData = null;
        let _loc14_: XML = null;
        let _loc17_: number = 0;
        let _loc9_: RoomInstance = null;
        let _loc11_: string = null;
        let _loc15_: any[] = null;
        let _loc10_: boolean = false;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc18_: IRoomObjectController = null;
        let _loc5_: IRoomObjectGraphicVisualization = null;
        let _loc3_: IRoomObjectEventHandler = null;
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_2209 == null || this._visualizationFactory == null) {
            return;
        }
        let _loc6_: string = this._SafeStr_2209.getVisualizationType(param1);
        let _loc13_: string = this._SafeStr_2209.getLogicType(param1);
        _loc17_ = this._rooms.length - 1;
        while (_loc17_ >= 0) {
            _loc9_ = asInstanceOf(this._rooms.getWithIndex(_loc17_), RoomInstance);
            _loc11_ = stringOrNull(this._rooms.getKey(_loc17_));
            if (_loc9_ != null) {
                _loc15_ = _loc9_.getObjectManagerIds();
                _loc10_ = false;
                for (_loc16_ of _loc15_ ?? []) {
                    _loc4_ = _loc9_.getObjectCountForType(param1, _loc16_ | 0);
                    _loc7_ = _loc4_ - 1;
                    while (_loc7_ >= 0) {
                        _loc18_ = asGuarded(_loc9_.getObjectWithIndexAndType(_loc7_, param1, _loc16_ | 0), isIRoomObjectController);
                        if (_loc18_ != null) {
                            if (!_loc2_) {
                                _loc14_ = this._SafeStr_2209.getVisualizationXML(param1);
                                if (_loc14_ == null) {
                                    return;
                                }
                                _loc12_ = this._SafeStr_2209.getLogicXML(param1);
                                _loc8_ = this._SafeStr_2209.getGraphicAssetCollection(param1);
                                if (_loc8_ == null) {
                                    return;
                                }
                                _loc2_ = this._visualizationFactory.getRoomObjectVisualizationData(param1, _loc6_, _loc14_);
                            }
                            _loc5_ = this._visualizationFactory.createRoomObjectVisualization(_loc6_, _loc11_);
                            if (_loc5_ != null) {
                                _loc5_.assetCollection = _loc8_;
                                _loc5_.setExternalBaseUrls(this.context.configuration.getProperty("stories.image_url_base"), this.context.configuration.getProperty("extra_data_service_url"), this.context.configuration.getBoolean("extra_data_batches_enabled"));
                                if (!_loc5_.initialize(_loc2_)) {
                                    _loc9_.disposeObject(_loc18_.getId(), _loc16_ | 0);
                                } else {
                                    _loc18_.setVisualization(_loc5_);
                                    _loc3_ = this._objectFactory.createRoomObjectLogic(_loc13_, _loc11_);
                                    _loc18_.setEventHandler(_loc3_);
                                    if (_loc3_ != null) {
                                        _loc3_.initialize(_loc12_);
                                    }
                                    _loc18_.setInitialized(true);
                                    if (this._SafeStr_2333 != null) {
                                        this._SafeStr_2333.objectInitialized(_loc11_, _loc18_.getId(), _loc16_ | 0);
                                        _loc10_ = true;
                                    }
                                }
                            } else {
                                _loc9_.disposeObject(_loc18_.getId(), _loc16_ | 0);
                            }
                        }
                        _loc7_--;
                    }
                }
                if (!_loc9_.hasUninitializedObjects() && _loc10_) {
                    this._SafeStr_2333.objectsInitialized(_loc11_);
                }
            }
            _loc17_--;
        }
    }

    public update(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: RoomInstance = null;
        this.processLoadedContentTypes();
        _loc2_ = this._rooms.length - 1;
        while (_loc2_ >= 0) {
            _loc3_ = asInstanceOf(this._rooms.getWithIndex(_loc2_), RoomInstance);
            if (_loc3_ != null) {
                _loc3_.update();
            }
            _loc2_--;
        }
    }

    protected override initInstanceFields(): void {
        this.onContentLoaded = this.onContentLoaded.bind(this);
        this._SafeStr_4104 = 0;
        this._objectFactory = null;
        this._visualizationFactory = null;
        this._state = 0;
        this._SafeStr_3979 = null;
        this._unprocessedLoadedContentTypes = [];
        this._skipContentProcessingForNextFrame = false;
        this._limitContentProcessing = true;
        this._disposed_RoomManager = false;
        super.initInstanceFields();
    }
}
