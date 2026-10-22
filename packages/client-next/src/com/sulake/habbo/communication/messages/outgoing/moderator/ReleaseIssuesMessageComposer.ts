import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ReleaseIssuesMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.moderator::ReleaseIssuesMessageComposer'); }

    declare private _array: any[];

    constructor(param1: any[]) {
        let _loc2_: number = 0;
        this._array = [];
        this._array.push(param1.length);
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            this._array.push(param1[_loc2_]);
            _loc2_++;
        }
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
