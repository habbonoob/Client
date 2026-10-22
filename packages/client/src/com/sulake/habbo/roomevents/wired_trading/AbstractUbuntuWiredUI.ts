import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class AbstractUbuntuWiredUI implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading::AbstractUbuntuWiredUI'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager) {
        this.onSaveClicked = this.onSaveClicked.bind(this);
        this.initInstanceFields();
        this._roomEvents = param1;
        this._presetManager = param2;
        this._footerPreset = this.createFooterPreset();
    }

    declare private _presetManager: PresetManager;

    private _SafeStr_5358: boolean = false;

    declare private _footerPreset: FooterPreset;

    public get footerPreset(): FooterPreset {
        return this._footerPreset;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get xOffsetFromCenter(): number {
        return 0;
    }

    public get window(): IWindow {
        return this._framePreset.window;
    }

    declare private _framePreset: FramePreset;

    protected get framePreset(): FramePreset {
        return this._framePreset;
    }

    protected set framePreset(param1: FramePreset) {
        this._framePreset = param1;
        if (this.isBoundToParentRect) {
            param1.window.setParamFlag(32, true);
        }
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    protected get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    protected get isRememberLocation(): boolean {
        return false;
    }

    protected get isBoundToParentRect(): boolean {
        return false;
    }

    protected get localization(): IHabboLocalizationManager {
        return this._roomEvents.localization;
    }

    protected get presetManager(): PresetManager {
        return this._presetManager;
    }

    public onSaveClicked(): void {
    }

    public onCloseClicked = (): void => {
        this.hide();
    };

    public isShowing(): boolean {
        return this._framePreset != null && this._framePreset.window.parent != null && this._framePreset.window.visible;
    }

    public forgetLocation(): void {
        this._SafeStr_5358 = false;
    }

    public hide(): void {
        this.hideFrame();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._framePreset.dispose();
        this._framePreset = null;
        this._footerPreset = null;
        this._roomEvents = null;
        this._presetManager = null;
        this._disposed = true;
    }

    protected createFooterPreset(): FooterPreset {
        return this.presetManager.createFooterPreset(this.onSaveClicked, this.onCloseClicked);
    }

    protected showFrame(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._framePreset.window);
            }
            if (!this.isRememberLocation || !this._SafeStr_5358) {
                this._framePreset.window.center();
                this._framePreset.window.x += this.xOffsetFromCenter;
                this._SafeStr_5358 = true;
            }
        }
        this._framePreset.window.activate();
    }

    protected hideFrame(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._framePreset.window);
            }
        }
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
