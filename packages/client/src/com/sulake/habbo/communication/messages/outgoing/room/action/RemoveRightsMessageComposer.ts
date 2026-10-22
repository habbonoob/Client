import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class RemoveRightsMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::RemoveRightsMessageComposer'); }

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

    declare private _array: any[];

    public get disposed(): boolean {
        return false;
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

    get [IDisposable](): true {
        return true;
    }
}
