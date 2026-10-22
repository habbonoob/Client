import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChestItemIconPreviewerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/ChestItemIconPreviewerPreset';
import type { ItemTypeSelectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/ItemTypeSelectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ItemTypeSelectionSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::ItemTypeSelectionSection'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._itemTypeSelectionPreset = param2.createItemTypeSelectionPreset();
        this._SafeStr_4176 = param2.createChestItemIconPreviewerPreset();
        let _loc4_: SectionParam = new SectionParam();
        _loc4_.addHeaderOption(this._SafeStr_4176.floatVertically());
        this.initializeSection("${wiredcontracts.element.itemtype.selection}", this._itemTypeSelectionPreset, _loc4_);
        this._itemTypeSelectionPreset.addListener(this.onChangeItemType);
    }

    declare private _itemTypeSelectionPreset: ItemTypeSelectionPreset;

    declare private _SafeStr_4176: ChestItemIconPreviewerPreset;

    public get selectedItem(): ChestItemType {
        return this._itemTypeSelectionPreset.selectedItem;
    }

    public set selectedItem(param1: ChestItemType) {
        this._itemTypeSelectionPreset.selectedItem = param1;
    }

    public get furniDataForSelectedItem(): IFurnitureData {
        return this._itemTypeSelectionPreset.furniDataForSelectedItem;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._itemTypeSelectionPreset = null;
        this._SafeStr_4176 = null;
    }

    public resetInteractions(): void {
        return this._itemTypeSelectionPreset.resetInteractions();
    }

    private onChangeItemType = (param1: ChestItemType): void => {
        this._SafeStr_4176.item = param1;
    };
}
