import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { _SafeCls_1996 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_1996';
import { isIStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { LegacyStuffData } from '@/com/sulake/habbo/room/object/data/LegacyStuffData';

export class ObjectDataUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectDataUpdateMessageParser'); }

    private _id: number = 0;
    private _state: number = 0;

    declare private _data: IStuffData;

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public get state(): number {
        return this._state;
    }

    public get data(): IStuffData {
        return this._data;
    }

    public flush(): boolean {
        this._state = 0;
        this._data = asGuarded(new LegacyStuffData(), isIStuffData);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc3_: string = param1.readString();
        this._id = Number(_loc3_) | 0;
        this._data = _SafeCls_1996.parseStuffData(param1);
        let _loc2_: number = parseFloat(this._data.getLegacyString());
        if (!isNaN(_loc2_)) {
            this._state = Number(this._data.getLegacyString()) | 0;
        }
        return true;
    }
}
