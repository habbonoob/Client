import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';

export class ContainerButtonPreset extends PaddedContainerPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ContainerButtonPreset'); }

    declare private _onClick: (...args: any[]) => any;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: WiredUIPreset, param5: (...args: any[]) => any, param6: boolean = true) {
        super(param1, param2, param3, param4, param3.containerButtonPaddingLeft, param3.containerButtonPaddingTop, param3.containerButtonPaddingLeft, param3.containerButtonPaddingTop, param3.createContainerButton(), param6);
        this._onClick = param5;
        this.button.addEventListener("WME_CLICK", this.buttonClicked);
    }

    private buttonClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick();
        }
    };

    private get button(): IContainerButtonWindow {
        return isIContainerButtonWindow(this._window) ? this._window : null;
    }
}
