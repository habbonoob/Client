import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { VariableFxIconDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconDefinition';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { VariableFxIconDefinitions } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconDefinitions';
import { VariableFxIconOverlayLayout } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayLayout';

export class VariableFxConfiguredIcon {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxConfiguredIcon'); }

    public static readonly ICON_CONFIG_EXTRA_KEY: string = "icon";
    public static readonly ICON_ALIGNMENT_CONFIG_EXTRA_KEY: string = "icon_alignment";
    public static readonly BAR_ICON_OVERLAP_PX: number = 5;
    public static readonly BAR_ICON_CONTENT_Y_OFFSET_PX: number = 2;

    declare public bitmapData: BitmapData;

    declare public definition: VariableFxIconDefinition;

    constructor(param1: BitmapData, param2: VariableFxIconDefinition) {
        this.bitmapData = param1;
        this.definition = param2;
    }

    public static resolve(param1: VariableFxRendererContext): VariableFxConfiguredIcon {
        let _loc4_: VariableFxIconDefinition = null;
        let _loc3_: BitmapData = null;
        let _loc2_: string = VariableFxConfiguredIcon.readExtra(param1.config.extra, "icon");
        if (_loc2_ == null || _loc2_.length == 0) {
            return null;
        }
        _loc4_ = VariableFxIconDefinitions.resolve(param1.assetProvider, _loc2_);
        _loc3_ = param1.assetProvider == null ? null : param1.assetProvider.getBitmapData(_loc4_.assetName);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX icon layer \'" + _loc4_.assetName + "\'.");
        }
        return new VariableFxConfiguredIcon(_loc3_, _loc4_);
    }

    public static resolveAlignment(param1: VariableFxRendererContext): string {
        let _loc2_: string = VariableFxConfiguredIcon.readExtra(param1.config.extra, "icon_alignment");
        switch (_loc2_) {
            case "right":
            case "double":
                break;
            default:
                return "left";
        }
        return _loc2_;
    }

    public static resolveBarIconOverlayLayout(param1: number, param2: number, param3: VariableFxConfiguredIcon, param4: string = "left", param5: number = 2): VariableFxIconOverlayLayout {
        return VariableFxIconOverlayLayout.resolve({ "alignment": param4, "contentHeight": param2, "contentWidth": param1, "contentYOffsetPx": param5, "iconHeight": (param3 == null ? 0 : param3.bitmapData.height), "iconOffsetX": (param3 == null ? 0 : param3.definition.offsetX), "iconOffsetY": (param3 == null ? 0 : param3.definition.offsetY), "iconWidth": (param3 == null ? 0 : param3.bitmapData.width), "overlapPx": 5 });
    }

    private static readExtra(param1: UtilsMap, param2: string): string {
        if (param1 == null || param1.getValue(param2) == null) {
            return null;
        }
        return String(param1.getValue(param2)).replace(/^\s+|\s+$/g, "");
    }
}
