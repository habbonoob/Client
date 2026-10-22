import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxBarSliceUtils {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::VariableFxBarSliceUtils'); }

    constructor() {
    }

    public static resolveBackgroundSliceLeftWidth(param1: any): number {
        return Math.max(0, (param1.fillX | 0) + (param1.sliceLeftWidth | 0)) | 0;
    }

    public static resolveBackgroundSliceRightWidth(param1: any): number {
        let _loc2_: number = (param1.width | 0) - (param1.fillX | 0) - (param1.fillWidth | 0);
        return Math.max(0, _loc2_ + (param1.sliceRightWidth | 0)) | 0;
    }
}
