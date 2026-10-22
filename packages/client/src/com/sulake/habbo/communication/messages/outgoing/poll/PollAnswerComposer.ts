import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PollAnswerComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.poll::PollAnswerComposer'); }

    constructor(param1: number, param2: number, param3: any[]) {
        let _loc4_: number = 0;
        this._data = [param1, param2];
        this._data.push(param3.length);
        _loc4_ = 0;
        while (_loc4_ < param3.length) {
            this._data.push(String(param3[_loc4_]));
            _loc4_++;
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
