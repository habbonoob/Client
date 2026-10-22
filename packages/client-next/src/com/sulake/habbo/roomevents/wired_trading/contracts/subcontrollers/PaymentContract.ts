import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TradeRuleListEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleListEditorPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import { Short } from '@/com/sulake/core/communication/util/Short';
import { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { AbstractContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/util/AbstractContract';

export class PaymentContract extends AbstractContract {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts.subcontrollers::PaymentContract'); }

    private static readonly LAYOUT_TYPES: any[] = ["generic", "games"];

    declare private _paymentOptionPreset: RadioGroupPreset;

    declare private _receiveTextPreset: TextInputPreset;

    declare private _paymentRequirementPreset: TradeRuleListEditorPreset;

    declare private _SafeStr_4965: SectionPreset;

    declare private _SafeStr_5219: DropdownPreset;

    constructor(param1: WiredContractController, param2: PresetManager) {
        super(param1, param2);
        this._paymentOptionPreset = param2.createRadioGroup([new RadioButtonParam(0, "${wiredcontracts.payment_contract.mode.0}"), new RadioButtonParam(1, "${wiredcontracts.payment_contract.mode.1}")], this.onPaymentModeChange);
        let _loc4_: SectionPreset = param2.createSection("${wiredcontracts.payment_contract.mode}", this._paymentOptionPreset);
        this._receiveTextPreset = param2.createTextInput(new TextInputParam("", 60));
        let _loc5_: SectionPreset = param2.createSection("${wiredcontracts.payment_contract.receive_text}", this._receiveTextPreset);
        this._paymentRequirementPreset = param2.createRuleListEditorPreset(param1.addEditContractElement.onEdit, param1.addEditContractElement.onAdd);
        this._SafeStr_4965 = param2.createSection("${wiredcontracts.payment_requirements}", this._paymentRequirementPreset);
        let _loc3_: ExpandableDropdownOption[] = [];
        _loc3_.push(new ExpandableDropdownOption(0, "${wiredcontracts.payment_contract.layout_type.0}"));
        _loc3_.push(new ExpandableDropdownOption(1, "${wiredcontracts.payment_contract.layout_type.1}"));
        this._SafeStr_5219 = param2.createDropdown(new DropdownParam("${wiredcontracts.payment_contract.layout_type}", _loc3_));
        let _loc6_: SectionPreset = param2.createSection("${wiredcontracts.payment_contract.layout_type}", this._SafeStr_5219, SectionParam.COLLAPSED);
        this.framePreset = param2.createFramePreset([_loc4_, _loc5_, this._SafeStr_4965, _loc6_, this.footerPreset], this.onCloseClicked);
        this.framePreset.resizeToWidth(262);
        this.framePreset.title = "${wiredcontracts.payment_contract.title}";
    }

    private onPaymentModeChange = (param1: number): void => {
        this._SafeStr_4965.disabled = param1 != 1;
    };

    protected override createNewDefinitionFromUI(): TradeRequirementRulesDefinition {
        return new TradeRequirementRulesDefinition(this._paymentRequirementPreset.finalizeRules(), null);
    }

    public override show(param1: WiredContractContentsMessageParser): void {
        if (param1.contractType != this.contractType() || param1.definition.youGiveRule == null) {
            return;
        }
        super.show(param1);
        this._paymentOptionPreset.selected = param1.paymentMode;
        this._receiveTextPreset.text = param1.receiveText;
        this._SafeStr_5219.selectedId = PaymentContract.LAYOUT_TYPES.indexOf(param1.layoutType);
        this._paymentRequirementPreset.rules = param1.definition.youGiveRule;
        this.onPaymentModeChange(param1.paymentMode);
        this._SafeStr_4965.updateDisabledState();
        this.showFrame();
    }

    public override addContentsToComposer(param1: any[]): void {
        super.addContentsToComposer(param1);
        param1.push(new Short(this._paymentOptionPreset.selected));
        param1.push(this._receiveTextPreset.text);
        let _loc2_: number = this._SafeStr_5219.selectedId;
        if (_loc2_ < 0 || _loc2_ >= PaymentContract.LAYOUT_TYPES.length) {
            _loc2_ = 0;
        }
        param1.push(PaymentContract.LAYOUT_TYPES[_loc2_]);
    }

    public override contractType(): number {
        return 0;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._paymentOptionPreset = null;
        this._receiveTextPreset = null;
        this._paymentRequirementPreset = null;
        super.dispose();
    }
}
