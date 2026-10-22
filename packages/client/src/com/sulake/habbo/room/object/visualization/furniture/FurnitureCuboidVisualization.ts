import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLibrary } from '@/com/sulake/core/runtime/Component.group';
import { FurniturePlane } from '@/com/sulake/habbo/room/object/visualization/furniture/FurniturePlane';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurnitureCuboidVisualization extends RoomObjectSpriteVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureCuboidVisualization'); }

    constructor() {
        super();
    }

    private _SafeStr_3052: AssetLibrary = null;
    private _planes: any[] = [];
    private _SafeStr_5301: boolean = false;
    private _SafeStr_4070: number = 0;

    public override dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: FurniturePlane = null;
        super.dispose();
        if (this._SafeStr_3052 != null) {
            this._SafeStr_3052.dispose();
            this._SafeStr_3052 = null;
        }
        if (this._planes != null) {
            _loc2_ = 0;
            while (_loc2_ < this._planes.length) {
                _loc1_ = asInstanceOf(this._planes[_loc2_], FurniturePlane);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._planes = null;
        }
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this.reset();
        return true;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        let _loc5_: IRoomObject = this.object;
        if (_loc5_ == null) {
            return;
        }
        if (this._SafeStr_3052 == null) {
            this._SafeStr_3052 = new AssetLibrary("furniture cuboid visualization - " + _loc5_.getInstanceId());
        }
        if (param1 == null) {
            return;
        }
        this.initializePlanes();
        this.updatePlanes(param1, param2);
    }

    protected defineSprites(): void {
        let _loc1_: number = 1;
        this.createSprites(_loc1_);
    }

    protected initializePlanes(): void {
        let _loc4_: IVector3d = null;
        let _loc1_: FurniturePlane = null;
        if (this._SafeStr_5301) {
            return;
        }
        let _loc6_: IRoomObject = this.object;
        if (_loc6_ == null) {
            return;
        }
        let _loc8_: number = 1;
        let _loc2_: number = _loc6_.getModel().getNumber("furniture_size_x");
        let _loc9_: number = _loc6_.getModel().getNumber("furniture_size_y");
        let _loc10_: number = _loc6_.getModel().getNumber("furniture_size_z");
        if (isNaN(_loc2_) || isNaN(_loc9_) || isNaN(_loc10_)) {
            return;
        }
        let _loc5_: Vector3d = new Vector3d(_loc2_, 0, 0);
        let _loc7_: Vector3d = new Vector3d(0, _loc9_, 0);
        let _loc3_: Vector3d = new Vector3d(-0.5, -0.5, 0);
        if (_loc3_ != null && _loc5_ != null && _loc7_ != null) {
            _loc4_ = Vector3d.crossProduct(_loc5_, _loc7_);
            _loc1_ = new FurniturePlane(_loc3_, _loc5_, _loc7_);
            _loc1_.color = 16776960;
            this._planes.push(_loc1_);
            this._SafeStr_5301 = true;
            this.defineSprites();
        }
    }

    protected updatePlanes(param1: IRoomGeometry, param2: number): void {
        let _loc6_: number = 0;
        let _loc7_: boolean = false;
        let _loc13_: string = null;
        let _loc14_: BitmapDataAsset = null;
        let _loc3_: FurniturePlane = null;
        let _loc8_: number = 0;
        let _loc11_: BitmapData = null;
        let _loc9_: BitmapData = null;
        let _loc12_: IRoomObjectSprite = null;
        let _loc5_: Point = null;
        let _loc10_: IRoomObject = this.object;
        if (_loc10_ == null) {
            return;
        }
        if (param1 == null || this._SafeStr_3052 == null) {
            return;
        }
        this._SafeStr_4070 = this._SafeStr_4070 + 1;
        let _loc4_: any = param2;
        _loc6_ = 0;
        while (_loc6_ < this._planes.length) {
            _loc7_ = false;
            _loc13_ = "plane " + _loc6_ + " " + param1.scale;
            _loc14_ = asInstanceOf(this._SafeStr_3052.getAssetByName(_loc13_), BitmapDataAsset);
            if (_loc14_ == null) {
                _loc14_ = new BitmapDataAsset(this._SafeStr_3052.getAssetTypeDeclarationByClass(BitmapDataAsset));
                this._SafeStr_3052.setAsset(_loc13_, _loc14_);
            }
            _loc3_ = asInstanceOf(this._planes[_loc6_], FurniturePlane);
            if (_loc3_ != null) {
                _loc8_ = _loc10_.getDirection().x | 0;
                if (_loc8_ / 45 == 2 || _loc8_ / 45 == 6) {
                    _loc3_.setRotation(true);
                } else {
                    _loc3_.setRotation(false);
                }
                if (_loc3_.update(param1, _loc4_ | 0)) {
                    _loc11_ = _loc3_.bitmapData;
                    _loc9_ = asInstanceOf(_loc14_.content, BitmapData);
                    if (_loc11_ == null) {
                        _loc14_ = null;
                    } else if (_loc9_ != _loc11_) {
                        if (_loc9_ != null) {
                            _loc9_.dispose();
                        }
                        _loc14_.setUnknownContent(_loc11_);
                    }
                    _loc7_ = true;
                }
            } else {
                _loc14_ = null;
            }
            _loc12_ = this.getSprite(_loc6_);
            if (_loc12_ != null) {
                if (_loc3_ != null) {
                    _loc5_ = _loc3_.offset;
                    _loc12_.offsetX = -_loc5_.x | 0;
                    _loc12_.offsetY = -_loc5_.y | 0;
                    _loc12_.color = _loc3_.color | 0;
                    _loc12_.visible = _loc3_.visible;
                } else {
                    _loc12_.visible = false;
                }
                if (_loc14_ != null) {
                    _loc12_.asset = asInstanceOf(_loc14_.content, BitmapData);
                } else {
                    _loc12_.asset = null;
                }
                if (_loc7_) {
                    _loc12_.assetName = _loc13_ + "_" + _loc10_.getInstanceId() + "_" + this._SafeStr_4070;
                }
                _loc12_.relativeDepth = _loc3_.relativeDepth;
            }
            _loc6_++;
        }
    }
}
