import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WiredSetPreferencesMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents.wiredmenu::WiredSetPreferencesMessageComposer'); }

    constructor(param1: boolean, param2: boolean, param3: boolean, param4: boolean, param5: boolean, param6: string) {
        this._array.push(param1);
        this._array.push(param2);
        this._array.push(param3);
        this._array.push(0);
        this._array.push(param4);
        this._array.push(param5);
        this._array.push(param6);
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
