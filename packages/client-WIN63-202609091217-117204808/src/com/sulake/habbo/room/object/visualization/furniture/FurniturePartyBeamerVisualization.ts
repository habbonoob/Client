import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurniturePartyBeamerVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurniturePartyBeamerVisualization'); }

    private static readonly UPDATE_INTERVAL: number = 2;
    private static readonly AREA_DIAMETER_SMALL: number = 15;
    private static readonly AREA_DIAMETER_LARGE: number = 31;
    private static readonly ANIM_SPEED_FAST: number = 2;
    private static readonly _SafeStr_8549: number = 1;

    declare private _SafeStr_4423: any[];

    declare private _SafeStr_4666: any[];

    declare private _SafeStr_4576: any[];

    declare private _SafeStr_4497: any[];

    private _SafeStr_3656: any[] = [];

    constructor() {
        super();
    }

    protected override updateAnimation(param1: number): number {
        let _loc3_: IRoomObjectSprite = null;
        let _loc2_: any = null;
        if (this._SafeStr_4576 == null) {
            this.initItems(param1);
        }
        _loc3_ = this.getSprite(2);
        if (_loc3_ != null) {
            this._SafeStr_3656[0] = this.getNewPoint(param1, 0);
        }
        _loc3_ = this.getSprite(3);
        if (_loc3_ != null) {
            this._SafeStr_3656[1] = this.getNewPoint(param1, 1);
        }
        return super.updateAnimation(param1);
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        if (param3 == 2 || param3 == 3) {
            if (this._SafeStr_3656.length == 2) {
                return this._SafeStr_3656[param3 - 2].x | 0;
            }
        }
        return super.getSpriteXOffset(param1, param2, param3);
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        if (param3 == 2 || param3 == 3) {
            if (this._SafeStr_3656.length == 2) {
                return this._SafeStr_3656[param3 - 2].y | 0;
            }
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }

    private getNewPoint(param1: number, param2: number): Point {
        let _loc8_: number = 0;
        let _loc10_: number = Number(this._SafeStr_4423[param2]);
        let _loc3_: number = this._SafeStr_4666[param2] | 0;
        let _loc5_: number = this._SafeStr_4576[param2] | 0;
        let _loc6_: number = Number(this._SafeStr_4497[param2]);
        let _loc11_: number = 1;
        if (param1 == 32) {
            _loc8_ = 15;
            _loc11_ = 0.5;
        } else {
            _loc8_ = 31;
        }
        let _loc7_: number = _loc10_ + _loc3_ * _loc5_;
        if (Math.abs(_loc7_) >= _loc8_) {
            if (_loc3_ > 0) {
                _loc10_ -= _loc7_ - _loc8_;
            } else {
                _loc10_ += -_loc8_ - _loc7_;
            }
            _loc3_ = -_loc3_;
            this._SafeStr_4666[param2] = _loc3_;
        }
        let _loc4_: number = (_loc8_ - Math.abs(_loc10_)) * _loc6_;
        let _loc9_: number = _loc3_ * Math.sin(Math.abs(_loc10_ / 4)) * _loc4_;
        if (_loc3_ > 0) {
            _loc9_ -= _loc4_;
        } else {
            _loc9_ += _loc4_;
        }
        _loc10_ += _loc3_ * _loc5_ * _loc11_;
        this._SafeStr_4423[param2] = _loc10_;
        if ((_loc9_ | 0) == 0) {
            this._SafeStr_4497[param2] = this.getRandomAmplitudeFactor();
        }
        return new Point(_loc10_, _loc9_);
    }

    private initItems(param1: number): void {
        let _loc2_: number = 0;
        if (param1 == 32) {
            _loc2_ = 15;
        } else {
            _loc2_ = 31;
        }
        this._SafeStr_4423 = [];
        this._SafeStr_4423.push(Math.random() * _loc2_ * 1.5);
        this._SafeStr_4423.push(Math.random() * _loc2_ * 1.5);
        this._SafeStr_4666 = [];
        this._SafeStr_4666.push(1);
        this._SafeStr_4666.push(-1);
        this._SafeStr_4576 = [];
        this._SafeStr_4576.push(2);
        this._SafeStr_4576.push(1);
        this._SafeStr_4497 = [];
        this._SafeStr_4497.push(this.getRandomAmplitudeFactor());
        this._SafeStr_4497.push(this.getRandomAmplitudeFactor());
    }

    private getRandomAmplitudeFactor(): number {
        return Math.random() * 30 / 100 + 0.15;
    }
}
