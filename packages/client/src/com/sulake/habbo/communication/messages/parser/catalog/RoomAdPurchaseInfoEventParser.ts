import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/RoomEntryData';

export class RoomAdPurchaseInfoEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::RoomAdPurchaseInfoEventParser'); }

    constructor() {
    }

    declare private _isVip: boolean;
    static { (this.prototype as any)._isVip = false; }

    declare private _rooms: any[];

    public get rooms(): any[] {
        return this._rooms;
    }

    public get isVip(): boolean {
        return this._isVip;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: string = null;
        let _loc4_: boolean = false;
        let _loc7_: RoomEntryData = null;
        this._rooms = [];
        this._isVip = param1.readBoolean();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = param1.readInteger();
            _loc6_ = param1.readString();
            _loc4_ = param1.readBoolean();
            _loc7_ = new RoomEntryData(_loc5_, _loc6_, _loc4_);
            this._rooms.push(_loc7_);
            _loc3_++;
        }
        return true;
    }
}
