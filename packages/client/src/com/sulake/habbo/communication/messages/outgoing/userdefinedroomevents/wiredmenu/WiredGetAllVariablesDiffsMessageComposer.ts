import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WiredGetAllVariablesDiffsMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents.wiredmenu::WiredGetAllVariablesDiffsMessageComposer'); }

    constructor(param1: Map<any, any>) {
        let _loc5_: number = 0;
        this._array = [];
        if (param1 == null) {
            this._array.push(0);
            return;
        }
        let _loc2_: number = 0;
        for (const _loc4_ of param1?.keys() ?? []) {
            _loc2_ += 1;
        }
        this._array.push(_loc2_);
        for (const _loc3_ of param1?.keys() ?? []) {
            _loc5_ = param1.get(_loc3_) | 0;
            this._array.push(_loc3_);
            this._array.push(_loc5_);
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
