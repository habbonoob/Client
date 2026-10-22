import { asGuarded, isFunction } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { ArrowProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ArrowProgressBarRenderer';
import { BlockProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BlockProgressBarRenderer';
import { BossHealthBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BossHealthBarRenderer';
import { ClassicMiniProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicMiniProgressBarRenderer';
import { ClassicProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicProgressBarRenderer';
import { HealthProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/HealthProgressBarRenderer';
import { MaskedHeartFillRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/MaskedHeartFillRenderer';
import { StripedProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/StripedProgressBarRenderer';
import { ThermometerHealthPointsRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ThermometerHealthPointsRenderer';
import { StackedHealthPointsRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/healthpoints/StackedHealthPointsRenderer';
import { LevelDetailsRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelDetailsRenderer';
import { LevelWithProgressRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelWithProgressRenderer';
import { BakedColorNumberDisplayRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/BakedColorNumberDisplayRenderer';
import { RecolorableNumberDisplayRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/number/RecolorableNumberDisplayRenderer';
import { VariableFxRendererMappings } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererMappings';

export class VariableFxRendererRegistry {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxRendererRegistry'); }

    private _SafeStr_14662: any[] = [];

    private _rendererFactories: any = {};

    private _serverRendererFactories: any = {};

    constructor() {
    }

    public static createDefault(param1: VariableFxAssetProvider, param2: XML = null): VariableFxRendererRegistry {
        let assetProvider: VariableFxAssetProvider = param1;
        let rendererMappingsXml: XML = param2;
        let registry: VariableFxRendererRegistry = new VariableFxRendererRegistry();
        let xml: XML = rendererMappingsXml;
        registry.registerRendererFactory("ArrowProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new ArrowProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("BakedColorNumberDisplayRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new BakedColorNumberDisplayRenderer(param1);
         });
        registry.registerRendererFactory("BlockProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new BlockProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("BossHealthBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new BossHealthBarRenderer(param1);
         });
        registry.registerRendererFactory("ClassicMiniProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new ClassicMiniProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("ClassicProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new ClassicProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("HealthProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new HealthProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("LevelDetailsRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new LevelDetailsRenderer(param1);
         });
        registry.registerRendererFactory("LevelWithProgressRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new LevelWithProgressRenderer(param1);
         });
        registry.registerRendererFactory("MaskedHeartFillRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new MaskedHeartFillRenderer(param1);
         });
        registry.registerRendererFactory("RecolorableNumberDisplayRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new RecolorableNumberDisplayRenderer(param1);
         });
        registry.registerRendererFactory("StackedHealthPointsRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new StackedHealthPointsRenderer(param1);
         });
        registry.registerRendererFactory("StripedProgressBarRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new StripedProgressBarRenderer(param1);
         });
        registry.registerRendererFactory("ThermometerHealthPointsRenderer", (param1: VariableFxRendererContext): VariableFxRenderer => {
             return new ThermometerHealthPointsRenderer(param1);
         });
        registry.register("progress_bar", "classic_progress", registry._rendererFactories["ClassicProgressBarRenderer"]);
        registry.register("progress_bar", "classic_mini_progress", registry._rendererFactories["ClassicMiniProgressBarRenderer"]);
        registry.register("progress_bar", "block_progress", registry._rendererFactories["BlockProgressBarRenderer"]);
        registry.register("progress_bar", "striped_progress", registry._rendererFactories["StripedProgressBarRenderer"]);
        registry.register("progress_bar", "arrow_progress", registry._rendererFactories["ArrowProgressBarRenderer"]);
        registry.register("status_bar", "block_progress", registry._rendererFactories["BlockProgressBarRenderer"]);
        registry.register("status_bar", "striped_progress", registry._rendererFactories["StripedProgressBarRenderer"]);
        registry.register("status_bar", "arrow_progress", registry._rendererFactories["ArrowProgressBarRenderer"]);
        registry.register("health_points", "health_progress", registry._rendererFactories["HealthProgressBarRenderer"]);
        registry.register("health_points", "masked_heart_fill", registry._rendererFactories["MaskedHeartFillRenderer"]);
        registry.register("health_points", "stacked_health_points", registry._rendererFactories["StackedHealthPointsRenderer"]);
        registry.register("health_points", "thermometer_health_points", registry._rendererFactories["ThermometerHealthPointsRenderer"]);
        registry.register("levelling_progress", "level_with_progress", registry._rendererFactories["LevelWithProgressRenderer"]);
        registry.register("levelling_progress", "level_with_bar_and_numerical_progress", registry._rendererFactories["LevelDetailsRenderer"]);
        registry.register("boss_bar", "boss_health_bar", registry._rendererFactories["BossHealthBarRenderer"]);
        registry.register("number_display", "number_recolorable", registry._rendererFactories["RecolorableNumberDisplayRenderer"]);
        registry.register("number_display", "number_baked_colors", registry._rendererFactories["BakedColorNumberDisplayRenderer"]);
        if (xml == null) {
            xml = assetProvider.getXml("variablefx_renderer_mapping");
        }
        registry.registerRendererMappings(VariableFxRendererMappings.parse(xml));
        return registry;
    }

    public register(param1: string, param2: string, param3: (...args: any[]) => any): void {
        this._SafeStr_14662.push({ "category": param1, "style": param2, "create": param3 });
    }

    public registerRendererFactory(param1: string, param2: (...args: any[]) => any): void {
        this._rendererFactories[param1] = param2;
    }

    public registerRendererMappings(param1: any[]): void {
        let _loc3_: any = null;
        let _loc2_: (...args: any[]) => any = null;
        for (_loc3_ of param1 ?? []) {
            _loc2_ = this._rendererFactories[_loc3_.rendererClass];
            if (_loc2_ == null) {
                throw new Error("No Variable FX renderer factory registered for class \'" + _loc3_.rendererClass + "\'.");
            }
            this._serverRendererFactories[String(_loc3_.rendererId)] = _loc2_;
        }
    }

    public resolve(param1: string, param2: string = null): (...args: any[]) => any {
        let _loc3_: any = null;
        if (param2 != null) {
            for (_loc3_ of this._SafeStr_14662 ?? []) {
                if (_loc3_.category == param1 && _loc3_.style == param2) {
                    return _loc3_.create;
                }
            }
        }
        for (_loc3_ of this._SafeStr_14662 ?? []) {
            if (_loc3_.category == param1 && _loc3_.style == null) {
                return _loc3_.create;
            }
        }
        return null;
    }

    public resolveByServerRenderer(param1: number): (...args: any[]) => any {
        return asGuarded(this._serverRendererFactories[String(param1)], isFunction);
    }
}
