import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class ReceiveLinkMessage extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::ReceiveLinkMessage'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return TriggerConfCodes.RECEIVE_LINK_MESSAGE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: TextParam = new TextParam(1);
        _loc4_.textColor = param2.softTextColor;
        param3.addElements(param1.createSection("${wiredfurni.params.general_box_info}", param1.createText("${wiredfurni.params.link.receive_message_info}", _loc4_)));
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.link.endpoints";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
