import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { LiftedRoomData } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/LiftedRoomData';

export class NavigatorLiftedRoomsParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::NavigatorLiftedRoomsParser'); }

    constructor() {
    }

    declare private _liftedRooms: LiftedRoomData[];

    public get liftedRooms(): LiftedRoomData[] {
        return this._liftedRooms;
    }

    public flush(): boolean {
        this._liftedRooms = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._liftedRooms.push(new LiftedRoomData(param1));
            _loc3_++;
        }
        return true;
    }
}
