import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { _SafeCls_6084 } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/_SafeCls_6084';
import { NumberDisplayRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/NumberDisplayRendererBase';
import { RecolorableNumberDisplayColorPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/RecolorableNumberDisplayColorPrebake';

export class RecolorableNumberDisplayRenderer extends NumberDisplayRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::RecolorableNumberDisplayRenderer'); }

    declare private _SafeStr_14582: number;
    static { (this.prototype as any)._SafeStr_14582 = 0; }

    private _SafeStr_14583: any = null;

    declare private _SafeStr_14538: RecolorableNumberDisplayColorPrebake;

    constructor(param1: VariableFxRendererContext) {
        let design: any;
        let context: VariableFxRendererContext = param1;
        super(context, RecolorableNumberDisplayRenderer.resolveDesign(context));
        design = RecolorableNumberDisplayRenderer.resolveDesign(context);
        this._SafeStr_14538 = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake(context, design);
         }), RecolorableNumberDisplayColorPrebake);
        this._SafeStr_14582 = this.resolvePaintRgb(context);
    }

    private static resolveDesign(param1: VariableFxRendererContext): any {
        let _loc2_: string = _SafeCls_6080.readExtra(param1.config.extra, "design");
        let _loc3_: any = _SafeCls_6084.getRecolorableDesign(_loc2_);
        if (_loc3_ == null) {
            throw new Error("Unknown recolorable Variable FX number display design \'" + (_loc2_ == null ? "" : _loc2_) + "\'.");
        }
        return _loc3_;
    }

    protected override drawDigit(param1: any, param2: number, param3: number): void {
        let _loc4_: BitmapData = this._SafeStr_14538.getOrCreateNumbersPrebake(this._SafeStr_14582 >>> 0);
        this.composer.drawSourceRegion(_loc4_, Number(param1.sourceX), 0, Number(param1.width), this.digitHeight, param2, param3, "normal", 255);
    }

    protected override resolveBitmapDataClassLayer(): BitmapData {
        return this._SafeStr_14538._SafeStr_14580;
    }

    protected override updateRendererData(param1: VariableFxRendererContext, param2: number): void {
        this._SafeStr_14582 = this.resolvePaintRgb(param1);
    }

    protected override needsRendererUpdate(): boolean {
        return this._SafeStr_14583 == null || (this._SafeStr_14583 | 0) != this._SafeStr_14582;
    }

    protected override didRenderFrame(): void {
        this._SafeStr_14583 = this._SafeStr_14582;
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
        if (_SafeCls_6080.resolve(param1.config.color).typeName == "DYNAMIC_TEAM_COLOR") {
            return _SafeCls_6080.resolveTargetPaintColor(param1.config.color, param1.config.extra, 0, param1.status.extra).rgb | 0;
        }
        return _SafeCls_6080.resolvePaintColor(param1.config.color, param1.config.extra).rgb | 0;
    }
}
