import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class CollectibleBaseItem {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleBaseItem'); }

    declare protected _SafeStr_6017: number;
    static { (this.prototype as any)._SafeStr_6017 = 0; }

    declare protected _SafeStr_6130: string;

    declare protected _score: number;
    static { (this.prototype as any)._score = 0; }

    declare protected _petFigureString: string;

    declare protected _figureSetIds: number[];

    declare protected _productCode: string;

    declare protected _rarity: string;

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this.initInstanceFields();
        this._SafeStr_6017 = param1.readShort();
        this._SafeStr_6130 = param1.readString();
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

    public readAdditionalParams(param1: IMessageDataWrapper): void {
    }

    public get productTypeId(): number {
        return this._SafeStr_6017;
    }

    public get itemTypeId(): string {
        return this._SafeStr_6130;
    }

    public get score(): number {
        return this._score;
    }

    public get petFigureString(): string {
        return this._petFigureString;
    }

    public get figureSetIds(): number[] {
        return this._figureSetIds;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get rarity(): string {
        return this._rarity;
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }
}
