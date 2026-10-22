import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { FloorDrawingPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/FloorDrawingPreset';
import type { AssetButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonRowPreset';
import type { CenteredContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CenteredContainerPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class FloorEditorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::FloorEditorPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: AssetButtonRowPreset, param5: FloorDrawingPreset) {
        super(param1, param2, param3);
        this._SafeStr_5514 = param4;
        this._drawingPreset = param5;
        let _loc6_: IBorderWindow = asGuarded(param2.createLayout("border_view"), isIBorderWindow);
        _loc6_.color = param3.advancedBackgroundColor;
        this._SafeStr_4899 = param2.createCenteredContainerPreset(this._drawingPreset, 5, _loc6_);
        this._SafeStr_2221 = param2.createSimpleListView(true, [this._SafeStr_5514, this._SafeStr_4899]);
        this._SafeStr_2221.spacing = param3.genericVerticalSpacing;
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._container.addChild(this._SafeStr_2221.window);
    }

    declare private _container: IWindowContainer;

    declare private _SafeStr_2221: SimpleListViewPreset;

    declare private _SafeStr_5514: AssetButtonRowPreset;

    declare private _drawingPreset: FloorDrawingPreset;

    declare private _SafeStr_4899: CenteredContainerPreset;

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2221];
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2221.resizeToWidth(param1);
        this._container.width = param1;
        this._container.height = this._SafeStr_2221.window.height;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_2221 = null;
        this._SafeStr_5514 = null;
        this._drawingPreset = null;
        this._SafeStr_4899 = null;
    }
}
