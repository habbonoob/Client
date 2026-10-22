import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { VariableFxVisualizationManager } from '@/com/sulake/habbo/room/object/visualization/VariableFxVisualizationManager';

export interface IVariableFxVisualizationRoomData {
    get variableFxVisualizationManager(): VariableFxVisualizationManager;
    get variableFxAssetProvider(): VariableFxAssetProvider;
    get variableFxRendererRegistry(): VariableFxRendererRegistry;
}
