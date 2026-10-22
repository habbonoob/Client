import type { _SafeCls_6070 } from '@/com/sulake/habbo/room/object/visualization/_SafeCls_6070';
import type { _SafeCls_6072 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6072';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';

export interface IVariableFxVisualizationRoomData {
    get variableFxVisualizationManager(): _SafeCls_6070;
    get variableFxAssetProvider(): _SafeCls_6072;
    get variableFxRendererRegistry(): VariableFxRendererRegistry;
}
