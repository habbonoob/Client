import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';

export class VariableFxGenericRendererPrebake implements _SafeCls_6078 {
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

    get [_SafeCls_6078](): true {
        return true;
    }
}
