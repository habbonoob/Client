import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BundleDiscountRuleset {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::BundleDiscountRuleset'); }

    declare private _maxPurchaseSize: number;
    static { (this.prototype as any)._maxPurchaseSize = 0; }

    declare private _bundleSize: number;
    static { (this.prototype as any)._bundleSize = 0; }

    declare private _bundleDiscountSize: number;
    static { (this.prototype as any)._bundleDiscountSize = 0; }

    declare private _bonusThreshold: number;
    static { (this.prototype as any)._bonusThreshold = 0; }

    declare private _additionalBonusDiscountThresholdQuantities: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._maxPurchaseSize = param1.readInteger();
        this._bundleSize = param1.readInteger();
        this._bundleDiscountSize = param1.readInteger();
        this._bonusThreshold = param1.readInteger();
        this._additionalBonusDiscountThresholdQuantities = [];
        let _loc2_: number = param1.readInteger();
        while (_loc3_ < _loc2_) {
            this._additionalBonusDiscountThresholdQuantities.push(param1.readInteger());
            _loc3_++;
        }
    }

    public get maxPurchaseSize(): number {
        return this._maxPurchaseSize;
    }

    public get bundleSize(): number {
        return this._bundleSize;
    }

    public get bundleDiscountSize(): number {
        return this._bundleDiscountSize;
    }

    public get bonusThreshold(): number {
        return this._bonusThreshold;
    }

    public get additionalBonusDiscountThresholdQuantities(): any[] {
        return this._additionalBonusDiscountThresholdQuantities;
    }
}
