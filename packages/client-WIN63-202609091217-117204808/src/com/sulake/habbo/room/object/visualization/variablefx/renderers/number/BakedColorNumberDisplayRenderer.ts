import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { _SafeCls_6084 } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/_SafeCls_6084';
import { NumberDisplayRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/NumberDisplayRendererBase';

export class BakedColorNumberDisplayRenderer extends NumberDisplayRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::BakedColorNumberDisplayRenderer'); }

    private static readonly _SafeStr_14570: string = "GREEN";

    declare private _SafeStr_14571: any;

    private _SafeStr_14572: any = null;

    declare private _numbers: BitmapData;

    declare private _SafeStr_14573: number;
    static { (this.prototype as any)._SafeStr_14573 = 0; }

    declare private _usesDynamicTeamColor: boolean;
    static { (this.prototype as any)._usesDynamicTeamColor = false; }

    constructor(param1: VariableFxRendererContext) {
        super(param1, BakedColorNumberDisplayRenderer.resolveDesign(param1));
        let _loc2_: any = BakedColorNumberDisplayRenderer.resolveDesign(param1);
        this._SafeStr_14571 = _loc2_;
        this._numbers = this.getLayer(param1, this.resolveNumbersAssetName(_loc2_));
        this._usesDynamicTeamColor = _SafeCls_6080.resolve(param1.config.color).typeName == "DYNAMIC_TEAM_COLOR";
        this._SafeStr_14573 = this.resolveSourceY(param1, _loc2_);
    }

    private static resolveDesign(param1: VariableFxRendererContext): any {
        let _loc2_: string = _SafeCls_6080.readExtra(param1.config.extra, "design");
        let _loc3_: any = _SafeCls_6084.getBakedColorDesign(_loc2_);
        if (_loc3_ == null) {
            throw new Error("Unknown baked-color Variable FX number display design \'" + (_loc2_ == null ? "" : _loc2_) + "\'.");
        }
        return _loc3_;
    }

    protected override drawDigit(param1: any, param2: number, param3: number): void {
        this.composer.drawSourceRegion(this._numbers, Number(param1.sourceX), this._SafeStr_14573, Number(param1.width), this.digitHeight, param2, param3, "normal", 255);
    }

    protected override resolveBitmapDataClassLayer(): BitmapData {
        return this._numbers;
    }

    protected override updateRendererData(param1: VariableFxRendererContext, param2: number): void {
        if (this._usesDynamicTeamColor) {
            this._SafeStr_14573 = this.resolveSourceY(param1, this._SafeStr_14571);
        }
    }

    protected override needsRendererUpdate(): boolean {
        return this._SafeStr_14572 == null || (this._SafeStr_14572 | 0) != this._SafeStr_14573;
    }

    protected override didRenderFrame(): void {
        this._SafeStr_14572 = this._SafeStr_14573;
    }

    private resolveSourceY(param1: VariableFxRendererContext, param2: any): number {
        let _loc4_: string = stringOrNull(_SafeCls_6080.resolve(param1.config.color).typeName);
        let _loc5_: string = _loc4_ == "DYNAMIC_TEAM_COLOR" ? this.resolveDelegatedSourceColor(param1, param2) : _loc4_;
        let _loc3_: any = param2.colorRows[_loc5_];
        if (_loc3_ == null) {
            _loc3_ = param2.colorRows["GREEN"];
        }
        return _loc3_ == null ? 0 : _loc3_ | 0;
    }

    private resolveDelegatedSourceColor(param1: VariableFxRendererContext, param2: any): string {
        let _loc3_: string = null;
        let _loc4_: any = _SafeCls_6080.parseRgbColor(_SafeCls_6080.readExtra(param1.status.extra, "delegated_color"));
        if (_loc4_ != null) {
            for (_loc3_ of keysOf(param2.colorRows)) {
                if (_SafeCls_6080.resolve(_loc3_).rgb >>> 0 == _loc4_ >>> 0) {
                    return _loc3_;
                }
            }
        }
        return param2.colorRows["WHITE"] != null ? "WHITE" : "GREEN";
    }

    private resolveNumbersAssetName(param1: any): string {
        return "variablefx_number_" + String(param1.design) + "_numbers";
    }

    private getLayer(param1: VariableFxRendererContext, param2: string): BitmapData {
        let _loc3_: BitmapData = param1.assetProvider == null ? null : param1.assetProvider.getBitmapData(param2);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX number display layer \'" + param2 + "\'.");
        }
        return _loc3_;
    }
}
