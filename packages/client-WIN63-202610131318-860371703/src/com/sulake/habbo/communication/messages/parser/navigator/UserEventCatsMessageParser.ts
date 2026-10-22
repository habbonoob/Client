import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { EventCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/EventCategory';

export class UserEventCatsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::UserEventCatsMessageParser'); }

    declare private _eventCategories: any[];

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._eventCategories = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._eventCategories.push(new EventCategory(param1));
            _loc2_++;
        }
        return true;
    }

    public flush(): boolean {
        this._eventCategories = null;
        return true;
    }

    public get eventCategories(): any[] {
        return this._eventCategories;
    }
}
