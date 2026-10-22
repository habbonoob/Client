import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredRoomStatsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredRoomStatsData'); }

    declare private _executionCost: number;
    static { (this.prototype as any)._executionCost = NaN; }

    declare private _executionCostCap: number;
    static { (this.prototype as any)._executionCostCap = NaN; }

    declare private _isHeavy: boolean;
    static { (this.prototype as any)._isHeavy = false; }

    declare private _floorItemCount: number;
    static { (this.prototype as any)._floorItemCount = 0; }

    declare private _floorItemCap: number;
    static { (this.prototype as any)._floorItemCap = 0; }

    declare private _wallItemCount: number;
    static { (this.prototype as any)._wallItemCount = 0; }

    declare private _wallItemCap: number;
    static { (this.prototype as any)._wallItemCap = 0; }

    declare private _permanentFurniVariables: number;
    static { (this.prototype as any)._permanentFurniVariables = 0; }

    declare private _maxPermanentFurniVariables: number;
    static { (this.prototype as any)._maxPermanentFurniVariables = 0; }

    declare private _permanentUserVariables: number;
    static { (this.prototype as any)._permanentUserVariables = 0; }

    declare private _maxPermanentUserVariables: number;
    static { (this.prototype as any)._maxPermanentUserVariables = 0; }

    declare private _permanentGlobalVariables: number;
    static { (this.prototype as any)._permanentGlobalVariables = 0; }

    declare private _maxPermanentGlobalVariables: number;
    static { (this.prototype as any)._maxPermanentGlobalVariables = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._executionCost = param1.readDouble();
        this._executionCostCap = param1.readDouble();
        this._isHeavy = param1.readBoolean();
        this._floorItemCount = param1.readInteger();
        this._floorItemCap = param1.readInteger();
        this._wallItemCount = param1.readInteger();
        this._wallItemCap = param1.readInteger();
        this._permanentFurniVariables = param1.readInteger();
        this._maxPermanentFurniVariables = param1.readInteger();
        this._permanentUserVariables = param1.readInteger();
        this._maxPermanentUserVariables = param1.readInteger();
        this._permanentGlobalVariables = param1.readInteger();
        this._maxPermanentGlobalVariables = param1.readInteger();
    }

    public get executionCost(): number {
        return this._executionCost;
    }

    public get executionCostCap(): number {
        return this._executionCostCap;
    }

    public get isHeavy(): boolean {
        return this._isHeavy;
    }

    public get floorItemCount(): number {
        return this._floorItemCount;
    }

    public get floorItemCap(): number {
        return this._floorItemCap;
    }

    public get wallItemCount(): number {
        return this._wallItemCount;
    }

    public get wallItemCap(): number {
        return this._wallItemCap;
    }

    public get permanentFurniVariables(): number {
        return this._permanentFurniVariables;
    }

    public get maxPermanentFurniVariables(): number {
        return this._maxPermanentFurniVariables;
    }

    public get permanentUserVariables(): number {
        return this._permanentUserVariables;
    }

    public get maxPermanentUserVariables(): number {
        return this._maxPermanentUserVariables;
    }

    public get permanentGlobalVariables(): number {
        return this._permanentGlobalVariables;
    }

    public get maxPermanentGlobalVariables(): number {
        return this._maxPermanentGlobalVariables;
    }
}
