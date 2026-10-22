import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GiftWrappingConfigurationEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/GiftWrappingConfigurationEvent';
import type { GiftWrappingConfigurationParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/GiftWrappingConfigurationParser';

export class GiftWrappingConfiguration {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purchase::GiftWrappingConfiguration'); }

    private _isEnabled: boolean = false;

    declare private _price: number;
    static { (this.prototype as any)._price = 0; }

    declare private _stuffTypes: any[];

    declare private _boxTypes: any[];

    declare private _ribbonTypes: any[];

    declare private _defaultStuffTypes: any[];

    constructor(param1: GiftWrappingConfigurationEvent) {
        if (param1 == null) {
            return;
        }
        let _loc2_: GiftWrappingConfigurationParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        this._isEnabled = _loc2_.isWrappingEnabled;
        this._price = _loc2_.wrappingPrice;
        this._stuffTypes = _loc2_.stuffTypes;
        this._boxTypes = _loc2_.boxTypes;
        this._ribbonTypes = _loc2_.ribbonTypes;
        this._defaultStuffTypes = _loc2_.defaultStuffTypes;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public get price(): number {
        return this._price;
    }

    public get stuffTypes(): any[] {
        return this._stuffTypes;
    }

    public get boxTypes(): any[] {
        return this._boxTypes;
    }

    public get ribbonTypes(): any[] {
        return this._ribbonTypes;
    }

    public get defaultStuffTypes(): any[] {
        return this._defaultStuffTypes;
    }
}
