import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { LinkDataframeReceivePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeReceivePreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class ReceiveLinkDataframe extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::ReceiveLinkDataframe'); }

    declare private _dataframe: LinkDataframeReceivePreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.RECEIVE_LINK_DATAFRAME;
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
        this._dataframe = param1.createLinkDataframeReceive();
        param3.addElements(this._dataframe);
    }

    public override onEditStart(param1: Triggerable): void {
        this._dataframe.initialize(param1);
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

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
