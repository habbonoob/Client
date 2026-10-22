import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniSlotItem {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::FurniSlotItem'); }

    private _id: number = 0;
    private _category: number = 0;
    private _typeId: number = 0;
    private _xxxExtra: string = null;

    constructor(param1: number, param2: number, param3: number = 0, param4: string = null) {
        this._id = param1;
        this._category = param2;
        this._typeId = param3;
        this._xxxExtra = param4;
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get xxxExtra(): string {
        return this._xxxExtra;
    }

    public set id(param1: number) {
        this._id = param1;
    }
}
