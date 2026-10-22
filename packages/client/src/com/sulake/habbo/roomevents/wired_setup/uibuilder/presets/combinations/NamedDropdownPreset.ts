import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import type { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NamedDropdownPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::NamedDropdownPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: DropdownParam, param5: string, param6: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._textPreset = param2.createText(param5, new TextParam(0, param6));
        this._dropdownPreset = param2.createDropdown(param4);
        this._textPreset.window.y = param3.namedDropdownOffset;
        this._container.spacing = param3.genericHorizontalSpacing;
        this._container.addListItem(this._textPreset.window);
        this._container.addListItem(this._dropdownPreset.window);
        this._container.height = Math.max(this._textPreset.window.height, this._dropdownPreset.window.height) | 0;
    }

    declare private _container: IItemListWindow;

    declare private _textPreset: TextPreset;

    declare private _dropdownPreset: DropdownPreset;

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
        return [this._textPreset, this._dropdownPreset];
    }

    public get selectedId(): number {
        return this._dropdownPreset.selectedId;
    }

    public set selectedId(param1: number) {
        this._dropdownPreset.selectedId = param1;
    }

    public get selected(): ExpandableDropdownOption {
        return this._dropdownPreset.selected;
    }

    public override hasStaticWidth(): boolean {
        return this._dropdownPreset.hasStaticWidth();
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._textPreset.resizeToWidth(this._textPreset.width);
        this._dropdownPreset.resizeToWidth(param1 - this._dropdownPreset.window.x);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._textPreset = null;
        this._dropdownPreset = null;
    }

    public reinit(param1: ExpandableDropdownOption[], param2: number): void {
        this._dropdownPreset.reinit(param1, param2);
    }

    public reset(): void {
        this._dropdownPreset.reset();
    }
}
