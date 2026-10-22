import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';

export class DropdownParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::DropdownParam'); }

    constructor(param1: string, param2: ExpandableDropdownOption[] = null, param3: (...args: any[]) => any = null, param4: string = "") {
        this._caption = param1;
        this._options = param2;
        this._onChangeCallback = param3;
        this._showMoreLocalization = param4;
    }

    declare private _options: ExpandableDropdownOption[];

    declare private _showMoreLocalization: string;

    declare private _caption: string;

    public get caption(): string {
        return this._caption;
    }

    declare private _onChangeCallback: (...args: any[]) => any;

    public get onChangeCallback(): (...args: any[]) => any {
        return this._onChangeCallback;
    }

    public get options(): ExpandableDropdownOption[] {
        return this._options;
    }

    public get showMoreLocalization(): string {
        return this._showMoreLocalization;
    }
}
