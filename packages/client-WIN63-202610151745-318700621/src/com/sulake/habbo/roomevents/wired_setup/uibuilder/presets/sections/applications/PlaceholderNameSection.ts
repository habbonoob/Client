import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { HtmlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/HtmlPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { HtmlTextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/HtmlTextParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class PlaceholderNameSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections.applications::PlaceholderNameSection'); }

    declare private _name: TextInputPreset;

    declare private _preview: HtmlPreset;

    declare private _SafeStr_2221: SimpleListViewPreset;

    declare private _SafeStr_5415: string;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string) {
        super(param1, param2, param3);
        this._SafeStr_5415 = param5;
        this._name = param2.createTextInput(new TextInputParam("", 32, null, -1, "a-zA-Z_0-9 "));
        this._preview = param2.createHtml(this.l("texts.placeholder_preview").replace("#ffffaa", Util.uintToHexColor(param3.yellowTextColor)), new HtmlTextParam(1, true, 2));
        this._SafeStr_2221 = param2.createSimpleListView(true, [this._name, this._preview.staticHeight(this._preview.fontSize * 3)]);
        this._name.addListener(this.onPlaceholderChange);
        this.initializeSection(param4, this._SafeStr_2221);
    }

    private onPlaceholderChange = (param1: string): void => {
        let _loc3_: string = this._name.text;
        let _loc4_: string = param1.split(" ").join("_").toLowerCase();
        if (_loc3_ != _loc4_) {
            this._name.text = _loc4_;
        }
        let _loc2_: string = this._roomEvents.localization.getLocalizationWithParams("wiredfurni.params.texts.placeholder_preview", "", "placeholder", this._SafeStr_5415 + "(" + _loc4_.toLowerCase() + ")").replace("#ffffaa", Util.uintToHexColor(this._SafeStr_2144.yellowTextColor));
        this._preview.text = _loc2_;
    };

    public set placeholderName(param1: string) {
        this._name.text = param1;
        this.onPlaceholderChange(param1);
    }

    public get placeholderName(): string {
        return this._name.text.split(" ").join("_").toLowerCase();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2221 = null;
        this._name = null;
        this._preview = null;
        this._SafeStr_5415 = null;
    }
}
