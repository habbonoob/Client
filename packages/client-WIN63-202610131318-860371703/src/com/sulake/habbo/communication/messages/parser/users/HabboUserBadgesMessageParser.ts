import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6029 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6029';

export class HabboUserBadgesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::HabboUserBadgesMessageParser'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _selectedBadges: any[];

    constructor() {
    }

    public flush(): boolean {
        this._userId = -1;
        this._selectedBadges = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc7_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        this._userId = param1.readInteger();
        let _loc6_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc2_ = param1.readInteger();
            _loc3_ = param1.readString();
            _loc5_ = param1.readInteger();
            _loc4_ = param1.readInteger();
            this._selectedBadges.push(new _SafeCls_6029(_loc2_, _loc3_, _loc5_, _loc4_));
            _loc7_++;
        }
        return true;
    }

    public get selectedBadges(): any[] {
        return this._selectedBadges;
    }

    public get userId(): number {
        return this._userId;
    }
}
