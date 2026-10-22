import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { InputSourceControlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/inputsources/InputSourceControlPreset';
import type { SourceTypeSelectorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SourceTypeSelectorPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class InputSourceSection extends AbstractSectionPreset implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::InputSourceSection'); }

    declare private _SafeStr_14402: InputSourceControlPreset;

    declare private _SafeStr_14403: boolean;
    static { (this.prototype as any)._SafeStr_14403 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: InputSourceControlPreset, param6: any[] = null, param7: boolean = false) {
        super(param1, param2, param3);
        this._SafeStr_14402 = param5;
        let _loc8_: SectionParam = null;
        if (param5.baseSourceType == WiredInputSourcePicker.MERGED_SOURCE && !param7) {
            _loc8_ = new SectionParam(new SourceTypeSelectorParam(param6, this));
        }
        for (const _loc9_ of param5.dualPickHeaderOptions ?? []) {
            if (_loc8_ == null) {
                _loc8_ = new SectionParam();
            }
            _loc8_.addHeaderOption(_loc9_);
        }
        this._SafeStr_14403 = true;
        try {
            this.initializeSection(param4, param5, _loc8_);
        } finally {
            this._SafeStr_14403 = false;
        }
        this._SafeStr_14402.layoutRefreshCallback = this._SafeStr_2848.refreshAlignments;
    }

    public set sourceType(param1: number) {
        if (this._SafeStr_14403) {
            return;
        }
        this._SafeStr_14402.changeMergedType(param1);
    }

    public syncSourceType(param1: any[], param2: number): void {
        let _loc3_: SourceTypeSelectorPreset = this._SafeStr_2848.getSourceTypeSelector();
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_14403 = true;
        try {
            _loc3_.reinit(param1, param2);
        } finally {
            this._SafeStr_14403 = false;
        }
        this._SafeStr_2848.refreshAlignments();
    }

    public get control(): InputSourceControlPreset {
        return this._SafeStr_14402;
    }

    public get baseSourceType(): number {
        return this._SafeStr_14402.baseSourceType;
    }

    public get id(): number {
        return this._SafeStr_14402.id;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._SafeStr_14402.layoutRefreshCallback = null;
        super.dispose();
        this._SafeStr_14402 = null;
    }
}
