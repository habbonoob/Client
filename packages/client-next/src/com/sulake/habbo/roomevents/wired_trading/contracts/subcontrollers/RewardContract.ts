import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';
import type { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import { Short } from '@/com/sulake/core/communication/util/Short';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { AbstractContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/util/AbstractContract';

export class RewardContract extends AbstractContract {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts.subcontrollers::RewardContract'); }

    declare private _receiveRequirementPreset: TradeRuleEditorPreset;

    declare private _SafeStr_5067: DropdownPreset;

    declare private _SafeStr_5851: SectionPreset;

    declare private _rewardText: TextAreaPreset;

    declare private _showByDefault: CheckboxGroupPreset;

    constructor(param1: WiredContractController, param2: PresetManager) {
        super(param1, param2);
        this._receiveRequirementPreset = param2.createRuleEditorPreset("${wiredcontracts.reward_rule}", param1.addEditContractElement.onEdit, param1.addEditContractElement.onAdd, null, this.onRulesChange);
        let _loc4_: SectionPreset = param2.createSection("${wiredcontracts.reward_requirements}", this._receiveRequirementPreset);
        this._rewardText = param2.createTextArea(new TextAreaParam(52, -1, 3, -1, 200, "", "${wiredcontracts.reward_contract.reward_popup.text.tooltip}"));
        this._showByDefault = param2.createCheckboxGroup([new CheckboxOptionParam("${wiredcontracts.reward_contract.reward_popup.show_by_default}")]);
        let _loc5_: SimpleListViewPreset = param2.createSimpleListView(true, [this._rewardText, this._showByDefault]);
        let _loc6_: SectionPreset = param2.createSection("${wiredcontracts.reward_contract.reward_popup}", _loc5_);
        let _loc3_: ExpandableDropdownOption[] = [new ExpandableDropdownOption(11, "${wiredfurni.params.earnings_category.11}"), new ExpandableDropdownOption(13, "${wiredfurni.params.earnings_category.13}")];
        this._SafeStr_5067 = param2.createDropdown(new DropdownParam("${wiredcontracts.reward_contract.earnings_category}", _loc3_));
        this._SafeStr_5851 = param2.createSection("${wiredcontracts.reward_contract.earnings_category}", this._SafeStr_5067, SectionParam.COLLAPSED);
        this.framePreset = param2.createFramePreset([_loc4_, _loc6_, this._SafeStr_5851, this.footerPreset], this.onCloseClicked);
        this.framePreset.resizeToWidth(262);
        this.framePreset.title = "${wiredcontracts.reward_contract.title}";
    }

    private onRulesChange = (): void => {
        this._SafeStr_5851.disabled = !this.hasCreditNode();
    };

    private hasCreditNode(): boolean {
        let _loc2_: TradeRequirementRule = this._receiveRequirementPreset.finalizeRule();
        for (const _loc1_ of _loc2_.nodes ?? []) {
            if (_loc1_.type == TradeRequirementNode.TYPE_COIN) {
                return true;
            }
        }
        return false;
    }

    protected override createNewDefinitionFromUI(): TradeRequirementRulesDefinition {
        return new TradeRequirementRulesDefinition(null, this._receiveRequirementPreset.finalizeRule());
    }

    public override show(param1: WiredContractContentsMessageParser): void {
        if (param1.contractType != this.contractType() || param1.definition.youGetRule == null) {
            return;
        }
        super.show(param1);
        this._receiveRequirementPreset.rule = param1.definition.youGetRule;
        this._showByDefault._SafeStr_2119(0).selected = param1.showDialog;
        this._SafeStr_5067.selectedId = param1.rewardCategory;
        this._rewardText.text = param1.rewardText;
        this.showFrame();
    }

    public override addContentsToComposer(param1: any[]): void {
        super.addContentsToComposer(param1);
        param1.push(new Short(this._SafeStr_5067.selectedId));
        param1.push(this._showByDefault._SafeStr_2119(0).selected);
        param1.push(this._rewardText.text);
    }

    public override contractType(): number {
        return 2;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._receiveRequirementPreset = null;
        super.dispose();
    }
}
