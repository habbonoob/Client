import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FurniIconImageReadyEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.session.events::FurniIconImageReadyEvent'); }

    public static readonly _SafeStr_8287: string = "FIIRE_ICON_READY";

    constructor(param1: string, param2: boolean, param3: number, param4: string, param5: BitmapData, param6: boolean = false, param7: boolean = false) {
        super("FIIRE_ICON_READY", param6, param7);
        this._assetName = param1;
        this._wallItem = param2;
        this._typeId = param3;
        this._extra = param4;
        this._image = param5;
    }

    declare private _wallItem: boolean;
    static { (this.prototype as any)._wallItem = false; }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _extra: string;

    declare private _image: BitmapData;

    declare private _assetName: string;

    public get assetName(): string {
        return this._assetName;
    }

    public get wallItem(): boolean {
        return this._wallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get extra(): string {
        return this._extra;
    }

    public get furniIconImage(): BitmapData {
        return this._image;
    }
}
