import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectVisualization';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { RoomId } from '@/com/sulake/room/utils/RoomId';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomPreviewer {
    static { registerClassName(this, 'com.sulake.habbo.room.preview::RoomPreviewer'); }

    static #staticsReady = false;

    private static readonly PREVIEW_CANVAS_ID: number = 1;
    private static readonly PREVIEW_OBJECT_ID: number = 1;
    private static readonly PREVIEW_WALL_ITEM_DEFAULT_DIRECTION: number = 90;
    private static readonly PREVIEW_WALL_ITEM_MIRRORED_DIRECTION: number = 180;
    private static readonly ALLOWED_IMAGE_CUT: number = 0.25;
    public static readonly SCALE_NORMAL: number = 64;
    public static readonly SCALE_SMALL: number = 32;
    private static readonly AUTOMATIC_STATE_CHANGE_INTERVAL: number = 2500;

    private static get PREVIEW_OBJECT_LOCATION(): Vector3d {
        RoomPreviewer.#initStatics();
        return RoomPreviewer.PREVIEW_OBJECT_LOCATION;
    }

    private static get PREVIEW_WALL_ITEM_LOCATION(): Vector3d {
        RoomPreviewer.#initStatics();
        return RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION;
    }

    declare private _roomEngine: IRoomEngine;

    private _previewRoomId: number = 1;
    private _SafeStr_3653: number = 0;
    private _SafeStr_2449: number = 0;
    private _SafeStr_3972: string = "";
    private _currentPreviewRectangle: Rectangle = null;
    private _currentPreviewCanvasWidth: number = 0;
    private _SafeStr_3439: number = 0;
    private _SafeStr_2552: number = 64;

    declare private _SafeStr_3580: boolean;
    static { (this.prototype as any)._SafeStr_3580 = false; }

    declare private _SafeStr_3487: boolean;
    static { (this.prototype as any)._SafeStr_3487 = false; }

    declare private _previousAutomaticStateChangeTime: number;
    static { (this.prototype as any)._previousAutomaticStateChangeTime = 0; }

    private _addViewOffset: Point = new Point(0, 0);
    private _centerWallItems: boolean = false;
    private _disableUpdate: boolean = false;

    constructor(param1: IRoomEngine, param2: number = 1) {
        this._roomEngine = param1;
        this._previewRoomId = RoomId.makeRoomPreviewerId(param2);
        if (this._roomEngine) {
            this._roomEngine.events.addEventListener("REOE_ADDED", this.onRoomObjectAdded);
            this._roomEngine.events.addEventListener("REOE_CONTENT_UPDATED", this.onRoomObjectAdded);
            this._roomEngine.events.addEventListener("REE_INITIALIZED", this.onRoomInitialized);
        }
    }

    public dispose(): void {
        this.reset(true);
        if (this._roomEngine && this._roomEngine.events != null) {
            this._roomEngine.events.removeEventListener("REOE_ADDED", this.onRoomObjectAdded);
            this._roomEngine.events.removeEventListener("REOE_CONTENT_UPDATED", this.onRoomObjectAdded);
            this._roomEngine.events.removeEventListener("REE_INITIALIZED", this.onRoomInitialized);
        }
    }

    public createRoomForPreviews(): void {
        let _loc1_: number = 0;
        let _loc2_: RoomPlaneParser = null;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        if (this._roomEngine) {
            _loc1_ = 7;
            _loc2_ = new RoomPlaneParser();
            _loc2_.initializeTileMap(_loc1_ + 2, _loc1_ + 2);
            _loc4_ = 1;
            while (_loc4_ < 1 + _loc1_) {
                _loc3_ = 1;
                while (_loc3_ < 1 + _loc1_) {
                    _loc2_.setTileHeight(_loc3_, _loc4_, 0);
                    _loc3_++;
                }
                _loc4_++;
            }
            _loc2_.initializeFromTileData();
            this._roomEngine.initializeRoom(this._previewRoomId, _loc2_.getXML());
            _loc2_.dispose();
        }
    }

    public reset(param1: boolean): void {
        if (this._roomEngine) {
            this._roomEngine.disposeObjectFurniture(this._previewRoomId, 1);
            this._roomEngine.disposeObjectWallItem(this._previewRoomId, 1);
            this._roomEngine.disposeObjectUser(this._previewRoomId, 1);
            if (!param1) {
                this.updatePreviewRoomView();
            }
        }
        this._SafeStr_2449 = -2;
    }

    public addFurnitureIntoRoom(param1: number, param2: IVector3d, param3: IStuffData = null, param4: string = null): number {
        let _loc6_: IRoomObject = null;
        let _loc5_: number = -1;
        if (param3 == null) {
            param3 = new LegacyStuffData();
        }
        if (this.isRoomEngineReady) {
            if (this._SafeStr_2449 == 10 && this._SafeStr_3653 == param1) {
                return 1;
            }
            this.reset(false);
            this._SafeStr_3653 = param1;
            this._SafeStr_2449 = 10;
            this._SafeStr_3972 = "";
            if (this._roomEngine.addObjectFurniture(this._previewRoomId, 1, param1, RoomPreviewer.PREVIEW_OBJECT_LOCATION, param2, 0, param3, NaN, -1, 0, 0, "", true, false)) {
                this._previousAutomaticStateChangeTime = getTimer();
                this._SafeStr_3487 = true;
                _loc5_ = 1;
                _loc6_ = this._roomEngine.getRoomObject(this._previewRoomId, 1, this._SafeStr_2449);
                if (_loc6_) {
                    if (param4 != null) {
                        (asGuarded(_loc6_.getModel(), isIRoomObjectModelController)).setString("furniture_extras", param4);
                    }
                    this.applyInvisibleLayerState(_loc6_);
                }
                this.updatePreviewRoomView();
            }
        }
        return _loc5_;
    }

    public canRotatePreviewFurniture(): boolean {
        let _loc1_: any[] = this.getPreviewFurnitureAllowedDirections();
        return _loc1_ != null && _loc1_.length > 1;
    }

    public rotatePreviewFurniture(param1: boolean): boolean {
        let _loc2_: IRoomObjectController = this.getPreviewFurnitureObject();
        if (_loc2_ == null) {
            return false;
        }
        let _loc3_: number = this.getValidPreviewFurnitureDirection(_loc2_, param1);
        if (_loc3_ == _loc2_.getDirection().x) {
            return false;
        }
        _loc2_.setDirection(new Vector3d(_loc3_));
        this.updatePreviewRoomView(true);
        this.updateRoomEngine();
        return true;
    }

    public canRotatePreviewWallItem(): boolean {
        return this.getPreviewWallItemObject() != null;
    }

    public rotatePreviewWallItem(): boolean {
        let _loc1_: IRoomObjectController = this.getPreviewWallItemObject();
        if (_loc1_ == null) {
            return false;
        }
        let _loc2_: number = this.isPreviewWallItemMirrored(_loc1_.getDirection().x) ? 90 : 180;
        _loc1_.setDirection(new Vector3d(_loc2_));
        this.updatePreviewWallItemLocation(_loc1_);
        this._currentPreviewRectangle = null;
        this.updatePreviewRoomView(true);
        this.updateRoomEngine();
        return true;
    }

    public addWallItemIntoRoom(param1: number, param2: IVector3d, param3: string): number {
        let _loc5_: IRoomObject = null;
        let _loc4_: number = -1;
        if (this.isRoomEngineReady) {
            if (this._SafeStr_2449 == 20 && this._SafeStr_3653 == param1 && this._SafeStr_3972 == param3) {
                return 1;
            }
            this.reset(false);
            this._SafeStr_3653 = param1;
            this._SafeStr_2449 = 20;
            this._SafeStr_3972 = param3;
            if (this._roomEngine.addObjectWallItem(this._previewRoomId, 1, param1, RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION, param2, 0, param3, 0, 0, "", -1, false)) {
                this._previousAutomaticStateChangeTime = getTimer();
                this._SafeStr_3487 = true;
                _loc5_ = this._roomEngine.getRoomObject(this._previewRoomId, 1, this._SafeStr_2449);
                if (_loc5_ != null) {
                    this.applyInvisibleLayerState(_loc5_);
                }
                return 1;
            }
        }
        return _loc4_;
    }

    public addAvatarIntoRoom(param1: string, param2: number = 0): number {
        if (this.isRoomEngineReady) {
            this.reset(false);
            this._SafeStr_3653 = 1;
            this._SafeStr_2449 = 100;
            this._SafeStr_3972 = param1;
            if (this._roomEngine.addObjectUser(this._previewRoomId, 1, RoomPreviewer.PREVIEW_OBJECT_LOCATION, new Vector3d(90, 0, 0), 135, 1, param1)) {
                this._previousAutomaticStateChangeTime = getTimer();
                this._SafeStr_3487 = true;
                this.updateUserGesture(1);
                this.updateUserEffect(param2);
                this.updateUserPosture("std");
            }
            this.updatePreviewRoomView();
            return 1;
        }
        return -1;
    }

    public updateUserPosture(param1: string, param2: string = ""): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.updateObjectUserPosture(this._previewRoomId, 1, param1, param2);
        }
    }

    public updateUserGesture(param1: number): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.updateObjectUserGesture(this._previewRoomId, 1, param1);
        }
    }

    public updateUserEffect(param1: number): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.updateObjectUserEffect(this._previewRoomId, 1, param1);
        }
    }

    public updateObjectUserFigure(param1: string, param2: string = null, param3: string = null, param4: boolean = false): boolean {
        if (this.isRoomEngineReady) {
            return this._roomEngine.updateObjectUserFigure(this._previewRoomId, 1, param1, param2, param3, param4);
        }
        return false;
    }

    public updateObjectUserAction(param1: string, param2: number, param3: string = null): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.updateObjectUserAction(this._previewRoomId, 1, param1, param2, param3);
        }
    }

    public changeRoomObjectState(): void {
        if (this.isRoomEngineReady) {
            this._SafeStr_3487 = false;
            if (this._SafeStr_2449 != 100) {
                this._roomEngine.changeObjectState(this._previewRoomId, 1, this._SafeStr_2449);
            }
        }
    }

    private checkAutomaticRoomObjectStateChange(): void {
        let _loc1_: number = 0;
        if (this._SafeStr_3487) {
            _loc1_ = getTimer();
            if (_loc1_ > this._previousAutomaticStateChangeTime + 2500) {
                this._previousAutomaticStateChangeTime = _loc1_;
                if (this.isRoomEngineReady) {
                    this._roomEngine.changeObjectState(this._previewRoomId, 1, this._SafeStr_2449);
                }
            }
        }
    }

    public getRoomCanvas(param1: number, param2: number): DisplayObject {
        let _loc3_: DisplayObject = null;
        let _loc4_: IRoomGeometry = null;
        if (this._roomEngine) {
            _loc3_ = this._roomEngine.createRoomCanvas(this._previewRoomId, 1, param1, param2, this._SafeStr_2552);
            this._roomEngine.setRoomCanvasMask(this._previewRoomId, 1, true);
            _loc4_ = this._roomEngine.getRoomCanvasGeometry(this._previewRoomId, 1);
            if (_loc4_ != null) {
                _loc4_.adjustLocation(RoomPreviewer.PREVIEW_OBJECT_LOCATION, 30);
            }
            this._currentPreviewCanvasWidth = param1;
            this._SafeStr_3439 = param2;
            return _loc3_;
        }
        return null;
    }

    public modifyRoomCanvas(param1: number, param2: number): void {
        if (this._roomEngine) {
            this._currentPreviewCanvasWidth = param1;
            this._SafeStr_3439 = param2;
            this._roomEngine.modifyRoomCanvas(this._previewRoomId, 1, param1, param2);
        }
    }

    public set addViewOffset(param1: Point) {
        this._addViewOffset = param1;
    }

    public get addViewOffset(): Point {
        return this._addViewOffset;
    }

    public set centerWallItems(param1: boolean) {
        this._centerWallItems = param1;
    }

    private updatePreviewObjectBoundingRectangle(param1: Point): void {
        let _loc2_: Rectangle = null;
        let _loc3_: Rectangle = this._roomEngine.getRoomObjectBoundingRectangle(this._previewRoomId, 1, this._SafeStr_2449, 1);
        if (_loc3_ != null && param1 != null) {
            _loc3_.offset(-(this._currentPreviewCanvasWidth >> 1), -(this._SafeStr_3439 >> 1));
            _loc3_.offset(-param1.x, -param1.y);
            if (this._currentPreviewRectangle == null) {
                this._currentPreviewRectangle = _loc3_;
            } else {
                _loc2_ = this._currentPreviewRectangle.union(_loc3_);
                if (_loc2_.width - this._currentPreviewRectangle.width > this._currentPreviewCanvasWidth - this._currentPreviewRectangle.width >> 1 || _loc2_.height - this._currentPreviewRectangle.height > this._SafeStr_3439 - this._currentPreviewRectangle.height >> 1 || this._currentPreviewRectangle.width < 1 || this._currentPreviewRectangle.height < 1) {
                    this._currentPreviewRectangle = _loc2_;
                }
            }
        }
    }

    private validatePreviewSize(param1: Point): Point {
        let _loc2_: IRoomGeometry = null;
        if (this._currentPreviewRectangle.width < 1 || this._currentPreviewRectangle.height < 1) {
            return param1;
        }
        if (this.isRoomEngineReady) {
            _loc2_ = this._roomEngine.getRoomCanvasGeometry(this._previewRoomId, 1);
            if (this._currentPreviewRectangle.width > this._currentPreviewCanvasWidth * (1 + 0.25) || this._currentPreviewRectangle.height > this._SafeStr_3439 * (1 + 0.25)) {
                if ((this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
                    if (this._roomEngine.getRoomCanvasScale(this._previewRoomId, 1) != 0.5) {
                        this._roomEngine.setRoomCanvasScale(this._previewRoomId, 1, 0.5, null, null, false, false, true);
                        this._SafeStr_2552 = 32;
                        this._SafeStr_3580 = true;
                        param1.x >>= 1;
                        param1.y >>= 1;
                        this._currentPreviewRectangle.left >>= 2;
                        this._currentPreviewRectangle.right >>= 2;
                        this._currentPreviewRectangle.top >>= 2;
                        this._currentPreviewRectangle.bottom >>= 2;
                    }
                } else if (_loc2_.isZoomedIn()) {
                    _loc2_.performZoomOut();
                    this._SafeStr_2552 = 32;
                    this._SafeStr_3580 = true;
                    param1.x >>= 1;
                    param1.y >>= 1;
                    this._currentPreviewRectangle.left >>= 2;
                    this._currentPreviewRectangle.right >>= 2;
                    this._currentPreviewRectangle.top >>= 2;
                    this._currentPreviewRectangle.bottom >>= 2;
                }
            } else if (this._currentPreviewRectangle.width << 1 < this._currentPreviewCanvasWidth * (1 + 0.25) - 5 && this._currentPreviewRectangle.height << 1 < this._SafeStr_3439 * (1 + 0.25) - 5) {
                if ((this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
                    if (this._roomEngine.getRoomCanvasScale(this._previewRoomId, 1) != 1 && !this._SafeStr_3580) {
                        this._roomEngine.setRoomCanvasScale(this._previewRoomId, 1, 1, null, null, false, false, true);
                        this._SafeStr_2552 = 64;
                        param1.x <<= 1;
                        param1.y <<= 1;
                    }
                } else if (!_loc2_.isZoomedIn() && !this._SafeStr_3580) {
                    _loc2_.performZoomIn();
                    this._SafeStr_2552 = 64;
                    param1.x <<= 1;
                    param1.y <<= 1;
                }
            }
        }
        return param1;
    }

    public zoomIn(): void {
        let _loc1_: IRoomGeometry = null;
        if (this.isRoomEngineReady) {
            if ((this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
                this._roomEngine.setRoomCanvasScale(this._previewRoomId, 1, 1);
            }
            _loc1_ = this._roomEngine.getRoomCanvasGeometry(this._previewRoomId, 1);
            if (!_loc1_) {
                return;
            }
            _loc1_.performZoomIn();
        }
        this._SafeStr_2552 = 64;
    }

    public zoomOut(): void {
        let _loc1_: IRoomGeometry = null;
        if (this.isRoomEngineReady) {
            if ((this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
                this._roomEngine.setRoomCanvasScale(this._previewRoomId, 1, 0.5);
            } else {
                _loc1_ = this._roomEngine.getRoomCanvasGeometry(this._previewRoomId, 1);
                if (!_loc1_) {
                    return;
                }
                _loc1_.performZoomOut();
            }
        }
        this._SafeStr_2552 = 32;
    }

    public updateAvatarDirectionAndLocation(param1: number, param2: number, param3: Vector3d = null): void {
        if (this.isRoomEngineReady) {
            if (param3 == null) {
                param3 = RoomPreviewer.PREVIEW_OBJECT_LOCATION;
            }
            this._roomEngine.updateObjectUser(this._previewRoomId, 1, param3, param3, false, 0, new Vector3d(param1 * 45, 0, 0), param2 * 45);
        }
    }

    public updateObjectRoom(param1: string = null, param2: string = null, param3: string = null, param4: boolean = false): boolean {
        if (this.isRoomEngineReady) {
            return this._roomEngine.updateObjectRoom(this._previewRoomId, param1, param2, param3, false);
        }
        return false;
    }

    public updateRoomWallsAndFloorVisibility(param1: boolean, param2: boolean = true): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.updateObjectRoomVisibilities(this._previewRoomId, param1, param2);
        }
    }

    private getCanvasOffset(param1: Point): Point {
        let _loc7_: number = NaN;
        if (this._centerWallItems && this._SafeStr_2449 == 20 && (this._currentPreviewRectangle.width < 1 || this._currentPreviewRectangle.height < 1)) {
            if (this._addViewOffset.x != param1.x) {
                return new Point(this._addViewOffset.x, param1.y);
            }
            return null;
        }
        if (this._currentPreviewRectangle.width < 1 || this._currentPreviewRectangle.height < 1) {
            return param1;
        }
        let _loc4_: number = (this._centerWallItems && this._SafeStr_2449 == 20 ? this._addViewOffset.x : -(this._currentPreviewRectangle.left + this._currentPreviewRectangle.right) >> 1) | 0;
        let _loc2_: number = -(this._currentPreviewRectangle.top + this._currentPreviewRectangle.bottom) >> 1;
        let _loc3_: number = this._SafeStr_3439 - this._currentPreviewRectangle.height >> 1;
        if (_loc3_ > 10) {
            _loc2_ = _loc2_ + Math.min(15, _loc3_ - 10) | 0;
        } else if (this._SafeStr_2449 != 100) {
            _loc2_ = _loc2_ + (5 - Math.max(0, _loc3_ / 2)) | 0;
        } else {
            _loc2_ = _loc2_ - (5 - Math.min(0, _loc3_ / 2)) | 0;
        }
        _loc2_ = _loc2_ + this._addViewOffset.y | 0;
        if (!this._centerWallItems || this._SafeStr_2449 != 20) {
            _loc4_ = _loc4_ + this._addViewOffset.x | 0;
        }
        let _loc5_: number = _loc4_ - param1.x | 0;
        let _loc6_: number = _loc2_ - param1.y | 0;
        if (_loc5_ != 0 || _loc6_ != 0) {
            _loc7_ = Math.sqrt(_loc5_ * _loc5_ + _loc6_ * _loc6_);
            if (_loc7_ > 10) {
                _loc4_ = param1.x + _loc5_ * 10 / _loc7_ | 0;
                _loc2_ = param1.y + _loc6_ * 10 / _loc7_ | 0;
            }
            return new Point(_loc4_, _loc2_);
        }
        return null;
    }

    public updatePreviewRoomView(param1: boolean = false): void {
        let _loc3_: Point = null;
        let _loc4_: number = 0;
        let _loc2_: Point = null;
        if (this._disableUpdate && !param1) {
            return;
        }
        this.checkAutomaticRoomObjectStateChange();
        if (this.isRoomEngineReady) {
            _loc3_ = this._roomEngine.getRoomCanvasScreenOffset(this._previewRoomId, 1);
            if (_loc3_ != null) {
                this.updatePreviewObjectBoundingRectangle(_loc3_);
                if (this._currentPreviewRectangle != null) {
                    _loc4_ = this._SafeStr_2552;
                    _loc3_ = this.validatePreviewSize(_loc3_);
                    _loc2_ = this.getCanvasOffset(_loc3_);
                    if (_loc2_ != null) {
                        this._roomEngine.setRoomCanvasScreenOffset(this._previewRoomId, 1, _loc2_);
                    }
                    if (this._SafeStr_2552 != _loc4_) {
                        this._currentPreviewRectangle = null;
                    }
                }
            }
        }
    }

    public set disableUpdate(param1: boolean) {
        this._disableUpdate = param1;
    }

    public set disableRoomEngineUpdate(param1: boolean) {
        if (this.isRoomEngineReady) {
            this._roomEngine.disableUpdate = param1;
        }
    }

    public get previewRoomId(): number {
        return this._previewRoomId;
    }

    private onRoomInitialized = (param1: RoomEngineEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: string = param1.type;
        if ("REE_INITIALIZED" === _loc2_) {
            if (param1.roomId == this._previewRoomId) {
                if (this._roomEngine) {
                    this._roomEngine.updateObjectRoom(this._previewRoomId, "110", "99999");
                }
            }
        }
    };

    private onRoomObjectAdded = (param1: RoomEngineObjectEvent): void => {
        let _loc2_: IRoomObject = null;
        if (param1.roomId == this._previewRoomId && param1.objectId == 1 && param1.category == this._SafeStr_2449) {
            this._currentPreviewRectangle = null;
            this._SafeStr_3580 = false;
            _loc2_ = this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
            if (_loc2_ != null) {
                this.applyInvisibleLayerState(_loc2_);
            }
            if (_loc2_ != null && _loc2_.getModel() != null && param1.category == 20) {
                this.updatePreviewWallItemLocation(isIRoomObjectController(_loc2_) ? _loc2_ : null);
            }
        }
    };

    private applyInvisibleLayerState(param1: IRoomObject): void {
        if (param1 == null || this._roomEngine == null) {
            return;
        }
        let _loc2_: IRoomObjectModelController = asGuarded(param1.getModel(), isIRoomObjectModelController);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.setNumber("furniture_invisible_layer", 1);
    }

    private getPreviewFurnitureObject(): IRoomObjectController {
        if (!this.isRoomEngineReady || this._SafeStr_2449 != 10) {
            return null;
        }
        return asGuarded(this._roomEngine.getRoomObject(this._previewRoomId, 1, this._SafeStr_2449), isIRoomObjectController);
    }

    private getPreviewFurnitureAllowedDirections(): any[] {
        let _loc1_: IRoomObjectController = this.getPreviewFurnitureObject();
        if (_loc1_ == null || _loc1_.getModel() == null) {
            return null;
        }
        return _loc1_.getModel().getNumberArray("furniture_allowed_directions");
    }

    private getValidPreviewFurnitureDirection(param1: IRoomObjectController, param2: boolean): number {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (param1 == null || param1.getModel() == null) {
            return 0;
        }
        let _loc3_: any[] = param1.getModel().getNumberArray("furniture_allowed_directions");
        let _loc6_: number = param1.getDirection().x | 0;
        if (_loc3_ != null && _loc3_.length > 0) {
            _loc4_ = _loc3_.indexOf(_loc6_);
            if (_loc4_ < 0) {
                _loc4_ = 0;
                _loc5_ = 0;
                while (_loc5_ < _loc3_.length) {
                    if (_loc6_ <= _loc3_[_loc5_]) {
                        break;
                    }
                    _loc4_++;
                    _loc5_++;
                }
                _loc4_ %= _loc3_.length;
            }
            if (param2) {
                _loc4_ = (_loc4_ + 1) % _loc3_.length;
            } else {
                _loc4_ = (_loc4_ - 1 + _loc3_.length) % _loc3_.length;
            }
            _loc6_ = _loc3_[_loc4_] | 0;
        }
        return _loc6_;
    }

    private getPreviewWallItemObject(): IRoomObjectController {
        if (!this.isRoomEngineReady || this._SafeStr_2449 != 20) {
            return null;
        }
        return asGuarded(this._roomEngine.getRoomObject(this._previewRoomId, 1, this._SafeStr_2449), isIRoomObjectController);
    }

    private isPreviewWallItemMirrored(param1: number): boolean {
        param1 = (param1 % 360 + 360) % 360;
        return param1 == 180;
    }

    private updatePreviewWallItemLocation(param1: IRoomObjectController): void {
        if (param1 == null || this._roomEngine == null) {
            return;
        }
        let _loc2_: boolean = this.isPreviewWallItemMirrored(param1.getDirection().x);
        let _loc3_: number = _loc2_ ? RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION.y : RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION.x;
        let _loc4_: number = _loc2_ ? RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION.x : RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION.y;
        this._roomEngine.updateObjectWallItemLocation(this._previewRoomId, 1, new Vector3d(_loc3_, _loc4_, this.getPreviewWallItemZ(param1)));
    }

    private getPreviewWallItemZ(param1: IRoomObjectController): number {
        let _loc2_: number = NaN;
        let _loc3_: number = NaN;
        if (param1 != null && param1.getModel() != null) {
            _loc2_ = Number(param1.getModel().getNumber("furniture_size_z"));
            _loc3_ = Number(param1.getModel().getNumber("furniture_center_z"));
            if (!isNaN(_loc2_) && !isNaN(_loc3_)) {
                return (3.6 - _loc2_) / 2 + _loc3_;
            }
        }
        let _loc4_: IVector3d = param1 != null ? param1.getLocation() : null;
        if (_loc4_ != null && !isNaN(_loc4_.z)) {
            return _loc4_.z;
        }
        return RoomPreviewer.PREVIEW_WALL_ITEM_LOCATION.z;
    }

    public updateRoomEngine(): void {
        if (this.isRoomEngineReady) {
            this._roomEngine.runUpdate();
        }
    }

    public getGenericRoomObjectImage(param1: string, param2: string, param3: IVector3d, param4: number, param5: IGetImageListener, param6: number = 0, param7: string = null, param8: IStuffData = null, param9: number = -1, param10: number = -1, param11: string = null): ImageResult {
        if (this.isRoomEngineReady) {
            return this._roomEngine.getGenericRoomObjectImage(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        }
        return null;
    }

    public getRoomObjectImage(param1: number, param2: IVector3d, param3: number, param4: IGetImageListener, param5: number = 0): ImageResult {
        if (this.isRoomEngineReady) {
            return this._roomEngine.getRoomObjectImage(this._previewRoomId, 1, param1, param2, param3, param4, param5);
        }
        return null;
    }

    public getRoomObjectCurrentImage(): BitmapData {
        let _loc2_: IRoomObject = null;
        let _loc1_: IRoomObjectVisualization = null;
        if (this.isRoomEngineReady) {
            _loc2_ = this._roomEngine.getRoomObject(this._previewRoomId, 1, 100);
            if (_loc2_) {
                _loc1_ = _loc2_.getVisualization();
                if (_loc1_) {
                    return _loc1_.getImage(16777215, -1);
                }
            }
        }
        return null;
    }

    public get isRoomEngineReady(): boolean {
        return this._roomEngine != null && this._roomEngine.isInitialized;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomPreviewer.#staticsReady) return;
        RoomPreviewer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomPreviewer, name, { value, writable: true, configurable: true, enumerable: true });
        set("PREVIEW_OBJECT_LOCATION", null);
        set("PREVIEW_WALL_ITEM_LOCATION", null);
        set("PREVIEW_OBJECT_LOCATION", new Vector3d(2, 2, 0));
        set("PREVIEW_WALL_ITEM_LOCATION", new Vector3d(0.5, 2.3, 1.8));
    }
}
