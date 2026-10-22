import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class CreateGuildMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::CreateGuildMessageComposer'); }

    constructor(param1: string, param2: string, param3: number, param4: number, param5: number, param6: any[]) {
        let _loc7_: number = 0;
        this._data = [];
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
        this._data.push(param5);
        this._data.push(param6.length);
        _loc7_ = 0;
        while (_loc7_ < param6.length) {
            this._data.push(param6[_loc7_] | 0);
            _loc7_++;
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
