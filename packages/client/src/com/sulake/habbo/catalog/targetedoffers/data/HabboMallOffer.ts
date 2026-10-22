import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboMallOffer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers.data::HabboMallOffer'); }

    constructor(param1: any) {
        this._targetedOfferId = parseInt(stringOrNull(param1.targetedOfferId)) | 0;
        this._identifier = stringOrNull(param1.identifier);
        this._title = stringOrNull(param1.header);
        this._highlight = stringOrNull(param1.highlight);
        this._description = stringOrNull(param1.description);
        this._imageUrl = stringOrNull(param1.imageUrl);
        this._smallImageUrl = stringOrNull(param1.smallImageUrl);
        this._trackingState = parseInt(stringOrNull(param1.trackingStateCode)) | 0;
    }

    declare private _targetedOfferId: number;
    static { (this.prototype as any)._targetedOfferId = 0; }

    declare private _identifier: string;

    declare private _title: string;

    declare private _description: string;

    declare private _imageUrl: string;

    declare private _trackingState: number;
    static { (this.prototype as any)._trackingState = 0; }

    declare private _highlight: string;

    public get highlight(): string {
        return this._highlight;
    }

    declare private _smallImageUrl: string;

    public get smallImageUrl(): string {
        return this._smallImageUrl;
    }

    public get targetedOfferId(): number {
        return this._targetedOfferId;
    }

    public get identifier(): string {
        return this._identifier;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public get trackingState(): number {
        return this._trackingState;
    }
}
