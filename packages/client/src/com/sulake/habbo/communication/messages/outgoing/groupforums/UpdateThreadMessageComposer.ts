import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class UpdateThreadMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.groupforums::UpdateThreadMessageComposer'); }

    constructor(param1: number, param2: number, param3: boolean, param4: boolean) {
        this._array = [param1, param2, param4, param3];
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

    public unwatch(param1: string): void {
        throw new TypeError("super.unwatch is not a function");
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
