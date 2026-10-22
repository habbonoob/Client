import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { HtmlTextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/HtmlTextParam';
import type { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';

export class HtmlPreset extends TextPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::HtmlPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: HtmlTextParam) {
        super(param1, param2, param3, param4, param5);
        this._SafeStr_3112_HtmlPreset = param5;
        (asGuarded(this.window, isIHTMLTextWindow)).selectable = this._SafeStr_3112_HtmlPreset.selectable;
    }

    declare private _SafeStr_3112_HtmlPreset: HtmlTextParam;

    protected override createView(): ITextWindow {
        return this._SafeStr_2144.createHtmlView();
    }

    protected override initializeMode(param1: TextParam): void {
        super.initializeMode(param1);
        this._window.multiline = false;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_3112_HtmlPreset = null;
    }
}
