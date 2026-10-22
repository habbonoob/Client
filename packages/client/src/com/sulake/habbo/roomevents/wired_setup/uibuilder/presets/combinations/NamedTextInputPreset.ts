import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NamedTextInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::NamedTextInputPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: TextInputParam, param5: string, param6: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._textPreset = param2.createText(param5, new TextParam(0, param6));
        this._textPreset.window.y = param3.namedTextYOffset;
        this._textInputPreset = param2.createTextInput(param4);
        this._textPreset.window.y = param3.namedInputOffset;
        this._container.spacing = param3.genericHorizontalSpacing;
        this._container.addListItem(this._textPreset.window);
        this._container.addListItem(this._textInputPreset.window);
        this._container.height = Math.max(this._textPreset.window.height, this._textInputPreset.window.height) | 0;
    }

    declare private _container: IItemListWindow;

    declare private _textPreset: TextPreset;

    declare private _textInputPreset: TextInputPreset;

    public override get staticWidth(): number {
        if (this.hasStaticWidth()) {
            return this._container.width;
        }
        throw new Exception("Text input has no static width");
    }

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return [this._textPreset, this._textInputPreset];
    }

    public get text(): string {
        return this._textInputPreset.text;
    }

    public set text(param1: string) {
        this._textInputPreset.text = param1;
    }

    public override hasStaticWidth(): boolean {
        return this._textInputPreset.hasStaticWidth();
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._textPreset.resizeToWidth(this._textPreset.width);
        this._textInputPreset.resizeToWidth(param1 - this._textInputPreset.window.x);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._textPreset = null;
        this._textInputPreset = null;
    }

    public addEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._textInputPreset.addEventListener(param1, param2);
    }

    public removeEventListener(param1: string, param2: (...args: any[]) => any): void {
        this._textInputPreset.removeEventListener(param1, param2);
    }
}
