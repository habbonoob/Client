import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableFxCategoryDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxCategoryDefinition';
import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import type { VariableFxOption } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxOption';
import type { VariableFxStyleDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxStyleDefinition';
import type { VariableFxEditorStateListener } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxEditorStateListener';
import type { VariableFxPreviewBlockPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxPreviewBlockPreset';
import type { VariableFxPreviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxPreviewPreset';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableFxColorType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxColorType';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxVisualizationSettingsPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxVisualizationSettingsPreset'); }

    private static readonly NOT_APPLICABLE_OPTION_ID: number = -1;
    private static readonly METALLIC_COLOR_PREFIX_KEY: string = "wiredfurni.params.variablefx.color.prefix.metallic";
    private static readonly DYNAMIC_COLOR_PREFIX_KEY: string = "wiredfurni.params.variablefx.color.prefix.dynamic";
    private static readonly ICON_LOCALIZATION_PREFIX: string = "wiredfurni.params.variablefx.icon.";
    private static readonly CAMPAIGN_ICONS_ENABLED_KEY: string = "wired.variablefx.campaign.icons.enabled";
    private static readonly STANDARD_ICON_IDS: any[] = ["", "battery", "burning", "cash", "cooldown", "droplet", "energy", "eye", "fish", "food", "freezing", "gems", "gold", "health", "honor", "magic", "mana", "poison", "repairing", "reputation", "shield", "stamina", "star_power", "stealth", "timeleft", "upgrading", "wooden_logs"];
    private static readonly _SafeStr_14480: any[] = ["ranch.aubergine", "ranch.carrot", "ranch.corn", "ranch.egg", "ranch.grape", "ranch.potato", "ranch.pumpkin", "ranch.sapling", "ranch.tomato", "ranch.wheat"];

    declare private _SafeStr_2333: VariableFxEditorStateListener;

    declare private _state: VariableFxEditorState;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_14481: any[];

    declare private _SafeStr_2848: SectionPreset;

    declare private _content: SimpleListViewPreset;

    declare private _SafeStr_14482: DropdownPreset;

    declare private _previewPreset: VariableFxPreviewPreset;

    declare private _SafeStr_14483: VariableFxPreviewBlockPreset;

    declare private _SafeStr_14484: WiredUIPreset;

    declare private _SafeStr_14485: WiredUIPreset;

    declare private _SafeStr_14486: TextPreset;

    declare private _SafeStr_14487: SimpleListViewPreset;

    declare private _SafeStr_14488: NamedDropdownPreset;

    declare private _SafeStr_14489: NamedDropdownPreset;

    declare private _SafeStr_14490: NamedDropdownPreset;

    declare private _SafeStr_14491: NamedDropdownPreset;

    declare private _SafeStr_14492: NamedDropdownPreset;

    declare private _iconPreset: NamedDropdownPreset;

    declare private _SafeStr_14493: NamedDropdownPreset;

    declare private _SafeStr_14494: any[];

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: VariableFxEditorStateListener) {
        let _loc5_: SectionParam = null;
        let _loc7_: SimpleListViewPreset = null;
        let _loc6_: TextParam = null;
        super(param1, param2, param3);
        this._SafeStr_2333 = param4;
        this._SafeStr_14481 = VariableFxVisualizationSettingsPreset.STANDARD_ICON_IDS;
        if (this._roomEvents.getBoolean("wired.variablefx.campaign.icons.enabled") || this._roomEvents.sessionDataManager.hasSecurity(4)) {
            this._SafeStr_14481 = VariableFxVisualizationSettingsPreset.STANDARD_ICON_IDS.concat(VariableFxVisualizationSettingsPreset._SafeStr_14480);
        }
        this._SafeStr_14482 = param2.createDropdown(new DropdownParam("", null, this.onDropdownChange, ""));
        this._previewPreset = param2.createVariableFxPreviewPreset();
        this._SafeStr_14483 = param2.createVariableFxPreviewBlockPreset(this._previewPreset, this.onRandomizePreview);
        this._SafeStr_14488 = param2.createNamedDropdown(new DropdownParam("", null, this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.color}");
        this._SafeStr_14489 = param2.createNamedDropdown(new DropdownParam("", null, this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.width}");
        this._SafeStr_14490 = param2.createNamedDropdown(new DropdownParam("", null, this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.renderer}");
        this._SafeStr_14491 = param2.createNamedDropdown(new DropdownParam("", null, this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.sub_renderer}");
        this._SafeStr_14492 = param2.createNamedDropdown(new DropdownParam("", VariableFxVisualizationSettingsPreset.segmentsOptions(), this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.segments}");
        this._iconPreset = param2.createNamedDropdown(new DropdownParam("", this.iconOptions(), this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.icon}");
        this._SafeStr_14493 = param2.createNamedDropdown(new DropdownParam("", VariableFxVisualizationSettingsPreset.iconAlignmentOptions(), this.onDropdownChange), "${wiredfurni.params.variablefx.visualization.icon_alignment}");
        this._SafeStr_14494 = [this._SafeStr_14488, this._SafeStr_14489, this._SafeStr_14490, this._SafeStr_14491, this._SafeStr_14492, this._iconPreset, this._SafeStr_14493];
        this._SafeStr_14487 = param2.createSimpleListView(true, this._SafeStr_14494);
        this._SafeStr_14487.spacing = param3.genericVerticalSpacing;
        _loc6_ = new TextParam(1, true);
        _loc6_.textColor = param3.softTextColor;
        this._SafeStr_14486 = param2.createText("${wiredfurni.params.variablefx.visualization}", _loc6_);
        _loc7_ = param2.createSimpleListView(true, [this._SafeStr_14486, this._SafeStr_14487]);
        _loc7_.spacing = param3.genericVerticalSpacing;
        this._SafeStr_14485 = param2.createPaddedContainerPreset(_loc7_, 6, 5, 6, 5, param3.createBorder());
        this._content = param2.createSimpleListView(true, [this._SafeStr_14483, this._SafeStr_14485]);
        this._content.spacing = param3.genericVerticalSpacing;
        this._SafeStr_14484 = param2.createSurroundingBorderContainerPreset(this._content, 5, 5, 5, 5);
        _loc5_ = new SectionParam();
        _loc5_.headerOptionLeft = this._SafeStr_14482;
        _loc5_.titleYOffset = param3.namedDropdownOffset;
        this._SafeStr_2848 = param2.createSection("${wiredfurni.params.variablefx.visualization.style}", this._SafeStr_14484, _loc5_);
    }

    private static maxVisibleNameWidth(param1: number, param2: WiredUIPreset): number {
        let _loc3_: NamedDropdownPreset = null;
        if (!param2.visible) {
            return param1;
        }
        _loc3_ = param2 instanceof NamedDropdownPreset ? param2 : null;
        if (_loc3_ != null) {
            return Math.max(param1, _loc3_.nameWidth) | 0;
        }
        return param1;
    }

    private static applyVisibleNameWidth(param1: WiredUIPreset, param2: number): void {
        let _loc3_: NamedDropdownPreset = null;
        if (!param1.visible) {
            return;
        }
        _loc3_ = param1 instanceof NamedDropdownPreset ? param1 : null;
        if (_loc3_ != null) {
            _loc3_.nameWidth = param2;
        }
    }

    private static styleOptions(param1: VariableFxCategoryDefinition): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        for (const _loc3_ of param1.styles ?? []) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_.id | 0, "${" + _loc3_.localizationKey + "}"));
        }
        return _loc2_;
    }

    private static optionVectorWithDefault(param1: any[], param2: VariableFxOption): ExpandableDropdownOption[] {
        if (param1.length > 0) {
            return VariableFxVisualizationSettingsPreset.optionVector(param1);
        }
        return VariableFxVisualizationSettingsPreset.optionVector([param2]);
    }

    private static selectorHasEditableOptions(param1: any[], param2: number): boolean {
        return param1.length > 1 && param2 != -1;
    }

    private static notApplicableOptions(): ExpandableDropdownOption[] {
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc1_.push(new ExpandableDropdownOption(-1, "${wiredfurni.params.variablefx.not_applicable}"));
        return _loc1_;
    }

    private static optionVector(param1: any[]): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_.id | 0, "${" + _loc3_.key + "}"));
        }
        return _loc2_;
    }

    private static isDynamicColor(param1: VariableFxOption): boolean {
        return param1.runtimeValue == "DYNAMIC_RED_TO_GREEN" || param1.runtimeValue == "DYNAMIC_LEVELLING" || param1.runtimeValue == "DYNAMIC_TEAM_COLOR";
    }

    private static isMetallicColor(param1: VariableFxOption): boolean {
        return VariableFxColorType.resolve(param1.runtimeValue).isMetallic;
    }

    private static segmentsOptions(): ExpandableDropdownOption[] {
        let _loc2_: number = 0;
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc1_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.variablefx.visualization.segments.not_specified}"));
        _loc2_ = 1;
        while (_loc2_ <= 100) {
            _loc1_.push(new ExpandableDropdownOption(_loc2_, String(_loc2_)));
            _loc2_++;
        }
        return _loc1_;
    }

    private static iconAlignmentOptions(): ExpandableDropdownOption[] {
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc1_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.variablefx.icon_alignment.left}"));
        _loc1_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.variablefx.icon_alignment.right}"));
        _loc1_.push(new ExpandableDropdownOption(2, "${wiredfurni.params.variablefx.icon_alignment.double}"));
        return _loc1_;
    }

    public init(param1: VariableFxEditorState): void {
        this._state = param1;
        this._previewPreset.init(param1);
        this.refreshForStyle();
        this.refreshPreview();
    }

    public applyToState(param1: VariableFxEditorState): void {
        param1.styleId = this._SafeStr_14482.selectedId;
        if (this._SafeStr_14488.visible && !this._SafeStr_14488.disabled) {
            param1.colorId = this._SafeStr_14488.selectedId;
        }
        if (this._SafeStr_14489.visible && !this._SafeStr_14489.disabled) {
            param1._SafeStr_14472 = this._SafeStr_14489.selectedId;
        }
        if (this._SafeStr_14490.visible && !this._SafeStr_14490.disabled) {
            param1.rendererId = this._SafeStr_14490.selectedId;
        }
        if (this._SafeStr_14491.visible && !this._SafeStr_14491.disabled) {
            param1.subRendererId = this._SafeStr_14491.selectedId;
        }
        if (this._SafeStr_14492.visible && !this._SafeStr_14492.disabled) {
            param1.segments = this._SafeStr_14492.selectedId;
        }
        if (this._SafeStr_14492.visible && this._SafeStr_14492.disabled) {
            param1.segments = 0;
        }
        if (this._iconPreset.visible && !this._iconPreset.disabled && this._iconPreset.selected != null) {
            param1.icon = this.iconIdForOption(this._iconPreset.selectedId);
        }
        if (!this._iconPreset.visible || this._iconPreset.disabled) {
            param1.icon = "";
        }
        if (this._SafeStr_14493.visible && !this._SafeStr_14493.disabled) {
            param1._SafeStr_14473 = this._SafeStr_14493.selectedId;
        }
    }

    public refreshForStyle(): void {
        let _loc6_: number = 0;
        let _loc2_: boolean = false;
        let _loc3_: boolean = false;
        let _loc1_: any[] = null;
        let _loc5_: VariableFxCategoryDefinition = VariableFxEditorMetadata.getCategory(this._state.categoryId);
        let _loc4_: VariableFxStyleDefinition = this._state.currentStyle();
        this._SafeStr_4202 = true;
        this._SafeStr_14482.reinit(VariableFxVisualizationSettingsPreset.styleOptions(_loc5_), this._state.styleId);
        this._SafeStr_14488.reinit(this.colorOptionVectorWithDefault(_loc4_.colorOptions, _loc4_.defaultColor), this._state.colorId);
        this._SafeStr_14489.reinit(VariableFxVisualizationSettingsPreset.optionVectorWithDefault(_loc4_.widthOptions, _loc4_.defaultWidth), this._state._SafeStr_14472);
        this._SafeStr_14490.reinit(VariableFxVisualizationSettingsPreset.optionVectorWithDefault(_loc4_.rendererOptions, _loc4_.defaultRenderer), this._state.rendererId);
        _loc1_ = VariableFxEditorMetadata.getSubRendererOptions(_loc4_);
        if (_loc1_.length > 0) {
            this._SafeStr_14491.reinit(VariableFxVisualizationSettingsPreset.optionVector(_loc1_), this._state.subRendererId);
        } else {
            this._SafeStr_14491.reinit(VariableFxVisualizationSettingsPreset.notApplicableOptions(), -1);
        }
        if (_loc4_.supportsIcon) {
            this._iconPreset.reinit(this.iconOptions(), this.iconOptionId(this._state.icon));
            this._SafeStr_14493.reinit(VariableFxVisualizationSettingsPreset.iconAlignmentOptions(), this._state._SafeStr_14473);
        } else {
            this._iconPreset.reinit(VariableFxVisualizationSettingsPreset.notApplicableOptions(), -1);
            this._SafeStr_14493.reinit(VariableFxVisualizationSettingsPreset.notApplicableOptions(), -1);
        }
        _loc6_ = this._state.categoryId == 2 && this._state.rendererId == 20 ? this._state.subRendererId : this._state.rendererId;
        _loc2_ = VariableFxEditorMetadata.rendererSupportsSegments(_loc6_);
        _loc3_ = _loc2_ && this._state.segments > 0;
        this._SafeStr_14492.reinit(_loc2_ ? VariableFxVisualizationSettingsPreset.segmentsOptions() : VariableFxVisualizationSettingsPreset.notApplicableOptions(), _loc2_ ? this._state.segments : -1);
        this._SafeStr_14488.visible = VariableFxEditorMetadata.categoryUsesColorSelector(this._state.categoryId);
        this._SafeStr_14489.visible = VariableFxEditorMetadata.categoryUsesWidthSelector(this._state.categoryId);
        this._SafeStr_14490.visible = VariableFxEditorMetadata.categoryUsesRendererSelector(this._state.categoryId);
        this._SafeStr_14491.visible = VariableFxEditorMetadata.categoryUsesSubRendererSelector(this._state.categoryId);
        this._SafeStr_14492.visible = VariableFxEditorMetadata.categoryUsesSegmentsSelector(this._state.categoryId);
        this._iconPreset.visible = VariableFxEditorMetadata.categoryUsesIconSelector(this._state.categoryId);
        this._SafeStr_14493.visible = VariableFxEditorMetadata.categoryUsesIconSelector(this._state.categoryId);
        this._SafeStr_14488.disabled = !VariableFxVisualizationSettingsPreset.selectorHasEditableOptions(_loc4_.colorOptions, _loc4_.defaultColor.id);
        this._SafeStr_14489.disabled = !VariableFxVisualizationSettingsPreset.selectorHasEditableOptions(_loc4_.widthOptions, _loc4_.defaultWidth.id) || _loc3_;
        this._SafeStr_14490.disabled = !VariableFxVisualizationSettingsPreset.selectorHasEditableOptions(_loc4_.rendererOptions, _loc4_.defaultRenderer.id);
        this._SafeStr_14491.disabled = !VariableFxVisualizationSettingsPreset.selectorHasEditableOptions(_loc1_, this._state.subRendererId);
        this._SafeStr_14492.disabled = !_loc2_;
        this._iconPreset.disabled = !_loc4_.supportsIcon;
        this._SafeStr_14493.disabled = !_loc4_.supportsIcon;
        this.alignSelectorNames();
        this._SafeStr_4202 = false;
    }

    public refreshPreview(): void {
        if (this._state != null) {
            this._previewPreset.refresh(this._state);
            this._SafeStr_14483.refreshZoomLabel();
        }
    }

    private onDropdownChange = (param1: ExpandableDropdownOption): void => {
        this.stateChanged();
    };

    private onRandomizePreview = (): void => {
        this.applyToState(this._state);
        this._state.sanitize();
        this._previewPreset.randomize(this._state);
        this._SafeStr_14483.refreshZoomLabel();
        this._SafeStr_2333.variableFxStateChanged(this._state, false);
    };

    private stateChanged(): void {
        if (this._SafeStr_4202) {
            return;
        }
        this.applyToState(this._state);
        this._state.sanitize();
        this.refreshForStyle();
        this._SafeStr_2333.variableFxStateChanged(this._state, true);
    }

    private alignSelectorNames(): void {
        let _loc1_: any = null;
        let _loc2_: number = 0;
        for (_loc1_ of this._SafeStr_14494 ?? []) {
            _loc2_ = VariableFxVisualizationSettingsPreset.maxVisibleNameWidth(_loc2_, _loc1_);
        }
        for (_loc1_ of this._SafeStr_14494 ?? []) {
            VariableFxVisualizationSettingsPreset.applyVisibleNameWidth(_loc1_, _loc2_);
        }
        this._SafeStr_14487.resize();
    }

    private colorOptionVectorWithDefault(param1: any[], param2: VariableFxOption): ExpandableDropdownOption[] {
        if (param1.length > 0) {
            return this.colorOptionVector(param1);
        }
        return this.colorOptionVector([param2]);
    }

    private colorOptionVector(param1: any[]): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_.id | 0, this.colorDisplayString(_loc3_)));
        }
        return _loc2_;
    }

    private colorDisplayString(param1: VariableFxOption): string {
        let _loc2_: string = null;
        if (VariableFxVisualizationSettingsPreset.isDynamicColor(param1)) {
            _loc2_ = "wiredfurni.params.variablefx.color.prefix.dynamic";
        } else if (VariableFxVisualizationSettingsPreset.isMetallicColor(param1) && this._state.categoryId != 5) {
            _loc2_ = "wiredfurni.params.variablefx.color.prefix.metallic";
        }
        if (_loc2_ == null) {
            return this.localized(param1.key);
        }
        return this.localized(_loc2_) + " " + this.localized(param1.key);
    }

    private localized(param1: string): string {
        return this._roomEvents.localization.getLocalization(param1, param1);
    }

    private iconOptions(): ExpandableDropdownOption[] {
        let _loc2_: number = 0;
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14481.length) {
            _loc1_.push(new ExpandableDropdownOption(_loc2_, this._SafeStr_14481[_loc2_] == "" ? "${wiredfurni.params.variablefx.icon.none}" : this.iconDisplayString(stringOrNull(this._SafeStr_14481[_loc2_]))));
            _loc2_++;
        }
        return _loc1_;
    }

    private iconDisplayString(param1: string): string {
        let _loc3_: string = "wiredfurni.params.variablefx.icon." + param1;
        let _loc4_: number = param1.indexOf(".");
        if (_loc4_ == -1) {
            return this.localized(_loc3_);
        }
        let _loc2_: string = "wiredfurni.params.variablefx.icon." + param1.substring(0, _loc4_);
        return this.localized(_loc2_) + " " + this.localized(_loc3_);
    }

    private iconOptionId(param1: string): number {
        let _loc3_: number = 0;
        let _loc2_: ExpandableDropdownOption[] = this.iconOptions();
        _loc3_ = 0;
        while (_loc3_ < _loc2_.length) {
            if (this.iconIdForOption(_loc2_[_loc3_].id) == param1) {
                return _loc2_[_loc3_].id;
            }
            _loc3_++;
        }
        return 0;
    }

    private iconIdForOption(param1: number): string {
        return stringOrNull(param1 >= 0 && param1 < this._SafeStr_14481.length ? this._SafeStr_14481[param1] : "");
    }

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2333 = null;
        this._state = null;
        this._SafeStr_2848 = null;
        this._content = null;
        this._SafeStr_14482 = null;
        this._previewPreset = null;
        this._SafeStr_14483 = null;
        this._SafeStr_14484 = null;
        this._SafeStr_14485 = null;
        this._SafeStr_14486 = null;
        this._SafeStr_14487 = null;
        this._SafeStr_14488 = null;
        this._SafeStr_14489 = null;
        this._SafeStr_14490 = null;
        this._SafeStr_14491 = null;
        this._SafeStr_14492 = null;
        this._iconPreset = null;
        this._SafeStr_14493 = null;
        this._SafeStr_14494 = null;
    }
}
