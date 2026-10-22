import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { InputSourceControlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/inputsources/InputSourceControlPreset';
import type { ValueOrVariableInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ValueOrVariableInputPreset';
import type { ValueOrVariablePopupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ValueOrVariablePopupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { _SafeCls_6086 } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/_SafeCls_6086';
import { IInputSourceClaimOwner } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IInputSourceClaimOwner';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ValueOrVariableSection extends AbstractSectionPreset implements SourceTypePickedListener, IInputSourceClaimOwner, _SafeCls_6086 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::ValueOrVariableSection'); }

    public static readonly OPTION_LITERAL: number = 0;
    public static readonly _SafeStr_14351: number = 1;
    private static readonly NO_LEGACY_TARGET: number = -2147483648;
    private static readonly NO_PRIMARY_TARGET: number = -2147483648;
    private static readonly DECIMAL_PATTERN: RegExp = /^-?\d+$/;
    private static readonly _SafeStr_14352: RegExp = /^0x[0-9a-fA-F]+$/;
    private static readonly BINARY_PATTERN: RegExp = /^0b[01]+$/;

    declare private _input: ValueOrVariableInputPreset;

    declare private _popup: ValueOrVariablePopupPreset;

    declare private _SafeStr_5623: number;
    static { (this.prototype as any)._SafeStr_5623 = 0; }

    private _option: number = 0;

    declare private _SafeStr_14353: number;
    static { (this.prototype as any)._SafeStr_14353 = 0; }

    declare private _selectedVariable: WiredVariable;

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    declare private _SafeStr_14354: any[];

    declare private _SafeStr_14355: any[];

    private _SafeStr_14356: number = -2147483648;

    declare private _SafeStr_14327: boolean;
    static { (this.prototype as any)._SafeStr_14327 = false; }

    declare private _SafeStr_14332: boolean;
    static { (this.prototype as any)._SafeStr_14332 = false; }

    declare private _SafeStr_14357: boolean;
    static { (this.prototype as any)._SafeStr_14357 = false; }

    private _SafeStr_14358: number = -2147483648;
    private _SafeStr_14359: number = -2147483648;

    declare private _min: number;
    static { (this.prototype as any)._min = 0; }

    declare private _SafeStr_4035: number;
    static { (this.prototype as any)._SafeStr_4035 = 0; }

    private _valid: boolean = true;

    declare private _ambiguous: boolean;
    static { (this.prototype as any)._ambiguous = false; }

    declare private _sourcePreset: boolean;
    static { (this.prototype as any)._sourcePreset = false; }

    declare private _SafeStr_14360: boolean;
    static { (this.prototype as any)._SafeStr_14360 = false; }

    declare private _variableFilter: (...args: any[]) => any;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: any[], param6: string, param7: number, param8: number, param9: boolean = false, param10: number = -1, param11: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._SafeStr_5623 = param4;
        this._SafeStr_14327 = param9;
        this._SafeStr_14354 = param5 == null ? [] : param5.concat();
        this._SafeStr_14355 = this._SafeStr_14354.concat();
        this._min = param7;
        this._SafeStr_4035 = param8;
        this._variableFilter = param11;
        this._input = param2.createValueOrVariableInput(this.onVariableIconClicked, param10 == 0 ? -1 : param10);
        this._popup = param2.createValueOrVariablePopup(this._input.anchorWindow, this.variableSelectionFilter, this.onPopupVariableChanged, this.onPopupTargetChanged, this.l("variables.reference_value.target"), param9, this.onReferenceVariableOnTargetChanged);
        this._input.addTextChangeListener(this.onInputTextChanged);
        if (param10 < 0) {
            this.initializeSection(param6, this._input);
        }
    }

    private static isNumericText(param1: string): boolean {
        return ValueOrVariableSection.DECIMAL_PATTERN.test(param1) || Boolean(ValueOrVariableSection._SafeStr_14352.test(param1)) || Boolean(ValueOrVariableSection.BINARY_PATTERN.test(param1));
    }

    private static parseNumericText(param1: string): number {
        if (ValueOrVariableSection._SafeStr_14352.test(param1)) {
            return parseInt(param1.substr(2), 16);
        }
        if (ValueOrVariableSection.BINARY_PATTERN.test(param1)) {
            return parseInt(param1.substr(2), 2);
        }
        return Number(param1);
    }

    public override get window(): IWindow {
        return this._SafeStr_2848 == null ? this._input.window : super.window;
    }

    public override resizeToWidth(param1: number): void {
        if (this._SafeStr_2848 == null) {
            this._input.resizeToWidth(param1);
        } else {
            super.resizeToWidth(param1);
        }
    }

    public override hasStaticWidth(): boolean {
        return this._SafeStr_2848 == null && this._input.hasStaticWidth();
    }

    public override get staticWidth(): number {
        return this._SafeStr_2848 == null ? this._input.staticWidth : super.staticWidth;
    }

    public init(param1: VariableListBase, param2: string, param3: number, param4: number, param5: number, param6: number = -2147483648, param7: boolean = false): void {
        this._sourcePreset = true;
        try {
            this._variableTarget = param3;
            this._SafeStr_14359 = param3;
            this._SafeStr_14358 = param6;
            this._SafeStr_14332 = param7;
            this._SafeStr_14357 = false;
            this._option = param4 == 1 ? 1 : 0;
            this._SafeStr_14353 = param5;
            this._valid = true;
            this._ambiguous = false;
            this.reinitializeTargetOptions(param3);
            this._popup.init(param1, param2, param3);
            this._selectedVariable = this._popup.selected;
            this._valid = this._option == 0 || this._selectedVariable != null && this.variableSelectionFilter(this._selectedVariable);
            this._input.setTextSilently(this._option == 1 ? this._selectedVariable?.variableName : String(param5));
            this._input.setInvalid(null);
            this.updateReferenceVariableOnTargetState(false);
            this.updateTargetIndicator();
        } finally {
            this._sourcePreset = false;
        }
        this.refreshClaimedSourceVisibility();
    }

    public onEditInitialized(): void {
        this._sourcePreset = true;
        try {
            this.updateReferenceVariableOnTargetState(false);
            this._popup.syncTarget(this._variableTarget);
            this._selectedVariable = this._popup.selected;
            this.updateTargetIndicator();
        } finally {
            this._sourcePreset = false;
        }
        this.refreshClaimedSourceVisibility();
    }

    public set target(param1: number) {
        if (this._SafeStr_14357) {
            this.applyVariableTarget(this._SafeStr_14358, true);
            this.refreshClaimedSourceVisibility();
            return;
        }
        if (this._variableTarget == param1) {
            this._popup.syncTarget(param1);
            this.refreshClaimedSourceVisibility();
            return;
        }
        this._sourcePreset = true;
        try {
            this._SafeStr_14359 = param1;
            this.applyVariableTarget(param1, false);
        } finally {
            this._sourcePreset = false;
        }
        this.updateReferenceVariableOnTargetState();
        this.refreshClaimedSourceVisibility();
    }

    public get target(): number {
        return this._variableTarget;
    }

    public set primaryTarget(param1: number) {
        if (this._SafeStr_14358 == param1) {
            this.updateReferenceVariableOnTargetState();
            return;
        }
        this._SafeStr_14358 = param1;
        this.updateReferenceVariableOnTargetState();
    }

    public get referenceVariableOnTarget(): boolean {
        return this._SafeStr_14357;
    }

    public get option(): number {
        return this._option;
    }

    public get numberValue(): number {
        return this._SafeStr_14353;
    }

    public get selected(): WiredVariable {
        return this._selectedVariable;
    }

    public get isEmpty(): boolean {
        return this._input.text.length == 0;
    }

    public set text(param1: string) {
        this._input.text = param1;
    }

    public get variableOnlyOrEmpty(): boolean {
        return this._SafeStr_14360;
    }

    public set variableOnlyOrEmpty(param1: boolean) {
        this._SafeStr_14360 = param1;
        this.updateInvalidState();
    }

    public get finalizeSelection(): string {
        if (this._SafeStr_14360 && this.isEmpty) {
            this._selectedVariable = null;
            this._popup.selectSilently(null);
        }
        return this._popup.finalizeSelection;
    }

    public isSourcePickingDisabled(): boolean {
        return !this.validationActive;
    }

    public get claimedBaseSourceType(): number {
        return WiredInputSourcePicker.MERGED_SOURCE;
    }

    public get claimedSourceId(): number {
        return this._SafeStr_5623;
    }

    public attachInputSourceControl(param1: string, param2: InputSourceControlPreset): void {
        this._popup.attachInputSource(param1, param2);
        this.refreshClaimedSourceVisibility();
    }

    public syncClaimedSourceType(param1: number): void {
        this.target = param1;
    }

    public refreshClaimedSourceVisibility(): void {
        this._popup.refreshSourceVisibility();
        this.updateInvalidState();
    }

    public get validationActive(): boolean {
        if (this.disposed || this.window == null) {
            return false;
        }
        let _loc1_: IWindow = this.window;
        while (_loc1_ != null) {
            if (!_loc1_.visible || !_loc1_.isEnabled()) {
                return false;
            }
            if (isIDesktopWindow(_loc1_)) {
                return true;
            }
            _loc1_ = _loc1_.parent;
        }
        return false;
    }

    public get validationError(): string {
        return this.validationActive ? this.currentValidationError : null;
    }

    public hideDetachedWindows(): void {
        this._popup.hide();
    }

    public set sourceType(param1: number) {
        if (!this._sourcePreset) {
            this._roomEvents.wiredCtrl.setMergedSourceType(this._SafeStr_5623, param1);
        }
    }

    private onVariableIconClicked = (): void => {
        this._popup.toggle();
    };

    private onInputTextChanged = (param1: string): void => {
        let _loc2_: number = NaN;
        let _loc3_: any = undefined;
        if (this._sourcePreset) {
            return;
        }
        this._ambiguous = false;
        if (ValueOrVariableSection.isNumericText(param1)) {
            this._option = 0;
            _loc2_ = ValueOrVariableSection.parseNumericText(param1);
            this._valid = !isNaN(_loc2_) && _loc2_ == Math.floor(_loc2_) && _loc2_ >= -2147483648 && _loc2_ <= 2147483647 && _loc2_ >= this._min && _loc2_ <= this._SafeStr_4035;
            if (this._valid) {
                this._SafeStr_14353 = _loc2_ | 0;
            }
        } else if (param1 == "-" || param1 == "+") {
            this._option = 0;
            this._valid = false;
        } else {
            this._option = 1;
            this.updateReferenceVariableOnTargetState();
            _loc3_ = this.variablesNamed(param1);
            this._ambiguous = _loc3_.length > 1;
            this._valid = _loc3_.length == 1;
            if (this._valid) {
                this._selectedVariable = _loc3_[0];
                this._popup.selectSilently(this._selectedVariable);
            } else if (this._SafeStr_14360 && param1.length == 0) {
                this._selectedVariable = null;
                this._popup.selectSilently(null);
            }
            this._input.setTextSilently(param1);
        }
        if (this._option == 0) {
            this.updateReferenceVariableOnTargetState();
        }
        this.updateTargetIndicator();
        this.updateInvalidState();
        this.refreshClaimedSourceVisibility();
    };

    private onPopupVariableChanged = (param1: WiredVariable, param2: boolean): void => {
        if (this._sourcePreset) {
            return;
        }
        this._selectedVariable = param1;
        if (param2) {
            this._option = 1;
        }
        this.updateReferenceVariableOnTargetState();
        if (this._option == 1) {
            this._selectedVariable = this._popup.selected;
            this._input.setTextSilently(this._selectedVariable?.variableName);
            this._valid = this._selectedVariable != null && this.variableSelectionFilter(this._selectedVariable);
            this._ambiguous = false;
        }
        this.updateTargetIndicator();
        this.updateInvalidState();
        this.refreshClaimedSourceVisibility();
    };

    private onPopupTargetChanged = (param1: number): void => {
        this.sourceType = param1;
    };

    private onReferenceVariableOnTargetChanged = (param1: boolean): void => {
        if (this._sourcePreset) {
            return;
        }
        this._SafeStr_14332 = param1;
        this.onPopupVariableChanged(this._popup.selected, param1);
    };

    private updateReferenceVariableOnTargetState(param1: boolean = true): void {
        if (!this._SafeStr_14327) {
            return;
        }
        let _loc5_: boolean = this._SafeStr_14357;
        let _loc3_: number = this._variableTarget;
        let _loc4_: boolean = this.isPrimaryTargetEligible && this._variableTarget == this._SafeStr_14358;
        let _loc2_: boolean = this._option == 1 && this._SafeStr_14332 && _loc4_;
        if (_loc2_) {
            if (!_loc5_) {
                this._SafeStr_14359 = this._variableTarget;
            }
            this.applyVariableTarget(this._SafeStr_14358, true);
        } else if (_loc5_) {
            this.applyVariableTarget(this._SafeStr_14359, true);
        }
        this._SafeStr_14357 = _loc2_;
        this._popup.updateReferenceVariableOnTargetState(this._SafeStr_14332, _loc4_, _loc2_);
        if (param1 && !this._sourcePreset && (_loc5_ != _loc2_ || _loc2_ && _loc3_ != this._variableTarget)) {
            this._roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, this._SafeStr_5623);
        }
    }

    private get isPrimaryTargetEligible(): boolean {
        return this._SafeStr_14358 == WiredInputSourcePicker._SafeStr_2178 || this._SafeStr_14358 == WiredInputSourcePicker.USER_SOURCE;
    }

    private applyVariableTarget(param1: number, param2: boolean): boolean {
        if (this._variableTarget == param1) {
            this._popup.syncTarget(param1);
            return false;
        }
        this._variableTarget = param1;
        if (param2) {
            if (this._SafeStr_14355.indexOf(param1) == -1) {
                this.reinitializeTargetsPreservingIndependentTarget(param1);
            } else {
                this._popup.syncTarget(param1);
            }
        } else if (this._SafeStr_14356 != -2147483648 && param1 != this._SafeStr_14356) {
            this._SafeStr_14356 = -2147483648;
            this._SafeStr_14355 = this._SafeStr_14354.concat();
            this._popup.reinitTargets(this._SafeStr_14355, param1);
        } else {
            this._popup.syncTarget(param1);
        }
        this._selectedVariable = this._popup.selected;
        if (this._option == 1) {
            this._input.setTextSilently(this._selectedVariable?.variableName);
            this._valid = this._selectedVariable != null && this.variableSelectionFilter(this._selectedVariable);
            this._ambiguous = false;
        }
        this.updateTargetIndicator();
        this.updateInvalidState();
        return true;
    }

    private reinitializeTargetsPreservingIndependentTarget(param1: number): void {
        this._SafeStr_14355 = this._SafeStr_14354.concat();
        this._SafeStr_14356 = -2147483648;
        if (this._SafeStr_14359 != -2147483648 && this._SafeStr_14355.indexOf(this._SafeStr_14359) == -1) {
            this._SafeStr_14355.push(this._SafeStr_14359);
            this._SafeStr_14356 = this._SafeStr_14359;
        }
        if (this._SafeStr_14355.indexOf(param1) == -1) {
            this._SafeStr_14355.push(param1);
            if (this._SafeStr_14356 == -2147483648) {
                this._SafeStr_14356 = param1;
            }
        }
        this._popup.reinitTargets(this._SafeStr_14355, param1);
    }

    private reinitializeTargetOptions(param1: number): void {
        this._SafeStr_14355 = this._SafeStr_14354.concat();
        this._SafeStr_14356 = -2147483648;
        if (this._SafeStr_14355.indexOf(param1) == -1) {
            this._SafeStr_14355.push(param1);
            this._SafeStr_14356 = param1;
        }
        this._popup.reinitTargets(this._SafeStr_14355, param1);
    }

    private updateTargetIndicator(): void {
        this._input.setTargetIndicator(this._variableTarget, this._option == 1 && this._SafeStr_14355.length > 1);
    }

    private updateInvalidState(): void {
        this._input.setInvalid(this.validationError);
    }

    private get currentValidationError(): string {
        let _loc1_: boolean = this._valid && (this._option != 1 || this._selectedVariable != null && this.variableSelectionFilter(this._selectedVariable));
        if (this._SafeStr_14360) {
            if (this.isEmpty || _loc1_ && this._option == 1) {
                return null;
            }
            return this._roomEvents.localization.getLocalization("wiredfurni.params.variables.reference_value.variable_or_empty", "Select an available variable or leave this field empty.");
        }
        if (_loc1_) {
            return null;
        }
        let _loc3_: string = this._ambiguous ? "wiredfurni.params.variables.reference_value.ambiguous" : "wiredfurni.params.variables.reference_value.invalid";
        let _loc2_: string = this._ambiguous ? "More than one variable has this name." : "Enter a valid whole number or variable name.";
        return this._roomEvents.localization.getLocalization(_loc3_, _loc2_);
    }

    private variablesNamed(param1: string): WiredVariable[] {
        let _loc4_: WiredVariable[] = [];
        let _loc2_: string = param1.toLowerCase();
        for (const _loc3_ of this._popup.eligibleVariables ?? []) {
            if (_loc3_.variableName.toLowerCase() == _loc2_) {
                _loc4_.push(_loc3_);
            }
        }
        return _loc4_;
    }

    private variableSelectionFilter = (param1: WiredVariable): boolean => {
        return !!(param1.hasValue && (this._variableFilter == null || this._variableFilter(param1)));
    };

    protected override get childPresets(): any[] {
        return this._SafeStr_2848 == null ? [this._input, this._popup] : super.childPresets.concat([this._popup]);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._input = null;
        this._popup = null;
        this._selectedVariable = null;
        this._variableFilter = null;
        this._SafeStr_14354 = null;
        this._SafeStr_14355 = null;
        this._SafeStr_14332 = false;
        this._SafeStr_14357 = false;
    }

    get [IInputSourceClaimOwner](): true {
        return true;
    }

    get [_SafeCls_6086](): true {
        return true;
    }
}
