import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AdImageRequest {
    static { registerClassName(this, 'com.sulake.habbo.advertisement::AdImageRequest'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _objectCategory: number;
    static { (this.prototype as any)._objectCategory = 0; }

    declare private _imageURL: string;

    declare private _clickURL: string;

    constructor(param1: number, param2: string = null, param3: string = null, param4: number = -1, param5: number = -1) {
        this._roomId = param1;
        this._objectId = param4;
        this._objectCategory = param5;
        this._imageURL = param2;
        this._clickURL = param3;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectCategory(): number {
        return this._objectCategory;
    }

    public get imageURL(): string {
        return this._imageURL;
    }

    public get clickURL(): string {
        return this._clickURL;
    }
}
