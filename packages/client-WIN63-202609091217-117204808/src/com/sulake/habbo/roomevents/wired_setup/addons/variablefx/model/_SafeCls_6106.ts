import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxCategoryDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxCategoryDefinition';
import type { VariableFxStyleDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxStyleDefinition';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { VariableFxOption } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';

export class _SafeCls_6106 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::_SafeCls_6106'); }

    declare public categoryId: number;
    static { (this.prototype as any).categoryId = 0; }

    declare public sourceType: number;
    static { (this.prototype as any).sourceType = 0; }

    declare public visibility: number;
    static { (this.prototype as any).visibility = 0; }

    declare public showMode: number;
    static { (this.prototype as any).showMode = 0; }

    declare public _SafeStr_14413: number;
    static { (this.prototype as any)._SafeStr_14413 = 0; }

    declare public showOnMouseHover: boolean;
    static { (this.prototype as any).showOnMouseHover = false; }

    declare public showDuration: number;
    static { (this.prototype as any).showDuration = 0; }

    declare public styleId: number;
    static { (this.prototype as any).styleId = 0; }

    declare public colorId: number;
    static { (this.prototype as any).colorId = 0; }

    declare public _SafeStr_14430: number;
    static { (this.prototype as any)._SafeStr_14430 = 0; }

    declare public rendererId: number;
    static { (this.prototype as any).rendererId = 0; }

    declare public defaultMinValue: number;
    static { (this.prototype as any).defaultMinValue = 0; }

    declare public defaultMaxValue: number;
    static { (this.prototype as any).defaultMaxValue = 0; }

    declare public overrideMinEnabled: boolean;
    static { (this.prototype as any).overrideMinEnabled = false; }

    declare public overrideMaxEnabled: boolean;
    static { (this.prototype as any).overrideMaxEnabled = false; }

    declare public overrideMinTarget: number;
    static { (this.prototype as any).overrideMinTarget = 0; }

    declare public overrideMaxTarget: number;
    static { (this.prototype as any).overrideMaxTarget = 0; }

    declare public segments: number;
    static { (this.prototype as any).segments = 0; }

    declare public subRendererId: number;
    static { (this.prototype as any).subRendererId = 0; }

    declare public _SafeStr_14627: number;
    static { (this.prototype as any)._SafeStr_14627 = 0; }

    declare public icon: string;

    declare public overrideMinVariableId: string;

    declare public overrideMaxVariableId: string;

    declare public audienceVariableId: string;

    declare public audienceVariableValue: number;
    static { (this.prototype as any).audienceVariableValue = 0; }

    constructor() {
    }

    private static sanitizeIconAlignment(param1: number): number {
        switch (param1 - 1) {
            case 0:
            case 1:
                return param1;
            default:
                return 0;
        }
    }

    private static iconAlignmentRuntimeValue(param1: number): string {
        switch (_SafeCls_6106.sanitizeIconAlignment(param1) - 1) {
            case 0:
                return "right";
            case 1:
                return "double";
            default:
                return "left";
        }
    }

    private static copyExtra(param1: UtilsMap): UtilsMap {
        let _loc3_: any = null;
        let _loc2_: UtilsMap = new UtilsMap();
        if (param1 == null) {
            return _loc2_;
        }
        for (_loc3_ of param1.getKeys() ?? []) {
            _loc2_[_loc3_] = param1.getValue(_loc3_);
        }
        return _loc2_;
    }

    private static clamp(param1: number, param2: number, param3: number): number {
        return Math.max(param2, Math.min(param3, param1)) | 0;
    }

    public sanitize(): void {
        let _loc3_: VariableFxCategoryDefinition = null;
        let _loc2_: VariableFxStyleDefinition = null;
        let _loc1_: any[] = null;
        if (this.sourceType != WiredInputSourcePicker._SafeStr_2178 && this.sourceType != WiredInputSourcePicker.USER_SOURCE) {
            this.sourceType = WiredInputSourcePicker.USER_SOURCE;
        }
        if (this.visibility < 0 || this.visibility > 4) {
            this.visibility = 2;
        }
        if (this.showMode < 0 || this.showMode > 2) {
            this.showMode = 0;
        }
        if (this.sourceType == WiredInputSourcePicker._SafeStr_2178 && this.visibility != 3 && this.visibility != 4) {
            this.visibility = 2;
        }
        if (this.audienceVariableId == null) {
            this.audienceVariableId = "";
        }
        if (this.visibility != 3 && this.visibility != 4) {
            this.audienceVariableId = "";
            this.audienceVariableValue = 0;
        }
        this._SafeStr_14413 = _SafeCls_6106.clamp(this._SafeStr_14413, 0, 15);
        this.showDuration = _SafeCls_6106.clamp(this.showDuration, 1500, 20000);
        _loc3_ = VariableFxEditorMetadata.getCategory(this.categoryId);
        this.categoryId = _loc3_.id;
        _loc2_ = _loc3_.getStyle(this.styleId);
        this.styleId = _loc2_.id;
        this.colorId = VariableFxEditorMetadata.optionIn(_loc2_.colorOptions, this.colorId, _loc2_.defaultColor).id;
        this._SafeStr_14430 = VariableFxEditorMetadata.optionIn(_loc2_.widthOptions, this._SafeStr_14430, _loc2_.defaultWidth).id;
        this.rendererId = VariableFxEditorMetadata.optionIn(_loc2_.rendererOptions, this.rendererId, _loc2_.defaultRenderer).id;
        if (this.categoryId == 2) {
            this.defaultMinValue = 0;
            this.defaultMaxValue = 100;
            _loc1_ = VariableFxEditorMetadata.getSubRendererOptions(_loc2_);
            this.subRendererId = VariableFxEditorMetadata.optionIn(_loc1_, this.subRendererId, asInstanceOf(_loc1_[0], VariableFxOption)).id;
        } else if (VariableFxEditorMetadata.categoryUsesValueRange(this.categoryId) && this.defaultMaxValue <= this.defaultMinValue) {
            this.defaultMaxValue = this.defaultMinValue < 100 ? 100 : this.defaultMinValue + 1;
        }
        this.overrideMinTarget = this.sanitizeOverrideTarget(this.overrideMinTarget);
        this.overrideMaxTarget = this.sanitizeOverrideTarget(this.overrideMaxTarget);
        this.segments = _SafeCls_6106.clamp(this.segments, 0, 100);
        if (!VariableFxEditorMetadata.rendererSupportsSegments(this.segmentRendererId)) {
            this.segments = 0;
        }
        if (this.categoryId == 5) {
            this._SafeStr_14627 = _SafeCls_6106.sanitizeIconAlignment(this._SafeStr_14627);
        } else {
            this._SafeStr_14627 = 0;
        }
        if (this.icon == null) {
            this.icon = "";
        }
        if (this.overrideMinVariableId == null) {
            this.overrideMinVariableId = "";
        }
        if (this.overrideMaxVariableId == null) {
            this.overrideMaxVariableId = "";
        }
    }

    public currentStyle(): VariableFxStyleDefinition {
        return VariableFxEditorMetadata.getCategory(this.categoryId).getStyle(this.styleId);
    }

    public toRuntimeConfig(): VariableFxConfigData {
        let _loc6_: VariableFxCategoryDefinition = VariableFxEditorMetadata.getCategory(this.categoryId);
        let _loc5_: VariableFxStyleDefinition = this.currentStyle();
        let _loc2_: VariableFxOption = VariableFxEditorMetadata.optionIn(_loc5_.colorOptions, this.colorId, _loc5_.defaultColor);
        let _loc4_: VariableFxOption = VariableFxEditorMetadata.optionIn(_loc5_.widthOptions, this._SafeStr_14430, _loc5_.defaultWidth);
        let _loc1_: VariableFxOption = VariableFxEditorMetadata.optionIn(_loc5_.rendererOptions, this.rendererId, _loc5_.defaultRenderer);
        let _loc3_: UtilsMap = _SafeCls_6106.copyExtra(_loc5_.extra);
        if (this.segments > 0) {
            _loc3_["segments"] = this.segments;
        }
        if (this.categoryId == 2) {
            _loc3_["sub_renderer"] = this.subRendererId;
        } else if (this.categoryId == 5) {
            if (this.icon.length > 0) {
                _loc3_["icon"] = this.icon;
            }
            _loc3_["icon_alignment"] = _SafeCls_6106.iconAlignmentRuntimeValue(this._SafeStr_14627);
        }
        return new VariableFxConfigData(_loc6_.runtimeCategory, _loc5_.runtimeStyle, _loc1_.runtimeValue, _loc4_.runtimeValue, _loc2_.runtimeValue, this.defaultMinValue, this.defaultMaxValue, _loc3_, _loc6_.id, this.styleId, this.rendererId);
    }

    private get segmentRendererId(): number {
        return this.categoryId == 2 && this.rendererId == 20 ? this.subRendererId : this.rendererId;
    }

    private sanitizeOverrideTarget(param1: number): number {
        return param1 == VariableExtraSourceTypes.GLOBAL_SOURCE ? VariableExtraSourceTypes.GLOBAL_SOURCE : this.sourceType;
    }
}
