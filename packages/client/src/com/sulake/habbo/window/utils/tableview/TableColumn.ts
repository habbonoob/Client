import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TableColumn {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableColumn'); }

    constructor(param1: string, param2: string, param3: number, param4: string = "center") {
        this._id = param1;
        this._columnName = param2;
        this._widthFactor = param3;
        if (param4 == "left") {
            param4 = "none";
        }
        this._alignment = param4;
    }

    declare private _id: string;

    declare private _widthFactor: number;
    static { (this.prototype as any)._widthFactor = NaN; }

    declare private _alignment: string;

    declare private _columnName: string;

    public get columnName(): string {
        return this._columnName;
    }

    public get id(): string {
        return this._id;
    }

    public get widthFactor(): number {
        return this._widthFactor;
    }

    public get alignment(): string {
        return this._alignment;
    }
}
