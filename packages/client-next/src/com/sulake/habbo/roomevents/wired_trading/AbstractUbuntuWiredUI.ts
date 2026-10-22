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

    declare private _framePreset: FramePreset;

    declare private _footerPreset: FooterPreset;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _presetManager: PresetManager;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _SafeStr_14688: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager) {
        this.onSaveClicked = this.onSaveClicked.bind(this);
        this.initInstanceFields();
        this._roomEvents = param1;
        this._presetManager = param2;
        this._footerPreset = this.createFooterPreset();
    }

    protected createFooterPreset(): FooterPreset {
        return this.presetManager.createFooterPreset(this.onSaveClicked, this.onCloseClicked);
    }

    public get footerPreset(): FooterPreset {
        return this._footerPreset;
    }

    public onSaveClicked(): void {
    }

    public onCloseClicked = (): void => {
        this.hide();
    };

    public isShowing(): boolean {
        return this._framePreset != null && this._framePreset.window.parent != null && this._framePreset.window.visible;
    }

    public get xOffsetFromCenter(): number {
        return 0;
    }

    protected showFrame(): void {
        let _loc1_: IDesktopWindow = null;
        if (!this.isShowing()) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._framePreset.window);
            }
            if (!this.isRememberLocation || !this._SafeStr_14688) {
                this._framePreset.window.center();
                this._framePreset.window.x += this.xOffsetFromCenter;
                this._SafeStr_14688 = true;
            }
        }
        this._framePreset.window.activate();
    }

    public get window(): IWindow {
        return this._framePreset.window;
    }

    public forgetLocation(): void {
        this._SafeStr_14688 = false;
    }

    protected get isRememberLocation(): boolean {
        return false;
    }

    protected get isBoundToParentRect(): boolean {
        return false;
    }

    public hide(): void {
        this.hideFrame();
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

    protected set framePreset(param1: FramePreset) {
        this._framePreset = param1;
        if (this.isBoundToParentRect) {
            param1.window.setParamFlag(32, true);
        }
    }

    protected get framePreset(): FramePreset {
        return this._framePreset;
    }

    protected get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    protected get localization(): IHabboLocalizationManager {
        return this._roomEvents.localization;
    }

    protected get presetManager(): PresetManager {
        return this._presetManager;
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
