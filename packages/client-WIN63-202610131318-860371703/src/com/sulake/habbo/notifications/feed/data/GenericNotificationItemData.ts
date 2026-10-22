import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class GenericNotificationItemData {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed.data::GenericNotificationItemData'); }

    declare private _title: string;

    declare private _timeStamp: number;
    static { (this.prototype as any)._timeStamp = 0; }

    declare private _description: string;

    declare private _decorationImage: BitmapData;

    declare private _iconImage: BitmapData;

    declare private _buttonAction: string;

    declare private _buttonCaption: string;

    constructor() {
    }

    public get title(): string {
        return this._title;
    }

    public get timeStamp(): number {
        return this._timeStamp;
    }

    public get description(): string {
        return this._description;
    }

    public get decorationImage(): BitmapData {
        return this._decorationImage;
    }

    public get iconImage(): BitmapData {
        return this._iconImage;
    }

    public get buttonAction(): string {
        return this._buttonAction;
    }

    public get buttonCaption(): string {
        return this._buttonCaption;
    }

    public set title(param1: string) {
        this._title = param1;
    }

    public set timeStamp(param1: number) {
        this._timeStamp = param1;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public set decorationImage(param1: BitmapData) {
        this._decorationImage = param1;
    }

    public set iconImage(param1: BitmapData) {
        this._iconImage = param1;
    }

    public set buttonAction(param1: string) {
        this._buttonAction = param1;
    }

    public set buttonCaption(param1: string) {
        this._buttonCaption = param1;
    }
}
