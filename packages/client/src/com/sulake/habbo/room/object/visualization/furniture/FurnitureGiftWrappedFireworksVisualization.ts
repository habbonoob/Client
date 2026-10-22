import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { FurnitureFireworksVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureFireworksVisualization';

export class FurnitureGiftWrappedFireworksVisualization extends FurnitureFireworksVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureGiftWrappedFireworksVisualization'); }

    private static readonly PRESENT_DEFAULT_STATE: number = 0;
    private static readonly MAX_PACKET_TYPE_VALUE: number = 9;
    private static readonly MAX_RIBBON_TYPE_VALUE: number = 11;

    constructor() {
        super();
    }

    private _SafeStr_6375: number = 0;
    private _SafeStr_6329: number = 0;
    private _state_FurnitureGiftWrappedFireworksVisualization: number = 0;

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        this.updateTypes();
        super.update(param1, param2, param3, param4);
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        if (this._state_FurnitureGiftWrappedFireworksVisualization == 0) {
            if (param2 <= 1) {
                return this._SafeStr_6375;
            }
            if (param2 == 2) {
                return this._SafeStr_6329;
            }
        }
        return super.getFrameNumber(param1, param2);
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

    protected override setAnimation(param1: number): void {
        this._state_FurnitureGiftWrappedFireworksVisualization = param1;
        super.setAnimation(param1);
    }

    private updateTypes(): void {
        let _loc6_: IRoomObjectModel = null;
        let _loc1_: number = 0;
        let _loc4_: string = null;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: IRoomObject = this.object;
        if (_loc3_ != null) {
            _loc6_ = _loc3_.getModel();
            if (_loc6_ != null) {
                _loc1_ = 1000;
                _loc4_ = _loc6_.getString("furniture_extras");
                _loc5_ = parseInt(_loc4_) | 0;
                _loc2_ = Math.floor(_loc5_ / _loc1_) | 0;
                _loc7_ = _loc5_ % _loc1_;
                this._SafeStr_6375 = _loc2_ > 9 ? 0 : _loc2_;
                this._SafeStr_6329 = _loc7_ > 11 ? 0 : _loc7_;
            }
        }
    }
}
