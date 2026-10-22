import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SellablePetPaletteData } from '@/com/sulake/habbo/communication/messages/parser/catalog/SellablePetPaletteData';

export class SellablePetPalettesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::SellablePetPalettesParser'); }

    constructor() {
    }

    private _productCode: string = "";

    public get productCode(): string {
        return this._productCode;
    }

    private _sellablePalettes: any[] = [];

    public get sellablePalettes(): any[] {
        return this._sellablePalettes.slice();
    }

    public flush(): boolean {
        this._productCode = "";
        this._sellablePalettes = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._productCode = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._sellablePalettes.push(new SellablePetPaletteData(param1));
            _loc3_++;
        }
        return true;
    }
}
