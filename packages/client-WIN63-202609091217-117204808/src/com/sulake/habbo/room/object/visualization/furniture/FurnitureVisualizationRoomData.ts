import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVariableFxVisualizationRoomData } from '@/com/sulake/habbo/room/object/visualization/IVariableFxVisualizationRoomData';
import type { _SafeCls_6072 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6072';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import { _SafeCls_6070 } from '@/com/sulake/habbo/room/object/visualization/_SafeCls_6070';

export class FurnitureVisualizationRoomData implements IVariableFxVisualizationRoomData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureVisualizationRoomData'); }

    declare private _SafeStr_14428: _SafeCls_6072;

    declare private _variableFxRendererRegistry: VariableFxRendererRegistry;

    private _SafeStr_14447: _SafeCls_6070 = new _SafeCls_6070();

    constructor(param1: _SafeCls_6072, param2: VariableFxRendererRegistry) {
        this._SafeStr_14428 = param1;
        this._variableFxRendererRegistry = param2;
    }

    public get variableFxVisualizationManager(): _SafeCls_6070 {
        return this._SafeStr_14447;
    }

    public get variableFxAssetProvider(): _SafeCls_6072 {
        return this._SafeStr_14428;
    }

    public get variableFxRendererRegistry(): VariableFxRendererRegistry {
        return this._variableFxRendererRegistry;
    }

    public dispose(): void {
        if (this._SafeStr_14447 != null) {
            this._SafeStr_14447.dispose();
            this._SafeStr_14447 = null;
        }
        this._SafeStr_14428 = null;
        this._variableFxRendererRegistry = null;
    }
}
