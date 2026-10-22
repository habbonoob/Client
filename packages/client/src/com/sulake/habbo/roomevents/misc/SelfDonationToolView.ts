import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SelfDonationTool } from '@/com/sulake/habbo/roomevents/misc/SelfDonationTool';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ItemTypeSelectionSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ItemTypeSelectionSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';

export class SelfDonationToolView extends AbstractUbuntuWiredUI {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.misc::SelfDonationToolView'); }

    public static readonly MAX_AMOUNT: number = 500;

    constructor(param1: SelfDonationTool, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._controller = param1;
        this._amountInputPreset = param2.createNumberInput(new NumberInputParam(1, 1, 500, 80));
        let _loc3_: SectionPreset = param2.createSection(this.localization.getLocalization("selfdonation.amount", "Amount"), this._amountInputPreset);
        this._SafeStr_2844 = param2.createItemTypeSelectionSection();
        this.footerPreset.saveButtonCaption = this.localization.getLocalization("selfdonation.donate", "Donate");
        this.footerPreset.splitterVisible = true;
        let _loc4_: SimpleListViewPreset = param2.createSimpleListView(true, [_loc3_, this._SafeStr_2844, this.footerPreset]);
        this.framePreset = param2.createFramePreset([_loc4_], this.onCloseClicked);
        this.framePreset.resizeToWidth(420);
        this.framePreset.title = this.localization.getLocalization("selfdonation.title", "Sandbox donation tool");
    }

    declare private _controller: SelfDonationTool;

    declare private _amountInputPreset: NumberInputPreset;

    declare private _SafeStr_2844: ItemTypeSelectionSection;

    protected override get isBoundToParentRect(): boolean {
        return true;
    }

    public override onSaveClicked(): void {
        this._controller.onDonate(this._SafeStr_2844.selectedItem, this._amountInputPreset.value);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._controller = null;
        this._amountInputPreset = null;
        this._SafeStr_2844 = null;
        super.dispose();
    }

    public showTool(): void {
        this._amountInputPreset.value = 1;
        this._SafeStr_2844.resetInteractions();
        this.showFrame();
    }
}
