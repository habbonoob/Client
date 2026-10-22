import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import type { TradeRuleListEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleListEditorPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';
import { AbstractContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/util/AbstractContract';

export class TradeContract extends AbstractContract {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts.subcontrollers::TradeContract'); }

    constructor(param1: WiredContractController, param2: PresetManager) {
        super(param1, param2);
        this._paymentRequirementPreset = param2.createRuleListEditorPreset(param1.addEditContractElement.onEdit, param1.addEditContractElement.onAdd);
        let _loc3_: SectionPreset = param2.createSection("${wiredcontracts.payment_requirements}", this._paymentRequirementPreset);
        this._receiveRequirementPreset = param2.createRuleEditorPreset("${wiredcontracts.reward_rule}", param1.addEditContractElement.onEdit, param1.addEditContractElement.onAdd);
        let _loc4_: SectionPreset = param2.createSection("${wiredcontracts.reward_requirements}", this._receiveRequirementPreset);
        this.framePreset = param2.createFramePreset([_loc3_, _loc4_, this.footerPreset], this.onCloseClicked);
        this.framePreset.resizeToWidth(262);
        this.framePreset.title = "${wiredcontracts.trade_contract.title}";
    }

    declare private _paymentRequirementPreset: TradeRuleListEditorPreset;

    declare private _receiveRequirementPreset: TradeRuleEditorPreset;

    protected override createNewDefinitionFromUI(): TradeRequirementRulesDefinition {
        return new TradeRequirementRulesDefinition(this._paymentRequirementPreset.finalizeRules(), this._receiveRequirementPreset.finalizeRule());
    }

    public override show(param1: WiredContractContentsMessageParser): void {
        if (param1.contractType != this.contractType() || param1.definition.youGiveRule == null || param1.definition.youGetRule == null) {
            return;
        }
        super.show(param1);
        this._paymentRequirementPreset.rules = param1.definition.youGiveRule;
        this._receiveRequirementPreset.rule = param1.definition.youGetRule;
        this.showFrame();
    }

    public override contractType(): number {
        return 1;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._paymentRequirementPreset = null;
        this._receiveRequirementPreset = null;
        super.dispose();
    }
}
