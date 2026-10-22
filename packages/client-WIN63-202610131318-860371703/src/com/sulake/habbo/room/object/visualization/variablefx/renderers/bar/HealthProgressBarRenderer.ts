import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { ClassicProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicProgressBarRenderer';

export class HealthProgressBarRenderer extends ClassicProgressBarRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::HealthProgressBarRenderer'); }

    private static readonly _SafeStr_14717: any = { "background": "variablefx_health_bar_background", "bar": "variablefx_health_bar_fill", "darkening": "variablefx_health_bar_darkening", "lighting": "variablefx_health_bar_lighting", "metallic": null };

    private static readonly _SafeStr_14718: any = { "leftWidth": 1, "rightWidth": 1 };

    constructor(param1: VariableFxRendererContext) {
        super(param1);
    }

    protected override get assetNames(): any {
        return HealthProgressBarRenderer._SafeStr_14717;
    }

    protected override get layerDescription(): string {
        return "health progress bar";
    }

    protected override get overlaySlice(): any {
        return HealthProgressBarRenderer._SafeStr_14718;
    }

    protected override get barEndWidthPx(): number {
        return 1;
    }

    protected override get barEndMinimumFillWidthPx(): number {
        return 1;
    }

    protected override get barBodyIncludesEndWidth(): boolean {
        return false;
    }

    protected override get barEndSourceRightPaddingPx(): number {
        return 0;
    }

    protected override get barEndBaseSourceRightPaddingPx(): number {
        return 1;
    }

    protected override get usesSeparateBarEndOverlaySource(): boolean {
        return true;
    }

    protected override resolveFrameWidth(param1: string): number {
        switch (param1) {
            case "small":
                return 32;
            case "medium":
                return 48;
            case "large":
                return 64;
            default:
                return 48;
        }
    }
}
