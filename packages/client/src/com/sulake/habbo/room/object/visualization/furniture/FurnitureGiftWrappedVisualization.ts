import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';

export class FurnitureGiftWrappedVisualization extends FurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureGiftWrappedVisualization'); }

    constructor() {
        super();
    }

    private _SafeStr_6375: number = 0;
    private _SafeStr_6329: number = 0;

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        this.updateTypes();
        super.update(param1, param2, param3, param4);
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        if (param2 <= 1) {
            return this._SafeStr_6375;
        }
        return this._SafeStr_6329;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc3_: number = this.getSize(param1);
        let _loc4_: string = this.type;
        let _loc5_: string = "";
        if (param2 < this.spriteCount - 1) {
            _loc5_ = String.fromCharCode("a".charCodeAt(0) + param2);
        } else {
            _loc5_ = "sd";
        }
        let _loc6_: number = this.getFrameNumber(param1, param2);
        _loc4_ += "_" + _loc3_ + "_" + _loc5_ + "_" + this.direction;
        return _loc4_ + ("_" + _loc6_);
    }

    private updateTypes(): void {
        let _loc5_: IRoomObjectModel = null;
        let _loc1_: number = 0;
        let _loc3_: string = null;
        let _loc4_: number = 0;
        let _loc2_: IRoomObject = this.object;
        if (_loc2_ != null) {
            _loc5_ = _loc2_.getModel();
            if (_loc5_ != null) {
                _loc1_ = 1000;
                _loc3_ = _loc5_.getString("furniture_extras");
                _loc4_ = parseInt(_loc3_) | 0;
                this._SafeStr_6375 = Math.floor(_loc4_ / _loc1_) | 0;
                this._SafeStr_6329 = _loc4_ % _loc1_;
            }
        }
    }
}
