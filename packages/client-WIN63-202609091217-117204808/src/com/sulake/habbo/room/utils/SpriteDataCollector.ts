import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomEngine } from '@/com/sulake/habbo/room/RoomEngine';
import type { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IPlaneDrawingData } from '@/com/sulake/room/object/visualization/IPlaneDrawingData';
import type { IPlaneVisualization } from '@/com/sulake/room/object/visualization/IPlaneVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomPlane } from '@/com/sulake/room/object/visualization/IRoomPlane';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PlaneDrawingData } from '@/com/sulake/habbo/room/object/visualization/room/PlaneDrawingData';
import { isIPlaneVisualization } from '@/com/sulake/room/object/visualization/IPlaneVisualization';
import { isIRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class SpriteDataCollector {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::SpriteDataCollector'); }

    private static readonly MANNEQUIN_MAGIC_X_OFFSET: number = 1;
    private static readonly MANNEQUIN_MAGIC_Y_OFFSET: number = -16;
    private static readonly AVATAR_WATER_EFFECT_MAGIC_Y_OFFSET: number = -52;
    private static readonly MAX_EXTERNAL_IMAGE_COUNT: number = 30;

    declare private _SafeStr_3343: number;
    static { (this.prototype as any)._SafeStr_3343 = NaN; }

    private spriteCount: number = 0;
    private externalImageCount: number = 0;

    constructor() {
    }

    private static addMannequinSprites(param1: RoomObjectSpriteData[], param2: RoomEngine): RoomObjectSpriteData[] {
        let _loc4_: any;
        let _loc7_: IRoomObject = null;
        let _loc6_: any[] = null;
        let _loc3_: RoomObjectSpriteData[] = [];
        for (const _loc5_ of param1 ?? []) {
            if (_loc5_.objectType == "boutique_mannequin1" && _loc5_.name.indexOf("mannequin_") == 0) {
                _loc7_ = param2.getRoomObject(param2.activeRoomId, _loc5_.objectId, 10);
                if (_loc7_ != null) {
                    _loc6_ = castGuarded(_loc7_.getVisualization(), isIRoomObjectSpriteVisualization, "com.sulake.room.object.visualization.IRoomObjectSpriteVisualization").getSpriteList();
                    if (_loc6_ != null) {
                        for (_loc4_ of _loc6_ ?? []) {
                            _loc4_.x += _loc5_.x + _loc5_.width / 2 + 1;
                            _loc4_.y += _loc5_.y + _loc5_.height + -16;
                            _loc4_.z += _loc5_.z;
                            _loc3_.push(_loc4_);
                        }
                    }
                }
            } else {
                _loc3_.push(_loc5_);
            }
        }
        return _loc3_;
    }

    private static sortSpriteDataObjects(param1: RoomObjectSpriteData, param2: RoomObjectSpriteData): number {
        if (param1.z < param2.z) {
            return 1;
        }
        if (param1.z > param2.z) {
            return -1;
        }
        return -1;
    }

    private static isSpriteInViewPort(param1: RoomObjectSpriteData, param2: Rectangle, param3: IRoomRenderingCanvas): boolean {
        let _loc4_: Rectangle = new Rectangle(param1.x + param3.screenOffsetX, param1.y + param3.screenOffsetY, param1.width, param1.height);
        return _loc4_.intersects(param2);
    }

    private static sortQuadPoints(param1: Point, param2: Point, param3: Point, param4: Point): Point[] {
        let _loc5_: Point = null;
        let _loc6_: Point[] = new Array<Point>(0).fill(null);
        if (param1.x == param2.x) {
            _loc6_.push(param1, param3, param2, param4);
        } else if (param1.x == param3.x) {
            _loc6_.push(param1, param2, param3, param4);
        } else if (param2.x < param1.x && param2.y > param1.y || param2.x > param1.x && param2.y < param1.y) {
            _loc6_.push(param1, param3, param2, param4);
        } else {
            _loc6_.push(param1, param2, param3, param4);
        }
        if (_loc6_[0].x < _loc6_[1].x) {
            _loc5_ = _loc6_[0];
            _loc6_[0] = _loc6_[1];
            _loc6_[1] = _loc5_;
            _loc5_ = _loc6_[2];
            _loc6_[2] = _loc6_[3];
            _loc6_[3] = _loc5_;
        }
        if (_loc6_[0].y < _loc6_[2].y) {
            _loc5_ = _loc6_[0];
            _loc6_[0] = _loc6_[2];
            _loc6_[2] = _loc5_;
            _loc5_ = _loc6_[1];
            _loc6_[1] = _loc6_[3];
            _loc6_[3] = _loc5_;
        }
        return _loc6_;
    }

    public getFurniData(param1: Rectangle, param2: IRoomRenderingCanvas, param3: RoomEngine, param4: number): string {
        let _loc14_: any;
        let _loc15_: any;
        let _loc12_: any[] = null;
        let _loc7_: number = NaN;
        let _loc16_: number = 0;
        let _loc13_: Point = null;
        let _loc8_: any[] = [];
        let _loc6_: RoomObjectSpriteData[] = param2.getSortableSpriteList();
        let _loc11_: any[] = param3.getRoomObjects(param3.activeRoomId, 100);
        for (const _loc10_ of _loc11_ ?? []) {
            if (_loc10_.getId() != param4) {
                _loc12_ = castGuarded(_loc10_.getVisualization(), isIRoomObjectSpriteVisualization, "com.sulake.room.object.visualization.IRoomObjectSpriteVisualization").getSpriteList();
                if (_loc12_) {
                    _loc7_ = 0;
                    _loc16_ = 0;
                    for (_loc14_ of _loc6_ ?? []) {
                        if (_loc14_.name == "avatar_" + _loc10_.getId()) {
                            _loc7_ = _loc14_.z;
                            _loc16_ = _loc14_.y + _loc14_.height - param2.geometry.scale / 4 | 0;
                            break;
                        }
                    }
                    _loc13_ = param3.getRoomObjectScreenLocation(param3.activeRoomId, _loc10_.getId() | 0, 100, param2.getId());
                    if (_loc13_) {
                        if (_loc16_ == 0) {
                            _loc16_ = _loc13_.y | 0;
                        }
                        for (_loc15_ of _loc12_ ?? []) {
                            _loc15_.x += _loc13_.x - param2.screenOffsetX;
                            _loc15_.y += _loc16_;
                            _loc15_.z += _loc7_;
                            if (_loc15_.name.indexOf("h_std_fx29_") == 0 || _loc15_.name.indexOf("h_std_fx185_") == 0) {
                                _loc15_.y += -52;
                            }
                            _loc6_.push(_loc15_);
                        }
                    }
                }
            }
        }
        _loc6_ = SpriteDataCollector.addMannequinSprites(_loc6_, param3);
        _loc6_.sort(SpriteDataCollector.sortSpriteDataObjects);
        for (const _loc5_ of _loc6_ ?? []) {
            if (_loc5_.name != null && _loc5_.name.length > 0 && _loc5_.name.indexOf("tile_cursor_") != 0 && SpriteDataCollector.isSpriteInViewPort(_loc5_, param1, param2) && (param4 < 0 || _loc5_.objectId != param4)) {
                _loc8_.push(this.getSpriteDataObject(_loc5_, param1, param2, param3));
                if (!this._SafeStr_3343) {
                    this._SafeStr_3343 = _loc5_.z;
                }
                this.spriteCount = this.spriteCount + 1;
            }
        }
        return JSON.stringify(_loc8_);
    }

    public getRoomRenderingModifiers(param1: RoomEngine): string {
        let _loc2_: any = {};
        return JSON.stringify(_loc2_);
    }

    private getSpriteDataObject(param1: RoomObjectSpriteData, param2: Rectangle, param3: IRoomRenderingCanvas, param4: RoomEngine): any {
        let _loc10_: string = null;
        let _loc13_: any[] = null;
        let _loc6_: IGraphicAssetCollection = null;
        let _loc11_: XML = null;
        let _loc9_: string = null;
        let _loc8_: string = null;
        let _loc5_: any = {};
        let _loc12_: string = param1.name;
        if (param1.name.indexOf("@") != -1) {
            _loc13_ = param1.name.split("@");
            _loc12_ = stringOrNull(_loc13_[0]);
            _loc10_ = stringOrNull(_loc13_[1]);
        }
        if (_loc10_ && param1.objectType) {
            _loc6_ = param4.roomContentLoader.getGraphicAssetCollection(param1.objectType);
            if (_loc6_ != null) {
                _loc11_ = _loc6_.getPaletteXML(_loc10_);
                if (_loc11_ != null && _loc11_.attribute("source") != null) {
                    _loc5_.paletteSourceName = _loc11_.attribute("source") + "";
                }
            }
        }
        let _loc7_: string = param4.configuration.getProperty("image.library.url");
        _loc12_ = _loc12_.replace("%image.library.url%", _loc7_);
        if (_loc12_.indexOf("%group.badge.url%") != -1) {
            _loc9_ = param4.configuration.getProperty("group.badge.url");
            _loc12_ = _loc12_.replace("%group.badge.url%", "");
            _loc12_ = _loc8_ = _loc9_.replace("%imagerdata%", _loc12_);
        }
        _loc5_.name = _loc12_;
        _loc5_.x = param1.x - param2.x;
        _loc5_.y = param1.y - param2.y;
        _loc5_.x += param3.screenOffsetX;
        _loc5_.y += param3.screenOffsetY;
        _loc5_.z = param1.z;
        if (param1.alpha && param1.alpha.toString() != "255") {
            _loc5_.alpha = param1.alpha;
        }
        if (param1.flipH) {
            _loc5_.flipH = param1.flipH;
        }
        if (param1.skew) {
            _loc5_.skew = param1.skew;
        }
        if (param1.frame) {
            _loc5_.frame = param1.frame;
        }
        if (param1.color && param1.color.length > 0) {
            _loc5_.color = Number(param1.color) | 0;
        }
        if (param1.blendMode && param1.blendMode != "normal") {
            _loc5_.blendMode = param1.blendMode;
        }
        if (_loc12_.indexOf("http") == 0) {
            _loc5_.width = param1.width;
            _loc5_.height = param1.height;
            this.externalImageCount = this.externalImageCount + 1;
            if (this.externalImageCount > 30) {
                _loc5_.name = "box";
            }
        }
        if (param1.posture) {
            _loc5_.posture = param1.posture;
        }
        return _loc5_;
    }

    private makeBackgroundPlane(param1: Rectangle, param2: number, param3: any[]): IPlaneDrawingData {
        let _loc4_: number = NaN;
        let _loc6_: Point = new Point(0, 0);
        let _loc7_: Point = new Point(param1.width, 0);
        let _loc8_: Point = new Point(0, param1.height);
        let _loc10_: Point = new Point(param1.width, param1.height);
        let _loc9_: Point[] = SpriteDataCollector.sortQuadPoints(_loc6_, _loc7_, _loc8_, _loc10_);
        if (param3.length > 0) {
            _loc4_ = Number(param3[0].z);
            if (this._SafeStr_3343) {
                _loc4_ = Math.max(this._SafeStr_3343, _loc4_);
            }
        } else {
            _loc4_ = this._SafeStr_3343 ? this._SafeStr_3343 : 0;
        }
        _loc4_ += this.spriteCount * 1.776104 + param3.length * 2.31743;
        let _loc5_: IPlaneDrawingData = new PlaneDrawingData(null, param2);
        _loc5_.cornerPoints = _loc9_;
        _loc5_.z = _loc4_;
        return _loc5_;
    }

    private sortRoomPlanes(param1: IRoomPlane[], param2: IRoomRenderingCanvas, param3: RoomEngine): any[] {
        let _loc6_: any = null;
        let _loc7_: IRoomObjectSprite = null;
        let _loc9_: UtilsMap = new UtilsMap();
        let _loc10_: number = 1;
        if (this._SafeStr_3343) {
            _loc10_ += this._SafeStr_3343;
        }
        for (const _loc4_ of param1 ?? []) {
            _loc6_ = {};
            _loc6_.plane = _loc4_;
            _loc6_.z = _loc10_;
            _loc9_.add(_loc4_.uniqueId, _loc6_);
        }
        let _loc11_: any[] = param2.getPlaneSortableSprites();
        _loc11_.sort((a, b) => a.z - b.z);
        _loc11_.reverse();
        let _loc5_: any[] = [];
        for (const _loc8_ of _loc11_ ?? []) {
            _loc7_ = _loc8_.sprite;
            if (_loc7_ != null) {
                _loc6_ = _loc9_.remove(_loc7_.planeId);
                if (_loc6_ != null) {
                    _loc6_.z = _loc8_.z;
                    _loc5_.push(_loc6_);
                }
            }
        }
        return _loc5_.concat(_loc9_.getValues());
    }

    public getRoomPlanes(param1: Rectangle, param2: IRoomRenderingCanvas, param3: RoomEngine, param4: number): any[] {
        let _loc13_: any;
        let _loc21_: any;
        let _loc20_: IRoomGeometry = null;
        let _loc12_: any[] = null;
        let _loc17_: Stage = null;
        let _loc5_: IRoomPlane = null;
        let _loc15_: any = undefined;
        let _loc14_: Vector3d = null;
        let _loc6_: Point = null;
        let _loc8_: Point = null;
        let _loc9_: Point = null;
        let _loc11_: Point = null;
        let _loc22_: number = 0;
        let _loc23_: number = 0;
        let _loc19_: any = undefined;
        let _loc10_: any[] = [];
        let _loc18_: IRoomObject = param3.getRoomObject(param3.activeRoomId, -1, 0);
        let _loc7_: IPlaneVisualization = asGuarded(_loc18_.getVisualization(), isIPlaneVisualization);
        if (_loc7_) {
            _loc20_ = param2.geometry;
            _loc12_ = this.sortRoomPlanes(_loc7_.planes, param2, param3);
            _loc17_ = Core.instance.displayObjectContainer.stage;
            for (const _loc16_ of _loc12_ ?? []) {
                _loc5_ = _loc16_.plane;
                _loc15_ = new Array<Point>(0).fill(null);
                _loc14_ = Vector3d.sum(_loc5_.location, _loc5_.leftSide);
                _loc6_ = _loc20_.getScreenPoint(_loc5_.location);
                _loc8_ = _loc20_.getScreenPoint(_loc14_);
                _loc9_ = _loc20_.getScreenPoint(Vector3d.sum(_loc5_.location, _loc5_.rightSide));
                _loc11_ = _loc20_.getScreenPoint(Vector3d.sum(_loc14_, _loc5_.rightSide));
                _loc15_.push(_loc6_, _loc8_, _loc9_, _loc11_);
                _loc22_ = 0;
                _loc23_ = 0;
                for (_loc13_ of valuesOf(_loc15_)) {
                    _loc13_.offset(_loc17_.stageWidth / 2, _loc17_.stageHeight / 2);
                    _loc13_.offset(param2.screenOffsetX, param2.screenOffsetY);
                    _loc13_.offset(-param1.x, -param1.y);
                    if (_loc13_.x < 0) {
                        _loc22_--;
                    } else if (_loc13_.x >= param1.width) {
                        _loc22_++;
                    }
                    if (_loc13_.y < 0) {
                        _loc23_--;
                    } else if (_loc13_.y >= param1.height) {
                        _loc23_++;
                    }
                }
                if (!(Math.abs(_loc22_) == 4 || Math.abs(_loc23_) == 4)) {
                    _loc19_ = SpriteDataCollector.sortQuadPoints(_loc6_, _loc8_, _loc9_, _loc11_);
                    for (_loc21_ of _loc5_.getDrawingDatas(_loc20_) ?? []) {
                        _loc21_.cornerPoints = _loc19_;
                        _loc21_.z = _loc16_.z;
                        _loc10_.push(_loc21_);
                    }
                }
            }
            _loc10_.unshift(this.makeBackgroundPlane(param1, param4, _loc10_));
        }
        return _loc10_;
    }
}
