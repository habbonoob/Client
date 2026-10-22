import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { SpacerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacerPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';

export interface IWiredUIPreset extends IDisposable {
    get window(): IWindow;
    resizeToWidth(param1: number): void;
    hasStaticWidth(): boolean;
    get staticWidth(): number;
    alignRight(): WiredUIPreset;
    alignCenter(): WiredUIPreset;
    staticHeight(param1: number): WiredUIPreset;
    floatVertically(): WiredUIPreset;
    wrapWindow(param1: IWindow, param2?: boolean): WiredUIPreset;
    noDisable(): WiredUIPreset;
    halfBlend(): WiredUIPreset;
    set disabled(param1: boolean);
    updateDisabledState(): void;
    get disabled(): boolean;
    set visible(param1: boolean);
    get visible(): boolean;
    set blendSpacer(param1: SpacerPreset);
}
