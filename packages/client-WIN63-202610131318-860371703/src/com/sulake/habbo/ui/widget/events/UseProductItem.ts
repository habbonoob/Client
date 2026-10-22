import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UseProductItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::UseProductItem'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _name: string;

    declare private _requestRoomObjectId: number;
    static { (this.prototype as any)._requestRoomObjectId = 0; }

    declare private _targetRoomObjectId: number;
    static { (this.prototype as any)._targetRoomObjectId = 0; }

    declare private _requestInventoryStripId: number;
    static { (this.prototype as any)._requestInventoryStripId = 0; }

    declare private _replace: boolean;
    static { (this.prototype as any)._replace = false; }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: number, param6: number = -1, param7: boolean = false) {
        this._id = param1;
        this._category = param2;
        this._name = param3;
        this._requestRoomObjectId = param4;
        this._targetRoomObjectId = param5;
        this._requestInventoryStripId = param6;
        this._replace = param7;
    }

    public dispose(): void {
    }

    public get id(): number {
        return this._id;
    }

    public get category(): number {
        return this._category;
    }

    public get name(): string {
        return this._name;
    }

    public get requestRoomObjectId(): number {
        return this._requestRoomObjectId;
    }

    public get targetRoomObjectId(): number {
        return this._targetRoomObjectId;
    }

    public get requestInventoryStripId(): number {
        return this._requestInventoryStripId;
    }

    public get replace(): boolean {
        return this._replace;
    }
}
