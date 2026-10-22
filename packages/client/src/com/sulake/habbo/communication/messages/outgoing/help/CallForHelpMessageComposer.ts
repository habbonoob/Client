import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class CallForHelpMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::CallForHelpMessageComposer'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: any[], param6: string, param7: string) {
        this._array.push(param1);
        this._array.push(param2);
        this._array.push(param3);
        this._array.push(param4);
        this._array.push(param5.length / 2);
        this._array = this._array.concat(param5);
        this._array.push(param6);
        this._array.push(param7);
    }

    private _array: any[] = [];

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
