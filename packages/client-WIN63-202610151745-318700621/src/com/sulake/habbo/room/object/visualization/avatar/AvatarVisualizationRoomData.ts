import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVariableFxVisualizationRoomData } from '@/com/sulake/habbo/room/object/visualization/IVariableFxVisualizationRoomData';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import { VariableFxVisualizationManager } from '@/com/sulake/habbo/room/object/visualization/VariableFxVisualizationManager';

export class AvatarVisualizationRoomData implements IVariableFxVisualizationRoomData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar::AvatarVisualizationRoomData'); }

    declare private _SafeStr_14281: VariableFxAssetProvider;

    declare private _variableFxRendererRegistry: VariableFxRendererRegistry;

    private _SafeStr_14755: VariableFxVisualizationManager = new VariableFxVisualizationManager();

    constructor(param1: VariableFxAssetProvider, param2: VariableFxRendererRegistry) {
        this._SafeStr_14281 = param1;
        this._variableFxRendererRegistry = param2;
    }

    public get variableFxVisualizationManager(): VariableFxVisualizationManager {
        return this._SafeStr_14755;
    }

    public get variableFxAssetProvider(): VariableFxAssetProvider {
        return this._SafeStr_14281;
    }

    public get variableFxRendererRegistry(): VariableFxRendererRegistry {
        return this._variableFxRendererRegistry;
    }

    public dispose(): void {
        if (this._SafeStr_14755 != null) {
            this._SafeStr_14755.dispose();
            this._SafeStr_14755 = null;
        }
        this._SafeStr_14281 = null;
        this._variableFxRendererRegistry = null;
    }
}
