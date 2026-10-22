import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CollectibleBaseItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleBaseItem'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this.initInstanceFields();
        this._productTypeId = param1.readShort();
        this._itemTypeId = param1.readString();
        this._score = param1.readInteger();
        this.readAdditionalParams(param1);
        this._petFigureString = param1.readString();
        this._figureSetIds = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._figureSetIds.push(param1.readInteger());
            _loc2_++;
        }
        this._productCode = param1.readString();
        this._rarity = param1.readString();
    }

    declare protected _productTypeId: number;
    static { (this.prototype as any)._productTypeId = 0; }

    declare protected _itemTypeId: string;

    declare protected _score: number;
    static { (this.prototype as any)._score = 0; }

    declare protected _figureSetIds: number[];

    declare protected _rarity: string;

    declare protected _petFigureString: string;

    public get petFigureString(): string {
        return this._petFigureString;
    }

    declare protected _productCode: string;

    public get productCode(): string {
        return this._productCode;
    }

    public get productTypeId(): number {
        return this._productTypeId;
    }

    public get itemTypeId(): string {
        return this._itemTypeId;
    }

    public get score(): number {
        return this._score;
    }

    public get figureSetIds(): number[] {
        return this._figureSetIds;
    }

    public get rarity(): string {
        return this._rarity;
    }

    public readAdditionalParams(param1: IMessageDataWrapper): void {
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}
