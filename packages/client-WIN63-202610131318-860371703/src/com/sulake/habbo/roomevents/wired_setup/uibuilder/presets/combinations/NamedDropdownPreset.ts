import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import type { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class NamedDropdownPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.combinations::NamedDropdownPreset'); }

    declare private _container: IWindowContainer;

    declare private _SafeStr_14347: SimpleListViewPreset;

    declare private _textPreset: TextPreset;

    declare private _dropdownPreset: DropdownPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: DropdownParam, param5: string, param6: boolean = false) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._textPreset = param2.createText(param5, new TextParam(0, param6));
        this._dropdownPreset = param2.createDropdown(param4);
        this._textPreset.window.y = param3.namedDropdownOffset;
        this._SafeStr_14347 = param2.createSimpleListView(false, [this._textPreset, this._dropdownPreset], true);
        this._container.addChild(this._SafeStr_14347.window);
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

    public reinit(param1: ExpandableDropdownOption[], param2: number): void {
        this._dropdownPreset.reinit(param1, param2);
    }

    public reset(): void {
        this._dropdownPreset.reset();
    }

    public get nameWidth(): number {
        return this._textPreset.width;
    }

    public set nameWidth(param1: number) {
        this._textPreset.width = param1;
        this._SafeStr_14347.resize();
    }

    public override hasStaticWidth(): boolean {
        return this._dropdownPreset.hasStaticWidth();
    }

    public override get staticWidth(): number {
        if (this.hasStaticWidth()) {
            return this._container.width;
        }
        throw new Exception("Named dropdown has no static width");
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_14347.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_14347];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_14347.dispose();
        this._SafeStr_14347 = null;
        this._textPreset = null;
        this._dropdownPreset = null;
    }
}
