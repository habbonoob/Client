import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class CreateFlatMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.navigator::CreateFlatMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: string, param2: string, param3: string, param4: number, param5: number, param6: number) {
        this._array.push(param1);
        this._array.push(param2);
        this._array.push(param3);
        this._array.push(param4);
        this._array.push(param5);
        this._array.push(param6);
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
