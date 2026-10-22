import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RelationshipStatusInfo } from '@/com/sulake/habbo/communication/messages/incoming/users/RelationshipStatusInfo';

export class RelationshipStatusInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::RelationshipStatusInfoMessageParser'); }

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _relationshipStatusMap: UtilsMap;

    public get userId(): number {
        return this._userId;
    }

    public get relationshipStatusMap(): UtilsMap {
        return this._relationshipStatusMap;
    }

    public flush(): boolean {
        if (this._relationshipStatusMap) {
            this._relationshipStatusMap.dispose();
            this._relationshipStatusMap = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: RelationshipStatusInfo = null;
        this._userId = param1.readInteger();
        this._relationshipStatusMap = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new RelationshipStatusInfo(param1);
            this._relationshipStatusMap.add(_loc4_.relationshipStatusType, _loc4_);
            _loc3_++;
        }
        return true;
    }
}
