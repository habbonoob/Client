import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class SellablePetPaletteData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::SellablePetPaletteData'); }

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._breedId = param1.readInteger();
        this._paletteId = param1.readInteger();
        this._sellable = param1.readBoolean();
        this._rare = param1.readBoolean();
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _breedId: number;
    static { (this.prototype as any)._breedId = 0; }

    declare private _paletteId: number;
    static { (this.prototype as any)._paletteId = 0; }

    declare private _sellable: boolean;
    static { (this.prototype as any)._sellable = false; }

    declare private _rare: boolean;
    static { (this.prototype as any)._rare = false; }

    public get type(): number {
        return this._type;
    }

    public get breedId(): number {
        return this._breedId;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public get sellable(): boolean {
        return this._sellable;
    }

    public get rare(): boolean {
        return this._rare;
    }
}
