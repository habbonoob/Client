import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SearchContext {
    static { registerClassName(this, 'com.sulake.habbo.navigator.context::SearchContext'); }

    constructor(param1: string, param2: string) {
        this._searchCode = param1;
        this._filtering = param2;
    }

    declare private _searchCode: string;

    public get searchCode(): string {
        return this._searchCode;
    }

    declare private _filtering: string;

    public get filtering(): string {
        return this._filtering;
    }

    public toString(): string {
        return this._searchCode + " : " + this._filtering;
    }
}
