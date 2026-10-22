import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class UserClassificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userclassification::UserClassificationMessageParser'); }

    constructor() {
    }

    declare private _classifiedUsernameMap: UtilsMap;

    declare private _classifiedUserTypeMap: UtilsMap;

    public get classifiedUsernameMap(): UtilsMap {
        return this._classifiedUsernameMap;
    }

    public get classifiedUserTypeMap(): UtilsMap {
        return this._classifiedUserTypeMap;
    }

    public flush(): boolean {
        if (this._classifiedUsernameMap) {
            this._classifiedUsernameMap.dispose();
            this._classifiedUsernameMap = null;
        }
        if (this._classifiedUserTypeMap) {
            this._classifiedUserTypeMap.dispose();
            this._classifiedUserTypeMap = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc6_: string = null;
        let _loc5_: string = null;
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        this._classifiedUsernameMap = new UtilsMap();
        this._classifiedUserTypeMap = new UtilsMap();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = param1.readInteger();
            _loc6_ = param1.readString();
            _loc5_ = param1.readString();
            this._classifiedUsernameMap.add(_loc4_, _loc6_);
            this._classifiedUserTypeMap.add(_loc4_, _loc5_);
            _loc3_++;
        }
        return true;
    }
}
