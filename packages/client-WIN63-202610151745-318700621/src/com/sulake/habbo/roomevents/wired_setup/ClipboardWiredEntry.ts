import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClipboardWiredEntry {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::ClipboardWiredEntry'); }

    declare private _intParams: any[];

    declare private _stringParam: string;

    declare private _variableIds: any[];

    declare private _stuffIds: any[];

    declare private _stuffIds2: any[];

    declare private _furniSourceTypes: any[];

    declare private _userSourceTypes: any[];

    private _delayInPulses: number = 0;
    private _quantifierCode: number = 0;
    private _SafeStr_5251: boolean = false;
    private _SafeStr_5019: boolean = false;

    constructor(param1: any[], param2: string, param3: any[], param4: any[], param5: any[], param6: any[], param7: any[]) {
        this._intParams = param1;
        this._stringParam = param2;
        this._variableIds = param3;
        this._stuffIds = param4;
        this._stuffIds2 = param5;
        this._furniSourceTypes = param6;
        this._userSourceTypes = param7;
    }

    public get intParams(): any[] {
        return this._intParams;
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

    public get stuffIds2(): any[] {
        return this._stuffIds2;
    }

    public get furniSourceTypes(): any[] {
        return this._furniSourceTypes;
    }

    public get userSourceTypes(): any[] {
        return this._userSourceTypes;
    }

    public get delayInPulses(): number {
        return this._delayInPulses;
    }

    public get quantifierCode(): number {
        return this._quantifierCode;
    }

    public get isFilter(): boolean {
        return this._SafeStr_5251;
    }

    public get isInvert(): boolean {
        return this._SafeStr_5019;
    }

    public set delayInPulses(param1: number) {
        this._delayInPulses = param1;
    }

    public set quantifierCode(param1: number) {
        this._quantifierCode = param1;
    }

    public set isFilter(param1: boolean) {
        this._SafeStr_5251 = param1;
    }

    public set isInvert(param1: boolean) {
        this._SafeStr_5019 = param1;
    }
}
