import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';

export class MoveAsGroup extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveAsGroup'); }

    private static readonly OFFSET_MIN: number = -64;
    private static readonly _SafeStr_14433: number = 64;
    private _SafeStr_4260: boolean = true;

    declare private _SafeStr_14436: NamedNumberInputPreset;

    declare private _SafeStr_14437: NamedNumberInputPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_AS_GROUP;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.move_as_group.usage_info}");
        this._SafeStr_14436 = param1.createNamedNumberInput(new NumberInputParam(0, -64, 64), "${wiredfurni.params.place_furni.offsets.x}");
        this._SafeStr_14437 = param1.createNamedNumberInput(new NumberInputParam(0, -64, 64), "${wiredfurni.params.place_furni.offsets.y}");
        let _loc5_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_14436, this._SafeStr_14437]);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.place_furni.offsets}", _loc5_);
        param3.addElements(_loc4_, _loc6_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4260 = param1.getBoolean(0);
        this._SafeStr_14436.value = param1.getInt(1);
        this._SafeStr_14437.value = param1.getInt(2);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4260 ? 1 : 0, this._SafeStr_14436.value, this._SafeStr_14437.value];
    }

    public override mergedSelections(): any[] {
        return [[1, 0]];
    }

    public override setMergedType(param1: number, param2: number): void {
        this._SafeStr_4260 = param2 == WiredInputSourcePicker.USER_SOURCE;
    }

    public override getMergedType(param1: number): number {
        return this._SafeStr_4260 ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv.0";
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.target_location";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
