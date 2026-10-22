import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class MakeOfferMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.marketplace::MakeOfferMessageComposer'); }

    public static readonly _SafeStr_7779: number = 1;
    public static readonly _SafeStr_8201: number = 2;
    private _array: any[] = [];

    constructor(param1: number, param2: number, param3: number[]) {
        this._array.push(param1);
        this._array.push(param2);
        if (param3 == null) {
            this._array.push(0);
            return;
        }
        this._array.push(param3.length);
        for (const _loc4_ of param3 ?? []) {
            this._array.push(_loc4_);
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
