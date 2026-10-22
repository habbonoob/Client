import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TextualButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::TextualButtonPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_2333 = param5;
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._textPreset = param2.createText(param4, new TextParam(0, false, 0, true));
        this._container.addChild(this._textPreset.window);
        this._container.addEventListener("WME_CLICK", this.onClick);
        this._container.mouseThreshold = 0;
    }

    declare private _container: IWindowContainer;

    declare private _textPreset: TextPreset;

    declare private _SafeStr_2333: (...args: any[]) => any;

    public override get window(): IWindow {
        return this._container;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    protected override get childPresets(): any[] {
        return [this._textPreset];
    }

    public set text(param1: string) {
        this._textPreset.text = param1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._textPreset = null;
        this._SafeStr_2333 = null;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_2333();
    };
}
