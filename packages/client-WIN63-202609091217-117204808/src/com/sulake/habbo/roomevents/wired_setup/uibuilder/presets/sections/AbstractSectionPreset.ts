import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class AbstractSectionPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::AbstractSectionPreset'); }

    declare protected _SafeStr_2848: SectionPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
    }

    protected initializeSection(param1: string, param2: WiredUIPreset, param3: SectionParam = null): void {
        this._SafeStr_2848 = this._presetManager.createSection(param1, param2, param3);
    }

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    public set sectionTitle(param1: string) {
        this._SafeStr_2848.titleText = param1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    public set splitterVisible(param1: boolean) {
        this._SafeStr_2848.splitterVisible = param1;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848];
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2848 = null;
    }
}
