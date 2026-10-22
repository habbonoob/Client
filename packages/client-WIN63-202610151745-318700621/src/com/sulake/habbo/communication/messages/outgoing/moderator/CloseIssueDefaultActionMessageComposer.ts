import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class CloseIssueDefaultActionMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.moderator::CloseIssueDefaultActionMessageComposer'); }

    declare private _array: any[];

    constructor(param1: number, param2: any[], param3: number) {
        let _loc4_: number = 0;
        this._array = [];
        this._array.push(param1);
        this._array.push(param2.length);
        _loc4_ = 0;
        while (_loc4_ < param2.length) {
            this._array.push(param2[_loc4_]);
            _loc4_++;
        }
        this._array.push(param3);
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = null;
    }

    public get disposed(): boolean {
        return false;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
