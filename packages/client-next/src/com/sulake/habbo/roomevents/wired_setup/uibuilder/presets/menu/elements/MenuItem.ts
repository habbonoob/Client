import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMenuElement } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/IMenuElement';

export class MenuItem implements IMenuElement {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.menu.elements::MenuItem'); }

    declare private _name: string;

    declare private _onClick: (...args: any[]) => any;

    declare private _tooltip: string;

    declare private _hasCheckbox: boolean;
    static { (this.prototype as any)._hasCheckbox = false; }

    declare private _selectedChange: (...args: any[]) => any;

    constructor(param1: string, param2: (...args: any[]) => any, param3: string = "", param4: boolean = false, param5: (...args: any[]) => any = null) {
        this._name = param1;
        this._onClick = param2;
        this._tooltip = param3;
        this._hasCheckbox = param4;
        this._selectedChange = param5;
    }

    public get name(): string {
        return this._name;
    }

    public get onClick(): (...args: any[]) => any {
        return this._onClick;
    }

    public get tooltip(): string {
        return this._tooltip;
    }

    public get hasCheckbox(): boolean {
        return this._hasCheckbox;
    }

    public get selectedChange(): (...args: any[]) => any {
        return this._selectedChange;
    }
}
