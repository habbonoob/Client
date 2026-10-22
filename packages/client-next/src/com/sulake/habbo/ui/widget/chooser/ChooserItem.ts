import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { FurniId } from '@/com/sulake/habbo/utils/FurniId';

export class ChooserItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser::ChooserItem'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _name: string;

    declare private _owner: string;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _lowerCaseName: string;

    constructor(param1: number, param2: number, param3: string, param4: string = null, param5: number = 0) {
        this._id = param1;
        this._category = param2;
        this._name = param3;
        this._owner = param4;
        this._type = param5;
        this._lowerCaseName = this._name.toLowerCase();
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get name(): string {
        return this._name;
    }

    public get type(): number {
        return this._type;
    }

    public get owner(): string {
        if (FurniId.isBuilderClubId(this._id)) {
            return "Builders Club";
        }
        if (FurniId.isTempId(this._id)) {
            return "Temp (Wired)";
        }
        return this._owner;
    }

    public get lowerCaseName(): string {
        return this._lowerCaseName;
    }
}
