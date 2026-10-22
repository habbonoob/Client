import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import type { VariableFxIconOverlayLayout } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayLayout';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { ClassicProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicProgressBarRenderer';
import { VariableFxConfiguredIcon } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxConfiguredIcon';

export class BossHealthBarRenderer extends ClassicProgressBarRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::BossHealthBarRenderer'); }

    private static readonly BOSS_HEALTH_BAR_ASSETS: any = { "background": "variablefx_boss_health_bar_background", "bar": "variablefx_boss_health_bar_fill", "darkening": "variablefx_boss_health_bar_darkening", "lighting": "variablefx_boss_health_bar_lighting", "metallic": "variablefx_boss_health_bar_metallic" };

    private static readonly BOSS_LAYOUT_METRICS: any = { "fillX": 4, "fillY": 4, "sliceLeftWidth": 2, "sliceRightWidth": 2 };

    private static readonly BOSS_OVERLAY_SLICE: any = { "leftWidth": 2, "rightWidth": 2 };

    constructor(param1: VariableFxRendererContext) {
        super(param1);
    }

    protected override get assetNames(): any {
        return BossHealthBarRenderer.BOSS_HEALTH_BAR_ASSETS;
    }

    protected override get baseLayoutMetrics(): any {
        return BossHealthBarRenderer.BOSS_LAYOUT_METRICS;
    }

    protected override get layerDescription(): string {
        return "boss health bar";
    }

    protected override get overlaySlice(): any {
        return BossHealthBarRenderer.BOSS_OVERLAY_SLICE;
    }

    protected override resolveFrameWidth(param1: string): number {
        switch (param1) {
            case "large":
                return 100;
            case "extra_large":
                return 150;
            case "big_mahoosive_chonky":
                return 200;
            default:
                return 150;
        }
    }

    protected override resolveIconOverlayLayout(param1: any, param2: VariableFxConfiguredIcon): VariableFxIconOverlayLayout {
        let _loc3_: string = VariableFxConfiguredIcon.resolveAlignment(this.context);
        if (_loc3_ == "left") {
            return super.resolveIconOverlayLayout(param1, param2);
        }
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(param1.width | 0, param1.height | 0, param2, _loc3_, 0);
    }

    protected override drawIconOverlay(param1: VariableFxBitmapComposer, param2: any, param3: VariableFxIconOverlayLayout, param4: VariableFxConfiguredIcon): void {
        let _loc5_: any = null;
        if (param4 == null) {
            return;
        }
        for (_loc5_ of param3._SafeStr_14530 ?? []) {
            param1.drawLayer(param4.bitmapData, Number(_loc5_.x), Number(_loc5_.y), "normal", 255);
        }
    }
}
