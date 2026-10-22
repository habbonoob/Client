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

    constructor(roomId: number, imageURL: string = null, clickURL: string = null, objectId: number = -1, objectCategory: number = -1) {
        this._roomId = roomId;
        this._objectId = objectId;
        this._objectCategory = objectCategory;
        this._imageURL = imageURL;
        this._clickURL = clickURL;
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
