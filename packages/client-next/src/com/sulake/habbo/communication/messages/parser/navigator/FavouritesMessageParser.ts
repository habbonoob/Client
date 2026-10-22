import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FavouritesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::FavouritesMessageParser'); }

    declare private _limit: number;
    static { (this.prototype as any)._limit = 0; }

    declare private _favouriteRoomIds: any[];

    constructor() {
    }

    public flush(): boolean {
        this._favouriteRoomIds = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._limit = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._favouriteRoomIds.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get limit(): number {
        return this._limit;
    }

    public get favouriteRoomIds(): any[] {
        return this._favouriteRoomIds;
    }
}
