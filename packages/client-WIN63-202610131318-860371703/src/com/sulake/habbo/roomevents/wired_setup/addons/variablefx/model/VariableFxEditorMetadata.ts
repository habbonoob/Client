import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxIdResolver } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxIdResolver';
import { VariableFxPreviewStyleDefinition } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxPreviewStyleDefinition';
import { VariableFxPreviewStyleDefinitions } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxPreviewStyleDefinitions';
import { VariableFxCategoryDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxCategoryDefinition';
import { VariableFxOption } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxOption';
import { VariableFxStyleDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxStyleDefinition';

export class VariableFxEditorMetadata {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxEditorMetadata'); }

    private static _categories: any[];
    private static _colors: any[];
    private static _renderers: any[];
    private static _widths: any[];

    constructor() {
    }

    public static getCategory(param1: number): VariableFxCategoryDefinition {
        VariableFxEditorMetadata.initialize();
        return VariableFxEditorMetadata._categories[param1] == null ? asInstanceOf(VariableFxEditorMetadata._categories[1], VariableFxCategoryDefinition) : asInstanceOf(VariableFxEditorMetadata._categories[param1], VariableFxCategoryDefinition);
    }

    public static categoryUsesValueRange(param1: number): boolean {
        return param1 != 2 && param1 != 5;
    }

    public static categoryUsesColorSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             return param1.hasColorOptions;
         });
    }

    public static categoryUsesWidthSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             return param1.hasWidthOptions;
         });
    }

    public static categoryUsesRendererSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             return param1.hasRendererOptions;
         });
    }

    public static categoryUsesSubRendererSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             return param1.extra.hasKey("sub_renderer");
         });
    }

    public static categoryUsesIconSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             return param1.supportsIcon;
         });
    }

    public static categoryUsesSegmentsSelector(param1: number): boolean {
        let categoryId: number = param1;
        return VariableFxEditorMetadata.categoryHasStyleMatching(categoryId, (param1: VariableFxStyleDefinition): boolean => {
             let _loc2_: any = null;
             if (param1.extra.hasKey("sub_renderer")) {
                 return true;
             }
             for (_loc2_ of param1.rendererOptions ?? []) {
                 if (VariableFxEditorMetadata.rendererSupportsSegments(_loc2_.id | 0)) {
                     return true;
                 }
             }
             return VariableFxEditorMetadata.rendererSupportsSegments(param1.defaultRenderer.id);
         });
    }

    public static rendererSupportsSegments(param1: number): boolean {
        return param1 == 2 || param1 == 4 || param1 == 13;
    }

    public static getColor(param1: number): VariableFxOption {
        VariableFxEditorMetadata.initialize();
        return VariableFxEditorMetadata.colorOptionById(param1);
    }

    public static getWidth(param1: number): VariableFxOption {
        VariableFxEditorMetadata.initialize();
        return VariableFxEditorMetadata.widthOptionById(param1);
    }

    public static getRenderer(param1: number): VariableFxOption {
        VariableFxEditorMetadata.initialize();
        return VariableFxEditorMetadata.rendererOptionById(param1);
    }

    public static getSubRendererOptions(param1: VariableFxStyleDefinition): any[] {
        VariableFxEditorMetadata.initialize();
        if (!param1.extra.hasKey("sub_renderer")) {
            return [];
        }
        if (param1.defaultRenderer.id == 20) {
            return [VariableFxEditorMetadata.getRenderer(2), VariableFxEditorMetadata.getRenderer(3), VariableFxEditorMetadata.getRenderer(4)];
        }
        return [VariableFxEditorMetadata.getRenderer(param1.extra.getValue("sub_renderer") | 0)];
    }

    public static optionIn(param1: any[], param2: number, param3: VariableFxOption): VariableFxOption {
        for (const _loc4_ of param1 ?? []) {
            if (_loc4_.id == param2) {
                return _loc4_;
            }
        }
        return param3;
    }

    private static categoryHasStyleMatching(param1: number, param2: (...args: any[]) => any): boolean {
        let _loc4_: VariableFxCategoryDefinition = VariableFxEditorMetadata.getCategory(param1);
        for (const _loc3_ of _loc4_.styles ?? []) {
            if (param2(_loc3_)) {
                return true;
            }
        }
        return false;
    }

    private static initialize(): void {
        if (VariableFxEditorMetadata._categories != null) {
            return;
        }
        VariableFxEditorMetadata.initializeColors();
        VariableFxEditorMetadata.initializeWidths();
        VariableFxEditorMetadata.initializeRenderers();
        VariableFxEditorMetadata.initializeCategories();
    }

    private static initializeColors(): void {
        let _loc1_: number = 0;
        VariableFxEditorMetadata._colors = [];
        for (_loc1_ of VariableFxIdResolver.getColorIds() ?? []) {
            VariableFxEditorMetadata.addColor(_loc1_);
        }
    }

    private static initializeWidths(): void {
        let _loc1_: number = 0;
        VariableFxEditorMetadata._widths = [];
        for (_loc1_ of VariableFxIdResolver.getWidthIds() ?? []) {
            VariableFxEditorMetadata.addWidth(_loc1_);
        }
    }

    private static initializeRenderers(): void {
        let _loc1_: number = 0;
        VariableFxEditorMetadata._renderers = [];
        for (_loc1_ of VariableFxIdResolver.getRendererIds() ?? []) {
            VariableFxEditorMetadata.addRenderer(_loc1_);
        }
    }

    private static initializeCategories(): void {
        let _loc1_: number = 0;
        VariableFxEditorMetadata._categories = [];
        for (_loc1_ of VariableFxIdResolver.getCategoryIds() ?? []) {
            VariableFxEditorMetadata.addCategory(_loc1_);
        }
    }

    private static addCategory(param1: number): void {
        let _loc5_: any[] = VariableFxPreviewStyleDefinitions.getByCategoryId(param1);
        let _loc2_: any[] = [];
        let _loc4_: string = _loc5_.length == 0 ? "" : (asInstanceOf(_loc5_[0], VariableFxPreviewStyleDefinition)).category;
        for (const _loc3_ of _loc5_ ?? []) {
            _loc2_.push(VariableFxEditorMetadata.styleFromPreviewDefinition(_loc3_));
        }
        VariableFxEditorMetadata._categories[param1] = new VariableFxCategoryDefinition(param1, _loc4_, _loc2_);
    }

    private static styleFromPreviewDefinition(param1: VariableFxPreviewStyleDefinition): VariableFxStyleDefinition {
        let _loc2_: VariableFxOption = VariableFxEditorMetadata.colorByRuntimeValue(param1.defaultColor);
        let _loc3_: VariableFxOption = VariableFxEditorMetadata.widthByRuntimeValue(param1.defaultWidth);
        let _loc4_: VariableFxOption = VariableFxEditorMetadata.rendererByRuntimeValue(param1.defaultRenderer);
        return new VariableFxStyleDefinition(param1._SafeStr_14474, "wiredfurni.params.variablefx.style." + VariableFxEditorMetadata.localizationCategory(param1.category) + "." + param1._SafeStr_14474, param1.defaultRenderer, VariableFxEditorMetadata.colorOptions(param1.allowedColors), VariableFxEditorMetadata.widthOptions(param1.allowedWidths), VariableFxEditorMetadata.rendererOptions(param1.allowedRenderers), _loc2_ == null ? VariableFxEditorMetadata.colorOptionById(VariableFxIdResolver.resolveColorId("NOT_APPLICABLE")) : _loc2_, _loc3_ == null ? VariableFxEditorMetadata.widthOptionById(VariableFxIdResolver.resolveWidthId("not_applicable")) : _loc3_, _loc4_ == null ? VariableFxEditorMetadata.rendererOptionById(0) : _loc4_, VariableFxEditorMetadata.copyMap(param1.defaultConfigExtra), VariableFxEditorMetadata.copyMap(param1.defaultStatusExtra), VariableFxEditorMetadata.supportsIcon(param1));
    }

    private static localizationCategory(param1: string): string {
        return param1;
    }

    private static supportsIcon(param1: VariableFxPreviewStyleDefinition): boolean {
        return param1.categoryId == 5;
    }

    private static colorOptions(param1: any[]): any[] {
        let _loc4_: VariableFxOption = null;
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc4_ = VariableFxEditorMetadata.colorByRuntimeValue(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                _loc2_.push(_loc4_);
            }
        }
        return _loc2_;
    }

    private static widthOptions(param1: any[]): any[] {
        let _loc4_: VariableFxOption = null;
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc4_ = VariableFxEditorMetadata.widthByRuntimeValue(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                _loc2_.push(_loc4_);
            }
        }
        return _loc2_;
    }

    private static rendererOptions(param1: any[]): any[] {
        let _loc4_: VariableFxOption = null;
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc4_ = VariableFxEditorMetadata.rendererByRuntimeValue(stringOrNull(_loc3_));
            if (_loc4_ != null) {
                _loc2_.push(_loc4_);
            }
        }
        return _loc2_;
    }

    private static copyMap(param1: UtilsMap): UtilsMap {
        return param1 == null ? new UtilsMap() : param1.clone();
    }

    private static addColor(param1: number): void {
        let _loc2_: string = VariableFxIdResolver.resolveColorById(param1);
        let _loc3_: VariableFxOption = new VariableFxOption(param1, "wiredfurni.params.variablefx.color." + param1, _loc2_);
        VariableFxEditorMetadata._colors[param1] = _loc3_;
    }

    private static addWidth(param1: number): void {
        let _loc2_: string = VariableFxIdResolver.resolveWidthById(param1);
        let _loc3_: VariableFxOption = new VariableFxOption(param1, "wiredfurni.params.variablefx.width." + param1, _loc2_);
        VariableFxEditorMetadata._widths[param1] = _loc3_;
    }

    private static addRenderer(param1: number): void {
        let _loc2_: string = VariableFxIdResolver.resolveRendererById(param1);
        let _loc3_: VariableFxOption = new VariableFxOption(param1, "wiredfurni.params.variablefx.renderer." + param1, _loc2_);
        VariableFxEditorMetadata._renderers[param1] = _loc3_;
    }

    private static colorByRuntimeValue(param1: string): VariableFxOption {
        let _loc2_: VariableFxOption = VariableFxEditorMetadata.colorOptionById(VariableFxIdResolver.resolveColorId(param1));
        return _loc2_.runtimeValue == param1 ? _loc2_ : null;
    }

    private static widthByRuntimeValue(param1: string): VariableFxOption {
        let _loc2_: VariableFxOption = VariableFxEditorMetadata.widthOptionById(VariableFxIdResolver.resolveWidthId(param1));
        return _loc2_.runtimeValue == param1 ? _loc2_ : null;
    }

    private static rendererByRuntimeValue(param1: string): VariableFxOption {
        let _loc2_: VariableFxOption = VariableFxEditorMetadata.rendererOptionById(VariableFxIdResolver.resolveRendererId(param1));
        return _loc2_.runtimeValue == param1 ? _loc2_ : null;
    }

    private static colorOptionById(param1: number): VariableFxOption {
        return VariableFxEditorMetadata._colors[param1] == null ? asInstanceOf(VariableFxEditorMetadata._colors[VariableFxIdResolver.resolveColorId("NOT_APPLICABLE")], VariableFxOption) : asInstanceOf(VariableFxEditorMetadata._colors[param1], VariableFxOption);
    }

    private static widthOptionById(param1: number): VariableFxOption {
        return VariableFxEditorMetadata._widths[param1] == null ? asInstanceOf(VariableFxEditorMetadata._widths[VariableFxIdResolver.resolveWidthId("not_applicable")], VariableFxOption) : asInstanceOf(VariableFxEditorMetadata._widths[param1], VariableFxOption);
    }

    private static rendererOptionById(param1: number): VariableFxOption {
        return VariableFxEditorMetadata._renderers[param1] == null ? asInstanceOf(VariableFxEditorMetadata._renderers[0], VariableFxOption) : asInstanceOf(VariableFxEditorMetadata._renderers[param1], VariableFxOption);
    }
}
