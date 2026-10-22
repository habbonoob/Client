import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';

export class IlluminaHeaderPreset extends HeaderPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::IlluminaHeaderPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: ElementTypeHolder, param6: number, param7: (...args: any[]) => any, param8: (...args: any[]) => any, param9: (...args: any[]) => any) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9);
    }

    declare private _name1Preset: TextPreset;

    declare private _name2Preset: TextPreset;

    protected override createTopHeaderElement(param1: string, param2: ElementTypeHolder): WiredUIPreset {
        let _loc5_: any[] = this.getNameParts(param1);
        let _loc3_: TextParam = new TextParam(1, true);
        _loc3_.fontSize = 11;
        this._name1Preset = this._presetManager.createText(stringOrNull(_loc5_[0]), _loc3_);
        _loc3_ = new TextParam(1, true);
        _loc3_.fontSize = this._SafeStr_2144.headerNameFontSize;
        _loc3_.textColor = 4802889;
        this._name2Preset = this._presetManager.createText(stringOrNull(_loc5_[1]), _loc3_);
        let _loc4_: SimpleListViewPreset = this._presetManager.createSimpleListView(true, [this._presetManager.createSpacing(true, 3), this._name1Preset, this._name2Preset]);
        _loc4_.spacing = -2;
        _loc4_.window.x = 3;
        return _loc4_;
    }

    public override updateName(param1: string): void {
        let _loc2_: any[] = this.getNameParts(param1);
        this._name1Preset.text = stringOrNull(_loc2_[0]);
        this._name2Preset.text = stringOrNull(_loc2_[1]);
        this.resizeToWidth(this._width);
    }

    public override dispose(): void {
        super.dispose();
        this._name1Preset = null;
        this._name2Preset = null;
    }

    private getNameParts(param1: string): any[] {
        let _loc2_: any[] = param1.split(":", 2);
        while (_loc2_.length < 2) {
            _loc2_.push("");
        }
        while (_loc2_[1].indexOf(" ") == 0) {
            _loc2_[1] = _loc2_[1].substring(1);
        }
        _loc2_[0] = _loc2_[0].toUpperCase();
        return _loc2_;
    }
}
