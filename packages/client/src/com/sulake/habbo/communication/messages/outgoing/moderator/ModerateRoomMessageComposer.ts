import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ModerateRoomMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.moderator::ModerateRoomMessageComposer'); }

    constructor(param1: number, param2: boolean, param3: boolean, param4: boolean) {
        this._array.push(param1);
        this._array.push(param2 ? 1 : 0);
        this._array.push(param3 ? 1 : 0);
        this._array.push(param4 ? 1 : 0);
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
