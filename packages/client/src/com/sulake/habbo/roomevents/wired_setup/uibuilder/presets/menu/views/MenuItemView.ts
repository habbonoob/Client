import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { MenuItem } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/MenuItem';
import type { MenuPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/MenuPreset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { Util } from '@/com/sulake/habbo/roomevents/Util';

export class MenuItemView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.menu.views::MenuItemView'); }

    constructor(param1: MenuPreset, param2: MenuItem) {
        this._preset = param1;
        this._menuItem = param2;
        this._window = asGuarded(param1.menuItemTemplate.clone(), isIRegionWindow);
        this.textWindow.text = param2.name;
        this.checkboxWindow.visible = param2.hasCheckbox;
        if (param2.tooltip != null && param2.tooltip.length > 0) {
            this._window.toolTipCaption = param2.tooltip;
        }
        this._window.addEventListener("WME_OVER", this.onHover);
        this._window.addEventListener("WME_OUT", this.onHoverEnd);
        this._window.addEventListener("WME_CLICK", this.onClick);
        this.checkboxWindow.addEventListener("WME_OVER", this.onCheckboxHover);
        this.checkboxWindow.addEventListener("WME_OUT", this.onCheckboxHoverEnd);
        this.checkboxWindow.addEventListener("WE_SELECTED", this.onSelectedChange);
        this.checkboxWindow.addEventListener("WE_UNSELECTED", this.onSelectedChange);
        this.updateUI();
    }

    declare private _preset: MenuPreset;

    declare private _menuItem: MenuItem;

    private _hovered: boolean = false;
    private _SafeStr_5481: boolean = false;
    private _disabled: boolean = false;
    private _ignoreEvents: boolean = false;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _window: IRegionWindow;

    public get window(): IRegionWindow {
        return this._window;
    }

    public get selected(): boolean {
        if (this._menuItem.hasCheckbox) {
            return this.checkboxWindow.isSelected;
        }
        return false;
    }

    public set selected(param1: boolean) {
        this._ignoreEvents = true;
        if (this._menuItem.hasCheckbox) {
            if (param1) {
                this.checkboxWindow.select();
            } else {
                this.checkboxWindow.unselect();
            }
            if (this._menuItem.selectedChange != null) {
                this._menuItem.selectedChange(this.checkboxWindow.isSelected);
            }
            if (this._menuItem.onClick != null) {
                this._menuItem.onClick();
            }
        }
        this._ignoreEvents = false;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(param1: boolean) {
        this._disabled = param1;
        this.updateUI();
    }

    public get requestedMinWidth(): number {
        return this.textWindow.x + this.textWindow.width;
    }

    public get menuItem(): MenuItem {
        return this._menuItem;
    }

    private get textWindow(): ITextWindow {
        return asGuarded(this._window.findChildByName("text"), isITextWindow);
    }

    private get checkboxWindow(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("checkbox"), isICheckBoxWindow);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window = null;
        this._preset = null;
        this._menuItem = null;
        this._disposed = true;
    }

    private onSelectedChange = (param1: WindowEvent): void => {
        if (this._ignoreEvents) {
            return;
        }
        if (this._menuItem.selectedChange != null) {
            this._menuItem.selectedChange(this.checkboxWindow.isSelected);
        }
    };

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._disabled) {
            return;
        }
        if (this._menuItem.hasCheckbox) {
            this.selected = !this.selected;
        }
        if (this._menuItem.onClick != null) {
            this._menuItem.onClick();
        }
        if (!this._menuItem.hasCheckbox) {
            this._preset.requestClose();
        }
    };

    private onHoverEnd = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateUI();
    };

    private onHover = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateUI();
    };

    private onCheckboxHoverEnd = (param1: WindowMouseEvent): void => {
        this._SafeStr_5481 = false;
        this.updateUI();
    };

    private onCheckboxHover = (param1: WindowMouseEvent): void => {
        this._SafeStr_5481 = true;
        this.updateUI();
    };

    private updateUI(): void {
        this._window.background = (this._hovered || this._SafeStr_5481) && !this._disabled;
        Util.disableSection(this._window, this._disabled);
    }

    get [IDisposable](): true {
        return true;
    }
}
