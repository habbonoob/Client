import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NamedNumberInputPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::NamedNumberInputPreset'); }

    declare private _container: IItemListWindow;

    declare private _textPreset: TextPreset;

    declare private _numberInputPreset: NumberInputPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: NumberInputParam, param5: string, param6: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._textPreset = param2.createText(param5, new TextParam(0, param6));
        this._textPreset.window.y = param3.namedTextYOffset;
        this._numberInputPreset = param2.createNumberInput(param4);
        this._textPreset.window.y = param3.namedInputOffset;
        this._container.spacing = param3.genericHorizontalSpacing;
        this._container.addListItem(this._textPreset.window);
        this._container.addListItem(this._numberInputPreset.window);
        this._container.height = Math.max(this._textPreset.window.height, this._numberInputPreset.window.height) | 0;
    }

    public get value(): number {
        return this._numberInputPreset.value;
    }

    public set value(param1: number) {
        this._numberInputPreset.value = param1;
    }

    public reset(): void {
        this._numberInputPreset.reset();
    }

    public set onValueChange(param1: (...args: any[]) => any) {
        this._numberInputPreset.onValueChange = param1;
    }

    public get nameWidth(): number {
        return this._textPreset.width;
    }

    public set nameWidth(param1: number) {
        this._textPreset.width = param1;
        this._container.arrangeListItems();
    }

    public override hasStaticWidth(): boolean {
        return this._numberInputPreset.hasStaticWidth();
    }

    public override get staticWidth(): number {
        if (this.hasStaticWidth()) {
            return this._container.width;
        }
        throw new Exception("Named number input has no static width");
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._textPreset.resizeToWidth(this._textPreset.width);
        this._numberInputPreset.resizeToWidth(param1 - this._numberInputPreset.window.x);
    }

    protected override get childPresets(): any[] {
        return [this._textPreset, this._numberInputPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._textPreset = null;
        this._numberInputPreset = null;
    }
}
