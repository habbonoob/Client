import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { AllVariablesInRoom } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/AllVariablesInRoom';
import type { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import type { WiredContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/WiredContext';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { VariableLeaderboardColumnsPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/VariableLeaderboardColumnsPreset';
import type { VariableLeaderboardLocationPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/VariableLeaderboardLocationPreset';
import type { VariableLeaderboardMultiVariablePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/VariableLeaderboardMultiVariablePreset';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { ChooseVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ChooseVariableSection';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import { VariableLeaderboardConfigCodec } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfigCodec';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class VariableLeaderboardAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.leaderboard::VariableLeaderboardAddon'); }

    private static readonly NULL_VARIABLE_ID: string = "0";
    private static readonly INVALID_CONFIGURATION_LOCALIZATION: string = "wiredfurni.error.variable_leaderboard.invalid_configuration";

    declare private _context: VariableLeaderboardContext;

    declare private _allVariables: AllVariablesInRoom;

    declare private _config: VariableLeaderboardConfig;

    declare private _encodedConfig: any;

    declare private _SafeStr_14528: boolean;
    static { (this.prototype as any)._SafeStr_14528 = false; }

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_14529: boolean;
    static { (this.prototype as any)._SafeStr_14529 = false; }

    declare private _SafeStr_14394: boolean;
    static { (this.prototype as any)._SafeStr_14394 = false; }

    declare private _SafeStr_14530: boolean;
    static { (this.prototype as any)._SafeStr_14530 = false; }

    declare private _SafeStr_14531: boolean;
    static { (this.prototype as any)._SafeStr_14531 = false; }

    declare private _SafeStr_14532: TextPreset;

    declare private _SafeStr_14533: TextInputPreset;

    declare private _SafeStr_14534: TextInputPreset;

    declare private _SafeStr_14535: VariableLeaderboardColumnsPreset;

    declare private _SafeStr_4682: DropdownPreset;

    declare private _SafeStr_14536: DropdownPreset;

    declare private _SafeStr_14537: CheckboxGroupPreset;

    declare private _SafeStr_14538: ChooseVariableSection;

    declare private _SafeStr_14539: CheckboxGroupPreset;

    declare private _SafeStr_14540: ValueOrVariableSection;

    declare private _SafeStr_14541: VariableLeaderboardMultiVariablePreset;

    declare private _SafeStr_14542: VariableLeaderboardLocationPreset;

    constructor() {
        super();
    }

    private static isEligibleFilterVariable(param1: WiredVariable): boolean {
        return param1.variableTarget == VariableTarget.USER && param1.isPersisted && !param1.requiresExecutionContext;
    }

    private static canonicalVariableId(param1: string): string {
        return VariableLeaderboardAddon.isNullVariableId(param1) ? "0" : param1;
    }

    private static isNullVariableId(param1: string): boolean {
        return param1 == null || param1.length == 0 || param1 == "0" || param1 == WiredVariable._SafeStr_2375;
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_LEADERBOARD;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get widthModifier(): number {
        return 1.35;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc13_: number = 0;
        let _loc9_: TextParam = new TextParam(1);
        _loc9_.textColor = param2.redTextColor;
        this._SafeStr_14532 = param1.createText("", _loc9_);
        this._SafeStr_14532.visible = false;
        let _loc10_: TextParam = new TextParam(0);
        let _loc6_: TextPreset = param1.createText("${wiredfurni.params.variable_leaderboard.title}", _loc10_);
        let _loc15_: TextPreset = param1.createText("${wiredfurni.params.variable_leaderboard.description}", _loc10_);
        let _loc11_: number = Math.max(_loc6_.width, _loc15_.width) | 0;
        _loc6_.width = _loc11_;
        _loc15_.width = _loc11_;
        this._SafeStr_14533 = param1.createTextInput(new TextInputParam("", 50));
        this._SafeStr_14534 = param1.createTextInput(new TextInputParam("", 80));
        this._SafeStr_14533.addEventListener("WE_CHANGE", this.onInformationChanged);
        this._SafeStr_14534.addEventListener("WE_CHANGE", this.onInformationChanged);
        let _loc4_: TextParam = new TextParam(2);
        let _loc7_: TextPreset = param1.createText("${wiredfurni.params.variable_leaderboard.section.sorting}", _loc4_);
        let _loc14_: TextPreset = param1.createText("${wiredfurni.params.variable_leaderboard.entries_per_page}", _loc10_);
        _loc14_.width = Math.max(80, _loc14_.width) | 0;
        this._SafeStr_4682 = param1.createDropdown(new DropdownParam("", [], this.onSortChanged));
        let _loc5_: ExpandableDropdownOption[] = [];
        _loc13_ = 0;
        while (_loc13_ < VariableLeaderboardDescriptor._SafeStr_14138.length) {
            _loc5_.push(new ExpandableDropdownOption(_loc13_, String(VariableLeaderboardDescriptor._SafeStr_14138[_loc13_])));
            _loc13_++;
        }
        this._SafeStr_14536 = param1.createDropdown(new DropdownParam("", _loc5_, this.onPageSizeChanged, "", _loc14_.width));
        let _loc12_: SimpleListViewPreset = param1.createSimpleListView(true, [param1.createSimpleListView(false, [_loc7_, _loc14_]), param1.createSimpleListView(false, [this._SafeStr_4682, this._SafeStr_14536], true)]);
        _loc12_.spacing = 2;
        let _loc16_: WiredUIPreset = param1.createSimpleListView(true, [this._SafeStr_14532, param1.createSimpleListView(false, [_loc6_, this._SafeStr_14533], true), param1.createSimpleListView(false, [_loc15_, this._SafeStr_14534], true), _loc12_]);
        this._SafeStr_14535 = param1.createVariableLeaderboardColumnsPreset(this.onColumnsChanged);
        let _loc8_: WiredUIPreset = this.buildFilter(param1);
        this._SafeStr_14541 = param1.createVariableLeaderboardMultiVariablePreset(this.onDisplayOverridesChanged);
        this._SafeStr_14542 = param1.createVariableLeaderboardLocationPreset();
        param3.addElements(param1.createSection("${wiredfurni.params.variable_leaderboard.section.general}", _loc16_), param1.createSection("${wiredfurni.params.variable_leaderboard.section.columns}", this._SafeStr_14535), param1.createSection("${wiredfurni.params.variable_leaderboard.section.multi_variable}", this._SafeStr_14541, SectionParam.COLLAPSED), param1.createSection("${wiredfurni.params.variable_leaderboard.section.filter}", _loc8_, SectionParam.COLLAPSED), param1.createSection("${wiredfurni.params.variable_leaderboard.section.location}", this._SafeStr_14542));
    }

    private buildFilter(param1: PresetManager): WiredUIPreset {
        this._SafeStr_14538 = param1.createChooseVariableSection(-1, null, VariableLeaderboardAddon.isEligibleFilterVariable, this.onFilterVariableChanged, "${wiredfurni.params.variable_leaderboard.filter.variable}");
        this._SafeStr_14540 = param1.createValueOrVariableSection(0, [VariableExtraSourceTypes.GLOBAL_SOURCE], "${wiredfurni.params.variable_leaderboard.filter.operand}", -2147483648, 2147483647);
        this._SafeStr_14540.splitterVisible = false;
        this._SafeStr_14540.headerVisible = false;
        this._SafeStr_14539 = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variable_leaderboard.filter.compare}", 0, null, this._SafeStr_14540)], this.onComparisonEnabledChanged);
        let _loc2_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_14538, this._SafeStr_14539]);
        this._SafeStr_14537 = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variable_leaderboard.filter.enabled}", 0, null, _loc2_)], this.onFilterEnabledChanged);
        return this._SafeStr_14537;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: WiredContext = null;
        this._SafeStr_14542.endEdit();
        this.clearEditState();
        if (param1 != null) {
            _loc2_ = param1.wiredContext;
            if (_loc2_ != null) {
                this._context = _loc2_.variableLeaderboardContext;
                this._allVariables = _loc2_.roomVariablesList;
            }
            try {
                this._config = VariableLeaderboardConfigCodec.decodeParams(param1.intParams, param1.variableIds, param1.stringParam);
                if (this._context != null && param1.stringParam.length == 0) {
                    this._config.setLocation(new VariableLeaderboardLocation(this._context.physicalTileX, this._context.physicalTileY, 0, 0));
                }
            } catch ($e) {
                if ($e instanceof ArgumentError) {
                    let error: ArgumentError = $e;
                    this._SafeStr_14528 = true;
                } else {
                    throw $e;
                }
            }
        } else {
            this._SafeStr_14528 = true;
        }
        this.updateCapabilities();
        this.initializeForm();
    }

    public override onEditInitialized(): void {
        this._SafeStr_14538.onEditInitialized();
        this._SafeStr_14540.onEditInitialized();
        if (this._context == null || this._SafeStr_14528 || this._config == null) {
            return;
        }
        this._SafeStr_14542.beginEdit(this.roomEvents.variableLeaderboardController, this._context, this._config, this.onLocationChanged);
    }

    public override onEditEnd(): void {
        this._SafeStr_14542.endEdit();
        super.onEditEnd();
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any = this.currentEncodedConfig();
        return _loc1_ == null ? [] : (Array.isArray(_loc1_.intParams) ? _loc1_.intParams : null).concat();
    }

    public override readVariableIdsFromForm(): any[] {
        let _loc1_: any = this.currentEncodedConfig();
        return _loc1_ == null ? [] : (Array.isArray(_loc1_.variableIds) ? _loc1_.variableIds : null).concat();
    }

    public override readStringParamFromForm(): string {
        let _loc1_: any = this.currentEncodedConfig();
        return _loc1_ == null ? "" : typeof _loc1_.stringParam === "string" ? _loc1_.stringParam : null;
    }

    public override validate(): string {
        let _loc4_: string;
        if (this._SafeStr_14528 || this._config == null) {
            this._encodedConfig = null;
            return this.invalidConfigurationMessage();
        }
        if (this._context == null) {
            this._encodedConfig = null;
            return this.localizedError("wiredfurni.error.variable_leaderboard.missing_context", "Leaderboard information is unavailable. Close and reopen this Wired box.");
        }
        this.syncFilterFromForm();
        if (this._config.title.length < 1) {
            return this.localizedError("wiredfurni.error.variable_leaderboard.title_required", "Enter a leaderboard title.");
        }
        for (const _loc1_ of this._config.columns ?? []) {
            if (_loc1_.label.length < 2) {
                return this.localizedError("wiredfurni.error.variable_leaderboard.column_name_length", "Column names must contain at least two characters.");
            }
        }
        if (this._config.filterEnabled && VariableLeaderboardAddon.isNullVariableId(this._config.filterVariableId)) {
            return this.localizedError("wiredfurni.error.variable_leaderboard.filter_required", "Select a filtering variable.");
        }
        if (this._config.comparisonEnabled && this._config.operandKind == 1 && VariableLeaderboardAddon.isNullVariableId(this._config.globalOperandVariableId)) {
            return this.localizedError("wiredfurni.error.variable_leaderboard.global_operand_required", "Select a global comparison variable.");
        }
        try {
            this._encodedConfig = VariableLeaderboardConfigCodec.encode(this._config);
            return null;
        } catch ($e) {
            if ($e instanceof ArgumentError) {
                let error: ArgumentError = $e;
                this._encodedConfig = null;
                _loc4_ = this.invalidConfigurationMessage();
            } else {
                throw $e;
            }
        }
        return _loc4_;
    }

    private initializeForm(): void {
        this._SafeStr_4202 = true;
        let _loc1_: VariableLeaderboardConfig = this._config == null ? this.fallbackConfig() : this._config;
        this._SafeStr_14533.text = _loc1_.title;
        this._SafeStr_14534.text = _loc1_.description;
        this._SafeStr_14535.initialize(_loc1_.columns, this._SafeStr_14394);
        this.initializeSort(_loc1_.sortMode);
        this._SafeStr_14536.selectedId = _loc1_.pageSizeOption;
        this.initializeFilter(_loc1_);
        this.refreshGeneralWarning();
        this._SafeStr_14541.initialize(this._context, _loc1_);
        if (this._config != null) {
            this._config.setDisplayOverrides(this._SafeStr_14541.displayOverrides);
        }
        this._SafeStr_14542.initialize(_loc1_.location, this._context != null && !this._SafeStr_14528, this.published);
        this._SafeStr_4202 = false;
    }

    private refreshGeneralWarning(): void {
        let _loc1_: string = "";
        if (this._SafeStr_14528) {
            _loc1_ = "${wiredfurni.params.variable_leaderboard.warning.invalid_configuration}";
        } else if (this._context == null) {
            _loc1_ = "${wiredfurni.params.variable_leaderboard.warning.missing_context}";
        } else if (this._SafeStr_14530) {
            _loc1_ = "${wiredfurni.params.variable_leaderboard.warning.no_persistent_user}";
        } else if (this._SafeStr_14531) {
            _loc1_ = "${wiredfurni.params.variable_leaderboard.warning.too_many_choices}";
        }
        this._SafeStr_14532.text = _loc1_;
        this._SafeStr_14532.visible = _loc1_.length > 0;
    }

    private initializeSort(param1: number): void {
        this._SafeStr_4682.reinit(this.sortOptions(param1), param1);
    }

    private initializeFilter(param1: VariableLeaderboardConfig): void {
        this._SafeStr_14537._SafeStr_2119(0).selected = param1.filterEnabled;
        this._SafeStr_14539._SafeStr_2119(0).selected = param1.comparisonEnabled;
        let _loc2_: VariableListBase = this._allVariables == null ? VariableListBase._SafeStr_4649 : this._allVariables;
        this._SafeStr_14538.init(_loc2_, param1.filterVariableId, VariableTarget.USER);
        let _loc3_: number = param1.operandKind == 1 ? 1 : 0;
        let _loc4_: number = this.literalValueForForm(param1.literal);
        this._SafeStr_14540.init(_loc2_, param1.globalOperandVariableId, VariableExtraSourceTypes.GLOBAL_SOURCE, _loc3_, _loc4_);
        this.refreshFilterState();
    }

    private updateCapabilities(): void {
        let _loc1_: number = 0;
        this._SafeStr_14394 = false;
        if (this._context != null) {
            for (const _loc2_ of this._context.choices ?? []) {
                if (_loc2_.persistent) {
                    _loc1_++;
                    this._SafeStr_14394 ||= _loc2_.hasValue;
                }
            }
        }
        this._SafeStr_14530 = this._context != null && _loc1_ == 0;
        this._SafeStr_14531 = this._context != null && this._context.totalCandidateCount > 10;
    }

    private onInformationChanged = (param1: WindowEvent): void => {
        if (!this._SafeStr_4202 && this._config != null) {
            this._config.setInformation(this._SafeStr_14533.text, this._SafeStr_14534.text);
            this.configChanged();
        }
    };

    private onColumnsChanged = (param1: VariableLeaderboardColumn[]): void => {
        if (!this._SafeStr_4202 && this._config != null) {
            this._config.setColumns(param1);
            this.configChanged();
        }
    };

    private onSortChanged = (param1: ExpandableDropdownOption): void => {
        if (this._SafeStr_4202 || this._config == null || param1 == null) {
            return;
        }
        this._config.setSortMode(param1.id);
        this.configChanged();
        this._SafeStr_4202 = true;
        this.initializeSort(param1.id);
        this._SafeStr_4202 = false;
    };

    private onFilterEnabledChanged = (param1: number, param2: boolean): void => {
        if (!this._SafeStr_4202) {
            this.syncFilterFromForm();
            this.refreshFilterState();
        }
    };

    private onFilterVariableChanged = (param1: WiredVariable): void => {
        if (this._SafeStr_4202 || this._SafeStr_14529 || this._config == null) {
            return;
        }
        if (this._SafeStr_14539._SafeStr_2119(0).selected && (param1 == null || !param1.hasValue)) {
            this._SafeStr_4202 = true;
            this._SafeStr_14539._SafeStr_2119(0).selected = false;
            this._SafeStr_4202 = false;
        }
        this.syncFilterFromForm(param1?.variableId);
        this.refreshFilterState();
    };

    private onComparisonEnabledChanged = (param1: number, param2: boolean): void => {
        if (!this._SafeStr_4202) {
            this.syncFilterFromForm();
            this.refreshFilterState();
        }
    };

    private syncFilterFromForm(param1: string = null): void {
        let _loc4_: boolean = false;
        let _loc2_: string = null;
        let _loc5_: boolean = false;
        let _loc3_: string = null;
        if (this._SafeStr_14529 || this._config == null) {
            return;
        }
        this._SafeStr_14529 = true;
        try {
            _loc4_ = this._SafeStr_14537._SafeStr_2119(0).selected;
            if (!_loc4_) {
                this._config.setFilter(false, "0", false, 0, "0", "");
                this.configChanged();
                return;
            }
            _loc2_ = param1;
            if (_loc2_ == null) {
                _loc2_ = this._SafeStr_14538.finalizeSelection;
                if (VariableLeaderboardAddon.isNullVariableId(_loc2_) && !VariableLeaderboardAddon.isNullVariableId(this._config.filterVariableId)) {
                    _loc2_ = this._config.filterVariableId;
                }
            }
            _loc2_ = VariableLeaderboardAddon.canonicalVariableId(_loc2_);
            _loc5_ = this._SafeStr_14539._SafeStr_2119(0).selected;
            if (!_loc5_) {
                this._config.setFilter(true, _loc2_, false, 0, "0", "");
                this.configChanged();
                return;
            }
            if (this._SafeStr_14540.option == 1) {
                _loc3_ = VariableLeaderboardAddon.canonicalVariableId(this._SafeStr_14540.finalizeSelection);
                this._config.setFilter(true, _loc2_, true, 1, _loc3_, "");
            } else {
                this._config.setFilter(true, _loc2_, true, 0, "0", String(this._SafeStr_14540.numberValue));
            }
            this.configChanged();
        } finally {
            this._SafeStr_14529 = false;
        }
    }

    private refreshFilterState(): void {
        let _loc1_: boolean = this._SafeStr_14537._SafeStr_2119(0).selected;
        this._SafeStr_14537._SafeStr_2119(0).disabled = !_loc1_ && !this.hasEligibleFilterVariable();
        this._SafeStr_14537._SafeStr_2119(0).updateDisabledState();
        let _loc2_: boolean = this._SafeStr_14539._SafeStr_2119(0).selected;
        this._SafeStr_14539._SafeStr_2119(0).disabled = !_loc1_ || !_loc2_ && !this.selectedFilterHasValue();
        this._SafeStr_14539._SafeStr_2119(0).updateDisabledState();
    }

    private onPageSizeChanged = (param1: ExpandableDropdownOption): void => {
        if (!this._SafeStr_4202 && this._config != null && param1 != null) {
            this._config.setPageSizeOption(param1.id);
            this.configChanged();
        }
    };

    private onDisplayOverridesChanged = (param1: any): void => {
        if (!this._SafeStr_4202 && this._config != null) {
            this._config.setDisplayOverrides(param1);
            this.configChanged();
        }
    };

    private onLocationChanged = (param1: VariableLeaderboardLocation): void => {
        if (this._config == null || param1 == null) {
            return;
        }
        this._config.setLocation(param1);
        this._encodedConfig = null;
    };

    private sortOptions(param1: number): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        if (this._SafeStr_14394 || param1 == 0) {
            _loc2_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.variable_leaderboard.sort.highest_value}"));
        }
        if (this._SafeStr_14394 || param1 == 1) {
            _loc2_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.variable_leaderboard.sort.lowest_value}"));
        }
        _loc2_.push(new ExpandableDropdownOption(2, "${wiredfurni.params.variable_leaderboard.sort.oldest_creation}"));
        _loc2_.push(new ExpandableDropdownOption(3, "${wiredfurni.params.variable_leaderboard.sort.latest_creation}"));
        _loc2_.push(new ExpandableDropdownOption(4, "${wiredfurni.params.variable_leaderboard.sort.oldest_update}"));
        _loc2_.push(new ExpandableDropdownOption(5, "${wiredfurni.params.variable_leaderboard.sort.latest_update}"));
        return _loc2_;
    }

    private configChanged(): void {
        this._encodedConfig = null;
        this._SafeStr_14542.updateEditDraft(this._config);
    }

    private currentEncodedConfig(): any {
        if (this._SafeStr_14528 || this._context == null || this._config == null) {
            return null;
        }
        if (this._encodedConfig == null) {
            this.syncFilterFromForm();
            try {
                this._encodedConfig = VariableLeaderboardConfigCodec.encode(this._config);
            } catch ($e) {
                if ($e instanceof ArgumentError) {
                    let error: ArgumentError = $e;
                    return null;
                } else {
                    throw $e;
                }
            }
        }
        return this._encodedConfig;
    }

    private clearEditState(): void {
        this._context = null;
        this._allVariables = null;
        this._config = null;
        this._encodedConfig = null;
        this._SafeStr_14528 = false;
    }

    private fallbackConfig(): VariableLeaderboardConfig {
        return new VariableLeaderboardConfig("", "", Array.from([new VariableLeaderboardColumn(0, "Username", 3), new VariableLeaderboardColumn(1, "Value", 0)]), 0, false, "0", false, 0, "0", "", {}, new VariableLeaderboardLocation(0, 0, 0, 0));
    }

    private literalValueForForm(param1: string): number {
        if (param1.length == 0) {
            return 0;
        }
        let _loc2_: number = Number(param1);
        if (_loc2_ < -2147483648 || _loc2_ > 2147483647) {
            this._SafeStr_14528 = true;
            return 0;
        }
        return _loc2_ | 0;
    }

    private hasEligibleFilterVariable(): boolean {
        if (this._allVariables == null || this._allVariables.variables == null) {
            return false;
        }
        for (const _loc1_ of this._allVariables.variables ?? []) {
            if (_loc1_.variableTarget == VariableTarget.USER && VariableLeaderboardAddon.isEligibleFilterVariable(_loc1_)) {
                return true;
            }
        }
        return false;
    }

    private selectedFilterHasValue(): boolean {
        let _loc1_: WiredVariable = this._SafeStr_14538.selected;
        return _loc1_ != null && _loc1_.hasValue;
    }

    private get published(): boolean {
        return this._context != null && this._context.published;
    }

    private invalidConfigurationMessage(): string {
        return this.localizedError("wiredfurni.error.variable_leaderboard.invalid_configuration", "Invalid leaderboard configuration.");
    }

    private localizedError(param1: string, param2: string): string {
        return this.roomEvents.localization.getLocalization(param1, param2);
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override mergedSelections(): any[] {
        return [[0, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_14540.target = VariableExtraSourceTypes.GLOBAL_SOURCE;
    }

    public override getMergedType(param1: number): number {
        return VariableExtraSourceTypes.GLOBAL_SOURCE;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
