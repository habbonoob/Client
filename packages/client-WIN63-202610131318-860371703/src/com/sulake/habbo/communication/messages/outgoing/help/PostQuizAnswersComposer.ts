import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PostQuizAnswersComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::PostQuizAnswersComposer'); }

    declare private _array: any[];

    constructor(param1: string, param2: any[]) {
        let _loc3_: number = 0;
        this._array = [];
        this._array.push(param1);
        this._array.push(param2.length);
        _loc3_ = 0;
        while (_loc3_ < param2.length) {
            this._array.push(param2[_loc3_]);
            _loc3_++;
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
