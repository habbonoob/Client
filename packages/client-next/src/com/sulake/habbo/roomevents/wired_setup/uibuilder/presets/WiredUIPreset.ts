import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/IWiredUIPreset';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SpacerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { AlignCenterWrapperPreset, AlignRightWrapperPreset, FloatVerticallyPreset, StaticHeightPreset, WindowWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class WiredUIPreset implements IWiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::WiredUIPreset'); }

    private _SafeStr_14679: boolean = false;
    private _disposed: boolean = false;

    declare protected _roomEvents: HabboUserDefinedRoomEvents;

    declare protected _presetManager: PresetManager;

    declare protected _SafeStr_2144: WiredStyle;

    declare private _SafeStr_4150: SpacerPreset;

    private _blendingBackgroundColor: number = 0;
    private _cacheWidth: number = -1;

    declare private _disabled: boolean;
    static { (this.prototype as any)._disabled = false; }

    declare private _invisibilityListener: WiredUIPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        this.initInstanceFields();
        this._roomEvents = param1;
        this._presetManager = param2;
        this._SafeStr_2144 = param3;
    }

    protected static toArray(param1: any): any[] {
        let _loc2_: any[] = [];
        for (const _loc3_ of valuesOf(param1)) {
            _loc2_.push(_loc3_);
        }
        return _loc2_;
    }

    public get window(): IWindow {
        return null;
    }

    public resizeToWidth(param1: number): void {
        this._cacheWidth = param1;
    }

    public resize(): void {
        if (this._cacheWidth != -1) {
            this.resizeToWidth(this._cacheWidth);
        }
    }

    public hasStaticWidth(): boolean {
        return false;
    }

    public get staticWidth(): number {
        return -1;
    }

    public alignRight(): WiredUIPreset {
        return new AlignRightWrapperPreset(this._roomEvents, this._presetManager, this._SafeStr_2144, this);
    }

    public alignCenter(): WiredUIPreset {
        return new AlignCenterWrapperPreset(this._roomEvents, this._presetManager, this._SafeStr_2144, this);
    }

    public staticHeight(param1: number): WiredUIPreset {
        return new StaticHeightPreset(this._roomEvents, this._presetManager, this._SafeStr_2144, this, param1);
    }

    public floatVertically(): WiredUIPreset {
        return new FloatVerticallyPreset(this._roomEvents, this._presetManager, this._SafeStr_2144, this);
    }

    public wrapWindow(param1: IWindow, param2: boolean = false): WiredUIPreset {
        return new WindowWrapperPreset(this._roomEvents, this._presetManager, this._SafeStr_2144, param1, param2);
    }

    public noDisable(): WiredUIPreset {
        this.window.tags.push("DO_NOT_DISABLE");
        return this;
    }

    public halfBlend(): WiredUIPreset {
        this.window.blend = 0.5;
        this.window.tags.push("HALF_BLEND");
        return this;
    }

    public set disabled(param1: boolean) {
        if (this._disabled == param1) {
            return;
        }
        this._disabled = param1;
        this.updateDisabledState();
    }

    public updateDisabledState(): void {
        Util.disableSection(this.window, this._disabled);
        if (!this._disabled) {
            for (const _loc1_ of this.childPresets ?? []) {
                _loc1_.updateDisabledState();
            }
        }
    }

    protected get childPresets(): any[] {
        return [];
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set visible(param1: boolean) {
        if (this.window.visible != param1) {
            this.window.visible = param1;
            if (this._invisibilityListener != null) {
                this._invisibilityListener.onInvisibilityChanged(this, param1);
            }
        }
    }

    public get visible(): boolean {
        return this.window.visible;
    }

    public set invisibilityListener(param1: WiredUIPreset) {
        this._invisibilityListener = param1;
    }

    protected onInvisibilityChanged(param1: WiredUIPreset, param2: boolean): void {
    }

    protected loc(param1: string): string {
        return this._roomEvents.localization.getLocalization(param1, param1);
    }

    protected l(param1: string): string {
        return this._roomEvents.localization.getLocalization("wiredfurni.params." + param1, param1);
    }

    protected get localizations(): IHabboLocalizationManager {
        return this._roomEvents.localization;
    }

    protected get disposing(): boolean {
        return this._SafeStr_14679;
    }

    public dispose(): void {
        this._SafeStr_14679 = true;
        if (this._disposed) {
            return;
        }
        this._SafeStr_4150 = null;
        this._roomEvents = null;
        this._SafeStr_2144 = null;
        this._presetManager = null;
        this._invisibilityListener = null;
        for (const _loc1_ of this.childPresets ?? []) {
            _loc1_.dispose();
        }
        this._disposed = true;
    }

    public set blendSpacer(param1: SpacerPreset) {
        this._SafeStr_4150 = param1;
        this.updateBackgroundColorBlending();
    }

    protected set blendingBackgroundColor(param1: number) {
        this._blendingBackgroundColor = param1;
        this.updateBackgroundColorBlending();
    }

    private updateBackgroundColorBlending(): void {
        let _loc1_: boolean = false;
        if (this._SafeStr_4150 != null) {
            _loc1_ = this._blendingBackgroundColor != 0;
            this._SafeStr_4150.backgroundEnabled = _loc1_;
            if (_loc1_) {
                this._SafeStr_4150.backgroundColor = this._blendingBackgroundColor;
            }
        }
    }

    protected resolveAssetFullName(param1: string): string {
        let _loc2_: string = "wired_styles_" + this._SafeStr_2144.name + "_" + param1;
        if (this._roomEvents.windowManager.assets.getAssetByName(_loc2_) != null) {
            return _loc2_;
        }
        return "wired_" + param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
