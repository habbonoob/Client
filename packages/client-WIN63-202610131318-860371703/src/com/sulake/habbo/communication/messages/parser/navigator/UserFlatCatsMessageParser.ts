import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';

export class UserFlatCatsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::UserFlatCatsMessageParser'); }

    declare private _nodes: any[];

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._nodes = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._nodes.push(new FlatCategory(param1));
            _loc2_++;
        }
        return true;
    }

    public flush(): boolean {
        this._nodes = null;
        return true;
    }

    public get nodes(): any[] {
        return this._nodes;
    }
}
