import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TradeRuleEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset';
import type { HorizontalSectionListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HorizontalSectionListPreset';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ItemTypeSelectionSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ItemTypeSelectionSection';
import type { WiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/WiredContractController';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';

export class AddEditContractElement extends AbstractUbuntuWiredUI {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts.subcontrollers::AddEditContractElement'); }

    public static readonly MAX_COINS: number = 100000;
    public static readonly MAX_FURNI: number = 500;

    constructor(param1: WiredContractController, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._parentController = param1;
        this._elementTypePreset = param2.createRadioGroup([new RadioButtonParam(0, "${wiredcontracts.element.type.0}"), new RadioButtonParam(1, "${wiredcontracts.element.type.1}")], this.onElementTypeChange);
        let _loc4_: SectionPreset = param2.createSection("${wiredcontracts.element.type}", this._elementTypePreset);
        this._amountInputPreset = param2.createNumberInput(new NumberInputParam(1, 1, 100000, 80));
        let _loc5_: SectionPreset = param2.createSection("${wiredcontracts.element.amount}", this._amountInputPreset);
        let _loc3_: HorizontalSectionListPreset = param2.createHorizontalSectionListPreset([_loc4_, _loc5_]);
        this._SafeStr_2844 = param2.createItemTypeSelectionSection();
        this.framePreset = param2.createFramePreset([_loc3_, this._SafeStr_2844, this.footerPreset], this.onCloseClicked);
        this.framePreset.resizeToWidth(420);
    }

    declare private _parentController: WiredContractController;

    declare private _elementTypePreset: RadioGroupPreset;

    declare private _amountInputPreset: NumberInputPreset;

    declare private _SafeStr_2844: ItemTypeSelectionSection;

    declare private _listenerPreset: TradeRuleEditorPreset;

    declare private _SafeStr_4020: number;

    protected override get isRememberLocation(): boolean {
        return true;
    }

    protected override get isBoundToParentRect(): boolean {
        return true;
    }

    public override get xOffsetFromCenter(): number {
        return 375;
    }

    declare private _isEditMode: boolean;

    public set isEditMode(param1: boolean) {
        this._isEditMode = param1;
        this.framePreset.title = this._isEditMode ? "${wiredcontracts.edit_element.title}" : "${wiredcontracts.add_element.title}";
    }

    public override onSaveClicked(): void {
        let _loc1_: string = this.validate();
        if (_loc1_ != null) {
            this.roomEvents.windowManager.alert("${wiredfurni.error.title}", _loc1_, 0, null);
            return;
        }
        if (this._isEditMode) {
            this._listenerPreset.updateNode(this._SafeStr_4020 >>> 0, this.createNode());
        } else {
            this._listenerPreset.addNode(this.createNode());
        }
        this._listenerPreset = null;
        this._SafeStr_4020 = -1;
        this.hideFrame();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._elementTypePreset = null;
        this._amountInputPreset = null;
        this._SafeStr_2844 = null;
        this._listenerPreset = null;
        this._parentController = null;
        super.dispose();
    }

    public onEdit(param1: TradeRuleEditorPreset, param2: number, param3: TradeRequirementNode): void {
        this.isEditMode = true;
        this._listenerPreset = param1;
        this._SafeStr_4020 = param2;
        this.footerPreset.saveButtonDisabled = !this.roomEvents.wiredMenu.hasWritePermission;
        this._SafeStr_2844.resetInteractions();
        this._SafeStr_2844.selectedItem = param3.itemType;
        this._elementTypePreset.selected = param3.type;
        this._amountInputPreset.value = param3.amount;
        this.onElementTypeChange(param3.type);
        this.showFrame();
    }

    public onAdd(param1: TradeRuleEditorPreset): void {
        this.isEditMode = false;
        this._listenerPreset = param1;
        this._SafeStr_4020 = -1;
        this.footerPreset.saveButtonDisabled = !this.roomEvents.wiredMenu.hasWritePermission;
        this._SafeStr_2844.resetInteractions();
        this._SafeStr_2844.selectedItem = null;
        this._elementTypePreset.selected = TradeRequirementNode.TYPE_COIN;
        this._amountInputPreset.value = 1;
        this.onElementTypeChange(TradeRequirementNode.TYPE_COIN);
        this.showFrame();
    }

    private onElementTypeChange(param1: number): void {
        this._SafeStr_2844.disabled = param1 != TradeRequirementNode.TYPE_FURNI;
    }

    private createNode(): TradeRequirementNode {
        return new TradeRequirementNode(this._elementTypePreset.selected, this._amountInputPreset.value, this._elementTypePreset.selected == TradeRequirementNode.TYPE_FURNI ? this._SafeStr_2844.selectedItem : null);
    }

    private validate(): string {
        let _loc1_: IFurnitureData = null;
        if (this._elementTypePreset.selected == TradeRequirementNode.TYPE_FURNI && this._amountInputPreset.value > 500) {
            return this.localization.getLocalizationWithParams("wiredcontracts.element.too_many_items", "", "amount", 500);
        }
        if (this._elementTypePreset.selected == TradeRequirementNode.TYPE_FURNI) {
            _loc1_ = this._SafeStr_2844.furniDataForSelectedItem;
            if (_loc1_ == null || !_loc1_.tradeable) {
                return "${wiredcontracts.element.item_not_allowed}";
            }
        }
        return null;
    }

    protected override initInstanceFields(): void {
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onElementTypeChange = this.onElementTypeChange.bind(this);
        this._SafeStr_4020 = -1;
        this._isEditMode = false;
        super.initInstanceFields();
    }
}
