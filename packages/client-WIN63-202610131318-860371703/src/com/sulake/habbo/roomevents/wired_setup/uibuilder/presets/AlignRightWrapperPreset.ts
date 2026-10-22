import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class AlignRightWrapperPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::AlignRightWrapperPreset'); }

    declare private _window: IWindowContainer;

    declare private _subPreset: WiredUIPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: WiredUIPreset) {
        super(param1, param2, param3);
        this._window = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._subPreset = param4;
        this._window.addChild(this._subPreset.window);
    }

    public override get window(): IWindow {
        return this._window;
    }

    public override resizeToWidth(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        super.resizeToWidth(param1);
        if (this._subPreset.hasStaticWidth()) {
            _loc2_ = this._subPreset.staticWidth;
            _loc3_ = Math.max(0, param1 - _loc2_) | 0;
            this._subPreset.window.x = _loc3_;
            this._subPreset.resizeToWidth(this._subPreset.staticWidth);
            return;
        }
        throw new Error("Attempting to align UI preset to the right is only possible if a static width is given");
    }

    protected override get childPresets(): any[] {
        return [this._subPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._subPreset = null;
    }
}
