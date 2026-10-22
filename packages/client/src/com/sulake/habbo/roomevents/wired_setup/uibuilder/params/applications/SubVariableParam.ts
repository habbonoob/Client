import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SubVariableParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params.applications::SubVariableParam'); }

    constructor(param1: number, param2: string) {
        this._id = param1;
        this._name = param2;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }
}
