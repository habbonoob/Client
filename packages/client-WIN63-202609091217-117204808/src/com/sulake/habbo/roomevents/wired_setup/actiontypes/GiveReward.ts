import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { NamedTextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedTextInputPreset';
import type { RewardListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/RewardListPreset';
import type { RewardRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/RewardRowPreset';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { TextualButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextualButtonPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class GiveReward extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::GiveReward'); }

    private static readonly MAX_REWARDS: number = 20;
    private static readonly DEFAULT_REWARDS: number = 5;

    declare private _SafeStr_7372: CheckboxOptionPreset;

    declare private _prizeLimitCheckbox: CheckboxGroupPreset;

    declare private _SafeStr_5093: NumberInputPreset;

    declare private _SafeStr_4402: TextPreset;

    declare private _SafeStr_6716: number;
    static { (this.prototype as any)._SafeStr_6716 = 0; }

    declare private _rewardIntervalGroup: RadioGroupPreset;

    declare private _SafeStr_4164: NamedTextInputPreset;

    declare private _uniquePrizeCheckbox: CheckboxGroupPreset;

    declare private _SafeStr_3068: RewardListPreset;

    declare private _SafeStr_7077: TextualButtonPreset;

    private _displayedRewards: number = 5;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.GIVE_REWARD;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override validate(): string {
        let _loc2_: number = 0;
        let _loc3_: RewardRowPreset = null;
        let _loc4_: string = null;
        let _loc5_: number = 0;
        let _loc1_: boolean = this._uniquePrizeCheckbox._SafeStr_2119(0).selected;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3068.displayedRewards) {
            _loc3_ = this._SafeStr_3068.getRow(_loc2_);
            _loc4_ = this.validateReward(_loc3_, _loc1_);
            if (_loc4_ != null) {
                return _loc4_;
            }
            if (!_loc1_ && _loc3_.probabilityText != "") {
                _loc5_ += Number(_loc3_.probabilityText) | 0;
            }
            _loc2_++;
        }
        if (_loc5_ > 100) {
            return "The sum of probabilities cannot exceed 100. You now have " + _loc5_ + ".";
        }
        return null;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._rewardIntervalGroup.selected);
        _loc1_.push(this._uniquePrizeCheckbox._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._prizeLimitCheckbox._SafeStr_2119(0).selected ? this._SafeStr_5093.value : 0);
        let _loc2_: number = Number(this._SafeStr_4164.text) | 0;
        _loc1_.push(_loc2_ >= 1 ? _loc2_ : 1);
        return _loc1_;
    }

    public override readStringParamFromForm(): string {
        let _loc3_: number = 0;
        let _loc1_: string = null;
        let _loc2_: string = "";
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_3068.displayedRewards) {
            _loc1_ = this.getRewardData(this._SafeStr_3068.getRow(_loc3_));
            if (_loc1_ != null) {
                _loc2_ += (_loc2_ == "" ? "" : ";") + _loc1_;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_5093 = param1.createNumberInput(new NumberInputParam(1, 1, 1000, 60));
        let _loc11_: CheckboxOptionParam = new CheckboxOptionParam(this.roomEvents.localization.getLocalizationWithParams("wiredfurni.params.prizelimit", "", "amount", ""), 0);
        _loc11_.extra1 = this._SafeStr_5093;
        this._prizeLimitCheckbox = param1.createCheckboxGroup([_loc11_], this.onPrizeLimitToggle);
        this._SafeStr_7372 = this._prizeLimitCheckbox._SafeStr_2119(0);
        let _loc14_: TextParam = new TextParam(1, false);
        _loc14_.textColor = 13369344;
        this._SafeStr_4402 = param1.createText("Reward limit not set. Make sure rewards are badges or non-tradeable items.", _loc14_);
        this._SafeStr_6716 = this._SafeStr_4402.window.height;
        let _loc13_: SimpleListViewPreset = param1.createSimpleListView(true, [this._prizeLimitCheckbox, this._SafeStr_4402]);
        let _loc6_: SectionPreset = param1.createSection("Reward limit", _loc13_);
        let _loc9_: any[] = [new RadioButtonParam(0, "Once"), new RadioButtonParam(1, "1 / n Days"), new RadioButtonParam(2, "1 / n Hours"), new RadioButtonParam(3, "1 / n Mins")];
        this._rewardIntervalGroup = param1.createRadioGroup(_loc9_, this.onRewardIntervalChange, 2);
        this._SafeStr_4164 = param1.createNamedTextInput(new TextInputParam("1", 4, null, 60, "0-9"), "n =");
        let _loc7_: SimpleListViewPreset = param1.createSimpleListView(true, [this._rewardIntervalGroup, this._SafeStr_4164]);
        let _loc12_: SectionPreset = param1.createSection("How often can a user be rewarded", _loc7_);
        let _loc15_: CheckboxOptionParam = new CheckboxOptionParam("Unique Rewards?", 0);
        let _loc8_: TextPreset = param1.createText("If checked each reward will be given once to each user. Probabilities are not in use.", new TextParam(1, false));
        _loc15_.extra2 = _loc8_;
        this._uniquePrizeCheckbox = param1.createCheckboxGroup([_loc15_], this.onUniquePrizeToggle);
        let _loc4_: SectionPreset = param1.createSection("Unique Rewards", this._uniquePrizeCheckbox);
        this._SafeStr_3068 = param1.createRewardList(20, this._displayedRewards);
        this._SafeStr_7077 = param1.createTextualButtonPreset("Add reward", this.onAddReward);
        let _loc5_: SectionParam = new SectionParam();
        _loc5_.addHeaderOption(this._SafeStr_7077);
        let _loc10_: SectionPreset = param1.createSection("Rewards", this._SafeStr_3068, _loc5_);
        param3.addElements(_loc6_, _loc12_, _loc4_, _loc10_);
        this.updatePrizeLimitState();
        this.onRewardIntervalChange(this._rewardIntervalGroup.selected);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: number = 0;
        let _loc5_: RewardRowPreset = null;
        this._rewardIntervalGroup.selected = param1.intParams[0] | 0;
        if (this._rewardIntervalGroup.selected > 0 && param1.intParams.length == 4) {
            this._SafeStr_4164.text = String(param1.intParams[3]);
        } else {
            this._SafeStr_4164.text = "1";
        }
        this.onRewardIntervalChange(this._rewardIntervalGroup.selected);
        let _loc3_: boolean = param1.intParams[1] == 1;
        this._uniquePrizeCheckbox._SafeStr_2119(0).selected = _loc3_;
        this.setProbabilityVisibility(!_loc3_);
        let _loc2_: number = param1.intParams[2] | 0;
        if (_loc2_ > 0) {
            this._SafeStr_5093.value = _loc2_;
            this._prizeLimitCheckbox._SafeStr_2119(0).selected = true;
        } else {
            this._prizeLimitCheckbox._SafeStr_2119(0).selected = false;
        }
        this.updatePrizeLimitState();
        this._displayedRewards = 5;
        let _loc6_: any[] = param1.stringParam == "" ? [] : param1.stringParam.split(";");
        _loc4_ = 0;
        while (_loc4_ < 20) {
            _loc5_ = this._SafeStr_3068.getRow(_loc4_);
            if (_loc6_[_loc4_]) {
                this.setRewardData(_loc5_, stringOrNull(_loc6_[_loc4_]));
                this._displayedRewards = Math.max(this._displayedRewards, _loc4_ + 1) | 0;
            } else {
                _loc5_.clear();
            }
            _loc4_++;
        }
        this._SafeStr_3068.setDisplayedRewards(this._displayedRewards);
    }

    private onPrizeLimitToggle = (param1: number, param2: boolean): void => {
        if (param1 == 0) {
            this.updatePrizeLimitState();
        }
    };

    private updatePrizeLimitState(): void {
        let _loc1_: boolean = this._prizeLimitCheckbox._SafeStr_2119(0).selected;
        this._SafeStr_4402.visible = !_loc1_;
        this._SafeStr_4402.window.height = _loc1_ ? 0 : this._SafeStr_6716;
    }

    private onUniquePrizeToggle = (param1: number, param2: boolean): void => {
        if (param1 == 0) {
            this.setProbabilityVisibility(!param2);
        }
    };

    private setProbabilityVisibility(param1: boolean): void {
        this._SafeStr_3068.setProbabilityEnabled(param1);
    }

    private onAddReward = (): void => {
        this._displayedRewards = Math.min(20, this._displayedRewards + 1) | 0;
        this._SafeStr_3068.setDisplayedRewards(this._displayedRewards);
    };

    private onRewardIntervalChange = (param1: number): void => {
        this._SafeStr_4164.disabled = param1 == 0;
    };

    private validateReward(param1: RewardRowPreset, param2: boolean): string {
        let _loc5_: number = 0;
        let _loc4_: string = param1.code;
        let _loc3_: string = param1.probabilityText;
        if (_loc4_ == "" && _loc3_ == "") {
            return null;
        }
        if (_loc4_.indexOf(",") > 0) {
            return "Product/badge codes must not contain \',\' characters.";
        }
        if (_loc4_.indexOf(";") > 0) {
            return "Product/badge codes must not contain \';\' characters.";
        }
        let _loc6_: number = 100;
        if (_loc4_.length > _loc6_) {
            return "Product/badge codes cannot contain more than " + _loc6_ + " characters.";
        }
        if (_loc4_ == "") {
            return "Remember to define product/badge codes for all rewards (fill all fields or leave all fields empty).";
        }
        if (!param2) {
            if (_loc3_ == "") {
                return "Remember to define probabilities for all rewards (fill all fields or leave all fields empty).";
            }
            if (isNaN(Number(_loc3_))) {
                return "Make sure are probabilities are numbers.";
            }
            _loc5_ = Number(_loc3_) | 0;
            if (_loc5_ < 1 || _loc5_ > 100) {
                return "Make sure all probabilities are numbers between 1 and 100.";
            }
        }
        return null;
    }

    private getRewardData(param1: RewardRowPreset): string {
        let _loc3_: string = param1.code;
        let _loc5_: string = param1.probabilityText;
        let _loc2_: boolean = param1.isBadge;
        _loc3_ = this.replaceAll(_loc3_, ";", "");
        _loc3_ = this.replaceAll(_loc3_, ",", "");
        if (_loc3_ == "") {
            return null;
        }
        let _loc4_: number = isNaN(Number(_loc5_)) ? 0 : Number(_loc5_) | 0;
        return (_loc2_ ? "0" : "1") + "," + _loc3_ + "," + _loc4_;
    }

    private setRewardData(param1: RewardRowPreset, param2: string): void {
        let _loc3_: any[] = param2 == null ? [] : param2.split(",");
        param1.code = stringOrNull(_loc3_[1] ? _loc3_[1] : "");
        param1.probabilityText = stringOrNull(_loc3_[2] ? _loc3_[2] : "");
        param1.isBadge = !!(_loc3_[0] && _loc3_[0] == "0");
    }

    private replaceAll(param1: string, param2: string, param3: string): string {
        let _loc4_: number = 100;
        while (param1.indexOf(param2) > -1) {
            param1 = param1.replace(param2, param3);
            if (--_loc4_ < 1) {
                break;
            }
        }
        return param1;
    }
}
