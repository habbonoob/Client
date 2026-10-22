import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SubVariableParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/applications/SubVariableParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SubVariableCreatorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::SubVariableCreatorPreset'); }

    declare private _checkboxGroup: CheckboxGroupPreset;

    declare private _SafeStr_4066: any[];

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: any[]) {
        let _loc8_: number = 0;
        let _loc11_: SubVariableParam = null;
        let _loc9_: string = null;
        let _loc7_: CheckboxOptionParam = null;
        let _loc10_: TextParam = null;
        super(param1, param2, param3);
        this._SafeStr_4066 = [];
        let _loc6_: any[] = [];
        _loc8_ = 0;
        while (_loc8_ < param5.length) {
            _loc11_ = param5[_loc8_];
            _loc9_ = param4 + _loc11_.id;
            _loc7_ = new CheckboxOptionParam("${" + _loc9_ + "}");
            _loc7_.extra1 = param2.createTextInput(new TextInputParam(_loc11_.name, -1, null, 85, null, false)).alignRight();
            if (_loc11_.hasExtraText) {
                _loc10_ = new TextParam(1);
                _loc10_.textColor = param3.softTextColor;
                _loc7_.extra2 = param2.createText("${" + _loc9_ + ".extra}", _loc10_);
            }
            _loc6_.push(_loc7_);
            this._SafeStr_4066.push(_loc11_.id);
            _loc8_++;
        }
        this._checkboxGroup = param2.createCheckboxGroup(_loc6_);
    }

    public set mask(param1: number) {
        let _loc2_: number = 0;
        let _loc4_: CheckboxOptionPreset = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._checkboxGroup.numCheckboxes) {
            _loc4_ = this._checkboxGroup._SafeStr_2119(_loc2_);
            _loc3_ = this._SafeStr_4066[_loc2_] | 0;
            _loc4_.selected = (param1 & 1 << _loc3_) > 0;
            _loc2_ += 1;
        }
    }

    public get mask(): number {
        let _loc1_: number = 0;
        let _loc4_: CheckboxOptionPreset = null;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this._checkboxGroup.numCheckboxes) {
            _loc4_ = this._checkboxGroup._SafeStr_2119(_loc1_);
            if (_loc4_.selected) {
                _loc2_ = this._SafeStr_4066[_loc1_] | 0;
                _loc3_ |= 1 << _loc2_;
            }
            _loc1_ += 1;
        }
        return _loc3_;
    }

    public override get window(): IWindow {
        return this._checkboxGroup.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._checkboxGroup.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._checkboxGroup];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._checkboxGroup = null;
        this._SafeStr_4066 = null;
    }
}
