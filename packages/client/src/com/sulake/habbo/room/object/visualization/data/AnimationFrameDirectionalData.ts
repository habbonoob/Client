import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DirectionalOffsetData } from '@/com/sulake/habbo/room/object/visualization/data/DirectionalOffsetData';
import { AnimationFrameData } from '@/com/sulake/habbo/room/object/visualization/data/AnimationFrameData';

export class AnimationFrameDirectionalData extends AnimationFrameData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationFrameDirectionalData'); }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: DirectionalOffsetData, param7: number) {
        super(param1, param2, param3, param4, param5, param7);
        this._SafeStr_4093 = param6;
    }

    declare private _SafeStr_4093: DirectionalOffsetData;

    public override hasDirectionalOffsets(): boolean {
        return this._SafeStr_4093 != null;
    }

    public override getX(param1: number): number {
        if (this._SafeStr_4093 != null) {
            return this._SafeStr_4093.getOffsetX(param1, super.getX(param1));
        }
        return super.getX(param1);
    }

    public override getY(param1: number): number {
        if (this._SafeStr_4093 != null) {
            return this._SafeStr_4093.getOffsetY(param1, super.getY(param1));
        }
        return super.getY(param1);
    }
}
