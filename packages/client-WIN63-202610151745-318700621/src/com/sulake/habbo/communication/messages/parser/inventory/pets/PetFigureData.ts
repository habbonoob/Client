import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class PetFigureData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetFigureData'); }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _paletteId: number;
    static { (this.prototype as any)._paletteId = 0; }

    declare private _color: string;

    declare private _breedId: number;
    static { (this.prototype as any)._breedId = 0; }

    declare private _customPartCount: number;
    static { (this.prototype as any)._customPartCount = 0; }

    declare private _customParts: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._typeId = param1.readInteger();
        this._paletteId = param1.readInteger();
        this._color = param1.readString();
        this._breedId = param1.readInteger();
        this._customParts = [];
        this._customPartCount = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < this._customPartCount) {
            this._customParts.push(param1.readInteger());
            this._customParts.push(param1.readInteger());
            this._customParts.push(param1.readInteger());
            _loc2_++;
        }
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public get color(): string {
        return this._color;
    }

    public get breedId(): number {
        return this._breedId;
    }

    public get figureString(): string {
        let _loc2_: string = this.typeId + " " + this.paletteId + " " + this.color;
        _loc2_ += " " + this.customPartCount;
        for (const _loc1_ of this.customParts ?? []) {
            _loc2_ += " " + _loc1_;
        }
        return _loc2_;
    }

    public get customParts(): any[] {
        return this._customParts;
    }

    public get customPartCount(): number {
        return this._customPartCount;
    }
}
