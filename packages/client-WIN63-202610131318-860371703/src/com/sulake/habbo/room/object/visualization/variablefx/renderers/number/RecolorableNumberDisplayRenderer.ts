import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { NumberDisplayRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/NumberDisplayRendererBase';
import { RecolorableNumberDisplayColorPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/RecolorableNumberDisplayColorPrebake';
import { VariableFxNumberDisplayMetadata } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/VariableFxNumberDisplayMetadata';
import { VariableFxColorType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxColorType';
import { VariableFxConfigRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigRendererPrebake';

export class RecolorableNumberDisplayRenderer extends NumberDisplayRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::RecolorableNumberDisplayRenderer'); }

    declare private _SafeStr_14680: number;
    static { (this.prototype as any)._SafeStr_14680 = 0; }

    private _SafeStr_14681: any = null;

    declare private _SafeStr_14682: RecolorableNumberDisplayColorPrebake;

    constructor(param1: VariableFxRendererContext) {
        let design: any;
        let context: VariableFxRendererContext = param1;
        super(context, RecolorableNumberDisplayRenderer.resolveDesign(context));
        design = RecolorableNumberDisplayRenderer.resolveDesign(context);
        this._SafeStr_14682 = asInstanceOf(VariableFxConfigRendererPrebake.getOrCreate(context.config, (): any => {
             return this.createPrebake(context, design);
         }), RecolorableNumberDisplayColorPrebake);
        this._SafeStr_14680 = this.resolvePaintRgb(context);
    }

    private static resolveDesign(param1: VariableFxRendererContext): any {
        let _loc2_: string = VariableFxColorType.readExtra(param1.config.extra, "design");
        let _loc3_: any = VariableFxNumberDisplayMetadata.getRecolorableDesign(_loc2_);
        if (_loc3_ == null) {
            throw new Error("Unknown recolorable Variable FX number display design \'" + (_loc2_ == null ? "" : _loc2_) + "\'.");
        }
        return _loc3_;
    }

    protected override drawDigit(param1: any, param2: number, param3: number): void {
        let _loc4_: BitmapData = this._SafeStr_14682.getOrCreateNumbersPrebake(this._SafeStr_14680 >>> 0);
        this.composer.drawSourceRegion(_loc4_, Number(param1.sourceX), 0, Number(param1.width), this.digitHeight, param2, param3, "normal", 255);
    }

    protected override resolveBitmapDataClassLayer(): BitmapData {
        return this._SafeStr_14682._SafeStr_14674;
    }

    protected override updateRendererData(param1: VariableFxRendererContext, param2: number): void {
        this._SafeStr_14680 = this.resolvePaintRgb(param1);
    }

    protected override needsRendererUpdate(): boolean {
        return this._SafeStr_14681 == null || (this._SafeStr_14681 | 0) != this._SafeStr_14680;
    }

    protected override didRenderFrame(): void {
        this._SafeStr_14681 = this._SafeStr_14680;
    }

    private createPrebake(param1: VariableFxRendererContext, param2: any): RecolorableNumberDisplayColorPrebake {
        return new RecolorableNumberDisplayColorPrebake(this.resolveLayers(param1, param2));
    }

    private resolveLayers(param1: VariableFxRendererContext, param2: any): any {
        return { "darkening": this.getOptionalLayer(param1, stringOrNull(param2.layers.darkening)), "lighting": this.getOptionalLayer(param1, stringOrNull(param2.layers.lighting)), "numberLines": this.getOptionalLayer(param1, stringOrNull(param2.layers.numberLines)), "numbers": this.getLayer(param1, stringOrNull(param2.layers.numbers)) };
    }

    private getOptionalLayer(param1: VariableFxRendererContext, param2: string): BitmapData {
        return param2 == null ? null : this.getLayer(param1, param2);
    }

    private getLayer(param1: VariableFxRendererContext, param2: string): BitmapData {
        let _loc3_: BitmapData = param1.assetProvider == null ? null : param1.assetProvider.getBitmapData(param2);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX number display layer \'" + param2 + "\'.");
        }
        return _loc3_;
    }

    private resolvePaintRgb(param1: VariableFxRendererContext): number {
        if (VariableFxColorType.resolve(param1.config.color).typeName == "DYNAMIC_TEAM_COLOR") {
            return VariableFxColorType.resolveTargetPaintColor(param1.config.color, param1.config.extra, 0, param1.status.extra).rgb | 0;
        }
        return VariableFxColorType.resolvePaintColor(param1.config.color, param1.config.extra).rgb | 0;
    }
}
