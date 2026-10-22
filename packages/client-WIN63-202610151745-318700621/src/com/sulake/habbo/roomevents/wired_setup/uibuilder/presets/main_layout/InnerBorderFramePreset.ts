import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SpacerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacerPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class InnerBorderFramePreset extends FramePreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::InnerBorderFramePreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: (...args: any[]) => any, param6: string, param7: number, param8: boolean = false) {
        super(param1, param2, param3, param4, param5, param6, param7, param8);
    }

    protected override createListView(param1: any[]): void {
        let _loc8_: SpacerPreset = null;
        let _loc9_: number = 0;
        let _loc12_: WiredUIPreset = null;
        let _loc10_: SimpleListViewPreset = null;
        let _loc7_: PaddedContainerPreset = null;
        let _loc2_: IBorderWindow = this._SafeStr_2144.createInnerBorder();
        let _loc4_: number = this._SafeStr_2144.sectionSpacing;
        let _loc3_: any[] = [];
        let _loc5_: any[] = [];
        let _loc6_: boolean = false;
        let _loc11_: boolean = false;
        _loc9_ = 0;
        while (_loc9_ < param1.length) {
            _loc12_ = param1[_loc9_];
            if (_loc12_ instanceof FooterPreset) {
                castTo(_loc12_, FooterPreset).splitterVisible = false;
                _loc11_ = true;
                _loc10_ = this._presetManager.createSimpleListView(true, _loc5_);
                _loc10_.spacing = 0;
                _loc10_.backgroundColor = this._SafeStr_2144.backgroundColor;
                _loc7_ = this._presetManager.createPaddedContainerPreset(_loc10_, 9, 8, 9, 8, _loc2_);
                _loc3_.push(_loc7_);
            }
            if (!_loc6_ || _loc11_) {
                _loc3_.push(_loc12_);
            } else {
                _loc5_.push(_loc12_);
                if (_loc5_.length > 1) {
                    _loc8_ = this._presetManager.createSpacer(_loc4_);
                    _loc12_.blendSpacer = _loc8_;
                    _loc5_.push(_loc8_);
                }
                if (_loc5_.length == 1) {
                    if (_loc12_ instanceof SectionPreset) {
                        castTo(_loc12_, SectionPreset).splitterVisible = false;
                    } else if (_loc12_ instanceof AbstractSectionPreset) {
                        castTo(_loc12_, AbstractSectionPreset).splitterVisible = false;
                    }
                }
            }
            if (_loc12_ instanceof HeaderPreset) {
                this._headerPreset = _loc12_ instanceof HeaderPreset ? _loc12_ : null;
                _loc6_ = true;
            }
            _loc9_++;
        }
        this._listPreset = this._presetManager.createSimpleListView(true, _loc3_);
        this._listPreset.backgroundColor = this._SafeStr_2144.frameColor;
    }
}
