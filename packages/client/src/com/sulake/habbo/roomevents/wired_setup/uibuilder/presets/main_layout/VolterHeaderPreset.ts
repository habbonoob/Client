import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';

export class VolterHeaderPreset extends HeaderPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::VolterHeaderPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: ElementTypeHolder, param6: number, param7: (...args: any[]) => any, param8: (...args: any[]) => any, param9: (...args: any[]) => any) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9);
    }

    declare private _namePreset: TextPreset;

    protected override createTopHeaderElement(param1: string, param2: ElementTypeHolder): WiredUIPreset {
        let _loc3_: TextParam = new TextParam(1, true);
        _loc3_.fontSize = this._SafeStr_2144.headerNameFontSize;
        this._namePreset = this._presetManager.createText(param1, _loc3_);
        return this._presetManager.createSimpleListView(false, [this._presetManager.createBitmapWrapperPreset("wired_type_icons_icon_" + param2.getKey()), this._namePreset]);
    }

    public override updateName(param1: string): void {
        this._namePreset.text = param1;
        this.resizeToWidth(this._width);
    }

    public override dispose(): void {
        super.dispose();
        this._namePreset = null;
    }
}
