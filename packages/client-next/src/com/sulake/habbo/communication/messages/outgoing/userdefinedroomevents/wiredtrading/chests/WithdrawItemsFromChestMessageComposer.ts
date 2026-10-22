import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class WithdrawItemsFromChestMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userdefinedroomevents.wiredtrading.chests::WithdrawItemsFromChestMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: number, param2: ChestItemType, param3: number) {
        this._array.push(param1);
        param2.addToComposer(this._array);
        this._array.push(param3);
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
