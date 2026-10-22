import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { TextualButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextualButtonPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';

export class TransactionFailed extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::TransactionFailed'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.TRANSACTION_FAILED;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.transaction_failed.usage_info}");
        let _loc5_: TextualButtonPreset = param1.createTextualButtonPreset(this.loc("wiredfurni.view_in_menu"), this.viewInMenuCallback);
        param3.addElements(_loc4_, _loc5_.alignCenter());
    }

    private viewInMenuCallback = (): void => {
        this.roomEvents.context.createLinkEvent("wiredmenu/open/variable_overview/@event.transaction_failed.reason");
    };
}
