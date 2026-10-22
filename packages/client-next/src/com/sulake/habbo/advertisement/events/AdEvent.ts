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

    constructor(param1: string, param2: number, param3: BitmapData = null, param4: string = "", param5: string = "", param6: BitmapData = null, param7: BitmapData = null, param8: number = -1, param9: number = -1, param10: boolean = false, param11: boolean = false) {
        super(param1, param10, param11);
        this._image = param3;
        this._roomId = param2;
        this._imageUrl = param4;
        this._clickUrl = param5;
        this._adWarningL = param6;
        this._adWarningR = param7;
        this._objectId = param8;
        this._objectCategory = param9;
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
