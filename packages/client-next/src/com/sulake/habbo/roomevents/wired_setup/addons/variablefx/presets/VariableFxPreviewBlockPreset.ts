import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableFxPreviewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxPreviewPreset';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { AssetButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxPreviewBlockPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxPreviewBlockPreset'); }

    private static readonly HEIGHT: number = 112;
    private static readonly _SafeStr_14637: number = 6;
    private static readonly _SafeStr_14638: number = 6;
    private static readonly ZOOM_RIGHT: number = 6;
    private static readonly BUTTON_RIGHT: number = 5;
    private static readonly BUTTON_BOTTOM: number = 5;

    declare private _window: IWindowContainer;

    declare private _previewPreset: VariableFxPreviewPreset;

    declare private _SafeStr_14639: TextPreset;

    declare private _SafeStr_14640: TextPreset;

    declare private _SafeStr_14641: AssetButtonPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: VariableFxPreviewPreset, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        let _loc7_: TextParam = new TextParam(1, true);
        let _loc6_: TextParam = new TextParam(0, false);
        _loc7_.textColor = param3.softTextColor;
        _loc6_.textColor = param3.softTextColor;
        this._window = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._previewPreset = param4;
        this._SafeStr_14639 = param2.createText("${wiredfurni.params.variablefx.preview}", _loc7_);
        this._SafeStr_14640 = param2.createText("", _loc6_);
        this._SafeStr_14641 = param2.createAssetButtonPreset("variablefx_randomize", "${wiredfurni.params.variablefx.preview.randomize}", param5);
        this._window.addChild(this._previewPreset.window);
        this._window.addChild(this._SafeStr_14639.window);
        this._window.addChild(this._SafeStr_14640.window);
        this._window.addChild(this._SafeStr_14641.window);
    }

    public refreshZoomLabel(): void {
        this._SafeStr_14640.text = this._roomEvents.localization.getLocalizationWithParams("wiredfurni.params.variablefx.preview.zoom", "zoom: %level%", "level", String(this._previewPreset.zoom));
        this._SafeStr_14640.window.x = Math.max(6, this._window.width - this._SafeStr_14640.width - 6) | 0;
    }

    public override get window(): IWindow {
        return this._window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._window.width = param1;
        this._window.height = 112;
        this._previewPreset.resizeToWidth(this._previewPreset.staticWidth);
        this._previewPreset.window.x = Math.max(0, (param1 - this._previewPreset.staticWidth) / 2 | 0) | 0;
        this._previewPreset.window.y = Math.max(0, (112 - this._previewPreset.window.height) / 2 | 0) | 0;
        this._SafeStr_14641.resizeToWidth(this._SafeStr_14641.staticWidth);
        this._SafeStr_14641.window.x = Math.max(0, param1 - this._SafeStr_14641.staticWidth - 5) | 0;
        this._SafeStr_14641.window.y = Math.max(0, 112 - this._SafeStr_14641.window.height - 5) | 0;
        this._SafeStr_14639.window.x = 6;
        this._SafeStr_14639.window.y = 6;
        this._SafeStr_14640.window.y = 6;
        this.refreshZoomLabel();
        this._SafeStr_14639.resizeToWidth(Math.max(0, this._SafeStr_14640.window.x - 6 - this._SafeStr_2144.genericHorizontalSpacing) | 0);
    }

    protected override get childPresets(): any[] {
        return [this._previewPreset, this._SafeStr_14639, this._SafeStr_14640, this._SafeStr_14641];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._previewPreset = null;
        this._SafeStr_14639 = null;
        this._SafeStr_14640 = null;
        this._SafeStr_14641 = null;
    }
}
