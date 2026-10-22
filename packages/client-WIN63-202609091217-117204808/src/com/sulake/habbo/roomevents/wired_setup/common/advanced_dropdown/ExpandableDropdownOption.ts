import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ExpandableDropdownOption {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.advanced_dropdown::ExpandableDropdownOption'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _displayString: string;

    declare private _isAdvanced: boolean;
    static { (this.prototype as any)._isAdvanced = false; }

    constructor(param1: number, param2: string, param3: boolean = false) {
        this._id = param1;
        this._displayString = param2;
        this._isAdvanced = param3;
    }

    public get id(): number {
        return this._id;
    }

    public get displayString(): string {
        return this._displayString;
    }

    public get isAdvanced(): boolean {
        return this._isAdvanced;
    }
}
