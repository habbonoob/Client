import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { LinkDataframeSendPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeSendPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';

export class SendLinkDataframe extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::SendLinkDataframe'); }

    declare private _dataframe: LinkDataframeSendPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.SEND_LINK_DATAFRAME;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get allowScrolling(): boolean {
        return true;
    }

    public override get widthModifier(): number {
        return 1.4;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._dataframe = param1.createLinkDataframeSend(this.mergedSourceOptions(0));
        param3.addElements(this._dataframe);
    }

    public override onEditStart(param1: Triggerable): void {
        this._dataframe.initialize(param1);
    }

    public override onEditInitialized(): void {
        this._dataframe.onEditInitialized();
    }

    public override onEditEnd(): void {
        super.onEditEnd();
        this._dataframe.hideDetachedWindows();
    }

    public override readIntParamsFromForm(): any[] {
        return this._dataframe.intParams;
    }

    public override readStringParamFromForm(): string {
        return this._dataframe.stringParam;
    }

    public override readVariableIdsFromForm(): any[] {
        return this._dataframe.readVariableIds();
    }

    public override furniSelectionTitle(param1: number): string {
        return param1 == 0 ? "wiredfurni.params.link.endpoints" : "wiredfurni.params.link.source_furni";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.link.source_users";
    }

    public override mergedSelections(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < 12) {
            _loc1_.push([_loc2_ + 1, _loc2_]);
            _loc2_++;
        }
        return _loc1_;
    }

    public override setMergedType(param1: number, param2: number): void {
        this._dataframe.setTarget(param1, param2);
    }

    public override getMergedType(param1: number): number {
        return this._dataframe == null || this._dataframe.disposed ? WiredInputSourcePicker._SafeStr_2178 : this._dataframe.getTarget(param1);
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override mergedSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.merged.title.variables_reference";
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        return param2 == WiredInputSourcePicker.MERGED_SOURCE && this._dataframe.isSourcePickingDisabled(param1);
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
