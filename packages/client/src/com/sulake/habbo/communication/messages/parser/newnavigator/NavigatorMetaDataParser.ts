import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TopLevelContext } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/TopLevelContext';

export class NavigatorMetaDataParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::NavigatorMetaDataParser'); }

    constructor() {
    }

    declare private _topLevelContexts: TopLevelContext[];

    public get topLevelContexts(): TopLevelContext[] {
        return this._topLevelContexts;
    }

    public flush(): boolean {
        this._topLevelContexts = new Array<TopLevelContext>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._topLevelContexts.push(new TopLevelContext(param1));
            _loc3_++;
        }
        return true;
    }
}
