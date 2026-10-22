import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import type { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { ExpandableDropdown } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdown';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class DropdownPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::DropdownPreset'); }

    declare private _container: IDropMenuWindow;

    declare private _staticWidth: number;
    static { (this.prototype as any)._staticWidth = 0; }

    declare private _controller: ExpandableDropdown;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: DropdownParam) {
        super(param1, param2, param3);
        this._container = param3.createDropdown();
        this._container.caption = param4.caption;
        this._staticWidth = param4.staticWidth;
        if (this._staticWidth >= 0) {
            this._container.width = this._staticWidth;
        }
        this._controller = new ExpandableDropdown(this._container, param4.showMoreLocalization, param4.onChangeCallback);
        this._controller.init(param4.options == null ? Array.from([]) : param4.options, -1);
    }

    public get selectedId(): number {
        return this._controller.selectedOptionId | 0;
    }

    public get selected(): ExpandableDropdownOption {
        return this._controller.selectedOption;
    }

    public set selectedId(param1: number) {
        this._controller.selectedOptionId = param1;
    }

    public reinit(param1: ExpandableDropdownOption[], param2: number): void {
        this._controller.init(param1, param2);
    }

    public reset(): void {
        this.reinit(Array.from([]), -1);
    }

    public get dropdownOptions(): ExpandableDropdownOption[] {
        return this._controller.dropdownOptions;
    }

    public requestOpen(): void {
        this._container.openMenu();
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = this._staticWidth >= 0 ? this._staticWidth : param1;
    }

    public override hasStaticWidth(): boolean {
        return this._staticWidth >= 0;
    }

    public override get staticWidth(): number {
        if (this._staticWidth >= 0) {
            return this._staticWidth;
        }
        throw new Exception("Dropdown with dynamic width has no static width");
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._controller.dispose();
    }
}
