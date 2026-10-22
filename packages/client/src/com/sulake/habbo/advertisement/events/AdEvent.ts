import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class AdEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.advertisement.events::AdEvent'); }

    public static readonly ROOM_AD_IMAGE_LOADED: string = "AE_ROOM_AD_IMAGE_LOADED";
    public static readonly ROOM_AD_IMAGE_LOADING_FAILED: string = "AE_ROOM_AD_IMAGE_LOADING_FAILED";
    public static readonly ROOM_AD_SHOW: string = "AE_ROOM_AD_SHOW";

    declare private _image: BitmapData;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _imageUrl: string;

    declare private _clickUrl: string;

    declare private _adWarningL: BitmapData;

    declare private _adWarningR: BitmapData;

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _objectCategory: number;
    static { (this.prototype as any)._objectCategory = 0; }

    constructor(type: string, roomId: number, image: BitmapData = null, imageUrl: string = "", clickUrl: string = "", adWarningL: BitmapData = null, adWarningR: BitmapData = null, objectId: number = -1, objectCategory: number = -1, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this._image = image;
        this._roomId = roomId;
        this._imageUrl = imageUrl;
        this._clickUrl = clickUrl;
        this._adWarningL = adWarningL;
        this._adWarningR = adWarningR;
        this._objectId = objectId;
        this._objectCategory = objectCategory;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public get clickUrl(): string {
        return this._clickUrl;
    }

    public get adWarningL(): BitmapData {
        return this._adWarningL;
    }

    public get adWarningR(): BitmapData {
        return this._adWarningR;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectCategory(): number {
        return this._objectCategory;
    }
}
