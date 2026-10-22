import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class UpdateForumReadMarkerMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.groupforums::UpdateForumReadMarkerMessageComposer'); }

    private _array: any[] = [0];

    constructor() {
    }

    public add(param1: number, param2: number, param3: boolean): void {
        this._array.push(param1, param2, param3);
        this._array[0]++;
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public get size(): number {
        return this._array[0] | 0;
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
