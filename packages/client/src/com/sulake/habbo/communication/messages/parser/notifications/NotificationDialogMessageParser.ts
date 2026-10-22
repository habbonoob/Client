import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class NotificationDialogMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::NotificationDialogMessageParser'); }

    constructor() {
    }

    declare private _type: string;

    declare private _parameters: UtilsMap;

    public get parameters(): UtilsMap {
        return this._parameters;
    }

    public get type(): string {
        return this._type;
    }

    public flush(): boolean {
        this._type = null;
        this._parameters = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc4_: string = null;
        this._type = param1.readString();
        this._parameters = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = param1.readString();
            _loc4_ = param1.readString();
            this._parameters.add(_loc5_, _loc4_);
            _loc3_++;
        }
        return true;
    }
}
