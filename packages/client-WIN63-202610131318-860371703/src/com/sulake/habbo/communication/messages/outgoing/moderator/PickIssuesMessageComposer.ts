import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class PickIssuesMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.moderator::PickIssuesMessageComposer'); }

    declare private _array: any[];

    constructor(param1: any[], param2: boolean, param3: number, param4: string) {
        let _loc5_: number = 0;
        this._array = [];
        this._array.push(param1.length);
        _loc5_ = 0;
        while (_loc5_ < param1.length) {
            this._array.push(param1[_loc5_]);
            _loc5_++;
        }
        this._array.push(param2);
        this._array.push(param3);
        this._array.push(param4);
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
