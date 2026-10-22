import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetBreedingResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::PetBreedingResultData'); }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: string, param6: number, param7: boolean) {
        this._stuffId = param1;
        this._classId = param2;
        this._productCode = param3;
        this._userId = param4;
        this._userName = param5;
        this._rarityLevel = param6;
        this._hasMutation = param7;
    }

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _hasMutation: boolean;
    static { (this.prototype as any)._hasMutation = false; }

    declare private _stuffId: number;
    static { (this.prototype as any)._stuffId = 0; }

    public get stuffId(): number {
        return this._stuffId;
    }

    declare private _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get classId(): number {
        return this._classId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public get hasMutation(): boolean {
        return this._hasMutation;
    }
}
