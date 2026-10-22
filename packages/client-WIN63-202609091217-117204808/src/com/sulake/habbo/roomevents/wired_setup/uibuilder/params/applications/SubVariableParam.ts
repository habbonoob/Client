import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SubVariableParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params.applications::SubVariableParam'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _SafeStr_14679: boolean;
    static { (this.prototype as any)._SafeStr_14679 = false; }

    constructor(param1: number, param2: string, param3: boolean = false) {
        this._id = param1;
        this._name = param2;
        this._SafeStr_14679 = param3;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get hasExtraText(): boolean {
        return this._SafeStr_14679;
    }
}
