import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UpdateGuildBadgeMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::UpdateGuildBadgeMessageComposer'); }

    constructor(param1: number, param2: any[]) {
        let _loc3_: number = 0;
        this._data = [];
        this._data.push(param1);
        this._data.push(param2.length);
        _loc3_ = 0;
        while (_loc3_ < param2.length) {
            this._data.push(param2[_loc3_] | 0);
            _loc3_++;
        }
    }

    declare private _data: any[];

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
