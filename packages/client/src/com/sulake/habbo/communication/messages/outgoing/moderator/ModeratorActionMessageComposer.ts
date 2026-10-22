import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ModeratorActionMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.moderator::ModeratorActionMessageComposer'); }

    public static readonly _SafeStr_8542: number = 0;
    public static readonly _SafeStr_8341: number = 1;
    public static readonly _SafeStr_8269: number = 3;
    public static readonly _SafeStr_8168: number = 4;

    constructor(param1: number, param2: string, param3: string) {
        this._array.push(param1);
        this._array.push(param2);
        this._array.push(param3);
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
