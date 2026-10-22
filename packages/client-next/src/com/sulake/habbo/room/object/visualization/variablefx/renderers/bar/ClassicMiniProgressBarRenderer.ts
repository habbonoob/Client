import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { ClassicProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicProgressBarRenderer';

export class ClassicMiniProgressBarRenderer extends ClassicProgressBarRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::ClassicMiniProgressBarRenderer'); }

    private static readonly _SafeStr_14530: any = { "background": "variablefx_classic_mini_bar_background", "bar": "variablefx_classic_mini_bar_fill", "darkening": "variablefx_classic_mini_bar_darkening", "lighting": "variablefx_classic_mini_bar_lighting", "metallic": "variablefx_classic_mini_bar_metallic" };

    constructor(param1: VariableFxRendererContext) {
        super(param1);
    }

    protected override get assetNames(): any {
        return ClassicMiniProgressBarRenderer._SafeStr_14530;
    }

    protected override get layerDescription(): string {
        return "classic mini progress bar";
    }
}
