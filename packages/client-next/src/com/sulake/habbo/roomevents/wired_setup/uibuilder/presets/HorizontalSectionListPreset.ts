import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class HorizontalSectionListPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::HorizontalSectionListPreset'); }

    declare private _SafeStr_2221: IItemListWindow;

    declare private _splitters: IWindow[];

    declare private _childPresets: any[];

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[]) {
        let _loc5_: number = 0;
        let _loc6_: WiredUIPreset = null;
        let _loc7_: IWindow = null;
        super(param1, param2, param3);
        this._SafeStr_2221 = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._SafeStr_2221.spacing = 0;
        this._splitters = [];
        this._childPresets = param4;
        _loc5_ = 0;
        while (_loc5_ < param4.length) {
            _loc6_ = param4[_loc5_];
            if (_loc5_ > 0) {
                _loc7_ = param3.createSplitterVerticalView();
                _loc7_.setParamFlag(16, false);
                this._splitters.push(_loc7_);
                this._SafeStr_2221.addListItem(_loc7_);
            }
            this._SafeStr_2221.addListItem(_loc6_.window);
            _loc5_ += 1;
        }
    }

    public override get window(): IWindow {
        return this._SafeStr_2221;
    }

    public override resizeToWidth(param1: number): void {
        let _loc6_: any = null;
        let _loc4_: number = 0;
        super.resizeToWidth(param1);
        let _loc8_: number = 0;
        if (this._splitters.length > 0) {
            _loc8_ = this._splitters[0].width;
        }
        let _loc10_: number = param1 - this._splitters.length * _loc8_;
        let _loc5_: number = 0;
        for (_loc6_ of this._childPresets ?? []) {
            if (_loc6_.hasStaticWidth()) {
                _loc10_ = _loc10_ - _loc6_.staticWidth | 0;
            } else {
                _loc5_ += 1;
            }
        }
        let _loc7_: number = Math.max(0, _loc10_ / _loc5_ | 0) | 0;
        let _loc2_: WiredUIPreset = null;
        let _loc3_: number = 0;
        for (_loc6_ of this._childPresets ?? []) {
            if (_loc6_.hasStaticWidth()) {
                _loc6_.resizeToWidth(_loc6_.staticWidth);
            } else {
                _loc2_ = _loc6_;
                _loc6_.resizeToWidth(_loc7_);
                _loc10_ -= _loc7_;
            }
            _loc4_ = _loc6_.window.height | 0;
            if (_loc4_ > _loc3_) {
                _loc3_ = _loc4_;
            }
        }
        if (_loc10_ > 0 && _loc2_ != null) {
            _loc2_.resizeToWidth(_loc7_ + _loc10_);
            if (_loc4_ > _loc3_) {
                _loc3_ = _loc4_;
            }
        }
        for (const _loc9_ of this._splitters ?? []) {
            _loc9_.height = _loc3_ + this._SafeStr_2144.sectionSpacing;
        }
        this._SafeStr_2221.height = _loc3_;
        this._SafeStr_2221.width = param1;
        this._SafeStr_2221.arrangeListItems();
    }

    protected override get childPresets(): any[] {
        return this._childPresets;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2221.dispose();
        this._SafeStr_2221 = null;
        this._childPresets = null;
        this._splitters = null;
    }
}
