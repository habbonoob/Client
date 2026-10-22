import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomQueueSet } from '@/com/sulake/habbo/communication/messages/parser/room/session/RoomQueueSet';

export class RoomQueueStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::RoomQueueStatusMessageParser'); }

    private _flatId: number = 0;
    private _SafeStr_4168: UtilsMap = new UtilsMap();
    private _activeTarget: number = 0;

    constructor() {
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get activeTarget(): number {
        return this._activeTarget;
    }

    public flush(): boolean {
        this._SafeStr_4168.reset();
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc6_: RoomQueueSet = null;
        let _loc7_: number = 0;
        let _loc2_: string = null;
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        this._SafeStr_4168.reset();
        this._flatId = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc4_) {
            _loc2_ = param1.readString();
            _loc5_ = param1.readInteger();
            if (_loc7_ == 0) {
                this._activeTarget = _loc5_;
            }
            _loc6_ = new RoomQueueSet(_loc2_, _loc5_);
            _loc3_ = param1.readInteger();
            _loc8_ = 0;
            while (_loc8_ < _loc3_) {
                _loc6_.addQueue(param1.readString(), param1.readInteger());
                _loc8_++;
            }
            this._SafeStr_4168.add(_loc6_.target, _loc6_);
            _loc7_++;
        }
        return true;
    }

    public getQueueSetTargets(): any[] {
        return this._SafeStr_4168.getKeys();
    }

    public getQueueSet(param1: number): RoomQueueSet {
        return asInstanceOf(this._SafeStr_4168.getValue(param1), RoomQueueSet);
    }
}
