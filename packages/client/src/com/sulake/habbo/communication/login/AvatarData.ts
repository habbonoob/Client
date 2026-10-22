import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarData {
    static { registerClassName(this, 'com.sulake.habbo.communication.login::AvatarData'); }

    constructor(param1: any) {
        if (param1 != null) {
            this._uniqueId = stringOrNull(param1.uniqueId);
            this._name = stringOrNull(param1.name);
            this._motto = stringOrNull(param1.motto);
            this._figure = stringOrNull(param1.figureString);
            this._gender = stringOrNull(param1.gender);
            this._last_access = param1.lastWebAccess | 0;
            this._SafeStr_7370 = param1.habboClubMember == "true";
            this._SafeStr_7423 = param1.buildersClubMember == "true";
            this._creationTime = stringOrNull(param1.creationTime);
        }
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _uniqueId: string;

    declare private _motto: string;

    declare private _figure: string;

    declare private _gender: string;

    declare private _SafeStr_7370: boolean;
    static { (this.prototype as any)._SafeStr_7370 = false; }

    declare private _SafeStr_7423: boolean;
    static { (this.prototype as any)._SafeStr_7423 = false; }

    declare private _creationTime: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _head_figure: string;

    public get head_figure(): string {
        return this._head_figure;
    }

    declare private _last_access: number;
    static { (this.prototype as any)._last_access = 0; }

    public get last_access(): number {
        return this._last_access;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get uniqueId(): string {
        return this._uniqueId;
    }

    public get motto(): string {
        return this._motto;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }
}
