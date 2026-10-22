import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { BitmapViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/BitmapViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { VariableFxVisualizer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxVisualizer';
import { VariableFxPreviewStatus } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxPreviewStatus';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxPreviewPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxPreviewPreset'); }

    private static readonly PREVIEW_WIDTH: number = 280;
    private static readonly PREVIEW_HEIGHT: number = 96;
    private static readonly PREVIEW_ANIMATION_INTERVAL_MS: number = 16;
    private static readonly PREVIEW_ZOOM: number = 2;

    declare private _bitmapPreset: BitmapViewPreset;

    declare private _status: VariableFxPreviewStatus;

    declare private _SafeStr_14479: VariableFxVisualizer;

    declare private _SafeStr_5776: VariableFxAssetProvider;

    declare private _rendererRegistry: VariableFxRendererRegistry;

    declare private _SafeStr_14217: Timer;

    private _zoom: number = 1;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._bitmapPreset = param2.createBitmapViewPreset(true);
        this._bitmapPreset.setBitmapSize(280, 96);
        this._bitmapPreset.bitmapWindow.fitSizeToContents = false;
        this._bitmapPreset.bitmapWindow.disposesBitmap = false;
        this._status = new VariableFxPreviewStatus();
        this._SafeStr_14217 = new Timer(16);
        this._SafeStr_14217.addEventListener("timer", this.onAnimationTimer);
    }

    public get zoom(): number {
        return this._zoom;
    }

    public init(param1: VariableFxEditorState): void {
        this.ensureVisualizerDependencies();
        this.refresh(param1);
    }

    public randomize(param1: VariableFxEditorState): void {
        let _loc2_: number = getTimer();
        this._status.randomize(param1);
        this.ensureVisualizerDependencies();
        if (this._SafeStr_14479 == null) {
            this._SafeStr_14479 = new VariableFxVisualizer(param1.toRuntimeConfig(), this._status.toStatusData(param1), _loc2_, this._SafeStr_5776, this._rendererRegistry);
            this.renderCurrentFrame(_loc2_, true);
        } else {
            this._SafeStr_14479.updateData(this._status.toStatusData(param1), _loc2_);
            this.renderCurrentFrame(_loc2_);
        }
        this.startAnimation();
    }

    public refresh(param1: VariableFxEditorState): void {
        let _loc2_: number = getTimer();
        this.ensureVisualizerDependencies();
        this.disposeVisualizer();
        this._SafeStr_14479 = new VariableFxVisualizer(param1.toRuntimeConfig(), this._status.toStatusData(param1), _loc2_, this._SafeStr_5776, this._rendererRegistry);
        this.renderCurrentFrame(_loc2_, true);
        this.startAnimation();
    }

    private renderCurrentFrame(param1: number, param2: boolean = false): boolean {
        let _loc3_: boolean = false;
        let _loc4_: VariableFxFrame = null;
        if (this._SafeStr_14479 == null) {
            this.updatePreviewScale(null);
            this._bitmapPreset.bitmapWindow.bitmap = null;
            return false;
        }
        _loc3_ = this._SafeStr_14479.update(param1);
        _loc4_ = this._SafeStr_14479.frame;
        if (param2) {
            this.updatePreviewScale(_loc4_);
        }
        if (!_loc3_ && this._bitmapPreset.bitmapWindow.bitmap == _loc4_.bitmapData) {
            return false;
        }
        this._bitmapPreset.bitmapWindow.bitmap = _loc4_.bitmapData;
        return _loc3_;
    }

    private updatePreviewScale(param1: VariableFxFrame): void {
        let _loc2_: number = 1;
        if (param1 != null && param1.bitmapData != null && param1.width * 2 <= 280 && param1.height * 2 <= 96) {
            _loc2_ = 2;
        }
        this._bitmapPreset.bitmapWindow.zoomX = _loc2_;
        this._bitmapPreset.bitmapWindow.zoomY = _loc2_;
        this._zoom = _loc2_;
    }

    private startAnimation(): void {
        if (!this._SafeStr_14217.running) {
            this._SafeStr_14217.start();
        }
    }

    private stopAnimation(): void {
        if (this._SafeStr_14217.running) {
            this._SafeStr_14217.stop();
        }
    }

    private onAnimationTimer = (param1: TimerEvent): void => {
        let _loc2_: number = 0;
        if (this._SafeStr_14479 == null) {
            this.stopAnimation();
            return;
        }
        _loc2_ = getTimer();
        this.renderCurrentFrame(_loc2_);
    };

    private ensureVisualizerDependencies(): void {
        if (this._SafeStr_5776 == null) {
            this._SafeStr_5776 = this._roomEvents.variableFxAssetProvider;
        }
        if (this._rendererRegistry == null) {
            this._rendererRegistry = this._roomEvents.variableFxRendererRegistry;
        }
    }

    private disposeVisualizer(): void {
        if (this._SafeStr_14479 != null) {
            this._SafeStr_14479.dispose();
            this._SafeStr_14479 = null;
        }
    }

    public override get window(): IWindow {
        return this._bitmapPreset.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._bitmapPreset.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return 280;
    }

    protected override get childPresets(): any[] {
        return [this._bitmapPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._bitmapPreset.bitmapWindow.bitmap = null;
        this.disposeVisualizer();
        this.stopAnimation();
        this._SafeStr_14217.removeEventListener("timer", this.onAnimationTimer);
        super.dispose();
        this._bitmapPreset = null;
        this._status = null;
        this._SafeStr_5776 = null;
        this._rendererRegistry = null;
        this._SafeStr_14217 = null;
    }
}
