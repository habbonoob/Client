import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { InputSourceControlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/inputsources/InputSourceControlPreset';
import type { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { SplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SplitterPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ValueOrVariablePopupPreset extends WiredUIPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ValueOrVariablePopupPreset'); }

    private static readonly _SafeStr_14324: number = 16382457;

    private static readonly VARIABLE_SOURCE_TITLE: string = "${wiredfurni.params.sources.merged.title.variables}";

    declare private _SafeStr_14325: IWindow;

    declare private _variableFilter: (...args: any[]) => any;

    declare private _onChangeVariable: (...args: any[]) => any;

    declare private _SafeStr_14326: (...args: any[]) => any;

    declare private _targetTitle: string;

    declare private _SafeStr_14327: boolean;
    static { (this.prototype as any)._SafeStr_14327 = false; }

    declare private _SafeStr_14328: (...args: any[]) => any;

    declare private _SafeStr_14329: any[];

    declare private _SafeStr_14330: boolean;
    static { (this.prototype as any)._SafeStr_14330 = false; }

    declare private _SafeStr_14331: number;
    static { (this.prototype as any)._SafeStr_14331 = 0; }

    declare private _SafeStr_14332: boolean;
    static { (this.prototype as any)._SafeStr_14332 = false; }

    declare private _SafeStr_14333: boolean;
    static { (this.prototype as any)._SafeStr_14333 = false; }

    declare private _referenceSourceLocked: boolean;
    static { (this.prototype as any)._referenceSourceLocked = false; }

    declare private _picker: NewVariablePicker;

    declare private _SafeStr_14334: IItemListWindow;

    declare private _SafeStr_14335: SourceTypeSelectorPreset;

    declare private _SafeStr_14336: SectionPreset;

    declare private _SafeStr_14337: InputSourceControlPreset;

    declare private _SafeStr_14338: SectionPreset;

    declare private _SafeStr_14339: PaddedContainerPreset;

    declare private _SafeStr_14340: SplitterPreset;

    declare private _referenceVariableOnTargetGroup: CheckboxGroupPreset;

    declare private _SafeStr_14341: CheckboxOptionPreset;

    declare private _SafeStr_14342: PaddedContainerPreset;

    declare private _SafeStr_14343: SplitterPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: IWindow, param5: (...args: any[]) => any, param6: (...args: any[]) => any, param7: (...args: any[]) => any, param8: string = null, param9: boolean = false, param10: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._SafeStr_14325 = param4;
        this._variableFilter = param5;
        this._onChangeVariable = param6;
        this._SafeStr_14326 = param7;
        this._targetTitle = param8;
        this._SafeStr_14327 = param9;
        this._SafeStr_14328 = param10;
        this._SafeStr_14334 = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._SafeStr_14334.spacing = param3.genericVerticalSpacing;
        if (this._SafeStr_14327) {
            this._referenceVariableOnTargetGroup = param2.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variables.reference_value.same_holder}")], this.onReferenceVariableOnTargetChanged);
            this._SafeStr_14341 = this._referenceVariableOnTargetGroup._SafeStr_2119(0);
            this._SafeStr_14342 = param2.createPaddedContainerPreset(this._referenceVariableOnTargetGroup, param3.genericHorizontalSpacing, 0, param3.genericHorizontalSpacing, 0);
            this._SafeStr_14343 = param2.createSplitter();
            this._SafeStr_14334.addListItem(this._SafeStr_14342.window);
            this._SafeStr_14334.addListItem(this._SafeStr_14343.window);
        }
        this._picker = new NewVariablePicker(param1, asGuarded(param2.createLayout("search_tree_dropdown"), isIWindowContainer), param5, this.onVariableChanged, param3);
        this._picker.configureExternalPopup(param4, this._SafeStr_14334, false);
    }

    private static isEffectivelyAvailable(param1: IWindow): boolean {
        let _loc2_: IWindow = param1;
        while (_loc2_ != null) {
            if (!_loc2_.visible || !_loc2_.isEnabled()) {
                return false;
            }
            if (isIDesktopWindow(_loc2_)) {
                return true;
            }
            _loc2_ = _loc2_.parent;
        }
        return false;
    }

    public init(param1: VariableListBase, param2: string, param3: number): void {
        this._SafeStr_14330 = true;
        try {
            this._SafeStr_14331 = param3;
            this._picker.init(param1, param2, param3);
            if (this._SafeStr_14335 != null) {
                this._SafeStr_14335.select(param3);
            }
        } finally {
            this._SafeStr_14330 = false;
        }
        this.refreshSourceVisibility();
    }

    public reinitTargets(param1: any[], param2: number): void {
        this._SafeStr_14330 = true;
        try {
            this._SafeStr_14331 = param2;
            this._SafeStr_14329 = param1 == null ? [] : param1.concat();
            this.refreshTargetSelector(param2);
            this._picker.variableTarget = param2;
        } finally {
            this._SafeStr_14330 = false;
        }
        this.resizeHeader();
        this.refreshSourceVisibility();
    }

    public attachInputSource(param1: string, param2: InputSourceControlPreset): void {
        if (this._SafeStr_14338 != null) {
            return;
        }
        this._SafeStr_14337 = param2;
        let _loc3_: SectionParam = new SectionParam();
        _loc3_.titleTextColor = this._SafeStr_2144.softTextColor;
        for (const _loc5_ of param2.dualPickHeaderOptions ?? []) {
            _loc3_.addHeaderOption(_loc5_);
        }
        let _loc4_: WiredUIPreset = param2.staticHeight(this._SafeStr_2144.inputSourceListMinHeight + 2 * this._SafeStr_2144.LRContainerTopBottomPadding);
        this._SafeStr_14338 = this._presetManager.createSection("${wiredfurni.params.sources.merged.title.variables}", _loc4_, _loc3_);
        this._SafeStr_14337.layoutRefreshCallback = this._SafeStr_14338.refreshAlignments;
        this._SafeStr_14338.splitterVisible = false;
        this._SafeStr_14339 = this._presetManager.createPaddedContainerPreset(this._SafeStr_14338, this._SafeStr_2144.genericHorizontalSpacing, this._SafeStr_2144.genericVerticalSpacing, this._SafeStr_2144.genericHorizontalSpacing, 0);
        this._SafeStr_14340 = this._presetManager.createSplitter();
        this._SafeStr_14334.addListItemAt(this._SafeStr_14339.window, 0);
        this._SafeStr_14334.addListItemAt(this._SafeStr_14340.window, 1);
        this.refreshTargetSelector(this._SafeStr_14331);
        this.applyReferenceVariableOnTargetState();
        this.resizeHeader();
        this.refreshSourceVisibility();
    }

    public updateReferenceVariableOnTargetState(param1: boolean, param2: boolean, param3: boolean): void {
        if (!this._SafeStr_14327) {
            return;
        }
        this._SafeStr_14332 = param1;
        this._SafeStr_14333 = param2;
        this._referenceSourceLocked = param3;
        this.applyReferenceVariableOnTargetState();
    }

    public syncTarget(param1: number): void {
        this._SafeStr_14330 = true;
        try {
            this._SafeStr_14331 = param1;
            if (this._SafeStr_14335 != null) {
                this._SafeStr_14335.select(param1);
            }
            this._picker.variableTarget = param1;
        } finally {
            this._SafeStr_14330 = false;
        }
        this.refreshSourceVisibility();
    }

    public refreshSourceVisibility(): void {
        if (!ValueOrVariablePopupPreset.isEffectivelyAvailable(this._SafeStr_14325)) {
            this._picker.hideExpanded();
            return;
        }
        if (this._SafeStr_14338 != null) {
            this._SafeStr_14338.visible = true;
        }
        this.applyReferenceVariableOnTargetState();
    }

    public toggle(): void {
        this.refreshSourceVisibility();
        if (ValueOrVariablePopupPreset.isEffectivelyAvailable(this._SafeStr_14325)) {
            this.resizeHeader();
            this._picker.toggleExpanded();
        }
    }

    public hide(): void {
        this._picker.hideExpanded();
    }

    public get selected(): WiredVariable {
        return this._picker.selected;
    }

    public get eligibleVariables(): WiredVariable[] {
        let _loc1_: WiredVariable[] = [];
        if (this._picker.filteredVariables == null) {
            return _loc1_;
        }
        for (const _loc2_ of this._picker.filteredVariables ?? []) {
            if (this._variableFilter == null || this._variableFilter(_loc2_)) {
                _loc1_.push(_loc2_);
            }
        }
        return _loc1_;
    }

    public selectSilently(param1: WiredVariable): void {
        this._SafeStr_14330 = true;
        try {
            this._picker.select(param1, true);
        } finally {
            this._SafeStr_14330 = false;
        }
    }

    public get finalizeSelection(): string {
        let _loc1_: WiredVariable = this.selected;
        this._picker.finalize();
        return _loc1_?.variableId;
    }

    public set sourceType(param1: number) {
        if (this._SafeStr_14330 || this._referenceSourceLocked || param1 == this._SafeStr_14331) {
            return;
        }
        this._SafeStr_14331 = param1;
        if (this._SafeStr_14326 != null) {
            this._SafeStr_14326(param1);
        }
        this._SafeStr_14330 = true;
        try {
            this._picker.variableTarget = param1;
        } finally {
            this._SafeStr_14330 = false;
        }
        this.refreshSourceVisibility();
        if (this._onChangeVariable != null) {
            this._onChangeVariable(this._picker.selected, false);
        }
    }

    private onVariableChanged = (param1: WiredVariable): void => {
        if (this._SafeStr_14330) {
            return;
        }
        if (this._onChangeVariable != null) {
            this._onChangeVariable(param1, true);
        }
        if (param1 != null) {
            this._picker.hideExpanded();
        }
    };

    private onReferenceVariableOnTargetChanged = (param1: number, param2: boolean): void => {
        if (this._SafeStr_14330 || this._SafeStr_14328 == null) {
            return;
        }
        this._SafeStr_14328(param2);
    };

    private applyReferenceVariableOnTargetState(): void {
        if (!this._SafeStr_14327) {
            return;
        }
        let _loc1_: boolean = this._SafeStr_14330;
        this._SafeStr_14330 = true;
        try {
            this._SafeStr_14341.selected = this._SafeStr_14332;
        } finally {
            this._SafeStr_14330 = _loc1_;
        }
        this._referenceVariableOnTargetGroup.disabled = !this._SafeStr_14333;
        if (this._SafeStr_14335 != null) {
            this._SafeStr_14335.disabled = this._referenceSourceLocked;
        }
        if (this._SafeStr_14338 != null) {
            this._SafeStr_14338.visible = true;
            this._SafeStr_14338.disabled = this._referenceSourceLocked;
        }
    }

    private refreshTargetSelector(param1: number): void {
        let _loc2_: boolean = this._targetTitle != null && this._SafeStr_14329 != null && this._SafeStr_14329.length > 1;
        if (this._SafeStr_14338 != null) {
            if (this._SafeStr_14336 != null) {
                this.removeTargetSection();
            }
            if (!_loc2_) {
                if (this._SafeStr_14335 != null) {
                    this._SafeStr_14335.visible = false;
                }
                this.applyReferenceVariableOnTargetState();
                return;
            }
            if (this._SafeStr_14335 == null) {
                this._SafeStr_14335 = this._presetManager.createSourceTypeSelector(new SourceTypeSelectorParam(this._SafeStr_14329, this, param1));
                this._SafeStr_14338.addHeaderOption(this._SafeStr_14335);
            } else {
                this._SafeStr_14335.reinit(this._SafeStr_14329, param1);
            }
            this._SafeStr_14335.visible = true;
            this.applyReferenceVariableOnTargetState();
            return;
        }
        if (!_loc2_) {
            this.removeTargetSection();
            return;
        }
        if (this._SafeStr_14336 == null) {
            this._SafeStr_14335 = this._presetManager.createSourceTypeSelector(new SourceTypeSelectorParam(this._SafeStr_14329, this, param1));
            this._SafeStr_14336 = this._presetManager.createSection(this._targetTitle, this._SafeStr_14335);
            this._SafeStr_14336.splitterVisible = false;
            this._SafeStr_14334.addListItemAt(this._SafeStr_14336.window, 0);
        } else {
            this._SafeStr_14335.reinit(this._SafeStr_14329, param1);
        }
        this.applyReferenceVariableOnTargetState();
    }

    private removeTargetSection(): void {
        if (this._SafeStr_14336 == null) {
            return;
        }
        this._SafeStr_14334.removeListItem(this._SafeStr_14336.window);
        this._SafeStr_14336.dispose();
        this._SafeStr_14336 = null;
        this._SafeStr_14335 = null;
    }

    private resizeHeader(): void {
        this._SafeStr_14334.width = this._SafeStr_14325.width;
        if (this._SafeStr_14336 != null) {
            this._SafeStr_14336.resizeToWidth(this._SafeStr_14325.width);
        }
        if (this._SafeStr_14339 != null) {
            this._SafeStr_14339.resizeToWidth(this._SafeStr_14325.width);
            this._SafeStr_14340.resizeToWidth(this._SafeStr_14325.width);
        }
        if (this._SafeStr_14342 != null) {
            this._SafeStr_14342.resizeToWidth(this._SafeStr_14325.width);
            this._SafeStr_14343.resizeToWidth(this._SafeStr_14325.width);
        }
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._picker.width = param1;
        this.resizeHeader();
    }

    public override get window(): IWindow {
        return this._picker.window;
    }

    protected override get childPresets(): any[] {
        let _loc1_: any[] = [];
        if (this._SafeStr_14336 != null) {
            _loc1_.push(this._SafeStr_14336);
        }
        if (this._SafeStr_14339 != null) {
            _loc1_.push(this._SafeStr_14339);
        }
        if (this._SafeStr_14340 != null) {
            _loc1_.push(this._SafeStr_14340);
        }
        if (this._SafeStr_14342 != null) {
            _loc1_.push(this._SafeStr_14342);
        }
        if (this._SafeStr_14343 != null) {
            _loc1_.push(this._SafeStr_14343);
        }
        return _loc1_;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        if (this._SafeStr_14337 != null) {
            this._SafeStr_14337.layoutRefreshCallback = null;
        }
        this._picker.dispose();
        this._picker = null;
        super.dispose();
        this._SafeStr_14334.dispose();
        this._SafeStr_14325 = null;
        this._variableFilter = null;
        this._onChangeVariable = null;
        this._SafeStr_14326 = null;
        this._SafeStr_14328 = null;
        this._targetTitle = null;
        this._SafeStr_14329 = null;
        this._SafeStr_14334 = null;
        this._SafeStr_14335 = null;
        this._SafeStr_14336 = null;
        this._SafeStr_14337 = null;
        this._SafeStr_14338 = null;
        this._SafeStr_14339 = null;
        this._SafeStr_14340 = null;
        this._referenceVariableOnTargetGroup = null;
        this._SafeStr_14341 = null;
        this._SafeStr_14342 = null;
        this._SafeStr_14343 = null;
    }
}
