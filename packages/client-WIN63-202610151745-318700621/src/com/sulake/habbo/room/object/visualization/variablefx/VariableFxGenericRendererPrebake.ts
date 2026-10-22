import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';

export class VariableFxGenericRendererPrebake implements VariableFxRendererPrebake {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxGenericRendererPrebake'); }

    declare public data: any;

    declare private _disposeCallback: (...args: any[]) => any;

    constructor(param1: any, param2: (...args: any[]) => any) {
        this.data = param1;
        this._disposeCallback = param2;
    }

    public dispose(): void {
        if (this._disposeCallback != null) {
            this._disposeCallback();
            this._disposeCallback = null;
        }
        this.data = null;
    }

    get [VariableFxRendererPrebake](): true {
        return true;
    }
}
