import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { LevelXpPreviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LevelXpPreviewPreset';
import type { SubVariableCreatorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/SubVariableCreatorPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { ExponentialLevelUpper } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/ExponentialLevelUpper';
import { InterpolateLevelUpper } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/InterpolateLevelUpper';
import { LinearLevelUpper } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/LinearLevelUpper';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { SubVariableParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/applications/SubVariableParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';

export class VariableLvlUpAddon extends DefaultAddonType implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableLvlUpAddon'); }

    private static MODE_MANUAL: number = 0;
    private static MODE_LINEAR: number = 1;
    private static MODE_EXPONENTIAL: number = 2;

    constructor() {
        super();
    }

    declare private _modeOptionGroup: RadioGroupPreset;

    declare private _SafeStr_4656: TextAreaPreset;

    declare private _SafeStr_4153: NamedNumberInputPreset;

    declare private _maxLevel1: NamedNumberInputPreset;

    declare private _SafeStr_4145: NamedNumberInputPreset;

    declare private _SafeStr_4193: NamedNumberInputPreset;

    declare private _maxLevel2: NamedNumberInputPreset;

    declare private _previewPreset: LevelXpPreviewPreset;

    declare private _subVariableCreatorPreset: SubVariableCreatorPreset;

    declare private _cachedIntParams: any[];

    declare private _SafeStr_7199: string;

    public override get code(): number {
        return AddonCodes.VARIABLE_LEVEL_UP;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public get disposed(): boolean {
        return false;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: string = "wiredfurni.params.levelup.";
        let _loc8_: any[] = [];
        let _loc7_: RadioButtonParam = new RadioButtonParam(1, this.loc(_loc5_ + "mode.1"));
        this._SafeStr_4153 = param1.createNamedNumberInput(new NumberInputParam(100, 1, 100000, 35), this.loc(_loc5_ + "step_size"));
        this._maxLevel1 = param1.createNamedNumberInput(new NumberInputParam(50, 2, 100000, 20), this.loc(_loc5_ + "max_level"));
        _loc7_.extra2 = param1.createSimpleListView(true, [this._SafeStr_4153, this._maxLevel1]);
        let _loc9_: RadioButtonParam = new RadioButtonParam(2, this.loc(_loc5_ + "mode.2"));
        this._SafeStr_4145 = param1.createNamedNumberInput(new NumberInputParam(100, 1, 100000, 35), this.loc(_loc5_ + "first_level_xp"));
        this._SafeStr_4193 = param1.createNamedNumberInput(new NumberInputParam(20, 1, 100000, 35), this.loc(_loc5_ + "increase_factor"));
        this._maxLevel2 = param1.createNamedNumberInput(new NumberInputParam(50, 2, 100000, 20), this.loc(_loc5_ + "max_level"));
        _loc9_.extra2 = param1.createSimpleListView(true, [this._SafeStr_4145, this._SafeStr_4193, this._maxLevel2]);
        let _loc6_: RadioButtonParam = new RadioButtonParam(0, this.loc(_loc5_ + "mode.0"));
        this._SafeStr_4656 = param1.createTextArea(new TextAreaParam(60, -1, -1, 30, 1000, "", this.loc(_loc5_ + "interpolation_placeholder"), "0123456789=\r"));
        _loc6_.extra2 = this._SafeStr_4656;
        _loc8_.push(_loc7_);
        _loc8_.push(_loc9_);
        _loc8_.push(_loc6_);
        this._modeOptionGroup = param1.createRadioGroup(_loc8_);
        let _loc10_: SectionPreset = param1.createSection(this.loc(_loc5_ + "mode"), this._modeOptionGroup, SectionParam.EXPANDED);
        this._previewPreset = param1.createLevelXpPreview([1, 2, 3, 5, 10, 20]);
        let _loc11_: SectionPreset = param1.createSection(this.loc(_loc5_ + "preview"), this._previewPreset, SectionParam.COLLAPSED);
        let _loc4_: any[] = [new SubVariableParam(0, "current_level"), new SubVariableParam(1, "current_xp"), new SubVariableParam(2, "progress"), new SubVariableParam(3, "progress_percentage"), new SubVariableParam(4, "xp_required"), new SubVariableParam(5, "xp_remaining"), new SubVariableParam(6, "is_maxed"), new SubVariableParam(7, "max_level")];
        this._subVariableCreatorPreset = param1.createSubVariableCreator(_loc5_ + "subvariable.", _loc4_);
        let _loc12_: SectionPreset = param1.createSection(this.loc("wiredfurni.params.create_subvariables"), this._subVariableCreatorPreset, SectionParam.EXPANDED);
        param3.addElements(_loc10_, _loc11_, _loc12_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc7_: number = param1.getInt(0);
        let _loc2_: number = param1.getInt(1);
        let _loc6_: number = param1.getInt(2);
        let _loc4_: number = param1.getInt(3);
        let _loc3_: number = param1.getInt(4);
        let _loc5_: string = param1.stringParam;
        this._subVariableCreatorPreset.mask = _loc7_;
        this._modeOptionGroup.selected = _loc2_;
        this._SafeStr_4656.reset();
        this._maxLevel1.reset();
        this._maxLevel2.reset();
        this._SafeStr_4153.reset();
        this._SafeStr_4145.reset();
        this._SafeStr_4193.reset();
        if (_loc2_ == VariableLvlUpAddon.MODE_MANUAL) {
            this._SafeStr_4656.text = _loc5_;
        } else if (_loc2_ == VariableLvlUpAddon.MODE_LINEAR) {
            this._SafeStr_4153.value = _loc6_;
            this._maxLevel1.value = _loc4_;
        } else if (_loc2_ == VariableLvlUpAddon.MODE_EXPONENTIAL) {
            this._SafeStr_4145.value = _loc6_;
            this._SafeStr_4193.value = _loc4_;
            this._maxLevel2.value = _loc3_;
        }
        this.roomEvents.context.registerUpdateReceiver(this, 0);
    }

    public override onEditEnd(): void {
        this.roomEvents.context.removeUpdateReceiver(this);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: any[] = [];
        _loc2_.push(this._subVariableCreatorPreset.mask);
        let _loc1_: number = this._modeOptionGroup.selected;
        _loc2_.push(_loc1_);
        if (_loc1_ == VariableLvlUpAddon.MODE_LINEAR) {
            _loc2_.push(this._SafeStr_4153.value);
            _loc2_.push(this._maxLevel1.value);
        } else if (_loc1_ == VariableLvlUpAddon.MODE_EXPONENTIAL) {
            _loc2_.push(this._SafeStr_4145.value);
            _loc2_.push(this._SafeStr_4193.value);
            _loc2_.push(this._maxLevel2.value);
        }
        return _loc2_;
    }

    public override readStringParamFromForm(): string {
        let _loc1_: number = this._modeOptionGroup.selected;
        if (_loc1_ == 0) {
            return this._SafeStr_4656.text;
        }
        return "";
    }

    public update(param1: number): void {
        let _loc4_: any[] = null;
        let _loc2_: string = null;
        let _loc7_: boolean = false;
        let _loc5_: AbstractLevelUpConfig = null;
        let _loc6_: any[] = null;
        if (this._previewPreset) {
            _loc4_ = this.readIntParamsFromForm();
            _loc2_ = this.readStringParamFromForm();
            _loc7_ = this._cachedIntParams == null || !Util.compareIntArrays(this._cachedIntParams, _loc4_) || this._SafeStr_7199 != _loc2_;
            if (_loc7_) {
                _loc5_ = this.simulateLevelUpper();
                _loc6_ = [];
                if (_loc5_ != null) {
                    for (const _loc3_ of this._previewPreset.previewLevels ?? []) {
                        if (_loc3_ <= 0 || _loc3_ > _loc5_.maxLevel) {
                            break;
                        }
                        _loc6_.push(_loc5_.xpForLevel(_loc3_ | 0));
                    }
                }
                this._previewPreset.setPreviewXps(_loc6_);
            }
            this._cachedIntParams = _loc4_;
            this._SafeStr_7199 = _loc2_;
        }
    }

    public dispose(): void {
    }

    private simulateLevelUpper(): AbstractLevelUpConfig {
        let _loc2_: AbstractLevelUpConfig = null;
        let _loc3_: UtilsMap = null;
        let _loc1_: number = this._modeOptionGroup.selected;
        if (_loc1_ == VariableLvlUpAddon.MODE_MANUAL) {
            _loc3_ = this.parseLevelToXpMap();
            if (_loc3_ == null) {
                return null;
            }
            _loc2_ = new InterpolateLevelUpper(_loc3_);
        } else if (_loc1_ == VariableLvlUpAddon.MODE_LINEAR) {
            _loc2_ = new LinearLevelUpper(this._SafeStr_4153.value, this._maxLevel1.value);
        } else if (_loc1_ == VariableLvlUpAddon.MODE_EXPONENTIAL) {
            _loc2_ = new ExponentialLevelUpper(this._SafeStr_4145.value, this._SafeStr_4193.value, this._maxLevel2.value);
        }
        return _loc2_;
    }

    private parseLevelToXpMap(): UtilsMap {
        let _loc6_: any[] = null;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc2_: string = this.readStringParamFromForm();
        let _loc3_: UtilsMap = new UtilsMap();
        let _loc4_: any[] = _loc2_.split("\n");
        let _loc1_: any = 1;
        let _loc8_: any = 0;
        for (const _loc5_ of _loc4_ ?? []) {
            _loc6_ = _loc5_.split("=", 2);
            if (_loc6_.length >= 2) {
                try {
                    _loc7_ = _loc6_[0] | 0;
                    _loc9_ = _loc6_[1] | 0;
                } catch (e) {
                    continue;
                }
                if (_loc7_ <= _loc1_ || _loc9_ <= _loc8_) {
                    return null;
                }
                _loc3_.add(_loc7_, _loc9_);
                _loc1_ = _loc7_;
                _loc8_ = _loc9_;
            }
        }
        return _loc3_;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
