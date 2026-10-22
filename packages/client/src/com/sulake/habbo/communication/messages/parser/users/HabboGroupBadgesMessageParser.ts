import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class HabboGroupBadgesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::HabboGroupBadgesMessageParser'); }

    declare protected _badges: UtilsMap;

    public get badges(): UtilsMap {
        let _loc1_: number = 0;
        let _loc2_: UtilsMap = new UtilsMap();
        _loc1_ = 0;
        while (_loc1_ < this._badges.length) {
            _loc2_.add(this._badges.getKey(_loc1_), this._badges.getWithIndex(_loc1_));
            _loc1_++;
        }
        return _loc2_;
    }

    public flush(): boolean {
        if (this._badges) {
            this._badges.dispose();
            this._badges = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: string = null;
        let _loc5_: number = 0;
        let _loc4_: number = param1.readInteger();
        this._badges = new UtilsMap();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = param1.readInteger();
            _loc2_ = param1.readString();
            this._badges.add(_loc3_, _loc2_);
            _loc5_++;
        }
        return true;
    }
}
