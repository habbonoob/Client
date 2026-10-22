import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';
import type { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/WiredContract';
import type { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import { Short } from '@/com/sulake/core/communication/util/Short';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';

export class AbstractContract extends AbstractUbuntuWiredUI implements WiredContract {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts.subcontrollers.util::AbstractContract'); }

    declare private _contractId: number;

    declare private _parentController: WiredContractController;

    constructor(param1: WiredContractController, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._parentController = param1;
    }

    protected override get isBoundToParentRect(): boolean {
        return true;
    }

    public get contractId(): number {
        return this._contractId;
    }

    public set contractId(param1: number) {
        this._contractId = param1;
    }

    protected get parentController(): WiredContractController {
        return this._parentController;
    }

    public override onSaveClicked(): void {
        this.parentController.saveContract(this);
    }

    protected override hideFrame(): void {
        if (this.isShowing()) {
            this.parentController.cacheWindowLocation(this.window);
            this.parentController.addEditContractElement.hide();
        }
        super.hideFrame();
    }

    public show(param1: WiredContractContentsMessageParser): void {
        this.contractId = param1.contractId;
        this.footerPreset.saveButtonDisabled = !this.roomEvents.wiredMenu.hasWritePermission;
    }

    protected createNewDefinitionFromUI(): TradeRequirementRulesDefinition {
        return null;
    }

    public addContentsToComposer(param1: any[]): void {
        param1.push(this.contractId);
        param1.push(new Short(this.contractType()));
        this.createNewDefinitionFromUI().addToComposer(param1);
    }

    public contractType(): number {
        return 0;
    }

    public validate(): string {
        return null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._parentController = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this._contractId = -1;
        super.initInstanceFields();
    }
}
