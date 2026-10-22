import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { DirectionalOffsetData } from '@/com/sulake/habbo/room/object/visualization/data/DirectionalOffsetData';
import { FurnitureRoomBrandingVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureRoomBrandingVisualization';

export class FurnitureRoomBackgroundVisualization extends FurnitureRoomBrandingVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureRoomBackgroundVisualization'); }

    declare private _SafeStr_3325: Map<any, any>;

    constructor() {
        super();
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_3325 = null;
    }

    protected override getAdClickUrl(param1: IRoomObjectModel): string {
        return null;
    }

    protected override imageReady(param1: BitmapData, param2: string): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        super.imageReady(param1, param2);
        if (param1 != null) {
            this._SafeStr_3325 = new Dictionary();
            _loc4_ = 64;
            _loc3_ = param1.width;
            _loc5_ = param1.height;
            this.addDirectionalOffsets(_loc4_, _loc5_, _loc3_);
            _loc4_ = 32;
            _loc3_ = _loc3_ / 2 | 0;
            _loc5_ = _loc5_ / 2 | 0;
            this.addDirectionalOffsets(_loc4_, _loc5_, _loc3_);
        }
    }

    private addDirectionalOffsets(param1: number, param2: number, param3: number): void {
        let _loc4_: DirectionalOffsetData = new DirectionalOffsetData();
        _loc4_.setOffset(1, 0, -param2);
        _loc4_.setOffset(3, 0, 0);
        _loc4_.setOffset(5, -param3, 0);
        _loc4_.setOffset(7, -param3, -param2);
        _loc4_.setOffset(4, -param3 / 2 | 0, -param2 / 2 | 0);
        this._SafeStr_3325.set(param1, _loc4_);
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: number = 0;
        let _loc4_: DirectionalOffsetData = null;
        if (this._SafeStr_3325 != null) {
            _loc5_ = this.getSize(param1);
            _loc4_ = this._SafeStr_3325.get(_loc5_);
            if (_loc4_ != null) {
                return _loc4_.getOffsetX(param2, 0) + this.getScaledOffset(this._SafeStr_5088, param1) | 0;
            }
        }
        return super.getSpriteXOffset(param1, param2, param3) + this.getScaledOffset(this._SafeStr_5088, param1) | 0;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: number = 0;
        let _loc4_: DirectionalOffsetData = null;
        if (this._SafeStr_3325 != null) {
            _loc5_ = this.getSize(param1);
            _loc4_ = this._SafeStr_3325.get(_loc5_);
            if (_loc4_ != null) {
                return _loc4_.getOffsetY(param2, 0) + this.getScaledOffset(this._SafeStr_5066, param1) | 0;
            }
        }
        return super.getSpriteYOffset(param1, param2, param3) + this.getScaledOffset(this._SafeStr_5066, param1) | 0;
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        return super.getSpriteZOffset(param1, param2, param3) + this._SafeStr_5761 * -1;
    }

    protected override getSpriteMouseCapture(param1: number, param2: number, param3: number): boolean {
        return false;
    }

    private getScaledOffset(param1: number, param2: number): number {
        return param1 * param2 / 64;
    }
}
