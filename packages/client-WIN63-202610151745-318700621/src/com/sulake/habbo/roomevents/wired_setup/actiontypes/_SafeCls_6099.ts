import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ColorPalettePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ColorPalettePreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class _SafeCls_6099 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6099'); }

    private static readonly AUDIENCE_SELECTED_USERS: number = 0;
    private static readonly AUDIENCE_EVERYONE: number = 1;
    private static readonly HIGHLIGHT_COLORS: number[] = Array.from([16777215, 16772910, 16758528, 16747008, 16734774, 16724016, 16724855, 16733627, 15741144, 12076287, 7883007, 4611327, 2395391, 2146303, 2156016, 1628592, 2149480, 5300272, 10546464, 16557530, 12291417]);

    declare private _SafeStr_14428: DropdownPreset;

    declare private _SafeStr_14429: boolean;
    static { (this.prototype as any)._SafeStr_14429 = false; }

    declare private _targetUsers: boolean;
    static { (this.prototype as any)._targetUsers = false; }

    declare private _highlightTypePicker: DropdownPreset;

    declare private _highlightWarning: TextPreset;

    declare private _SafeStr_14446: DropdownPreset;

    declare private _SafeStr_14447: ColorPalettePreset;

    declare private _SafeStr_14448: ColorPalettePreset;

    declare private _SafeStr_14449: ColorPalettePreset;

    declare private _SafeStr_14450: SectionPreset;

    declare private _SafeStr_14451: DropdownPreset;

    declare private _SafeStr_14432: DropdownPreset;

    declare private _SafeStr_14452: SectionPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.SET_FURNI_HIGHLIGHT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_14428 = param1.createDropdown(new DropdownParam("${wiredfurni.params.furni_visualization.audience}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.furni_visualization.audience.selected_users}"), new ExpandableDropdownOption(1, "${wiredfurni.params.furni_visualization.audience.everyone}")]), this.onAudienceChanged));
        let _loc7_: SectionPreset = param1.createSection("${wiredfurni.params.furni_visualization.audience}", this._SafeStr_14428);
        this._highlightTypePicker = param1.createDropdown(new DropdownParam("${wiredfurni.params.set_furni_highlight.type}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_highlight.type.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.set_furni_highlight.type.1}"), new ExpandableDropdownOption(2, "${wiredfurni.params.set_furni_highlight.type.2}"), new ExpandableDropdownOption(3, "${wiredfurni.params.set_furni_highlight.type.3}"), new ExpandableDropdownOption(4, "${wiredfurni.params.set_furni_highlight.type.4}"), new ExpandableDropdownOption(5, "${wiredfurni.params.set_furni_highlight.type.5}")]), this.onHighlightTypeChanged));
        let _loc6_: TextParam = new TextParam(1);
        _loc6_.textColor = param2.warningTextColor;
        this._highlightWarning = param1.createText("${wiredfurni.params.set_furni_highlight.normal_furni_warning}", _loc6_);
        this._highlightWarning.visible = false;
        let _loc8_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_highlight.type}", param1.createSimpleListView(true, [this._highlightTypePicker, this._highlightWarning]));
        this._SafeStr_14446 = param1.createDropdown(new DropdownParam("${wiredfurni.params.set_furni_highlight.strength}"));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_highlight.strength}", this._SafeStr_14446);
        this._SafeStr_14448 = param1.createColorPalette(_SafeCls_6099.HIGHLIGHT_COLORS);
        this._SafeStr_14449 = param1.createColorPalette(_SafeCls_6099.HIGHLIGHT_COLORS.slice(1));
        this._SafeStr_14447 = this._SafeStr_14448;
        this._SafeStr_14450 = param1.createSection("${wiredfurni.params.set_furni_highlight.color}", param1.createSimpleListView(true, [this._SafeStr_14448, this._SafeStr_14449]));
        this._SafeStr_14451 = param1.createDropdown(new DropdownParam("${wiredfurni.params.set_furni_highlight.animation}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_highlight.animation.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.set_furni_highlight.animation.1}")]), this.onAnimationChanged));
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_highlight.animation}", this._SafeStr_14451);
        this._SafeStr_14432 = param1.createDropdown(new DropdownParam("${wiredfurni.params.set_furni_highlight.easing}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_highlight.easing.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.set_furni_highlight.easing.1}"), new ExpandableDropdownOption(2, "${wiredfurni.params.set_furni_highlight.easing.2}"), new ExpandableDropdownOption(3, "${wiredfurni.params.set_furni_highlight.easing.3}"), new ExpandableDropdownOption(4, "${wiredfurni.params.set_furni_highlight.easing.4}")])));
        this._SafeStr_14452 = param1.createSection("${wiredfurni.params.set_furni_highlight.easing}", this._SafeStr_14432);
        this._SafeStr_14452.disabled = true;
        param3.addElements(_loc7_, _loc8_, _loc4_, this._SafeStr_14450, _loc5_, this._SafeStr_14452);
    }

    public override onEditStart(param1: Triggerable): void {
        this._targetUsers = param1.getBoolean(6);
        let _loc2_: boolean = param1.getBoolean(0);
        if (_loc2_) {
            this._SafeStr_14429 = true;
        }
        this._SafeStr_14428.selectedId = _loc2_ ? 1 : 0;
        let _loc4_: number = param1.getInt(1);
        this._highlightTypePicker.selectedId = _loc4_;
        this.updateStrengthOptions(_loc4_, _loc4_ == 4 ? param1.getInt(2) * 2 : param1.getInt(2));
        this.updateColorAvailability(_loc4_);
        this._SafeStr_14447.color = param1.getInt(3) >>> 0;
        let _loc3_: number = Math.max(0, Math.min(param1.getInt(4), 1)) | 0;
        this.updateAnimationOptions(_loc4_, _loc3_);
        this._SafeStr_14432.selectedId = param1.getInt(5);
        this.updateHighlightWarning(_loc4_);
        this.updateEasingAvailability(this._SafeStr_14451.selectedId);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = this._SafeStr_14451.selectedId;
        let _loc2_: number = this._highlightTypePicker.selectedId;
        return [this._SafeStr_14428.selectedId == 1 ? 1 : 0, _loc2_, _loc2_ == 4 ? this._SafeStr_14446.selectedId / 2 : this._SafeStr_14446.selectedId, _loc2_ == 2 ? 0 : (_loc2_ == 4 ? 16777215 : this._SafeStr_14447.color), _loc1_, this._SafeStr_14432.selectedId, this._targetUsers ? 1 : 0];
    }

    private onHighlightTypeChanged = (param1: ExpandableDropdownOption): void => {
        if (param1 != null) {
            this.updateStrengthOptions(param1.id, this._SafeStr_14446.selectedId);
            this.updateColorAvailability(param1.id);
            this.updateHighlightWarning(param1.id);
            this.updateAnimationOptions(param1.id, this._SafeStr_14451.selectedId);
            this.updateEasingAvailability(this._SafeStr_14451.selectedId);
        }
    };

    private onAnimationChanged = (param1: ExpandableDropdownOption): void => {
        if (param1 != null) {
            this.updateEasingAvailability(param1.id);
        }
    };

    private onAudienceChanged = (param1: ExpandableDropdownOption): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
        if (param1.id == 1 && !this._SafeStr_14429) {
            this._SafeStr_14429 = true;
            this.roomEvents.windowManager.alert("${wiredfurni.params.furni_visualization.audience.everyone_info.title}", "${wiredfurni.params.furni_visualization.audience.everyone_info.body}", 0, null);
        }
    };

    private updateHighlightWarning(param1: number): void {
        this._highlightWarning.visible = !this._targetUsers && param1 == 3;
    }

    private updateStrengthOptions(param1: number, param2: number): void {
        let _loc5_: string = null;
        let _loc10_: any[] = null;
        let _loc3_: any = undefined;
        let _loc12_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        if (param1 == 2) {
            _loc5_ = this.roomEvents.getProperty("wired.furni_highlight.darken_levels");
            _loc10_ = (_loc5_ == null || _loc5_ == "" ? "0,10,20,30,40,50,60,70,80,90,100" : _loc5_).split(",");
            _loc3_ = [];
            _loc12_ = _loc10_[0] | 0;
            _loc6_ = 0;
            while (_loc6_ < _loc10_.length) {
                _loc8_ = _loc10_[_loc6_] | 0;
                _loc3_.push(new ExpandableDropdownOption(_loc8_, _loc8_ == 0 ? "${wiredfurni.params.set_furni_highlight.off}" : this.levelLabel(_loc6_)));
                if (Math.abs(_loc8_ - param2) < Math.abs(_loc12_ - param2)) {
                    _loc12_ = _loc8_;
                }
                _loc6_++;
            }
            this._SafeStr_14446.reinit(_loc3_, _loc12_);
            return;
        }
        if (param1 == 4) {
            this._SafeStr_14446.reinit(Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_highlight.off}"), new ExpandableDropdownOption(76, "${wiredfurni.params.set_furni_highlight.on}")]), param2 > 0 ? 76 : 0);
            return;
        }
        let _loc7_: number = 100;
        if (param1 == 3) {
            _loc7_ = 25;
        }
        let _loc4_: ExpandableDropdownOption[] = [];
        _loc9_ = 0;
        while (_loc9_ <= 100) {
            _loc4_.push(new ExpandableDropdownOption(_loc9_, _loc9_ == 0 ? "${wiredfurni.params.set_furni_highlight.off}" : (_loc7_ == 100 ? "${wiredfurni.params.set_furni_highlight.on}" : this.levelLabel(_loc9_ / _loc7_ | 0))));
            _loc9_ += _loc7_;
        }
        let _loc11_: number = Math.round(Math.max(0, Math.min(100, param2)) / _loc7_) * _loc7_ | 0;
        this._SafeStr_14446.reinit(_loc4_, _loc11_);
    }

    private updateColorAvailability(param1: number): void {
        let _loc2_: number = this._SafeStr_14447.color;
        this._SafeStr_14447 = param1 == 3 ? this._SafeStr_14449 : this._SafeStr_14448;
        this._SafeStr_14448.visible = this._SafeStr_14447 == this._SafeStr_14448;
        this._SafeStr_14449.visible = this._SafeStr_14447 == this._SafeStr_14449;
        this._SafeStr_14447.color = _loc2_;
        this._SafeStr_14450.disabled = param1 == 4 || param1 == 2;
    }

    private levelLabel(param1: number): string {
        return this.roomEvents.localization.getLocalizationWithParams("wiredfurni.params.set_furni_highlight.level", "", "level", String(param1));
    }

    private updateAnimationOptions(param1: number, param2: number): void {
        let _loc3_: ExpandableDropdownOption[] = [];
        if (param1 != 4) {
            _loc3_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_highlight.animation.0}"));
        }
        _loc3_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.set_furni_highlight.animation.1}"));
        this._SafeStr_14451.reinit(_loc3_, param1 == 4 ? 1 : param2);
    }

    private updateEasingAvailability(param1: number): void {
        this._SafeStr_14452.disabled = param1 != 0;
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        return param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1 && this._SafeStr_14428.selectedId == 1;
    }

    public override mergedSelections(): any[] {
        return [[0, 1], [-1, 0]];
    }

    public override mergedSelectionTitle(param1: number): string {
        return param1 == 0 ? "wiredfurni.params.sources.merged.title.target" : "wiredfurni.params.visualization.visibility_audience";
    }

    public override mergedSourceOptions(param1: number): any[] {
        return param1 == 0 ? super.mergedSourceOptions(param1) : [WiredInputSourcePicker.USER_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return param1 == 1;
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._targetUsers = param2 == WiredInputSourcePicker.USER_SOURCE;
            this.updateHighlightWarning(this._highlightTypePicker.selectedId);
        }
    }

    public override getMergedType(param1: number): number {
        return param1 == 1 || this._targetUsers ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
