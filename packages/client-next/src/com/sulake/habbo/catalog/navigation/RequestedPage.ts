import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RequestedPage {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation::RequestedPage'); }

    public static readonly REQUEST_TYPE_NONE: number = 0;
    public static readonly REQUEST_TYPE_ID: number = 1;
    public static readonly REQUEST_TYPE_NAME: number = 2;

    declare private _requestType: number;
    static { (this.prototype as any)._requestType = 0; }

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    declare private _requestedOfferId: number;
    static { (this.prototype as any)._requestedOfferId = 0; }

    declare private _requestName: string;

    constructor() {
        this._requestType = 0;
    }

    public set requestById(param1: number) {
        this._requestType = 1;
        this._requestId = param1;
    }

    public set requestByName(param1: string) {
        this._requestType = 2;
        this._requestName = param1;
    }

    public resetRequest(): void {
        this._requestType = 0;
        this._requestedOfferId = -1;
    }

    public get requestType(): number {
        return this._requestType;
    }

    public get requestId(): number {
        return this._requestId;
    }

    public get requestedOfferId(): number {
        return this._requestedOfferId;
    }

    public set requestedOfferId(param1: number) {
        this._requestedOfferId = param1;
    }

    public get requestName(): string {
        return this._requestName;
    }
}
