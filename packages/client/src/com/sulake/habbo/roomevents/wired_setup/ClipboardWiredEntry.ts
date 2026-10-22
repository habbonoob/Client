import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClipboardWiredEntry {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::ClipboardWiredEntry'); }

    constructor(param1: any[], param2: string, param3: any[], param4: any[], param5: any[], param6: any[], param7: any[]) {
        this._intParams = param1;
        this._stringParam = param2;
        this._variableIds = param3;
        this._stuffIds = param4;
        this._stuffIds2 = param5;
        this._furniSourceTypes = param6;
        this._userSourceTypes = param7;
    }

    declare private _stringParam: string;

    declare private _variableIds: any[];

    declare private _stuffIds: any[];

    private _isFilter: boolean = false;
    private _isInvert: boolean = false;

    declare private _intParams: any[];

    public get intParams(): any[] {
        return this._intParams;
    }

    declare private _stuffIds2: any[];

    public get stuffIds2(): any[] {
        return this._stuffIds2;
    }

    declare private _furniSourceTypes: any[];

    public get furniSourceTypes(): any[] {
        return this._furniSourceTypes;
    }

    declare private _userSourceTypes: any[];

    public get userSourceTypes(): any[] {
        return this._userSourceTypes;
    }

    private _delayInPulses: number = 0;

    public get delayInPulses(): number {
        return this._delayInPulses;
    }

    public set delayInPulses(param1: number) {
        this._delayInPulses = param1;
    }

    private _quantifierCode: number = 0;

    public get quantifierCode(): number {
        return this._quantifierCode;
    }

    public set quantifierCode(param1: number) {
        this._quantifierCode = param1;
    }

    public get stringParam(): string {
        return this._stringParam;
    }

    public get variableIds(): any[] {
        return this._variableIds;
    }

    public get stuffIds(): any[] {
        return this._stuffIds;
    }

    public get isFilter(): boolean {
        return this._isFilter;
    }

    public set isFilter(param1: boolean) {
        this._isFilter = param1;
    }

    public get isInvert(): boolean {
        return this._isInvert;
    }

    public set isInvert(param1: boolean) {
        this._isInvert = param1;
    }
}
