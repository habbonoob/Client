import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';

export class WeeklyGameRewardParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.score::WeeklyGameRewardParser'); }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    private _products: any[] = [];

    declare private _minutesUntilNextWeek: number;
    static { (this.prototype as any)._minutesUntilNextWeek = 0; }

    declare private _rewardingOn: boolean;
    static { (this.prototype as any)._rewardingOn = false; }

    constructor() {
    }

    public get gameTypeId(): number {
        return this._gameTypeId;
    }

    public get products(): any[] {
        return this._products;
    }

    public get minutesUntilNextWeek(): number {
        return this._minutesUntilNextWeek;
    }

    public get rewardingOn(): boolean {
        return this._rewardingOn;
    }

    public flush(): boolean {
        this._gameTypeId = -1;
        this._products = [];
        this._minutesUntilNextWeek = 0;
        this._rewardingOn = true;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._gameTypeId = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._products.push(new CatalogPageMessageProductData(param1));
            _loc2_++;
        }
        this._minutesUntilNextWeek = param1.readInteger();
        this._rewardingOn = param1.readBoolean();
        return true;
    }
}
