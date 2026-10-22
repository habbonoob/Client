import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class SendSignal extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::SendSignal'); }

    constructor() {
        super();
    }

    declare private _signalOptions: CheckboxGroupPreset;

    declare private _ignoreCheckboxEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxEvents = false; }

    public override get code(): number {
        return ActionTypeCodes.SEND_SIGNAL;
    }

    public override get negativeCode(): number {
        return ActionTypeCodes.NEG_SEND_SIGNAL;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: any[] = [new CheckboxOptionParam(this.l("signal.split_furni")), new CheckboxOptionParam(this.l("signal.split_users"))];
        this._signalOptions = param1.createCheckboxGroup(_loc5_, this.onChangeCheckbox);
        let _loc4_: SectionPreset = param1.createSection(this.l("signal.send_options"), this._signalOptions);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._ignoreCheckboxEvents = true;
        this._signalOptions._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._signalOptions._SafeStr_2119(1).selected = param1.getBoolean(1);
        this._ignoreCheckboxEvents = false;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._signalOptions._SafeStr_2119(0).selected, this._signalOptions._SafeStr_2119(1).selected];
    }

    public override furniSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.furni.title.signal_antenna";
        }
        return "wiredfurni.params.sources.furni.title.signal_forward";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.signal_forward";
    }

    private onChangeCheckbox = (param1: number, param2: boolean): void => {
        let id: number = param1;
        let value: boolean = param2;
        if (this._ignoreCheckboxEvents) {
            return;
        }
        if (value) {
            this.roomEvents.windowManager.confirm("${wiredfurni.params.signal_warning.title}", "${wiredfurni.params.signal_warning.desc}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                    param1.dispose();
                    if (param2.type != "WE_OK") {
                        this._signalOptions._SafeStr_2119(id).selected = false;
                    }
                });
        }
    };
}
