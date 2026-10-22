import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Vector3D } from '@habbo-pixi/runtime/geom/Vector3D';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { FurnitureParticleSystemEmitter } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureParticleSystemEmitter';

export class FurnitureParticleSystem {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureParticleSystem'); }

    declare private _emitters: UtilsMap;

    declare private _visualization: AnimatedFurnitureVisualization;

    declare private _SafeStr_4867: number;
    static { (this.prototype as any)._SafeStr_4867 = 0; }

    declare private _canvasId: number;
    static { (this.prototype as any)._canvasId = 0; }

    declare private _offsetY: number;
    static { (this.prototype as any)._offsetY = 0; }

    declare private _SafeStr_2242: FurnitureParticleSystemEmitter;

    declare private _canvas: BitmapData;

    declare private _SafeStr_2487: IRoomObjectSprite;

    private _hasIgnited: boolean = false;
    private _SafeStr_6000: number = 0;
    private _SafeStr_6485: number = 0;
    private _SafeStr_4383: number = 1;

    declare private _SafeStr_3270: BitmapData;

    declare private _SafeStr_3378: ColorTransform;

    declare private _SafeStr_4518: ColorTransform;

    declare private _SafeStr_5462: Matrix;

    declare private _SafeStr_4213: Matrix;

    private _blend: number = 1;
    private _bgColor: number = 4278190080;

    constructor(param1: AnimatedFurnitureVisualization) {
        this._emitters = new UtilsMap();
        this._visualization = param1;
        this._SafeStr_3378 = new ColorTransform();
        this._SafeStr_3378.alphaMultiplier = 1;
        this._SafeStr_4518 = new ColorTransform();
        this._SafeStr_5462 = new Matrix();
        this._SafeStr_4213 = new Matrix();
    }

    public dispose(): void {
        for (const _loc1_ of valuesOf(this._emitters)) {
            _loc1_.dispose();
        }
        this._emitters = null;
        if (this._canvas) {
            this._canvas.dispose();
            this._canvas = null;
        }
        if (this._SafeStr_3270) {
            this._SafeStr_3270.dispose();
            this._SafeStr_3270 = null;
        }
        this._SafeStr_3378 = null;
        this._SafeStr_4518 = null;
        this._SafeStr_5462 = null;
        this._SafeStr_4213 = null;
    }

    public reset(): void {
        if (this._SafeStr_2242) {
            this._SafeStr_2242.reset();
        }
        this._SafeStr_2242 = null;
        this._hasIgnited = false;
        this.updateCanvas();
    }

    public setAnimation(param1: number): void {
        if (this._SafeStr_2242) {
            this._SafeStr_2242.reset();
        }
        this._SafeStr_2242 = this._emitters[param1];
        this._hasIgnited = false;
        this.updateCanvas();
    }

    private updateCanvas(): void {
        if (!this._SafeStr_2242) {
            return;
        }
        if (this._canvasId >= 0) {
            this._SafeStr_2487 = this._visualization.getSprite(this._canvasId);
            if (this._SafeStr_2487 && this._SafeStr_2487.asset) {
                if (this._SafeStr_2487.width <= 1 || this._SafeStr_2487.height <= 1) {
                    return;
                }
                if (this._canvas && (this._canvas.width != this._SafeStr_2487.width || this._canvas.height != this._SafeStr_2487.height)) {
                    this._canvas = null;
                }
                if (this._canvas == null) {
                    this._canvas = this._SafeStr_2487.asset.clone();
                    if (this._SafeStr_3378.alphaMultiplier != 1) {
                        this._SafeStr_3270 = new BitmapData(this._canvas.width, this._canvas.height, true, this._bgColor);
                    }
                }
                this._SafeStr_6000 = -this._SafeStr_2487.offsetX;
                this._SafeStr_6485 = -this._SafeStr_2487.offsetY;
                this._SafeStr_2487.asset = this._canvas;
            }
            if (this._canvas) {
                this._canvas.fillRect(this._canvas.rect, this._bgColor);
            }
            if (this._SafeStr_3270) {
                this._SafeStr_3270.fillRect(this._SafeStr_3270.rect, this._bgColor);
            }
        }
    }

    public getSpriteYOffset(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2242 && this._SafeStr_2242.roomObjectSpriteId == param3) {
            return this._SafeStr_2242.y * this._SafeStr_4383 | 0;
        }
        return 0;
    }

    public controlsSprite(param1: number): boolean {
        if (this._SafeStr_2242) {
            return this._SafeStr_2242.roomObjectSpriteId == param1;
        }
        return false;
    }

    public updateSprites(): void {
        if (!this._SafeStr_2242 || !this._SafeStr_2487) {
            return;
        }
        if (this._canvas && this._SafeStr_2487.asset != this._canvas) {
            this._SafeStr_2487.asset = this._canvas;
            this._SafeStr_2487.asset.width;
        }
        if (this._hasIgnited) {
            if (this._SafeStr_2242.roomObjectSpriteId >= 0) {
                this._visualization.getSprite(this._SafeStr_2242.roomObjectSpriteId).visible = false;
            }
        }
    }

    public updateAnimation(): void {
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc1_: Rectangle = null;
        let _loc11_: IGraphicAsset = null;
        let _loc3_: BitmapData = null;
        let _loc6_: any = null;
        let _loc8_: Point = null;
        if (!this._SafeStr_2242 || !this._SafeStr_2487) {
            return;
        }
        let _loc5_: number = 10;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        if (!this._hasIgnited && this._SafeStr_2242.hasIgnited) {
            this._hasIgnited = true;
        }
        _loc2_ = this._offsetY * this._SafeStr_4383 | 0;
        this._SafeStr_2242.update();
        if (this._hasIgnited) {
            if (this._SafeStr_2242.roomObjectSpriteId >= 0) {
                this._visualization.getSprite(this._SafeStr_2242.roomObjectSpriteId).visible = false;
            }
            if (!this._canvas) {
                this.updateCanvas();
            }
            this._canvas.lock();
            if (this._SafeStr_3378.alphaMultiplier == 1) {
                this._canvas.fillRect(this._canvas.rect, this._bgColor);
            } else {
                this._canvas.draw(this._SafeStr_3270, this._SafeStr_5462, this._SafeStr_3378, "normal", null, false);
            }
            for (const _loc7_ of this._SafeStr_2242.particles ?? []) {
                _loc4_ = Number(_loc7_.y);
                _loc9_ = this._SafeStr_6000 + (_loc7_.x - _loc7_.z) * _loc5_ / 10 * this._SafeStr_4383 | 0;
                _loc10_ = this._SafeStr_6485 - _loc2_ + (_loc4_ + (_loc7_.x + _loc7_.z) / 2) * _loc5_ / 10 * this._SafeStr_4383 | 0;
                _loc11_ = _loc7_.getAsset();
                if (_loc11_) {
                    _loc3_ = asInstanceOf(_loc11_.asset.content, BitmapData);
                    if (_loc7_.fade && _loc7_.alphaMultiplier < 1) {
                        this._SafeStr_4213.identity();
                        this._SafeStr_4213.translate(_loc9_ + _loc11_.offsetX, _loc10_ + _loc11_.offsetY);
                        this._SafeStr_4518.alphaMultiplier = Number(_loc7_.alphaMultiplier);
                        this._canvas.draw(_loc3_, this._SafeStr_4213, this._SafeStr_4518, "normal", null, false);
                    } else {
                        _loc8_ = new Point(_loc9_ + _loc11_.offsetX, _loc10_ + _loc11_.offsetY);
                        this._canvas.copyPixels(_loc3_, _loc3_.rect, _loc8_, null, null, true);
                    }
                } else {
                    _loc1_ = new Rectangle(_loc9_ - 1, _loc10_ - 1, 2, 2);
                    this._canvas.fillRect(_loc1_, 4294967295);
                }
            }
            this._canvas.unlock();
        }
    }

    public parseData(param1: XML): void {
        let _loc17_: any;
        let _loc2_: any;
        let _loc7_: any = null;
        let _loc9_: number = 0;
        let _loc21_: string = null;
        let _loc4_: number = 0;
        let _loc24_: FurnitureParticleSystemEmitter = null;
        let _loc19_: number = 0;
        let _loc14_: number = 0;
        let _loc25_: number = 0;
        let _loc18_: number = 0;
        let _loc22_: number = NaN;
        let _loc11_: number = NaN;
        let _loc20_: number = NaN;
        let _loc3_: number = NaN;
        let _loc15_: string = null;
        let _loc12_: number = NaN;
        let _loc10_: number = 0;
        let _loc13_: boolean = false;
        let _loc5_: boolean = false;
        let _loc16_: any[] = null;
        let _loc23_: IGraphicAsset = null;
        this._SafeStr_4867 = parseInt(param1.attribute("size").toString()) | 0;
        this._canvasId = (param1.hasOwnProperty("@canvas_id") ? parseInt(param1.attribute("canvas_id").toString()) : -1) | 0;
        this._offsetY = (param1.hasOwnProperty("@offset_y") ? parseInt(param1.attribute("offset_y").toString()) : 10) | 0;
        this._SafeStr_4383 = this._SafeStr_4867 / 64;
        this._blend = param1.hasOwnProperty("@blend") ? Number(param1.attribute("blend")) : 1;
        this._blend = Math.min(this._blend, 1);
        this._SafeStr_3378.alphaMultiplier = this._blend;
        let _loc8_: string = param1.hasOwnProperty("@bgcolor") ? String(param1.attribute("bgcolor")) : "0";
        this._bgColor = (param1.hasOwnProperty("@bgcolor") ? parseInt(_loc8_, 16) : 4278190080) >>> 0;
        for (const _loc6_ of param1.child("emitter") ?? []) {
            _loc9_ = parseInt(_loc6_.attribute("id").toString()) | 0;
            _loc21_ = _loc6_.attribute("name").toString();
            _loc4_ = parseInt(_loc6_.attribute("sprite_id").toString()) | 0;
            _loc24_ = new FurnitureParticleSystemEmitter(_loc21_, _loc4_);
            this._emitters[_loc9_] = _loc24_;
            _loc19_ = parseInt(_loc6_.attribute("max_num_particles").toString()) | 0;
            _loc14_ = parseInt(_loc6_.attribute("particles_per_frame").toString()) | 0;
            _loc25_ = (_loc6_.hasOwnProperty("@burst_pulse") ? parseInt(_loc6_.attribute("burst_pulse").toString()) : 1) | 0;
            _loc18_ = parseInt(_loc6_.attribute("fuse_time").toString()) | 0;
            _loc22_ = Number(_loc6_.child("simulation").attribute("force"));
            _loc11_ = Number(_loc6_.child("simulation").attribute("direction"));
            _loc20_ = Number(_loc6_.child("simulation").attribute("gravity"));
            _loc3_ = Number(_loc6_.child("simulation").attribute("airfriction"));
            _loc15_ = _loc6_.child("simulation").attribute("shape").toString();
            _loc12_ = Number(_loc6_.child("simulation").attribute("energy"));
            for (_loc17_ of _loc6_.child("particles").child("particle") ?? []) {
                _loc10_ = parseInt(_loc17_.attribute("lifetime").toString()) | 0;
                _loc13_ = _loc17_.attribute("is_emitter")?.toString() == "false" ? false : true;
                _loc5_ = _loc17_.hasOwnProperty("@fade") && _loc17_.attribute("fade")?.toString() == "true" ? true : false;
                _loc16_ = [];
                for (_loc2_ of _loc17_.child("frame") ?? []) {
                    _loc23_ = this._visualization.assetCollection.getAsset(_loc2_.attribute("name").toString());
                    _loc16_.push(_loc23_);
                }
                _loc24_.configureParticle(_loc10_, _loc13_, _loc16_, _loc5_);
            }
            _loc24_.setup(_loc19_, _loc14_, _loc22_, new Vector3D(0, _loc11_, 0), _loc20_, _loc3_, _loc15_, _loc12_, _loc18_, _loc25_);
        }
    }

    public copyStateFrom(param1: FurnitureParticleSystem): void {
        let _loc2_: number = 0;
        if (param1._emitters && param1._SafeStr_2242) {
            _loc2_ = param1._emitters.getKey(param1._emitters.getValues().indexOf(param1._SafeStr_2242)) | 0;
        }
        this.setAnimation(_loc2_);
        if (this._SafeStr_2242) {
            this._SafeStr_2242.copyStateFrom(param1._SafeStr_2242, param1._SafeStr_4867 / this._SafeStr_4867);
        }
        this._canvas = null;
    }
}
