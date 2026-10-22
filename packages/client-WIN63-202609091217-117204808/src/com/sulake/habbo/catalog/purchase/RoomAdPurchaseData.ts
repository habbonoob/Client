import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomAdPurchaseData {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purchase::RoomAdPurchaseData'); }

    declare private _name: string;

    private _description: string = "";

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    declare private _extended: boolean;
    static { (this.prototype as any)._extended = false; }

    declare private _SafeStr_5321: number;
    static { (this.prototype as any)._SafeStr_5321 = 0; }

    declare private _roomName: string;

    declare private _expirationTime: Date;

    private _categoryId: number = -1;

    constructor() {
    }

    public clear(): void {
        this._name = null;
        this._description = "";
        this._flatId = 0;
        this._extended = false;
        this._roomName = null;
        this._SafeStr_5321 = -1;
        this._categoryId = -1;
    }

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public set flatId(param1: number) {
        this._flatId = param1;
    }

    public get offerId(): number {
        return this._offerId;
    }

    public set offerId(param1: number) {
        this._offerId = param1;
    }

    public get extended(): boolean {
        return this._extended;
    }

    public get extendedFlatId(): number {
        return this._SafeStr_5321;
    }

    public set extendedFlatId(param1: number) {
        this._SafeStr_5321 = param1;
    }

    public set extended(param1: boolean) {
        this._extended = param1;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public set roomName(param1: string) {
        this._roomName = param1;
    }

    public get expirationTime(): Date {
        return this._expirationTime;
    }

    public set expirationTime(param1: Date) {
        this._expirationTime = param1;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }
}
