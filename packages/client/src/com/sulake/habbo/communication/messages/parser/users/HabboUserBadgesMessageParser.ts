import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class HabboUserBadgesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::HabboUserBadgesMessageParser'); }

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _badges: any[];

    public get badges(): any[] {
        return this._badges;
    }

    public get userId(): number {
        return this._userId;
    }

    public flush(): boolean {
        this._userId = -1;
        this._badges = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: string = null;
        this._userId = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = param1.readInteger();
            _loc3_ = param1.readString();
            this._badges.push(_loc3_);
            _loc5_++;
        }
        return true;
    }
}
